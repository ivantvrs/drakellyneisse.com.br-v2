import { MessageCircle, Phone } from "lucide-react";
import { EMPRESA_WHATSAPP_URL, TEL_HREF, TEL_DISPLAY } from "./cta";

// Par de CTAs da /empresa: WhatsApp (primário) + Ligar (secundário).
// Ambos rastreados pelo tracking inline de empresa.html (whatsapp_click_empresa / call_click_empresa).
type Props = {
  whatsappLabel?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
};

const EmpresaCTAs = ({ whatsappLabel = "Falar agora no WhatsApp →", size = "md", align = "left" }: Props) => {
  const pad = size === "lg" ? "px-10 py-5 text-base" : "px-8 py-4 text-sm";
  const justify = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${justify}`}>
      <a
        href={EMPRESA_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Dra. Kelly no WhatsApp"
        className={`inline-flex items-center justify-center gap-2 text-white font-label font-semibold rounded-md transition-all duration-300 hover:-translate-y-[3px] active:translate-y-[-1px] ${pad}`}
        style={{
          background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
          boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 211, 102, 0.35)"; }}
      >
        <MessageCircle size={size === "lg" ? 20 : 18} />
        {whatsappLabel}
      </a>

      <a
        href={TEL_HREF}
        aria-label={`Ligar para a Dra. Kelly — ${TEL_DISPLAY}`}
        className={`inline-flex items-center justify-center gap-2 font-label font-semibold rounded-md transition-all duration-300 hover:-translate-y-[2px] ${pad}`}
        style={{
          color: '#E8C77B',
          border: '1px solid rgba(212, 168, 83, 0.5)',
          background: 'rgba(212, 168, 83, 0.04)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.9)'; e.currentTarget.style.background = 'rgba(212, 168, 83, 0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(212, 168, 83, 0.5)'; e.currentTarget.style.background = 'rgba(212, 168, 83, 0.04)'; }}
      >
        <Phone size={size === "lg" ? 20 : 18} />
        Ligar para a Dra. Kelly
      </a>
    </div>
  );
};

export default EmpresaCTAs;
