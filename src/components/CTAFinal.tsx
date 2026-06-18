import { useInView } from "@/hooks/useInView";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/1048d0d3-67de-4823-be97-b5ad93a44820";

/* 0° no topo, sentido horário */
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [180 + r * Math.cos(a), 180 + r * Math.sin(a)];
};

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);
const CRITICAL = [46, 128, 232];

/* Relógio / radar de prazo processual (SVG + CSS, sem imagem, sem card) */
const ProcessClock = () => {
  const C = 2 * Math.PI * 120; // circunferência do anel
  const progress = C * 0.72;
  const [pInX, pInY] = polar(54, 46);
  const [pOutX, pOutY] = polar(118, 46);

  return (
    <div className="relative w-full max-w-[220px] sm:max-w-[360px] mx-auto aspect-square">
      {/* glow dourado discreto atrás do círculo */}
      <div
        aria-hidden="true"
        className="absolute inset-[14%] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,135,58,0.22) 0, rgba(184,135,58,0.06) 50%, transparent 72%)" }}
      />

      <svg viewBox="0 0 360 360" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8873A" />
            <stop offset="55%" stopColor="#D6BE83" />
            <stop offset="100%" stopColor="#B8873A" />
          </linearGradient>
          <radialGradient id="clockGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8873A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B8873A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* selo/carimbo translúcido abstrato ao fundo */}
        <circle cx="180" cy="180" r="158" stroke="rgba(214,190,131,0.10)" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="180" cy="180" r="149" stroke="rgba(214,190,131,0.07)" strokeWidth="1" />

        {/* escala temporal — marcações ao redor */}
        {TICKS.map((deg) => {
          const major = deg % 90 === 0;
          const [x1, y1] = polar(major ? 134 : 138, deg);
          const [x2, y2] = polar(146, deg);
          return (
            <line
              key={deg}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={major ? "rgba(214,190,131,0.5)" : "rgba(214,190,131,0.2)"}
              strokeWidth={major ? 1.6 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* anel base (incompleto: faint) */}
        <circle cx="180" cy="180" r="120" stroke="rgba(214,190,131,0.16)" strokeWidth="2.5" />
        {/* arco de contagem (preenchido ~72%) */}
        <circle
          cx="180" cy="180" r="120"
          stroke="url(#ringGold)" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={`${progress} ${C}`}
          transform="rotate(-90 180 180)"
        />

        {/* pulso clínico sutil — pequena bússola na base, distinto do ECG anterior */}
        <polyline
          points="150,236 160,236 166,228 172,248 178,236 210,236"
          stroke="rgba(214,190,131,0.34)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
        />

        {/* pontos críticos dourados no anel */}
        {CRITICAL.map((deg) => {
          const [cx, cy] = polar(120, deg);
          return (
            <g key={deg}>
              <circle cx={cx} cy={cy} r="9" fill="url(#clockGlow)" />
              <circle cx={cx} cy={cy} r="3.4" fill="#B8873A" />
              <circle cx={cx} cy={cy} r="6" fill="none" stroke="rgba(184,135,58,0.4)" strokeWidth="1" />
            </g>
          );
        })}

        {/* ponteiro de urgência (marcador radial, não cruza o centro) */}
        <line x1={pInX} y1={pInY} x2={pOutX} y2={pOutY} stroke="#D6BE83" strokeWidth="2" strokeLinecap="round" />
        <circle cx={pOutX} cy={pOutY} r="3" fill="#D6BE83" />

        {/* hub central */}
        <circle cx="180" cy="180" r="2.5" fill="#D6BE83" />
      </svg>

      {/* composição central minimalista */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span
          aria-hidden="true"
          className="mb-2.5"
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#D6BE83", boxShadow: "0 0 10px 2px rgba(214,190,131,0.6)" }}
        />
        <span className="font-display leading-none" style={{ fontSize: "1.7rem", color: "#D6BE83" }}>24h</span>
        <span className="font-label text-[8px] tracking-[0.24em] uppercase mt-2" style={{ color: "#A9A093" }}>
          Análise inicial
        </span>
      </div>

      {/* micro labels ao redor (ocultas no mobile) */}
      <div className="hidden sm:block" aria-hidden="true">
        <span className="absolute left-1/2 -translate-x-1/2 top-1 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Laudo</span>
        <span className="absolute top-1/2 -translate-y-1/2 right-0 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Quesitos</span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-1 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Impugnação</span>
        <span className="absolute top-1/2 -translate-y-1/2 left-0 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Parecer</span>
      </div>
    </div>
  );
};

const CTAFinal = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "80px 0",
        background:
          "radial-gradient(40% 38% at 18% 26%, rgba(214,190,131,0.10) 0, transparent 56%)," +
          "radial-gradient(46% 50% at 86% 36%, rgba(184,135,58,0.12) 0, transparent 60%)," +
          "radial-gradient(120% 90% at 100% 0%, rgba(42,33,24,0.55) 0, transparent 52%)," +
          "linear-gradient(160deg, #171512 0%, #141311 52%, #100f0d 100%)",
        color: "#EFE8DC",
      }}
    >
      {/* textura dot-grid sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(214,190,131,.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.07,
          zIndex: 0,
        }}
      />
      {/* vignette sutil nas bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ boxShadow: "inset 0 0 140px 30px rgba(0,0,0,0.5)", zIndex: 0 }}
      />

      <div ref={ref} className={`container mx-auto max-w-6xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-12 gap-y-9 lg:gap-x-14">
          {/* ── A: headline + texto (esquerda, topo) ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 text-center lg:text-left">
            <h2
              className="font-display font-bold mb-6 leading-[1.08]"
              style={{ fontSize: "clamp(29px, 3.4vw, 46px)", letterSpacing: "-0.022em", color: "#F4EDDE" }}
            >
              Seu caso tem prazo rodando para impugnar laudo, formular quesitos ou produzir parecer médico?
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0" style={{ color: "#A9A093" }}>
              Análise médica da documentação do processo, impugnação fundamentada do laudo do juízo, quesitos antes da perícia ou parecer técnico para recurso: o que o seu caso precisa, entregue no formato e prazo que o processo exige.
            </p>
          </div>

          {/* ── B: relógio processual (direita, ocupa as duas linhas) ── */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:self-center">
            <ProcessClock />
          </div>

          {/* ── C: alerta + CTA + nota (esquerda, base) ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2 text-center lg:text-left">
            {/* alerta estratégico */}
            <div className="relative max-w-xl mx-auto lg:mx-0 mb-9 pl-4 py-1 text-left">
              <span aria-hidden="true" className="absolute left-0 top-0 bottom-0" style={{ width: 2, background: "linear-gradient(180deg, #B8873A, rgba(184,135,58,0.15))" }} />
              <p className="text-[15px] leading-relaxed font-semibold" style={{ color: "#D6BE83" }}>
                Prazos processuais não esperam. Quanto antes a assistência técnica entra no caso, maior o controle sobre a produção da prova médica, e menor o risco de surpresa pericial.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp — CTA final"
                className="btn-wa inline-flex items-center justify-center gap-2 text-white font-label text-[15px] font-semibold rounded-md transition-all duration-300 hover:-translate-y-0.5 w-full max-w-[320px] lg:w-auto"
                style={{ padding: "17px 34px", boxShadow: "0 14px 30px -12px rgba(34,195,92,0.45)" }}
              >
                <WhatsAppIcon size={19} />
                Analisar caso no WhatsApp →
              </a>
              <p className="text-[12.5px] mt-4 max-w-[340px] text-center lg:text-left" style={{ color: "#8d8474" }}>
                Envie um resumo do caso e a documentação disponível. Análise inicial e orçamento em até 24h úteis. Sem custo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAFinal;
