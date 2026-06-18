import { useEffect, useState } from "react";

const DEFAULT_IDS = ["inicio", "servicos", "como-funciona", "sobre", "faq"];

// `ids` opcional p/ reaproveitar o hook em portas com seções diferentes (ex.: /at).
// Sem argumento, mantém o comportamento da LP "/" (não quebra o Header atual).
export function useScrollSpy(ids: string[] = DEFAULT_IDS) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) return;
        let best = ids[0];
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) { best = id; bestRatio = ratio; }
        }
        setActive(best);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return active;
}
