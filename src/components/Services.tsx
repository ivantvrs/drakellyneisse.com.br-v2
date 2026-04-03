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
    title: "Análise técnica do processo",
    description: "Leitura estratégica dos elementos médicos para identificar pontos de apoio, fragilidades e oportunidades argumentativas.",
    benefit: "Clareza para orientar a condução técnica da demanda.",
  },
  {
    title: "Quesitos estratégicos personalizados",
    description: "Elaboração de quesitos claros, objetivos e tecnicamente direcionados à realidade do processo.",
    benefit: "Precisão na condução da prova pericial.",
  },
  {
    title: "Parecer médico-técnico",
    description: "Parecer fundamentado para subsidiar manifestações, recursos e construções argumentativas.",
    benefit: "Consistência técnica para sustentar a discussão médica do caso.",
  },
  {
    title: "Impugnação de laudo judicial",
    description: "Análise crítica do laudo pericial com foco em omissões, contradições e inconsistências técnicas.",
    benefit: "Base sólida para questionar conclusões periciais frágeis ou incompletas.",
  },
  {
    title: "Acompanhamento em perícia oficial",
    description: "Atuação técnica no acompanhamento pericial, garantindo uma leitura técnica precisa dos elementos médicos do processo.",
    benefit: "Atenção técnica nos pontos sensíveis da discussão pericial.",
  },
  {
    title: "Apoio estratégico ao advogado",
    description: "Suporte técnico durante a condução do caso, com linguagem acessível e alinhamento com a necessidade jurídica.",
    benefit: "Segurança para integrar prova médica e estratégia processual.",
  },
];

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Olá%20Dra.%20Kelly%2C%20gostaria%20de%20enviar%20meu%20caso%20para%20análise.";

const Services = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="servicos" className="py-24 md:py-32" style={{ backgroundColor: '#1A1A1A' }}>
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold mb-5 leading-tight gold-shine">
            Soluções técnicas para apoiar sua atuação no processo
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#A09A8D' }}>
            Análise, estratégia e fundamentação médica aplicada ao caso concreto.
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
            Falar com a Dra. Kelly no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
