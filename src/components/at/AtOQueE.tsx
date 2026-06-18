import { useInView } from "@/hooks/useInView";

const pontos = [
  "Acompanha o exame pericial como representante técnico de quem o contratou",
  "Formula os quesitos, as perguntas que direcionam o que o perito vai avaliar",
  "Analisa o laudo e aponta o que estiver tecnicamente incorreto",
  "Produz um parecer que entra no processo ao lado da sua versão",
];

// Textura de laudo quase invisível: contorno baixíssimo + linhas de texto simuladas + trechos
// destacados + uma linha de pulso médico minimalista. Decorativo, integrado ao fundo dark.
const LaudoTexture = ({ className, style }: { className?: string; style?: React.CSSProperties }) => {
  const linhas = Array.from({ length: 15 }, (_, i) => i);
  const larguras = [188, 232, 160, 210, 138, 0, 0, 196, 168, 224, 150, 204, 176, 142, 120];
  return (
    <svg className={className} style={style} viewBox="0 0 320 460" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect x="10" y="6" width="300" height="448" rx="10" stroke="rgba(214,190,131,0.08)" strokeWidth="1" />
      <rect x="30" y="30" width="120" height="9" rx="3" fill="rgba(214,190,131,0.16)" />
      {linhas.map((i) => {
        const w = larguras[i];
        if (!w) return null;
        return <rect key={i} x="30" y={60 + i * 24} width={w} height="5" rx="2.5" fill="rgba(214,190,131,0.07)" />;
      })}
      {/* trechos destacados — pontos críticos do laudo */}
      <rect x="30" y="156" width="96" height="5" rx="2.5" fill="rgba(214,190,131,0.2)" />
      <rect x="30" y="300" width="74" height="5" rx="2.5" fill="rgba(214,190,131,0.2)" />
      {/* pulso médico minimalista atravessando */}
      <path d="M30 228 H92 L104 208 L118 258 L132 220 L142 228 H290" stroke="rgba(214,190,131,0.22)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const AtOQueE = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="o-que-e"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(58% 46% at 20% 16%, rgba(214,190,131,0.08) 0, transparent 56%)," +
          "radial-gradient(54% 56% at 84% 38%, rgba(184,135,58,0.10) 0, transparent 62%)," +
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
          opacity: 0.07,
          zIndex: 0,
        }}
      />

      {/* vignette discreta nas bordas */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ boxShadow: "inset 0 0 160px 44px rgba(0,0,0,0.55)", zIndex: 0 }} />

      <style>{`
        /* glow dourado respirando atrás da headline */
        .atoq-breathe { animation: atoqBreathe 7.5s ease-in-out infinite; }
        @keyframes atoqBreathe { 0%,100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 0.92; transform: scale(1.06); } }

        /* eixo de leitura técnica — linha vertical dourada com glow + marcadores conectados */
        .atoq-axis { position: relative; list-style: none; margin: 0; padding: 0; }
        .atoq-axis::before {
          content: ""; position: absolute; left: 6px; top: 12px; bottom: 12px; width: 1px;
          background: linear-gradient(180deg, rgba(214,190,131,0.65) 0%, rgba(184,135,58,0.4) 55%, rgba(184,135,58,0.12) 100%);
          box-shadow: 0 0 9px rgba(184,135,58,0.35);
        }
        .atoq-step { position: relative; display: flex; align-items: center; min-height: 46px; padding: 13px 0 13px 50px; }
        .atoq-dot {
          position: absolute; left: 6px; top: 50%; transform: translate(-50%, -50%); z-index: 1;
          width: 11px; height: 11px; border-radius: 999px;
          background: radial-gradient(circle at 50% 35%, #F0DDA8, #B8873A);
          box-shadow: 0 0 0 4px rgba(16,15,13,0.92), 0 0 10px rgba(184,135,58,0.45);
          transition: box-shadow 320ms ease; animation: atoqDot 4.6s ease-in-out infinite;
        }
        .atoq-connector {
          position: absolute; left: 11px; top: 50%; height: 1px; width: 30px; transform: translateY(-50%);
          background: linear-gradient(90deg, rgba(214,190,131,0.6), rgba(214,190,131,0.16));
          opacity: 0.7; transition: opacity 320ms ease;
        }
        .atoq-step:hover .atoq-connector { opacity: 1; }
        .atoq-step:hover .atoq-dot { box-shadow: 0 0 0 4px rgba(16,15,13,0.92), 0 0 16px rgba(184,135,58,0.7); }
        .atoq-step:hover .atoq-text { color: #EFE8DC; }
        .atoq-text { transition: color 320ms ease; }
        @keyframes atoqDot {
          0%,100% { box-shadow: 0 0 0 4px rgba(16,15,13,0.92), 0 0 8px rgba(184,135,58,0.3); }
          50%     { box-shadow: 0 0 0 4px rgba(16,15,13,0.92), 0 0 15px rgba(184,135,58,0.55); }
        }
        @media (prefers-reduced-motion: reduce) { .atoq-breathe, .atoq-dot { animation: none; } }
      `}</style>

      {/* glow dourado respirando atrás da headline */}
      <div aria-hidden="true" className="atoq-breathe absolute pointer-events-none" style={{ left: "6%", top: "24%", width: 380, height: 380, borderRadius: "999px", background: "radial-gradient(circle, rgba(184,135,58,0.15) 0%, transparent 68%)", filter: "blur(10px)", zIndex: 0 }} />

      <div ref={ref} className={`container mx-auto max-w-6xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          {/* ── Texto (esquerda) ── */}
          <div className="lg:col-span-7">
            <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-5" style={{ color: "#B8873A" }}>
              O que é
            </p>
            <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.6rem] font-bold leading-[1.12] mb-7" style={{ color: "#EFE8DC", letterSpacing: "-0.018em" }}>
              O laudo do perito decide o processo, e{" "}
              <em className="italic" style={{ color: "#D6BE83" }}>alguém precisa lê-lo tecnicamente</em>.
            </h2>
            <div className="space-y-5 text-[15px] md:text-base leading-relaxed" style={{ color: "#A9A093" }}>
              <p>
                Quando um processo depende de uma questão de saúde, uma doença, uma lesão, uma sequela, o juiz
                nomeia um perito médico para examinar e dar um laudo. Esse perito não trabalha para nenhum dos
                lados, ele responde ao juízo. O problema é que o juiz decide, na prática, com base nesse laudo.
                Se ele tiver um erro técnico, um nexo mal explicado ou deixar de considerar algo importante,{" "}
                <strong style={{ color: "#F1EAD9", fontWeight: 600 }}>ninguém vai corrigir se não houver um assistente técnico no processo</strong>.
              </p>
            </div>

            {/* nota legal premium — BASE LEGAL */}
            <div className="relative mt-9 pl-6 pr-5 py-6 overflow-hidden" style={{ borderRadius: "0 10px 10px 0", background: "linear-gradient(95deg, rgba(214,190,131,0.09) 0%, rgba(239,232,220,0.025) 62%, transparent 100%)" }}>
              <span aria-hidden="true" className="absolute left-0 top-0 bottom-0" style={{ width: 3, background: "linear-gradient(180deg, #D6BE83 0%, #B8873A 45%, rgba(184,135,58,0.15) 100%)" }} />
              <p className="font-label text-[10px] font-semibold tracking-[0.28em] uppercase mb-2.5" style={{ color: "#B8873A" }}>
                Base legal
              </p>
              <p className="text-[15px] md:text-base leading-relaxed" style={{ color: "#C7BEAF" }}>
                É um direito garantido pela lei (<strong style={{ color: "#E7D4A2", fontWeight: 600 }}>CPC, art. 465</strong>). A escolha
                e a contratação são da parte, não do juiz.
              </p>
            </div>
          </div>

          {/* ── Eixo de leitura técnica (direita) — sem card, sem selo ── */}
          <div className="lg:col-span-5 relative lg:pt-1">
            {/* textura de laudo quase invisível (só desktop, p/ não poluir o mobile) */}
            <LaudoTexture className="hidden md:block absolute pointer-events-none" style={{ top: -10, left: 8, right: -10, height: "112%", opacity: 0.5, zIndex: 0 }} />
            {/* glow sutil atrás do eixo */}
            <div aria-hidden="true" className="absolute pointer-events-none" style={{ left: -10, top: "30%", width: 220, height: 260, background: "radial-gradient(circle, rgba(184,135,58,0.10) 0%, transparent 70%)", filter: "blur(8px)", zIndex: 0 }} />

            <div className="relative" style={{ zIndex: 1 }}>
              <div className="flex items-center gap-3 mb-2.5">
                <span aria-hidden="true" style={{ width: 22, height: 1, background: "linear-gradient(90deg, #B8873A, transparent)" }} />
                <p className="font-label text-[10px] font-semibold tracking-[0.26em] uppercase" style={{ color: "#B8873A" }}>
                  O assistente técnico médico
                </p>
              </div>
              <p className="text-[14px] leading-relaxed mb-7" style={{ color: "#A9A093" }}>
                É o seu médico de confiança dentro da perícia. Ele:
              </p>

              <ol className="atoq-axis">
                {pontos.map((p, i) => (
                  <li key={p} className="atoq-step stagger-item" style={{ transitionDelay: `${i * 90}ms` }}>
                    <span className="atoq-dot" aria-hidden="true" style={{ animationDelay: `${i * 0.55}s` }} />
                    <span className="atoq-connector" aria-hidden="true" />
                    <span className="atoq-text text-[15px] leading-relaxed" style={{ color: "#C9C0AE" }}>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtOQueE;
