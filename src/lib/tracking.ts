/**
 * Captura e preserva os parâmetros de rastreamento (UTMs + click ids) desde a
 * chegada do visitante até o checkout da Perfect Pay.
 *
 * Motivo: scripts de terceiros (e links estáticos) podem sobrescrever as UTMs
 * do anúncio com valores inúteis (`organic`, vazio, `undefined`), quebrando a
 * atribuição da venda na Utmify. Guardamos a primeira captura válida e a
 * reaplicamos em toda URL de checkout.
 */

export const TRACKING_STORAGE_KEY = "utmify_tracking_params";

export const TRACKING_KEYS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
  "utm_id",
  "src",
  "sck",
  "fbclid",
  "gclid",
  "ttclid",
] as const;

export type TrackingParams = Partial<Record<(typeof TRACKING_KEYS)[number], string>>;

/** Hosts de checkout da Perfect Pay (link direto e encurtador). */
export const CHECKOUT_HOSTS = ["checkout.perfectpay.com.br", "go.perfectpay.com.br"] as const;
export const CHECKOUT_HOST = "checkout.perfectpay.com.br";

/** URL única do checkout (fonte da verdade para todos os CTAs). */
export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/pay/PPU38CQCGGM`;

/**
 * Checkout do upsell MasterMind. Substitua o código do produto pelo link real
 * gerado na Perfect Pay; o enriquecimento de UTM funciona automaticamente
 * porque o host já pertence a CHECKOUT_HOSTS.
 */
export const MASTERMIND_CHECKOUT_URL = `https://go.perfectpay.com.br/PPU38CQFEH7`;

const INVALID_VALUES = new Set(["", "organic", "undefined", "null", "none", "(none)", "direct"]);

/** Um valor só é atribuível se não for placeholder/vazio. */
export function isValidValue(value: string | null | undefined): value is string {
  if (typeof value !== "string") return false;
  return !INVALID_VALUES.has(value.trim().toLowerCase());
}

const isDev = (): boolean => {
  try {
    return Boolean(import.meta.env?.DEV);
  } catch {
    return false;
  }
};

function debug(label: string, payload: unknown) {
  if (!isDev()) return;
  // eslint-disable-next-line no-console
  console.info(`[tracking] ${label}`, payload);
}

/** Lê os parâmetros válidos da URL atual. */
export function readTrackingFromUrl(search = window.location.search): TrackingParams {
  const params = new URLSearchParams(search);
  const found: TrackingParams = {};
  for (const key of TRACKING_KEYS) {
    const value = params.get(key);
    if (isValidValue(value)) found[key] = value;
  }
  return found;
}

/** Lê os parâmetros já persistidos nesta sessão. */
export function readStoredTracking(): TrackingParams {
  try {
    const raw = sessionStorage.getItem(TRACKING_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const stored: TrackingParams = {};
    for (const key of TRACKING_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && isValidValue(value)) stored[key] = value;
    }
    return stored;
  } catch {
    return {};
  }
}

/**
 * Captura as UTMs da URL e mescla com as já salvas (URL válida vence).
 * Nunca sobrescreve um valor válido salvo com um valor inválido.
 */
export function captureTracking(): TrackingParams {
  const fromUrl = readTrackingFromUrl();
  const stored = readStoredTracking();
  const merged: TrackingParams = { ...stored, ...fromUrl };

  debug("capturadas da URL", fromUrl);

  try {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(merged));
    debug("salvas na sessão", merged);
  } catch {
    // sessionStorage indisponível — seguimos apenas em memória
  }

  return merged;
}

/** Junta o que está salvo com o que está na URL agora. */
export function currentTracking(): TrackingParams {
  return { ...readStoredTracking(), ...readTrackingFromUrl() };
}

export function isCheckoutUrl(href: string): boolean {
  return typeof href === "string" && CHECKOUT_HOSTS.some((host) => href.includes(host));
}

/**
 * Constrói a URL final do checkout.
 *
 * Regra: o rastreamento capturado do anúncio é a fonte da verdade. Scripts de
 * terceiros reescrevem os links (ex.: `utm_source=organic`, campos vazios, ou
 * `utm_content=AD|789::fbclid::` com subids anexados), então qualquer valor
 * salvo válido sobrescreve o que estiver no href. Parâmetros que só existem no
 * link (sem equivalente salvo) são preservados.
 */
export function buildCheckoutUrl(href: string): string {
  try {
    const tracking = currentTracking();
    const url = new URL(href, window.location.origin);

    for (const key of TRACKING_KEYS) {
      const saved = tracking[key];
      const existing = url.searchParams.get(key);

      if (isValidValue(saved)) {
        if (existing !== saved) url.searchParams.set(key, saved);
        continue;
      }
      // Sem valor capturado: mantém o do link se for válido, senão remove o lixo.
      if (existing !== null && !isValidValue(existing)) url.searchParams.delete(key);
    }

    // Garante que fbp e fbc sejam passados para o checkout para serem recuperados no webhook
    const fbp = document.cookie.match(/(^|; )_fbp=([^;]*)/)?.[2];
    if (fbp && !url.searchParams.has("fbp")) url.searchParams.set("fbp", fbp);
    const fbc = document.cookie.match(/(^|; )_fbc=([^;]*)/)?.[2] || tracking.fbclid;
    if (fbc && !url.searchParams.has("fbc")) url.searchParams.set("fbc", fbc.startsWith("fb.") ? fbc : `fb.1.${Date.now()}.${fbc}`);

    const finalUrl = url.toString();
    debug("URL final do checkout", finalUrl);
    return finalUrl;
  } catch {
    return href;
  }
}
