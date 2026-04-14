const Footer = () => (
  <footer className="py-12" style={{ backgroundColor: '#1A1A1A' }} aria-label="Rodapé">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="text-center md:text-left">
          <p className="font-display text-base font-semibold" style={{ color: '#F5F0E8' }}>
            Dra. Kelly Jaqueline Neisse
          </p>
          <p className="font-label text-xs mt-1" style={{ color: '#A09A8D' }}>
            Médica Perita Judicial · CRM/MG 109153
          </p>
          <p className="text-xs mt-1" style={{ color: '#8A857A' }}>
            Perícia Médica
          </p>
          <p className="text-xs mt-2" style={{ color: '#8A857A' }}>
            pericia.drakellyneisse.com.br · contato@drakellyneisse.com.br · (34) 9 9687-8758
          </p>
          <p className="text-xs mt-1" style={{ color: '#A09A8D' }}>
            Atendimento Nacional · TRT-3 · TJMG · TJSP · TJMT · TJGO
          </p>
          <p className="text-[10px] mt-1" style={{ color: '#8A857A' }}>
            Sede administrativa: Uberlândia/MG
          </p>
        </div>

        <div className="flex gap-6 text-xs" style={{ color: '#8A857A' }}>
          <a
            href="https://pericia.drakellyneisse.com.br/politica-de-privacidade/"
            className="transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E8C77B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B665C'; }}
          >
            Política de Privacidade
          </a>
          <a
            href="https://pericia.drakellyneisse.com.br/termos-de-uso/"
            className="transition-colors"
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E8C77B'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#6B665C'; }}
          >
            Termos de Uso
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 text-center" style={{ borderTop: '1px solid rgba(212, 168, 83, 0.15)' }}>
        <p className="text-xs" style={{ color: '#8A857A' }}>
          © {new Date().getFullYear()} Dra. Kelly Jaqueline Neisse. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
