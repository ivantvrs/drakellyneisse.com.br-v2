import { useAtWhatsappUrl } from "./cta-at";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

// CTA da /at: só WhatsApp. Rastreado pelo tracking inline de at.html (whatsapp_click_at).
type Props = {
  whatsappLabel?: string;
  size?: "md" | "lg";
  align?: "left" | "center";
  waCta?: string;   // etiqueta de origem do WhatsApp (data-cta) p/ atribuição por seção
};

const AtCTAs = ({ whatsappLabel = "Analisar caso no WhatsApp →", size = "md", align = "left", waCta }: Props) => {
  const pad = size === "lg" ? "px-10 py-5 text-base" : "px-8 py-4 text-sm";
  const justify = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${justify}`}>
      <a
        href={useAtWhatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={waCta}
        aria-label="Falar com a Dra. Kelly no WhatsApp"
        className={`btn-wa inline-flex items-center justify-center gap-2 text-white font-label font-semibold rounded-md ${pad}`}
      >
        <WhatsAppIcon size={size === "lg" ? 20 : 18} />
        {whatsappLabel}
      </a>
    </div>
  );
};

export default AtCTAs;
