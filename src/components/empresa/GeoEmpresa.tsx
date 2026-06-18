import { MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const GeoEmpresa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
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

      <div ref={ref} className={`container mx-auto max-w-3xl text-center relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <span className="inline-block mb-5" style={{ color: '#C79A5C' }}>
          <MapPin size={32} strokeWidth={1.5} />
        </span>
        <h2 className="font-display text-xl md:text-2xl lg:text-[2rem] font-bold mb-4 leading-snug" style={{ color: '#F1EAD9' }}>
          Onde a Dra. Kelly atua
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#9D9485' }}>
          <strong style={{ color: '#F1EAD9' }}>Perícias presenciais em Goiás, Minas e São Paulo</strong>, e
          atuação remota (análise, quesitos e parecer) em <strong style={{ color: '#F1EAD9' }}>todo o Brasil</strong>.
        </p>
      </div>
    </section>
  );
};

export default GeoEmpresa;
