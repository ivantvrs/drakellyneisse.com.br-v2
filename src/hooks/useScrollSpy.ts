import { useEffect, useState } from "react";

const sectionIds = ["inicio", "servicos", "como-funciona", "sobre", "faq"];

export function useScrollSpy() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const handler = () => {
      const offset = 120;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(sectionIds[i]);
          return;
        }
      }
      setActive("inicio");
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}
