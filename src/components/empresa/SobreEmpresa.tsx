import aboutImage from "@/assets/about-portrait.webp";
import { useInView } from "@/hooks/useInView";

const credentials = [
  "CRM/MG 109.153",
  "Formação em Perícia Médica",
  "Formação em Medicina do Trabalho",
  "Perita cadastrada: TRT-3, TJGO, TJSP, TJMT, TJMG",
];

const SobreEmpresa = () => {
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
              style={{ borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}
            />
          </div>

          {/* Text */}
          <div>
            <div className="mb-8">
              <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold leading-tight gold-shine">
                Sobre a Dra. Kelly Jaqueline Neisse
              </h2>
              <p className="font-label text-sm mt-3" style={{ color: '#D4A853' }}>
                Médica Perita Judicial · CRM/MG 109.153
              </p>
            </div>

            <div className="space-y-5 text-base md:text-lg leading-relaxed mb-10" style={{ color: '#A09A8D' }}>
              <p>
                Dra. Kelly Jaqueline Neisse é <strong style={{ color: '#F5F0E8' }}>médica perita judicial</strong>,{" "}
                <strong style={{ color: '#F5F0E8' }}>CRM/MG 109.153</strong>. Formação em Perícia Médica e em
                Medicina do Trabalho. Perita cadastrada em <strong style={{ color: '#F5F0E8' }}>TRT-3, TJGO, TJSP, TJMT e TJMG</strong>.
              </p>
              <p>
                Conhece os peritos das principais comarcas e <strong style={{ color: '#F5F0E8' }}>como cada um avalia nexo e concausa</strong>.
              </p>
            </div>

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

export default SobreEmpresa;
