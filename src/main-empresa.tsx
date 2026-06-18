import { createRoot, hydrateRoot } from "react-dom/client";
import EmpresaIndex from "./pages/EmpresaIndex.tsx";
import "./index.css";

// Entry CLIENT da porta /empresa — separado de main.tsx de propósito, p/ que o bundle da
// LP do advogado ("/") permaneça intocado (nenhum código de empresa entra no entry do index).
const container = document.getElementById("root")!;
// Em produção o #root vem PRÉ-RENDERIZADO (SSG) -> HIDRATAMOS o DOM já pintado (sem flash).
// No dev server o #root vem vazio -> renderiza do zero.
if (container.firstChild) {
  hydrateRoot(container, <EmpresaIndex />);
} else {
  createRoot(container).render(<EmpresaIndex />);
}

// Medição passiva de Core Web Vitals de campo (LCP/INP/CLS/FCP/TTFB) -> GA4 via beacon __tvrs.
// Import dinâmico = chunk async (~2 KB), fora do caminho crítico; não bloqueia render/hidratação.
if (typeof window !== "undefined") {
  import("./lib/web-vitals").then((m) => m.initWebVitals());
}
