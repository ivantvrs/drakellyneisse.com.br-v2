import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Envio inicial do caso",
    desc: "O advogado encaminha os documentos e apresenta a necessidade técnica relacionada ao processo.",
  },
  {
    num: "02",
    title: "Entendimento da demanda",
    desc: "É avaliado o tipo de suporte mais adequado, de acordo com o estágio do caso e com a finalidade da análise.",
  },
  {
    num: "03",
    title: "Definição do escopo",
    desc: "São alinhados o objetivo do trabalho, os documentos necessários e o formato de apoio técnico mais pertinente.",
  },
  {
    num: "04",
    title: "Execução da análise",
    desc: "A documentação é analisada com foco nos pontos técnicos que podem contribuir para a compreensão do caso.",
  },
  {
    num: "05",
    title: "Devolutiva técnica",
    desc: "O advogado recebe o retorno técnico dentro do escopo definido, com clareza e direcionamento para uso prático na condução do caso.",
  },
];

const HowItWorks = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="como-funciona" className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-20 leading-tight gold-shine">
          Como funciona o atendimento
        </h2>

        <div className="flex flex-col gap-10 md:gap-14">
          {steps.map(({ num, title, desc }, i) => (
            <div
              key={num}
              className="stagger-item"
              style={{
                transitionDelay: `${i * 100}ms`,
                display: 'grid',
                gridTemplateColumns: '3.5rem 1.5rem 1fr',
                gap: '0 1.25rem',
                alignItems: 'start',
              }}
            >
              {/* Number */}
              <span className="font-display text-3xl md:text-4xl font-bold leading-none gold-shine text-right" style={{ paddingTop: 2 }}>
                {num}
              </span>

              {/* Dot + line segment */}
              <div className="flex flex-col items-center" style={{ paddingTop: 8 }}>
                <span
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 12,
                    height: 12,
                    background: 'linear-gradient(135deg, #B8923F, #E8C77B)',
                    boxShadow: '0 0 8px rgba(212,168,83,0.4)',
                  }}
                />
                {i < steps.length - 1 && (
                  <span
                    className="flex-1"
                    style={{
                      width: 2,
                      marginTop: 8,
                      background: 'rgba(212,168,83,0.3)',
                      minHeight: '2.5rem',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ maxWidth: '32rem' }}>
                <h3 className="font-display text-lg md:text-xl font-bold mb-2" style={{ color: '#F5F0E8' }}>{title}</h3>
                <p className="text-base leading-relaxed" style={{ color: '#A09A8D' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-center mt-16 italic max-w-2xl mx-auto" style={{ color: '#8A857A' }}>
          Cada caso exige leitura individualizada. A atuação técnica respeita a complexidade e as particularidades de cada processo.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
