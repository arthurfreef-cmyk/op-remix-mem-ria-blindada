import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { trackUpsell, usePurchaseStatus } from "@/lib/upsell";

export const Route = createFileRoute("/pos-compra/obrigado")({
  head: () => ({
    meta: [
      { title: "MasterMind liberado — Mentes Exercitadas" },
      {
        name: "description",
        content:
          "Sua compra do MasterMind: A Mente Perfeita foi confirmada. Veja como acessar o programa completo.",
      },
      { property: "og:title", content: "MasterMind liberado — Mentes Exercitadas" },
      {
        property: "og:description",
        content: "Compra do MasterMind confirmada. Acesso liberado ao programa avançado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: UpsellObrigadoPage,
});

const PRICE = 47.9;

const nextSteps: Array<{ title: string; text: string }> = [
  {
    title: "Confira seu e-mail",
    text: "O acesso ao MasterMind chega no mesmo e-mail usado na compra. Verifique também spam e promoções.",
  },
  {
    title: "Comece pelo Protocolo Mente Perfeita",
    text: "É a primeira sequência do plano de 30 dias e prepara sua rotina de foco e recuperação.",
  },
  {
    title: "Reserve 15 minutos por dia",
    text: "A Rotina dos 15 Minutos Imparáveis existe para manter consistência mesmo nos dias corridos.",
  },
];

function UpsellObrigadoPage() {
  const { status, orderId } = usePurchaseStatus();

  useEffect(() => {
    if (status === "confirmed") trackUpsell("upsell_checkout_completed", PRICE);
  }, [status]);

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-success text-white text-center py-2.5 px-3 text-xs sm:text-sm font-black tracking-wide">
        <CheckCircle2 className="inline-block w-4 h-4 mr-1.5 -mt-0.5" aria-hidden="true" />
        COMPRA DO MASTERMIND CONFIRMADA
      </div>

      <div className="mx-auto w-full max-w-[840px] px-4 sm:px-6 pb-16">
        <header className="mt-10 sm:mt-14 text-center">
          <Sparkles className="w-10 h-10 mx-auto text-brand-red" aria-hidden="true" />
          <h1 className="mt-4 text-3xl sm:text-5xl font-black leading-tight tracking-tight text-foreground">
            Bem-vindo ao MasterMind: A Mente Perfeita
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Seu nível avançado foi liberado. A partir de agora você tem o sistema completo para
            treinar foco, memória e recuperação de informação.
          </p>
          {orderId ? (
            <p className="mt-4 inline-block rounded-lg border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground">
              Código da transação: <span className="font-bold text-foreground">{orderId}</span>
            </p>
          ) : null}
        </header>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          {nextSteps.map((step) => (
            <div key={step.title} className="rounded-xl border-2 border-foreground bg-card p-4">
              <h2 className="text-sm sm:text-base font-black text-foreground">{step.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border-2 border-border p-5 flex gap-3">
          <Mail className="w-6 h-6 text-brand-red flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Não recebeu o e-mail de acesso em até 10 minutos? Responda o e-mail da compra ou use o
            canal de suporte informado no comprovante da Perfect Pay.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border-2 border-border p-5 flex gap-3">
          <ShieldCheck className="w-6 h-6 text-success flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Seu acesso aos 150 Exercícios Mentais continua ativo e independente desta compra.
          </p>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/obrigado"
            className="inline-block bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-sm px-6 py-3 rounded-xl"
          >
            Ver o acesso do produto principal
          </Link>
        </div>

        <footer className="mt-12 border-t border-border pt-6">
          <div className="flex gap-4 text-[11px] text-muted-foreground">
            <Link to="/privacidade" className="underline underline-offset-4">
              Privacidade
            </Link>
            <Link to="/reembolso" className="underline underline-offset-4">
              Reembolso
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
