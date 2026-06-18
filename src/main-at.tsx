import { createRoot, hydrateRoot } from "react-dom/client";
import AtIndex from "./pages/AtIndex.tsx";
import "./index.css";

// Entry CLIENT da porta /at (LP nacional) — separado de main.tsx/main-empresa.tsx de propósito,
// p/ que os bundles das outras LPs permaneçam intocados (nenhum código da /at entra neles).
const container = document.getElementById("root")!;
// Em produção o #root vem PRÉ-RENDERIZADO (SSG) -> HIDRATAMOS o DOM já pintado (sem flash).
// No dev server o #root vem vazio -> renderiza do zero.
if (container.firstChild) {
  hydrateRoot(container, <AtIndex />);
} else {
  createRoot(container).render(<AtIndex />);
}
