import { Activity, Search, FileText, CheckCircle, HeartPulse, ListChecks, FolderSearch, ClipboardCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const items = [
  { icon: Activity, text: "Análise de incapacidade laborativa" },
  { icon: Search, text: "Discussão de nexo causal e concausa" },
  { icon: FileText, text: "Leitura crítica de laudo pericial" },
  { icon: CheckCircle, text: "Coerência entre documentos, exames e conclusão técnica" },
  { icon: HeartPulse, text: "Limitação funcional e repercussões clínicas" },
  { icon: ListChecks, text: "Formulação de quesitos com utilidade prática" },
  { icon: FolderSearch, text: "Casos com documentação médica extensa ou de difícil interpretação" },
  { icon: ClipboardCheck, text: "Análise prévia de viabilidade técnica do caso" },
];

const TechnicalRecognition = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-16 md:py-20">
      <div ref={ref} className={`container mx-auto max-w-4xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading text-center mb-10">
          Onde esse suporte técnico costuma fazer diferença
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="flex items-center gap-3 bg-brand-gold-50 rounded-md px-4 py-3.5 border border-brand-gold-100 stagger-item"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Icon size={16} className="text-brand-gold flex-shrink-0" />
              <span className="font-label text-sm text-brand-heading">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalRecognition;
