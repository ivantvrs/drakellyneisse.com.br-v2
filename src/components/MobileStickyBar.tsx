import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20assist%C3%AAncia%20t%C3%A9cnica%20m%C3%A9dica%20judicial.";

const MobileStickyBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      const footer = document.querySelector("footer");
      const footerVisible = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > 500 && !footerVisible);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex"
      style={{
        backgroundColor: '#1A1A1A',
        borderTop: '1px solid rgba(212, 168, 83, 0.15)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
      }}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp — barra fixa mobile"
        className="w-full flex items-center justify-center gap-2 py-3 text-white font-label text-sm font-semibold"
        style={{ background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)" }}
      >
        <MessageCircle size={16} />
        WhatsApp
      </a>
    </div>
  );
};

export default MobileStickyBar;
