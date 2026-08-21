import { createFileRoute, Link } from "@tanstack/react-router";
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNGU3N2M5MDhkNjgxMjA1NDExOGI4ZmNiNmYxMTU3MDBmNjg5ZTY4ZjEyYmVlMDU3OTZkNjIzODgxODY5YmY5ZjM2ODBhZDA3NTZlZWQxNGMiLCJpYXQiOjE3ODM2NDUzODAuNDYxNzE1LCJuYmYiOjE3ODM2NDUzODAuNDYxNzE5LCJleHAiOjE5NDE0MTE3ODAuNDQ2NTE4LCJzdWIiOiIyNzE2NzE4Iiwic2NvcGVzIjpbImludGVncmF0aW9uIl19.ivQ8dtxtImSxC9XV4Nmxhm13FUVJ6JYgND4nkukKDEEKeUrkyyHUQ9Ut22xa5rgXioZTJecd2wK4s_7lgZV-ZiB1jrCe4UBWsjlHrg9ZONxj63XVGSg_mf-PfRdDI6SSmiZeo4NMp913zf82mQmhI71snaNxRWJWv1wzjczZPA8_6NJEikmDkXJgD_aM8xOFqrW5U9YwAbRRaO6IpiBFC60FTfqNSduvnyTKuq80X9tqIo7-GEbQSJjvglxwGgj4j651B79KDHGBxS2yOkG5fw9M4s1tDVq3dSTpdj4voiq7o2Tld-i-2LXaMf6QQiGfYoHDe8h_vKuYZw90Mr0P1BwGd0VRkPfro3zu69xvsqZjwmgKTl3b0xx-nHGK291WmrVy7h-oo9Wjq3salKfpnKzfb75UjSuIvXdzZOW1GfqpjWNEqUPLD24vM8atPZrRMJZcMX9oqWK0yV5WqHa51MZ3NXGyLNrJkYj9hK0moQiQxbAlsfbssE22TuI21Zay65V0-UX0cI16dNXnPs-jKTqh-8i5UVrheRghisGirjj2i9ljjoSGP5iPTTzZcYYB0TBFNn_XmXVB33w4P-WEBn6fbPNnYICjJ3AMsoyMZJmi0UJ9GreOLjbUGXUVGi2ISTcaGfxqBOYYuzvX8s-3-sAyCBkbn5tsJxGa3IBkIPU  atualize o token de api e remova o outro' (on element 'body' at '/src/routes/index.tsx:1')
import { Check, Star, ShieldCheck, Brain, Lock, ChevronDown, Trophy, CreditCard, Pizza, Timer, Gift, Activity, Repeat, Target, X, Users, Award, BadgeCheck, GraduationCap, Phone, Video, MoreVertical, ArrowLeft, Camera, Smile, Paperclip, Mic } from "lucide-react";
import pack150 from "@/assets/pack-150.jpg";
import pack80 from "@/assets/pack-80.jpg";
import beforeStudent from "@/assets/before-student.jpg";
import afterStudent from "@/assets/after-student.jpg";
import { CheckoutLink, CountdownTimer, TopUrgencyBar } from "@/components/sales-shared";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import avatar1Asset from "@/assets/testimonials/woman-1.asset.json";
import avatar2Asset from "@/assets/testimonials/man-1.asset.json";
import avatar3Asset from "@/assets/testimonials/woman-2.asset.json";
import avatar4Asset from "@/assets/testimonials/man-2.asset.json";
import avatar5Asset from "@/assets/testimonials/woman-1.asset.json";
import avatar6Asset from "@/assets/testimonials/man-1.asset.json";
import avatar7Asset from "@/assets/testimonials/woman-2.asset.json";
import avatar8Asset from "@/assets/testimonials/man-2.asset.json";

const avatar1 = avatar1Asset.url;
const avatar2 = avatar2Asset.url;
const avatar3 = avatar3Asset.url;
const avatar4 = avatar4Asset.url;
const avatar5 = avatar5Asset.url;
const avatar6 = avatar6Asset.url;
const avatar7 = avatar7Asset.url;
const avatar8 = avatar8Asset.url;

export const Route = createFileRoute("/oferta")({
  head: () => ({
    meta: [
      { title: "150 Exercícios Mentais — Lembrar de Tudo e Foco Total" },
      { name: "description", content: "150 exercícios práticos para lembrar de tudo que deseja e nunca mais ter esquecimentos nos estudos ou no dia a dia. +12.000 pessoas transformadas." },
      { property: "og:title", content: "150 Exercícios Mentais — Mentes Exercitadas" },
      { property: "og:description", content: "Memorize mais rápido para provas e concursos em 15 min/dia. Garantia de 7 dias. R$19,90." },
      { property: "og:url", content: "https://mentesexercitadas.lovable.app/oferta" },
      { property: "og:type", content: "product" },
    ],
    links: [
      { rel: "preload", as: "image", href: pack150 },
      { rel: "canonical", href: "https://mentesexercitadas.lovable.app/oferta" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "150 Exercícios Mentais",
          image: ["https://mentesexercitadas.lovable.app" + pack150],
          description:
            "Pacote com 150 exercícios mentais para treinar memória, foco e retenção em 15 minutos por dia, voltado a provas, ENEM e concursos.",
          brand: { "@type": "Brand", name: "Mentes Exercitadas" },
          offers: {
            "@type": "Offer",
            url: "https://mentesexercitadas.lovable.app/oferta",
            price: "19.90",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        }),
      },
    ],
  }),
  component: OfertaPage,
});

const whatsappMessages = [
  {
    name: "Júlia Albuquerque",
    city: "",
    time: "09:42",
    avatarBg: "#f28b82",
    avatar: avatar1,
    msgs: [
      { from: "them", text: "Oi, professora, boa noite. Só queria te contar uma coisa." },
      { from: "them", text: "Faz 2 semanas que comecei e tô conseguindo ler uma vez só e lembrar do que estudei no dia seguinte. Antes eu relia 3, 4 vezes e mesmo assim esquecia." },
    ],
    reply: "Que notícia boa, Júlia. Continua firme na rotina dos exercícios.",
  },
  {
    name: "Rafael Moura",
    city: "",
    time: "21:08",
    avatarBg: "#aecbfa",
    avatar: avatar2,
    msgs: [
      { from: "them", text: "Professora, saiu o resultado agora à noite. Passei em 3º lugar no concurso da prefeitura." },
      { from: "them", text: "Tô meio sem acreditar ainda. Era a 4ª vez que eu tentava. Muito obrigado mesmo." },
    ],
    reply: "Parabéns, Rafael. Você merece demais.",
  },
  {
    name: "Camila Nogueira",
    city: "",
    time: "07:15",
    avatarBg: "#fdd663",
    avatar: avatar3,
    msgs: [
      { from: "them", text: "Bom dia. Tô fazendo os exercícios antes de abrir o caderno todo dia, igual você falou." },
      { from: "them", text: "A diferença na hora de estudar é absurda, parece que a cabeça já tá ligada." },
    ],
    reply: "É exatamente essa a ideia, Camila. Que bom que tá funcionando pra você.",
  },
  {
    name: "Mariana Tavares",
    city: "",
    time: "14:23",
    avatarBg: "#c58af9",
    avatar: avatar5,
    msgs: [
      { from: "them", text: "Tô na 3ª semana e queria te contar uma coisa boba." },
      { from: "them", text: "Ontem li o capítulo uma vez e na hora da revisão lembrei de quase tudo sem olhar. Nunca tinha acontecido isso comigo." },
    ],
    reply: "Não é boba não, Mari. Isso é o método pegando.",
  },
  {
    name: "Carlos Eduardo",
    city: "",
    time: "19:50",
    avatarBg: "#81c995",
    avatar: avatar6,
    msgs: [
      { from: "them", text: "Boa noite. Tenho 53 anos e já tava achando que minha memória não dava mais conta." },
      { from: "them", text: "Levei 1 mês fazendo direitinho e passei na prova teórica do Detran de primeira. Minha esposa não acreditou." },
    ],
    reply: "Que orgulho, seu Carlos. Idade nenhuma é desculpa.",
  },
  {
    name: "Pedro Henrique",
    city: "",
    time: "06:30",
    avatarBg: "#78d9ec",
    avatar: avatar4,
    msgs: [
      { from: "them", text: "Professora, eu não conseguia estudar 20 minutos sem pegar o celular." },
      { from: "them", text: "Hoje tô conseguindo ficar 3 horas concentrado, sem ansiedade. Mudou minha rotina inteira." },
    ],
    reply: "Foco se treina, Pedro. Continua assim.",
  },
  {
    name: "Juliana Ribeiro",
    city: "",
    time: "22:11",
    avatarBg: "#f8a3c4",
    avatar: avatar7,
    msgs: [
      { from: "them", text: "Eu travava em matemática na hora da prova, esquecia até fórmula básica." },
      { from: "them", text: "Agora consigo lembrar dos passos com calma. Tirei 8,5 na última, minha maior nota do ano." },
    ],
    reply: "Maravilha, Ju. O bloqueio era cansaço mental, não falta de estudo.",
  },
  {
    name: "Lucas Bernardes",
    city: "",
    time: "11:05",
    avatarBg: "#ffb38a",
    avatar: avatar8,
    msgs: [
      { from: "them", text: "Tava me sentindo lento, demorava pra entender as questões na prova." },
      { from: "them", text: "Em pouco mais de um mês a minha média subiu de 6,2 pra 9,1. Os professores até comentaram." },
    ],
    reply: "Sensacional, Lucas. Continua firme.",
  },
];

function OfertaPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <header className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <Brain className="w-5 h-5 text-brand-red" />
          <span className="text-base font-black text-brand-red tracking-tight">MENTES EXERCITADAS</span>
        </div>
      </header>
      <TopUrgencyBar />

      {/* Hero + oferta única */}
      <section className="px-4 pt-8 pb-12 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-800 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
          <BadgeCheck className="w-3.5 h-3.5" /> +12.000 pessoas · método validado
        </span>
        <h1 className="text-[28px] leading-[1.05] sm:text-5xl font-black tracking-tight mb-2">
          <span className="text-brand-red">150 exercícios mentais</span> para lembrar de tudo que deseja e nunca mais ter esquecimentos nos estudos ou no dia a dia
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-medium uppercase tracking-wide mb-6">
          método comprovado
        </p>
        <p className="text-base sm:text-xl text-muted-foreground mb-6 leading-relaxed">
          Pare de esquecer o que estuda. Memorize mais rápido e mantenha foco profundo em <strong className="text-foreground">15 min por dia</strong> — método validado por +12.000 pessoas.
        </p>

        {/* Antes e depois — cartoon reduzido */}
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6">
          <figure className="text-center">
            <img src={beforeStudent} alt="Antes do treino" className="w-full max-w-[140px] mx-auto rounded-xl border border-gray-200" loading="lazy" />
            <figcaption className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mt-1.5">Antes · esquece tudo que estuda</figcaption>
          </figure>
          <figure className="text-center">
            <img src={afterStudent} alt="Depois do treino" className="w-full max-w-[140px] mx-auto rounded-xl border-2 border-success" loading="lazy" />
            <figcaption className="text-[11px] font-bold uppercase tracking-wider text-success mt-1.5">Depois · lembra na hora da prova</figcaption>
          </figure>
        </div>

        {/* Depoimentos visuais avatares */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {[
              { i: "MS", c: "bg-pink-500" },
              { i: "CR", c: "bg-blue-500" },
              { i: "JM", c: "bg-emerald-500" },
              { i: "PH", c: "bg-amber-500" },
              { i: "LA", c: "bg-purple-500" },
            ].map((a) => (
              <div key={a.i} className={`w-9 h-9 rounded-full ${a.c} border-2 border-white text-white text-[11px] font-black flex items-center justify-center shadow`}>
                {a.i}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground"><strong>4.9/5</strong> · depoimentos reais</p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-left">
          {[
            { icon: Users, t: "+12.000", s: "pessoas transformadas" },
            { icon: Star, t: "4.9/5", s: "925 avaliações" },
            { icon: ShieldCheck, t: "7 dias", s: "garantia total" },
            { icon: Award, t: "Método", s: "validado em 2024" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-brand-red" />
              </div>
              <div>
                <p className="text-sm font-black leading-tight">{t}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{s}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Card de oferta */}
        <div id="checkout" className="border-2 border-conversion-blue rounded-2xl p-6 sm:p-8 shadow-xl bg-white relative text-left">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap">
            <span className="bg-conversion-blue text-white text-xs font-bold px-4 py-1 rounded-full uppercase shadow">
              Oferta do dia
            </span>
            <span className="bg-yellow-400 text-black text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
              <Star className="w-3 h-3 fill-black" /> Mais vendido
            </span>
          </div>

          <div className="bg-black text-white rounded-xl px-4 py-3 mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-yellow-300" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider">Oferta + bônus encerra em</span>
            </div>
            <div className="bg-brand-red text-white text-lg sm:text-xl px-3 py-1 rounded-lg">
              <CountdownTimer />
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Pacote Completo — 150 Exercícios + Bônus</h2>

          <img
            src={pack150}
            alt="Pacote 150 exercícios"
            width={1024} height={1024}
            loading="eager" fetchPriority="high"
            className="w-full max-w-[220px] mx-auto mb-5"
          />

          <ul className="space-y-2.5 mb-5 max-w-md mx-auto">
            {[
              "150 exercícios progressivos (básico ao avançado)",
              "Treinos de foco de 5, 10 e 20 minutos",
              "Acesso vitalício no celular e computador",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-success" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="bg-blue-50 border-2 border-dashed border-conversion-blue rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-conversion-blue" />
                <p className="text-[11px] font-black uppercase tracking-wider text-conversion-blue">Bônus grátis</p>
              </div>
              <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded animate-pulse">
                Exclusivos só hoje
              </span>
            </div>
            <ul className="divide-y divide-blue-200/60 text-sm">
              {[
                { t: "Protocolo Anti-Esquecimento: Rotina de Alto Rendimento", d: "Passo a passo para lembrar 3x mais em 15 min/dia", v: "R$ 97" },
                { t: "Checklist de Última Hora: Segredo dos Aprovados", d: "Ative a memória em 3 min antes da prova", v: "R$ 67" },
                { t: "Suporte VIP no WhatsApp: Respostas em até 4h", d: "Tire dúvidas direto com a equipe do método", v: "R$ 127" },
                { t: "Pacote de Simulados ENEM e Concursos com Gabarito Comentado", d: "+10 simulados completos para treinar a memória sob pressão e medir sua evolução", v: "R$ 147" },
              ].map((b) => (
                <li key={b.t} className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="text-conversion-blue font-black flex-shrink-0">+</span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-snug">{b.t}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{b.d}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Valor</p>
                    <p className="text-sm font-black text-conversion-blue line-through">{b.v}</p>
                    <p className="text-[10px] font-black uppercase text-success">Grátis</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-200 text-xs">
              <span className="font-bold uppercase tracking-wider text-conversion-blue-dark">Você recebe em bônus</span>
              <span className="font-black text-conversion-blue">R$ 438 grátis</span>
            </div>
          </div>


          <div className="text-center mb-2">
            <p className="text-sm text-muted-foreground line-through">De R$ 147,00</p>
            <p className="text-4xl sm:text-5xl font-black text-brand-red">R$ 19,90</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1.5">
              <Pizza className="w-3.5 h-3.5 text-brand-red" /> menos que uma pizza · até 3x no cartão
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 my-4">
            <ShieldCheck className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-xs sm:text-sm font-bold text-green-900">7 dias de garantia · 100% do dinheiro de volta</p>
          </div>

          <CheckoutLink className="block w-full bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-base sm:text-lg py-4 rounded-xl shadow-lg active:scale-[0.99] pulse-cta text-center">
            QUERO MEUS 150 EXERCÍCIOS AGORA →
          </CheckoutLink>
          <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" /> Pagamento seguro · acesso em 2 minutos
          </p>
          <div className="flex items-center justify-center gap-2 mt-2 text-[10px] sm:text-xs text-muted-foreground">
            <CreditCard className="w-3.5 h-3.5" />
            <span className="font-bold text-success">PIX</span><span>·</span>
            <span>Cartão (3x)</span><span>·</span><span>Boleto</span>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-success" />
              <p className="text-[10px] font-bold text-gray-700 leading-tight">Compra<br/>protegida</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-4 h-4 text-gray-700" />
              <p className="text-[10px] font-bold text-gray-700 leading-tight">SSL 256-bit<br/>criptografado</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck className="w-4 h-4 text-conversion-blue" />
              <p className="text-[10px] font-bold text-gray-700 leading-tight">Garantia<br/>de 7 dias</p>
            </div>
          </div>
        </div>

      </section>

      {/* Valor empilhado + ancoragem */}
      <section className="px-4 py-10 max-w-3xl mx-auto">
        <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-center mb-6">
            O valor real do que você está recebendo hoje
          </h2>
          <div className="space-y-3 text-sm sm:text-base">
            {[
              { item: "150 exercícios progressivos (básico ao avançado)", val: "R$ 197,00" },
              { item: "Protocolo Anti-Esquecimento: Rotina de Alto Rendimento", val: "R$ 97,00" },
              { item: "Checklist de Última Hora: Segredo dos Aprovados", val: "R$ 67,00" },
              { item: "Suporte VIP Direto: Respostas em até 4h", val: "R$ 127,00" },
              { item: "Acesso vitalício no celular e computador", val: "R$ 97,00" },
            ].map((row, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-white/90">{row.item}</span>
                <span className="font-bold text-white">{row.val}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold uppercase tracking-wider text-white/70">Valor total</span>
              <span className="text-xl sm:text-2xl font-black text-white/70 line-through">R$ 585,00</span>
            </div>
          </div>

          <div className="mt-6 bg-conversion-blue rounded-xl p-5 text-center">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90 mb-1">Hoje você leva tudo por apenas</p>
            <p className="text-5xl sm:text-6xl font-black text-white mb-1">R$ 19,90</p>
            <p className="text-xs sm:text-sm font-bold text-yellow-300">Economia de R$ 565,10 · 97% OFF</p>
          </div>

          <div className="mt-5 text-center">
            <CheckoutLink className="block w-full bg-white text-brand-red hover:bg-yellow-300 transition-colors font-black text-base sm:text-lg py-4 rounded-xl shadow-lg active:scale-[0.99]">
              COMEÇAR MEU TREINAMENTO HOJE →
            </CheckoutLink>
            <p className="text-[10px] sm:text-xs text-white/60 mt-2">Oferta + bônus expiram quando o contador zerar · preço volta para R$ 147</p>
          </div>
        </div>
      </section>

      {/* Por que funciona */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-conversion-blue-dark text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
              Base científica
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Por que funciona (mesmo se você acha que "tem memória ruim")
            </h2>
            <p className="text-muted-foreground">3 princípios comprovados pela neurociência aplicados em cada exercício.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Activity, title: "Neuroplasticidade", text: "Seu cérebro cria novas conexões quando treinado de forma específica e repetida — em qualquer idade." },
              { icon: Target, title: "Recall ativo", text: "Esforçar-se para lembrar (em vez de só reler) fixa o conteúdo até 4x mais segundo a ciência cognitiva." },
              { icon: Repeat, title: "Repetição espaçada", text: "Revisar nos intervalos certos transforma memória de curto prazo em memória de longo prazo." },
            ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-conversion-blue" />
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabela comparativa vs métodos tradicionais */}
      <section className="px-4 py-14 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Por que <span className="text-brand-red">apps de memória, livros e vídeos</span> não funcionam sozinhos
          </h2>
          <p className="text-muted-foreground">Compare o que você já tentou com o método dos 150 exercícios.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 sm:p-4 font-bold text-xs sm:text-sm"></th>
                <th className="p-3 sm:p-4 text-center font-bold text-xs sm:text-sm text-muted-foreground">Métodos tradicionais</th>
                <th className="p-3 sm:p-4 text-center font-bold text-xs sm:text-sm text-conversion-blue bg-blue-50">150 Exercícios</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Treina o cérebro a memorizar", false, true],
                ["Funciona em 15 min/dia", false, true],
                ["Resultado em 2-4 semanas", false, true],
                ["Foco profundo sem distração", false, true],
                ["Adapta ao seu nível e objetivo", false, true],
                ["Acesso vitalício", false, true],
              ].map(([label, trad, novo], i) => (
                <tr key={i} className="border-t border-gray-200">
                  <td className="p-3 sm:p-4 font-medium">{label}</td>
                  <td className="p-3 sm:p-4 text-center">
                    {trad ? <Check className="w-5 h-5 text-success inline" /> : <X className="w-5 h-5 text-brand-red inline" />}
                  </td>
                  <td className="p-3 sm:p-4 text-center bg-blue-50/30">
                    {novo ? <Check className="w-5 h-5 text-success inline" /> : <X className="w-5 h-5 text-conversion-blue inline" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center mt-6 text-base font-semibold">
          Resumir não é treinar. <span className="text-brand-red">Só treino estrutura o cérebro.</span>
        </p>
      </section>

      {/* Credibilidade — quem está por trás */}
      <section className="px-4 py-12 max-w-3xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-7 h-7 text-conversion-blue" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-conversion-blue font-black mb-1">Quem está por trás</p>
              <h3 className="text-lg sm:text-xl font-black leading-tight mb-2">Método desenvolvido para alunos que precisam aprovar</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Construído sobre 3 pilares validados pela ciência — <strong className="text-foreground">neuroplasticidade, recall ativo e repetição espaçada</strong> — e refinado ao longo de 4 anos com mais de 12.000 alunos aprovados em provas, concursos e vestibulares.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Pagamento 100% seguro", "Compra protegida", "Selo de garantia", "Suporte humano"].map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-success" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
            {[
              { n: "12.482", l: "alunos treinados" },
              { n: "4 anos", l: "refinando o método" },
              { n: "94%", l: "recomendariam a um amigo" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-lg sm:text-xl font-black text-foreground leading-tight">{s.n}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold leading-tight mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Seção de Planos */}
      <section className="px-4 py-12 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tight mb-2">Escolha o seu Plano</h2>
          <p className="text-muted-foreground">O treinamento ideal para o seu objetivo atual</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Plano Básico */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm flex flex-col hover:border-gray-300 transition-colors">
            <div className="mb-6">
              <img
                src={pack80}
                alt="Pacote 80 exercícios"
                className="w-full max-w-[160px] mx-auto mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-bold mb-2">Plano Inicial</h3>
              <p className="text-sm text-muted-foreground">Ideal para quem quer apenas conhecer o método e começar a treinar.</p>
            </div>
            <div className="mb-8">
              <span className="text-4xl font-black">R$ 9,90</span>
              <span className="text-muted-foreground text-sm ml-2">pagamento único</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "80 exercícios mentais essenciais",
                "Acesso vitalício ao material",
                "Versão digital em PDF",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-start gap-3 text-sm text-muted-foreground/60">
                <X className="w-5 h-5 flex-shrink-0" />
                <span>Sem Bônus Exclusivos</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground/60">
                <X className="w-5 h-5 flex-shrink-0" />
                <span>Sem Suporte VIP</span>
              </li>
            </ul>
            <a 
              href="/downsell" 
              className="w-full py-4 px-6 rounded-xl border-2 border-gray-200 font-bold text-center hover:bg-gray-50 transition-colors"
            >
              Escolher Básico
            </a>
          </div>

          {/* Plano Completo */}
          <div className="bg-white border-2 border-conversion-blue rounded-3xl p-8 shadow-xl flex flex-col relative scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-conversion-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
              Recomendado
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-red-600">Plano Completo</h3>
              <p className="text-sm text-muted-foreground">A experiência definitiva para quem quer resultados máximos em tempo recorde.</p>
            </div>
            <div className="mb-8">
              <img
                src={pack150}
                alt="Pacote 150 exercícios"
                className="w-full max-w-[180px] mx-auto mb-4"
                loading="lazy"
              />
              <span className="text-4xl font-black text-red-600">R$ 19,90</span>
              <span className="text-muted-foreground text-sm ml-2">pagamento único</span>
            </div>
            <ul className="space-y-4 mb-10 flex-1">
              {[
                "150 exercícios progressivos",
                "Protocolo Anti-Esquecimento",
                "Checklist de Última Hora",
                "Suporte VIP no WhatsApp",
                "Simulados ENEM e Concursos",
                "Acesso vitalício e suporte 24h",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <a 
              href="#checkout" 
              className="w-full py-4 px-6 rounded-xl bg-brand-red text-white font-bold text-center hover:bg-brand-red-dark transition-colors shadow-lg shadow-brand-red/20"
            >
              Quero o Plano Completo
            </a>
          </div>
        </div>
      </section>

      {/* Depoimentos — carrossel WhatsApp realista */}
      <section className="bg-gray-50 px-4 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Mensagens reais de quem já treinou</h2>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground"><strong>4.9</strong> · 12.000+ pessoas</span>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="px-2 sm:px-12">
            <CarouselContent>
              {whatsappMessages.map((m) => (
                <CarouselItem key={m.name} className="sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-[#efeae2] rounded-xl overflow-hidden border border-gray-200 h-full flex flex-col shadow-sm">
                    {/* Barra superior do WhatsApp (estilo oficial) */}
                    <div className="bg-[#008069] text-white px-2.5 py-2 flex items-center gap-2.5">
                      <ArrowLeft className="w-5 h-5 text-white flex-shrink-0" strokeWidth={2.2} />
                      <img
                        src={m.avatar}
                        alt={m.name}
                        loading="lazy"
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-1 ring-white/20"
                        style={{ backgroundColor: m.avatarBg }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold leading-tight truncate">{m.name}</p>
                        <p className="text-[10px] text-white/85 leading-tight">online</p>
                      </div>
                      <div className="flex items-center gap-4 text-white pr-0.5">
                        <Video className="w-[18px] h-[18px]" strokeWidth={2} />
                        <Phone className="w-[16px] h-[16px]" strokeWidth={2.2} fill="currentColor" />
                        <MoreVertical className="w-[18px] h-[18px]" strokeWidth={2} />
                      </div>
                    </div>


                    {/* Corpo da conversa com padrão do WhatsApp */}
                    <div
                      className="flex-1 p-2.5 space-y-1.5"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle, #d1d7db 1px, transparent 1px), radial-gradient(circle, #d1d7db 1px, transparent 1px)',
                        backgroundSize: '22px 22px, 22px 22px',
                        backgroundPosition: '0 0, 11px 11px',
                      }}
                    >
                      {/* Etiqueta "Hoje" */}
                      <div className="flex justify-center mb-1">
                        <span className="bg-[#e1f3fb] text-[#1f546c] text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
                          HOJE
                        </span>
                      </div>
                      {/* Mensagens recebidas (esquerda — branco) */}
                      {m.msgs.map((bubble, i) => (
                        <div key={i} className="flex justify-start">
                          <div className="bg-white rounded-r-lg rounded-tl-lg rounded-bl-md px-2.5 py-1.5 shadow-sm max-w-[88%] relative">
                            <p className="text-[12px] text-gray-800 leading-snug whitespace-pre-wrap">{bubble.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-0.5 -mb-0.5">
                              <span className="text-[9px] text-gray-500">{m.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Resposta enviada (direita — verde claro) */}
                      <div className="flex justify-end pt-0.5">
                        <div className="bg-[#d9fdd3] rounded-l-lg rounded-tr-lg rounded-br-md px-2.5 py-1.5 shadow-sm max-w-[88%]">
                          <p className="text-[12px] text-gray-800 leading-snug">{m.reply}</p>
                          <div className="flex items-center justify-end gap-1 mt-0.5 -mb-0.5">
                            <span className="text-[9px] text-gray-500">{m.time}</span>
                            {/* Double-check azul (visualizado) */}
                            <svg className="w-3.5 h-3 text-[#53bdeb]" viewBox="0 0 18 12" fill="none">
                              <path d="M1 6.5L4.5 10L11.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M6.5 6.5L10 10L17 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {m.city && <p className="text-[9px] text-center text-gray-500 pt-1 font-medium">{m.city}</p>}
                    </div>
                    {/* Barra de digitação (estilo oficial) */}
                    <div className="bg-[#f0f2f5] px-2 py-1.5 flex items-center gap-1.5">
                      <div className="flex-1 flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1.5 shadow-sm">
                        <Smile className="w-[18px] h-[18px] text-gray-500 flex-shrink-0" strokeWidth={1.8} />
                        <span className="flex-1 text-[12px] text-gray-400 truncate">Mensagem</span>
                        <Paperclip className="w-[16px] h-[16px] text-gray-500 flex-shrink-0 -rotate-45" strokeWidth={1.8} />
                        <Camera className="w-[16px] h-[16px] text-gray-500 flex-shrink-0" strokeWidth={1.8} />
                      </div>
                      <button
                        type="button"
                        aria-label="Gravar áudio"
                        className="w-8 h-8 rounded-full bg-[#008069] flex items-center justify-center flex-shrink-0 shadow-sm"
                      >
                        <Mic className="w-[16px] h-[16px] text-white" strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 sm:-left-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300" />
            <CarouselNext className="right-0 sm:-right-2 bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300" />
          </Carousel>

          <p className="text-[10px] text-center text-muted-foreground mt-4 tracking-tight">Depoimentos reais de alunos · arraste ou clique nas setas para ver mais</p>

          <div className="text-center mt-8">
            <a href="#checkout" className="inline-block bg-brand-red hover:bg-brand-red-dark transition-colors text-white font-black text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-lg active:scale-[0.99]">
              DESTRAVAR MINHA MEMÓRIA AGORA →
            </a>
          </div>
        </div>
      </section>



      {/* Garantia */}
      <section className="bg-gray-50 px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <ShieldCheck className="w-14 h-14 mx-auto mb-4 text-success" />
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Risco zero: 7 dias de garantia incondicional</h2>
          <p className="text-muted-foreground">
            Compre, teste todos os 150 exercícios e os bônus. Se em 7 dias não sentir diferença, basta enviar um e-mail — devolvemos <strong className="text-foreground">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
          </p>
        </div>
      </section>
      {/* Tutorial de Acesso */}
      <section className="px-4 py-16 max-w-3xl mx-auto border-t border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-black text-center mb-10 tracking-tight">Como você terá acesso ao método?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {[
            { 
              step: "1", 
              icon: CreditCard, 
              title: "Pagamento Seguro", 
              desc: "Finalize sua inscrição via PIX ou Cartão em ambiente criptografado." 
            },
            { 
              step: "2", 
              icon: Brain, 
              title: "Acesso Imediato", 
              desc: "Em menos de 2 minutos, o link de acesso exclusivo chega no seu e-mail." 
            },
            { 
              step: "3", 
              icon: BadgeCheck, 
              title: "Treino Prático", 
              desc: "Comece seus 15 min de exercícios hoje mesmo pelo celular ou PC." 
            }
          ].map((item, idx) => (
            <div key={item.step} className="relative flex flex-col items-center text-center px-4">
              <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4 shadow-sm relative">
                <item.icon className="w-6 h-6 text-brand-red" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {item.step}
                </span>
              </div>
              <h3 className="font-bold text-base mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              
              {idx < 2 && (
                <div className="hidden md:block absolute top-7 -right-2 w-4 h-[2px] bg-gray-100" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-conversion-blue" />
          </div>
          <div>
            <p className="text-sm font-bold text-blue-900 mb-1">Satisfação garantida ou seu dinheiro de volta</p>
            <p className="text-xs text-blue-800/80 leading-relaxed">
              Seu acesso é vitalício e você tem 7 dias para testar. Se não gostar, o reembolso é feito em poucos cliques.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ que converte objeções em valor */}
      <section className="px-4 py-14 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Suas últimas dúvidas, respondidas</h2>
        <p className="text-center text-muted-foreground mb-10">Cada objeção respondida abaixo é um motivo a mais para começar hoje.</p>

        <div className="space-y-3">
          {[
            { q: "\"Não tenho tempo\" — funciona pra quem corre o dia todo?", a: "Justamente por isso o método é em blocos de 5, 10 e 20 minutos. Você treina no intervalo, no transporte ou antes de dormir. Quem estuda e trabalha é exatamente quem mais precisa de uma mente que retém na primeira vez." },
            { q: "\"Tenho memória ruim desde sempre\" — vai funcionar pra mim?", a: "Memória não é talento, é treino. A neurociência prova que o cérebro reconstrói conexões em qualquer idade — os exercícios começam no nível básico e evoluem com você, mesmo se você sempre esqueceu o que estudou." },
            { q: "\"R$19,90 é barato demais — isso é bom mesmo?\"", a: "É barato de propósito. Nossa missão é aprovar o máximo de alunos possível — e o preço baixo paga o desenvolvimento, o suporte e mantém o método acessível pra quem mais precisa. O conteúdo, a garantia e os bônus são exatamente os mesmos de cursos cobrando R$497." },
            { q: "\"R$19,90 ainda parece caro\" — vale o investimento?", a: "Custa menos que uma pizza e fica com você pra sempre. Compare com o preço de reprovar de novo, perder uma vaga no concurso ou viver relendo a mesma matéria sem nunca gravar." },
            { q: "\"E se eu não gostar?\"", a: "Você tem 7 dias de garantia incondicional. Testa tudo, faz os exercícios, lê os bônus. Se não sentir diferença na retenção do conteúdo, devolvemos 100% do valor. O risco é todo nosso." },
            { q: "\"Preciso saber alguma coisa antes?\"", a: "Não. Cada exercício tem instrução passo a passo. Serve para qualquer aluno: vestibulando, concurseiro, universitário ou quem só quer parar de esquecer o que estuda." },
            { q: "\"Quanto tempo até ver resultado?\"", a: "A maioria sente diferença em 2 a 4 semanas treinando 15 min/dia. Quem treina todo dia acelera. Consistência > intensidade." },
            { q: "\"Como recebo o acesso?\"", a: "Imediato. Após o pagamento confirmado, o link cai no seu e-mail e você acessa pelo celular, tablet ou computador. Vitalício — pague uma vez, use pra sempre." },
            { q: "\"Tem suporte se travar?\"", a: "Sim, suporte 24h por WhatsApp e e-mail (incluso como bônus). Você nunca fica sozinho na preparação." },
          ].map(({ q, a }, i) => (
            <details key={i} className="group bg-white border border-gray-200 rounded-xl open:border-conversion-blue transition-colors">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-semibold text-sm sm:text-base">
                {q}
                <ChevronDown className="w-5 h-5 flex-shrink-0 ml-3 text-muted-foreground group-open:rotate-180 group-open:text-conversion-blue transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-brand-red text-white px-4 py-14">
        <div className="max-w-2xl mx-auto text-center">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            A prova está chegando. <span className="text-yellow-300">Vai continuar esquecendo tudo que estuda?</span>
          </h2>
          <p className="text-white/90 mb-7">Por menos de R$ 30 você destrava memória, foco e retenção para passar de vez. Amanhã o preço volta pra R$ 127.</p>
          <CheckoutLink className="inline-block bg-white text-brand-red hover:bg-yellow-300 transition-colors font-black text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl active:scale-[0.99]">
            SIM, QUERO PASSAR DE VEZ →
          </CheckoutLink>
          <p className="text-xs text-white/80 mt-4 flex items-center justify-center gap-1.5">
            <Lock className="w-3 h-3" /> Pagamento seguro · Acesso em 2 minutos · 7 dias de garantia
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-200 py-6 px-4 text-center text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <Link to="/privacidade" className="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Política de Privacidade
          </Link>
          <Link to="/reembolso" className="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Política de Reembolso
          </Link>
        </div>
        © {new Date().getFullYear()} Mentes Exercitadas · Todos os direitos reservados
      </footer>

    </div>
  );
}
