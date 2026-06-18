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
  { value: "TRT-3 · TJMG · TJSP\nTJMT · TJGO", label: "Atuação em tribunais", sub: "Credenciais de perita judicial", big: false },
  { value: "CRM/MG 109153", label: "Registro médico ativo", sub: "Perícia Médica Trabalhista", big: false },
  { value: "24h", label: "Análise inicial pelo WhatsApp", sub: "Dias úteis · sem custo", big: true },
  { value: "Nacional", label: "Atendimento em todo o Brasil", sub: "Presencial ou remoto", big: true },
];

const Metrics = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 16% 12%, rgba(255,255,255,.05) 0, rgba(255,255,255,.02) 18%, transparent 42%), radial-gradient(circle at 80% 8%, rgba(176,141,87,.13) 0, transparent 38%), linear-gradient(135deg,#0e0d0b 0%,#221f1b 54%,#0c0b09 100%)',
        padding: '72px 0',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        opacity: 0.10,
        zIndex: 0,
      }} />

      <div ref={ref} className={`container mx-auto relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* Top hr-bronze */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.4), transparent)', marginBottom: 48 }} />

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ value, label, sub, big }, i) => {
            const Icon = metricIcons[i];
            return (
              <div
                key={value + label}
                className="text-center stagger-item"
                style={{
                  padding: '8px 22px',
                  borderLeft: i > 0 ? '1px solid rgba(191,160,104,0.18)' : 'none',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="flex justify-center mb-3.5" style={{ color: '#C79A5C' }}>
                  <Icon />
                </span>
                <p className={`font-display font-semibold mb-2.5 ${big ? 'text-3xl' : 'text-base md:text-lg leading-snug'}`}
                  style={{ color: '#D8C49A', whiteSpace: 'pre-line' }}>
                  {value}
                </p>
                <p className="font-label text-[13px] font-medium mb-1" style={{ color: '#F1EAD9' }}>{label}</p>
                <p className="font-label text-[11px]" style={{ color: '#9D9485' }}>{sub}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom hr-bronze */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(176,141,87,0.4), transparent)', marginTop: 48 }} />
      </div>
    </section>
  );
};

export default Metrics;
