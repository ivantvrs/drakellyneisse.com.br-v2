import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import Metrics from "@/components/Metrics";
import SectionTransition from "@/components/SectionTransition";

const FAQ = lazy(() => import("@/components/FAQ"));
const CTAFinal = lazy(() => import("@/components/CTAFinal"));
const InstitutionalContact = lazy(() => import("@/components/InstitutionalContact"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.default })));
const WhatsAppButtonMobile = lazy(() => import("@/components/WhatsAppButton").then(m => ({ default: m.WhatsAppButtonMobile })));
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const MobileStickyBar = lazy(() => import("@/components/MobileStickyBar"));

const Index = () => (
  <>
    <Header />
    <main>
      <Hero />
      <ProblemSolution />
      <SectionTransition fromColor="#0F0F0F" toColor="#1A1A1A" />
      <Services />
      <SectionTransition fromColor="#1A1A1A" toColor="#0F0F0F" />
      <Testimonials />
      <SectionTransition fromColor="#0F0F0F" toColor="#1A1A1A" />
      <HowItWorks />
      <SectionTransition fromColor="#1A1A1A" toColor="#0F0F0F" />
      <About />
      <SectionTransition fromColor="#0F0F0F" toColor="#0F0F0F" variant="subtle" />
      <Metrics />
      <Suspense fallback={null}>
        <SectionTransition fromColor="#0F0F0F" toColor="#0F0F0F" variant="subtle" />
        <FAQ />
        <SectionTransition fromColor="#0F0F0F" toColor="#1A1A1A" />
        <CTAFinal />
        <SectionTransition fromColor="#0F0F0F" toColor="#0F0F0F" variant="subtle" />
        <InstitutionalContact />
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <SectionTransition fromColor="#0F0F0F" toColor="#1A1A1A" />
      <Footer />
      <WhatsAppButton />
      <WhatsAppButtonMobile />
      <ScrollToTop />
      <MobileStickyBar />
    </Suspense>
  </>
);

export default Index;
