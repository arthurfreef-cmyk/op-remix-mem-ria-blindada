import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader } from "@tanstack/react-start/server";

/** Pixel público do Meta — pode ficar no código. */
export const META_PIXEL_ID = "1070856252291542";

export interface MetaCapiInput {
  /** Nome padrão do evento: PageView, ViewContent, InitiateCheckout, etc. */
  eventName: string;
  /** ID compartilhado com o pixel do navegador para deduplicação. */
  eventId: string;
  /** URL da página onde o evento ocorreu. */
  eventSourceUrl: string;
  /** Cookies do browser _fbp / _fbc, quando existirem. */
  fbp?: string;
  fbc?: string;
  /** Dados comerciais do evento (InitiateCheckout / ViewContent). */
  value?: number;
  currency?: string;
  contentName?: string;
  /** Dados do comprador (Purchase) — hasheados em SHA-256 antes do envio. */
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  /** ID da transação do PerfectPay, usado para deduplicar a compra. */
  orderId?: string;
  /** Timestamp (segundos) do evento no navegador — precisa bater com o do pixel para deduplicar. */
  eventTime?: number;
  /** ID anônimo estável do visitante, melhora o match quality do Meta. */
  externalId?: string;
}

/** SHA-256 hex, exigido pelo Meta para dados pessoais (Web Crypto). */
async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function normalize(value: unknown, mode: "email" | "phone" | "name"): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return undefined;
  if (mode === "phone") {
    const digits = trimmed.replace(/\D/g, "");
    return digits ? (digits.length <= 11 ? `55${digits}` : digits) : undefined;
  }
  return trimmed;
}

function validate(data: unknown): MetaCapiInput {
  if (typeof data !== "object" || data === null) throw new Error("Payload inválido");
  const d = data as Record<string, unknown>;
  if (typeof d.eventName !== "string" || d.eventName.length === 0) throw new Error("eventName obrigatório");
  if (typeof d.eventId !== "string" || d.eventId.length === 0) throw new Error("eventId obrigatório");
  if (typeof d.eventSourceUrl !== "string") throw new Error("eventSourceUrl obrigatório");
  const value = typeof d.value === "number" && Number.isFinite(d.value) ? d.value : undefined;
  return {
    eventName: d.eventName.slice(0, 60),
    eventId: d.eventId.slice(0, 100),
    eventSourceUrl: d.eventSourceUrl.slice(0, 500),
    fbp: typeof d.fbp === "string" ? d.fbp.slice(0, 200) : undefined,
    fbc: typeof d.fbc === "string" ? d.fbc.slice(0, 300) : undefined,
    value,
    currency: typeof d.currency === "string" ? d.currency.slice(0, 3) : undefined,
    contentName: typeof d.contentName === "string" ? d.contentName.slice(0, 120) : undefined,
    email: normalize(d.email, "email"),
    phone: normalize(d.phone, "phone"),
    firstName: normalize(d.firstName, "name"),
    lastName: normalize(d.lastName, "name"),
    orderId: typeof d.orderId === "string" ? d.orderId.slice(0, 100) : undefined,
    eventTime:
      typeof d.eventTime === "number" && Number.isFinite(d.eventTime) ? Math.floor(d.eventTime) : undefined,
    externalId: typeof d.externalId === "string" ? d.externalId.slice(0, 100) : undefined,
  };
}

/**
 * Envia o evento para a Conversions API do Meta.
 * Falhas nunca quebram a página — retornamos um shape tipado.
 */
export const sendMetaEvent = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const token = process.env["META_CAPI_ACCESS_TOKEN"];
    if (!token) return { ok: false, error: "missing_token" };

    const request = getRequest();
    const userAgent = getRequestHeader("user-agent") ?? undefined;
    const forwarded = getRequestHeader("x-forwarded-for") ?? "";
    const clientIp =
      getRequestHeader("cf-connecting-ip") ?? forwarded.split(",")[0]?.trim() ?? undefined;

    const [em, ph, fn, ln] = await Promise.all([
      data.email ? sha256(data.email) : Promise.resolve(undefined),
      data.phone ? sha256(data.phone) : Promise.resolve(undefined),
      data.firstName ? sha256(data.firstName) : Promise.resolve(undefined),
      data.lastName ? sha256(data.lastName) : Promise.resolve(undefined),
    ]);

    const body = {
      data: [
        {
          event_name: data.eventName,
          event_time: data.eventTime ?? Math.floor(Date.now() / 1000),
          event_id: data.eventId,
          event_source_url: data.eventSourceUrl || request.url,
          action_source: "website",
          user_data: {
            client_user_agent: userAgent,
            client_ip_address: clientIp || undefined,
            fbp: data.fbp,
            fbc: data.fbc,
            external_id: data.externalId ? [data.externalId] : undefined,
            em: em ? [em] : undefined,
            ph: ph ? [ph] : undefined,
            fn: fn ? [fn] : undefined,
            ln: ln ? [ln] : undefined,
          },
          custom_data:
            data.value !== undefined || data.contentName
              ? {
                  value: data.value,
                  currency: data.currency ?? "BRL",
                  content_name: data.contentName,
                  content_type: "product",
                  order_id: data.orderId,
                }
              : undefined,
        },
      ],
    };

    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        // Loga server-side apenas; não expõe detalhes do provedor ao cliente.
        console.error("[meta-capi] falha", res.status, await res.text());
        return { ok: false, error: "provider_error" };
      }
      return { ok: true };
    } catch (err) {
      console.error("[meta-capi] erro de rede", err);
      return { ok: false, error: "network_error" };
    }
  });
