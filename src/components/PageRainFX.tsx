import { useEffect, useMemo, useState } from "react";

/**
 * CHUVA DE METEOROS dourados — overlay global da página, só desktop.
 *
 * - Montado no topo da página (Index/AtIndex), NÃO dentro do Hero: como é
 *   position:fixed com z-index baixo, cobre a viewport inteira e acompanha a
 *   rolagem ("página toda"), ficando sobre o conteúdo das seções e abaixo do
 *   header/FABs (z-30+).
 * - Meteoros caem na VERTICAL, lentos e sutis (cabeça discreta + cauda que some
 *   pra cima). Só transform/opacity (GPU). Desliga em prefers-reduced-motion (CSS).
 * - Ativação: `always` liga sempre (ex.: rota /at). Sem `always`, só com ?fx=4
 *   (experimento da home). Lê window só no useEffect → sem hydration mismatch.
 */
const PageRainFX = ({ always = false }: { always?: boolean }) => {
  const [on, setOn] = useState(always);

  useEffect(() => {
    if (always) return;
    setOn(new URLSearchParams(window.location.search).get("fx") === "4");
  }, [always]);

  // Posições/tempos determinísticos (Math.sin como ruído — Math.random é proibido
  // no build). Espalhados por toda a largura; lentos (9–17s).
  const meteors = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const noise = (k: number) => {
          const x = Math.sin((i + 1) * 12.9898 + k * 78.233) * 43758.5453;
          return x - Math.floor(x);
        };
        const duration = 9 + noise(1) * 8; // 9s → 17s
        return {
          left: `${(noise(2) * 100).toFixed(1)}%`,
          delay: `-${(noise(3) * duration).toFixed(2)}s`,
          duration: `${duration.toFixed(2)}s`,
        };
      }),
    []
  );

  if (!on) return null;

  return (
    <div className="page-rain hidden md:block" aria-hidden="true">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="page-rain-meteor"
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }}
        />
      ))}
    </div>
  );
};

export default PageRainFX;
