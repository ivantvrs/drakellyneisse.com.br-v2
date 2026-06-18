import { Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { EMPRESA_WHATSAPP_URL } from "./cta";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const Relogio = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#EAE2D2' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <span className="inline-block mb-5" style={{ color: '#9C7C43' }}>
          <Clock size={36} strokeWidth={1.5} />
        </span>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight" style={{ color: '#27221B', letterSpacing: '-0.018em' }}>
          O relógio já está correndo
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#6B6358' }}>
          A partir da nomeação do perito, o prazo para indicar o assistente técnico e apresentar os
          quesitos é <strong style={{ color: '#27221B', fontWeight: 600 }}>curto, em geral cerca de 15 dias</strong>.
          Quanto antes começarmos, mais forte fica a sua defesa.
        </p>

        <div className="flex justify-center">
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar meu caso no WhatsApp"
            className="btn-wa inline-flex items-center justify-center gap-2 text-white font-label text-base font-semibold px-10 py-5 rounded-md"
          >
            <WhatsAppIcon size={20} />
            Enviar meu caso no WhatsApp →
          </a>
        </div>

        <p className="text-sm mt-6" style={{ color: '#8C8478' }}>
          A conversa já abre com um roteiro de 3 informações (perito, comarca e data da perícia) para
          agilizar a análise.
        </p>
      </div>
    </section>
  );
};

export default Relogio;
