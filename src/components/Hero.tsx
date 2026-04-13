import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import heroImage from "@/assets/hero-dra-kelly.webp";

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Olá%20Dra.%20Kelly%2C%20gostaria%20de%20enviar%20meu%20caso%20para%20análise.";

function useGeoLocation() {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    fetch("/api/geo", { signal: controller.signal })
      .then(r => r.json())
      .then(({ city, region, country }) => {
        clearTimeout(timeout);
        if (country === "BR" && city && region) {
          setLocation(city.toUpperCase() + "/" + region);
        }
      })
      .catch(() => {
        clearTimeout(timeout);
      });

    return () => { clearTimeout(timeout); controller.abort(); };
  }, []);

  return location;
}

const Hero = () => {
  const userLocation = useGeoLocation();

  return (
  <section id="inicio" className="relative overflow-hidden" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
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
    <div className="container mx-auto relative z-10" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
      <div className="max-w-xl animate-fade-up">
        <p className="font-label text-xs tracking-[0.25em] uppercase mb-5 gold-shine-subtle">
          ASSISTÊNCIA TÉCNICA MÉDICA · {userLocation ?? "ATENDIMENTO EM TODO O BRASIL"}
        </p>

        <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-6">
          <span className="gold-shine">A prova médica define muitos processos.</span>{" "}
          <span style={{ color: '#F5F0E8' }}>Quem vai ler o laudo pelo seu cliente?</span>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: '#A09A8D' }}>
          Assistência técnica médica judicial para advogados, escritórios e empresas em demandas trabalhistas e cíveis.
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
          <MessageCircle size={18} />
          Falar com a Dra. Kelly no WhatsApp
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
          <p className="font-label text-[13px] leading-relaxed text-center md:text-left" style={{ color: '#A09A8D' }}>
            <span className="gold-shine-subtle">Médica Perita Judicial</span> · CRM/MG 109153 · Perícia Médica · Atuação trabalhista, cível e previdenciária
          </p>
          <p className="font-label text-[13px] mt-1 text-center md:text-left" style={{ color: '#8A857A' }}>
            TRT-3 · TJMG · TJMT · TJSP · Nexo causal · Incapacidade laborativa · Impugnação de laudo
          </p>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Hero;
