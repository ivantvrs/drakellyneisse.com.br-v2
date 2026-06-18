import aboutImage from "@/assets/kelly-sobre.webp";
import aboutImageAvif from "@/assets/kelly-sobre.avif";
import { useInView } from "@/hooks/useInView";

const credentials = [
  "CRM/MG 109.153",
  "Perícia Médica (CPEM)",
  "Medicina do Trabalho (IFH)",
  "TRT-3 · TJGO · TJSP · TJMT · TJMG",
];

const AtSobre = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      id="sobre"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(46% 40% at 22% 26%, rgba(201,163,92,0.10) 0, transparent 56%)," +
          "radial-gradient(60% 60% at 100% 100%, rgba(184,135,58,0.06) 0, transparent 60%)," +
          "linear-gradient(165deg, #EFE7D7 0%, #EAE2D2 55%, #E6DCC8 100%)",
      }}
    >
      {/* textura papel/linho */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.55,
          background:
            "repeating-linear-gradient(135deg, rgba(120,90,40,0.018) 0px, rgba(120,90,40,0.018) 1px, transparent 1px, transparent 8px)",
        }}
      />

      <div ref={ref} className={`container mx-auto relative fade-in-section ${isVisible ? "is-visible" : ""}`}>
        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-20 items-center max-w-[1060px] mx-auto">
          {/* ── Imagem (perfil editorial) ── */}
          <div className="relative max-w-[360px] mx-auto lg:max-w-none lg:rotate-[-0.6deg]">
            <div
              aria-hidden="true"
              className="absolute -inset-5 pointer-events-none"
              style={{ background: "radial-gradient(60% 55% at 38% 30%, rgba(184,135,58,0.16) 0, transparent 72%)" }}
            />

            <div className="relative" style={{ borderRadius: 13, overflow: "hidden", boxShadow: "0 26px 50px -28px rgba(60,44,20,0.55), 0 6px 16px -10px rgba(60,44,20,0.4)" }}>
              <picture>
                <source srcSet={aboutImageAvif} type="image/avif" />
                <img
                  src={aboutImage}
                  alt="Dra. Kelly Jaqueline Neisse em retrato institucional"
                  width={1200}
                  height={1797}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                  style={{
                    aspectRatio: "1200/1797",
                    objectPosition: "54% 22%",
                    filter: "saturate(0.92) contrast(1.02) brightness(0.99)",
                  }}
                />
              </picture>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{ height: "32%", background: "linear-gradient(to top, rgba(30,22,12,0.28), transparent)" }}
              />
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ borderRadius: 13, border: "1px solid rgba(184,135,58,0.28)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }} />
            </div>

            <div className="flex items-center gap-2.5 mt-4 px-1">
              <span aria-hidden="true" style={{ width: 22, height: 1, background: "#B8873A", flexShrink: 0 }} />
              <p className="font-label text-[11px] tracking-[0.14em] uppercase" style={{ color: "#7A6A4A" }}>
                CRM/MG 109.153 · Médica Perita Judicial
              </p>
            </div>
          </div>

          {/* ── Texto (perfil) ── */}
          <div>
            <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#B8873A" }}>
              Sobre
            </p>
            <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.4rem] font-bold leading-[1.1] mb-2.5" style={{ color: "#1F252B", letterSpacing: "-0.018em" }}>
              Dra. Kelly Jaqueline Neisse
            </h2>
            <p className="font-label text-[13px] tracking-[0.02em] mb-7 pb-1" style={{ color: "#9C7C43" }}>
              Médica Perita Judicial · CRM/MG 109.153
            </p>

            <div className="space-y-4 text-[15px] leading-[1.75] mb-8 max-w-[46ch]" style={{ color: "#5E6470" }}>
              <p>
                Dra. Kelly Jaqueline Neisse é <strong style={{ color: "#1F252B", fontWeight: 600 }}>médica perita judicial</strong> (CRM/MG 109.153).
                Formação em Perícia Médica e em Medicina do Trabalho. Perita cadastrada em{" "}
                <strong style={{ color: "#1F252B", fontWeight: 600 }}>TRT-3, TJGO, TJSP, TJMT e TJMG</strong>.
              </p>
              <p>
                Trabalha exclusivamente com perícias médicas judiciais,{" "}
                <strong style={{ color: "#1F252B", fontWeight: 600 }}>a assistência técnica é o foco principal da sua prática</strong>, não uma atividade paralela.
              </p>
            </div>

            {/* ── Régua de credenciais (editorial) ── */}
            <div className="relative pt-5" style={{ borderTop: "1px solid rgba(184,135,58,0.22)" }}>
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {credentials.map((text, i) => (
                  <li key={text} className="flex items-center gap-x-3">
                    {i > 0 && (
                      <span aria-hidden="true" className="hidden sm:block" style={{ width: 1, height: 12, background: "rgba(184,135,58,0.32)" }} />
                    )}
                    <span className="font-label text-[12px] tracking-[0.04em]" style={{ color: "#4A4A40" }}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtSobre;
