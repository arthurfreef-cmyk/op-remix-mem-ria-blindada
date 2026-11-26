import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { sendMetaEvent } from "@/lib/meta-capi.functions";
import { buildCheckoutUrl, captureTracking, isCheckoutUrl } from "@/lib/tracking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * O _fbp só é escrito depois que o fbevents.js roda. Sem ele o Meta perde o
 * match entre pixel e CAPI, então esperamos (com teto) antes de enviar.
 */
function waitForFbp(timeoutMs = 2500): Promise<string | undefined> {
  return new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      const fbp = readCookie("_fbp");
      if (fbp || Date.now() - started >= timeoutMs) return resolve(fbp);
      window.setTimeout(tick, 150);
    };
    tick();
  });
}

/** Quando o _fbc ainda não existe, monta-o a partir do fbclid da URL (formato oficial). */
function resolveFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  try {
    const stored = sessionStorage.getItem("me_fbc");
    if (stored) return stored;
    const fbclid = new URLSearchParams(window.location.search).get("fbclid");
    if (!fbclid) return undefined;
    const built = `fb.1.${Date.now()}.${fbclid}`;
    sessionStorage.setItem("me_fbc", built);
    return built;
  } catch {
    return undefined;
  }
}

/** ID anônimo estável do visitante — melhora a qualidade de correspondência no Meta. */
function externalId(): string | undefined {
  try {
    let id = localStorage.getItem("me_eid");
    if (!id) {
      id = `me_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("me_eid", id);
    }
    return id;
  } catch {
    return undefined;
  }
}

export interface TrackParams {
  value?: number;
  currency?: string;
  content_name?: string;
  [key: string]: unknown;
}

/**
 * Dispara o evento no pixel do navegador e na Conversions API
 * com o mesmo event_id (deduplicação obrigatória do Meta).
 */
export interface TrackOptions {
  /** ID fixo (ex.: id da transação) para deduplicar entre pixel e CAPI. */
  eventId?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  orderId?: string;
}

export function trackMeta(eventName: string, params: TrackParams = {}, options: TrackOptions = {}) {
  if (typeof window === "undefined") return;
  const eventId = options.eventId ?? newEventId();
  // Mesmo event_time no pixel e na CAPI: o Meta exige isso para deduplicar.
  const eventTime = Math.floor(Date.now() / 1000);
  const eventSourceUrl = window.location.href;
  const fbc = resolveFbc();

  try {
    window.fbq?.("track", eventName, params, { eventID: eventId });
  } catch {
    // pixel bloqueado por adblock — segue via CAPI
  }

  void waitForFbp()
    .then((fbp) =>
      sendMetaEvent({
        data: {
          eventName,
          eventId,
          eventTime,
          eventSourceUrl,
          fbp,
          fbc,
          externalId: externalId(),
          value: typeof params.value === "number" ? params.value : undefined,
          currency: typeof params.currency === "string" ? params.currency : "BRL",
          contentName: typeof params.content_name === "string" ? params.content_name : undefined,
          email: options.email,
          phone: options.phone,
          firstName: options.firstName,
          lastName: options.lastName,
          orderId: options.orderId,
        },
      }),
    )
    .catch(() => undefined);
}

/** Sobrescreve window.open para que redirecionamentos via JS também levem as UTMs. */
function patchWindowOpen(): () => void {
  const original = window.open.bind(window);
  window.open = ((url?: string | URL, ...rest: unknown[]) => {
    const href = typeof url === "string" ? url : url?.toString();
    const next = href && isCheckoutUrl(href) ? buildCheckoutUrl(href) : href;
    return (original as (u?: string | URL, ...a: unknown[]) => Window | null)(next, ...rest);
  }) as typeof window.open;
  return () => {
    window.open = original;
  };
}

/** Metadados do produto por rota, usados no ViewContent / InitiateCheckout. */
function offerForPath(pathname: string): { name: string; value: number } {
  if (pathname.startsWith("/downsell")) return { name: "Plano Essencial 80 Exercícios", value: 17 };
  // Upsell de pós-compra: precisa reportar o produto e o valor corretos ao Meta.
  if (pathname.startsWith("/pos-compra/mastermind")) {
    return { name: "MasterMind: A Mente Perfeita", value: 47.9 };
  }
  return { name: "150 Exercícios Mentais", value: 27.9 };
}

/**
 * Cobre o funil inteiro: PageView em toda rota, ViewContent nas páginas
 * de oferta e InitiateCheckout no clique do checkout — browser + CAPI.
 */
export function MetaTracking() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Scripts da Utmify (pixel + UTMs). Carregados só depois da hidratação:
  // eles reescrevem os href dos links e no <head> causariam hydration mismatch.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (document.querySelector("script[data-utmify-utms]")) return;
      (window as unknown as { pixelId?: string }).pixelId = "6a6ff3fd8e726193b5f05088";
      const pixel = document.createElement("script");
      pixel.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
      pixel.async = true;
      pixel.defer = true;
      document.head.appendChild(pixel);

      const s = document.createElement("script");
      s.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
      s.async = true;
      s.defer = true;
      s.setAttribute("data-utmify-utms", "");
      s.setAttribute("data-utmify-prevent-xcod-sck", "");
      s.setAttribute("data-utmify-prevent-subids", "");
      document.head.appendChild(s);
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    captureTracking();
    const offer = offerForPath(pathname);
    const isOfferPage =
      pathname.startsWith("/oferta") ||
      pathname.startsWith("/downsell") ||
      pathname === "/pos-compra/mastermind";

    // O _fbp/_fbc só existem depois que o pixel roda; pequeno atraso melhora o match.
    const timer = window.setTimeout(() => {
      trackMeta("PageView");
      if (isOfferPage) {
        trackMeta("ViewContent", {
          content_name: offer.name,
          value: offer.value,
          currency: "BRL",
        });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    /**
     * Reescreve preventivamente todo link de checkout do DOM. Cobre casos em
     * que a navegação não passa pelo nosso handler (middle-click, abrir em nova
     * aba, links reescritos por scripts de terceiros depois da hidratação).
     */
    const enrichAnchors = () => {
      document.querySelectorAll("a[href]").forEach((el) => {
        const anchor = el as HTMLAnchorElement;
        const href = anchor.getAttribute("href") ?? "";
        if (!isCheckoutUrl(href)) return;
        const enriched = buildCheckoutUrl(href);
        if (enriched !== href) anchor.setAttribute("href", enriched);
      });
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!isCheckoutUrl(href)) return;

      const offer = offerForPath(window.location.pathname);
      trackMeta("InitiateCheckout", {
        content_name: offer.name,
        value: offer.value,
        currency: "BRL",
      });

      // Restaura as UTMs reais do anúncio (o link pode ter sido reescrito com
      // valores inválidos como `organic` ou campos vazios).
      const enriched = buildCheckoutUrl(href);
      if (enriched !== href) anchor.setAttribute("href", enriched);

      // A navegação cancelaria o POST da CAPI: seguramos ~350ms e então saímos.
      const opensNewTab = anchor.getAttribute("target") === "_blank";
      if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      window.setTimeout(() => {
        if (opensNewTab) window.open(enriched, "_blank", "noopener,noreferrer");
        else window.location.href = enriched;
      }, 350);
    };

    captureTracking();
    enrichAnchors();
    const observer = new MutationObserver(() => enrichAnchors());
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["href"],
    });

    const restoreOpen = patchWindowOpen();
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      observer.disconnect();
      restoreOpen();
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
    };

  }, []);

  return null;
}
