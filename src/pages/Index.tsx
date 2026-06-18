import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PositioningStatement from "@/components/PositioningStatement";
import TargetAudience from "@/components/TargetAudience";
import PageRainFX from "@/components/PageRainFX";

const ProblemSolution = lazy(() => import("@/components/ProblemSolution"));
const Services = lazy(() => import("@/components/Services"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const About = lazy(() => import("@/components/About"));
const Metrics = lazy(() => import("@/components/Metrics"));
const FAQ = lazy(() => import("@/components/FAQ"));
const CTAFinal = lazy(() => import("@/components/CTAFinal"));
const InstitutionalContact = lazy(() => import("@/components/InstitutionalContact"));
const Footer = lazy(() => import("@/components/Footer"));
// Botão flutuante redondo do WhatsApp agora vem do FAB vanilla (public/balanca-fab.js), incluído em index.html.
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const MobileStickyBar = lazy(() => import("@/components/MobileStickyBar"));

const Index = () => (
  <>
    <Header />
    <main>
      <Hero />
      <PositioningStatement />
      <Suspense fallback={null}>
        <ProblemSolution />
        <TargetAudience />
        <Services />
        <HowItWorks />
        <Testimonials />
        <About />
        <Metrics />
        <FAQ />
        <CTAFinal />
        <InstitutionalContact />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
      <ScrollToTop />
      <MobileStickyBar />
    </Suspense>
    {/* Experimento: chuva de meteoros na página toda (só com ?fx=4, desktop) */}
    <PageRainFX />
  </>
);

export default Index;
