import { useEffect, useRef, useState } from "react";

// Reveal-on-scroll com progressive enhancement. O `threshold` é mantido por compatibilidade de
// API (call sites antigos passam um número); hoje a entrada é decidida por geometria (ver abaixo).
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Progressive enhancement: sem JS o conteúdo já nasce visível (estado padrão do CSS),
    // então o HTML do SSG renderiza pro robô do Google e nunca aparece "dobra preta".
    // Sob reduced-motion não animamos: só revelamos.
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    // "Arma" a animação SÓ no cliente: a partir daqui o elemento pode esconder (.fade-armed)
    // e revelar (.is-visible). React reescreve a className ao revelar e remove .fade-armed.
    el.classList.add("fade-armed");

    // POR QUE NÃO IntersectionObserver: as dobras abaixo da 1ª são lazy() + <Suspense>, então
    // MONTAM (e só então armam) de forma escalonada — no mobile, segundos após o load. Se a dobra
    // monta depois que o usuário já passou pela posição dela, ela nasce ACIMA do viewport; o layout
    // (ainda crescendo com os chunks) pode até empurrá-la de baixo p/ cima da dobra SEM nunca
    // intersectar. Nesse caminho a razão de interseção fica 0 o tempo todo, o IO só dispara o
    // callback inicial e NUNCA mais — a dobra fica presa em opacity:0 (a "dobra fantasma" do mobile).
    // Decisão por geometria (getBoundingClientRect), reavaliada a cada scroll/resize e em checagens
    // de assentamento do layout, é determinística e cobre os três casos:
    //   • topo entrou na janela  -> revela com animação (caso normal de scroll)
    //   • já está acima da dobra -> revela na hora (montou tarde / scroll passou — nada a animar)
    //   • ainda abaixo da dobra  -> mantém armado, espera o scroll
    let done = false;
    let raf = 0;
    const timers: number[] = [];

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
    const reveal = () => {
      if (done) return;
      done = true;
      setIsVisible(true);
      cleanup();
    };
    const check = () => {
      raf = 0;
      if (done || !el.isConnected) return;
      // revela quando o topo cruza ~90% da altura da janela (≈ começou a entrar) — ou já passou (top<0)
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) reveal();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    // Checagem imediata + de assentamento: cobre "montou já visível/passado" mesmo quando o usuário
    // está parado (sem scroll), inclusive enquanto o #root ainda cresce com a hidratação dos lazy.
    check();
    [150, 600, 1600].forEach((d) => timers.push(window.setTimeout(check, d) as unknown as number));

    return cleanup;
  }, [threshold]);

  return { ref, isVisible };
}
