import { MessageCircle, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { EMPRESA_WHATSAPP_URL } from "./cta";

const Relogio = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <span className="inline-block mb-5" style={{ color: '#D4A853' }}>
          <Clock size={36} strokeWidth={1.5} />
        </span>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight gold-shine">
          O relógio já está correndo
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: '#A09A8D' }}>
          A partir da nomeação do perito, o prazo para indicar o assistente técnico e apresentar os
          quesitos é <strong style={{ color: '#F5F0E8' }}>curto — em geral cerca de 15 dias</strong>.
          Quanto antes começarmos, mais forte fica a sua defesa.
        </p>

        <div className="flex justify-center">
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar meu caso no WhatsApp"
            className="inline-flex items-center justify-center gap-2 text-white font-label text-base font-semibold px-10 py-5 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:translate-y-[-1px]"
            style={{
              background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
              boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 211, 102, 0.4)"; }}
          >
            <MessageCircle size={20} />
            Enviar meu caso no WhatsApp →
          </a>
        </div>

        <p className="text-sm mt-6" style={{ color: '#8A857A' }}>
          A conversa já abre com um roteiro de 3 informações (perito, comarca e data da perícia) para
          agilizar a análise.
        </p>
      </div>
    </section>
  );
};

export default Relogio;
