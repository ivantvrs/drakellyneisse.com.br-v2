import { useInView } from "@/hooks/useInView";

const IconLawyer = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="3" />
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <path d="M9 13l3 2 3-2" opacity="0.5" />
  </svg>
);

const IconOffice = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="1" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="8" y1="4" x2="8" y2="21" opacity="0.5" />
    <line x1="16" y1="4" x2="16" y2="21" opacity="0.5" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
  </svg>
);

const IconCompany = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l7-4 7 4v14" />
    <rect x="9" y="12" width="2" height="3" />
    <rect x="13" y="12" width="2" height="3" />
    <rect x="9" y="7" width="2" height="3" opacity="0.5" />
    <rect x="13" y="7" width="2" height="3" opacity="0.5" />
  </svg>
);

const IconLegalDept = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const items = [
  { Icon: IconLawyer, text: "Advogados que precisam de assistente técnico médico em perícia judicial" },
  { Icon: IconOffice, text: "Escritórios que atuam em demandas trabalhistas e cíveis" },
  { Icon: IconCompany, text: "Empresas respondendo processo e precisando de defesa técnica em perícia médica" },
  { Icon: IconLegalDept, text: "Departamentos jurídicos que buscam parecer médico fundamentado para subsidiar a defesa" },
];

const TargetAudience = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight gold-shine">
          Para quem é este serviço
        </h2>

        <div className="space-y-8">
          {items.map(({ Icon, text }, i) => (
            <div
              key={text}
              className="flex gap-4 stagger-item"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="flex-shrink-0 mt-0.5" style={{ color: '#D4A853' }}>
                <Icon />
              </span>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#A09A8D' }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
