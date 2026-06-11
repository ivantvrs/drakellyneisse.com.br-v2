import aboutImage from "@/assets/about-portrait.webp";
import aboutImageAvif from "@/assets/about-portrait.avif";
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
    <section id="sobre" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#EAE2D2' }}>
      <div ref={ref} className={`container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-14 lg:gap-20 items-center max-w-[1060px] mx-auto">
          {/* Image */}
          <div className="relative">
            <picture>
              <source srcSet={aboutImageAvif} type="image/avif" />
              <img
                src={aboutImage}
                alt="Dra. Kelly Jaqueline Neisse em retrato institucional"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
                style={{
                  borderRadius: 10,
                  boxShadow: '0 24px 56px -22px rgba(40,30,18,0.35)',
                  aspectRatio: '1/1',
                }}
              />
            </picture>
            {/* Hairline frame */}
            <div className="absolute pointer-events-none" style={{
              inset: 14,
              border: '1px solid rgba(156,124,67,0.45)',
              borderRadius: 6,
            }} />
            {/* CRM seal */}
            <span className="absolute left-0 bottom-6 font-label text-[11px] tracking-[0.08em] px-4 py-2.5"
              style={{
                background: '#27221B',
                color: '#ECE5D6',
                borderRadius: '0 4px 4px 0',
              }}
            >
              CRM/MG 109.153
            </span>
          </div>

          {/* Text */}
          <div>
            <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.4rem] font-bold leading-tight mb-2" style={{ color: '#27221B', letterSpacing: '-0.015em' }}>
              Sobre a Dra. Kelly Jaqueline Neisse
            </h2>
            <p className="font-label text-[13px] mb-6" style={{ color: '#9C7C43' }}>
              Médica Perita Judicial · CRM/MG 109.153
            </p>

            <div className="space-y-4 text-[15px] leading-relaxed mb-8" style={{ color: '#6B6358' }}>
              <p>
                Dra. Kelly Jaqueline Neisse é <strong style={{ color: '#27221B', fontWeight: 600 }}>médica perita judicial</strong>,{" "}
                <strong style={{ color: '#27221B', fontWeight: 600 }}>CRM/MG 109.153</strong>. Formação em Perícia Médica e em
                Medicina do Trabalho. Perita cadastrada em <strong style={{ color: '#27221B', fontWeight: 600 }}>TRT-3, TJGO, TJSP, TJMT e TJMG</strong>.
              </p>
              <p>
                Conhece os peritos das principais comarcas e <strong style={{ color: '#27221B', fontWeight: 600 }}>como cada um avalia nexo e concausa</strong>.
              </p>
            </div>

            {/* Credential chips */}
            <div className="flex flex-wrap gap-2">
              {credentials.map((text) => (
                <span
                  key={text}
                  className="font-label text-[11.5px] tracking-[0.03em] px-3.5 py-2"
                  style={{
                    color: '#27221B',
                    border: '1px solid rgba(39,34,27,0.15)',
                    borderRadius: 3,
                    background: 'rgba(251,248,241,0.8)',
                  }}
                >
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
