import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { trackMeta } from "@/components/meta-tracking";

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "Compra confirmada — Mentes Exercitadas" },
      {
        name: "description",
        content:
          "Sua compra foi confirmada. Veja como acessar os 150 Exercícios Mentais e os bônus liberados.",
      },
      { property: "og:title", content: "Compra confirmada — Mentes Exercitadas" },
      {
        property: "og:description",
        content: "Acesso liberado aos exercícios mentais e aos bônus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ObrigadoPage,
});

/** Nomes de parâmetro que o PerfectPay pode enviar na URL de obrigado. */
const PARAM_ALIASES = {
  orderId: ["transaction", "transaction_code", "sale_code", "order_id", "code", "id"],
  value: ["sale_amount", "amount", "valor", "value", "price", "total"],
  email: ["email", "customer_email", "buyer_email"],
  phone: ["phone", "telefone", "customer_phone", "whatsapp"],
  name: ["name", "nome", "customer_name", "full_name"],
  product: ["product_name", "plan", "produto", "product"],
} as const;

function pick(search: URLSearchParams, keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const found = search.get(key) ?? search.get(key.toUpperCase());
    if (found && found.trim()) return found.trim();
  }
  return undefined;
}

/** Converte "29,90" / "2990" / "29.90" em número em reais. */
function parseAmount(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/[^\d,.-]/g, "");
  if (!cleaned) return undefined;
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  // PerfectPay pode enviar em centavos quando não há separador decimal.
  return !cleaned.includes(",") && !cleaned.includes(".") && parsed >= 1000
    ? parsed / 100
    : parsed;
}

function ObrigadoPage() {
  const fired = useRef(false);
  const [order, setOrder] = useState<{ value: number; name: string } | null>(null);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const search = new URLSearchParams(window.location.search);
    const orderId = pick(search, PARAM_ALIASES.orderId);
    const value = parseAmount(pick(search, PARAM_ALIASES.value)) ?? 27.9;
    const contentName = pick(search, PARAM_ALIASES.product) ?? "150 Exercícios Mentais";
    const fullName = pick(search, PARAM_ALIASES.name) ?? "";
    const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);

    setOrder({ value, name: contentName });

    // Evita disparo duplicado se o comprador recarregar a página de obrigado.
    const dedupeKey = `me_purchase_${orderId ?? "no_id"}`;
    try {
      if (sessionStorage.getItem(dedupeKey)) return;
      sessionStorage.setItem(dedupeKey, "1");
    } catch {
      // sessionStorage indisponível — segue e confia no event_id
    }

    trackMeta(
      "Purchase",
      { value, currency: "BRL", content_name: contentName, content_type: "product" },
      {
        // event_id estável = deduplicação entre pixel, CAPI e recarregamentos.
        eventId: orderId ? `pp_${orderId}` : undefined,
        orderId,
        email: pick(search, PARAM_ALIASES.email),
        phone: pick(search, PARAM_ALIASES.phone),
        firstName,
        lastName: rest.length ? rest.join(" ") : undefined,
      },
    );
  }, []);

  return (
    <div className="min-h-screen bg-white text-foreground">
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl font-black mb-3">Compra confirmada!</h1>
        <p className="text-muted-foreground mb-8">
          Seu pedido de <strong>{order?.name ?? "150 Exercícios Mentais"}</strong> foi aprovado.
          O acesso já está a caminho.
        </p>

        <div className="text-left space-y-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-5 mb-8">
          <p className="font-black text-blue-900">Próximos passos</p>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Verifique seu e-mail (inclusive spam/promoções): o material e os bônus chegam em
              poucos minutos.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Salve nosso suporte: <strong>suporte@mentesexercitadas.com.br</strong> — respondemos
              em até 24h úteis.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Garantia incondicional de 7 dias. Não gostou, devolvemos tudo.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link to="/reembolso" className="text-muted-foreground underline hover:text-foreground">
            Política de reembolso
          </Link>
          <Link to="/privacidade" className="text-muted-foreground underline hover:text-foreground">
            Privacidade
          </Link>
        </div>
      </main>
    </div>
  );
}
