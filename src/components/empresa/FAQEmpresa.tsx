import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { EMPRESA_WHATSAPP_URL } from "./cta";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const faqs = [
  {
    q: "Preciso disso mesmo se meu caso já está ganho?",
    a: "Caso ganho se perde numa perícia mal conduzida. Sem um assistente técnico, o laudo do perito do juízo entra no processo sem contraponto médico, e é nele que o juiz se baseia.",
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
    <section id="faq" className="py-16 md:py-24" style={{ backgroundColor: '#F5F0E8' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight" style={{ color: '#27221B', letterSpacing: '-0.018em' }}>
          Perguntas frequentes
        </h2>

        <div itemScope itemType="https://schema.org/FAQPage">
          {faqs.map(({ q, a }, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{ borderBottom: '1px solid rgba(39,34,27,0.12)' }}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left min-h-[44px]"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-base md:text-lg font-medium pr-6" style={{ color: '#27221B' }} itemProp="name">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    style={{ color: '#9C7C43' }}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="pb-6" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-base leading-relaxed" style={{ color: '#6B6358' }} itemProp="text">{a}</p>
                    </div>
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
            style={{ color: '#6B6358' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#27221B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6358'; }}
          >
            <span style={{ color: '#9C7C43' }}><WhatsAppIcon size={16} /></span>
            Tem outra dúvida sobre seu caso? Pergunte pelo WhatsApp.
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQEmpresa;
