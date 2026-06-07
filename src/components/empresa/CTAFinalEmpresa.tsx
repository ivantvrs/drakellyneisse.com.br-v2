import { useInView } from "@/hooks/useInView";
import EmpresaCTAs from "./EmpresaCTAs";

const CTAFinalEmpresa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-28 md:py-36 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)' }}
    >
      <div ref={ref} className={`container mx-auto text-center max-w-2xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2.5rem] lg:text-[3rem] font-bold mb-10 leading-tight gold-shine">
          Sua empresa tem direito a um médico do seu lado na perícia.
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-12" style={{ color: '#A09A8D' }}>
          Fale com a Dra. Kelly antes que o prazo feche.
        </p>

        <div className="mb-8">
          <EmpresaCTAs whatsappLabel="Falar agora no WhatsApp →" size="lg" align="center" />
        </div>

        <p className="font-label text-sm" style={{ color: '#8A857A' }}>
          Resposta rápida · Atuação nacional · CRM/MG 109.153
        </p>
      </div>
    </section>
  );
};

export default CTAFinalEmpresa;
