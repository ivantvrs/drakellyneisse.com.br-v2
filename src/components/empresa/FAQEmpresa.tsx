import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { EMPRESA_WHATSAPP_URL } from "./cta";

const faqs = [
  {
    q: "Preciso disso mesmo se meu caso já está ganho?",
    a: "Caso ganho se perde numa perícia mal conduzida. Sem um assistente técnico, o laudo do perito do juízo entra no processo sem contraponto médico — e é nele que o juiz se baseia.",
  },
  {
    q: "Quanto custa?",
    a: "Orçamento por caso, sem mensalidade. Você sabe o valor antes de fechar.",
  },
  {
    q: "O que é concausa?",
    a: "É quando o trabalho é apontado como tendo agravado um problema que já existia. É o principal risco em doenças degenerativas, como a maioria dos problemas de coluna.",
  },
  {
    q: "A perícia é no consultório ou na minha empresa?",
    a: "A perícia médica é no consultório do perito. A vistoria das condições de trabalho (perícia ergonômica) é que ocorre na empresa, feita por engenheiro. A Dra. Kelly atua na perícia médica.",
  },
  {
    q: "Meu advogado precisa autorizar?",
    a: "Não. A contratação é da empresa; a Dra. Kelly trabalha em conjunto com o seu advogado.",
  },
];

const FAQEmpresa = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isVisible } = useInView();

  return (
    <section id="faq" className="py-24 md:py-32" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight gold-shine">
          Perguntas frequentes
        </h2>

        <div itemScope itemType="https://schema.org/FAQPage">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-base md:text-lg font-medium pr-6" style={{ color: '#F5F0E8' }} itemProp="name">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: '#D4A853' }}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "1000px" : "0px" }}
                >
                  <div className="pb-6" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                    <p className="text-base leading-relaxed" style={{ color: '#A09A8D' }} itemProp="text">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-label text-sm transition-colors"
            style={{ color: '#A09A8D' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
          >
            <MessageCircle size={16} style={{ color: '#D4A853' }} />
            Tem outra dúvida sobre seu caso? Pergunte pelo WhatsApp.
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQEmpresa;
