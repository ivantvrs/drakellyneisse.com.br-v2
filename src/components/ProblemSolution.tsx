import { useInView } from "@/hooks/useInView";
import problemBg from "@/assets/problem-solution-bg.webp";

const PainIcon1 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="15" x2="15" y2="15" opacity="0.5"/>
    <line x1="9" y1="18" x2="13" y2="18" opacity="0.5"/>
    <circle cx="17" cy="13" r="3"/>
    <line x1="19.5" y1="15.5" x2="21" y2="17"/>
  </svg>
);

const PainIcon2 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="14" y2="6"/>
    <line x1="4" y1="10" x2="12" y2="10"/>
    <line x1="4" y1="14" x2="10" y2="14"/>
    <line x1="4" y1="18" x2="13" y2="18"/>
    <circle cx="19" cy="12" r="4"/>
    <path d="M17.5 10.5C17.5 9.5 18.2 9 19 9s1.5.5 1.5 1.5c0 .8-.6 1.1-1.5 1.8"/>
    <circle cx="19" cy="15" r="0.5" fill="currentColor"/>
  </svg>
);

const PainIcon3 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="5" rx="1"/>
    <line x1="12" y1="7" x2="12" y2="14"/>
    <line x1="5" y1="18" x2="19" y2="18"/>
    <rect x="4" y="18" width="16" height="3" rx="1"/>
    <line x1="7" y1="10" x2="10" y2="13" opacity="0.4" strokeDasharray="2 2"/>
  </svg>
);

const PainIcon4 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13" opacity="0.5"/>
    <line x1="8" y1="16" x2="14" y2="16" opacity="0.5"/>
    <line x1="8" y1="19" x2="12" y2="19" opacity="0.5"/>
    <circle cx="17" cy="17" r="3"/>
    <line x1="17" y1="15" x2="17" y2="17.5"/>
    <circle cx="17" cy="19" r="0.3" fill="currentColor"/>
  </svg>
);

const painIcons = [PainIcon1, PainIcon2, PainIcon3, PainIcon4];

const pains = [
  {
    title: "Um laudo mal interpretado enfraquece uma tese juridicamente boa",
    text: "Quando a prova médica não é lida com precisão, até o melhor argumento jurídico perde sustentação.",
  },
  {
    title: "Quesitos mal formulados limitam a produção de prova útil",
    text: "Perguntas genéricas geram respostas genéricas. Quesitos estratégicos direcionam o laudo a favor do caso.",
  },
  {
    title: "Impugnação sem precisão técnica perde força",
    text: "Contestar um laudo exige mais do que discordância — exige fundamentação médica objetiva.",
  },
  {
    title: "Inconsistências e omissões no laudo passam despercebidas",
    text: "Contradições técnicas, dados ignorados e conclusões sem base passam despercebidos sem leitura especializada.",
  },
];

const ProblemSolution = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 problem-solution-bg"
      style={{
        backgroundImage: `url(${problemBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(15, 15, 15, 0.45)' }}
      />
      {/* Top gradient: seamless blend from Hero's dark bottom */}
      <div
        className="absolute inset-x-0 top-0 h-24 md:h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0F0F0F, rgba(15,15,15,0.8) 40%, transparent)',
          zIndex: 2,
        }}
      />
      {/* Accent stitch line near top */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: '6rem',
          height: 1,
          background: 'linear-gradient(to right, transparent 5%, rgba(212,168,83,0.35) 50%, transparent 95%)',
          zIndex: 3,
        }}
      />

      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section relative z-10 ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight gold-shine">
          A fragilidade do processo nem sempre está no direito — muitas vezes está na leitura da prova médica.
        </h2>

        <div className="space-y-10 mb-16">
          {pains.map((pain, i) => {
            const Icon = painIcons[i];
            return (
              <div
                key={pain.title}
                className="flex gap-4 stagger-item"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="flex-shrink-0 mt-0.5" style={{ color: '#D4A853' }}>
                  <Icon />
                </span>
                <div>
                  <h3 className="font-display text-lg md:text-xl font-semibold italic mb-2 leading-snug" style={{ color: '#F5F0E8' }}>
                    "{pain.title}"
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: '#A09A8D' }}>
                    {pain.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: '#A09A8D' }}>
          A assistência técnica médica judicial oferece o suporte que transforma informação médica em argumento técnico consistente dentro do processo.
        </p>
      </div>
    </section>
  );
};

export default ProblemSolution;
