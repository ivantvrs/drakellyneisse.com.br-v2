import { useInView } from "@/hooks/useInView";

const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="17" rx="1"/>
    <line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="8" y1="4" x2="8" y2="21" opacity="0.5"/>
    <circle cx="12" cy="15" r="1" fill="currentColor"/>
  </svg>
);

const IconLawyer = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="3"/>
    <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
  </svg>
);

const IconBuilding = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18"/>
    <path d="M5 21V7l7-4 7 4v14"/>
    <rect x="9" y="12" width="2" height="3"/>
    <rect x="13" y="12" width="2" height="3"/>
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const items = [
  {
    Icon: IconCalendar,
    title: "Tem audiência pericial marcada ou saneador aberto",
    text: "Quesitos suplementares precisam ser formulados em prazo curto e direcionados a fatos clínicos críticos para a defesa da reclamada.",
  },
  {
    Icon: IconLawyer,
    title: "Recebeu laudo pericial desfavorável à empresa que defende",
    text: "Há prazo para impugnar com fundamento médico, e a tese de defesa depende de leitura especializada do laudo do juízo.",
  },
  {
    Icon: IconBuilding,
    title: "Precisa contestar nexo causal, insalubridade ou doença ocupacional",
    text: "A defesa exige análise médica de prontuários, exames, CAT, atestados e B91, antes da perícia, durante o acompanhamento ou no recurso.",
  },
  {
    Icon: IconShield,
    title: "Atua para empresa-reclamada com volume recorrente",
    text: "O jurídico (escritório, departamento interno ou contencioso de massa) precisa de assistência técnica médica integrada à estratégia processual.",
  },
];

/* Glifo discreto de balança/medicina (dourado envelhecido) */
const ScalesGlyph = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B8873A" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21"/>
    <line x1="5" y1="7" x2="19" y2="7"/>
    <path d="M5 7L2.5 13h5L5 7z"/>
    <path d="M19 7l-2.5 6h5L19 7z"/>
    <line x1="9" y1="21" x2="15" y2="21"/>
  </svg>
);

const TargetAudience = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(52% 42% at 16% 14%, rgba(201,163,92,0.10) 0, transparent 55%)," +
          "radial-gradient(60% 60% at 100% 100%, rgba(184,135,58,0.07) 0, transparent 60%)," +
          "linear-gradient(165deg, #F7F1E8 0%, #F1E6D6 55%, #EFE4D4 100%)",
      }}
    >
      {/* textura leve remetendo a documento/protocolo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background:
            "repeating-linear-gradient(180deg, rgba(184,135,58,0.02) 0px, rgba(184,135,58,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <div ref={ref} className={`container mx-auto max-w-6xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-12 gap-y-10 lg:gap-x-14">
          {/* ── Coluna título (esquerda) ── */}
          <div className="lg:col-span-4 lg:pt-2">
            <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#B8873A" }}>
              Para quem é
            </p>
            <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold leading-[1.12]" style={{ color: "#1F252B", letterSpacing: "-0.02em" }}>
              Para quem é este serviço
            </h2>

            {/* elemento editorial — símbolo sem card + régua dourada */}
            <div className="flex items-center gap-4 mt-7">
              <span style={{ color: "#B8873A" }}>
                <ScalesGlyph />
              </span>
              <span aria-hidden="true" className="block" style={{ flex: 1, maxWidth: 130, height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.5), transparent)" }} />
            </div>
            <p className="font-label text-[10px] tracking-[0.26em] uppercase mt-4" style={{ color: "rgba(94,100,112,0.7)" }}>
              Triagem técnico-processual
            </p>
          </div>

          {/* ── Régua de triagem (direita) — lista editorial contínua ── */}
          <div className="lg:col-span-8">
            <ol className="relative">
              {/* fio vertical conectando os nós */}
              <span
                aria-hidden="true"
                className="absolute"
                style={{ left: 51, top: 34, bottom: 34, width: 1, background: "linear-gradient(180deg, rgba(184,135,58,0.08), rgba(184,135,58,0.3) 10%, rgba(184,135,58,0.3) 90%, rgba(184,135,58,0.08))" }}
              />

              {items.map(({ Icon, title, text }, i) => (
                <li
                  key={title}
                  className="stagger-item group relative flex gap-4 md:gap-6 py-6 transition-transform duration-300 hover:translate-x-1"
                  style={{
                    transitionDelay: `${i * 90}ms`,
                    borderBottom: i < items.length - 1 ? "1px solid rgba(184,135,58,0.16)" : "none",
                  }}
                >
                  {/* número + nó com ícone */}
                  <div className="flex items-start gap-3 flex-shrink-0">
                    <span className="font-display italic text-base leading-none pt-2.5 w-6 text-right" style={{ color: "rgba(184,135,58,0.55)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="relative z-10 flex items-center justify-center rounded-full transition-colors duration-300"
                      style={{
                        width: 32,
                        height: 32,
                        color: "#B8873A",
                        background: "#F4ECDD",
                        border: "1px solid rgba(184,135,58,0.32)",
                      }}
                    >
                      <Icon />
                    </span>
                  </div>

                  {/* texto */}
                  <div className="pt-0.5">
                    <h3 className="font-display text-[17px] md:text-xl font-semibold mb-1.5 leading-snug" style={{ color: "#1F252B" }}>
                      {title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] leading-relaxed" style={{ color: "#5E6470" }}>
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* ── Nota editorial ── */}
            <div className="relative mt-8 pt-5">
              <span aria-hidden="true" className="absolute left-0 right-0 top-0" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(184,135,58,0.4), transparent)" }} />
              <p className="text-sm italic leading-relaxed text-center" style={{ color: "#7A7264" }}>
                Atendimento exclusivo para advogados, escritórios e departamentos jurídicos, e partes envolvidas em processo trabalhista.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
