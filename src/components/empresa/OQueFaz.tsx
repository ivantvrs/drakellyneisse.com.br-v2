import { UserCheck, FileQuestion, Stethoscope, FileText, ShieldAlert } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const items = [
  {
    Icon: UserCheck,
    title: "Acompanha a perícia presencialmente",
    text: "O único representante técnico da empresa que pode entrar na sala do exame.",
  },
  {
    Icon: FileQuestion,
    title: "Formula os quesitos certos",
    text: "As perguntas que protegem a empresa, dentro do prazo.",
  },
  {
    Icon: Stethoscope,
    title: "Analisa laudos, exames e o nexo",
    text: "Separa doença do trabalho de doença da vida.",
  },
  {
    Icon: FileText,
    title: "Produz o parecer técnico",
    text: "O documento médico que o seu advogado usa na defesa.",
  },
  {
    Icon: ShieldAlert,
    title: "Impugna o laudo",
    text: "Quando vier desfavorável, com fundamento médico e dentro do prazo.",
  },
];

const OQueFaz = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="o-que-faz"
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

      <div ref={ref} className={`container mx-auto relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.75rem] font-bold text-center mb-12 leading-tight gold-shine">
          O que a Dra. Kelly faz pela sua empresa
        </h2>

        {/* Panel with glass cards */}
        <div className="max-w-[1060px] mx-auto rounded-3xl p-6"
          style={{
            background: 'radial-gradient(circle at 50% -8%, rgba(176,141,87,.16) 0, rgba(20,17,13,0) 55%), rgba(255,255,255,0.015)',
            border: '1px solid rgba(191,160,104,0.16)',
          }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(({ Icon, title, text }, i) => (
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
                  <Icon size={22} strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-[18px] font-semibold mb-2 leading-snug" style={{ color: '#F1EAD9' }}>{title}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: '#9D9485' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OQueFaz;
