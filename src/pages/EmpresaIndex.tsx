import { lazy, Suspense } from "react";
import EmpresaHeader from "@/components/empresa/EmpresaHeader";
import EmpresaHero from "@/components/empresa/EmpresaHero";
import AdvogadoPediu from "@/components/empresa/AdvogadoPediu";

// Abaixo da dobra carrega sob demanda (mesmo padrão da LP principal).
const Concausa = lazy(() => import("@/components/empresa/Concausa"));
const OQueFaz = lazy(() => import("@/components/empresa/OQueFaz"));
const Relogio = lazy(() => import("@/components/empresa/Relogio"));
const AoLado = lazy(() => import("@/components/empresa/AoLado"));
const SobreEmpresa = lazy(() => import("@/components/empresa/SobreEmpresa"));
const GeoEmpresa = lazy(() => import("@/components/empresa/GeoEmpresa"));
const FAQEmpresa = lazy(() => import("@/components/empresa/FAQEmpresa"));
const CTAFinalEmpresa = lazy(() => import("@/components/empresa/CTAFinalEmpresa"));
const Footer = lazy(() => import("@/components/Footer"));
const EmpresaFloatingCTAs = lazy(() => import("@/components/empresa/EmpresaFloatingCTAs"));

const EmpresaIndex = () => (
  <>
    <EmpresaHeader />
    <main>
      <EmpresaHero />
      <AdvogadoPediu />
      <Suspense fallback={null}>
        <Concausa />
        <OQueFaz />
        <Relogio />
        <AoLado />
        <SobreEmpresa />
        <GeoEmpresa />
        <FAQEmpresa />
        <CTAFinalEmpresa />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
      <EmpresaFloatingCTAs />
    </Suspense>
  </>
);

export default EmpresaIndex;
