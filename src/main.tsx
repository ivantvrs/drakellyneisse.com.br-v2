import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const pathname = window.location.pathname;

// O HTML do "/" é pré-renderizado em build time (SSG via preact-render-to-string),
// então HIDRATAMOS para reaproveitar o DOM já pintado (sem flash/repaint).
// Em DEV (e em rotas que caem no shell via rewrite, ex.: 404) o #root vem VAZIO —
// hidratar contra DOM vazio quebra o Preact (TypeError em diffChildren) e aborta a
// cauda da árvore. Por isso só hidratamos quando há conteúdo pré-renderizado;
// caso contrário renderizamos do zero. Produção (com SSG) continua hidratando.
const isPrerendered = container.childElementCount > 0;
if ((pathname === "/" || pathname === "") && isPrerendered) {
  hydrateRoot(container, <App pathname={pathname} />);
} else {
  container.innerHTML = "";
  createRoot(container).render(<App pathname={pathname} />);
}
