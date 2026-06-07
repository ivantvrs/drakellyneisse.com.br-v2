import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { EMPRESA_WHATSAPP_URL } from "./cta";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "O que faz", href: "#o-que-faz" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
];

const EmpresaHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "shadow-navbar" : ""}`}
      style={{
        backgroundColor: scrolled ? "rgba(15, 15, 15, 0.95)" : "rgba(15, 15, 15, 0.8)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(212, 168, 83, 0.15)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span className="font-bold leading-none" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-[22px] md:text-[28px]" style={{ color: '#F5F0E8' }}>K</span>
            <span className="text-[22px] md:text-[28px] ml-[-3px] md:ml-[-5px] relative z-10" style={{ color: '#D4A853' }}>N</span>
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold leading-tight gold-shine-subtle">
              Dra. Kelly Neisse
            </span>
            <span className="font-label text-xs tracking-wide" style={{ color: '#8A857A' }}>
              Médica Perita Judicial
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-label text-sm transition-colors relative pb-1"
              style={{ color: '#A09A8D' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — menu"
            className="inline-flex items-center gap-2 text-white font-label text-sm font-semibold px-5 py-2.5 rounded-md transition-all duration-300 hover:-translate-y-[2px]"
            style={{
              background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
              boxShadow: "0 3px 10px rgba(37, 211, 102, 0.3)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 18px rgba(37, 211, 102, 0.5)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 3px 10px rgba(37, 211, 102, 0.3)"; }}
          >
            <MessageCircle size={16} />
            Falar no WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ color: '#F5F0E8' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu de navegação"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="lg:hidden px-6 pb-6 pt-2 space-y-4"
          style={{ backgroundColor: '#1A1A1A', borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-label text-sm py-2 min-h-[44px] flex items-center"
              style={{ color: '#A09A8D' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={EMPRESA_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — menu mobile"
            className="inline-flex items-center gap-2 text-white font-label text-sm font-semibold px-5 py-2.5 rounded-md w-full justify-center transition-all duration-300"
            style={{
              background: "linear-gradient(180deg, #2ed671 0%, #25D366 40%, #1fb855 100%)",
              boxShadow: "0 3px 10px rgba(37, 211, 102, 0.3)",
            }}
          >
            <MessageCircle size={16} />
            Falar no WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
};

export default EmpresaHeader;
