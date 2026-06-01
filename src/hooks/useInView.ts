import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Progressive enhancement: sem JS o conteúdo já nasce visível (estado padrão do CSS),
    // então o HTML do SSG renderiza pro robô do Google e nunca aparece "dobra preta".
    // Sob reduced-motion ou sem IntersectionObserver, não animamos: só revelamos.
    const prefersReduced =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // "Arma" a animação SÓ no cliente: a partir daqui o elemento pode esconder (.fade-armed)
    // e revelar (.is-visible). React reescreve a className ao revelar e remove .fade-armed.
    el.classList.add("fade-armed");

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
