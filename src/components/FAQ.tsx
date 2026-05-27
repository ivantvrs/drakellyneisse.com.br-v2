import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/77da2716-be21-4957-ac7d-338e5dbd1e6c";

const faqs = [
  {
    q: "A assistência técnica médica substitui o trabalho do advogado?",
    a: "Não. A assistência técnica médica produz prova técnica, quesitos, parecer médico, impugnação de laudo, análise especializada de documentação clínica — que dá ao advogado fundamento médico para sustentar a tese de defesa. A estratégia processual, a peça e a postulação seguem sendo do advogado.",
  },
  {
    q: "Em quais momentos do processo a assistência técnica é mais útil?",
    a: "Quatro pontos críticos: (1) antes da perícia, para mapear o risco médico do caso e formular quesitos suplementares; (2) durante a perícia oficial, no acompanhamento técnico; (3) após laudo desfavorável, para fundamentar impugnação; (4) em audiência de esclarecimentos, para municiar o advogado com argumentos médicos objetivos. Quanto mais cedo a assistência entra, maior o controle sobre a produção da prova.",
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
    a: "Depende da complexidade. Casos com laudo simples e documentação completa, entre 5 e 10 dias úteis. Casos com prazo curto (audiência marcada ou intimação de poucos dias) são tratados em regime de urgência — combinado caso a caso na análise inicial.",
  },
  {
    q: "Atende casos fora de Minas Gerais?",
    a: "Sim, em todo o Brasil. A análise documental, parecer médico-técnico, impugnação de laudo e elaboração de quesitos são entregues remotamente — formatos que independem de presença física. Para acompanhamento pericial presencial, a viabilidade é avaliada caso a caso conforme localidade e prazo, com possibilidade de deslocamento ou indicação de profissional local de confiança.",
  },
  {
    q: "Quanto custa contratar a assistência técnica médica?",
    a: "O orçamento é por caso, conforme o escopo: análise preliminar, quesitos, parecer, impugnação ou acompanhamento. Não há mensalidade, retainer ou pacote fixo. Você só decide se contrata depois de saber preço e prazo.",
  },
  {
    q: "Atende advogados do lado do reclamante (trabalhador) também?",
    a: "Não. A atuação é exclusiva para o lado da reclamada — advogados de defesa empresarial, escritórios trabalhistas patronais e departamentos jurídicos de empresas. Essa opção reduz risco de conflito ético e mantém o foco técnico da prática.",
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
                  style={{ maxHeight: isOpen ? "1000px" : "0px" }}
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
            Tem outra dúvida sobre seu caso? Pergunte pelo WhatsApp.
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
