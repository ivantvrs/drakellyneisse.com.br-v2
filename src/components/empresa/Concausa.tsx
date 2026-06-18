import { useInView } from "@/hooks/useInView";

const Concausa = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
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

      <div ref={ref} className={`container mx-auto max-w-3xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight gold-shine">
          Mesmo com o caso "já ganho", dá para perder na perícia
        </h2>
        <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: '#9D9485' }}>
          <p>
            Você pagou tudo certo, fez os exames periódicos, nunca teve processo. Ainda assim, um
            problema de coluna <strong style={{ color: '#F1EAD9' }}>degenerativo</strong> (desgaste
            natural, idade) pode ser interpretado pelo perito do juízo como{" "}
            <strong style={{ color: '#F1EAD9' }}>causado ou agravado pelo trabalho</strong>. É a
            chamada <strong style={{ color: '#F1EAD9' }}>concausa</strong>. Se ninguém estiver na
            sala para contestar tecnicamente, um caso sólido vira condenação. O assistente técnico
            existe exatamente para impedir isso.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Concausa;
