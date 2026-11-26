import { useEffect, useState } from "react";
import { Check, X, AlertTriangle } from "lucide-react";
import { CHECKOUT_URL } from "@/lib/tracking";

export function CurrentDate() {
  const [date, setDate] = useState("");
  useEffect(() => {
    const d = new Date();
    setDate(d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }));
  }, []);
  return <span className="font-bold">{date}</span>;
}

export function CountdownTimer() {
  const [seconds, setSeconds] = useState(15 * 60);
  useEffect(() => {
    const saved = Number(sessionStorage.getItem("me_count") || 0);
    const start = saved > 0 ? saved : Date.now() + 15 * 60 * 1000;
    if (!saved) sessionStorage.setItem("me_count", String(start));
    const tick = () => setSeconds(Math.max(0, Math.floor((start - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return <span className="font-black tabular-nums">{m}:{s}</span>;
}

const buyerNames = [
  { name: "Lucas M.", city: "São Paulo, SP" },
  { name: "Ana C.", city: "Rio de Janeiro, RJ" },
  { name: "Pedro L.", city: "Belo Horizonte, MG" },
  { name: "Beatriz F.", city: "Curitiba, PR" },
  { name: "Rafael T.", city: "Porto Alegre, RS" },
  { name: "Camila S.", city: "Recife, PE" },
  { name: "João V.", city: "Salvador, BA" },
  { name: "Mariana O.", city: "Fortaleza, CE" },
];

export function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [buyer, setBuyer] = useState(buyerNames[0]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const show = () => {
      setBuyer(buyerNames[Math.floor(Math.random() * buyerNames.length)]);
      setVisible(true);
      t = setTimeout(() => setVisible(false), 5000);
    };
    const first = setTimeout(show, 4000);
    const id = setInterval(show, 12000);
    return () => { clearTimeout(first); clearTimeout(t); clearInterval(id); };
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-20 sm:bottom-24 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs z-40 bg-white border border-gray-200 shadow-2xl rounded-xl p-3 flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <Check className="w-5 h-5 text-success" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm font-bold leading-tight">{buyer.name} acabou de comprar</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{buyer.city} · há instantes</p>
      </div>
      <button type="button" aria-label="Fechar" onClick={() => setVisible(false)} className="text-gray-400 hover:text-gray-600 p-1">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/**
 * Link único de checkout: centraliza href/target/rel para evitar duplicação
 * e garantir que o enriquecimento de UTM encontre sempre o mesmo padrão.
 */
export function CheckoutLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export function StickyMobileCTA({ href, label = "QUERO MINHA APROVAÇÃO →" }: { href: string; label?: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl px-3 py-2.5 sm:hidden">
      <div className="flex items-center gap-2.5">
        <div className="flex-shrink-0">
          <p className="text-[10px] text-muted-foreground line-through leading-none">R$127</p>
          <p className="text-lg font-black text-brand-red leading-tight">R$27,90</p>
        </div>
        <a href={href} className="flex-1 bg-brand-red hover:bg-brand-red-dark active:scale-[0.98] transition text-white font-black text-sm py-3 rounded-lg text-center shadow-lg">
          {label}
        </a>
      </div>
    </div>
  );
}

export function TopUrgencyBar() {
  return (
    <div className="bg-brand-red text-white text-center py-2 px-3 text-xs sm:text-base font-bold tracking-wide leading-snug">
      <AlertTriangle className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
      OFERTA POR TEMPO LIMITADO
    </div>
  );
}
