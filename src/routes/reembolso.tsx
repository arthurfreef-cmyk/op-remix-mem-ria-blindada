import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/reembolso")({
  head: () => ({
    meta: [
      { title: "Política de Reembolso — Mentes Exercitadas" },
      { name: "description", content: "Garantia incondicional de 7 dias. Como solicitar seu reembolso." },
      { property: "og:title", content: "Política de Reembolso — Mentes Exercitadas" },
      { property: "og:description", content: "Garantia incondicional de 7 dias: veja o passo a passo para pedir reembolso." },
      { property: "og:url", content: "https://mentesexercitadas.lovable.app/reembolso" },
    ],
    links: [{ rel: "canonical", href: "https://mentesexercitadas.lovable.app/reembolso" }],
  }),
  component: ReembolsoPage,
});

function ReembolsoPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Link to="/oferta" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black mb-6">Política de Reembolso</h1>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 sm:p-5 mb-6 flex items-start gap-3">
          <ShieldCheck className="w-8 h-8 text-success flex-shrink-0" />
          <div>
            <p className="font-black text-green-900">Garantia incondicional de 7 dias</p>
            <p className="text-sm text-green-800">Teste o produto. Se não gostar por qualquer motivo, devolvemos 100% do seu dinheiro.</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-bold">1. Prazo</h2>
          <p>Você tem <strong>7 dias corridos</strong> a partir da data da compra para solicitar o reembolso integral, conforme o Art. 49 do Código de Defesa do Consumidor.</p>

          <h2 className="text-xl font-bold mt-6">2. Como solicitar</h2>
          <p>Envie um e-mail para <strong>suporte@mentesexercitadas.com.br</strong> com:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nome completo</li>
            <li>E-mail usado na compra</li>
            <li>Data da compra</li>
          </ul>
          <p>Não pedimos justificativa. Não fazemos pesquisa para "te convencer a ficar". É só pedir.</p>

          <h2 className="text-xl font-bold mt-6">3. Prazo de devolução</h2>
          <p>O estorno é processado em até <strong>7 dias úteis</strong> após a confirmação. O prazo de visualização na fatura do cartão pode variar conforme a operadora (geralmente 1 a 2 faturas).</p>

          <h2 className="text-xl font-bold mt-6">4. Cancelamento do acesso</h2>
          <p>Após o reembolso, o acesso ao conteúdo é encerrado.</p>

          <h2 className="text-xl font-bold mt-6">5. Contato</h2>
          <p>Qualquer dúvida sobre reembolso: <strong>suporte@mentesexercitadas.com.br</strong>. Respondemos em até 24h úteis.</p>
        </div>
      </main>
    </div>
  );
}
