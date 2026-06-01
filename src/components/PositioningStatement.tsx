import { useInView } from "@/hooks/useInView";

const PositioningStatement = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-5 leading-tight" style={{ color: '#F5F0E8' }}>
          O <span className="gold-shine">perito</span> é do juízo. O assistente técnico médico é seu.
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#A09A8D' }}>
          Quem responde ao juízo é o perito nomeado. Quem traduz a medicina a favor da sua tese — nos quesitos e na impugnação do laudo — é o assistente técnico médico.
        </p>
      </div>
    </section>
  );
};

export default PositioningStatement;
