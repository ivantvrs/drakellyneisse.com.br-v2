import { useInView } from "@/hooks/useInView";
import EmpresaCTAs from "./EmpresaCTAs";

const CTAFinalEmpresa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 16% 12%, rgba(255,255,255,.05) 0, rgba(255,255,255,.02) 18%, transparent 42%), radial-gradient(circle at 80% 8%, rgba(176,141,87,.13) 0, transparent 38%), linear-gradient(135deg,#0e0d0b 0%,#221f1b 54%,#0c0b09 100%)',
        color: '#ECE5D6',
      }}
    >
      {/* dot grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        opacity: 0.10,
        zIndex: 0,
      }} />

      <div ref={ref} className={`container mx-auto text-center max-w-2xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2.5rem] lg:text-[3rem] font-bold mb-10 leading-tight gold-shine">
          Sua empresa tem direito a um médico do seu lado na perícia.
        </h2>
        <p className="text-base md:text-lg leading-relaxed mb-12" style={{ color: '#9D9485' }}>
          Fale com a Dra. Kelly antes que o prazo feche.
        </p>

        <div className="mb-8">
          <EmpresaCTAs whatsappLabel="Falar agora no WhatsApp →" size="lg" align="center" />
        </div>

        <p className="font-label text-sm" style={{ color: '#8d8474' }}>
          Resposta rápida · Atuação nacional · CRM/MG 109.153
        </p>
      </div>
    </section>
  );
};

export default CTAFinalEmpresa;
