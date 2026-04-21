import { useEffect, useState } from "react";

const sectionIds = ["inicio", "servicos", "como-funciona", "sobre", "faq"];

export function useScrollSpy() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const visible = new Map<string, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        if (visible.size === 0) return;
        let best = "inicio";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) { best = id; bestRatio = ratio; }
        }
        setActive(best);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return active;
}
