import { MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const GeoEmpresa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <span className="inline-block mb-5" style={{ color: '#D4A853' }}>
          <MapPin size={32} strokeWidth={1.5} />
        </span>
        <h2 className="font-display text-xl md:text-2xl lg:text-[2rem] font-bold mb-4 leading-snug" style={{ color: '#F5F0E8' }}>
          Onde a Dra. Kelly atua
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#A09A8D' }}>
          <strong style={{ color: '#F5F0E8' }}>Perícias presenciais em Goiás, Minas e São Paulo</strong> — e
          atuação remota (análise, quesitos e parecer) em <strong style={{ color: '#F5F0E8' }}>todo o Brasil</strong>.
        </p>
      </div>
    </section>
  );
};

export default GeoEmpresa;
