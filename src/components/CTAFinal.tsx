import { MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Olá%20Dra.%20Kelly%2C%20gostaria%20de%20enviar%20meu%20caso%20para%20análise.";

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
          Seu processo envolve discussão médica relevante?
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-5" style={{ color: '#A09A8D' }}>
          Uma análise técnica bem conduzida traz mais clareza à prova, mais consistência à argumentação e mais segurança à condução do caso.
        </p>
        <p className="text-sm md:text-base leading-relaxed mb-12 font-medium" style={{ color: '#8A857A' }}>
          Prazos processuais não esperam. Se o seu caso precisa de fundamentação técnica, o momento de buscar apoio é agora.
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
            Falar no WhatsApp
          </a>
        </div>
        <p className="text-xs" style={{ color: '#8A857A' }}>
          Envie um resumo da demanda e a documentação disponível para avaliação inicial.
        </p>
      </div>
    </section>
  );
};

export default CTAFinal;
