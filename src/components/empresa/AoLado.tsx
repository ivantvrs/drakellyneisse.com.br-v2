import { useInView } from "@/hooks/useInView";

const AoLado = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight gold-shine">
          Trabalho ao lado do seu advogado, não no lugar dele
        </h2>
        <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: '#A09A8D' }}>
          <p>
            A Dra. Kelly atua em conjunto com a sua banca: entrega quesitos e parecer para o seu
            advogado e cuida exclusivamente da parte médica. Você não troca de advogado —{" "}
            <strong style={{ color: '#F5F0E8' }}>ganha um especialista médico no time da defesa</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AoLado;
