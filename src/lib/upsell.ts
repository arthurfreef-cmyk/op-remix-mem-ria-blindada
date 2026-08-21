/**
 * Estado de compra e eventos analíticos do fluxo de pós-compra (upsell MasterMind).
 *
 * Regra de negócio: acessar a URL nao prova compra. A liberacao real depende de
 * um identificador de transacao vindo do checkout (parametro na URL de retorno)
 * ou da confirmacao ja registrada nesta sessao pelo webhook/retorno.
 */

import { useEffect, useState } from "react";
import { trackMeta } from "@/components/meta-tracking";

export const PURCHASE_FLAG_KEY = "me_purchase_confirmed";

/** Parametros que a Perfect Pay pode enviar no retorno pos-compra. */
const ORDER_PARAM_KEYS = [
  "transaction",
  "transaction_code",
  "sale_code",
  "order_id",
  "code",
  "token",
] as const;

export type PurchaseStatus = "checking" | "confirmed" | "unconfirmed";

/** Chave do modo de pre-visualizacao interna (nao indexado, uso do dono do funil). */
export const PREVIEW_KEY = "me_upsell_preview";

/**
 * Modo de pre-visualizacao: libera as telas de pos-compra sem compra real.
 * Ativado por `?preview=1` na URL e mantido na sessao para navegar entre telas.
 * Nao afeta o fluxo real de compradores (nenhum pedido e criado ou marcado).
 */
export function isPreviewMode(): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("preview")?.replace(/"/g, "");
    if (flag === "1" || flag === "true") {
      sessionStorage.setItem(PREVIEW_KEY, "1");
      return true;
    }
    if (flag === "0") {
      sessionStorage.removeItem(PREVIEW_KEY);
      return false;
    }
    return sessionStorage.getItem(PREVIEW_KEY) === "1";
  } catch {
    return false;
  }
}

function readOrderIdFromUrl(): string | undefined {
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of ORDER_PARAM_KEYS) {
      const value = params.get(key);
      if (value && value.trim()) return value.trim();
    }
  } catch {
    // ambiente sem window/URLSearchParams
  }
  return undefined;
}

function readStoredOrderId(): string | undefined {
  try {
    const value = sessionStorage.getItem(PURCHASE_FLAG_KEY);
    return value && value.trim() ? value : undefined;
  } catch {
    return undefined;
  }
}

/** Persiste a confirmacao para as proximas telas do funil desta sessao. */
export function markPurchaseConfirmed(orderId: string): void {
  try {
    sessionStorage.setItem(PURCHASE_FLAG_KEY, orderId);
  } catch {
    // sessionStorage indisponivel
  }
}

/**
 * Resolve o status da compra no cliente. Roda apenas apos a hidratacao para
 * evitar divergencia entre HTML do servidor e do navegador.
 */
export function usePurchaseStatus(): { status: PurchaseStatus; orderId?: string } {
  const [state, setState] = useState<{ status: PurchaseStatus; orderId?: string }>({
    status: "checking",
  });

  useEffect(() => {
    if (isPreviewMode()) {
      setState({ status: "confirmed", orderId: undefined });
      return;
    }
    const fromUrl = readOrderIdFromUrl();
    if (fromUrl) markPurchaseConfirmed(fromUrl);
    const orderId = fromUrl ?? readStoredOrderId();
    setState(orderId ? { status: "confirmed", orderId } : { status: "unconfirmed" });
  }, []);

  return state;
}

export type UpsellEvent =
  | "upsell_presell_view"
  | "upsell_offer_view"
  | "upsell_interest_click"
  | "upsell_accept_click"
  | "upsell_decline_click"
  | "upsell_checkout_completed";

/** Evento analitico dedicado do funil de upsell (pixel + CAPI, mesmo event_id). */
export function trackUpsell(event: UpsellEvent, value?: number): void {
  trackMeta(event, {
    content_name: "MasterMind: A Mente Perfeita",
    currency: "BRL",
    ...(typeof value === "number" ? { value } : {}),
  });
}
