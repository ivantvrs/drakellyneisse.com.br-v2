import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Sobre", href: "#sobre" },
  { label: "FAQ", href: "#faq" },
];

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/9d031432-69b6-4ecb-866b-31b68ccd766f";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const activeSection = useScrollSpy();

  useEffect(() => {
    const onLoad = () => setLoaded(true);
    if (document.readyState === "complete") setLoaded(true);
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20 || mobileOpen);
        const hero = document.getElementById("inicio");
        const threshold = hero ? hero.offsetHeight * 0.85 : window.innerHeight * 0.85;
        setHidden(!(loaded && y >= threshold));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded, mobileOpen]);

  // When scrolled: marfim light background + dark text
  // When not scrolled: transparent + light text (over dark hero)
  const bgStyle = scrolled
    ? { backgroundColor: 'rgba(241,235,222,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(39,34,27,0.12)', boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }
    : { backgroundColor: 'transparent', borderBottom: '1px solid transparent' };

  const brandKColor = scrolled ? '#27221B' : '#F4EDDE';
  const brandNColor = scrolled ? '#9C7C43' : '#C79A5C';
  const brandSubColor = scrolled ? '#6B6358' : '#9d9485';
  const brandNameColor = scrolled ? '#27221B' : '#F4EDDE';
  const navLinkColor = scrolled ? '#6B6358' : '#C3B9A6';
  const navLinkActive = scrolled ? '#27221B' : '#fff';
  const navActiveUnderline = scrolled ? '#9C7C43' : '#C79A5C';
  const burgerColor = scrolled ? '#27221B' : '#F4EDDE';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:!translate-y-0 ${
        mobileOpen || !hidden ? "translate-y-0" : "-translate-y-full"
      }`}
      style={bgStyle}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <a href="#inicio" className="flex items-center gap-3 select-none outline-none focus:outline-none focus-visible:outline-none" aria-label="Início">
          <span className="font-display font-semibold leading-none" style={{ fontSize: 26 }}>
            <span style={{ color: brandKColor }}>K</span>
            <span style={{ color: brandNColor }}>N</span>
          </span>
          <div className="flex flex-col">
            <span className="font-display text-[16px] font-semibold leading-tight" style={{ color: brandNameColor }}>
              Dra. Kelly Neisse
            </span>
            <span className="font-label text-[10px] tracking-[0.14em] uppercase mt-0.5" style={{ color: brandSubColor }}>
              Médica Perita Judicial
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className="font-label text-[13px] font-medium relative pb-1.5 transition-colors"
                style={{ color: isActive ? navLinkActive : navLinkColor }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = navLinkActive; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = navLinkColor; }}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: navActiveUnderline }} />
                )}
              </a>
            );
          })}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — menu"
            className="btn-wa inline-flex items-center gap-2 text-white font-label text-[13px] font-semibold px-[18px] py-[11px] rounded-md"
          >
            <WhatsAppIcon size={16} />
            Analisar caso
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          style={{ color: burgerColor }}
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
          className="lg:hidden px-6 pb-6 pt-2 space-y-1 flex flex-col"
          style={{
            backgroundColor: 'rgba(241,235,222,0.98)',
            backdropFilter: 'blur(14px)',
            borderTop: '1px solid rgba(39,34,27,0.12)',
          }}
          aria-label="Navegação mobile"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block font-label text-[15px] py-3.5 min-h-[44px] flex items-center"
              style={{ color: '#6B6358', borderBottom: '1px solid rgba(39,34,27,0.08)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp — menu mobile"
            className="btn-wa inline-flex items-center gap-2 text-white font-label text-sm font-semibold px-5 py-3 rounded-md w-full justify-center mt-2"
          >
            <WhatsAppIcon size={16} />
            Analisar caso
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
