import { MapPin, Phone, Globe, Mail } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const InstitutionalContact = () => {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20" style={{ backgroundColor: '#0F0F0F' }}>
      <div ref={ref} className={`container mx-auto max-w-3xl text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] font-bold mb-10" style={{ color: '#D4A853' }}>Contato institucional</h2>

        <p className="font-display text-lg font-semibold" style={{ color: '#F5F0E8' }}>Dra. Kelly Jaqueline Neisse</p>
        <p className="font-label text-sm mt-1 mb-1" style={{ color: '#8A857A' }}>Médica Perita Judicial · CRM/MG 109153</p>
        <p className="text-xs mb-10" style={{ color: '#8A857A' }}>
          TRT-3 · TJMG · TJMT · TJSP
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm flex-wrap" style={{ color: '#A09A8D' }}>
          <a
            href="https://pericia.drakellyneisse.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
          >
            <Globe size={15} style={{ color: '#D4A853' }} />
            pericia.drakellyneisse.com.br
          </a>
          <a
            href="mailto:contato@drakellyneisse.com.br"
            className="inline-flex items-center gap-2 transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
          >
            <Mail size={15} style={{ color: '#D4A853' }} />
            contato@drakellyneisse.com.br
          </a>
          <a
            href="tel:+5534996878758"
            className="inline-flex items-center gap-2 transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F5F0E8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A09A8D'; }}
          >
            <Phone size={15} style={{ color: '#D4A853' }} />
            (34) 9 9687-8758
          </a>
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} style={{ color: '#D4A853' }} />
            Uberlândia/MG
          </span>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalContact;
