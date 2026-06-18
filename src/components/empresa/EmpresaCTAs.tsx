import { Phone } from "lucide-react";
import { EMPRESA_WHATSAPP_URL, TEL_HREF, TEL_DISPLAY } from "./cta";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

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
        className={`btn-wa inline-flex items-center justify-center gap-2 text-white font-label font-semibold rounded-md ${pad}`}
      >
        <WhatsAppIcon size={size === "lg" ? 20 : 18} />
        {whatsappLabel}
      </a>

      <a
        href={TEL_HREF}
        aria-label={`Ligar para a Dra. Kelly — ${TEL_DISPLAY}`}
        className={`btn-call inline-flex items-center justify-center gap-2 font-label font-semibold rounded-md ${pad}`}
      >
        <Phone size={size === "lg" ? 20 : 18} />
        Ligar para a Dra. Kelly
      </a>
    </div>
  );
};

export default EmpresaCTAs;
