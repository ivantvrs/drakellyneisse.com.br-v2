import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useAtWhatsappUrl } from "./cta-at";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const faqs = [
  {
    q: "Eu preciso mesmo de um assistente técnico?",
    a: "Não é obrigatório, mas é um direito seu. Sem ele, o laudo do perito entra no processo sem nenhum contraponto médico, e é nesse laudo que o juiz se baseia.",
  },
  {
    q: "Serve para o meu lado do processo?",
    a: "Sim. O assistente técnico pode ser indicado por qualquer das partes. A Dra. Kelly atua de forma técnica, ao lado de quem a contrata.",
  },
  {
    q: "Meu advogado precisa autorizar?",
    a: "A contratação é da parte. A Dra. Kelly trabalha em conjunto com o seu advogado, cuidando exclusivamente da parte médica, não no lugar dele.",
  },
  {
    q: "Quando devo procurar?",
    a: "Assim que souber da perícia ou da nomeação do perito. O prazo para indicar o assistente técnico e entregar os quesitos é curto.",
  },
  {
    q: "Já recebi o laudo. Ainda dá tempo?",
    a: "Em muitos casos, sim, a impugnação tem prazo próprio. Quanto antes o laudo for analisado, mais completa fica a contestação.",
  },
  {
    q: "Quanto custa?",
    a: "Orçamento por caso, sem mensalidade. Você sabe o valor antes de fechar.",
  },
];

const AtFAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { ref, isVisible } = useInView();

  return (
    <section
      id="faq"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(48% 42% at 18% 18%, rgba(201,163,92,0.10) 0, transparent 56%)," +
          "radial-gradient(60% 60% at 100% 100%, rgba(184,135,58,0.06) 0, transparent 60%)," +
          "linear-gradient(165deg, #F7F1E8 0%, #F2E8D8 55%, #EFE4D4 100%)",
      }}
    >
      {/* textura leve (papel/dossiê) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background:
            "repeating-linear-gradient(180deg, rgba(184,135,58,0.02) 0px, rgba(184,135,58,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <div ref={ref} className={`container mx-auto max-w-6xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-16">
          {/* ── Coluna editorial (esquerda) ── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#B8873A" }}>
                Dúvidas
              </p>
              <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold leading-[1.12] mb-6" style={{ color: "#1F252B", letterSpacing: "-0.018em" }}>
                Perguntas frequentes
              </h2>

              <div className="hidden lg:flex items-end gap-4 mt-2">
                <span
                  aria-hidden="true"
                  className="font-display leading-none select-none"
                  style={{ fontSize: "5.5rem", color: "rgba(184,135,58,0.18)", fontStyle: "italic" }}
                >
                  ?
                </span>
                <div className="pb-3">
                  <span aria-hidden="true" className="block mb-2.5" style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(184,135,58,0.5), transparent)" }} />
                  <p className="font-label text-[10px] tracking-[0.26em] uppercase" style={{ color: "rgba(94,100,112,0.7)" }}>
                    Índice técnico
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Índice técnico / accordion (direita) ── */}
          {/* FAQ acessível. Os dados estruturados FAQPage ficam em JSON-LD no <head> do at.html
              (fonte única) — por isso não duplicamos com microdata aqui. */}
          <div className="lg:col-span-8">
            {faqs.map(({ q, a }, i) => {
              const isOpen = open === i;
              const panelId = `at-faq-panel-${i}`;
              const btnId = `at-faq-btn-${i}`;
              return (
                <div
                  key={i}
                  style={{ borderTop: i === 0 ? "1px solid rgba(184,135,58,0.16)" : undefined, borderBottom: "1px solid rgba(184,135,58,0.16)" }}
                >
                  <button
                    id={btnId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group w-full flex items-start gap-4 md:gap-5 py-5 text-left min-h-[44px]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span
                      className="font-display italic leading-none pt-1 flex-shrink-0 w-7 transition-colors duration-300"
                      style={{ fontSize: "1.05rem", color: isOpen ? "#B8873A" : "rgba(184,135,58,0.5)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-body text-base md:text-[17px] font-medium pr-2 flex-1 transition-colors duration-300"
                      style={{ color: isOpen ? "#1F252B" : "#27221B" }}
                    >
                      {q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 mt-0.5"
                      style={{
                        width: 26,
                        height: 26,
                        border: `1px solid ${isOpen ? "rgba(184,135,58,0.55)" : "rgba(184,135,58,0.28)"}`,
                        background: isOpen ? "rgba(184,135,58,0.1)" : "transparent",
                      }}
                    >
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: "#B8873A" }}
                      />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div
                        className="ml-11 mb-6 pl-5 py-4 pr-4"
                        style={{
                          borderLeft: "2px solid rgba(184,135,58,0.45)",
                          background: "linear-gradient(90deg, rgba(184,135,58,0.07) 0%, rgba(184,135,58,0.02) 70%, transparent 100%)",
                          borderRadius: "0 4px 4px 0",
                        }}
                      >
                        <p className="text-[15px] leading-[1.7]" style={{ color: "#5E6470" }}>{a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── Nota editorial (rodapé do FAQ) ── */}
            <div className="relative mt-8 pt-5">
              <span aria-hidden="true" className="absolute left-0 right-0 top-0" style={{ height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.4), transparent)" }} />
              <a
                href={useAtWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="cta_faq_wpp"
                className="inline-flex items-center gap-2.5 font-label text-[14px] transition-colors"
                style={{ color: "#5E6470" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#1F252B"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#5E6470"; }}
              >
                <span style={{ color: "#B8873A" }}><WhatsAppIcon size={16} /></span>
                Tem outra dúvida sobre seu caso? Pergunte pelo WhatsApp.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtFAQ;
