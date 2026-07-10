import { SearchCheck, FileQuestion, UserCheck, FileText, ShieldAlert, ClipboardCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useAtWhatsappUrl } from "./cta-at";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const servicos = [
  {
    Icon: SearchCheck,
    title: "Análise prévia do caso",
    text: "Avaliação técnica antes da perícia: nexo, riscos e o ponto que precisa ser defendido.",
  },
  {
    Icon: FileQuestion,
    title: "Formulação de quesitos",
    text: "As perguntas certas, entregues dentro do prazo legal, para direcionar o exame pericial.",
  },
  {
    Icon: UserCheck,
    title: "Acompanhamento presencial da perícia",
    text: "Presença no exame para garantir que os pontos técnicos do seu caso sejam registrados.",
  },
  {
    Icon: FileText,
    title: "Parecer técnico",
    text: "Documento médico-pericial fundamentado, para juntada ao processo.",
  },
  {
    Icon: ShieldAlert,
    title: "Impugnação de laudo",
    text: "Contestação técnica de laudos com erro, nexo mal estabelecido ou avaliação incompleta.",
  },
  {
    Icon: ClipboardCheck,
    title: "Análise de viabilidade técnica",
    text: "Leitura do caso antes de uma decisão importante, para saber em que terreno técnico você está.",
  },
];

const AtServicos = () => {
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
            Serviços
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.75rem] font-bold mb-5 leading-tight" style={{ color: '#ECE5D6', letterSpacing: '-0.018em' }}>
            Como a Dra. Kelly trabalha
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#9D9485' }}>
            Análise do caso, quesitos, acompanhamento da perícia, parecer técnico e impugnação de laudo,
            no prazo que o processo exige.
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
            {servicos.map(({ Icon, title, text }, i) => (
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
                <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(203,174,120,0.55), transparent)' }} />
                <span className="flex items-center justify-center mb-4 rounded-[11px]"
                  style={{ width: 42, height: 42, border: '1px solid rgba(191,160,104,0.4)', color: '#D8C49A', background: 'radial-gradient(circle at 50% 30%, rgba(191,160,104,0.18), transparent)' }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-[18px] font-semibold mb-2 leading-snug" style={{ color: '#F1EAD9' }}>{title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: '#9D9485' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href={useAtWhatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="cta_servicos_wpp"
            aria-label="Analisar caso no WhatsApp — Serviços"
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

export default AtServicos;
