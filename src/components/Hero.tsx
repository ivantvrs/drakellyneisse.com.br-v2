import heroImage from "@/assets/hero-dra-kelly.webp";
import heroImageMobile from "@/assets/hero-dra-kelly-m.webp";
import heroImageMd from "@/assets/hero-dra-kelly-md.webp";
import heroImageAvif from "@/assets/hero-dra-kelly.avif";
import heroImageMobileAvif from "@/assets/hero-dra-kelly-m.avif";
import heroImageMdAvif from "@/assets/hero-dra-kelly-md.avif";
// Arte dirigida: imagem própria do mobile (< 768px) — retrato fechado da Dra. Kelly.
import heroMob from "@/assets/hero-mob.webp";
import heroMob2x from "@/assets/hero-mob-2x.webp";
import heroMobAvif from "@/assets/hero-mob.avif";
import heroMob2xAvif from "@/assets/hero-mob-2x.avif";

const EmblemIcon = () => (
  <svg width="18" height="18" viewBox="0 0 360 360" fill="#D4A853" aria-hidden="true" className="flex-shrink-0" style={{ WebkitTextFillColor: 'initial' }}>
    <path fillRule="evenodd" d="M171 5C142 20 90 39 52 49c-22 6-20-1-20 52 0 94 11 130 60 186 24 26 80 70 90 70 7 0 57-37 77-58 51-50 63-87 63-190l1-55-21-6q-51-13-105-38c-21-9-20-9-26-5m-10 15A687 687 0 0 1 43 62c-2 2 0 96 1 107q19 102 128 172l9 5 5-2c63-35 111-94 122-150 4-20 4-26 5-79 0-61 2-54-11-56-29-7-79-25-116-43-8-4-8-4-25 4m13 42q-7 6-6 15c3 10 15 13 22 7 13-11-2-31-16-22m-38 17c-12 4-24 10-25 11-1 3 11 4 20 1l6-2c0 1-9 7-11 7l-1 2c1 1 9 1 14-1q9-3 1 3-7 8 6 3 6-2 2 2-4 6 6 2 4-2 2 1-3 4 3 3h4l2 1h2l-3 1c-3 0-12 10-11 12q4 1 10-5l4-4-2 4q-3 5 0 4c8 0 12-17 4-21q-8-3-9-13-4-18-24-11m71 1-4 10q-2 10-9 13c-8 4-4 21 4 21q3 1 0-4l-2-4 3 3c3 4 10 8 10 5s-8-11-10-11l-4-1h2l3-1h4q6 1 3-3-2-3 2-1 11 5 5-3-5-4 4 0 14 3 5-4-11-7 0-3c11 5 18 1 9-4q-12-6 1-2l10 2c7 0 12-4 6-5l-14-6q-21-9-28-2m-62 3c6 1 7 3 11 10l5 9q3 2 0-2l-5-9q-4-10-12-10h-3zm68-1q-3 1-6 10l-6 10h1q3-3 5-9 5-10 10-10l3-1zm-41 7c0 4 13 5 18 2q3-4-4-2zm-73 3-30 4q-3-2 0 4c9 9 29 9 48 0 4-2 7-6 4-4q-6-1-11-4l-3-2zm154 0-7 4q-11 2 15 9 21 5 32-4c4-4 4-5-9-6l-26-4q-3-1-5 1m-78 35 2 34c0 2 8 4 9 3l2-69h-13zm-58-24c-5 2-20 7-24 7q-4 0 3 5c8 5 25 1 37-8 6-4-9-8-16-4m117-1-4 1c-5 8 28 17 37 12q10-5-3-6l-15-5-10-3zm-101 8-11 7q-12 5-2 6 11 3 23-8l5-4-3-2q-4-4-12 1m86-1-2 1c-6 0 11 13 19 13q19 1 6-6l-12-6q-9-6-11-2m-74 8q-13 13 3 6c7-3 13-10 9-10l-4-1q-1-1-8 5m66-5-4 1-3 1 3 3c5 6 18 11 18 7zm-65 22q-12 4-11 16c0 14 9 20 41 26 29 6 37 19 16 26q-7 2 3 5l7 3 3-2c18-11 13-31-9-38l-18-4q-23-5-29-10c-8-7-4-16 5-11 3 1 12 2 12 0l2-1q4-2-2-7c-7-5-11-6-20-3m55 0c-7 3-10 9-5 10l1 1c-1 2 9 1 12-1 9-4 13 5 6 12-3 2-13 7-16 7-9 0-2 6 9 8 8 1 21-12 21-20 0-13-16-23-28-17m-43 3q2 3 3 1l-2-2zm-6 42q-19 22 25 36 30 9 14 21-7 3 0 6l5 2 4-3c15-12 9-27-14-34q-42-12-19-25 9-3-1-5l-9-2q-2 0-5 4m25 11c1 12 1 12 5 13h3v-10c1-11 1-12-4-13h-4zm-18 27q-15 18 20 32 18 6 9 16-4 8 4 5c14-8 9-22-10-29q-24-11-11-20 7-3-3-5c-7-2-6-2-9 1m19 10q0 12 5 11c2-1 3-16 0-18q-6-5-5 7m-12 23q-5 8-1 15c2 3 6 5 20 13q8 5 5 13-3 10 4-1 4-10-11-20-16-8-9-16l2-3-4-1-3-2zm13 8q0 9 4 9c2 0 1-13-1-14q-4-3-3 5m-7 19q-6 8-2 15 4 6 3 1-2-8 2-13 4-3 1-4-2-2-4 1m8 17q0 22 2 15c2-3 1-30 0-30-2-1-2 1-2 15"/>
  </svg>
);

const MessageCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  </svg>
);

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/da16a3e0-467d-43f7-8bb6-3a76bb87ded3";

const Hero = () => {
  return (
  <section id="inicio" className="relative overflow-hidden flex items-start md:items-center md:min-h-screen">
    {/* Background photo */}
    <div className="absolute inset-0 z-0">
      <picture className="contents">
        {/* MOBILE (< 768px): retrato fechado da Dra. Kelly (arte dirigida).
            Vem ANTES e com media query, então tem prioridade em qualquer celular,
            independente do DPR. 828w p/ telas ~2x, 1280w p/ telas ~3x. */}
        <source
          media="(max-width: 767.98px)"
          type="image/avif"
          srcSet={`${heroMobAvif} 828w, ${heroMob2xAvif} 1280w`}
          sizes="100vw"
        />
        <source
          media="(max-width: 767.98px)"
          type="image/webp"
          srcSet={`${heroMob} 828w, ${heroMob2x} 1280w`}
          sizes="100vw"
        />
        {/* TABLET/DESKTOP (>= 768px): composição larga original (inalterada). */}
        <source
          type="image/avif"
          srcSet={`${heroImageMobileAvif} 828w, ${heroImageMdAvif} 1280w, ${heroImageAvif} 1920w`}
          sizes="100vw"
        />
        <source
          type="image/webp"
          srcSet={`${heroImageMobile} 828w, ${heroImageMd} 1280w, ${heroImage} 1920w`}
          sizes="100vw"
        />
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
      {/* Gradient overlay — dark on left (text), revealing on right (photo) */}
      <div className="absolute inset-0 hero-overlay" style={{
        background: 'linear-gradient(to right, rgba(15,15,15,0.6) 0%, rgba(15,15,15,0.3) 30%, rgba(15,15,15,0.05) 60%, transparent 100%)',
      }} />
      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{
        background: 'linear-gradient(to top, #0F0F0F 0%, transparent 100%)',
      }} />
    </div>

    {/* Content */}
    <div className="container mx-auto relative z-10 pt-24 pb-24 md:pt-32">
      <div className="max-w-xl animate-fade-up">
        <p className="font-label text-xs tracking-[0.25em] uppercase mb-5 gold-shine-subtle inline-flex items-center gap-2">
          <EmblemIcon />
          <span>Assistência técnica médica ·<br className="md:hidden" /> Perícia trabalhista</span>
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6">
          <span style={{ color: '#F5F0E8' }}>Não enfrente a perícia sem </span>
          <span className="gold-shine">um médico do seu lado</span>
          <span style={{ color: '#F5F0E8' }}>.</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-5 max-w-lg" style={{ color: '#C9C3B6' }}>
          Dos quesitos à impugnação do laudo. A prova médica é o que sustenta a sua tese.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#A09A8D' }}>
          Impugnação de laudo, quesitos e parecer médico-pericial para advogados trabalhistas.
          Doença ocupacional · LER/DORT · nexo causal · insalubridade · acidente de trabalho.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-white font-label text-sm font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:-translate-y-[3px] active:translate-y-[-1px]"
          style={{
            background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
            boxShadow: "0 4px 14px rgba(37, 211, 102, 0.35)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.5)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 4px 14px rgba(37, 211, 102, 0.35)"; }}
          aria-label="Falar com a Dra. Kelly no WhatsApp — Hero"
        >
          <MessageCircleIcon />
          Analisar caso no WhatsApp →
        </a>

        <p className="text-sm mt-5" style={{ color: '#8A857A' }}>
          Resposta em até 24h úteis
        </p>
      </div>
    </div>

    {/* Credential strip */}
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto">
        <div className="animate-fade-up-delay-2 py-6" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}>
          <p className="font-label text-[13px] text-center md:text-left" style={{ color: '#8A857A' }}>
            <span className="gold-shine">Laudo</span> frágil ou desfavorável se enfrenta com contraprova médica fundamentada — não só com argumento jurídico.
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
