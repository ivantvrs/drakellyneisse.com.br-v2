import { useInView } from "@/hooks/useInView";

const PainIcon1 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <circle cx="17" cy="14" r="3"/>
    <line x1="19.5" y1="16.5" x2="21" y2="18"/>
  </svg>
);

const PainIcon2 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="14" y2="6"/>
    <line x1="4" y1="10" x2="12" y2="10"/>
    <line x1="4" y1="14" x2="10" y2="14"/>
    <line x1="4" y1="18" x2="13" y2="18"/>
    <circle cx="19" cy="13" r="3"/>
  </svg>
);

const PainIcon3 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <line x1="5" y1="6" x2="19" y2="6"/>
    <path d="M5 6L3 12h4L5 6z"/>
    <path d="M19 6l-2 6h4l-2-6z"/>
    <line x1="10" y1="21" x2="14" y2="21"/>
  </svg>
);

const PainIcon4 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="14" y2="13"/>
    <line x1="8" y1="17" x2="12" y2="17"/>
  </svg>
);

const painIcons = [PainIcon1, PainIcon2, PainIcon3, PainIcon4];

const pains = [
  {
    title: "\"Um laudo pericial mal interpretado enfraquece uma tese juridicamente sólida\"",
    text: "Sem leitura médica especializada do laudo do juízo, pontos sensíveis (nexo causal frágil, ausência de critérios diagnósticos objetivos, divergência com a prova documental) passam batido. A tese da reclamada perde sustentação onde mais importa.",
  },
  {
    title: "\"Quesitos genéricos produzem perícia genérica\"",
    text: "O prazo do saneador raramente é tempo para formular quesitos suplementares que direcionem o perito do juízo aos pontos críticos do caso. Quesitos mal calibrados fecham portas que não se reabrem na fase recursal.",
  },
  {
    title: "\"Impugnação de laudo sem fundamento médico é só discordância\"",
    text: "Para o juiz reconsiderar conclusão pericial, a impugnação precisa apontar omissões objetivas, contradições técnicas e literatura médica não considerada. Objeção jurídica isolada não move prova técnica.",
  },
  {
    title: "\"CAT, atestados convergentes e B91 chegam combinados\"",
    text: "Reclamante apresenta Comunicação de Acidente de Trabalho, sequência de atestados convergentes e benefício acidentário B91 ativo. Sem contraprova técnica organizada antes da perícia, a defesa entra em desvantagem probatória.",
  },
];

/* Glifo discreto de balança/medicina (dourado envelhecido) */
const ScalesGlyph = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B8873A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <line x1="5" y1="7" x2="19" y2="7"/>
    <path d="M5 7L2.5 13h5L5 7z"/>
    <path d="M19 7l-2.5 6h5L19 7z"/>
    <line x1="9" y1="21" x2="15" y2="21"/>
  </svg>
);

/* Linhas do "laudo" — largura variável, algumas marcadas como crítico */
const docLines = [
  { w: "94%" },
  { w: "76%" },
  { w: "88%", critical: true },
  { w: "62%" },
  { w: "84%" },
  { w: "70%", critical: true },
  { w: "90%" },
  { w: "55%" },
];

/* Painel editorial abstrato: documento/laudo sob análise técnica (CSS + SVG, sem imagem) */
const EvidencePanel = () => (
  <div className="relative w-full max-w-sm mx-auto lg:max-w-none" aria-hidden="true">
    {/* glow dourado atrás do painel */}
    <div
      className="absolute -inset-6 pointer-events-none"
      style={{ background: "radial-gradient(60% 55% at 70% 30%, rgba(184,135,58,0.16) 0, transparent 70%)" }}
    />

    {/* painel translúcido (vidro) */}
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(158deg, rgba(239,232,220,0.06) 0%, rgba(31,37,43,0.22) 55%, rgba(20,19,17,0.30) 100%)",
        border: "1px solid rgba(214,190,131,0.18)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        boxShadow: "0 34px 70px -28px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* cabeçalho do documento */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(214,190,131,0.14)" }}>
        <span className="flex items-center gap-2.5">
          <ScalesGlyph />
          <span className="font-label text-[9px] font-semibold tracking-[0.26em] uppercase" style={{ color: "#B8873A" }}>
            Laudo · análise
          </span>
        </span>
        {/* carimbo */}
        <span
          className="rounded-full flex items-center justify-center"
          style={{ width: 28, height: 28, border: "1px dashed rgba(184,135,58,0.5)" }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(184,135,58,0.7)" }} />
        </span>
      </div>

      {/* corpo: linhas do laudo + marcadores críticos */}
      <div className="px-5 py-5 space-y-3.5">
        {docLines.map((l, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span
              style={{
                width: 6,
                height: 6,
                flexShrink: 0,
                transform: "rotate(45deg)",
                background: l.critical ? "#B8873A" : "transparent",
                border: l.critical ? "none" : "1px solid rgba(214,190,131,0.28)",
              }}
            />
            <span
              style={{
                height: 6,
                width: l.w,
                borderRadius: 3,
                background: l.critical
                  ? "linear-gradient(90deg, rgba(214,190,131,0.6), rgba(184,135,58,0.12))"
                  : "rgba(214,190,131,0.14)",
              }}
            />
            {l.critical && (
              <span className="ml-auto font-label text-[8px] tracking-[0.18em] uppercase" style={{ color: "rgba(214,190,131,0.55)" }}>
                ⟮ crítico ⟯
              </span>
            )}
          </div>
        ))}
      </div>

      {/* rodapé: leitura médica do laudo — ECG + achados técnicos */}
      <div className="px-5 pb-5 pt-1" style={{ borderTop: "1px solid rgba(214,190,131,0.10)" }}>
        <div className="flex items-center justify-between mt-3 mb-2">
          <p className="font-label text-[8px] tracking-[0.24em] uppercase" style={{ color: "rgba(169,160,147,0.7)" }}>
            Leitura médica
          </p>
          {/* cruz médica minimalista */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#B8873A" style={{ opacity: 0.7 }} aria-hidden="true">
            <path d="M9.5 2h5v7.5H22v5h-7.5V22h-5v-7.5H2v-5h7.5z" />
          </svg>
        </div>

        <svg viewBox="0 0 248 84" width="100%" height="84" fill="none" aria-hidden="true">
          <defs>
            <pattern id="ecgGrid" width="14" height="14" patternUnits="userSpaceOnUse">
              <path d="M14 0H0V14" fill="none" stroke="rgba(214,190,131,0.06)" strokeWidth="0.5" />
            </pattern>
            <radialGradient id="ecgGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B8873A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#B8873A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* grid clínico (papel de exame) */}
          <rect x="0" y="6" width="248" height="72" fill="url(#ecgGrid)" />
          {/* linha de base */}
          <line x1="2" y1="52" x2="246" y2="52" stroke="rgba(214,190,131,0.10)" strokeWidth="1" />

          {/* glow do achado crítico */}
          <circle cx="124" cy="20" r="22" fill="url(#ecgGlow)" />

          {/* traçado de ECG */}
          <polyline
            points="2,52 24,52 30,48 36,52 56,52 62,52 66,56 70,34 74,60 78,52 96,52 114,52 118,58 124,20 129,68 134,44 140,52 162,52 168,48 174,52 192,52 196,56 200,40 204,60 208,52 246,52"
            stroke="rgba(214,190,131,0.6)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* achados sutis sobre o traçado */}
          <circle cx="70" cy="34" r="2" fill="#171512" stroke="rgba(214,190,131,0.5)" strokeWidth="1" />
          <circle cx="200" cy="40" r="2" fill="#171512" stroke="rgba(214,190,131,0.5)" strokeWidth="1" />

          {/* achado crítico + chamada NEXO */}
          <line x1="124" y1="20" x2="124" y2="10" stroke="rgba(184,135,58,0.45)" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="124" cy="20" r="4" fill="#B8873A" />
          <circle cx="124" cy="20" r="7" fill="none" stroke="rgba(184,135,58,0.4)" strokeWidth="1" />
          <text x="131" y="13" fontSize="7" letterSpacing="1.6" fill="rgba(214,190,131,0.75)" style={{ fontFamily: "Montserrat, system-ui, sans-serif" }}>
            NEXO
          </text>
        </svg>

        {/* chips técnicos */}
        <div className="flex items-center justify-end gap-1.5 mt-1.5">
          {["CID", "EXAME", "ATESTADO"].map((c) => (
            <span
              key={c}
              className="font-label text-[8px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded-full"
              style={{ color: "rgba(214,190,131,0.6)", border: "1px solid rgba(214,190,131,0.2)" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* anotação flutuante discreta */}
    <span
      className="absolute hidden sm:flex items-center gap-2"
      style={{ top: "33%", left: -14 }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "transparent", border: "1px solid rgba(184,135,58,0.55)" }} />
      <span style={{ width: 18, height: 1, background: "rgba(184,135,58,0.4)" }} />
    </span>
  </div>
);

const ProblemSolution = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(58% 46% at 20% 16%, rgba(214,190,131,0.08) 0, transparent 56%)," +
          "radial-gradient(54% 56% at 84% 38%, rgba(184,135,58,0.11) 0, transparent 62%)," +
          "radial-gradient(120% 100% at 100% 0%, rgba(42,33,24,0.55) 0, transparent 52%)," +
          "linear-gradient(162deg, #171512 0%, #141311 52%, #100f0d 100%)",
        color: "#EFE8DC",
      }}
    >
      {/* textura dot-grid sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(214,190,131,.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.08,
          zIndex: 0,
        }}
      />

      <div ref={ref} className={`container mx-auto max-w-6xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* ── Cabeçalho (esquerda) ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#B8873A" }}>
              O problema
            </p>
            <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.6rem] font-bold leading-[1.12] max-w-xl" style={{ color: "#EFE8DC", letterSpacing: "-0.018em" }}>
              A fragilidade da defesa nem sempre está no direito, está em{" "}
              <em className="italic" style={{ color: "#D6BE83" }}>como a prova médica chega</em>{" "}
              ao processo.
            </h2>
          </div>

          {/* ── Painel visual (direita) ── */}
          <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:row-span-2 lg:self-center">
            <EvidencePanel />
          </div>

          {/* ── Timeline + conclusão (esquerda) ── */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
            <ol className="relative flex flex-col gap-7 md:gap-8">
              {/* linha vertical conectora */}
              <span
                aria-hidden="true"
                className="absolute top-3 bottom-3"
                style={{ left: 17, width: 1, background: "linear-gradient(180deg, rgba(214,190,131,0.05), rgba(214,190,131,0.28) 12%, rgba(214,190,131,0.28) 88%, rgba(214,190,131,0.05))" }}
              />
              {pains.map((pain, i) => {
                const Icon = painIcons[i];
                return (
                  <li
                    key={pain.title}
                    className="relative flex gap-5 stagger-item group transition-all duration-300 hover:translate-x-1"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <span
                      className="relative z-10 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-300"
                      style={{
                        width: 36,
                        height: 36,
                        color: "#C9A35C",
                        background: "radial-gradient(circle, rgba(42,33,24,0.95) 0, rgba(23,21,18,0.95) 100%)",
                        border: "1px solid rgba(214,190,131,0.3)",
                        boxShadow: "0 6px 16px -8px rgba(0,0,0,0.8)",
                      }}
                    >
                      <Icon />
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-lg md:text-xl font-semibold italic mb-2 leading-snug" style={{ color: "#F1EAD9" }}>
                        {pain.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed" style={{ color: "#A9A093" }}>
                        {pain.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* ── Conclusão estratégica ── */}
            <div className="relative mt-11 md:mt-12 pl-6 pr-5 py-6 rounded-r-md overflow-hidden" style={{ background: "linear-gradient(90deg, rgba(239,232,220,0.06) 0%, rgba(239,232,220,0.015) 70%, transparent 100%)" }}>
              <span aria-hidden="true" className="absolute left-0 top-0 bottom-0" style={{ width: 2, background: "linear-gradient(180deg, #B8873A 0%, rgba(184,135,58,0.15) 100%)" }} />
              <span aria-hidden="true" className="absolute left-0 right-0 top-0" style={{ height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.5), transparent)" }} />
              <p className="text-[15px] md:text-base leading-relaxed" style={{ color: "#BDB4A5" }}>
                A assistência técnica médica em causas trabalhistas existe para que a defesa da reclamada chegue à perícia, à audiência e ao recurso com contraprova médica fundamentada, antes que o laudo desfavorável vire pressão para acordo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
