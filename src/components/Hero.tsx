import heroImage from "@/assets/hero-dra-kelly.webp";

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
      <img
        src={heroImage}
        alt="Dra. Kelly Jaqueline Neisse, Médica Perita Judicial"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="w-full h-full object-cover hero-bg-photo"
      />
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
        <p className="font-label text-xs tracking-[0.25em] uppercase mb-5 gold-shine-subtle">
          Assistente técnica em perícia médica trabalhista
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6">
          <span className="gold-shine">Laudo pericial desfavorável</span>{" "}
          <span style={{ color: '#F5F0E8' }}>não é sentença.</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: '#A09A8D' }}>
          Pareceres, quesitos e impugnação de laudo para escritórios e departamentos jurídicos — em todo o Brasil.
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
          Falar com a Dra. Kelly no WhatsApp
        </a>

        <p className="text-sm mt-5" style={{ color: '#8A857A' }}>
          Resposta em até 24h úteis · CRM/MG 109153
        </p>
      </div>
    </div>

    {/* Credential strip */}
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto">
        <div className="animate-fade-up-delay-2 py-6" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}>
          <p className="font-label text-[13px] text-center md:text-left" style={{ color: '#8A857A' }}>
            TRT-3 · TJMG · TJSP · TJMT · TJGO · Doença ocupacional · Insalubridade · Nexo causal · Impugnação de laudo
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
