import Footer from "@/components/Footer";

// Página 404 REAL do site (dist/404.html) — servida pela Vercel com status 404 nos caminhos que
// não casam com nenhuma rewrite. Existe para acabar com o soft 404: antes, o catch-all
// `/(.*) -> /index.html` devolvia 200 + home para QUALQUER URL, então uma final_url errada num
// anúncio era aprovada pelo Google Ads e queimava verba caindo na home de outra praça.
//
// Deliberadamente SEM tracking e SEM CTA de WhatsApp: o 404.html não herda os scripts inline do
// index.html, então um botão aqui geraria clique NÃO rastreado (pior que não ter). Também não
// queremos page_view/conversão saindo de uma página de erro. Ver [[soft-404-vercel]].
//
// Sem hooks de scroll/reveal de propósito: a página é estática, pintada pelo SSG, e não depende
// de JS para ser útil.
const NotFoundPage = () => (
  <>
    {/* header enxuto: só a assinatura de marca, sem menu e sem CTA */}
    <header
      className="relative z-10"
      style={{ borderBottom: "1px solid rgba(191,160,104,0.16)", padding: "18px 0" }}
      aria-label="Cabeçalho"
    >
      <div className="container mx-auto flex items-center gap-3">
        <a href="/" className="flex items-center gap-3" aria-label="Dra. Kelly Neisse — página inicial">
          <span className="font-display font-semibold leading-none flex-shrink-0" style={{ fontSize: 24 }}>
            <span style={{ color: "#F4EDDE" }}>K</span>
            <span style={{ color: "#C79A5C" }}>N</span>
          </span>
          <span aria-hidden="true" style={{ width: 1, height: 28, background: "rgba(212,168,83,0.42)" }} />
          <span className="flex flex-col">
            <span className="font-display font-semibold leading-tight" style={{ fontSize: 15.5, color: "#F4EDDE" }}>
              Dra. Kelly Neisse
            </span>
            <span className="font-label uppercase" style={{ fontSize: 9.5, letterSpacing: "0.18em", color: "#B7A98E", marginTop: 2 }}>
              Médica Perita Judicial
            </span>
          </span>
        </a>
      </div>
    </header>

    <main
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "68vh",
        background:
          "radial-gradient(58% 46% at 20% 16%, rgba(214,190,131,0.08) 0, transparent 56%)," +
          "radial-gradient(54% 56% at 84% 38%, rgba(184,135,58,0.11) 0, transparent 62%)," +
          "linear-gradient(162deg, #171512 0%, #141311 52%, #100f0d 100%)",
        color: "#EFE8DC",
      }}
    >
      <div className="container mx-auto max-w-2xl py-20 md:py-24">
        <p className="font-label text-xs font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: "#B8873A" }}>
          Erro 404
        </p>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-5 leading-snug"
          style={{ color: "#F1EAD9", letterSpacing: "-0.018em" }}
        >
          Página não encontrada
        </h1>
        <p className="text-base md:text-lg leading-relaxed mb-9" style={{ color: "#A9A093" }}>
          O endereço que você acessou não existe ou foi alterado. Escolha abaixo por onde continuar.
        </p>

        <nav className="flex flex-col sm:flex-row gap-3" aria-label="Páginas do site">
          <a
            href="/"
            className="font-label text-sm font-semibold px-6 py-3.5 rounded-md text-center transition-colors"
            style={{ background: "#B8873A", color: "#141311" }}
          >
            Assistência técnica médica →
          </a>
          <a
            href="/empresa"
            className="font-label text-sm font-semibold px-6 py-3.5 rounded-md text-center"
            style={{ border: "1px solid rgba(212,168,83,0.38)", color: "#E8CB8E" }}
          >
            Para empresas
          </a>
          <a
            href="/trabalhista"
            className="font-label text-sm font-semibold px-6 py-3.5 rounded-md text-center"
            style={{ border: "1px solid rgba(212,168,83,0.38)", color: "#E8CB8E" }}
          >
            Perícia trabalhista
          </a>
        </nav>
      </div>
    </main>

    <Footer tagline="Assistência técnica médica em perícia judicial — trabalhista e cível" />
  </>
);

export default NotFoundPage;
