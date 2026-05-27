import aboutImage from "@/assets/about-portrait.webp";
import { useInView } from "@/hooks/useInView";

const credentials = [
  "CRM/MG 109153",
  "Formação em Perícia Médica (CPEM)",
  "Formação em Medicina do Trabalho (Instituto IFH)",
  "Perita judicial cadastrada: TRT-3, TJMG, TJSP, TJMT, TJGO",
];

const About = () => {
  const { ref, isVisible } = useInView();

  return (
    <section id="sobre" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={aboutImage}
              alt="Dra. Kelly Jaqueline Neisse em retrato institucional"
              width={1024}
              height={1024}
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
              style={{
                borderRadius: 12,
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Text */}
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold leading-tight gold-shine">
                Sobre a Dra. Kelly Jaqueline Neisse
              </h2>
              <p className="font-label text-sm mt-3" style={{ color: '#D4A853' }}>Médica Perita Judicial · CRM/MG 109153 · Atuação exclusiva em Perícia Trabalhista</p>
            </div>

            <div className="space-y-5 text-base leading-relaxed mb-10" style={{ color: '#A09A8D' }}>
              <p>
                Dra. Kelly Jaqueline Neisse é <strong style={{ color: '#F5F0E8' }}>Médica Perita Judicial</strong> (CRM/MG 109153) com <strong style={{ color: '#F5F0E8' }}>atuação exclusiva em perícia médica trabalhista</strong> — dedicada à assistência técnica para advogados, escritórios e departamentos jurídicos e partes envolvidas.
              </p>
              <p>
                O trabalho concentra-se em quatro frentes: <strong style={{ color: '#F5F0E8' }}>análise médica do processo, formulação de quesitos suplementares, impugnação de laudo pericial e parecer médico-técnico</strong> para subsidiar contestação, recurso e audiência de esclarecimentos. Cada entrega é construída sobre a documentação concreta do caso — não em modelos genéricos.
              </p>
              <p>
                As áreas cobertas incluem <strong style={{ color: '#F5F0E8' }}>doença ocupacional, LER/DORT, nexo causal, insalubridade, periculosidade, acidente de trabalho</strong> e <strong style={{ color: '#F5F0E8' }}>análise de capacidade laboral</strong>. Formação em Perícia Médica (CPEM) e Medicina do Trabalho (Instituto IFH). Atuação em <strong style={{ color: '#F5F0E8' }}>TRT-3, TJMG, TJSP, TJMT e TJGO</strong> — credenciais que comprovam competência em causas trabalhistas, com cobertura nacional presencial e remota.
              </p>
              <p>
                <strong style={{ color: '#F5F0E8' }}>Sede em Uberlândia/MG</strong>, com <strong style={{ color: '#F5F0E8' }}>atendimento em todo o Brasil</strong>. O atendimento remoto cobre análise documental, parecer, quesitos e impugnação — formatos que independem de presença física. Análise inicial e orçamento em até 24h úteis pelo WhatsApp.
              </p>
            </div>

            {/* Credentials as text list */}
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {credentials.map((text, i) => (
                <span key={text} className="font-label text-xs stagger-item" style={{ color: '#8A857A', transitionDelay: `${i * 60}ms` }}>
                  {i > 0 && <span className="mr-4" style={{ color: '#333' }}>·</span>}
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
