import { useInView } from "@/hooks/useInView";

const AdvogadoPediu = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-8 leading-tight" style={{ color: '#27221B', letterSpacing: '-0.018em' }}>
          Seu advogado pediu um assistente técnico, e por que ele não te deu um nome
        </h2>
        <div className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: '#6B6358' }}>
          <p>
            Seu advogado avisou que você precisa de um médico para acompanhar a perícia, mas não
            indicou nenhum e não pode entrar no exame. Não é descaso:{" "}
            <strong style={{ color: '#27221B', fontWeight: 600 }}>
              por lei, a escolha e o custo desse médico são da empresa, não do advogado, nem do juiz
            </strong>{" "}
            (CPC, art. 465 e 95). Por isso a busca caiu no seu colo. Você está no lugar certo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvogadoPediu;
