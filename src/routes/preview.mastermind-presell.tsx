import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Atalho interno: abre o presell de pos-compra em modo de pre-visualizacao,
 * sem exigir compra confirmada. Uso restrito ao dono do funil (noindex na pagina destino).
 */
export const Route = createFileRoute("/preview/mastermind-presell")({
  beforeLoad: () => {
    throw redirect({ href: "/pos-compra/mastermind-presell?preview=1" });
  },
});
