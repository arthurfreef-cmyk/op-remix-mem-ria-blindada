import { createFileRoute } from "@tanstack/react-router";
import { META_PIXEL_ID } from "@/lib/meta-capi.functions";

/**
 * Postback do PerfectPay -> Purchase server-side na Conversions API.
 *
 * Motivo: o Purchase disparado no navegador (/obrigado) se perde quando o
 * comprador fecha a página, paga por boleto/Pix depois, ou bloqueia scripts.
 * O webhook garante 100% das compras aprovadas no Gerenciador de Anúncios,
 * deduplicadas com o pixel pelo mesmo event_id (`pp_<transaction>`).
 */

// Cloudflare Workers proíbe construir Response no escopo global — sempre criar dentro do handler.
const ok = () => new Response("ok", { status: 200 });

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function str(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function num(value: unknown): number | undefined {
  const parsed = typeof value === "number" ? value : Number(String(value ?? "").replace(",", "."));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

/** Status do PerfectPay que representam venda paga. */
const PAID = new Set(["approved", "aprovado", "paid", "pago", "completed", "2"]);

export const Route = createFileRoute("/api/public/perfectpay-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Aceita tanto o token de postback quanto o token de integração da API.
        const accepted = [
          process.env["PERFECTPAY_WEBHOOK_TOKEN"],
          process.env["PERFECTPAY_API_TOKEN"],
        ].filter((t): t is string => Boolean(t));
        const capiToken = process.env["META_CAPI_ACCESS_TOKEN"];
        if (accepted.length === 0 || !capiToken)
          return new Response("not_configured", { status: 503 });

        let payload: Record<string, unknown>;
        try {
          payload = (await request.json()) as Record<string, unknown>;
        } catch {
          return new Response("invalid_json", { status: 400 });
        }

        // PerfectPay envia o token configurado no painel dentro do corpo.
        const received = str(payload["token"]) ?? request.headers.get("x-webhook-token") ?? "";
        if (!accepted.includes(received)) return new Response("unauthorized", { status: 401 });

        const status = (
          str(payload["sale_status_enum_key"]) ??
          str(payload["sale_status_detail"]) ??
          String(payload["sale_status_enum"] ?? "")
        ).toLowerCase();
        if (!PAID.has(status)) return ok(); // evento não-pago: ignorado sem erro

        const customer = (payload["customer"] as Record<string, unknown> | undefined) ?? {};
        const product = (payload["product"] as Record<string, unknown> | undefined) ?? {};

        const orderId = str(payload["code"]) ?? str(payload["sale_code"]) ?? str(payload["token"]);
        const value = num(payload["sale_amount"]) ?? num(payload["amount"]);
        const email = str(customer["email"])?.toLowerCase();
        const phoneDigits = (str(customer["phone_formated"]) ?? str(customer["phone_number"]) ?? "")
          .replace(/\D/g, "");
        const fullName = str(customer["full_name"]) ?? "";
        const [firstName, ...rest] = fullName.toLowerCase().split(/\s+/).filter(Boolean);

        const [em, ph, fn, ln] = await Promise.all([
          email ? sha256(email) : undefined,
          phoneDigits ? sha256(phoneDigits.length <= 11 ? `55${phoneDigits}` : phoneDigits) : undefined,
          firstName ? sha256(firstName) : undefined,
          rest.length ? sha256(rest.join(" ")) : undefined,
        ]);

        const body = {
          data: [
            {
              event_name: "Purchase",
              event_time: Math.floor(Date.now() / 1000),
              event_id: orderId ? `pp_${orderId}` : `pp_${Date.now()}`,
              action_source: "website",
              event_source_url: "https://mentesexercitadas.lovable.app/obrigado",
              user_data: {
                em: em ? [em] : undefined,
                ph: ph ? [ph] : undefined,
                fn: fn ? [fn] : undefined,
                ln: ln ? [ln] : undefined,
              },
              custom_data: {
                value,
                currency: "BRL",
                content_type: "product",
                content_name: str(product["name"]) ?? "150 Exercícios Mentais",
                order_id: orderId,
              },
            },
          ],
        };

        try {
          const res = await fetch(
            `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(capiToken)}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            },
          );
          if (!res.ok) console.error("[perfectpay-webhook] meta", res.status, await res.text());
        } catch (err) {
          console.error("[perfectpay-webhook] rede", err);
        }

        return ok();
      },

      GET: async () => new Response("ok", { status: 200 }),
    },
  },
});
