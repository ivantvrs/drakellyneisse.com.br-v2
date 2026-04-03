import { FileText, Target, MessageCircle, ShieldAlert, UserCheck, Scale } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const diffs = [
  {
    icon: FileText,
    title: "Clareza técnica aplicada ao processo",
    desc: "A informação médica é traduzida de forma objetiva, acessível e útil à estratégia jurídica.",
  },
  {
    icon: Target,
    title: "Atuação estratégica",
    desc: "Cada entrega considera o contexto processual e a necessidade prática do advogado no caso concreto.",
  },
  {
    icon: MessageCircle,
    title: "Comunicação direta",
    desc: "Suporte técnico com linguagem clara, sem excesso de termos desnecessários.",
  },
  {
    icon: ShieldAlert,
    title: "Fundamentação e coerência",
    desc: "O foco está em consistência, raciocínio técnico e utilidade real da análise.",
  },
  {
    icon: UserCheck,
    title: "Atendimento individualizado",
    desc: "Cada processo é tratado de acordo com sua complexidade, documentação e objetivo jurídico.",
  },
  {
    icon: Scale,
    title: "Postura profissional e criteriosa",
    desc: "Atuação pautada por responsabilidade técnica, precisão e seriedade.",
  },
];

const Differentials = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="diferenciais" className="py-20 md:py-28">
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading text-center mb-14">
          Por que advogados contam com esse suporte técnico
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diffs.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="bg-brand-gold-50 rounded-lg p-7 border border-brand-gold-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group stagger-item"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-md bg-card flex items-center justify-center mb-5 border border-border">
                <Icon size={22} className="text-brand-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-heading mb-3">{title}</h3>
              <p className="text-base text-brand-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
