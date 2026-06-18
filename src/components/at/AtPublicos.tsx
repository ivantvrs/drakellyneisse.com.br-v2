import type { CSSProperties } from "react";
import { Clock, BadgeCheck, Target, Check } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { AT_WHATSAPP_URL } from "./cta-at";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import VisualEmpresaDossie from "./VisualEmpresaDossie";
import pfApoio from "@/assets/kelly-pf-apoio.webp";

// 3 DOBRAS DE PÚBLICO (absorvem o antigo AtComoAtua trabalhista/cível) na ordem Empresa › Advogado ›
// Pessoa física. Empresa puxa o ângulo réu/trabalhista; Pessoa física combina cível + trabalhista/autor;
// Advogado referencia os dois. Cada dobra é destino de uma âncora da 2ª dobra (#para-empresas /
// #para-advogados / #para-pessoa-fisica) e termina no seu próprio WhatsApp (no calor), com
// data-cta dedicado p/ medir conversão por público (cta_empresa_wpp / cta_advogado_wpp / cta_pf_wpp ...).
//
// A dobra EMPRESA tem tratamento editorial próprio (SecaoEmpresa): painel-dossiê realista de defesa
// técnica + coluna esquerda refinada. Advogado e PF seguem a estrutura compartilhada (Secao/Narrativa).
type Publico = {
  id: string;
  index: string;
  label: string;
  titulo: string;
  prose: string[];
  // trecho-chave destacado em callout (empresa)
  highlight?: string;
  // empresa/PF: faixa de PRAZO (relógio), renderizada ANTES da lista de atuação
  prazo?: { lead: string; texto: string };
  deliverablesTitle: string;
  deliverables: string[];
  // advogado: faixa de DIFERENCIAL (foco exclusivo), renderizada DEPOIS da lista de atuação
  diferencial?: { lead: string; texto: string };
  prova: string;
  tags: string[];
  whatsappLabel: string;
  waCta: string;
  reforco?: string;
};

const empresa: Publico = {
  id: "para-empresas",
  index: "01",
  label: "Para a empresa",
  titulo: "Defesa técnica quando a perícia decide o passivo",
  prose: [
    "Na reclamatória trabalhista, a perícia médica costuma ser a prova que decide o processo, e a conta. A discussão gira em torno de uma pergunta: a doença ou a lesão do empregado tem relação com o trabalho? É aí que entram nexo causal e concausa. Um desgaste de coluna, um problema de ombro, uma perda auditiva podem ser lidos de formas muito diferentes conforme a perícia for conduzida.",
    "É nele que o juiz se baseia para fixar a indenização. A Dra. Kelly atua pela empresa para que o laudo reflita a realidade técnica, não o pior cenário.",
  ],
  highlight: "Sem um médico acompanhando tecnicamente, o laudo do perito entra no processo sem contraponto.",
  prazo: {
    lead: "O prazo é curto.",
    texto: "Depois que o perito é nomeado, costuma haver cerca de 15 dias para indicar o assistente técnico e entregar os quesitos. Perdido o prazo, a perícia segue sem a defesa técnica.",
  },
  deliverablesTitle: "Onde a Dra. Kelly atua na defesa da empresa",
  deliverables: [
    "Doença ocupacional, LER/DORT e acidente de trabalho",
    "Insalubridade e periculosidade (quesitos de defesa)",
    "Avaliação de nexo causal e concausa",
    "Acompanhamento presencial da perícia",
    "Análise e impugnação do laudo pericial",
  ],
  prova: "Perita cadastrada no TRT-3, com foco exclusivo em perícia médica judicial. CRM/MG 109.153.",
  tags: ["nexo", "concausa", "passivo", "impugnação"],
  whatsappLabel: "Quero defender minha empresa →",
  waCta: "cta_empresa_wpp",
};

const advogado: Publico = {
  id: "para-advogados",
  index: "02",
  label: "Para o advogado",
  titulo: "Você conduz o direito. A perícia médica é com a Dra. Kelly.",
  prose: [
    "O advogado domina a tese jurídica, mas não entra na sala de perícia como médico. O assistente técnico é o profissional que acompanha o exame, fala a linguagem do perito e devolve ao processo um parecer que resiste ao contraditório. A Dra. Kelly faz isso ao seu lado, cuidando exclusivamente da parte médica, sem substituir o seu trabalho.",
  ],
  deliverablesTitle: "O que o advogado recebe",
  deliverables: [
    "Quesitos estratégicos, formulados dentro do prazo",
    "Parecer técnico que sustenta o contraditório",
    "Impugnação fundamentada do laudo do perito",
    "Leitura crítica do laudo: vícios, nexo mal explicado, lacunas",
    "Acompanhamento presencial da perícia",
    "Resposta no prazo apertado, em geral cerca de 15 dias após a nomeação",
  ],
  diferencial: {
    lead: "Foco exclusivo em perícia médica judicial",
    texto: ": trabalhista e cível, autor ou réu. Não é uma clínica que emite laudo nas horas vagas: a assistência técnica é a atividade principal. Para bancas com volume recorrente, a Dra. Kelly funciona como o braço médico-pericial fixo do escritório.",
  },
  prova: "Perita cadastrada em TRT-3, TJGO, TJSP, TJMT e TJMG · CRM/MG 109.153 · foco exclusivo em perícia médica judicial.",
  tags: ["quesitos", "parecer", "impugnação", "contraditório"],
  whatsappLabel: "Falar sobre um caso →",
  waCta: "cta_advogado_wpp",
  reforco: "Atendo em conjunto com o seu escritório · Trabalhista e cível · Brasil todo",
};

const pf: Publico = {
  id: "para-pessoa-fisica",
  index: "03",
  label: "Para a pessoa física",
  titulo: "A mesma estrutura técnica que o outro lado já tem",
  prose: [
    "Se você vai passar por uma perícia médica, o laudo pode decidir o seu processo: seja uma ação por erro médico ou dano corporal, seja uma reclamatória em que você alega uma doença ligada ao trabalho. O perito é nomeado pelo juiz e não representa nenhum dos lados.",
    "O problema é que o juiz decide com base nesse laudo. Um detalhe técnico (o grau de uma sequela, o nexo entre o evento e o dano, uma condição anterior) muda o resultado. A Dra. Kelly acompanha o exame, faz as perguntas certas e contesta o laudo quando ele não reflete a realidade. Autor ou réu, do seu lado.",
  ],
  prazo: {
    lead: "O prazo conta.",
    texto: "A indicação do assistente técnico e a impugnação do laudo têm tempo próprio no processo. Quanto antes o caso for analisado, mais completa fica a defesa.",
  },
  deliverablesTitle: "Onde a Dra. Kelly atua no seu caso",
  deliverables: [
    "Erro médico e dano corporal",
    "Acidentes e avaliação de sequelas",
    "Doença ocupacional e acidente de trabalho (lado do trabalhador)",
    "Avaliação de nexo e incapacidade",
    "Quesitos, parecer técnico e impugnação do laudo",
  ],
  prova: "Perita cadastrada em TJGO, TJSP, TJMT, TJMG e TRT-3. CRM/MG 109.153.",
  tags: ["erro médico", "dano corporal", "sequela", "nexo"],
  whatsappLabel: "Quero um médico do meu lado →",
  waCta: "cta_pf_wpp",
};

const CheckGlyph = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B8873A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ════════════════════════════════════════════════════════════════════════════════════════════
   DOBRA 01 — EMPRESA · composição editorial premium (dossiê de defesa técnica)
   ════════════════════════════════════════════════════════════════════════════════════════════ */

const EmpresaCTAs = () => (
  <div className="emp-cta-wrap">
    <a
      href={AT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="cta_empresa_wpp"
      aria-label="Falar com a Dra. Kelly no WhatsApp — defender minha empresa"
      className="emp-wa font-label"
    >
      <WhatsAppIcon size={19} />
      <span>Quero defender minha empresa</span>
      <span className="emp-wa-arrow" aria-hidden="true">→</span>
    </a>
  </div>
);

const empStyleBlock = `
  .emp-section { padding: 56px 0; }
  @media (min-width: 768px) { .emp-section { padding: 84px 0; } }
  .emp-texture { position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
    background: repeating-linear-gradient(135deg, rgba(120,90,40,0.02) 0px, rgba(120,90,40,0.02) 1px, transparent 1px, transparent 9px); }

  /* layout 2 colunas — visual à direita alinhado verticalmente ao bloco; mobile: título → texto → imagem → CTAs */
  .emp-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
  @media (min-width: 1024px) {
    .emp-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr); column-gap: 52px; row-gap: 24px; align-items: start; }
    .emp-a { grid-column: 1; grid-row: 1; }
    .emp-c { grid-column: 1; grid-row: 2; }
    .emp-visual { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
  }
  .emp-visual { display: flex; align-items: center; justify-content: center; }

  /* — número 01 + rótulo — */
  .emp-eyebrow { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .emp-index { font-style: italic; font-weight: 700; font-size: 2.7rem; line-height: 1;
    color: transparent; -webkit-text-stroke: 1px rgba(184,135,58,0.62); }
  .emp-rule { width: 1px; height: 32px; background: linear-gradient(180deg, rgba(184,135,58,0.6), rgba(184,135,58,0.08)); }
  .emp-label { font-size: 11.5px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: #9C7C43; }

  /* — título — */
  .emp-title { font-weight: 700; letter-spacing: -0.02em; font-size: clamp(28px, 3.1vw, 40px); line-height: 1.1; color: #1F252B; margin-bottom: 22px; }
  .emp-title em { font-style: italic; color: #B8873A; }

  /* — corpo escaneável — */
  .emp-prose p { font-size: 15.5px; line-height: 1.8; color: #5A5246; }
  .emp-prose-after { margin-top: 18px; }

  /* — callout do trecho-chave (pull-quote serifado) — */
  .emp-callout { margin: 24px 0; padding: 4px 0 4px 22px; border-left: 3px solid #B8873A; }
  .emp-callout p { font-style: italic; font-weight: 600; font-size: clamp(18px, 1.5vw, 22px); line-height: 1.45; color: #2A2118; }

  /* — box de prazo (mais forte) — */
  .emp-prazo { display: flex; align-items: flex-start; gap: 14px; margin-top: 26px; padding: 16px 18px; border-radius: 13px;
    background: linear-gradient(100deg, rgba(184,135,58,0.17) 0%, rgba(184,135,58,0.06) 100%);
    border: 1px solid rgba(184,135,58,0.34); border-left: 4px solid #B8873A;
    box-shadow: 0 12px 28px -20px rgba(122,84,24,0.55); }
  .emp-prazo-ico { flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: #9C7C43; background: radial-gradient(circle at 50% 32%, rgba(255,255,255,0.7), rgba(184,135,58,0.14));
    border: 1px solid rgba(184,135,58,0.42); animation: empPulse 3.4s ease-in-out infinite; }
  @keyframes empPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(184,135,58,0); } 50% { box-shadow: 0 0 0 5px rgba(184,135,58,0.12); } }
  .emp-prazo p { font-size: 14px; line-height: 1.6; color: #5A5349; }
  .emp-prazo strong { color: #27221B; font-weight: 700; }

  /* — lista de atuação (premium, 1 coluna, fios finos) — */
  .emp-deliv-title { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #9C7C43;
    padding-top: 4px; margin-bottom: 4px; }
  .emp-deliv { display: flex; flex-direction: column; }
  .emp-deliv-item { display: flex; align-items: center; gap: 14px; padding: 13px 0; }
  .emp-deliv-item + .emp-deliv-item { border-top: 1px solid rgba(122,84,24,0.12); }
  .emp-deliv-ico { flex-shrink: 0; width: 24px; height: 24px; border-radius: 7px; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(180deg, rgba(184,135,58,0.18), rgba(184,135,58,0.07)); border: 1px solid rgba(184,135,58,0.3); }
  .emp-deliv-item > span:last-child { font-size: 14.5px; line-height: 1.45; color: #463E32; }

  /* — prova — */
  .emp-prova { display: flex; align-items: center; gap: 10px; margin: 24px 0 26px; color: #7A6A4A; }
  .emp-prova svg { flex-shrink: 0; color: #B8873A; }
  .emp-prova p { font-size: 12.5px; line-height: 1.5; }

  /* — CTAs — */
  .emp-cta-wrap { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
  @media (min-width: 480px) { .emp-cta-wrap { flex-direction: row; align-items: center; flex-wrap: wrap; } }
  .emp-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    height: 56px; padding: 0 26px; border-radius: 15px; text-decoration: none; cursor: pointer;
    font-size: 15px; font-weight: 600; letter-spacing: 0.005em;
    transition: transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease;
    color: #fff; background: linear-gradient(180deg, #27C065 0%, #1FA855 100%);
    box-shadow: 0 14px 30px -12px rgba(31,168,85,0.6), inset 0 1px 0 rgba(255,255,255,0.35); }
  .emp-wa:hover, .emp-wa:focus-visible { transform: translateY(-2px); outline: none;
    box-shadow: 0 20px 40px -12px rgba(31,168,85,0.72), inset 0 1px 0 rgba(255,255,255,0.42); }
  .emp-wa-arrow { transition: transform .22s ease; }
  .emp-wa:hover .emp-wa-arrow, .emp-wa:focus-visible .emp-wa-arrow { transform: translateX(4px); }

  @media (prefers-reduced-motion: reduce) { .emp-prazo-ico { animation: none; } }
`;

const empresaBg: CSSProperties = {
  background:
    "radial-gradient(52% 48% at 88% 18%, rgba(201,163,92,0.16) 0, transparent 62%)," +
    "radial-gradient(60% 60% at 0% 100%, rgba(184,135,58,0.06) 0, transparent 60%)," +
    "linear-gradient(165deg, #F6EEDF 0%, #F0E6D4 55%, #EADFCC 100%)",
};

const SecaoEmpresa = () => {
  const { ref, isVisible } = useInView();
  return (
    <section id="para-empresas" className="emp-section relative overflow-hidden" style={{ ...empresaBg, scrollMarginTop: 90 }}>
      <style>{empStyleBlock}</style>
      <div className="emp-texture" aria-hidden="true" />
      <div ref={ref} className={`container mx-auto max-w-6xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="emp-grid">
          {/* BLOCO A — cabeçalho + intro + callout + prazo */}
          <div className="emp-a">
            <div className="emp-eyebrow">
              <span className="emp-index font-display">01</span>
              <span className="emp-rule" aria-hidden="true" />
              <span className="emp-label">Para a empresa</span>
            </div>

            <h2 className="emp-title font-display">
              Defesa técnica quando a perícia decide o <em>passivo</em>
            </h2>

            <div className="emp-prose font-body">
              <p>{empresa.prose[0]}</p>
            </div>

            <blockquote className="emp-callout">
              <p className="font-display">{empresa.highlight}</p>
            </blockquote>

            <div className="emp-prose emp-prose-after font-body">
              <p>{empresa.prose[1]}</p>
            </div>

            {empresa.prazo && (
              <div className="emp-prazo">
                <span className="emp-prazo-ico" aria-hidden="true"><Clock size={18} strokeWidth={2} /></span>
                <p className="font-body">
                  <strong>{empresa.prazo.lead}</strong> {empresa.prazo.texto}
                </p>
              </div>
            )}
          </div>

          {/* VISUAL — dossiê de defesa técnica */}
          <div className="emp-visual">
            <VisualEmpresaDossie />
          </div>

          {/* BLOCO C — atuação + prova + CTAs */}
          <div className="emp-c">
            <p className="emp-deliv-title font-label">{empresa.deliverablesTitle}</p>
            <ul className="emp-deliv">
              {empresa.deliverables.map((d) => (
                <li key={d} className="emp-deliv-item">
                  <span className="emp-deliv-ico" aria-hidden="true"><CheckGlyph /></span>
                  <span className="font-body">{d}</span>
                </li>
              ))}
            </ul>

            <div className="emp-prova">
              <BadgeCheck size={17} strokeWidth={1.8} aria-hidden="true" />
              <p className="font-label">{empresa.prova}</p>
            </div>

            <EmpresaCTAs />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════════════════════
   DOBRA 02 — ADVOGADO · relógio/radar do prazo processual
   Reaproveita o mesmo mostrador da LP principal (ProcessClock da última dobra de CTAFinal) — anel
   dourado, ticks, ponteiro, pontos críticos, ECG e centro "24h / Análise inicial" com os marcos do
   processo (Laudo · Quesitos · Impugnação · Parecer). Aqui dentro de um CARD ESCURO premium, para a
   estética dourado-sobre-grafite do relógio funcionar na seção clara. Cópia local (não toca a LP /).
   ════════════════════════════════════════════════════════════════════════════════════════════ */

/* 0° no topo, sentido horário */
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [180 + r * Math.cos(a), 180 + r * Math.sin(a)];
};
const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);
const CRITICAL = [46, 128, 232];

/* Relógio / radar de prazo processual (SVG + CSS, sem imagem) */
const ProcessClock = () => {
  const C = 2 * Math.PI * 120;
  const progress = C * 0.72;
  const [pInX, pInY] = polar(54, 46);
  const [pOutX, pOutY] = polar(118, 46);

  return (
    <div className="relative w-full max-w-[230px] sm:max-w-[330px] mx-auto aspect-square">
      <div
        aria-hidden="true"
        className="absolute inset-[14%] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(184,135,58,0.22) 0, rgba(184,135,58,0.06) 50%, transparent 72%)" }}
      />

      <svg viewBox="0 0 360 360" className="absolute inset-0 w-full h-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="advRingGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B8873A" />
            <stop offset="55%" stopColor="#D6BE83" />
            <stop offset="100%" stopColor="#B8873A" />
          </linearGradient>
          <radialGradient id="advClockGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#B8873A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#B8873A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="180" cy="180" r="158" stroke="rgba(214,190,131,0.10)" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx="180" cy="180" r="149" stroke="rgba(214,190,131,0.07)" strokeWidth="1" />

        {TICKS.map((deg) => {
          const major = deg % 90 === 0;
          const [x1, y1] = polar(major ? 134 : 138, deg);
          const [x2, y2] = polar(146, deg);
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={major ? "rgba(214,190,131,0.5)" : "rgba(214,190,131,0.2)"}
              strokeWidth={major ? 1.6 : 1} strokeLinecap="round" />
          );
        })}

        <circle cx="180" cy="180" r="120" stroke="rgba(214,190,131,0.16)" strokeWidth="2.5" />
        <circle cx="180" cy="180" r="120" stroke="url(#advRingGold)" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={`${progress} ${C}`} transform="rotate(-90 180 180)" />

        <polyline points="150,236 160,236 166,228 172,248 178,236 210,236"
          stroke="rgba(214,190,131,0.34)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {CRITICAL.map((deg) => {
          const [cx, cy] = polar(120, deg);
          return (
            <g key={deg}>
              <circle cx={cx} cy={cy} r="9" fill="url(#advClockGlow)" />
              <circle cx={cx} cy={cy} r="3.4" fill="#B8873A" />
              <circle cx={cx} cy={cy} r="6" fill="none" stroke="rgba(184,135,58,0.4)" strokeWidth="1" />
            </g>
          );
        })}

        <g className="adv-hand">
          <line x1={pInX} y1={pInY} x2={pOutX} y2={pOutY} stroke="#D6BE83" strokeWidth="2" strokeLinecap="round" />
          <circle cx={pOutX} cy={pOutY} r="3" fill="#D6BE83" />
        </g>
        <circle cx="180" cy="180" r="2.5" fill="#D6BE83" />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span aria-hidden="true" className="adv-hub mb-2.5" style={{ width: 6, height: 6, borderRadius: "50%", background: "#D6BE83", boxShadow: "0 0 10px 2px rgba(214,190,131,0.6)" }} />
        <span className="font-display leading-none" style={{ fontSize: "1.7rem", color: "#D6BE83" }}>24h</span>
        <span className="font-label text-[8px] tracking-[0.24em] uppercase mt-2" style={{ color: "#A9A093" }}>
          Análise inicial
        </span>
      </div>

      <div aria-hidden="true">
        <span className="absolute left-1/2 -translate-x-1/2 top-1 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Laudo</span>
        <span className="absolute top-1/2 -translate-y-1/2 right-0 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Quesitos</span>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-1 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Impugnação</span>
        <span className="absolute top-1/2 -translate-y-1/2 left-0 font-label text-[9px] tracking-[0.22em] uppercase" style={{ color: "#A9A093" }}>Parecer</span>
      </div>
    </div>
  );
};

const AdvogadoVisual = () => (
  <div className="adv-case" aria-hidden="true">
    <div className="adv-case-grain" />
    <div className="adv-case-inset">
      <ProcessClock />
    </div>
  </div>
);

const AdvogadoCTAs = () => (
  <div className="adv-cta-wrap">
    <a
      href={AT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="cta_advogado_wpp"
      aria-label="Falar com a Dra. Kelly sobre um caso no WhatsApp"
      className="adv-wa font-label"
    >
      <WhatsAppIcon size={19} />
      <span>Falar sobre um caso</span>
      <span className="adv-wa-arrow" aria-hidden="true">→</span>
    </a>
  </div>
);

const advStyleBlock = `
  .adv-section { padding: 56px 0; }
  @media (min-width: 768px) { .adv-section { padding: 84px 0; } }
  .adv-texture { position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
    background: repeating-linear-gradient(90deg, rgba(120,90,40,0.018) 0px, rgba(120,90,40,0.018) 1px, transparent 1px, transparent 11px); }

  /* layout: visual à esquerda · texto à direita; mobile: headline → visual → cards → CTAs */
  .adv-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
  @media (min-width: 1024px) {
    .adv-grid { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1fr); column-gap: 52px; row-gap: 24px; align-items: start; }
    .adv-a { grid-column: 2; grid-row: 1; }
    .adv-c { grid-column: 2; grid-row: 2; }
    .adv-visual { grid-column: 1; grid-row: 1 / span 2; align-self: center; }
  }
  .adv-visual { display: flex; align-items: center; justify-content: center; }

  /* — header 02 — */
  .adv-eyebrow { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .adv-index { font-family: var(--font-display); font-style: italic; font-weight: 700; font-size: 2.7rem; line-height: 1;
    color: transparent; -webkit-text-stroke: 1px rgba(184,135,58,0.62); }
  .adv-rule { width: 1px; height: 32px; background: linear-gradient(180deg, rgba(184,135,58,0.6), rgba(184,135,58,0.08)); }
  .adv-label { font-family: var(--font-label); font-size: 11.5px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: #9C7C43; }

  /* — headline — */
  .adv-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.018em; font-size: clamp(26px, 3vw, 38px); line-height: 1.14; color: #1F252B; margin-bottom: 20px; }
  .adv-title .hl { position: relative; font-style: italic; color: #A9772A;
    background: linear-gradient(92deg, #B8873A, #D8B45E); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

  /* — corpo — */
  .adv-prose p { font-family: var(--font-body); font-size: 15.5px; line-height: 1.8; color: #5A5246; }

  /* — pacote de entregas (cards 2 col) — */
  .adv-deliv-title { font-family: var(--font-label); font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #9C7C43; margin: 28px 0 14px; }
  .adv-deliv { display: grid; grid-template-columns: 1fr; gap: 10px; }
  @media (min-width: 560px) { .adv-deliv { grid-template-columns: 1fr 1fr; } }
  .adv-card { display: flex; align-items: center; gap: 12px; padding: 14px 15px; border-radius: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.64), rgba(255,255,255,0.3));
    border: 1px solid rgba(122,84,24,0.2); box-shadow: 0 10px 22px -16px rgba(60,44,20,0.45);
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
  .adv-card:hover { transform: translateY(-2px); border-color: rgba(184,135,58,0.4); box-shadow: 0 14px 26px -16px rgba(60,44,20,0.45); }
  .adv-card-ico { flex-shrink: 0; width: 22px; height: 22px; border-radius: 7px; display: flex; align-items: center; justify-content: center;
    color: #fff; background: linear-gradient(180deg, #C9A35C, #B8873A); box-shadow: 0 2px 6px -2px rgba(184,135,58,0.55), inset 0 1px 0 rgba(255,255,255,0.4); }
  .adv-card-txt { font-family: var(--font-body); font-size: 13.5px; line-height: 1.4; color: #463E32; }

  /* — diferencial: callout argumento-chave — */
  .adv-callout { position: relative; margin: 24px 0; padding: 18px 20px 18px 24px; border-radius: 14px; overflow: hidden;
    background: linear-gradient(120deg, rgba(212,168,83,0.24) 0%, rgba(184,135,58,0.08) 100%);
    border: 1px solid rgba(184,135,58,0.42);
    box-shadow: 0 16px 34px -22px rgba(122,84,24,0.55), inset 0 1px 0 rgba(255,255,255,0.55); }
  .adv-callout::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: linear-gradient(180deg, #D8B45E, #B8873A); }
  .adv-callout-label { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-label); font-size: 10px; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase; color: #9C7C43; margin-bottom: 7px; }
  .adv-callout p { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #5A5349; }
  .adv-callout strong { color: #3A2C10; font-weight: 700; }

  /* — prova — */
  .adv-prova { display: flex; align-items: center; gap: 10px; margin: 22px 0 24px; color: #7A6A4A; }
  .adv-prova svg { flex-shrink: 0; color: #B8873A; }
  .adv-prova p { font-family: var(--font-label); font-size: 12.5px; line-height: 1.5; }

  /* — CTAs — */
  .adv-cta-wrap { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
  @media (min-width: 480px) { .adv-cta-wrap { flex-direction: row; align-items: center; flex-wrap: wrap; } }
  .adv-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 56px; padding: 0 26px; border-radius: 15px;
    text-decoration: none; cursor: pointer; font-size: 15px; font-weight: 600; letter-spacing: 0.005em;
    transition: transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease;
    color: #fff; background: linear-gradient(180deg, #27C065 0%, #1FA855 100%);
    box-shadow: 0 14px 30px -12px rgba(31,168,85,0.6), inset 0 1px 0 rgba(255,255,255,0.35); }
  .adv-wa:hover, .adv-wa:focus-visible { transform: translateY(-2px); outline: none;
    box-shadow: 0 20px 40px -12px rgba(31,168,85,0.72), inset 0 1px 0 rgba(255,255,255,0.42); }
  .adv-wa-arrow { transition: transform .22s ease; }
  .adv-wa:hover .adv-wa-arrow, .adv-wa:focus-visible .adv-wa-arrow { transform: translateX(4px); }

  .adv-reforco { font-family: var(--font-label); margin-top: 14px; font-size: 12.5px; letter-spacing: 0.02em; color: #8A7C63; }

  /* ── pasta executiva de couro com o relógio aplicado (objeto físico, não card digital) ── */
  .adv-case { position: relative; width: 100%; max-width: 432px; border-radius: 26px; padding: 28px;
    background:
      radial-gradient(60% 42% at 26% 14%, rgba(255,246,228,0.06) 0, transparent 56%),
      radial-gradient(50% 46% at 88% 22%, rgba(184,135,58,0.10) 0, transparent 60%),
      radial-gradient(70% 70% at 86% 92%, rgba(0,0,0,0.45) 0, transparent 58%),
      radial-gradient(40% 30% at 60% 50%, rgba(120,96,52,0.08) 0, transparent 60%),
      linear-gradient(155deg, #262119 0%, #1A160F 50%, #110D09 100%);
    border: 1px solid rgba(0,0,0,0.55);
    box-shadow:
      0 1px 0 rgba(255,246,228,0.09) inset,
      0 -3px 8px rgba(0,0,0,0.5) inset,
      0 18px 1px -16px rgba(0,0,0,0.55),
      0 36px 66px -30px rgba(0,0,0,0.68),
      0 14px 26px -16px rgba(0,0,0,0.5); }
  .adv-case::before { content: ""; position: absolute; inset: 13px; border-radius: 17px; pointer-events: none;
    border: 1.4px dashed rgba(198,174,124,0.24); box-shadow: 0 1px 0 rgba(0,0,0,0.35); }
  .adv-case-grain { position: absolute; inset: 0; border-radius: 26px; pointer-events: none; opacity: 0.55; mix-blend-mode: soft-light;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='l'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23l)'/%3E%3C/svg%3E"); }
  .adv-case-inset { position: relative; z-index: 1; border-radius: 16px; padding: 22px 18px;
    display: flex; align-items: center; justify-content: center;
    background:
      radial-gradient(120% 84% at 50% 0%, rgba(184,135,58,0.06) 0, transparent 58%),
      linear-gradient(160deg, #15110A 0%, #0F0B07 60%, #0B0805 100%);
    box-shadow:
      inset 0 3px 9px rgba(0,0,0,0.62),
      inset 0 -1px 0 rgba(255,246,228,0.04),
      inset 0 0 0 1px rgba(184,135,58,0.14),
      0 1px 0 rgba(255,246,228,0.05); }

  /* ponteiro em movimento contínuo (relógio funcionando) + micro pulso no hub central */
  .adv-hand { transform-box: view-box; transform-origin: 180px 180px; animation: advHand 60s linear infinite; }
  @keyframes advHand { to { transform: rotate(360deg); } }
  .adv-hub { animation: advHub 3.8s ease-in-out infinite; }
  @keyframes advHub { 0%,100% { box-shadow: 0 0 8px 1px rgba(214,190,131,0.5); } 50% { box-shadow: 0 0 15px 3px rgba(214,190,131,0.8); } }
  @media (prefers-reduced-motion: reduce) { .adv-hand, .adv-hub { animation: none; } }

  @media (prefers-reduced-motion: reduce) { .adv-card { transition: none; } }
`;

const advBg: CSSProperties = {
  background:
    "radial-gradient(58% 50% at 10% 12%, rgba(201,163,92,0.13) 0, transparent 60%)," +
    "radial-gradient(54% 54% at 100% 92%, rgba(120,86,40,0.10) 0, transparent 62%)," +
    "radial-gradient(130% 96% at 0% 0%, rgba(255,251,243,0.5) 0, transparent 52%)," +
    "linear-gradient(168deg, #F4ECDD 0%, #ECE1CF 55%, #E5D8C4 100%)",
};

const SecaoAdvogado = () => {
  const { ref, isVisible } = useInView();
  return (
    <section id="para-advogados" className="adv-section relative overflow-hidden" style={{ ...advBg, scrollMarginTop: 90 }}>
      <style>{advStyleBlock}</style>
      <div className="adv-texture" aria-hidden="true" />
      <div ref={ref} className={`container mx-auto max-w-6xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="adv-grid">
          {/* BLOCO A — header + headline + intro */}
          <div className="adv-a">
            <div className="adv-eyebrow">
              <span className="adv-index">02</span>
              <span className="adv-rule" aria-hidden="true" />
              <span className="adv-label">{advogado.label}</span>
            </div>

            <h2 className="adv-title">
              Você conduz o direito. A perícia médica é com <span className="hl">a Dra. Kelly</span>.
            </h2>

            <div className="adv-prose">
              {advogado.prose.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* VISUAL — painel de coordenação */}
          <div className="adv-visual">
            <AdvogadoVisual />
          </div>

          {/* BLOCO C — entregas + diferencial + prova + CTAs */}
          <div className="adv-c">
            <p className="adv-deliv-title">{advogado.deliverablesTitle}</p>
            <div className="adv-deliv">
              {advogado.deliverables.map((it) => (
                <div key={it} className="adv-card">
                  <span className="adv-card-ico" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
                  <span className="adv-card-txt">{it}</span>
                </div>
              ))}
            </div>

            {advogado.diferencial && (
              <div className="adv-callout">
                <span className="adv-callout-label"><Target size={13} strokeWidth={2} aria-hidden="true" /> Diferencial</span>
                <p>
                  <strong>{advogado.diferencial.lead}</strong>{advogado.diferencial.texto}
                </p>
              </div>
            )}

            <div className="adv-prova">
              <BadgeCheck size={17} strokeWidth={1.8} aria-hidden="true" />
              <p>{advogado.prova}</p>
            </div>

            <AdvogadoCTAs />

            {advogado.reforco && <p className="adv-reforco">{advogado.reforco}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════════════════════
   DOBRA 03 — PESSOA FÍSICA · retrato editorial de apoio ("você não está sozinho")
   Conceito PRÓPRIO (não repete dossiê/chips da empresa, a tabela, nem o painel do advogado): a pessoa
   em primeiro plano com o exame nas mãos e a Dra. Kelly como presença que se inclina ao seu lado
   (orientação, não abandono). Foto real: a médica de jaleco atende a cliente à mesa, com os exames e
   o laudo. Termos do caso (erro médico · dano corporal · sequela · nexo) como legenda discreta.
   ════════════════════════════════════════════════════════════════════════════════════════════ */

const pfTermos = ["Erro médico", "Dano corporal", "Sequela", "Nexo"];

const VisualPF = () => (
  <div className="pf-frame">
    {/* placa/painel bege quente atrás, levemente deslocada (profundidade em camadas) */}
    <div className="pf-plate" aria-hidden="true" />

    {/* documento/laudo discreto espiando atrás do canto (contexto pericial) */}
    <div className="pf-doc-peek" aria-hidden="true">
      <span /><span /><span />
    </div>

    {/* foto à frente */}
    <div className="pf-stage">
      <img
        className="pf-photo"
        src={pfApoio}
        alt="Dra. Kelly Neisse, médica perita, analisa o laudo de uma perícia médica ao lado da cliente"
        width={900}
        height={675}
        loading="lazy"
        decoding="async"
      />
      {/* legenda dos termos do caso */}
      <div className="pf-terms" aria-hidden="true">
        {pfTermos.map((t, i) => (
          <span key={t} className="pf-term">
            {i > 0 && <span className="pf-term-dot" aria-hidden="true" />}
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const PFCTAs = () => (
  <div className="pf-cta-wrap">
    <a
      href={AT_WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="cta_pf_wpp"
      aria-label="Quero um médico do meu lado — falar no WhatsApp"
      className="pf-wa font-label"
    >
      <WhatsAppIcon size={19} />
      <span>Quero um médico do meu lado</span>
      <span className="pf-wa-arrow" aria-hidden="true">→</span>
    </a>
  </div>
);

const pfStyleBlock = `
  .pf-section { padding: 56px 0; }
  @media (min-width: 768px) { .pf-section { padding: 84px 0; } }
  .pf-texture { position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
    background: repeating-linear-gradient(135deg, rgba(120,90,40,0.018) 0px, rgba(120,90,40,0.018) 1px, transparent 1px, transparent 9px); }

  .pf-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
  @media (min-width: 1024px) {
    .pf-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr); column-gap: 52px; row-gap: 24px; align-items: start; }
    .pf-a { grid-column: 1; grid-row: 1; }
    .pf-c { grid-column: 1; grid-row: 2; }
    .pf-visual { grid-column: 2; grid-row: 1 / span 2; align-self: center; }
  }
  .pf-visual { display: flex; align-items: center; justify-content: center; }

  .pf-eyebrow { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
  .pf-index { font-family: var(--font-display); font-style: italic; font-weight: 700; font-size: 2.7rem; line-height: 1; color: transparent; -webkit-text-stroke: 1px rgba(184,135,58,0.62); }
  .pf-rule { width: 1px; height: 32px; background: linear-gradient(180deg, rgba(184,135,58,0.6), rgba(184,135,58,0.08)); }
  .pf-label { font-family: var(--font-label); font-size: 11.5px; font-weight: 600; letter-spacing: 0.26em; text-transform: uppercase; color: #9C7C43; }

  .pf-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.018em; font-size: clamp(26px, 3vw, 38px); line-height: 1.14; color: #1F252B; margin-bottom: 20px; }
  .pf-prose p { font-family: var(--font-body); font-size: 15.5px; line-height: 1.8; color: #5A5246; }
  .pf-prose p + p { margin-top: 16px; }

  .pf-prazo { display: flex; align-items: flex-start; gap: 14px; margin-top: 26px; padding: 16px 18px; border-radius: 13px;
    background: linear-gradient(100deg, rgba(184,135,58,0.17) 0%, rgba(184,135,58,0.06) 100%);
    border: 1px solid rgba(184,135,58,0.34); border-left: 4px solid #B8873A; box-shadow: 0 12px 28px -20px rgba(122,84,24,0.55); }
  .pf-prazo-ico { flex-shrink: 0; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    color: #9C7C43; background: radial-gradient(circle at 50% 32%, rgba(255,255,255,0.7), rgba(184,135,58,0.14)); border: 1px solid rgba(184,135,58,0.42); animation: pfPulse 3.4s ease-in-out infinite; }
  @keyframes pfPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(184,135,58,0); } 50% { box-shadow: 0 0 0 5px rgba(184,135,58,0.12); } }
  .pf-prazo p { font-family: var(--font-body); font-size: 14px; line-height: 1.6; color: #5A5349; }
  .pf-prazo strong { color: #27221B; font-weight: 700; }

  .pf-deliv-title { font-family: var(--font-label); font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #9C7C43; margin: 28px 0 6px; padding-top: 24px; border-top: 1px solid rgba(184,135,58,0.22); }
  .pf-deliv { display: flex; flex-direction: column; }
  .pf-deliv-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; }
  .pf-deliv-item + .pf-deliv-item { border-top: 1px solid rgba(122,84,24,0.12); }
  .pf-deliv-ico { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(circle at 50% 35%, rgba(255,255,255,0.6), rgba(184,135,58,0.14)); border: 1px solid rgba(184,135,58,0.34); box-shadow: 0 4px 10px -6px rgba(184,135,58,0.5); }
  .pf-deliv-item > span:last-child { font-family: var(--font-body); font-size: 14.5px; line-height: 1.45; color: #463E32; }

  .pf-prova { display: flex; align-items: center; gap: 10px; margin: 24px 0 26px; color: #7A6A4A; }
  .pf-prova svg { flex-shrink: 0; color: #B8873A; }
  .pf-prova p { font-family: var(--font-label); font-size: 12.5px; line-height: 1.5; }

  .pf-cta-wrap { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
  @media (min-width: 480px) { .pf-cta-wrap { flex-direction: row; align-items: center; flex-wrap: wrap; } }
  .pf-wa { display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: 56px; padding: 0 26px; border-radius: 15px; text-decoration: none; cursor: pointer; font-size: 15px; font-weight: 600; letter-spacing: 0.005em; transition: transform .22s ease, box-shadow .22s ease, background .22s ease, border-color .22s ease;
    color: #fff; background: linear-gradient(180deg, #27C065 0%, #1FA855 100%); box-shadow: 0 14px 30px -12px rgba(31,168,85,0.6), inset 0 1px 0 rgba(255,255,255,0.35); }
  .pf-wa:hover, .pf-wa:focus-visible { transform: translateY(-2px); outline: none; box-shadow: 0 20px 40px -12px rgba(31,168,85,0.72), inset 0 1px 0 rgba(255,255,255,0.42); }
  .pf-wa-arrow { transition: transform .22s ease; }
  .pf-wa:hover .pf-wa-arrow, .pf-wa:focus-visible .pf-wa-arrow { transform: translateX(4px); }

  /* ── retrato de apoio (foto real) em composição editorial em camadas ── */
  .pf-frame { position: relative; z-index: 0; width: 100%; max-width: 452px; margin: 0 auto; }

  /* placa/painel bege quente atrás, deslocada — ancora o canto e cria profundidade */
  .pf-plate { position: absolute; z-index: 0; inset: 0; transform: translate(22px, 24px); border-radius: 22px;
    background: linear-gradient(150deg, #EFE4CF 0%, #E4D6BB 100%);
    border: 1px solid rgba(184,135,58,0.32);
    box-shadow: 0 24px 46px -26px rgba(60,44,20,0.4); }
  .pf-plate::after { content: ""; position: absolute; inset: 0; border-radius: 22px; opacity: 0.5;
    background: repeating-linear-gradient(135deg, rgba(120,90,40,0.03) 0px, rgba(120,90,40,0.03) 1px, transparent 1px, transparent 8px); }

  /* documento/laudo discreto espiando atrás do canto superior esquerdo */
  .pf-doc-peek { position: absolute; z-index: 1; top: -16px; left: 26px; width: 122px; padding: 12px 13px; border-radius: 6px; transform: rotate(-4deg);
    display: flex; flex-direction: column; gap: 6px;
    background: linear-gradient(170deg, #FDFBF6, #F1EADC); border: 1px solid rgba(122,84,24,0.16);
    box-shadow: 0 16px 28px -16px rgba(60,44,20,0.45); }
  .pf-doc-peek span { height: 4px; border-radius: 2px; background: rgba(90,72,46,0.16); }
  .pf-doc-peek span:nth-child(1) { width: 68%; }
  .pf-doc-peek span:nth-child(3) { width: 52%; background: linear-gradient(90deg, rgba(212,168,83,0.5), rgba(212,168,83,0.2)); }

  /* foto à frente — borda dourada translúcida fina + sombra entre camadas */
  .pf-stage { position: relative; z-index: 2; width: 100%; border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(212,168,83,0.34);
    box-shadow: 0 1px 0 rgba(255,247,231,0.25) inset, 0 30px 60px -28px rgba(60,44,20,0.5), 0 10px 22px -16px rgba(60,44,20,0.4); }
  .pf-photo { display: block; width: 100%; height: auto; }

  @media (max-width: 767px) {
    .pf-plate { transform: translate(14px, 16px); }
    .pf-doc-peek { left: 18px; width: 108px; }
  }
  .pf-terms { position: absolute; left: 0; right: 0; bottom: 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px;
    padding: 12px 16px 14px; background: linear-gradient(to top, rgba(18,15,10,0.66), rgba(18,15,10,0.2) 70%, transparent); }
  .pf-term { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-label); font-size: 10.5px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #ECE0CA; }
  .pf-term-dot { width: 4px; height: 4px; border-radius: 50%; background: #D4A853; box-shadow: 0 0 6px rgba(212,168,83,0.7); }

  @media (prefers-reduced-motion: reduce) { .pf-prazo-ico { animation: none; } }
`;

const pfBg: CSSProperties = {
  background:
    "radial-gradient(56% 50% at 84% 16%, rgba(212,168,83,0.13) 0, transparent 60%)," +
    "radial-gradient(50% 50% at 6% 92%, rgba(120,86,40,0.08) 0, transparent 62%)," +
    "radial-gradient(130% 96% at 100% 0%, rgba(255,251,243,0.5) 0, transparent 52%)," +
    "linear-gradient(168deg, #F5EEE0 0%, #EEE4D2 55%, #E7DCC8 100%)",
};

const SecaoPF = () => {
  const { ref, isVisible } = useInView();
  return (
    <section id="para-pessoa-fisica" className="pf-section relative overflow-hidden" style={{ ...pfBg, scrollMarginTop: 90 }}>
      <style>{pfStyleBlock}</style>
      <div className="pf-texture" aria-hidden="true" />
      <div ref={ref} className={`container mx-auto max-w-6xl relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="pf-grid">
          {/* BLOCO A — header + headline + intro + prazo */}
          <div className="pf-a">
            <div className="pf-eyebrow">
              <span className="pf-index">03</span>
              <span className="pf-rule" aria-hidden="true" />
              <span className="pf-label">{pf.label}</span>
            </div>

            <h2 className="pf-title">{pf.titulo}</h2>

            <div className="pf-prose">
              {pf.prose.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {pf.prazo && (
              <div className="pf-prazo">
                <span className="pf-prazo-ico" aria-hidden="true"><Clock size={18} strokeWidth={2} /></span>
                <p>
                  <strong>{pf.prazo.lead}</strong> {pf.prazo.texto}
                </p>
              </div>
            )}
          </div>

          {/* VISUAL — retrato de apoio */}
          <div className="pf-visual">
            <VisualPF />
          </div>

          {/* BLOCO C — atuação + prova + CTAs */}
          <div className="pf-c">
            <p className="pf-deliv-title">{pf.deliverablesTitle}</p>
            <ul className="pf-deliv">
              {pf.deliverables.map((d) => (
                <li key={d} className="pf-deliv-item">
                  <span className="pf-deliv-ico" aria-hidden="true"><CheckGlyph /></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="pf-prova">
              <BadgeCheck size={17} strokeWidth={1.8} aria-hidden="true" />
              <p>{pf.prova}</p>
            </div>

            <PFCTAs />
          </div>
        </div>
      </div>
    </section>
  );
};

const AtPublicos = () => (
  <>
    <SecaoEmpresa />
    <SecaoAdvogado />
    <SecaoPF />
  </>
);

export default AtPublicos;
