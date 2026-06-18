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
    let ro: ResizeObserver | null = null;
    let safety = 0;

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (ro) ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (safety) clearTimeout(safety);
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
    // ResizeObserver no documento: as dobras lazy montam escalonadas e EMPURRAM as de baixo
    // conforme o #root cresce. Isso muda a POSIÇÃO (top) de cada dobra SEM gerar scroll — então
    // timers fixos não bastam (o layout pode assentar depois deles). O RO dispara a cada
    // crescimento do layout, re-checando a geometria por evento até a dobra revelar. Esta é a peça
    // que faltava: cobre "a dobra monta tarde com o usuário parado" (a dobra fantasma residual).
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(onScroll);
      ro.observe(document.documentElement);
    }
    check(); // imediato: cobre "montou já visível/passado"
    // Rede de segurança final: NADA pode ficar preso invisível. Se em 2,5s nada acima revelou a
    // dobra (caso patológico que escape de scroll+resize+RO), revela incondicionalmente.
    safety = window.setTimeout(reveal, 2500) as unknown as number;

    return cleanup;
  }, [threshold]);

  return { ref, isVisible };
}
