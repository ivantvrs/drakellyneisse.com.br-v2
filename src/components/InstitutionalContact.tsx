import { useInView } from "@/hooks/useInView";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/da16a3e0-467d-43f7-8bb6-3a76bb87ded3";

const InstitutionalContact = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="contato"
      className="relative overflow-hidden"
      style={{
        padding: '88px 0',
        background: 'radial-gradient(circle at 16% 12%, rgba(255,255,255,.05) 0, rgba(255,255,255,.02) 18%, transparent 42%), radial-gradient(circle at 80% 8%, rgba(176,141,87,.13) 0, transparent 38%), linear-gradient(135deg,#0e0d0b 0%,#221f1b 54%,#0c0b09 100%)',
        color: '#ECE5D6',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
        opacity: 0.10,
        zIndex: 0,
      }} />

      <div ref={ref} className={`container mx-auto max-w-[700px] text-center relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] font-bold mb-7" style={{ color: '#C79A5C' }}>
          Contato institucional
        </h2>

        <p className="font-display text-lg md:text-xl font-semibold" style={{ color: '#F4EDDE' }}>Dra. Kelly Jaqueline Neisse</p>
        <p className="font-label text-[13px] mt-1.5 mb-1" style={{ color: '#9D9485' }}>Médica Perita Judicial · CRM/MG 109153</p>
        <p className="text-[14px] mt-3 mb-1" style={{ color: '#9D9485' }}>
          Atendimento em todo o Brasil, presencial ou remoto
        </p>
        <p className="text-[12px] mb-10" style={{ color: '#7d7567' }}>
          Sede em Uberlândia/MG
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-9 flex-wrap mb-10" style={{ color: '#9D9485' }}>
          <a
            href="https://drakellyneisse.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14.5px] transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F4EDDE'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9D9485'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79A5C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            drakellyneisse.com.br
          </a>
          <a
            href="mailto:contato@drakellyneisse.com.br"
            className="inline-flex items-center gap-2 text-[14.5px] transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F4EDDE'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9D9485'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79A5C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/>
            </svg>
            contato@drakellyneisse.com.br
          </a>
          <a
            href="tel:+5534996878758"
            className="inline-flex items-center gap-2 text-[14.5px] transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F4EDDE'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#9D9485'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C79A5C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            (34) 9 9687-8758
          </a>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com a Dra. Kelly no WhatsApp — contato"
          className="btn-wa inline-flex items-center justify-center gap-2 text-white font-label text-sm font-semibold px-8 py-4 rounded-md"
        >
          <WhatsAppIcon size={19} />
          Falar com a Dra. Kelly no WhatsApp →
        </a>
      </div>
    </section>
  );
};

export default InstitutionalContact;
