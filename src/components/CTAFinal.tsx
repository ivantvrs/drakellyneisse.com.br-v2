import { MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/1048d0d3-67de-4823-be97-b5ad93a44820";

const CTAFinal = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-28 md:py-36 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)',
      }}
    >
      <div ref={ref} className={`container mx-auto text-center max-w-2xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-3xl md:text-[2.5rem] lg:text-[3.5rem] font-bold mb-8 leading-tight gold-shine">
          Seu caso tem prazo rodando para impugnar laudo, formular quesitos ou produzir parecer médico?
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#A09A8D' }}>
          Análise médica especializada da documentação do processo, impugnação fundamentada do laudo do juízo, quesitos suplementares antes da perícia ou parecer técnico para recurso, o que o seu caso precisa, entregue no formato e prazo que o processo exige.
        </p>
        <p className="text-sm md:text-base leading-relaxed mb-12 font-medium" style={{ color: '#8A857A' }}>
          Prazos processuais não esperam. Quanto antes a assistência técnica entra no caso, maior o controle sobre a produção da prova médica — e menor o risco de surpresa pericial.
        </p>
        <div className="flex justify-center mb-8">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — CTA final"
            className="inline-flex items-center justify-center gap-2 text-white font-label text-base font-semibold px-10 py-5 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:translate-y-[-1px]"
            style={{
              background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
              boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 30px rgba(37, 211, 102, 0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(37, 211, 102, 0.4)"; }}
          >
            <MessageCircle size={20} />
            Analisar caso no WhatsApp →
          </a>
        </div>
        <p className="text-xs" style={{ color: '#8A857A' }}>
          Envie um resumo do caso e a documentação disponível. Análise inicial e orçamento em até 24h úteis. Sem custo.
        </p>
      </div>
    </section>
  );
};

export default CTAFinal;
