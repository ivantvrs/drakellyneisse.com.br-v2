import { useState, useEffect } from "react";
import { Scale } from "lucide-react";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/5582657c-bbef-4294-b920-7b643b273303";

const GOLD = "#D4A853";
const BTN_BG = "radial-gradient(120% 120% at 50% 22%, #2A2419 0%, #1A1610 55%, #100D08 100%)";
const BTN_BORDER = "1px solid rgba(212, 168, 83, 0.55)";

const KEYFRAMES = `
@keyframes balancaEntry { from { opacity: 0; transform: translateY(12px) scale(.9); } to { opacity: 1; transform: none; } }
@keyframes balancaPulse { 0% { box-shadow: 0 0 0 0 rgba(212,168,83,.55); } 70% { box-shadow: 0 0 0 18px rgba(212,168,83,0); } 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0); } }
@keyframes balancaFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@media (prefers-reduced-motion: reduce) { .balanca-pulse, .balanca-float { animation: none !important; } }
`;

const idleShadow = "0 8px 22px rgba(0,0,0,.5), inset 0 0 0 1px rgba(212,168,83,.18)";
const hoverShadow = "0 12px 30px rgba(212,168,83,.32), inset 0 0 0 1px rgba(212,168,83,.30)";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block" style={{ animation: "balancaEntry .5s ease-out both" }}>
      <style>{KEYFRAMES}</style>
      <div className="relative group balanca-float" style={{ animation: "balancaFloat 4.5s ease-in-out infinite" }}>
        <span aria-hidden="true" className="balanca-pulse absolute inset-0 rounded-full pointer-events-none" style={{ animation: "balancaPulse 2.6s ease-out infinite" }} />
        <span
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 font-label text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ backgroundColor: "#1A1A1A", color: "#F5F0E8", border: "1px solid rgba(212, 168, 83, 0.15)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
        >
          Analisar caso no WhatsApp
        </span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Analisar caso no WhatsApp — botão flutuante"
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: BTN_BG, border: BTN_BORDER, color: GOLD, boxShadow: hovered ? hoverShadow : idleShadow, transform: hovered ? "translateY(-2px)" : "none", transition: "box-shadow .3s ease, transform .3s ease" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Scale size={26} strokeWidth={1.6} />
        </a>
      </div>
    </div>
  );
};

export const WhatsAppButtonMobile = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 z-50 lg:hidden" style={{ animation: "balancaEntry .5s ease-out both" }}>
      <style>{KEYFRAMES}</style>
      <div className="relative">
        <span aria-hidden="true" className="balanca-pulse absolute inset-0 rounded-full pointer-events-none" style={{ animation: "balancaPulse 2.6s ease-out infinite" }} />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Analisar caso no WhatsApp — botão flutuante mobile"
          className="relative w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: BTN_BG, border: BTN_BORDER, color: GOLD, boxShadow: hovered ? hoverShadow : idleShadow, transform: hovered ? "translateY(-2px)" : "none", transition: "box-shadow .3s ease, transform .3s ease" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Scale size={22} strokeWidth={1.6} />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppButton;
