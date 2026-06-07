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
    <section id="o-que-faz" className="py-24 md:py-32" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight gold-shine">
          O que a Dra. Kelly faz pela sua empresa
        </h2>

        <div className="space-y-8">
          {items.map(({ Icon, title, text }, i) => (
            <div key={title} className="flex gap-4 stagger-item" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color: '#D4A853' }}>
                <Icon size={28} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-lg md:text-xl font-semibold mb-2 leading-snug" style={{ color: '#F5F0E8' }}>
                  {title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: '#A09A8D' }}>
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OQueFaz;
