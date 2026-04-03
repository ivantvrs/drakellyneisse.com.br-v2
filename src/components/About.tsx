import aboutImage from "@/assets/about-portrait.webp";
import { useInView } from "@/hooks/useInView";

const credentials = [
  "CRM/MG 109153",
  "Perícia Médica",
  "CPEM",
  "Instituto IFH",
  "Pós-graduação em Geriatria — PUC Minas",
  "TRT-3 | TJMG | TJMT | TJSP",
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
              <p className="font-label text-sm mt-3" style={{ color: '#D4A853' }}>Médica Perita Judicial · CRM/MG 109153</p>
            </div>

            <div className="space-y-5 text-base leading-relaxed mb-10" style={{ color: '#A09A8D' }}>
              <p>
                A Dra. Kelly Jaqueline Neisse é <strong style={{ color: '#F5F0E8' }}>Médica Perita Judicial</strong> com atuação em <strong style={{ color: '#F5F0E8' }}>assistência técnica e perícia médica judicial</strong> nas áreas trabalhista, cível e previdenciária.
              </p>
              <p>
                Sua atuação é direcionada ao apoio técnico de advogados e escritórios que necessitam de <strong style={{ color: '#F5F0E8' }}>leitura médica qualificada</strong>, análise estratégica e fundamentação técnico-pericial aplicada ao caso concreto.
              </p>
              <p>
                Atua com foco em <strong style={{ color: '#F5F0E8' }}>perícias médicas judiciais</strong>, avaliação de incapacidade laborativa, <strong style={{ color: '#F5F0E8' }}>análise de nexo causal</strong> e elaboração de laudos técnico-periciais, oferecendo suporte com objetividade, clareza e fundamentação técnico-pericial.
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
