import { MessageCircle } from "lucide-react";
import { useInView } from "@/hooks/useInView";


const SvcIcon1 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <circle cx="11" cy="15" r="3"/>
    <line x1="13.5" y1="17.5" x2="16" y2="20"/>
  </svg>
);

const SvcIcon2 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="14" height="18" rx="2"/>
    <line x1="7" y1="8" x2="13" y2="8"/>
    <line x1="7" y1="12" x2="11" y2="12"/>
    <line x1="7" y1="16" x2="12" y2="16"/>
    <path d="M18 2l3 3-7 7-3 1 1-3 6-8z"/>
  </svg>
);

const SvcIcon3 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <circle cx="14" cy="16" r="3"/>
    <polyline points="12.5 16 13.5 17 15.5 15"/>
  </svg>
);

const SvcIcon4 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="9" y1="13" x2="15" y2="19"/>
    <line x1="15" y1="13" x2="9" y2="19"/>
  </svg>
);

const SvcIcon5 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="7" r="3"/>
    <path d="M3 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2"/>
    <rect x="17" y="3" width="4" height="6" rx="1"/>
    <line x1="19" y1="9" x2="19" y2="12"/>
    <line x1="17" y1="12" x2="21" y2="12"/>
  </svg>
);

const SvcIcon6 = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <line x1="5" y1="6" x2="19" y2="6"/>
    <path d="M5 6L3 12h4L5 6z"/>
    <path d="M19 6l-2 6h4l-2-6z"/>
    <line x1="10" y1="21" x2="14" y2="21"/>
  </svg>
);

const svcIcons = [SvcIcon1, SvcIcon2, SvcIcon3, SvcIcon4, SvcIcon5, SvcIcon6];

const services = [
  {
    title: "Análise médica do processo",
    description: "Leitura especializada de prontuários, exames, CAT, atestados, laudos prévios e documentação clínica do reclamante. Identifica pontos frágeis do quadro médico, contradições internas no histórico clínico, ausência de critérios diagnósticos objetivos e inconsistências com a prova documental. Entregue como parecer reservado para orientar a estratégia processual antes de a perícia ser designada.",
    benefit: "Visão clara do que sustentar, do que evitar e do que pedir ao perito do juízo.",
  },
  {
    title: "Quesitos suplementares e estratégicos",
    description: "Formulação de quesitos médico-periciais para perícia oficial em causas trabalhistas, construídos a partir da análise do caso concreto e direcionados a fatos clínicos críticos para a defesa. Cobre nexo causal, concausalidade, capacidade laboral, diagnóstico diferencial e literatura médica de referência. Entregue dentro do prazo do saneador, no formato aceito pelo juízo.",
    benefit: "Perícia direcionada para os pontos clínicos que decidem o processo.",
  },
  {
    title: "Parecer médico-técnico fundamentado",
    description: "Parecer médico judicial elaborado para subsidiar contestação, manifestação sobre laudo, embargos de declaração ou recurso. Trata nexo causal, doença ocupacional, insalubridade, periculosidade, capacidade laboral e análise crítica de quantum indenizatório, a partir do quadro clínico documentado e da literatura médica aplicável. Estruturado em linguagem técnica acessível ao operador do Direito e com fundamentação citável.",
    benefit: "Documento médico que sustenta a tese da reclamada em qualquer fase do processo.",
  },
  {
    title: "Impugnação de laudo pericial",
    description: "Análise crítica do laudo do perito do juízo com foco em omissões diagnósticas, contradições internas, ausência de critérios objetivos, divergência com a prova documental do processo e literatura médica não considerada. Cada questionamento é fundamentado com referência citável. Entregue no prazo de manifestação processual.",
    benefit: "Argumento técnico para o juiz reconsiderar conclusão pericial desfavorável.",
  },
  {
    title: "Acompanhamento de perícia médica judicial",
    description: "Atuação técnica durante a perícia designada pelo juízo, presencial ou remoto, conforme o caso. Observa pontos sensíveis combinados previamente com o advogado, registra inconsistências em ata e formula quesitos suplementares orais quando admitidos. Reduz a margem de surpresa pericial e cria registro processual de divergência técnica.",
    benefit: "Defesa presente onde a prova técnica é produzida.",
  },
  {
    title: "Apoio técnico em audiência de esclarecimentos",
    description: "Preparação do advogado para audiência em que o perito do juízo é chamado a esclarecer pontos do laudo. Inclui mapeamento prévio das perguntas técnicas a fazer, fundamentação científica das objeções e municiamento com argumentos médicos objetivos para questionamento direto ao perito. Para o momento em que o esclarecimento é a última via de produção de prova técnica.",
    benefit: "Advogado entra em audiência munido de contraprova médica organizada.",
  },
];

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/5aee426e-4379-4a3c-ada4-ee117bf7133f";

const Services = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="servicos" className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-5 leading-tight gold-shine">
            Assistência técnica médica em perícia trabalhista
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#A09A8D' }}>
            Análise médica do caso, quesitos para perícia, parecer técnico e impugnação de laudo, produzidos sobre a documentação concreta do processo, no prazo que o processo exige.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ title, description, benefit }, i) => {
            const Icon = svcIcons[i];
            return (
              <div
                key={title}
                className="stagger-item transition-all duration-300 hover:-translate-y-1 group rounded-lg p-7"
                style={{
                  backgroundColor: '#242424',
                  border: '1px solid rgba(212, 168, 83, 0.15)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <span className="block mb-4" style={{ color: '#D4A853' }}>
                  <Icon />
                </span>
                <h3 className="font-display text-lg font-bold mb-3" style={{ color: '#F5F0E8' }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-grow" style={{ color: '#A09A8D' }}>{description}</p>
                <p className="text-xs font-semibold" style={{ color: '#D4A853' }}>{benefit}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar com a Dra. Kelly no WhatsApp"
            className="inline-flex items-center justify-center gap-2 text-white font-label text-sm font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:translate-y-[-1px]"
            style={{
              background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.35)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 211, 102, 0.35)"; }}
          >
            <MessageCircle size={18} />
            Analisar caso no WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
