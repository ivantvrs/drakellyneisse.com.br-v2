import { useInView } from "@/hooks/useInView";

const steps = [
  {
    num: "01",
    title: "Envio inicial do caso",
    desc: "O advogado envia pelo WhatsApp um resumo do caso e a documentação disponível: laudo pericial (se houver), peça inicial, contestação, exames, prontuário, atestados, CAT. Confirmação de recebimento no mesmo dia útil.",
  },
  {
    num: "02",
    title: "Análise preliminar em 24h úteis",
    desc: "A Dra. Kelly retorna em até 24h úteis com diagnóstico técnico do que o caso pede (impugnação, quesitos, parecer ou acompanhamento), escopo de trabalho, prazo de entrega e orçamento.",
  },
  {
    num: "03",
    title: "Definição do escopo",
    desc: "Escopo, formato de entrega e prazo são definidos por escrito antes do início. Documentação complementar é solicitada apenas se necessária. Sem orçamento surpresa ao longo do trabalho.",
  },
  {
    num: "04",
    title: "Execução técnica",
    desc: "A análise médica é conduzida sobre a documentação concreta do caso e a fundamentação é estruturada com base na literatura médica aplicável. O material é entregue em formato pronto para juntada processual.",
  },
  {
    num: "05",
    title: "Devolutiva e acompanhamento",
    desc: "O advogado recebe o material no prazo combinado. Dúvidas pontuais sobre o conteúdo técnico após a entrega são respondidas sem custo adicional, dentro do escopo do trabalho contratado.",
  },
];

/* Paleta do protocolo (interlúdio claro entre as seções escuras) */
const C = {
  graphite: "#1F252B",
  textGray: "#5E6470",
  goldAged: "#B8873A",
  goldSoft: "#C9A35C",
  line: "rgba(184,135,58,0.18)",
  lineStrong: "rgba(184,135,58,0.32)",
};

/* Selo dourado das estações do fluxo */
const Seal = ({ style }: { style?: React.CSSProperties }) => (
  <span
    aria-hidden
    style={{
      width: 11,
      height: 11,
      borderRadius: 9999,
      background: "radial-gradient(circle at 35% 30%, #E2C988, #B8873A 70%)",
      boxShadow: "0 0 0 4px rgba(184,135,58,0.10), 0 0 0 1px rgba(184,135,58,0.40)",
      ...style,
    }}
  />
);

/* Etapa do mapa de processo (desktop): nº grande, selo na régua e copy editorial */
const DesktopStep = ({
  num,
  title,
  desc,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  delay: number;
}) => (
  <div className="relative stagger-item" style={{ paddingTop: "2.6rem", transitionDelay: `${delay}ms` }}>
    {/* Selo sobre a régua + queda técnica até o número */}
    <Seal style={{ position: "absolute", left: 0, top: 1 }} />
    <span aria-hidden style={{ position: "absolute", left: 5, top: 13, width: 1, height: 20, background: "linear-gradient(180deg, rgba(184,135,58,0.42), rgba(184,135,58,0))" }} />

    <span className="font-label block" style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: C.goldSoft, marginBottom: 6 }}>
      Etapa
    </span>
    <span className="font-display block leading-none" style={{ fontSize: "3.25rem", color: C.goldAged, letterSpacing: "-0.02em" }}>
      {num}
    </span>
    <h3 className="font-display" style={{ marginTop: "1.1rem", fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.25, color: C.graphite }}>
      {title}
    </h3>
    <p className="font-body" style={{ marginTop: "0.6rem", fontSize: 15, lineHeight: 1.7, color: C.textGray, maxWidth: "20rem" }}>
      {desc}
    </p>
  </div>
);

const HowItWorks = () => {
  const { ref, isVisible } = useInView();
  const firstRow = steps.slice(0, 3);
  const secondRow = steps.slice(3);

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden py-20 pb-28 md:py-28"
      style={{
        background:
          "radial-gradient(120% 70% at 50% -10%, rgba(201,163,92,0.12) 0%, transparent 55%), radial-gradient(60% 50% at 88% 82%, rgba(184,135,58,0.07) 0%, transparent 50%), linear-gradient(168deg, #F7F1E8 0%, #EFE4D4 58%, #F4ECDE 100%)",
      }}
    >
      {/* Textura técnica — malha de protocolo levíssima, esmaecida nas bordas */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(184,135,58,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(184,135,58,0.045) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(120% 80% at 50% 35%, #000 30%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 35%, #000 30%, transparent 78%)",
        }}
      />

      <div ref={ref} className={`relative z-10 container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* Cabeçalho */}
        <div className="relative text-center mb-14 md:mb-20">
          {/* Glow dourado discreto atrás da headline */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ top: "-0.5rem", width: "min(34rem, 90%)", height: "13rem", background: "radial-gradient(ellipse at center, rgba(201,163,92,0.20) 0%, transparent 68%)", filter: "blur(6px)" }}
          />
          <div className="relative flex items-center justify-center gap-4 mb-5">
            <span aria-hidden style={{ width: 34, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,135,58,0.6))" }} />
            <p className="font-label" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.34em", textTransform: "uppercase", color: C.goldAged }}>
              Processo
            </p>
            <span aria-hidden style={{ width: 34, height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.6), transparent)" }} />
          </div>
          <h2 className="relative font-display font-bold leading-tight" style={{ fontSize: "clamp(2rem, 4.4vw, 3.25rem)", letterSpacing: "-0.02em", color: C.graphite }}>
            Como funciona o atendimento
          </h2>
        </div>

        {/* ===== MAPA DE PROCESSO — desktop ===== */}
        <div className="hidden md:block max-w-5xl mx-auto">
          {/* Linha 1 — régua contínua + estações 01·02·03 */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-0 right-0"
              style={{ top: 6, height: 1, background: `linear-gradient(90deg, transparent 0%, ${C.lineStrong} 6%, ${C.lineStrong} 94%, transparent 100%)` }}
            />
            <div className="grid grid-cols-3" style={{ columnGap: "5%" }}>
              {firstRow.map((s, i) => (
                <DesktopStep key={s.num} num={s.num} title={s.title} desc={s.desc} delay={i * 90} />
              ))}
            </div>
          </div>

          {/* Conector diagonal 03 → 04 (rota de protocolo) */}
          <div aria-hidden className="relative" style={{ height: "4.5rem" }}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 72" preserveAspectRatio="none">
              <path
                d="M 70 0 C 70 40, 35 30, 35 72"
                fill="none"
                stroke="rgba(184,135,58,0.45)"
                strokeWidth={1}
                strokeDasharray="5 6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Linha 2 — deslocada à direita, régua própria + estações 04·05 */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute right-0"
              style={{ left: "35%", top: 6, height: 1, background: `linear-gradient(90deg, transparent 0%, ${C.lineStrong} 8%, ${C.lineStrong} 94%, transparent 100%)` }}
            />
            <div className="grid grid-cols-3" style={{ columnGap: "5%" }}>
              <div aria-hidden />
              {secondRow.map((s, i) => (
                <DesktopStep key={s.num} num={s.num} title={s.title} desc={s.desc} delay={(i + 3) * 90} />
              ))}
            </div>
          </div>
        </div>

        {/* ===== FLUXO VERTICAL — mobile ===== */}
        <ol className="md:hidden mt-10 px-1">
          {steps.map((s, i) => {
            const isLast = i === steps.length - 1;
            return (
              <li
                key={s.num}
                className="relative stagger-item grid"
                style={{ gridTemplateColumns: "1.75rem 1fr", columnGap: "1.1rem", transitionDelay: `${i * 80}ms` }}
              >
                {/* Trilho: selo + conector vertical sutil */}
                <div className="relative flex flex-col items-center">
                  <Seal style={{ marginTop: 6 }} />
                  {!isLast && (
                    <span
                      aria-hidden
                      style={{ width: 1, flex: 1, marginTop: 8, background: "linear-gradient(180deg, rgba(184,135,58,0.38) 0%, rgba(184,135,58,0.12) 100%)" }}
                    />
                  )}
                </div>

                {/* Conteúdo */}
                <div style={{ paddingBottom: isLast ? 0 : "2.4rem" }}>
                  <span className="font-label block" style={{ fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: C.goldSoft, marginBottom: 2 }}>
                    Etapa
                  </span>
                  <span className="font-display block leading-none" style={{ fontSize: "1.9rem", color: C.goldAged, letterSpacing: "-0.02em" }}>
                    {s.num}
                  </span>
                  <h3 className="font-display" style={{ marginTop: "0.7rem", fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: C.graphite }}>
                    {s.title}
                  </h3>
                  <p className="font-body" style={{ marginTop: "0.45rem", fontSize: 15, lineHeight: 1.65, color: C.textGray }}>
                    {s.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* ===== Conclusão editorial ===== */}
        <div className="relative mx-auto text-center" style={{ maxWidth: "44rem", marginTop: "4rem" }}>
          <div className="flex items-center justify-center gap-3 mb-6" aria-hidden>
            <span style={{ width: 52, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,135,58,0.5))" }} />
            <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: C.goldAged, boxShadow: "0 0 0 3px rgba(184,135,58,0.12)" }} />
            <span style={{ width: 52, height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.5), transparent)" }} />
          </div>
          <p className="font-body italic" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.8, color: C.textGray }}>
            Cada caso é tratado individualmente. Não há trabalho padronizado. A análise médica é feita sobre a documentação concreta do processo, não sobre modelos genéricos.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
