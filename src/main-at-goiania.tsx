import { createRoot, hydrateRoot } from "react-dom/client";
import AtIndex from "./pages/AtIndex.tsx";
import "./index.css";

// Entry CLIENT da porta geo /assistente-tecnico-medico/goiania (campanha Ads [GO] Goiânia 60 km).
// Espelha main-at-sp.tsx com a ÚNICA diferença de renderizar <AtIndex geo="goiania" /> — assim a
// hidratação casa 1:1 com o SSG desta porta (que também renderiza geo="goiania" no entry-server).
const container = document.getElementById("root")!;
// Em produção o #root vem PRÉ-RENDERIZADO (SSG) -> HIDRATAMOS o DOM já pintado (sem flash).
// No dev server o #root vem vazio -> renderiza do zero.
if (container.firstChild) {
  hydrateRoot(container, <AtIndex geo="goiania" />);
} else {
  createRoot(container).render(<AtIndex geo="goiania" />);
}

// Medição passiva de Core Web Vitals de campo (LCP/INP/CLS/FCP/TTFB) -> GA4 via beacon __tvrs.
if (typeof window !== "undefined") {
  import("./lib/web-vitals").then((m) => m.initWebVitals());
}
