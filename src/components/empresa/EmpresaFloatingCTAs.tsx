import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { EMPRESA_WHATSAPP_URL, TEL_HREF, TEL_DISPLAY } from "./cta";

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Botão flutuante (desktop) + barra fixa (mobile, WhatsApp + Ligar). Aparece após 3s.
const EmpresaFloatingCTAs = () => {
  const [visible, setVisible] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = () => {
      const footer = document.querySelector("footer");
      const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShowBar(window.scrollY > 500 && !footerVisible);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: o botão flutuante redondo agora vem do FAB vanilla (public/balanca-fab.js),
          incluído em empresa.html. Mantemos aqui APENAS a barra fixa mobile (WhatsApp + Ligar). */}

      {/* Mobile: barra fixa com WhatsApp + Ligar */}
      {showBar && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex"
          style={{
            backgroundColor: '#1A1A1A',
            borderTop: '1px solid rgba(212, 168, 83, 0.15)',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
          }}
        >
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — barra fixa mobile"
            className="w-1/2 flex items-center justify-center gap-2 py-3 text-white font-label text-sm font-semibold"
            style={{ background: "linear-gradient(180deg, #2ed671 0%, #22c35c 100%)" }}
          >
            <WhatsAppIcon size={20} />
            WhatsApp
          </a>
          <a
            href={TEL_HREF}
            aria-label={`Ligar para a Dra. Kelly — ${TEL_DISPLAY}`}
            className="w-1/2 flex items-center justify-center gap-2 py-3 font-label text-sm font-semibold"
            style={{ color: '#0F0F0F', background: "linear-gradient(180deg, #E8C77B 0%, #D4A853 100%)" }}
          >
            <Phone size={18} />
            Ligar
          </a>
        </div>
      )}
    </>
  );
};

export default EmpresaFloatingCTAs;
