import { useInView } from "@/hooks/useInView";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/5aee426e-4379-4a3c-ada4-ee117bf7133f";

const SvcIcon1 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <circle cx="11" cy="15" r="3"/>
    <line x1="13.5" y1="17.5" x2="16" y2="20"/>
  </svg>
);

const SvcIcon2 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="14" height="18" rx="2"/>
    <line x1="7" y1="8" x2="13" y2="8"/>
    <line x1="7" y1="12" x2="11" y2="12"/>
    <path d="M18 2l3 3-7 7-3 1 1-3 6-8z"/>
  </svg>
);

const SvcIcon3 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <circle cx="14" cy="16" r="3"/>
    <polyline points="12.5 16 13.5 17 15.5 15"/>
  </svg>
);

const SvcIcon4 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="19"/>
    <line x1="15" y1="13" x2="9" y2="19"/>
  </svg>
);

const SvcIcon5 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="7" r="3"/>
    <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>
    <rect x="17" y="3" width="4" height="6" rx="1"/>
  </svg>
);

const SvcIcon6 = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M12 3v18"/>
    <path d="M7 8h10"/>
    <circle cx="12" cy="6" r="1.6"/>
  </svg>
);

const svcIcons = [SvcIcon1, SvcIcon2, SvcIcon3, SvcIcon4, SvcIcon5, SvcIcon6];

const services = [
  {
    title: "Análise médica do processo",
    description: "Leitura especializada de prontuários, exames, CAT, atestados e laudos prévios. Identifica pontos frágeis do quadro, contradições e ausência de critérios objetivos, antes de a perícia ser designada.",
    benefit: "Visão clara do que sustentar, do que evitar e do que pedir ao perito.",
  },
  {
    title: "Quesitos suplementares e estratégicos",
    description: "Quesitos médico-periciais construídos a partir do caso concreto e direcionados a fatos clínicos críticos: nexo causal, concausalidade, capacidade laboral e diagnóstico diferencial. No prazo do saneador.",
    benefit: "Perícia direcionada aos pontos clínicos que decidem o processo.",
  },
  {
    title: "Parecer médico-técnico fundamentado",
    description: "Parecer para subsidiar contestação, manifestação sobre laudo, embargos ou recurso. Trata nexo, doença ocupacional, insalubridade, capacidade laboral, em linguagem técnica acessível ao operador do Direito.",
    benefit: "Documento médico que sustenta a tese em qualquer fase do processo.",
  },
  {
    title: "Impugnação de laudo pericial",
    description: "Análise crítica do laudo do perito do juízo: omissões diagnósticas, contradições internas, ausência de critérios objetivos, divergência com a prova documental. Cada questionamento com referência citável.",
    benefit: "Argumento técnico para o juiz reconsiderar conclusão desfavorável.",
  },
  {
    title: "Acompanhamento de perícia judicial",
    description: "Atuação técnica durante a perícia designada, presencial ou remota. Observa pontos sensíveis combinados com o advogado, registra inconsistências em ata e formula quesitos orais quando admitidos.",
    benefit: "Defesa presente onde a prova técnica é produzida.",
  },
  {
    title: "Apoio técnico em audiência de esclarecimentos",
    description: "Preparação do advogado para audiência em que o perito é chamado a esclarecer o laudo: mapeamento das perguntas técnicas, fundamentação das objeções e municiamento com argumentos médicos objetivos.",
    benefit: "Advogado entra munido de contraprova médica organizada.",
  },
];

const Services = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="servicos"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 16% 12%, rgba(255,255,255,.05) 0, rgba(255,255,255,.02) 18%, transparent 42%), radial-gradient(circle at 80% 8%, rgba(176,141,87,.13) 0, transparent 38%), linear-gradient(135deg,#0e0d0b 0%,#221f1b 54%,#0c0b09 100%)',
        color: '#ECE5D6',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        opacity: 0.10,
        zIndex: 0,
      }} />

      <div ref={ref} className={`container mx-auto relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-label text-xs font-semibold tracking-[0.28em] uppercase mb-5" style={{ color: '#C79A5C' }}>
            Atuação
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.75rem] font-bold mb-5 leading-tight" style={{ color: '#ECE5D6', letterSpacing: '-0.018em' }}>
            Assistência técnica médica em perícia trabalhista
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#9D9485' }}>
            Análise médica do caso, quesitos para perícia, parecer técnico e impugnação de laudo, produzidos sobre a documentação concreta do processo, no prazo que ele exige.
          </p>
        </div>

        {/* Panel with glass cards */}
        <div className="max-w-[1060px] mx-auto mb-12 rounded-3xl p-6"
          style={{
            background: 'radial-gradient(circle at 50% -8%, rgba(176,141,87,.16) 0, rgba(20,17,13,0) 55%), rgba(255,255,255,0.015)',
            border: '1px solid rgba(191,160,104,0.16)',
          }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(({ title, description, benefit }, i) => {
              const Icon = svcIcons[i];
              return (
                <div
                  key={title}
                  className="stagger-item transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                  style={{
                    borderRadius: 16,
                    padding: '26px 24px',
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(191,160,104,0.22)',
                    boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 16px 34px -24px rgba(0,0,0,0.85)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {/* top shimmer line */}
                  <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(203,174,120,0.55), transparent)' }} />
                  <span className="flex items-center justify-center mb-4 rounded-[11px]"
                    style={{ width: 42, height: 42, border: '1px solid rgba(191,160,104,0.4)', color: '#D8C49A', background: 'radial-gradient(circle at 50% 30%, rgba(191,160,104,0.18), transparent)' }}
                  >
                    <Icon />
                  </span>
                  <h3 className="font-display text-[18px] font-semibold mb-2 leading-snug" style={{ color: '#F1EAD9' }}>{title}</h3>
                  <p className="text-[13.5px] leading-relaxed mb-3" style={{ color: '#9D9485' }}>{description}</p>
                  <p className="font-label text-[11.5px] font-semibold leading-snug" style={{ color: '#C79A5C' }}>{benefit}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Dra. Kelly no WhatsApp — Serviços"
            className="btn-wa inline-flex items-center justify-center gap-2 text-white font-label text-sm font-semibold px-8 py-4 rounded-md"
          >
            <WhatsAppIcon size={18} />
            Analisar caso no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
