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
      className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-brand-primary-700 text-primary-foreground flex items-center justify-center shadow-card hover:scale-105 transition-transform"
      style={{ animation: "waEntry 0.3s ease-out" }}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollToTop;
