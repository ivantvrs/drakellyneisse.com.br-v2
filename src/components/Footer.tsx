const Footer = () => (
  <footer
    className="relative overflow-hidden"
    aria-label="Rodapé"
    style={{
      borderTop: '1px solid rgba(191,160,104,0.16)',
      padding: '46px 0 40px',
      background: 'linear-gradient(135deg,#0e0d0b 0%,#221f1b 54%,#0c0b09 100%)',
    }}
  >
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start flex-wrap">
        <div>
          <p className="font-display text-[17px] font-semibold" style={{ color: '#F4EDDE' }}>
            Dra. Kelly Jaqueline Neisse
          </p>
          <p className="font-label text-[12px] mt-1" style={{ color: '#9D9485' }}>
            Médica Perita Judicial · CRM/MG 109153
          </p>
          <p className="text-[12px] mt-2.5 leading-[1.7]" style={{ color: '#8d8474' }}>
            Assistência técnica médica em perícia trabalhista<br />
            drakellyneisse.com.br · contato@drakellyneisse.com.br · (34) 9 9687-8758<br />
            Sede em Uberlândia/MG · Atendimento em todo o Brasil (presencial e remoto)
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://drakellyneisse.com.br/politica-de-privacidade/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] transition-colors"
            style={{ color: '#8d8474' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#D8C49A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8d8474'; }}
          >
            Política de Privacidade
          </a>
          <a
            href="https://drakellyneisse.com.br/termos-de-uso/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12.5px] transition-colors"
            style={{ color: '#8d8474' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#D8C49A'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8d8474'; }}
          >
            Termos de Uso
          </a>
        </div>
      </div>

      <div className="mt-9 pt-6 text-center" style={{ borderTop: '1px solid rgba(191,160,104,0.14)' }}>
        <p className="text-[12px]" style={{ color: '#7d7567' }}>
          © 2026 Dra. Kelly Jaqueline Neisse. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
