import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Camada de LUZ ANIMADA do Hero (experimento de estudo).
 *
 * Estilo de referência: "gently flowing shiny golden wavy lines" — um feixe denso
 * de linhas douradas finas (seda) ondulando e fluindo suave em loop, com brilho
 * deslizando, na paleta da página (#D4A853 sobre #0F0F0F).
 *
 *   ?fx=1  Ondas/seda fluindo, movimento livre/automático.
 *   ?fx=2  Mesmo fluxo de seda + parallax no SCROLL (fluxo automático por dentro,
 *          deslocamento do scroll por fora — os dois transforms se compõem).
 *   ?fx=3  Aurora difusa (manchas de luz, sem linhas) — alternativa minimalista.
 *   ?fx=4  Aurora difusa (a chuva de meteoros da fx=4 vive no PageRainFX, global).
 *
 * - Sem o parâmetro NÃO renderiza nada → site idêntico ao atual (zero risco no ar).
 * - Montado dentro do bloco desktop do Hero (hidden md:block) e em z-0: atrás da
 *   figura (z-1) e do texto (z-10). aria-hidden, pointer-events:none.
 * - Animações só com transform/opacity (GPU). Blur fixo. Desliga em
 *   prefers-reduced-motion (ver index.css + guarda no scroll).
 * - Lê window só no useEffect → sem hydration mismatch no SSG do "/".
 */

const VB_W = 1440;
const VB_H = 560;
const LINE_COUNT = 64;

// Gera o "d" de uma linha do feixe. t ∈ [0,1] interpola entre a curva de cima e a
// de baixo (fases opostas) — onde elas se cruzam, as linhas se apertam e nasce o
// "nó" de luz (pinças em px≈0.25 e 0.75). Mesmo efeito do blend da referência.
// Desenhamos 2 PERÍODOS (0..2·VB_W): como o padrão se repete a cada VB_W, a
// animação de fluxo pode transladar -VB_W em loop sem nenhuma emenda.
function wavePath(t: number): string {
  const samples = 168;
  const amp = VB_H * 0.22;
  let d = "";
  for (let s = 0; s <= samples; s++) {
    const px = (s / samples) * 2; // 0 → 2 (dois períodos)
    const x = px * VB_W; // 0 → 2·VB_W
    const yTop = VB_H * 0.5 + Math.sin(px * Math.PI * 2 - 0.6) * amp;
    const yBot =
      VB_H * 0.5 +
      Math.sin(px * Math.PI * 2 + 0.6) * amp +
      Math.sin(px * Math.PI * 4) * (VB_H * 0.05);
    const y = yTop + (yBot - yTop) * t;
    d += (s ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1) + " ";
  }
  return d;
}

const HeroLightFX = () => {
  const [variant, setVariant] = useState<string | null>(null);
  const scrollRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const fx = new URLSearchParams(window.location.search).get("fx");
    if (fx === "1" || fx === "2" || fx === "3" || fx === "4") setVariant(fx);
  }, []);

  // Linhas do feixe: brilho em sino (centro do feixe mais aceso que as bordas).
  const lines = useMemo(
    () =>
      Array.from({ length: LINE_COUNT }, (_, i) => {
        const t = i / (LINE_COUNT - 1);
        const bell = 1 - Math.abs(2 * t - 1); // 0 nas bordas, 1 no centro
        return { d: wavePath(t), opacity: 0.05 + bell * 0.3 };
      }),
    []
  );

  // Variação 2 — deslocamento atrelado ao scroll (parallax), com easing por rAF.
  // Mira o grupo EXTERNO (scroll); o fluxo automático fica no grupo interno (CSS),
  // então os dois transforms se compõem sem conflito.
  useEffect(() => {
    if (variant !== "2") return;
    const g = scrollRef.current;
    if (!g) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let target = window.scrollY;
    let cur = target;
    const apply = () => {
      cur += (target - cur) * 0.12;
      g.style.transform = `translate3d(${(-cur * 0.08).toFixed(2)}px, ${(cur * 0.02).toFixed(2)}px, 0)`;
      if (Math.abs(target - cur) > 0.4) raf = requestAnimationFrame(apply);
      else raf = 0;
    };
    const onScroll = () => {
      target = window.scrollY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [variant]);

  if (!variant) return null;

  // Variações 3 e 4 — aurora difusa no Hero (a chuva da fx=4 é global, no PageRainFX).
  if (variant === "3" || variant === "4") {
    return (
      <div className={`hero-fx hero-fx-${variant}`} aria-hidden="true">
        <span className="hero-fx-blob hero-fx-blob-a" />
        <span className="hero-fx-blob hero-fx-blob-b" />
        <span className="hero-fx-blob hero-fx-blob-c" />
      </div>
    );
  }

  // Variações 1 e 2 — seda dourada fluindo (fluxo livre x fluxo + scroll).
  return (
    <div className={`hero-fx hero-fx-${variant}`} aria-hidden="true">
      <svg
        className="hero-fx-waves"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="heroFxKnot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#E8C77B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#D4A853" stopOpacity="0" />
          </radialGradient>
          {/* faixa de brilho ("shiny") que percorre o feixe */}
          <linearGradient id="heroFxShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFF3D6" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFF3D6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFF3D6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grupo externo = scroll (fx=2); grupo interno = fluxo automático (CSS) */}
        <g ref={scrollRef} className="hero-fx-scroll">
          <g className="hero-fx-wavegroup">
            {lines.map((l, i) => (
              <path
                key={i}
                d={l.d}
                fill="none"
                stroke="#D4A853"
                strokeWidth={0.65}
                strokeOpacity={l.opacity}
              />
            ))}
            {/* nós de luz na pinça — dois, espaçados VB_W, p/ o loop não emendar */}
            <circle className="hero-fx-knot" cx={VB_W * 0.75} cy={VB_H * 0.5} r={150} fill="url(#heroFxKnot)" />
            <circle className="hero-fx-knot" cx={VB_W * 1.75} cy={VB_H * 0.5} r={150} fill="url(#heroFxKnot)" />
          </g>
        </g>

        {/* brilho deslizante por cima (mix-blend screen no CSS) */}
        <rect className="hero-fx-shimmer" x="0" y="0" width={VB_W} height={VB_H} fill="url(#heroFxShine)" />
      </svg>
    </div>
  );
};

export default HeroLightFX;
