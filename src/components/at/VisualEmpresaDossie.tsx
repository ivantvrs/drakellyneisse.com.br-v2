// VisualEmpresaDossie — capa do laudo pericial KN: pilha de papéis + folha de rosto
// (faixa charcoal · monograma KN · linha gold · título · tabela de processo ·
//  assinatura da Dra. Kelly) + carimbo CRM + estetoscópio clássico + chips flutuantes.
//
// Identidade visual fiel ao documento entregue (Sistema KN / Dra. Kelly Neisse):
//   charcoal #2C2C2C · gold #B08D57 · goldDark #8B6914 · goldLight #F0E6CC
//   ivory #FAFAF7 · stone #E8E4DC · slate #6B6B6B · obsidian #1A1A1A
//   Georgia (títulos) · Arial (labels) · Courier New (nº do processo) · Allura (assinatura)
//
// Requer a fonte "Allura" (Google Fonts) para a assinatura cursiva. O @import já está
// embutido no <style>; caso a landing já carregue fontes via <head>, pode-se remover.
//
// CSS namespeado em .kn-* (não .emp-*) para não colidir com o empStyleBlock da SecaoEmpresa.

// Ícones de linha com tema jurídico/pericial — um por chip.
const IcoBalanca = () => (
  <svg className="kn-ic" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4 V20" /><path d="M8.5 20.5 H15.5" /><path d="M5 8 H19" />
    <circle cx="12" cy="4" r="1" fill="#B08D57" stroke="none" />
    <path d="M5 8 L3 13" /><path d="M5 8 L7 13" /><path d="M2.4 13 A2.6 2.6 0 0 0 7.6 13" />
    <path d="M19 8 L17 13" /><path d="M19 8 L21 13" /><path d="M16.4 13 A2.6 2.6 0 0 0 21.6 13" />
  </svg>
);
const IcoColuna = () => (
  <svg className="kn-ic" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6.5 H20" /><path d="M5.5 9 H18.5" />
    <path d="M8 9 V17" /><path d="M12 9 V17" /><path d="M16 9 V17" />
    <path d="M5.5 17 H18.5" /><path d="M4 19.5 H20" />
  </svg>
);
const IcoMartelo = () => (
  <svg className="kn-ic" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="4" y="6" width="8" height="4.5" rx="1.2" transform="rotate(-45 8 8.25)" />
    <line x1="6.2" y1="10" x2="13" y2="16.8" />
    <rect x="12.5" y="18.5" width="8.5" height="2.6" rx="1.1" />
  </svg>
);
const IcoDocumento = () => (
  <svg className="kn-ic" viewBox="0 0 24 24" fill="none" stroke="#B08D57" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3.5 H14 L18 7.5 V20.5 H6 Z" /><path d="M14 3.5 V7.5 H18" />
    <line x1="8.5" y1="11" x2="15.5" y2="11" /><line x1="8.5" y1="13.5" x2="15.5" y2="13.5" /><line x1="8.5" y1="16" x2="12.5" y2="16" />
  </svg>
);

const empresaChips: { label: string; Icon: () => JSX.Element }[] = [
  { label: "Nexo causal", Icon: IcoBalanca },
  { label: "Concausa", Icon: IcoColuna },
  { label: "Impugnação", Icon: IcoMartelo },
  { label: "Laudo pericial", Icon: IcoDocumento },
];

// Estetoscópio clássico (headset prateado → tubo de borracha em laço → auscultador).
// Recriado a partir do estilo enviado pelo cliente. Posicionado FORA da assinatura.
const Estetoscopio = ({ width = 150 }: { width?: number }) => (
  <svg width={width} height={(width * 250) / 220} viewBox="0 0 220 250" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="knSil" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#9A958B" />
        <stop offset="0.35" stopColor="#E8E4DC" />
        <stop offset="0.6" stopColor="#C9C3B7" />
        <stop offset="1" stopColor="#6E6A61" />
      </linearGradient>
      <radialGradient id="knDru" cx="0.38" cy="0.32" r="0.85">
        <stop offset="0" stopColor="#EFEBE2" />
        <stop offset="0.4" stopColor="#C6C0B4" />
        <stop offset="0.75" stopColor="#8C877D" />
        <stop offset="1" stopColor="#5A564E" />
      </radialGradient>
      <linearGradient id="knRub" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#55524C" />
        <stop offset="0.5" stopColor="#3A3733" />
        <stop offset="1" stopColor="#26241F" />
      </linearGradient>
    </defs>
    {/* tubo de borracha — junção → laço → auscultador */}
    <path d="M99 150 C 95 182 60 188 64 212 C 67 234 104 240 122 224 C 138 210 128 188 108 192 C 92 195 92 214 110 220 C 140 230 168 214 182 182 L 188 168"
      fill="none" stroke="url(#knRub)" strokeWidth="13" strokeLinecap="round" />
    {/* hastes auriculares prateadas */}
    <path d="M72 18 C 38 30 22 84 36 130 C 46 162 82 168 99 150" fill="none" stroke="url(#knSil)" strokeWidth="9" strokeLinecap="round" />
    <path d="M126 18 C 160 30 176 84 162 130 C 152 162 116 168 99 150" fill="none" stroke="url(#knSil)" strokeWidth="9" strokeLinecap="round" />
    {/* colares + junção em Y */}
    <circle cx="42" cy="132" r="7" fill="url(#knRub)" />
    <circle cx="156" cy="132" r="7" fill="url(#knRub)" />
    <circle cx="99" cy="150" r="8" fill="url(#knRub)" />
    {/* olivas auriculares */}
    <ellipse cx="70" cy="15" rx="9" ry="7" fill="#2C2A26" transform="rotate(-20 70 15)" />
    <ellipse cx="128" cy="15" rx="9" ry="7" fill="#2C2A26" transform="rotate(20 128 15)" />
    {/* auscultador (chestpiece) */}
    <circle cx="190" cy="150" r="24" fill="url(#knDru)" stroke="#7C766B" strokeWidth="2" />
    <circle cx="190" cy="150" r="14" fill="#3A3733" stroke="#9A958B" strokeWidth="2.5" />
    <circle cx="190" cy="150" r="8" fill="#4A463F" />
  </svg>
);

const dossieStyle = `
  /* Fonte Allura (assinatura cursiva, abaixo da dobra) é carregada de forma NÃO-bloqueante
     no <head> do at.html — antes este @import era render-blocking e travava o FCP/LCP. */
  .kn-stage { --kn-c:#2C2C2C; --kn-ob:#1A1A1A; --kn-g:#B08D57; --kn-gd:#8B6914; --kn-gl:#F0E6CC;
    --kn-iv:#FAFAF7; --kn-st:#E8E4DC; --kn-sl:#6B6B6B;
    --kn-fd: var(--font-display, Georgia, "Times New Roman", serif);
    --kn-fl: var(--font-label, "Helvetica Neue", Arial, sans-serif);
    --kn-fm: var(--font-mono, "Courier New", monospace);
    --kn-fc: "Allura", "Brush Script MT", cursive;
    position: relative; width: 100%; max-width: 460px; aspect-ratio: 1 / 1.12; min-height: 380px; }

  .kn-surface { position: absolute; inset: 0; border-radius: 18px; overflow: hidden;
    background:
      radial-gradient(120% 85% at 100% 0%, rgba(176,141,87,0.20), transparent 56%),
      radial-gradient(80% 70% at 0% 100%, rgba(44,44,44,0.06), transparent 60%),
      linear-gradient(160deg, #FDFCF9 0%, #F1EEE6 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -42px 72px -42px rgba(44,44,44,0.18); }
  .kn-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.05; mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }

  .kn-sheet { position: absolute; border-radius: 4px;
    box-shadow: 0 1px 2px rgba(44,44,44,0.08), 0 20px 36px -18px rgba(44,44,44,0.34), 0 52px 72px -50px rgba(44,44,44,0.42); }
  .kn-sheet-back { top: 8%; left: 5%; right: 16%; bottom: 14%; transform: rotate(-4deg); opacity: 0.9;
    background: linear-gradient(177deg, #F8F5EE, #ECE7DB); }
  .kn-sheet-mid { top: 11%; left: 14%; right: 4%; bottom: 7%; transform: rotate(3.2deg);
    background: linear-gradient(177deg, #FCFAF4, #F0ECE0); }
  .kn-sheet-front { top: 5%; left: 8%; right: 8%; bottom: 7%; transform: rotate(-0.8deg); overflow: hidden;
    background: #FFFFFF; }

  .kn-doc { height: 100%; display: flex; flex-direction: column; }
  .kn-band-top { height: 12px; background: var(--kn-c); }
  .kn-band-bottom { margin-top: auto; }
  .kn-band-bottom-c { height: 11px; background: var(--kn-c); }
  .kn-band-bottom-g { height: 5px; background: var(--kn-g); }

  .kn-body { flex: 1; display: flex; flex-direction: column; padding: clamp(15px, 4.6%, 22px) clamp(16px, 5%, 24px) 0; min-height: 0; }

  .kn-logo { display: flex; align-items: center; justify-content: center; gap: 9px; }
  .kn-mono { font-family: var(--kn-fd); font-weight: 700; font-size: clamp(26px, 9vw, 34px); line-height: 0.9;
    color: var(--kn-c); letter-spacing: -0.04em; }
  .kn-word { display: flex; flex-direction: column; border-left: 1.5px solid rgba(176,141,87,0.5); padding-left: 9px; }
  .kn-word-1 { font-family: var(--kn-fl); font-weight: 800; font-size: 9.5px; letter-spacing: 0.06em; color: var(--kn-c); line-height: 1.1; }
  .kn-word-2 { font-family: var(--kn-fl); font-weight: 600; font-size: 7px; letter-spacing: 0.28em; color: var(--kn-g); margin-top: 2px; }

  .kn-rule { display: block; height: 2px; margin: 13px 0 9px; border-radius: 2px;
    background: linear-gradient(90deg, var(--kn-g) 0%, rgba(176,141,87,0.12) 100%); }
  .kn-rule-thin { display: block; height: 1px; margin: 9px 0; background: rgba(176,141,87,0.45); }

  .kn-title { font-family: var(--kn-fl); font-weight: 800; font-size: clamp(13px, 4.4vw, 16px); letter-spacing: 0.07em;
    text-align: center; color: var(--kn-c); line-height: 1.12; margin: 0; }
  .kn-subtitle { font-family: var(--kn-fd); font-style: italic; font-size: 9.5px; letter-spacing: 0.02em;
    text-align: center; color: var(--kn-sl); margin: 3px 0 0; }

  .kn-table { display: flex; flex-direction: column; border: 1px solid var(--kn-st); border-radius: 3px; overflow: hidden; }
  .kn-row { display: flex; border-top: 1px solid var(--kn-st); }
  .kn-row:first-child { border-top: none; }
  .kn-row-label { flex: 0 0 38%; padding: 5px 9px; background: var(--kn-gl); border-left: 2px solid var(--kn-g);
    font-family: var(--kn-fl); font-weight: 700; font-size: 7.5px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--kn-gd);
    display: flex; align-items: center; }
  .kn-row-value { flex: 1; padding: 5px 10px; background: #FFFFFF;
    font-family: var(--kn-fd); font-size: 9px; color: var(--kn-ob); display: flex; align-items: center;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .kn-row:nth-child(even) .kn-row-value { background: var(--kn-iv); }
  .kn-row-value.mono { font-family: var(--kn-fm); letter-spacing: -0.02em; }

  .kn-object { position: relative; display: flex; align-items: center; margin-top: 11px; }
  .kn-object-hl { position: absolute; left: -3px; right: 8%; top: 50%; transform: translateY(-50%) rotate(-0.5deg);
    height: 14px; border-radius: 3px; background: linear-gradient(90deg, rgba(176,141,87,0.42), rgba(176,141,87,0.16)); }
  .kn-object-text { position: relative; font-family: var(--kn-fd); font-size: 9.5px; font-weight: 600; color: var(--kn-c); }

  /* assinatura cursiva da perita */
  .kn-sign { margin-top: auto; padding: 10px 0 12px; }
  .kn-sign-cursive { display: block; font-family: var(--kn-fc); font-size: 34px; line-height: 0.8; color: var(--kn-c); }
  .kn-sign-flourish { display: block; width: 150px; height: 12px; margin: -2px 0 4px; }
  .kn-sign-name { font-family: var(--kn-fd); font-weight: 700; font-size: 12px; color: var(--kn-c); margin: 0; }
  .kn-sign-role { font-family: var(--kn-fl); font-size: 7.5px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--kn-sl); margin: 3px 0 0; }
  .kn-sign-web { font-family: var(--kn-fl); font-size: 7.5px; letter-spacing: 0.03em; color: var(--kn-g); margin: 2px 0 0; }

  /* carimbo CRM circular */
  .kn-stamp { position: absolute; right: 16px; bottom: 54px; width: 66px; height: 66px; border-radius: 50%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 2px solid rgba(122,84,24,0.45); color: rgba(122,84,24,0.72);
    transform: rotate(-12deg); opacity: 0.72; mix-blend-mode: multiply; }
  .kn-stamp-ring { position: absolute; inset: 5px; border-radius: 50%; border: 1px dashed rgba(122,84,24,0.4); }
  .kn-stamp-text { font-family: var(--kn-fl); font-size: 6.5px; font-weight: 700; letter-spacing: 0.1em; }

  /* estetoscópio — canto superior esquerdo, sobre a pilha de papéis */
  .kn-steth { position: absolute; top: -5%; left: -7%; z-index: 6; transform: rotate(-14deg);
    filter: drop-shadow(0 12px 16px rgba(40,32,18,0.3)); }

  /* chips flutuantes em vidro fosco */
  .kn-chip { position: absolute; z-index: 7; display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 11px;
    background: rgba(255,253,249,0.62); -webkit-backdrop-filter: blur(10px) saturate(1.2); backdrop-filter: blur(10px) saturate(1.2);
    border: 1px solid rgba(176,141,87,0.45);
    box-shadow: 0 12px 26px -14px rgba(44,44,44,0.5), inset 0 1px 0 rgba(255,255,255,0.7);
    font-family: var(--kn-fl); font-size: 11px; font-weight: 600; color: #4A3D28; letter-spacing: 0.01em; white-space: nowrap;
    animation: knFloat 6s ease-in-out infinite; }
  .kn-ic { width: 14px; height: 14px; flex-shrink: 0; }
  .kn-chip-1 { top: 6%; right: -4%; animation-delay: 0s; }
  .kn-chip-2 { top: 36%; right: -6%; animation-delay: 0.8s; }
  .kn-chip-3 { bottom: 15%; right: -3%; animation-delay: 1.6s; }
  .kn-chip-4 { bottom: 5%; left: -5%; animation-delay: 2.4s; }
  @keyframes knFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
  @media (prefers-reduced-motion: reduce) { .kn-chip { animation: none; } }
`;

const VisualEmpresaDossie = () => (
  <div className="kn-stage" aria-hidden="true">
    <style>{dossieStyle}</style>
    <div className="kn-surface">
      <div className="kn-grain" />
    </div>

    {/* pilha de papéis */}
    <div className="kn-sheet kn-sheet-back" />
    <div className="kn-sheet kn-sheet-mid" />

    {/* folha de rosto — capa do laudo pericial KN */}
    <div className="kn-sheet kn-sheet-front">
      <div className="kn-doc">
        <div className="kn-band-top" />

        <div className="kn-body">
          <div className="kn-logo">
            <span className="kn-mono">KN</span>
            <span className="kn-word">
              <span className="kn-word-1">DRª KELLY NEISSE</span>
              <span className="kn-word-2">PERÍCIAS MÉDICAS</span>
            </span>
          </div>

          <span className="kn-rule" />
          <p className="kn-title">LAUDO PERICIAL MÉDICO</p>
          <p className="kn-subtitle">Perícia Médica Judicial Trabalhista</p>
          <span className="kn-rule-thin" />

          <div className="kn-table">
            <div className="kn-row">
              <span className="kn-row-label">Periciado</span>
              <span className="kn-row-value">A. V. dos Santos</span>
            </div>
            <div className="kn-row">
              <span className="kn-row-label">Processo</span>
              <span className="kn-row-value mono">5056271-20.2025</span>
            </div>
            <div className="kn-row">
              <span className="kn-row-label">Reclamada</span>
              <span className="kn-row-value">Reclamatória · TRT-3</span>
            </div>
          </div>

          <div className="kn-object">
            <span className="kn-object-hl" />
            <span className="kn-object-text">Avaliação de nexo causal e concausa</span>
          </div>

          {/* assinatura da Dra. Kelly — cursiva + floreio dourado + nome impresso */}
          <div className="kn-sign">
            <span className="kn-sign-cursive">Drª Kelly Neisse</span>
            <svg className="kn-sign-flourish" viewBox="0 0 200 16" fill="none" aria-hidden="true">
              <path d="M4 9 C 54 2 120 2 168 7 C 182 8.5 192 4 197 9 C 193 12 186 11 181 9"
                stroke="#B08D57" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="kn-sign-name">Dra. Kelly Jaqueline Neisse</p>
            <p className="kn-sign-role">Médica Perita Judicial · CRM/MG 109153</p>
            <p className="kn-sign-web">pericia.drakellyneisse.com.br</p>
          </div>
        </div>

        <div className="kn-band-bottom">
          <div className="kn-band-bottom-c" />
          <div className="kn-band-bottom-g" />
        </div>
      </div>

      {/* carimbo médico (CRM) */}
      <span className="kn-stamp">
        <span className="kn-stamp-ring" />
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" stroke="rgba(122,84,24,0.74)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 5 C 6 5 6 9 6 12 C 6 18 10 21 14 21 C 18 21 22 18 22 12 C 22 9 22 5 19 5" />
          <path d="M14 21 V25 C14 28 17 28 20 28" />
          <circle cx="24" cy="26" r="3.2" />
          <circle cx="9" cy="5" r="1.4" fill="rgba(122,84,24,0.74)" stroke="none" />
          <circle cx="19" cy="5" r="1.4" fill="rgba(122,84,24,0.74)" stroke="none" />
        </svg>
        <span className="kn-stamp-text">CRM·MG</span>
        <span className="kn-stamp-text">109153</span>
      </span>
    </div>

    {/* estetoscópio — fora da assinatura, no canto superior esquerdo */}
    <span className="kn-steth">
      <Estetoscopio width={150} />
    </span>

    {/* chips flutuantes em vidro fosco — ícone jurídico por chip */}
    {empresaChips.map(({ label, Icon }, i) => (
      <span key={label} className={`kn-chip kn-chip-${i + 1}`}>
        <Icon />
        {label}
      </span>
    ))}
  </div>
);

export default VisualEmpresaDossie;
