import { UserCheck, Scale, FileSearch, Target, XCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const items = [
  { icon: Scale, text: "Advogados que precisam de apoio técnico para interpretar prova médica" },
  { icon: FileSearch, text: "Escritórios que atuam em causas com discussão sobre incapacidade, nexo causal, concausa, dano, limitação funcional ou repercussões clínicas" },
  { icon: Target, text: "Profissionais que desejam maior clareza técnica na formulação de estratégia processual" },
  { icon: UserCheck, text: "Casos que exigem leitura médica cuidadosa, parecer fundamentado e comunicação técnica objetiva" },
];

const exclusions = [
  "O caso não envolve discussão médica ou pericial",
  "A demanda é exclusivamente de área penal",
  "A expectativa é de garantia de resultado processual",
];

const ForWho = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 md:py-28 gradient-section">
      <div ref={ref} className={`container mx-auto max-w-4xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading text-center mb-12">
          Para quem este trabalho é indicado
        </h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {items.map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="flex items-start gap-4 bg-card rounded-lg p-6 border border-border shadow-card stagger-item"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-md bg-brand-light flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-brand-gold" />
              </div>
              <p className="text-base text-brand-body leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Exclusion block */}
        <div className="bg-card rounded-lg p-6 border border-border max-w-2xl mx-auto">
          <p className="font-display text-base font-semibold text-brand-muted mb-4">
            Este trabalho pode não ser indicado se:
          </p>
          <ul className="space-y-2.5">
            {exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-brand-muted italic">
                <XCircle size={16} className="flex-shrink-0 mt-0.5 opacity-50" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
