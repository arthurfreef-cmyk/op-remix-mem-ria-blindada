import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Lock, ShieldCheck } from "lucide-react";
import { trackUpsell, usePurchaseStatus } from "@/lib/upsell";

export const Route = createFileRoute("/pos-compra/mastermind-presell")({
  head: () => ({
    meta: [
      { title: "Condicao especial de pos-compra — MasterMind" },
      {
        name: "description",
        content:
          "Uma pergunta antes de liberar seu acesso: voce quer a condicao especial do MasterMind: A Mente Perfeita?",
      },
      { property: "og:title", content: "Condicao especial de pos-compra — MasterMind" },
      {
        property: "og:description",
        content: "Uma mente perfeita e blindada sem esquecimentos. Oferta unica de pos-compra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PresellPage,
});

/** Beneficios centrais — curtos e concretos, para leitura em poucos segundos. */
const BENEFITS: readonly string[] = [
  "Parar de esquecer o que voce acabou de estudar",
  "Nao travar na hora da prova, da reuniao ou da conversa",
  "Manter o foco sem depender do celular a cada 5 minutos",
  "Revisar menos e lembrar mais, com um plano de 30 dias",
];

function PresellPage() {
  const { status } = usePurchaseStatus();

  useEffect(() => {
    if (status === "confirmed") trackUpsell("upsell_presell_view");
  }, [status]);

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">Verificando sua compra...</p>
      </main>
    );
  }

  if (status === "unconfirmed") {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center border-2 border-border rounded-2xl p-8">
          <Lock className="w-10 h-10 mx-auto text-brand-red" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-black text-foreground">
            Esta tela e exclusiva de pos-compra
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Nao encontramos uma compra confirmada nesta sessao. A condicao especial do MasterMind e
            liberada apenas apos a confirmacao do pagamento pelo checkout.
          </p>
          <Link
            to="/oferta"
            className="mt-6 inline-block bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-sm px-6 py-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Conhecer o treinamento principal
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 sm:py-16">
      <div className="w-full max-w-[560px]">
        <div className="bg-brand-red animate-pulse text-white text-center py-2 px-3 rounded-t-2xl text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase">
          ⚠️ Oportunidade Única: Não recarregue esta página
        </div>
        
        <section className="rounded-b-2xl border-x-2 border-b-2 border-foreground bg-card p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-bl-lg uppercase tracking-tighter">
            Oferta Especial
          </div>
          <p className="text-xs font-black uppercase tracking-wide text-brand-red flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            Acesso Prioritário
          </p>

          <h1 className="mt-4 text-2xl sm:text-3xl font-black leading-tight text-foreground tracking-tight">
            Esperar! Você gostaria de blindar sua memória e acelerar seus resultados agora?
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Muitos alunos dos 150 Exercícios optam por este acelerador para:
          </p>

          <ul className="mt-4 space-y-2.5">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-2.5 text-sm sm:text-base text-foreground">
                <Check className="w-5 h-5 flex-shrink-0 text-success" aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 space-y-3">
            <Link
              to="/pos-compra/mastermind"
              onClick={() => trackUpsell("upsell_interest_click")}
              className="block w-full rounded-xl bg-brand-red hover:bg-brand-red-dark active:scale-[0.99] transition text-white text-center font-black text-base sm:text-lg py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              SIM, quero acesso ao acelerador MasterMind
            </Link>
            <Link
              to="/obrigado"
              onClick={() => trackUpsell("upsell_decline_click")}
              className="block w-full rounded-xl border-2 border-border bg-background text-center font-bold text-sm sm:text-base text-muted-foreground py-3.5 hover:text-foreground hover:border-foreground transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              NÃO, seguir apenas com os 150 Exercícios por enquanto
            </Link>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 font-medium">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 text-success" aria-hidden="true" />
              Esta oferta expira assim que você sair desta página.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
