import { Fragment, useState } from "react";
import { Scale, Gavel, FileText, ListChecks, Stethoscope, SearchCheck, Receipt, Check, Landmark } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

// BLOCO comparativo "Perito do juízo × Assistente técnico". Educativo: resolve a dúvida real de quem
// cai na página (o empresário que não sabia o que era AT). Anti-plágio: o concorrente compara
// "Especialista Clínico × Legista" (dois tipos de médico); a nossa compara Perito × AT.
// CFM-safe: NÃO depreciar o perito (a própria Dra. Kelly atua como perita em outros processos) — a
// coluna do perito é NEUTRA (sem X vermelho, marcador cinza discreto); só a coluna da AT recebe o
// acento dourado. As respostas-chave da AT (key:true) ganham check refinado + peso maior.
type Criterio = { crit: string; Icon: LucideIcon; perito: string; at: string; key: boolean };

const criterios: Criterio[] = [
  { crit: "Quem indica", Icon: Gavel, perito: "Nomeado pelo juiz", at: "Contratado por você (a parte)", key: false },
  { crit: "Trabalha a favor de", Icon: Scale, perito: "Ninguém, responde ao juízo", at: "Do seu lado", key: true },
  { crit: "Produz o laudo oficial", Icon: FileText, perito: "Sim", at: "Não, analisa e rebate esse laudo", key: false },
  { crit: "Formula quesitos pela sua tese", Icon: ListChecks, perito: "Não", at: "Sim", key: true },
  { crit: "Acompanha o exame ao seu lado", Icon: Stethoscope, perito: "Não", at: "Sim", key: true },
  { crit: "Aponta erros e vícios do laudo", Icon: SearchCheck, perito: "Não é função dele", at: "Sim, impugnação fundamentada", key: true },
  { crit: "Honorários", Icon: Receipt, perito: "Fixados pelo juízo", at: "Contratação particular da parte", key: false },
];

const selos = ["Leitura técnica qualificada", "Atuação ao lado da empresa", "Impugnação fundamentada"];

const KellyMark = ({ keyRow }: { keyRow: boolean }) =>
  keyRow ? (
    <span className="atc-mk-check" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
  ) : (
    <span className="atc-mk-dot" aria-hidden="true" />
  );

const styleBlock = `
  .atc { max-width: 980px; margin: 0 auto; }

  /* Tabela semântica p/ leitores de tela e crawlers/LLMs (os grids visuais ficam aria-hidden).
     Mesma informação do comparativo, agora em <table> extraível — NÃO altera o layout visual. */
  .atc-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

  /* ───────── container-cartão elevado (desktop) ───────── */
  .atc-board { position: relative; border-radius: 22px; padding: 16px;
    background: linear-gradient(168deg, #FCF7EE 0%, #F5EEE0 100%);
    border: 1px solid rgba(184,135,58,0.2);
    box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset, 0 34px 64px -34px rgba(60,44,20,0.3), 0 4px 10px -6px rgba(60,44,20,0.08); }
  .atc-grid { position: relative; display: grid;
    grid-template-columns: minmax(0,1.3fr) minmax(0,1fr) minmax(0,1.22fr); }

  /* painel da coluna destacada (Dra. Kelly) — champagne elevado com glow */
  .atc-featured { grid-column: 3; grid-row: 1 / -1; z-index: 0; border-radius: 16px;
    background: linear-gradient(180deg, rgba(212,168,83,0.20) 0%, rgba(184,135,58,0.09) 42%, rgba(184,135,58,0.06) 100%);
    border: 1px solid rgba(184,135,58,0.4);
    box-shadow: 0 22px 50px -26px rgba(184,135,58,0.6), 0 0 0 1px rgba(255,255,255,0.4) inset; }
  .atc-featured::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 60%; border-radius: 16px 16px 40% 40%;
    background: radial-gradient(120% 80% at 50% 0%, rgba(255,247,231,0.55), transparent 70%); pointer-events: none; }

  /* ───────── cabeçalho ───────── */
  .atc-h { position: relative; z-index: 1; padding: 22px 20px 16px; align-self: end; }
  /* divisor sutil crit|perito (a borda do featured marca perito|Kelly) */
  .atc-h-perito, .atc-c-perito { border-left: 1px solid rgba(184,135,58,0.12); }
  .atc-h-perito { display: flex; align-items: center; gap: 8px; font-family: var(--font-label);
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #8A8170; }
  .atc-h-perito svg { color: #ABA08A; }
  .atc-h-kelly { padding-top: 30px; text-align: left; }
  .atc-h-kelly-title { display: block; font-family: var(--font-display); font-size: 17px; font-weight: 700; color: #3A2C10; letter-spacing: -0.01em; line-height: 1.1; }
  .atc-h-kelly-name { display: block; font-family: var(--font-label); font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: #B8873A; margin-top: 3px; }
  .atc-badge { position: absolute; top: -13px; left: 20px; display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 13px; border-radius: 999px; font-family: var(--font-label); font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; color: #fff;
    background: linear-gradient(180deg, #C9A35C, #B8873A);
    box-shadow: 0 8px 18px -8px rgba(184,135,58,0.7), 0 0 0 3px rgba(252,247,238,0.9); }
  .atc-badge-dot { width: 5px; height: 5px; border-radius: 999px; background: #fff; box-shadow: 0 0 6px rgba(255,255,255,0.8); }

  /* ───────── células ───────── */
  .atc-c { position: relative; z-index: 1; padding: 16px 20px; display: flex; align-items: center;
    border-top: 1px solid rgba(184,135,58,0.14); transition: background .22s ease; }
  .atc-c-crit { font-family: var(--font-label); font-weight: 600; font-size: 14px; color: #2F2C25; gap: 11px; }
  .atc-c-crit svg { flex-shrink: 0; color: #B8873A; opacity: 0.85; transition: transform .22s ease; }
  .atc-c-perito { font-size: 14px; color: #6B6358; gap: 11px; }
  .atc-mk-perito { flex-shrink: 0; width: 6px; height: 6px; border-radius: 999px; background: #C6BDAB; }
  .atc-c-kelly { font-size: 14px; font-weight: 600; color: #7A5418; gap: 0; }
  .atc-c-kelly.is-key { font-weight: 700; color: #6A4810; }
  .atc-c-kelly > span:last-child { display: inline-flex; align-items: center; }
  .atc-mk-check { flex-shrink: 0; width: 21px; height: 21px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
    color: #fff; margin-right: 11px; background: linear-gradient(180deg, #C9A35C, #B8873A);
    box-shadow: 0 3px 8px -2px rgba(184,135,58,0.6), inset 0 1px 0 rgba(255,255,255,0.4); }
  .atc-mk-dot { flex-shrink: 0; width: 7px; height: 7px; border-radius: 999px; background: #B8873A;
    box-shadow: 0 0 7px rgba(184,135,58,0.55); margin: 0 13px 0 7px; }

  /* hover de linha (battle-row) — reage ao mouse no desktop */
  .atc-c.is-hover { background: rgba(184,135,58,0.06); }
  .atc-c-kelly.is-hover { background: rgba(184,135,58,0.12); }
  .atc-c-crit.is-hover svg { transform: translateX(2px); }

  /* ───────── mobile — cada critério vira um card ───────── */
  .atc-mobile { display: none; }
  @media (max-width: 767px) {
    .atc-desktop { display: none; }
    .atc-mobile { display: flex; flex-direction: column; gap: 16px; }
    .atc-mcard { border-radius: 18px; padding: 18px 16px 16px;
      background: linear-gradient(168deg, #FCF8F0, #F4EDDF); border: 1px solid rgba(184,135,58,0.2);
      box-shadow: 0 18px 36px -24px rgba(60,44,20,0.3); }
    .atc-mcrit { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); font-weight: 700;
      font-size: 16px; color: #1F252B; margin-bottom: 14px; }
    .atc-mcrit svg { flex-shrink: 0; color: #B8873A; }
    .atc-mblock { border-radius: 12px; padding: 11px 14px; }
    .atc-mblock + .atc-mblock { margin-top: 9px; }
    .atc-mblock-perito { background: rgba(120,108,86,0.06); border: 1px solid rgba(120,108,86,0.12); }
    .atc-mblock-kelly { background: linear-gradient(180deg, rgba(212,168,83,0.18), rgba(184,135,58,0.08));
      border: 1px solid rgba(184,135,58,0.4); box-shadow: 0 10px 22px -14px rgba(184,135,58,0.5); }
    .atc-mlabel { display: flex; align-items: center; gap: 7px; font-family: var(--font-label); font-size: 10px; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 4px; }
    .atc-mlabel-perito { color: #9C9384; }
    .atc-mlabel-kelly { color: #B8873A; }
    .atc-mval { font-size: 14.5px; line-height: 1.4; color: #6B6358; }
    .atc-mval-kelly { color: #6A4810; font-weight: 600; }
    .atc-mval-kelly.is-key { font-weight: 700; }
    .atc-mlabel-kelly .atc-mk-dot, .atc-mlabel-kelly .atc-mk-check { margin: 0; }
    .atc-mk-check-sm { width: 16px; height: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .atc-c, .atc-c-crit svg { transition: none; }
  }
`;

const AtComparativo = () => {
  const { ref, isVisible } = useInView();
  const [hover, setHover] = useState(-1);

  return (
    <section
      id="entenda-a-diferenca"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(46% 40% at 22% 18%, rgba(201,163,92,0.10) 0, transparent 56%)," +
          "radial-gradient(54% 50% at 100% 100%, rgba(184,135,58,0.06) 0, transparent 60%)," +
          "linear-gradient(165deg, #F3EBDB 0%, #EDE3D2 55%, #E8DDCB 100%)",
      }}
    >
      {/* textura leve de documento */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background: "repeating-linear-gradient(135deg, rgba(120,90,40,0.018) 0px, rgba(120,90,40,0.018) 1px, transparent 1px, transparent 8px)",
        }}
      />

      <style>{styleBlock}</style>

      <div ref={ref} className={`container mx-auto relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* topo — eyebrow + headline */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <span style={{ width: 30, height: 1, background: "linear-gradient(90deg, transparent, #B8873A)" }} />
            <span style={{ color: "#B8873A" }}><Scale size={22} strokeWidth={1.6} /></span>
            <span style={{ width: 30, height: 1, background: "linear-gradient(90deg, #B8873A, transparent)" }} />
          </div>
          <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#B8873A" }}>
            Entenda a diferença
          </p>
          <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.4rem] font-bold leading-[1.1]" style={{ color: "#1F252B", letterSpacing: "-0.02em" }}>
            Perito do juízo e assistente técnico{" "}
            <em className="italic" style={{ color: "#B8873A" }}>não são a mesma coisa</em>
          </h2>
        </div>

        <div className="atc">
          {/* ═══════ Tabela acessível/extraível (SEO/GEO) — espelha o comparativo; visualmente oculta.
              Os grids visuais abaixo recebem aria-hidden p/ não duplicar conteúdo p/ o leitor de tela. ═══════ */}
          <table className="atc-sr">
            <caption>Perito do juízo e assistente técnico (Dra. Kelly Neisse): comparativo de papéis na perícia judicial</caption>
            <thead>
              <tr>
                <th scope="col">Critério</th>
                <th scope="col">Perito do juízo</th>
                <th scope="col">Assistente técnico (Dra. Kelly)</th>
              </tr>
            </thead>
            <tbody>
              {criterios.map((row) => (
                <tr key={row.crit}>
                  <th scope="row">{row.crit}</th>
                  <td>{row.perito}</td>
                  <td>{row.at}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ═══════ DESKTOP — board com coluna Kelly em destaque ═══════ */}
          <div className="atc-board atc-desktop" aria-hidden="true" onMouseLeave={() => setHover(-1)}>
            <div className="atc-grid">
              {/* painel da coluna destacada (atrás das células Kelly) */}
              <div className="atc-featured" aria-hidden="true" />

              {/* cabeçalho */}
              <div className="atc-h" style={{ gridColumn: 1, gridRow: 1 }} aria-hidden="true" />
              <div className="atc-h atc-h-perito" style={{ gridColumn: 2, gridRow: 1 }}>
                <Landmark size={15} strokeWidth={1.8} aria-hidden="true" />
                Perito do juízo
              </div>
              <div className="atc-h atc-h-kelly" style={{ gridColumn: 3, gridRow: 1 }}>
                <span className="atc-badge">
                  <span className="atc-badge-dot" aria-hidden="true" />
                  Ao seu lado
                </span>
                <span className="atc-h-kelly-title">Assistente técnico</span>
                <span className="atc-h-kelly-name">Dra. Kelly</span>
              </div>

              {/* linhas */}
              {criterios.map((row, i) => {
                const r = i + 2;
                const hv = hover === r ? " is-hover" : "";
                return (
                  <Fragment key={row.crit}>
                    <div className={`atc-c atc-c-crit${hv}`} style={{ gridColumn: 1, gridRow: r }} onMouseEnter={() => setHover(r)}>
                      <row.Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                      {row.crit}
                    </div>
                    <div className={`atc-c atc-c-perito${hv}`} style={{ gridColumn: 2, gridRow: r }} onMouseEnter={() => setHover(r)}>
                      <span className="atc-mk-perito" aria-hidden="true" />
                      {row.perito}
                    </div>
                    <div className={`atc-c atc-c-kelly${row.key ? " is-key" : ""}${hv}`} style={{ gridColumn: 3, gridRow: r }} onMouseEnter={() => setHover(r)}>
                      <KellyMark keyRow={row.key} />
                      <span>{row.at}</span>
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>

          {/* ═══════ MOBILE — cada critério vira um card ═══════ */}
          <div className="atc-mobile" aria-hidden="true">
            {criterios.map((row) => (
              <div key={row.crit} className="atc-mcard">
                <p className="atc-mcrit">
                  <row.Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                  {row.crit}
                </p>
                <div className="atc-mblock atc-mblock-perito">
                  <span className="atc-mlabel atc-mlabel-perito">
                    <Landmark size={12} strokeWidth={1.8} aria-hidden="true" />
                    Perito do juízo
                  </span>
                  <span className="atc-mval">{row.perito}</span>
                </div>
                <div className="atc-mblock atc-mblock-kelly">
                  <span className="atc-mlabel atc-mlabel-kelly">
                    <KellyMark keyRow={row.key} />
                    Dra. Kelly · ao seu lado
                  </span>
                  <span className={`atc-mval atc-mval-kelly${row.key ? " is-key" : ""}`}>{row.at}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* callout-resumo premium — CFM-safe (NÃO desmerecer o perito) */}
        <div
          className="relative max-w-2xl mx-auto mt-12 text-center"
          style={{
            borderRadius: 16,
            padding: "22px 26px",
            background: "linear-gradient(180deg, rgba(184,135,58,0.10), rgba(184,135,58,0.04))",
            border: "1px solid rgba(184,135,58,0.26)",
          }}
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center mb-3"
            style={{ width: 34, height: 34, borderRadius: 999, color: "#B8873A", background: "rgba(184,135,58,0.12)", border: "1px solid rgba(184,135,58,0.32)" }}
          >
            <Scale size={17} strokeWidth={1.8} />
          </span>
          <p className="text-[14.5px] leading-relaxed" style={{ color: "#5E5644" }}>
            O perito é imparcial e necessário ao processo. O assistente técnico não disputa com ele:{" "}
            <strong style={{ color: "#3A2C10", fontWeight: 700 }}>complementa</strong>, garantindo que a sua tese tenha leitura médica qualificada.
          </p>
        </div>

        {/* mini selos de apoio */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
          {selos.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-2 font-label"
              style={{
                fontSize: 12, fontWeight: 600, letterSpacing: "0.01em", color: "#7A6A4A",
                padding: "8px 14px", borderRadius: 999,
                background: "rgba(255,251,244,0.55)", border: "1px solid rgba(184,135,58,0.32)",
                boxShadow: "0 6px 16px -10px rgba(60,44,20,0.4)",
              }}
            >
              <span aria-hidden="true" style={{ display: "inline-flex", color: "#B8873A" }}><Check size={14} strokeWidth={2.6} /></span>
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtComparativo;
