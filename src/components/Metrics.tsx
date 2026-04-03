import { useInView } from "@/hooks/useInView";

const MetricIcon1 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M5 21V7l7-4 7 4v14"/>
    <line x1="9" y1="10" x2="9" y2="14"/>
    <line x1="12" y1="10" x2="12" y2="14"/>
    <line x1="15" y1="10" x2="15" y2="14"/>
  </svg>
);

const MetricIcon2 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const MetricIcon3 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MetricIcon4 = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const metricIcons = [MetricIcon1, MetricIcon2, MetricIcon3, MetricIcon4];

const metrics = [
  { value: "TRT-3 · TJMG\nTJMT · TJSP", label: "", sub: "cadastro ativo" },
  { value: "CRM/MG", label: "109153", sub: "registro ativo" },
  { value: "24h", label: "resposta", sub: "dias úteis" },
  { value: "Nacional", label: "presencial", sub: "e remoto" },
];

const Metrics = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* Thin gold line top */}
        <div className="mb-14" style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.25), transparent)' }} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {metrics.map(({ value, label, sub }, i) => {
            const Icon = metricIcons[i];
            return (
              <div
                key={value + label}
                className="text-center stagger-item"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="inline-block mb-3" style={{ color: '#D4A853' }}>
                  <Icon />
                </span>
                <p className={`font-display font-bold mb-1 gold-shine-subtle ${value.includes('\n') ? 'text-base md:text-lg leading-snug' : 'text-2xl md:text-3xl'}`} style={{ whiteSpace: 'pre-line' }}>{value}</p>
                {label && <p className="font-label text-sm font-medium" style={{ color: '#F5F0E8' }}>{label}</p>}
                <p className="font-label text-xs mt-0.5" style={{ color: '#8A857A' }}>{sub}</p>
              </div>
            );
          })}
        </div>

        {/* Thin gold line bottom */}
        <div className="mt-14" style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.25), transparent)' }} />
      </div>
    </section>
  );
};

export default Metrics;
