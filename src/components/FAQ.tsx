import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/77da2716-be21-4957-ac7d-338e5dbd1e6c";

const faqs = [
  {
    q: "A assistência técnica médica substitui o trabalho do advogado?",
    a: "Não. A assistência técnica médica produz prova técnica (quesitos, parecer médico, impugnação de laudo, análise especializada de documentação clínica) que dá ao advogado fundamento médico para sustentar a tese de defesa. A estratégia processual, a peça e a postulação seguem sendo do advogado.",
  },
  {
    q: "Qual a diferença entre o médico perito e o assistente técnico médico?",
    a: "O médico perito é o perito do juízo, profissional nomeado pela vara para produzir o laudo oficial, com equidistância das partes. O assistente técnico médico é contratado pelo advogado para atuar ao lado da defesa: analisa o laudo do perito, formula quesitos, aponta omissões e fundamenta a impugnação. A Dra. Kelly atua como assistente técnica médica da reclamada, não como perita do juízo.",
  },
  {
    q: "Em quais momentos do processo a assistência técnica é mais útil?",
    a: "Quatro pontos críticos: (1) antes da perícia, para mapear o risco médico do caso e formular quesitos; (2) durante a perícia oficial, no acompanhamento técnico; (3) após laudo desfavorável, para fundamentar impugnação; (4) em audiência de esclarecimentos, para municiar o advogado. Quanto mais cedo a assistência entra, maior o controle sobre a produção da prova.",
  },
  {
    q: "Que documentos preciso enviar para a análise inicial?",
    a: "Para a análise preliminar, basta um resumo do caso e o que estiver à mão: laudo pericial (se já houver), peça inicial, contestação, exames, prontuários, atestados, CAT e benefícios INSS (B91, B31). Documentação complementar é solicitada apenas se for necessária para o escopo definido.",
  },
  {
    q: "Quais áreas técnicas a Dra. Kelly atende?",
    a: "Foco exclusivo em causas trabalhistas do lado da reclamada: doença ocupacional, LER/DORT, nexo causal, insalubridade, periculosidade, acidente de trabalho e análise de capacidade laboral. Não realizamos perícia para o INSS, BPC/LOAS, auxílio-doença, nem atendemos a parte reclamante.",
  },
  {
    q: "Como funciona o primeiro contato?",
    a: "Pelo WhatsApp. Você envia um resumo do caso e a documentação que tiver. Em até 24h úteis, a Dra. Kelly retorna com diagnóstico técnico do que o caso pede, escopo proposto, prazo e orçamento. A análise inicial é sem custo.",
  },
  {
    q: "Quanto tempo leva uma impugnação de laudo pericial?",
    a: "Depende da complexidade. Casos com laudo simples e documentação completa: entre 5 e 10 dias úteis. Casos com prazo curto (audiência marcada ou intimação de poucos dias) são tratados em regime de urgência, combinado caso a caso na análise inicial.",
  },
  {
    q: "Atende casos fora de Minas Gerais?",
    a: "Sim, em todo o Brasil. Análise documental, parecer, impugnação e elaboração de quesitos são entregues remotamente, formatos que independem de presença física. Para acompanhamento pericial presencial, a viabilidade é avaliada caso a caso conforme localidade e prazo.",
  },
  {
    q: "Quanto custa contratar a assistência técnica médica?",
    a: "O orçamento é por caso, conforme o escopo: análise preliminar, quesitos, parecer, impugnação ou acompanhamento. Não há mensalidade, retainer ou pacote fixo. Você só decide se contrata depois de saber preço e prazo.",
  },
  {
    q: "Atende advogados do lado do reclamante (trabalhador) também?",
    a: "Não. A atuação é exclusiva para o lado da reclamada: advogados de defesa empresarial, escritórios trabalhistas patronais e departamentos jurídicos de empresas. Essa opção reduz risco de conflito ético e mantém o foco técnico da prática.",
  },
];

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const FAQ = () => {
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

              {/* elemento editorial: "?" abstrato + régua + microtexto */}
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
          <div className="lg:col-span-8" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map(({ q, a }, i) => {
              const isOpen = open === i;
              const panelId = `faq-panel-${i}`;
              const btnId = `faq-btn-${i}`;
              return (
                <div
                  key={i}
                  style={{ borderTop: i === 0 ? "1px solid rgba(184,135,58,0.16)" : undefined, borderBottom: "1px solid rgba(184,135,58,0.16)" }}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <button
                    id={btnId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group w-full flex items-start gap-4 md:gap-5 py-5 text-left min-h-[44px]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {/* número técnico */}
                    <span
                      className="font-display italic leading-none pt-1 flex-shrink-0 w-7 transition-colors duration-300"
                      style={{ fontSize: "1.05rem", color: isOpen ? "#B8873A" : "rgba(184,135,58,0.5)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-body text-base md:text-[17px] font-medium pr-2 flex-1 transition-colors duration-300"
                      style={{ color: isOpen ? "#1F252B" : "#27221B" }}
                      itemProp="name"
                    >
                      {q}
                    </span>
                    {/* ícone de expansão minimalista */}
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
                      {/* resposta como "memorando técnico" */}
                      <div
                        className="ml-11 mb-6 pl-5 py-4 pr-4"
                        style={{
                          borderLeft: "2px solid rgba(184,135,58,0.45)",
                          background: "linear-gradient(90deg, rgba(184,135,58,0.07) 0%, rgba(184,135,58,0.02) 70%, transparent 100%)",
                          borderRadius: "0 4px 4px 0",
                        }}
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p className="text-[15px] leading-[1.7]" style={{ color: "#5E6470" }} itemProp="text">{a}</p>
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 font-label text-[14px] transition-colors"
                style={{ color: "#5E6470" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#1F252B"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#5E6470"; }}
              >
                <span style={{ color: "#B8873A" }}><WaIcon /></span>
                Tem outra dúvida sobre seu caso? Pergunte pelo WhatsApp.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
