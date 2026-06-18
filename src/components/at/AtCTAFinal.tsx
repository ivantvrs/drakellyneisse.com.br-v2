import { useInView } from "@/hooks/useInView";
import AtCTAs from "./AtCTAs";

const AtCTAFinal = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "80px 0",
        background:
          "radial-gradient(40% 38% at 18% 26%, rgba(214,190,131,0.10) 0, transparent 56%)," +
          "radial-gradient(46% 50% at 86% 36%, rgba(184,135,58,0.12) 0, transparent 60%)," +
          "radial-gradient(120% 90% at 100% 0%, rgba(42,33,24,0.55) 0, transparent 52%)," +
          "linear-gradient(160deg, #171512 0%, #141311 52%, #100f0d 100%)",
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
      {/* vignette sutil nas bordas */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ boxShadow: "inset 0 0 140px 30px rgba(0,0,0,0.5)", zIndex: 0 }}
      />

      <div ref={ref} className={`container mx-auto max-w-3xl text-center relative z-10 fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="flex items-center justify-center gap-3 mb-7" aria-hidden="true">
          <span style={{ width: 44, height: 1, background: "linear-gradient(90deg, transparent, rgba(184,135,58,0.5))" }} />
          <span style={{ width: 7, height: 7, transform: "rotate(45deg)", background: "#B8873A", boxShadow: "0 0 0 3px rgba(184,135,58,0.12)" }} />
          <span style={{ width: 44, height: 1, background: "linear-gradient(90deg, rgba(184,135,58,0.5), transparent)" }} />
        </div>

        <h2
          className="font-display font-bold mb-9 leading-[1.1] mx-auto max-w-2xl"
          style={{ fontSize: "clamp(27px, 3.2vw, 44px)", letterSpacing: "-0.02em", color: "#F4EDDE" }}
        >
          A perícia médica é uma prova técnica, e prova técnica se enfrenta com{" "}
          <em className="italic" style={{ color: "#D6BE83" }}>fundamentação médica</em>.
        </h2>

        <div className="mb-8 flex justify-center">
          <AtCTAs
            whatsappLabel="Falar com a Dra. Kelly no WhatsApp →"
            size="lg"
            align="center"
            waCta="cta_final_wpp"
          />
        </div>

        <p className="font-label text-sm" style={{ color: "#8d8474" }}>
          Resposta rápida · Cível e trabalhista · CRM/MG 109.153
        </p>
      </div>
    </section>
  );
};

export default AtCTAFinal;
