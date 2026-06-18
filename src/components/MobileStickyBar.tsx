import { useState, useEffect } from "react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/4342e64e-304b-40eb-8abc-1d0c4a6a1b1a";

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
        style={{ background: "linear-gradient(180deg, #2ed671 0%, #22c35c 100%)" }}
      >
        <WhatsAppIcon size={16} />
        WhatsApp
      </a>
    </div>
  );
};

export default MobileStickyBar;
