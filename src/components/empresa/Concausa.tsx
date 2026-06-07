import { useInView } from "@/hooks/useInView";

const Concausa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight gold-shine">
          Mesmo com o caso "já ganho", dá para perder na perícia
        </h2>
        <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: '#A09A8D' }}>
          <p>
            Você pagou tudo certo, fez os exames periódicos, nunca teve processo. Ainda assim, um
            problema de coluna <strong style={{ color: '#F5F0E8' }}>degenerativo</strong> — desgaste
            natural, idade — pode ser interpretado pelo perito do juízo como{" "}
            <strong style={{ color: '#F5F0E8' }}>causado ou agravado pelo trabalho</strong>. É a
            chamada <strong style={{ color: '#F5F0E8' }}>concausa</strong>. Se ninguém estiver na
            sala para contestar tecnicamente, um caso sólido vira condenação. O assistente técnico
            existe exatamente para impedir isso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Concausa;
