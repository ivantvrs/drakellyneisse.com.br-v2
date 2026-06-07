import heroImage from "@/assets/hero-dra-kelly.webp";
import heroImageMobile from "@/assets/hero-dra-kelly-m.webp";
import heroImageMd from "@/assets/hero-dra-kelly-md.webp";
import heroImageAvif from "@/assets/hero-dra-kelly.avif";
import heroImageMobileAvif from "@/assets/hero-dra-kelly-m.avif";
import heroImageMdAvif from "@/assets/hero-dra-kelly-md.avif";
import heroMob from "@/assets/hero-mob.webp";
import heroMob2x from "@/assets/hero-mob-2x.webp";
import heroMobAvif from "@/assets/hero-mob.avif";
import heroMob2xAvif from "@/assets/hero-mob-2x.avif";
import EmpresaCTAs from "./EmpresaCTAs";

const EmblemIcon = () => (
  <svg width="18" height="18" viewBox="0 0 360 360" fill="#D4A853" aria-hidden="true" className="flex-shrink-0" style={{ WebkitTextFillColor: 'initial' }}>
    <path fillRule="evenodd" d="M171 5C142 20 90 39 52 49c-22 6-20-1-20 52 0 94 11 130 60 186 24 26 80 70 90 70 7 0 57-37 77-58 51-50 63-87 63-190l1-55-21-6q-51-13-105-38c-21-9-20-9-26-5m-10 15A687 687 0 0 1 43 62c-2 2 0 96 1 107q19 102 128 172l9 5 5-2c63-35 111-94 122-150 4-20 4-26 5-79 0-61 2-54-11-56-29-7-79-25-116-43-8-4-8-4-25 4" />
  </svg>
);

const EmpresaHero = () => {
  return (
    <section id="inicio" className="relative overflow-hidden flex items-start md:items-center md:min-h-screen">
      {/* Background photo — mesmos assets/arte dirigida da LP principal (nada de visual novo) */}
      <div className="absolute inset-0 z-0">
        <picture className="contents">
          <source media="(max-width: 767.98px)" type="image/avif" srcSet={`${heroMobAvif} 828w, ${heroMob2xAvif} 1280w`} sizes="100vw" />
          <source media="(max-width: 767.98px)" type="image/webp" srcSet={`${heroMob} 828w, ${heroMob2x} 1280w`} sizes="100vw" />
          <source type="image/avif" srcSet={`${heroImageMobileAvif} 828w, ${heroImageMdAvif} 1280w, ${heroImageAvif} 1920w`} sizes="100vw" />
          <source type="image/webp" srcSet={`${heroImageMobile} 828w, ${heroImageMd} 1280w, ${heroImage} 1920w`} sizes="100vw" />
          <img
            src={heroImage}
            alt="Dra. Kelly Jaqueline Neisse, Médica Perita Judicial"
            width={1920}
            height={1400}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover hero-bg-photo"
          />
        </picture>
        <div className="absolute inset-0 hero-overlay" style={{
          background: 'linear-gradient(to right, rgba(15,15,15,0.6) 0%, rgba(15,15,15,0.3) 30%, rgba(15,15,15,0.05) 60%, transparent 100%)',
        }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{
          background: 'linear-gradient(to top, #0F0F0F 0%, transparent 100%)',
        }} />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 pt-24 pb-24 md:pt-32">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-label text-xs tracking-[0.25em] uppercase mb-5 gold-shine-subtle inline-flex items-center gap-2">
            <EmblemIcon />
            <span>Assistência técnica médica ·<br className="md:hidden" /> Perícia trabalhista</span>
          </p>

          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] mb-6">
            <span style={{ color: '#F5F0E8' }}>O juiz marcou uma perícia médica </span>
            <span className="gold-shine">contra a sua empresa?</span>
          </h1>

          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl" style={{ color: '#C9C3B6' }}>
            Nem você nem o seu advogado podem entrar na sala do exame — só um médico.
            O assistente técnico médico é o <strong style={{ color: '#F5F0E8' }}>seu olho técnico dentro da perícia</strong>.
          </p>

          <EmpresaCTAs />

          <p className="font-label text-sm mt-6" style={{ color: '#8A857A' }}>
            Dra. Kelly Jaqueline Neisse · CRM/MG 109.153 · Médica perita judicial · Atuação em todo o Brasil
          </p>
        </div>
      </div>

      {/* Credential strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto">
          <div className="animate-fade-up-delay-2 py-6" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}>
            <p className="font-label text-[13px] text-center md:text-left" style={{ color: '#8A857A' }}>
              <span className="gold-shine">Um caso sólido</span> pode virar condenação se ninguém estiver na sala para contestar tecnicamente o laudo do perito do juízo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmpresaHero;
