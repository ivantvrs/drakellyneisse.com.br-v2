import { useInView } from "@/hooks/useInView";

const testimonials = [
  {
    text: "A leitura médica da Dra. Kelly trouxe clareza a um caso em que a tese de defesa parecia tecnicamente frágil. O parecer apontou pontos do quadro clínico que não estavam sendo aproveitados na contestação e mudou a linha argumentativa.",
    name: "Dr. Renato Martins",
    role: "Advogado Trabalhista · Defesa Empresarial",
  },
  {
    text: "Os quesitos suplementares direcionaram a perícia para pontos clínicos críticos da defesa: capacidade laboral, concausalidade e diagnóstico diferencial. O laudo refletiu o que precisávamos demonstrar para sustentar a tese da reclamada.",
    name: "Dra. Camila Souza",
    role: "Advogada Trabalhista · Defesa Empresarial",
  },
  {
    text: "Precisei de impugnação de laudo com prazo curto. A devolutiva foi rápida e tecnicamente sólida, apontou omissões diagnósticas e divergência com a documentação do processo. Sustentou bem a argumentação no recurso.",
    name: "Dr. Fernando Andrade",
    role: "Advogado Trabalhista · Contencioso Empresarial",
  },
];

/* Paleta do registro de depoimentos (bloco escuro premium) */
const C = {
  textPrimary: "#EFE8DC",
  textSecondary: "#A9A093",
  goldAged: "#B8873A",
  goldLight: "#D6BE83",
  line: "rgba(214,190,131,0.16)",
};

/* Marcador editorial — índice dourado + filete fino (não parece lista comum) */
const IndexMark = ({ n }: { n: string }) => (
  <div className="flex items-center gap-3" aria-hidden>
    <span className="font-label" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.22em", color: C.goldLight }}>
      {n}
    </span>
    <span style={{ width: 28, height: 1, background: "linear-gradient(90deg, rgba(214,190,131,0.55), transparent)" }} />
  </div>
);

const Testimonials = () => {
  const { ref, isVisible } = useInView();
  const [main, ...rest] = testimonials;

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "radial-gradient(90% 60% at 50% -8%, rgba(184,135,58,0.12) 0%, transparent 55%), radial-gradient(60% 55% at 80% 92%, rgba(184,135,58,0.06) 0%, transparent 50%), linear-gradient(165deg, #171512 0%, #141311 56%, #100F0D 100%)",
        color: C.textPrimary,
      }}
    >
      {/* Textura técnica levíssima */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(214,190,131,0.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.5,
          maskImage: "radial-gradient(120% 80% at 50% 30%, #000 25%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(120% 80% at 50% 30%, #000 25%, transparent 75%)",
        }}
      />
      {/* Vignette sutil nas bordas */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(125% 115% at 50% 42%, transparent 56%, rgba(0,0,0,0.55) 100%)" }}
      />

      <div ref={ref} className={`relative z-10 container mx-auto fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* Cabeçalho — editorial, alinhado à esquerda da composição */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span aria-hidden style={{ width: 34, height: 1, background: "linear-gradient(90deg, rgba(214,190,131,0.65), transparent)" }} />
            <p className="font-label" style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: C.goldLight }}>
              Prova social
            </p>
          </div>
          <h2 className="font-display font-bold leading-tight" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)", letterSpacing: "-0.018em", color: C.textPrimary, maxWidth: "30ch" }}>
            O que advogados dizem sobre esse suporte técnico
          </h2>
        </div>

        {/* Composição assimétrica */}
        <div className="max-w-5xl mx-auto relative grid grid-cols-1 lg:grid-cols-12">
          {/* Aspa decorativa grande, ao fundo (apenas desktop) */}
          <span
            aria-hidden
            className="hidden md:block absolute font-display select-none pointer-events-none"
            style={{ top: "-2.5rem", left: "-1rem", fontSize: "clamp(9rem, 13vw, 13rem)", lineHeight: 1, color: "rgba(184,135,58,0.09)", zIndex: 0 }}
          >
            &ldquo;
          </span>

          {/* Depoimento principal — ~7 colunas */}
          <figure className="relative z-10 stagger-item lg:col-span-7 lg:pr-12" style={{ transitionDelay: "0ms" }}>
            <div
              className="relative"
              style={{
                paddingLeft: "clamp(1.25rem, 2.5vw, 2rem)",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                background: "linear-gradient(90deg, rgba(214,190,131,0.05) 0%, transparent 62%)",
              }}
            >
              {/* Filete lateral dourado (moldura editorial) */}
              <span aria-hidden style={{ position: "absolute", left: 0, top: 2, bottom: 2, width: 2, background: "linear-gradient(180deg, #B8873A 0%, rgba(184,135,58,0.12) 100%)" }} />

              <div className="mb-5">
                <IndexMark n="01" />
              </div>
              <blockquote className="font-display italic" style={{ fontSize: "clamp(1.2rem, 1.95vw, 1.55rem)", lineHeight: 1.6, color: C.textPrimary }}>
                {main.text}
              </blockquote>
              <figcaption className="mt-7">
                <p className="font-label" style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.01em", color: C.goldLight }}>
                  {main.name}
                </p>
                <p className="font-label" style={{ fontSize: 11, marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textSecondary }}>
                  {main.role}
                </p>
              </figcaption>
            </div>
          </figure>

          {/* Depoimentos secundários — ~5 colunas, empilhados, divisor vertical no desktop */}
          <div
            className="relative z-10 lg:col-span-5 lg:pl-12 lg:border-l border-t lg:border-t-0 pt-10 lg:pt-0 flex flex-col mt-10 lg:mt-0"
            style={{ borderColor: C.line }}
          >
            {rest.map(({ text, name, role }, i) => {
              const isLast = i === rest.length - 1;
              return (
                <figure
                  key={name}
                  className={`stagger-item ${i > 0 ? "border-t" : ""}`}
                  style={{
                    transitionDelay: `${(i + 1) * 120}ms`,
                    borderColor: C.line,
                    paddingTop: i > 0 ? "2rem" : 0,
                    paddingBottom: isLast ? 0 : "2rem",
                  }}
                >
                  <div className="mb-3.5">
                    <IndexMark n={String(i + 2).padStart(2, "0")} />
                  </div>
                  <blockquote className="font-display italic" style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)", lineHeight: 1.62, color: "#DCD3C2" }}>
                    {text}
                  </blockquote>
                  <figcaption className="mt-5">
                    <p className="font-label" style={{ fontSize: 13, fontWeight: 600, color: C.goldLight }}>
                      {name}
                    </p>
                    <p className="font-label" style={{ fontSize: 10.5, marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase", color: C.textSecondary }}>
                      {role}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
