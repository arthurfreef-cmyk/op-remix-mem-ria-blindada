import { createFileRoute } from "@tanstack/react-router";
import { Check, ShieldCheck, Lock, X, CreditCard, Star, ArrowRight } from "lucide-react";
import pack80 from "@/assets/pack-80.jpg";
import avatar1 from "@/assets/avatars/avatar-1.jpg";
import avatar3 from "@/assets/avatars/avatar-3.jpg";
import avatar5 from "@/assets/avatars/avatar-5.jpg";

export const Route = createFileRoute("/downsell")({
  head: () => ({
    meta: [
      { title: "Plano Inicial — 80 Exercícios Mentais por R$ 9,90" },
      { name: "description", content: "Comece pelo essencial: 80 exercícios mentais para parar de esquecer o que estuda. Acesso vitalício por R$ 9,90." },
      { property: "og:title", content: "Plano Inicial — 80 Exercícios Mentais por R$ 9,90" },
      { property: "og:description", content: "80 exercícios mentais, 10 min por dia, acesso vitalício. R$ 9,90." },
      { property: "og:url", content: "https://mentesexercitadas.lovable.app/downsell" },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: "https://mentesexercitadas.lovable.app/downsell" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Plano Inicial — 80 Exercícios Mentais",
          image: ["https://mentesexercitadas.lovable.app" + pack80],
          description:
            "80 exercícios mentais para treinar memória e foco em 10 minutos por dia, com acesso vitalício.",
          brand: { "@type": "Brand", name: "Mentes Exercitadas" },
          offers: {
            "@type": "Offer",
            url: "https://mentesexercitadas.lovable.app/downsell",
            price: "9.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: DownsellPage,
});

const checkoutDownsell = "https://go.perfectpay.com.br/PPU38CQF603";

function DownsellPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 mb-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-gray-700">Plano Inicial</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-[1.05] tracking-tight mb-4">
            Comece a lembrar do que estuda por <span className="text-brand-red">R$ 9,90</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            80 exercícios mentais. 10 minutos por dia. Sem enrolação, sem teoria inútil — só o que faz sua memória parar de falhar na hora da prova.
          </p>
        </div>

        {/* Pain, curto e direto */}
        <div className="bg-gray-50 border-l-4 border-brand-red rounded-r-lg p-4 sm:p-5 mb-7">
          <ul className="space-y-1.5 text-sm sm:text-base text-gray-700">
            <li className="flex gap-2"><X className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" /> Estuda horas e no dia seguinte não lembra quase nada</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" /> Relê o mesmo trecho 3, 4 vezes e a cabeça continua vazia</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-brand-red mt-1 flex-shrink-0" /> Trava na prova em questão que você tinha estudado</li>
          </ul>
          <p className="text-sm sm:text-base font-bold mt-3 text-foreground">Memória não é dom. É treino. E treino começa hoje.</p>
        </div>

        {/* Oferta */}
        <div className="bg-white border-2 border-brand-red rounded-2xl shadow-lg p-5 sm:p-7 mb-7">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[140px_1fr] gap-4 items-center mb-5">
            <img src={pack80} alt="Plano Inicial — 80 exercícios mentais" className="w-full rounded-lg shadow-md" loading="lazy" />
            <div>
              <h2 className="text-xl sm:text-2xl font-black leading-tight mb-1">80 Exercícios Mentais</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">O núcleo do método: os exercícios que mais geram resultado em memória, foco e retenção.</p>
            </div>
          </div>

          <ul className="space-y-2.5 mb-5">
            {[
              "80 exercícios práticos de memória, foco e retenção",
              "Rotina de 10 min/dia — cabe em qualquer agenda",
              "Técnica do 'gancho mental' para nomes, datas e fórmulas",
              "Acesso vitalício no celular, tablet ou computador",
              "Atualizações gratuitas para sempre",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 text-sm sm:text-base">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-gray-800">{t}</span>
              </li>
            ))}
          </ul>

          {/* Preço */}
          <div className="text-center mb-4">
            <div className="flex items-end justify-center gap-2 mb-1">
              <span className="text-base text-muted-foreground line-through pb-2">R$ 67</span>
              <span className="text-5xl sm:text-6xl font-black text-brand-red leading-none">R$ 9,90</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">Pagamento único · PIX, cartão ou boleto</p>
            <p className="text-[11px] sm:text-xs font-bold text-foreground mt-1.5">Acesso imediato: comece em 2 minutos</p>
          </div>

          {/* Garantia */}
          <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 mb-4">
            <ShieldCheck className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-black text-green-900 leading-tight">Garantia incondicional de 7 dias</p>
              <p className="text-[11px] sm:text-xs text-green-800 leading-snug">Testou e não gostou? Devolvo cada centavo, sem perguntas.</p>
            </div>
          </div>

          <a
            href={checkoutDownsell}
            className="block w-full bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-base sm:text-xl py-4 sm:py-5 rounded-xl shadow-xl active:scale-[0.99] text-center uppercase tracking-wide"
          >
            QUERO MEUS 80 EXERCÍCIOS POR R$ 9,90 <ArrowRight className="inline w-5 h-5 ml-1 -mt-0.5" />
          </a>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" /> Pagamento 100% seguro · acesso liberado na hora
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] sm:text-xs text-muted-foreground">
            <CreditCard className="w-3.5 h-3.5" />
            <span className="font-bold text-success">PIX</span><span>·</span>
            <span>Cartão</span><span>·</span><span>Boleto</span>
          </div>
        </div>

        {/* Prova social */}
        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 mb-7">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="text-xs font-bold ml-1.5">4.9 · +12.000 alunos</span>
          </div>
          <div className="space-y-3">
            {[
              { name: "Júlia A.", city: "Recife · PE", avatar: avatar1, text: "Comecei pelo plano inicial. Em 9 dias já sentia diferença na leitura." },
              { name: "Marcos R.", city: "Salvador · BA", avatar: avatar3, text: "Menos de 10 reais e destravou meus estudos. Valeu cada centavo." },
              { name: "Patrícia L.", city: "Curitiba · PR", avatar: avatar5, text: "Era o empurrão que eu precisava pra começar. Em 2 semanas notei diferença." },
            ].map((d) => (
              <div key={d.name} className="flex gap-3 bg-white rounded-xl p-3 border border-gray-200">
                <img src={d.avatar} alt={`Foto de ${d.name}`} className="w-10 h-10 rounded-full object-cover flex-shrink-0" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold leading-tight">{d.name} <span className="text-muted-foreground font-normal">· {d.city}</span></p>
                  <p className="text-xs sm:text-sm text-gray-700 leading-snug mt-0.5">"{d.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ curto */}
        <div className="mb-8 space-y-2">
          {[
            { q: "Qual a diferença pro plano completo?", a: "O completo tem 150 exercícios + bônus. O inicial entrega o núcleo: os 80 exercícios que mais geram resultado." },
            { q: "Como recebo?", a: "Direto no seu e-mail, logo após a compra. Acesso vitalício, sem mensalidade." },
            { q: "Funciona pra concurso e ENEM?", a: "Sim. Os exercícios treinam retenção e foco, independente do conteúdo que você estuda." },
          ].map((f) => (
            <details key={f.q} className="bg-white border border-gray-200 rounded-lg p-3 group">
              <summary className="font-bold text-sm sm:text-base cursor-pointer flex justify-between items-center gap-2">
                {f.q}
                <span className="text-brand-red text-lg group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center pb-10">
          <p className="text-base sm:text-lg font-bold mb-4">Nenhum exercício funciona se você não começar.</p>
          <a
            href={checkoutDownsell}
            className="block w-full bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-base sm:text-lg py-4 rounded-xl shadow-xl active:scale-[0.99] text-center uppercase tracking-wide"
          >
            COMEÇAR AGORA POR R$ 9,90
          </a>
          <a href="/oferta" className="inline-block mt-4 text-xs text-gray-400 underline hover:text-gray-600">Ver o plano completo com 150 exercícios</a>
        </div>
      </main>
    </div>
  );
}
