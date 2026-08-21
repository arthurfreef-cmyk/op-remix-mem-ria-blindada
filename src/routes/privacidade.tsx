import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Mentes Exercitadas" },
      { name: "description", content: "Como tratamos seus dados pessoais em conformidade com a LGPD." },
      { property: "og:title", content: "Política de Privacidade — Mentes Exercitadas" },
      { property: "og:description", content: "Quais dados coletamos, como usamos e como exercer seus direitos pela LGPD." },
      { property: "og:url", content: "https://mentesexercitadas.lovable.app/privacidade" },
    ],
    links: [{ rel: "canonical", href: "https://mentesexercitadas.lovable.app/privacidade" }],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link to="/oferta" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black mb-6">Política de Privacidade</h1>
        <div className="prose prose-sm sm:prose max-w-none space-y-4 text-gray-700 leading-relaxed">
          <p><strong>Última atualização:</strong> {new Date().toLocaleDateString("pt-BR")}</p>

          <h2 className="text-xl font-bold mt-6">1. Dados que coletamos</h2>
          <p>Coletamos apenas os dados necessários para processar sua compra e liberar o acesso ao produto: nome, e-mail, CPF e informações de pagamento (processadas com segurança pela plataforma PerfectPay).</p>

          <h2 className="text-xl font-bold mt-6">2. Como usamos seus dados</h2>
          <p>Seus dados são utilizados exclusivamente para: (a) liberar o acesso ao produto comprado; (b) enviar comunicações sobre sua compra; (c) prestar suporte; (d) cumprir obrigações legais e fiscais.</p>

          <h2 className="text-xl font-bold mt-6">3. Compartilhamento</h2>
          <p>Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. Compartilhamos apenas com os processadores de pagamento e provedores de e-mail necessários para entregar o serviço.</p>

          <h2 className="text-xl font-bold mt-6">4. Cookies e pixels</h2>
          <p>Usamos cookies e pixels (Facebook Pixel, Utmify) para mensurar performance das nossas campanhas. Você pode bloquear cookies nas configurações do seu navegador.</p>

          <h2 className="text-xl font-bold mt-6">5. Seus direitos (LGPD)</h2>
          <p>Você tem direito a acessar, corrigir, excluir ou portar seus dados a qualquer momento. Para exercer qualquer desses direitos, envie e-mail para <strong>suporte@mentesexercitadas.com.br</strong>.</p>

          <h2 className="text-xl font-bold mt-6">6. Segurança</h2>
          <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>

          <h2 className="text-xl font-bold mt-6">7. Contato</h2>
          <p>Dúvidas? Fale com a gente em <strong>suporte@mentesexercitadas.com.br</strong>.</p>
        </div>
      </main>
    </div>
  );
}
