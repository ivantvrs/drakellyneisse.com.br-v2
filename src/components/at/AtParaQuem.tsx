import { ArrowRight, Building2, Briefcase, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Publico = {
  titulo: string;
  termos: string;
  teaser: string;
  href: string;
  cta: string;
  botao: string;
  Icon: LucideIcon;
};

// 2ª dobra = NAVEGAÇÃO PURA por público (Empresa › Advogado › Pessoa física). Cada opção tem um
// teaser de benefício e um botão que é ÂNCORA DE SCROLL (não WhatsApp) até a dobra de aprofundamento
// daquele público (#para-empresas / #para-advogados / #para-pessoa-fisica). Lógica de funil: quem
// rolou além da Hero ainda está em consideração — jogar pro WhatsApp aqui queima o lead; o WhatsApp
// mora no fim de cada dobra de público, no calor. O clique dispara select_case_at (handler delegado
// em at.html lê data-cta^="seletor_") — mede qual público se interessa. Botões grafite (.at-go), não verde.
const publicos: Publico[] = [
  {
    titulo: "Empresa",
    termos: "Doença ocupacional · LER/DORT · acidente de trabalho · insalubridade",
    teaser:
      "Na reclamatória trabalhista, a perícia define o tamanho do passivo. A Dra. Kelly avalia o nexo, formula os quesitos da defesa e contesta laudos frágeis, para a empresa não responder pelo que não causou.",
    href: "#para-empresas",
    cta: "seletor_empresa",
    botao: "Ver a defesa da empresa",
    Icon: Building2,
  },
  {
    titulo: "Advogado",
    termos: "Quesitos · parecer · impugnação · contraditório",
    teaser:
      "Suporte médico-pericial para a sua tese em casos trabalhistas e cíveis, do quesito à impugnação. A Dra. Kelly cuida da parte médica ao seu lado, sem substituir o advogado.",
    href: "#para-advogados",
    cta: "seletor_advogado",
    botao: "Ver a parceria técnica",
    Icon: Briefcase,
  },
  {
    titulo: "Pessoa física",
    termos: "Perícia · laudo · nexo · dano corporal",
    teaser:
      "Você vai passar por uma perícia e o laudo pode pesar na decisão. A Dra. Kelly acompanha o exame, faz as perguntas certas e contesta o laudo quando ele não reflete a realidade. Autor ou réu.",
    href: "#para-pessoa-fisica",
    cta: "seletor_pf",
    botao: "Ver como funciona no meu caso",
    Icon: UserRound,
  },
];

const Coluna = ({ pub: { titulo, termos, teaser, href, cta, botao, Icon } }: { pub: Publico }) => (
  <div className="apq-col flex flex-col items-center text-center px-2 md:px-5">
    <span className="apq-ico" aria-hidden="true">
      <Icon size={26} strokeWidth={1.6} />
    </span>
    <h3 className="font-display font-bold leading-none mt-5" style={{ fontSize: "clamp(23px, 2.5vw, 29px)", color: "#1F252B", letterSpacing: "-0.015em" }}>
      {titulo}
    </h3>
    <span aria-hidden="true" className="mt-3 mb-4" style={{ width: 34, height: 2, borderRadius: 2, background: "linear-gradient(90deg, #B8873A, #D6BE83)" }} />
    <p className="font-label text-[11.5px] font-semibold leading-snug mb-4 max-w-[32ch]" style={{ color: "#9C7C43", letterSpacing: "0.01em" }}>
      {termos}
    </p>
    <p className="text-[14px] font-medium leading-relaxed mb-7 max-w-[36ch]" style={{ color: "#56606B" }}>
      {teaser}
    </p>
    <a href={href} data-cta={cta} className="at-go mt-auto" aria-label={`${titulo} — ${botao}`}>
      {botao}
      <ArrowRight className="at-go-arrow" size={17} strokeWidth={2.6} aria-hidden="true" />
    </a>
  </div>
);

const AtParaQuem = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="para-quem"
      className="py-14 md:py-20 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(38% 42% at 50% 36%, rgba(201,163,92,0.18) 0, transparent 64%)," +
          "radial-gradient(60% 50% at 0% 100%, rgba(184,135,58,0.06) 0, transparent 60%)," +
          "radial-gradient(54% 48% at 100% 0%, rgba(184,135,58,0.05) 0, transparent 58%)," +
          "linear-gradient(165deg, #F8F2E9 0%, #F0E5D5 55%, #ECE0CF 100%)",
      }}
    >
      {/* textura leve remetendo a documento/protocolo */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.5,
          background:
            "repeating-linear-gradient(180deg, rgba(184,135,58,0.02) 0px, rgba(184,135,58,0.02) 1px, transparent 1px, transparent 10px)",
        }}
      />

      <style>{`
        /* eixo central — emblema MAIOR, levitando, com halo + sombra de chão */
        .at-axis { position: relative; display: flex; align-items: flex-end; justify-content: center;
          height: clamp(116px, 15vw, 148px); }
        .at-axis-emblem {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: clamp(96px, 12.5vw, 118px); height: auto;
          animation: atLevitate 5.6s ease-in-out infinite; will-change: transform;
        }
        .at-axis-halo { position: absolute; inset: -34%; border-radius: 999px; z-index: 0;
          background: radial-gradient(circle, rgba(201,163,92,0.42) 0%, rgba(184,135,58,0.15) 44%, transparent 72%); filter: blur(13px); }
        .at-axis-emblem img { position: relative; z-index: 1; width: 100%; height: auto;
          filter: drop-shadow(0 20px 24px rgba(60,44,20,0.30)) drop-shadow(0 5px 9px rgba(184,135,58,0.34)); }
        .at-axis-shadow { position: absolute; bottom: 4px; left: 50%; z-index: 0;
          width: clamp(64px, 8vw, 86px); height: 14px; border-radius: 999px;
          background: radial-gradient(ellipse, rgba(60,44,20,0.30) 0%, rgba(60,44,20,0.10) 46%, transparent 72%);
          filter: blur(7px); transform: translateX(-50%); animation: atLevitateShadow 5.6s ease-in-out infinite; }
        @keyframes atLevitate { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-13px); } }
        @keyframes atLevitateShadow {
          0%,100% { opacity: 0.42; transform: translateX(-50%) scale(1); }
          50%     { opacity: 0.22; transform: translateX(-50%) scale(0.8); }
        }

        /* emblema de cada público — círculo dourado discreto (modelo editorial, NÃO card do concorrente) */
        .apq-ico { display: inline-flex; align-items: center; justify-content: center;
          width: 56px; height: 56px; border-radius: 999px; color: #B8873A;
          background: radial-gradient(circle at 50% 36%, rgba(201,163,92,0.20), rgba(184,135,58,0.05));
          border: 1px solid rgba(184,135,58,0.34);
          box-shadow: 0 7px 18px -9px rgba(184,135,58,0.45), inset 0 1px 0 rgba(255,255,255,0.45); }
        /* divisórias entre colunas — fio de ouro (não molduras de card) */
        @media (min-width: 768px) { .apq-col + .apq-col { border-left: 1px solid rgba(184,135,58,0.18); } }
        @media (max-width: 767px) { .apq-col + .apq-col { border-top: 1px solid rgba(184,135,58,0.18); padding-top: 30px; } }

        /* botão grafite premium — leve 3D + respiração dourada (NÃO verde) */
        .at-go {
          position: relative; display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 24px; border-radius: 12px; cursor: pointer; text-decoration: none;
          font-weight: 700; font-size: 14px; letter-spacing: 0.015em; color: #F7F1E8; line-height: 1.15;
          background: linear-gradient(180deg, #2A2118 0%, #171512 100%);
          border: 1px solid rgba(184,135,58,0.45);
          box-shadow:
            0 1px 0 rgba(214,190,131,0.20) inset,
            0 -7px 14px -10px rgba(0,0,0,0.5) inset,
            0 13px 26px -12px rgba(23,21,18,0.6);
          animation: atGoPulse 3.4s ease-in-out infinite;
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease, filter 240ms ease;
        }
        .at-go:hover, .at-go:focus-visible {
          transform: translateY(-3px); filter: brightness(1.06); outline: none;
          border-color: rgba(184,135,58,0.85);
          box-shadow:
            0 1px 0 rgba(214,190,131,0.28) inset,
            0 -7px 14px -10px rgba(0,0,0,0.5) inset,
            0 18px 32px -10px rgba(23,21,18,0.65), 0 0 22px -2px rgba(184,135,58,0.45);
        }
        .at-go-arrow { color: #D6BE83; transition: transform 240ms ease, color 240ms ease; flex-shrink: 0; }
        .at-go:hover .at-go-arrow, .at-go:focus-visible .at-go-arrow { color: #E8C77B; transform: translateX(4px); }
        @keyframes atGoPulse {
          0%,100% { box-shadow: 0 1px 0 rgba(214,190,131,0.20) inset, 0 -7px 14px -10px rgba(0,0,0,0.5) inset, 0 13px 26px -12px rgba(23,21,18,0.55), 0 0 0 0 rgba(184,135,58,0); }
          50%     { box-shadow: 0 1px 0 rgba(214,190,131,0.24) inset, 0 -7px 14px -10px rgba(0,0,0,0.5) inset, 0 15px 30px -10px rgba(23,21,18,0.6), 0 0 18px 0 rgba(184,135,58,0.32); }
        }
        @media (prefers-reduced-motion: reduce) { .at-go, .at-axis-emblem, .at-axis-shadow { animation: none; } }
      `}</style>

      <div ref={ref} className={`container mx-auto relative text-center fade-in-section ${isVisible ? "is-visible" : ""}`}>
        {/* topo editorial */}
        <p className="font-label text-xs font-semibold tracking-[0.32em] uppercase mb-4" style={{ color: "#B8873A" }}>
          Para quem atua
        </p>
        <h2 className="font-display text-[1.7rem] md:text-[2.2rem] lg:text-[2.6rem] font-bold leading-[1.06] max-w-2xl mx-auto" style={{ color: "#1F252B", letterSpacing: "-0.025em" }}>
          Onde você <em className="italic font-bold" style={{ color: "#B8873A" }}>entra</em> na perícia?
        </h2>
        <p className="text-[15px] md:text-base font-medium leading-relaxed mt-4 max-w-xl mx-auto" style={{ color: "#56606B" }}>
          Empresa, advogado ou parte: a Dra. Kelly atua ao lado de quem a contrata. Escolha o seu caso para ver como.
        </p>

        {/* eixo da decisão — emblema discreto maior, levitando + tronco dourado */}
        <div className="flex flex-col items-center mt-7 mb-1">
          <div className="at-axis">
            <span className="at-axis-shadow" aria-hidden="true" />
            <span className="at-axis-emblem">
              <span className="at-axis-halo" aria-hidden="true" />
              <img src="/fab-emblem.webp" alt="" loading="lazy" width={118} height={118} />
            </span>
          </div>
          <span aria-hidden="true" className="mt-3" style={{ width: 1, height: 26, background: "linear-gradient(180deg, rgba(184,135,58,0.55), rgba(184,135,58,0.12))" }} />
        </div>

        {/* três públicos — colunas editoriais separadas por fio de ouro (não cards) */}
        <div className="grid md:grid-cols-3 gap-y-9 pt-6 max-w-5xl mx-auto">
          {publicos.map((pub) => (
            <Coluna key={pub.cta} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtParaQuem;
