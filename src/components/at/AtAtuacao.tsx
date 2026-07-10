import { useContext } from "react";
import { MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { AtGeoContext } from "./cta-at";

// Na porta geo SP (AtGeoContext="sp") a seção troca as cidades: "São Paulo, Campinas ou
// qualquer outra cidade do país" (pedido do Ivan 10/07). Na home segue Goiânia/Brasília/
// Uberlândia. O restante da copy é idêntico nas duas portas.
const AtAtuacao = () => {
  const { ref, isVisible } = useInView();
  const sp = useContext(AtGeoContext) === "sp";

  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(58% 46% at 20% 16%, rgba(214,190,131,0.08) 0, transparent 56%)," +
          "radial-gradient(54% 56% at 84% 38%, rgba(184,135,58,0.11) 0, transparent 62%)," +
          "radial-gradient(120% 100% at 100% 0%, rgba(42,33,24,0.55) 0, transparent 52%)," +
          "linear-gradient(162deg, #171512 0%, #141311 52%, #100f0d 100%)",
        color: "#EFE8DC",
      }}
    >
      {/* textura dot-grid sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(214,190,131,.10) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.07,
          zIndex: 0,
        }}
      />

      <div ref={ref} className={`container mx-auto max-w-3xl text-center relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="flex items-center justify-center gap-3 mb-6" aria-hidden="true">
          <span style={{ width: 34, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,135,58,0.6))" }} />
          <span style={{ color: "#C79A5C" }}><MapPin size={26} strokeWidth={1.5} /></span>
          <span style={{ width: 34, height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.6), transparent)" }} />
        </div>
        <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#B8873A" }}>
          Atuação
        </p>
        <h2 className="font-display text-xl md:text-2xl lg:text-[2rem] font-bold mb-5 leading-snug" style={{ color: "#F1EAD9", letterSpacing: "-0.018em" }}>
          {sp
            ? "Acompanhamento pericial em São Paulo e em todo o Brasil"
            : "Acompanhamento presencial em Goiânia, Brasília, Uberlândia e em todo o Brasil"}
        </h2>
        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "#A9A093" }}>
          A Dra. Kelly acompanha a perícia presencialmente onde ela acontecer, em{" "}
          {sp ? (
            <>
              <strong style={{ color: "#D6BE83" }}>São Paulo, Campinas</strong> ou qualquer outra cidade do país.
            </>
          ) : (
            <>
              <strong style={{ color: "#D6BE83" }}>Goiânia, Brasília, Uberlândia</strong> e em qualquer comarca do país.
            </>
          )}{" "}
          Análise de laudo, formulação de quesitos e parecer técnico para processos de{" "}
          <strong style={{ color: "#F1EAD9" }}>todo o Brasil</strong>.
        </p>
      </div>
    </section>
  );
};

export default AtAtuacao;
