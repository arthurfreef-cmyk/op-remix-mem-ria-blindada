import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Atalho interno: abre a pagina principal do upsell em modo de pre-visualizacao,
 * sem exigir compra confirmada. Uso restrito ao dono do funil (noindex na pagina destino).
 */
export const Route = createFileRoute("/preview/mastermind")({
  beforeLoad: () => {
    throw redirect({ href: "/pos-compra/mastermind?preview=1" });
  },
});
