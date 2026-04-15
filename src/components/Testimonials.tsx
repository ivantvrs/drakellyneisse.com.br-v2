import { useInView } from "@/hooks/useInView";
import stationeryImg from "@/assets/prova-social-stationery.webp";

const testimonials = [
  {
    text: "A análise técnica da Dra. Kelly trouxe clareza a um caso que parecia tecnicamente fraco. O parecer fundamentado foi decisivo para reverter a linha argumentativa.",
    name: "Dr. R.M.",
    role: "Advogado Trabalhista",
  },
  {
    text: "Os quesitos estratégicos elaborados pela Dra. Kelly direcionaram a perícia de forma que o laudo refletiu exatamente o que precisávamos demonstrar no processo.",
    name: "Dra. C.S.",
    role: "Advogada Cível",
  },
  {
    text: "Precisei de uma impugnação de laudo com urgência. A devolutiva foi rápida, tecnicamente sólida e me deu segurança para sustentar a argumentação no recurso.",
    name: "Dr. F.A.",
    role: "Advogado Trabalhista",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useInView();

  return (
    <section
      className="relative py-24 md:py-32 testimonials-bg"
      style={{
        backgroundImage: `url(${stationeryImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(15, 15, 15, 0.88)' }}
      />

      <div ref={ref} className={`container mx-auto max-w-4xl fade-in-section relative z-10 ${isVisible ? "is-visible" : ""}`}>
        <h2 className="font-display text-2xl md:text-[2rem] lg:text-[2.5rem] font-bold text-center mb-16 leading-tight gold-shine">
          O que advogados dizem sobre esse suporte técnico
        </h2>

        <div className="space-y-16">
          {testimonials.map(({ text, name, role }, i) => (
            <div
              key={name}
              className="stagger-item text-center max-w-2xl mx-auto"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Decorative quote */}
              <span
                className="font-display block mb-4 select-none"
                style={{ fontSize: '4rem', lineHeight: 1, color: 'rgba(212, 168, 83, 0.2)' }}
                aria-hidden="true"
              >
                "
              </span>
              <p className="font-display text-lg md:text-xl leading-relaxed italic mb-6" style={{ color: '#F5F0E8' }}>
                {text}
              </p>
              <p className="font-label text-sm font-semibold" style={{ color: '#E8C77B' }}>{name}</p>
              <p className="font-label text-xs mt-1" style={{ color: '#8A857A' }}>{role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
