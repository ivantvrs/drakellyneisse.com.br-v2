import AtHeader from "@/components/at/AtHeader";
import AtHero from "@/components/at/AtHero";
import AtParaQuem from "@/components/at/AtParaQuem";
import AtOQueE from "@/components/at/AtOQueE";
import AtComparativo from "@/components/at/AtComparativo";
import AtPublicos from "@/components/at/AtPublicos";
import AtAutoridade from "@/components/at/AtAutoridade";
import AtServicos from "@/components/at/AtServicos";
import AtSobre from "@/components/at/AtSobre";
import AtFAQ from "@/components/at/AtFAQ";
import AtAtuacao from "@/components/at/AtAtuacao";
import AtCTAFinal from "@/components/at/AtCTAFinal";
import Footer from "@/components/Footer";
import AtFloatingCTAs from "@/components/at/AtFloatingCTAs";
import PageRainFX from "@/components/PageRainFX";
import { SP_FOOTER_SEDE_LINE } from "@/components/at/geo-sp";
import { AtGeoContext } from "@/components/at/cta-at";

// IMPORTS DIRETOS (sem lazy()/<Suspense>) DE PROPÓSITO. Esta é a HOME (/), pré-renderizada por
// SSG: o conteúdo já vem pintado no HTML, então o code-splitting por dobra NÃO acelera a 1ª
// pintura — e, com preact/compat, hidratar vários lazy() dentro de um <Suspense> compartilhado
// DESLOCAVA os atributos (class/style/background) das <section> a partir da ~7ª dobra, jogando
// títulos claros (feitos p/ fundo escuro) sobre fundos claros = a "dobra fantasma" relatada.
// Árvore estática => hidratação 1:1 com o SSG, sem deslocamento. Ver [[reveal-dobras-useinview]].
// `geo="sp"` (porta /assistente-tecnico-medico/sp — campanha Ads do estado de São Paulo):
// mesma árvore e MESMA copy da página mãe (decisão do Ivan 10/07); o geo muda SÓ a sede do
// rodapé e o deeplink Tintim (fluxo dedicado SP, via AtGeoContext + useAtWhatsappUrl).
const AtIndex = ({ geo }: { geo?: "sp" }) => (
  <AtGeoContext.Provider value={geo}>
    <AtHeader />
    <main>
      <AtHero />
      <AtParaQuem />
      <AtOQueE />
      <AtComparativo />
      <AtPublicos />
      <AtAutoridade />
      <AtServicos />
      <AtSobre />
      <AtFAQ />
      <AtAtuacao />
      <AtCTAFinal />
    </main>
    <Footer
      tagline="Assistência técnica médica em perícia judicial — trabalhista e cível"
      sedeLine={geo === "sp" ? SP_FOOTER_SEDE_LINE : undefined}
    />
    <AtFloatingCTAs />
    {/* Chuva de meteoros dourados na página toda (sempre ligado, desktop) */}
    <PageRainFX always />
  </AtGeoContext.Provider>
);

export default AtIndex;
