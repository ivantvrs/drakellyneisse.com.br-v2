import { Landmark, BadgeCheck, GraduationCap, Target, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

// BLOCO Y — faixa de autoridade (REAL, tudo verificável). Fecha o gap de "autoridade empacotada" do
// concorrente sem depender de coletar nada (≠ depoimentos, que são Bloco Z, a coletar). Faixa DARK
// compacta logo após as 3 dobras de público, no ponto de decisão. Anti-geo: NÃO repete nomes de
// cidade (Goiânia/Brasília/Uberlândia vivem só em AtAtuacao + rodapé) — aqui só alcance nacional.
// O "+N perícias/pareceres" foi deixado de fora de propósito: só entra quando o número real for confirmado.
type Item = { Icon: LucideIcon; stat: string; sub: string };

const itens: Item[] = [
  { Icon: Landmark, stat: "5 tribunais", sub: "TRT-3 · TJGO · TJSP · TJMT · TJMG" },
  { Icon: BadgeCheck, stat: "CRM/MG 109.153", sub: "Médica perita judicial" },
  { Icon: GraduationCap, stat: "Dupla formação", sub: "Perícia Médica (CPEM) · Medicina do Trabalho (IFH)" },
  { Icon: Target, stat: "Foco exclusivo", sub: "Perícia médica judicial, não é atividade paralela" },
  { Icon: Globe, stat: "Brasil", sub: "Atuação técnica em todo o país" },
];

const styleBlock = `
  .aut-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 10px; }
  .aut-ico { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px;
    border-radius: 999px; color: #D8C49A; margin-bottom: 14px;
    background: radial-gradient(circle at 50% 32%, rgba(201,163,92,0.20), rgba(184,135,58,0.04));
    border: 1px solid rgba(191,160,104,0.4); box-shadow: inset 0 1px 0 rgba(255,255,255,0.06); }
  @media (min-width: 1024px) {
    .aut-item:not(:first-child) { border-left: 1px solid rgba(191,160,104,0.16); }
  }
`;

const AtAutoridade = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="py-14 md:py-16 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(58% 60% at 18% 10%, rgba(214,190,131,0.08) 0, transparent 56%)," +
          "radial-gradient(54% 60% at 86% 90%, rgba(184,135,58,0.10) 0, transparent 62%)," +
          "linear-gradient(162deg, #171512 0%, #141311 52%, #100f0d 100%)",
        color: "#EFE8DC",
      }}
    >
      {/* textura dot-grid sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(rgba(214,190,131,.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.06,
          zIndex: 0,
        }}
      />

      <style>{styleBlock}</style>

      <div ref={ref} className={`container mx-auto max-w-6xl relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase text-center mb-10" style={{ color: "#B8873A" }}>
          Autoridade técnica
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-2">
          {itens.map(({ Icon, stat, sub }) => (
            <div key={stat} className="aut-item">
              <span className="aut-ico" aria-hidden="true">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <p className="font-display text-[1.05rem] md:text-[1.15rem] font-bold leading-tight mb-1.5" style={{ color: "#F1EAD9", letterSpacing: "-0.01em" }}>
                {stat}
              </p>
              <p className="text-[12.5px] leading-snug max-w-[22ch]" style={{ color: "#9D9485" }}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AtAutoridade;
