import { useState, useEffect } from "react";

const WHATSAPP_URL = "https://wa.me/5534996878758?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20assist%C3%AAncia%20t%C3%A9cnica%20m%C3%A9dica%20judicial.";

const WhatsAppIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    }, 8000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden lg:block" style={{ animation: "waEntry 0.4s ease-out" }}>
      <div className="relative group">
        {/* Pulse ring */}
        {pulse && (
          <span
            className="absolute inset-0 rounded-full"
            style={{
              backgroundColor: "hsla(140, 70%, 45%, 0.3)",
              animation: "waPulse 0.8s ease-out forwards",
            }}
          />
        )}
        {/* Tooltip */}
        <span
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 font-label text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            backgroundColor: '#1A1A1A',
            color: '#F5F0E8',
            border: '1px solid rgba(212, 168, 83, 0.15)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          Falar no WhatsApp
        </span>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp — botão flutuante"
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
            boxShadow: hovered
              ? "0 8px 25px rgba(37, 211, 102, 0.55)"
              : "0 4px 15px rgba(37, 211, 102, 0.45)",
            transform: hovered ? "translateY(-3px)" : "translateY(0)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <WhatsAppIcon size={28} />
        </a>
      </div>
    </div>
  );
};

// Mobile version (smaller, no tooltip)
export const WhatsAppButtonMobile = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp — botão flutuante mobile"
      className="fixed bottom-6 right-4 z-50 lg:hidden w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        animation: "waEntry 0.4s ease-out",
        background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
        boxShadow: hovered
          ? "0 8px 25px rgba(37, 211, 102, 0.55)"
          : "0 4px 15px rgba(37, 211, 102, 0.45)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <WhatsAppIcon size={22} />
    </a>
  );
};

export default WhatsAppButton;
