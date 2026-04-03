import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20assist%C3%AAncia%20t%C3%A9cnica%20m%C3%A9dica%20judicial.";

const faqs = [
  {
    q: "A assistência técnica médica judicial substitui o advogado?",
    a: "Não. O suporte técnico tem finalidade própria e complementa a atuação do advogado. Ele serve para auxiliar na compreensão técnica do caso, dentro do escopo contratado.",
  },
  {
    q: "Em quais momentos do processo esse apoio é útil?",
    a: "Em diferentes fases — especialmente quando há necessidade de compreender melhor os elementos clínicos, avaliar documentos médicos, formular quesitos ou impugnar laudo pericial.",
  },
  {
    q: "Quais documentos são necessários para a análise?",
    a: "Prontuários, relatórios médicos, exames, laudos periciais e outros documentos relacionados ao histórico clínico do caso, desde que pertinentes à demanda.",
  },
  {
    q: "A Dra. Kelly atende apenas causas trabalhistas?",
    a: "Não. A atuação abrange as áreas trabalhista, cível e previdenciária, sempre com foco na discussão médica do processo.",
  },
  {
    q: "Como funciona o primeiro contato?",
    a: "Você envia um resumo do caso pelo WhatsApp. A partir disso, é feita uma avaliação inicial para entender a demanda e definir o suporte mais adequado.",
  },
];

const FAQ = () => {
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
                  style={{ maxHeight: isOpen ? "200px" : "0px" }}
                >
                  <div
                    className="pb-6"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p className="text-base leading-relaxed" style={{ color: '#A09A8D' }} itemProp="text">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-label text-sm transition-colors"
            style={{ color: '#A09A8D' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
          >
            <MessageCircle size={16} style={{ color: '#D4A853' }} />
            Tem outra dúvida? Envie pelo WhatsApp.
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
