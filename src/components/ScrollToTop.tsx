import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className="fixed left-5 lg:left-6 bottom-24 lg:bottom-6 z-30 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: "radial-gradient(120% 120% at 50% 22%, #2A2419 0%, #1A1610 55%, #100D08 100%)",
        border: "1px solid rgba(212, 168, 83, 0.55)",
        color: "#D4A853",
        backdropFilter: "blur(6px)",
        boxShadow: "0 8px 22px rgba(0,0,0,.5), inset 0 0 0 1px rgba(212,168,83,.18)",
        animation: "waEntry 0.3s ease-out",
      }}
    >
      <ChevronUp size={20} strokeWidth={1.8} />
    </button>
  );
};

export default ScrollToTop;
