import { lazy, Suspense } from "react";
import AtHeader from "@/components/at/AtHeader";
import AtHero from "@/components/at/AtHero";
import AtParaQuem from "@/components/at/AtParaQuem";
import PageRainFX from "@/components/PageRainFX";

// Abaixo da dobra carrega sob demanda (mesmo padrão das LPs / e /empresa).
const AtOQueE = lazy(() => import("@/components/at/AtOQueE"));
const AtComparativo = lazy(() => import("@/components/at/AtComparativo"));
const AtPublicos = lazy(() => import("@/components/at/AtPublicos"));
const AtAutoridade = lazy(() => import("@/components/at/AtAutoridade"));
const AtServicos = lazy(() => import("@/components/at/AtServicos"));
const AtSobre = lazy(() => import("@/components/at/AtSobre"));
const AtFAQ = lazy(() => import("@/components/at/AtFAQ"));
const AtAtuacao = lazy(() => import("@/components/at/AtAtuacao"));
const AtCTAFinal = lazy(() => import("@/components/at/AtCTAFinal"));
const Footer = lazy(() => import("@/components/Footer"));
const AtFloatingCTAs = lazy(() => import("@/components/at/AtFloatingCTAs"));

const AtIndex = () => (
  <>
    <AtHeader />
    <main>
      <AtHero />
      <AtParaQuem />
      <Suspense fallback={null}>
        <AtOQueE />
        <AtComparativo />
        <AtPublicos />
        <AtAutoridade />
        <AtServicos />
        <AtSobre />
        <AtFAQ />
        <AtAtuacao />
        <AtCTAFinal />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
      <AtFloatingCTAs />
    </Suspense>
    {/* Chuva de meteoros dourados na página toda (sempre ligado, desktop) */}
    <PageRainFX always />
  </>
);

export default AtIndex;
