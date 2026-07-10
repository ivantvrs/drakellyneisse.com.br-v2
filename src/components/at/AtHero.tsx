import { ShieldCheck, Zap } from "lucide-react";
import heroRecorte from "@/assets/kelly-hero-recorte.webp";
import heroRecorteAvif from "@/assets/kelly-hero-recorte.avif";
import heroMobNew from "@/assets/kelly-hero-mobile.webp";
import heroMobNewAvif from "@/assets/kelly-hero-mobile.avif";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useAtWhatsappUrl } from "./cta-at";
import { SP_HERO_ATENDIMENTO } from "./geo-sp";

// 1x1 transparente: o <img> do <picture> só o usa quando NENHUM <source media> casa.
// Assim o hero mobile NÃO baixa no desktop e o recorte desktop NÃO baixa no mobile
// (antes os dois baixavam — display:none não impede o fetch — competindo banda e atrasando o LCP).
const HERO_FALLBACK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const EmblemIcon = () => (
  <svg width="23" height="23" viewBox="0 0 360 360" fill="#D4A853" aria-hidden="true" className="flex-shrink-0" style={{ WebkitTextFillColor: 'initial' }}>
    <path fillRule="evenodd" d="M171 5C142 20 90 39 52 49c-22 6-20-1-20 52 0 94 11 130 60 186 24 26 80 70 90 70 7 0 57-37 77-58 51-50 63-87 63-190l1-55-21-6q-51-13-105-38c-21-9-20-9-26-5m-10 15A687 687 0 0 1 43 62c-2 2 0 96 1 107q19 102 128 172l9 5 5-2c63-35 111-94 122-150 4-20 4-26 5-79 0-61 2-54-11-56-29-7-79-25-116-43-8-4-8-4-25 4m13 42q-7 6-6 15c3 10 15 13 22 7 13-11-2-31-16-22m-38 17c-12 4-24 10-25 11-1 3 11 4 20 1l6-2c0 1-9 7-11 7l-1 2c1 1 9 1 14-1q9-3 1 3-7 8 6 3 6-2 2 2-4 6 6 2 4-2 2 1-3 4 3 3h4l2 1h2l-3 1c-3 0-12 10-11 12q4 1 10-5l4-4-2 4q-3 5 0 4c8 0 12-17 4-21q-8-3-9-13-4-18-24-11m71 1-4 10q-2 10-9 13c-8 4-4 21 4 21q3 1 0-4l-2-4 3 3c3 4 10 8 10 5s-8-11-10-11l-4-1h2l3-1h4q6 1 3-3-2-3 2-1 11 5 5-3-5-4 4 0 14 3 5-4-11-7 0-3c11 5 18 1 9-4q-12-6 1-2l10 2c7 0 12-4 6-5l-14-6q-21-9-28-2m-62 3c6 1 7 3 11 10l5 9q3 2 0-2l-5-9q-4-10-12-10h-3zm68-1q-3 1-6 10l-6 10h1q3-3 5-9 5-10 10-10l3-1zm-41 7c0 4 13 5 18 2q3-4-4-2zm-73 3-30 4q-3-2 0 4c9 9 29 9 48 0 4-2 7-6 4-4q-6-1-11-4l-3-2zm154 0-7 4q-11 2 15 9 21 5 32-4c4-4 4-5-9-6l-26-4q-3-1-5 1m-78 35 2 34c0 2 8 4 9 3l2-69h-13zm-58-24c-5 2-20 7-24 7q-4 0 3 5c8 5 25 1 37-8 6-4-9-8-16-4m117-1-4 1c-5 8 28 17 37 12q10-5-3-6l-15-5-10-3zm-101 8-11 7q-12 5-2 6 11 3 23-8l5-4-3-2q-4-4-12 1m86-1-2 1c-6 0 11 13 19 13q19 1 6-6l-12-6q-9-6-11-2m-74 8q-13 13 3 6c7-3 13-10 9-10l-4-1q-1-1-8 5m66-5-4 1-3 1 3 3c5 6 18 11 18 7zm-65 22q-12 4-11 16c0 14 9 20 41 26 29 6 37 19 16 26q-7 2 3 5l7 3 3-2c18-11 13-31-9-38l-18-4q-23-5-29-10c-8-7-4-16 5-11 3 1 12 2 12 0l2-1q4-2-2-7c-7-5-11-6-20-3m55 0c-7 3-10 9-5 10l1 1c-1 2 9 1 12-1 9-4 13 5 6 12-3 2-13 7-16 7-9 0-2 6 9 8 8 1 21-12 21-20 0-13-16-23-28-17m-43 3q2 3 3 1l-2-2zm-6 42q-19 22 25 36 30 9 14 21-7 3 0 6l5 2 4-3c15-12 9-27-14-34q-42-12-19-25 9-3-1-5l-9-2q-2 0-5 4m25 11c1 12 1 12 5 13h3v-10c1-11 1-12-4-13h-4zm-18 27q-15 18 20 32 18 6 9 16-4 8 4 5c14-8 9-22-10-29q-24-11-11-20 7-3-3-5c-7-2-6-2-9 1m19 10q0 12 5 11c2-1 3-16 0-18q-6-5-5 7m-12 23q-5 8-1 15c2 3 6 5 20 13q8 5 5 13-3 10 4-1 4-10-11-20-16-8-9-16l2-3-4-1-3-2zm13 8q0 9 4 9c2 0 1-13-1-14q-4-3-3 5m-7 19q-6 8-2 15 4 6 3 1-2-8 2-13 4-3 1-4-2-2-4 1m8 17q0 22 2 15c2-3 1-30 0-30-2-1-2 1-2 15" />
  </svg>
);

// `geo="sp"` (porta /assistente-tecnico-medico/sp): insere "em São Paulo" na manchete (mobile e
// desktop) e a linha de atendimento estadual nos subtítulos. Sem geo, a home "/" fica idêntica.
const Hero = ({ geo }: { geo?: "sp" }) => (
  <section id="inicio" className="relative overflow-hidden flex flex-col md:flex-row md:items-center md:min-h-screen" style={{ backgroundColor: '#0F0F0F' }}>
    {/* ░░ Fundo DESKTOP (≥768px) — halo + recorte da Dra. ░░ */}
    <div className="hidden md:block absolute inset-0 z-0">
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-4%', top: '-2%', width: '46%', height: '86%', zIndex: 0,
          background: 'radial-gradient(closest-side, rgba(212,168,83,0.30), rgba(212,168,83,0.09) 54%, transparent 80%)',
        }}
      />
      <picture>
        <source media="(min-width: 768px)" srcSet={heroRecorteAvif} type="image/avif" />
        <source media="(min-width: 768px)" srcSet={heroRecorte} type="image/webp" />
        <img
          src={HERO_FALLBACK}
          alt="Dra. Kelly Jaqueline Neisse, Médica Perita Judicial"
          width={1024}
          height={1536}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute bottom-0 right-0 h-full w-auto max-w-[52%] object-contain object-bottom"
          style={{ zIndex: 1, filter: 'drop-shadow(0 34px 50px rgba(0,0,0,0.55))' }}
        />
      </picture>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0F0F0F 0%, transparent 100%)' }} />
    </div>

    {/* ░░ MOBILE — Área da imagem (assinatura + label + headline + CTA) ░░ */}
    <div className="md:hidden relative w-full flex flex-col min-h-[78svh] px-7 pt-24 pb-9 overflow-hidden">
      <picture>
        <source media="(max-width: 767.98px)" srcSet={heroMobNewAvif} type="image/avif" />
        <source media="(max-width: 767.98px)" srcSet={heroMobNew} type="image/webp" />
        <img
          src={HERO_FALLBACK}
          alt="Dra. Kelly Jaqueline Neisse, Médica Perita Judicial"
          width={1200}
          height={1797}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 20%' }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.56) 0%, rgba(15,15,15,0.18) 22%, rgba(15,15,15,0.10) 38%, rgba(15,15,15,0.62) 56%, rgba(15,15,15,0.95) 80%, #141311 100%)' }}
      />

      {/* assinatura de marca no topo — 1º impacto: KN + Dra. Kelly Neisse (sobre vidro escuro p/ leitura) */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-7 pt-5 pb-7"
        style={{ background: 'linear-gradient(to bottom, rgba(15,15,15,0.82) 0%, rgba(15,15,15,0.44) 52%, transparent 100%)' }}
      >
        <span className="font-display font-semibold leading-none flex-shrink-0" style={{ fontSize: 24 }}>
          <span style={{ color: '#F4EDDE' }}>K</span>
          <span style={{ color: '#C79A5C' }}>N</span>
        </span>
        <span aria-hidden="true" style={{ width: 1, height: 28, background: 'rgba(212,168,83,0.42)' }} />
        <div className="flex flex-col">
          <span className="font-display font-semibold leading-tight" style={{ fontSize: 15.5, color: '#F4EDDE' }}>
            Dra. Kelly Neisse
          </span>
          <span className="font-label uppercase" style={{ fontSize: 9.5, letterSpacing: '0.18em', color: '#B7A98E', marginTop: 2 }}>
            Médica Perita Judicial
          </span>
        </div>
      </div>

      {/* respiro: empurra o bloco de conteúdo p/ baixo, preservando o rosto da Dra. */}
      <div className="flex-1 min-h-[20vh]" aria-hidden="true" />

      <div className="relative z-10 animate-fade-up">
        {/* eyebrow sobre vidro escuro — champagne legível, fora do rosto */}
        <p
          className="font-label inline-flex items-center gap-2 mb-5"
          style={{
            fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#E8CB8E', fontWeight: 600,
            background: 'rgba(15,15,15,0.42)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
            border: '1px solid rgba(212,168,83,0.24)', borderRadius: 999, padding: '7px 14px',
            textShadow: '0 1px 6px rgba(0,0,0,0.55)',
          }}
        >
          <EmblemIcon />
          <span>Assistência técnica médica · Perícia Médica</span>
        </p>

        <h1 className="font-display text-[2rem] font-bold leading-[1.1] mb-6" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}>
          <span style={{ color: '#F5F0E8' }}>Não enfrente a perícia{geo === "sp" ? " em São Paulo" : ""} sem um </span>
          <span className="gold-shine">assistente técnico médico</span>
          <span style={{ color: '#F5F0E8' }}> do seu lado.</span>
        </h1>

        <a
          href={useAtWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="cta_hero_wpp"
          className="btn-wa flex items-center justify-center gap-2 text-white font-label text-sm font-semibold py-4 rounded-md w-full"
          style={{ boxShadow: '0 8px 20px -10px rgba(34,195,92,0.38)' }}
          aria-label="Analisar meu caso no WhatsApp — Hero"
        >
          <WhatsAppIcon size={18} />
          Analisar meu caso no WhatsApp →
        </a>

        {/* microprova abaixo do CTA — mesma regra de tamanho do desktop, com ícones discretos */}
        <p className="font-label text-sm mt-6 flex items-center gap-2" style={{ color: '#A09A8D' }}>
          <Zap size={15} strokeWidth={1.8} style={{ color: '#C79A5C', flexShrink: 0 }} aria-hidden="true" />
          Resposta rápida
        </p>
        <p className="font-label text-[11px] mt-1 flex items-center gap-2" style={{ color: '#6F6A60' }}>
          <ShieldCheck size={13} strokeWidth={1.8} style={{ color: '#C79A5C', flexShrink: 0 }} aria-hidden="true" />
          Seus dados estão protegidos
        </p>
      </div>
    </div>

    {/* ░░ MOBILE — Painel editorial inferior (keyword line + microcopy) ░░ */}
    <div
      className="md:hidden relative px-7 pt-8 pb-12"
      style={{ background: 'linear-gradient(180deg, #141311 0%, #100f0d 100%)', borderTop: '1px solid rgba(212,168,83,0.18)' }}
    >
      <p className="text-[15.5px] leading-relaxed" style={{ color: '#A09A8D' }}>
        Atuação em perícias trabalhistas e cíveis: nexo causal, concausa, doença ocupacional e erro médico.
        {geo === "sp" ? ` ${SP_HERO_ATENDIMENTO}` : ""}
      </p>
      <div className="mt-6 pt-5 relative">
        <span aria-hidden="true" className="absolute left-0 top-0" style={{ width: 48, height: 1, background: 'linear-gradient(90deg, rgba(212,168,83,0.7), transparent)' }} />
        <p className="font-label text-[13px] leading-relaxed inline-flex items-center gap-2" style={{ color: '#B7A98E' }}>
          <ShieldCheck size={14} strokeWidth={1.8} style={{ color: '#C79A5C', flexShrink: 0 }} aria-hidden="true" />
          Assistência técnica médica especializada
        </p>
        <p className="font-label text-[11.5px] leading-relaxed mt-1.5" style={{ color: '#7C766B' }}>
          Análise estratégica para empresas e escritórios
        </p>
      </div>
    </div>

    {/* ░░ Content DESKTOP (≥768px) ░░ */}
    <div className="hidden md:block container mx-auto relative z-10 pt-24 pb-24 md:pt-32">
      <div className="max-w-xl animate-fade-up">
        <p className="font-label text-xs tracking-[0.25em] uppercase mb-5 gold-shine-subtle inline-flex items-center gap-2">
          <EmblemIcon />
          <span>Assistência técnica médica · Perícia Médica</span>
        </p>

        {/* Variante desktop da mesma manchete. NÃO é <h1> (o H1 único da página é o do bloco
            mobile, mais rico em keyword) — aqui é heading ARIA p/ manter a semântica no viewport
            ≥768px sem duplicar a tag <h1> no HTML servido (o mobile fica display:none no desktop). */}
        <p role="heading" aria-level={1} className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] mb-7">
          <span style={{ color: '#F5F0E8' }}>Não enfrente a perícia{geo === "sp" ? " em São Paulo" : ""} sem um </span>
          <span className="gold-shine">assistente técnico médico</span>
          <span style={{ color: '#F5F0E8' }}> do seu lado.</span>
        </p>

        <p className="text-base md:text-lg leading-relaxed mb-10 max-w-lg" style={{ color: '#A09A8D' }}>
          Análise do caso, quesitos, acompanhamento da perícia e impugnação do laudo. Casos trabalhistas e cíveis: nexo, concausa, doença ocupacional, acidente de trabalho, erro médico e dano corporal.
          {geo === "sp" ? ` ${SP_HERO_ATENDIMENTO}` : ""}
        </p>

        <a
          href={useAtWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="cta_hero_wpp"
          className="btn-wa inline-flex items-center justify-center gap-2 text-white font-label text-sm font-semibold px-8 py-4 rounded-md"
          aria-label="Analisar caso no WhatsApp — Hero"
        >
          <WhatsAppIcon size={18} />
          Analisar caso no WhatsApp →
        </a>

        <p className="font-label text-sm mt-6 flex items-center gap-2" style={{ color: '#A09A8D' }}>
          <Zap size={15} strokeWidth={1.8} style={{ color: '#C79A5C', flexShrink: 0 }} aria-hidden="true" />
          Resposta rápida
        </p>
        <p className="font-label text-[11px] mt-1 flex items-center gap-2" style={{ color: '#6F6A60' }}>
          <ShieldCheck size={13} strokeWidth={1.8} style={{ color: '#C79A5C', flexShrink: 0 }} aria-hidden="true" />
          Seus dados estão protegidos
        </p>
      </div>
    </div>

    {/* Credential strip (desktop) — fecho: direito previsto em lei (CPC, art. 465) */}
    <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto">
        <div className="animate-fade-up-delay-2 py-6" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}>
          <p className="font-label text-[13px] text-center md:text-left" style={{ color: '#8A857A' }}>
            Assistência técnica é um <span className="gold-shine">direito previsto em lei</span> (CPC, art. 465). A escolha e a contratação são da parte, não do juiz.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
