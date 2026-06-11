import balancaImg from "@/assets/balanca-caduceu-bronze.webp";
import balancaImgAvif from "@/assets/balanca-caduceu-bronze.avif";
import { useInView } from "@/hooks/useInView";

const PositioningStatement = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background:
          // ivory premium com profundidade — nunca chapado
          'radial-gradient(120% 78% at 50% 0%, rgba(201,163,92,0.12) 0, transparent 55%),' +
          'radial-gradient(90% 70% at 50% 100%, rgba(184,135,58,0.06) 0, transparent 62%),' +
          'linear-gradient(180deg, #F7F1E8 0%, #F3EADC 58%, #EFE4D4 100%)',
      }}
    >
      {/* textura sutil em CSS puro (papel/linho) */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background:
            'repeating-linear-gradient(135deg, rgba(184,135,58,0.018) 0px, rgba(184,135,58,0.018) 1px, transparent 1px, transparent 7px)',
        }}
      />
      {/* fios de ouro no topo e na base */}
      <span aria-hidden="true" className="absolute top-0 left-0 right-0" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,135,58,0.5), transparent)' }} />
      <span aria-hidden="true" className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,135,58,0.35), transparent)' }} />

      <div ref={ref} className={`container mx-auto max-w-5xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* eyebrow */}
        <div className="flex flex-col items-center mb-9 md:mb-11">
          <p className="font-label text-xs font-semibold tracking-[0.34em] uppercase mb-3.5" style={{ color: '#B8873A' }}>
            Posicionamento
          </p>
          <span aria-hidden="true" className="flex items-center gap-2">
            <span style={{ display: 'block', width: 30, height: 1, background: 'linear-gradient(90deg, transparent, #C9A35C)' }} />
            <span style={{ display: 'block', width: 5, height: 5, transform: 'rotate(45deg)', background: '#B8873A' }} />
            <span style={{ display: 'block', width: 30, height: 1, background: 'linear-gradient(90deg, #C9A35C, transparent)' }} />
          </span>
        </div>

        {/* balança-caduceu — fiel/eixo da composição */}
        <div className="flex justify-center relative mb-1">
          {/* anel sutil + glow radial atrás do ícone */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ width: 360, height: 360, background: 'radial-gradient(circle, rgba(201,163,92,0.22) 0, rgba(184,135,58,0.06) 46%, transparent 70%)' }}
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{ width: 196, height: 196, border: '1px solid rgba(184,135,58,0.22)' }}
          />
          <picture>
            <source srcSet={balancaImgAvif} type="image/avif" />
            <img
              src={balancaImg}
              alt="Balança-caduceu em bronze — símbolo de medicina e justiça"
              loading="lazy"
              className="relative"
              style={{ width: 168, height: 'auto', filter: 'drop-shadow(0 22px 30px rgba(120,90,40,0.26))' }}
            />
          </picture>
        </div>

        {/* os dois pratos da balança */}
        <h2 className="relative font-display mt-2 md:mt-4" style={{ color: '#1F252B' }}>
          {/* eixo vertical central (desktop) */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-2"
            style={{ width: 1, background: 'linear-gradient(180deg, rgba(184,135,58,0.6) 0, rgba(184,135,58,0.16) 72%, transparent 100%)' }}
          />
          {/* nó (diamante) no topo do eixo */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -translate-x-1/2"
            style={{ top: -3, width: 7, height: 7, transform: 'translateX(-50%) rotate(45deg)', background: '#B8873A' }}
          />

          <div className="grid md:grid-cols-2 gap-y-8 md:gap-x-16 items-start">
            {/* LADO PERITO — frio, institucional, neutro */}
            <div className="relative text-center md:text-right md:pr-2">
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ width: 280, height: 180, background: 'radial-gradient(ellipse, rgba(82,96,109,0.07) 0, transparent 70%)' }}
              />
              <span className="relative block font-label text-[11px] font-semibold tracking-[0.24em] uppercase mb-3" style={{ color: '#52606D' }}>
                O perito
              </span>
              <span className="relative block text-[1.9rem] md:text-[2.25rem] lg:text-[2.55rem] font-bold leading-[1.1]" style={{ letterSpacing: '-0.018em', color: '#52606D' }}>
                é do <em className="italic font-semibold" style={{ color: '#1F252B' }}>juízo</em>.
              </span>
            </div>

            {/* divisor — só mobile */}
            <div className="flex md:hidden items-center justify-center gap-3" aria-hidden="true">
              <span style={{ width: 46, height: 1, background: 'linear-gradient(90deg, transparent, rgba(184,135,58,0.4))' }} />
              <span style={{ width: 6, height: 6, transform: 'rotate(45deg)', background: '#B8873A' }} />
              <span style={{ width: 46, height: 1, background: 'linear-gradient(90deg, rgba(184,135,58,0.4), transparent)' }} />
            </div>

            {/* LADO ASSISTENTE — quente, estratégico, próximo */}
            <div className="relative text-center md:text-left md:pl-2">
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                style={{ width: 300, height: 190, background: 'radial-gradient(ellipse, rgba(184,135,58,0.12) 0, transparent 70%)' }}
              />
              <span className="relative block font-label text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#B8873A' }}>
                O assistente técnico médico
              </span>
              <span className="relative block text-[1.9rem] md:text-[2.25rem] lg:text-[2.55rem] font-bold leading-[1.1]" style={{ letterSpacing: '-0.018em', color: '#7A6A52' }}>
                é <em className="italic font-semibold" style={{ color: '#B8873A' }}>seu</em>.
              </span>
            </div>
          </div>
        </h2>

        {/* parágrafo explicativo — copy intacta */}
        <p className="text-base md:text-lg leading-relaxed mx-auto text-center mt-11 md:mt-14" style={{ color: '#5E6470', maxWidth: 760 }}>
          Quem responde ao juízo é o perito nomeado. Quem está do seu lado é o assistente técnico: formula os quesitos certos, lê o laudo com olhar crítico e o impugna quando a medicina não foi bem aplicada.
        </p>
      </div>
    </section>
  );
};

export default PositioningStatement;
