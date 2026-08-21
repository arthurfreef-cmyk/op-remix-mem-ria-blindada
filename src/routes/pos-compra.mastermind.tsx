import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Check, ChevronDown, Lock, ShieldCheck } from "lucide-react";
import { MASTERMIND_CHECKOUT_URL, buildCheckoutUrl } from "@/lib/tracking";
import { trackUpsell, usePurchaseStatus } from "@/lib/upsell";
import mastermindApp from "@/assets/mastermind-app.png.asset.json";


export const Route = createFileRoute("/pos-compra/mastermind")({
  head: () => ({
    meta: [
      { title: "MasterMind: A Mente Perfeita — oferta de pos-compra" },
      {
        name: "description",
        content:
          "MasterMind: A Mente Perfeita. Uma mente perfeita e blindada sem esquecimentos. Condicao de pos-compra por R$ 47,90.",
      },
      { property: "og:title", content: "MasterMind: A Mente Perfeita" },
      {
        property: "og:description",
        content: "Uma mente perfeita e blindada sem esquecimentos. Condicao especial de pos-compra.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MasterMindPage,
});

const PRICE = 47.9;

const painPoints = [
  "Ler uma pagina e perceber que nao consegue explicar o que acabou de ler.",
  "Estudar a noite e esquecer a maior parte no dia seguinte.",
  "Saber a resposta, mas travar quando precisa recupera-la.",
  "Perder concentracao com qualquer notificacao ou pensamento paralelo.",
  "Recomecar o mesmo conteudo porque a memoria nao consolidou o aprendizado.",
];

const deliverables: Array<{ title: string; text: string }> = [
  { title: "Protocolo Mente Perfeita", text: "sequencia diaria para treinar atencao, recuperacao e retencao." },
  { title: "Sistema Anti-Branco", text: "exercicios para recuperar informacoes quando a pressao aumenta." },
  { title: "Blindagem contra distracoes", text: "sessoes progressivas para aumentar o tempo de foco sem depender do celular." },
  { title: "Metodo de Memoria de Aco", text: "praticas de associacao, evocacao e repeticao para reforcar o aprendizado." },
  { title: "Rotina dos 15 Minutos Imparaveis", text: "um plano curto para manter consistencia mesmo nos dias corridos." },
  { title: "Mapa de Revisao Inteligente", text: "saber o que revisar, quando revisar e como testar se realmente aprendeu." },
  { title: "Treino de Velocidade Mental", text: "desafios para diminuir a demora na compreensao e na recuperacao de conteudos." },
  { title: "Protocolo Pre-Prova e Pre-Reuniao", text: "preparacao rapida para entrar em momentos decisivos com mais clareza." },
  { title: "Painel de evolucao", text: "acompanhamento simples de pratica, consistencia, foco e desempenho percebido." },
  { title: "Acesso vitalicio e atualizacoes", text: "acesso em celular e computador, com materiais complementares adicionados ao produto." },
  { title: "Plano de 30 dias", text: "roteiro fechado para nao ficar perdido sobre o que fazer em cada etapa." },
  { title: "Suporte orientado", text: "canal para duvidas sobre a execucao dos exercicios e da rotina." },
];

const valueStack: Array<[string, string]> = [
  ["Protocolo Mente Perfeita", "R$ 97,00"],
  ["Sistema Anti-Branco", "R$ 67,00"],
  ["Blindagem contra distracoes", "R$ 47,00"],
  ["Metodo de Memoria de Aco", "R$ 97,00"],
  ["Rotina dos 15 Minutos Imparaveis", "R$ 47,00"],
  ["Mapa de Revisao Inteligente", "R$ 67,00"],
  ["Plano de 30 dias e atualizacoes", "R$ 97,00"],
];

const faq: Array<{ q: string; a: string }> = [
  { q: "Se eu recusar, perco os 150 Exercicios?", a: "Nao. A compra anterior permanece ativa." },
  { q: "O MasterMind substitui o produto principal?", a: "Nao. Ele e o nivel complementar e avancado." },
  { q: "Quando recebo o acesso?", a: "Apos a confirmacao do pagamento, usando a mesma conta ou e-mail da compra." },
  { q: "Posso acessar pelo celular?", a: "Sim, desde que o conteudo esteja configurado como responsivo." },
  { q: "Vou ser cobrado automaticamente?", a: "Nao. So ha cobranca se o comprador confirmar a oferta no checkout." },
];

/** CTA de aceite: registra o evento e leva ao checkout ja com as UTMs preservadas. */
function AcceptButton({ className, label }: { className?: string; label: string }) {
  return (
    <a
      href={MASTERMIND_CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        trackUpsell("upsell_accept_click", PRICE);
        event.currentTarget.setAttribute("href", buildCheckoutUrl(MASTERMIND_CHECKOUT_URL));
      }}
      className={className}
    >
      {label}
    </a>
  );
}

function DeclineLink({ className }: { className?: string }) {
  return (
    <Link
      to="/obrigado"
      onClick={() => trackUpsell("upsell_decline_click")}
      className={className}
    >
      Nao, obrigado. Vou seguir apenas com o produto principal.
    </Link>
  );
}

function MasterMindPage() {
  const { status } = usePurchaseStatus();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (status === "confirmed") trackUpsell("upsell_offer_view", PRICE);
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
            Oferta disponivel apenas apos a compra
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            O MasterMind e liberado somente para quem acabou de concluir a compra do treinamento
            principal.
          </p>
          <Link
            to="/oferta"
            className="mt-6 inline-block bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-sm px-6 py-3 rounded-xl"
          >
            Conhecer o treinamento principal
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      <div className="bg-brand-red text-white text-center py-2.5 px-3 text-xs sm:text-sm font-black tracking-wide">
        <AlertTriangle className="inline-block w-4 h-4 mr-1.5 -mt-0.5" aria-hidden="true" />
        OFERTA EXCLUSIVA DE POS-COMPRA — NAO FECHE ESTA PAGINA
      </div>

      <div className="mx-auto w-full max-w-[980px] px-4 sm:px-6">
        <header className="mt-8 sm:mt-12">
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight text-foreground">
            MASTERMIND: A MENTE PERFEITA
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-black leading-snug text-foreground">
            A promessa e direta:{" "}
            <span className="bg-yellow-300 px-1 text-black">
              uma mente perfeita e blindada sem esquecimentos
            </span>
            .
          </p>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Pare de estudar muito e lembrar pouco. Entre no sistema avancado para treinar a
            recuperacao da informacao, fortalecer o foco e reduzir os apagoes mentais que sabotam
            sua performance.
          </p>
          <p className="mt-5 rounded-xl border-2 border-success/40 bg-success/10 p-4 text-sm text-foreground">
            Esta e uma oferta complementar ao produto que voce acabou de comprar. Seu acesso aos 150
            Exercicios Mentais continua garantido mesmo que voce recuse.
          </p>
        </header>

        <figure className="mt-8">
          <img
            src={mastermindApp.url}
            alt="Telas do MasterMind: A Mente Perfeita — treino do dia, progresso da memoria e desafios"
            loading="lazy"
            width={1920}
            height={1920}
            className="w-full rounded-2xl border-2 border-border bg-card"
          />
          <figcaption className="mt-2 text-center text-xs text-muted-foreground">
            Ambiente de treino MasterMind — acesse pelo celular, tablet ou computador.
          </figcaption>
        </figure>


        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-foreground">
            Voce nao precisa de mais informacao. Precisa de uma mente que nao abandone voce na hora
            decisiva.
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {painPoints.map((item) => (
              <div
                key={item}
                className="rounded-xl border-2 border-foreground bg-card p-4 text-sm sm:text-base font-semibold text-foreground"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl bg-foreground text-background p-5 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            Do cerebro vulneravel ao sistema mental blindado.
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-90">
            O MasterMind organiza o treinamento em protocolos praticos para que voce nao dependa
            apenas de motivacao. A proposta e criar uma rotina de recuperacao, foco e consolidacao
            que voce consegue repetir no dia a dia.
          </p>
          <p className="mt-4 text-sm sm:text-base leading-relaxed font-bold">
            O objetivo do MasterMind e conduzir voce na construcao de uma mente perfeita e blindada
            sem esquecimentos, por meio de pratica estruturada e consistente.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-foreground">
            Tudo o que entra na sua mente a partir de agora.
          </h2>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            {deliverables.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-xl border-2 border-foreground bg-card p-4"
              >
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm sm:text-base text-foreground">
                  <span className="font-black">{item.title}:</span> {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-foreground">
            Valor de referencia do pacote
          </h2>
          <div className="mt-6 overflow-hidden rounded-2xl border-2 border-foreground">
            <table className="w-full text-sm sm:text-base">
              <caption className="sr-only">Valor de referencia de cada componente do MasterMind</caption>
              <tbody>
                {valueStack.map(([label, value]) => (
                  <tr key={label} className="border-b border-border">
                    <th scope="row" className="text-left font-medium p-3 text-foreground">
                      {label}
                    </th>
                    <td className="p-3 text-right tabular-nums text-muted-foreground">{value}</td>
                  </tr>
                ))}
                <tr className="border-b-2 border-foreground bg-muted">
                  <th scope="row" className="text-left font-black p-3 text-foreground">
                    Valor total de referencia
                  </th>
                  <td className="p-3 text-right font-black tabular-nums text-foreground">R$ 519,00</td>
                </tr>
                <tr className="bg-brand-red text-white">
                  <th scope="row" className="text-left font-black p-3">
                    Condicao especial nesta tela
                  </th>
                  <td className="p-3 text-right font-black tabular-nums">R$ 47,90</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border-4 border-brand-red p-5 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black leading-tight text-foreground">
            Voce entrou pelo treinamento basico. Agora pode liberar o nivel MasterMind.
          </h2>
          <p className="mt-6 text-base text-muted-foreground line-through">De: R$ 197,00</p>
          <p className="text-sm font-bold text-foreground">Hoje, somente nesta tela:</p>
          <p className="text-5xl sm:text-6xl font-black text-brand-red leading-none mt-1">R$ 47,90</p>
          <p className="mt-2 text-sm font-bold text-foreground">
            a vista ou em ate 3x no cartao
          </p>

          <AcceptButton
            label="SIM, QUERO MINHA MENTE PERFEITA E BLINDADA"
            className="mt-6 block w-full bg-brand-red hover:bg-brand-red-dark active:scale-[0.99] transition text-white font-black text-base sm:text-lg py-5 rounded-xl shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Aceitar esta oferta nao substitui sua compra anterior; adiciona o MasterMind ao seu
            acesso.
          </p>
          <DeclineLink className="mt-5 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground" />
        </section>

        <section className="mt-8 rounded-2xl border-2 border-border p-5 flex gap-3">
          <ShieldCheck className="w-6 h-6 text-success flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Consulte as condicoes de garantia exibidas no checkout antes de confirmar.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Perguntas frequentes</h2>
          <div className="mt-5 space-y-2">
            {faq.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className="rounded-xl border-2 border-foreground bg-card">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left font-black text-sm sm:text-base text-foreground"
                  >
                    {item.q}
                    <ChevronDown
                      className={`w-5 h-5 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {open ? (
                    <p className="px-4 pb-4 text-sm text-muted-foreground">{item.a}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <footer className="mt-12 border-t border-border pt-6 pb-4">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            O MasterMind e um programa educacional de treino de memoria, foco e habitos de estudo.
            Nao substitui avaliacao ou tratamento medico e nao promete eliminar condicoes clinicas
            de memoria.
          </p>
          <div className="mt-3 flex gap-4 text-[11px] text-muted-foreground">
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
