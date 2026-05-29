import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const pathname = window.location.pathname;

// O HTML do "/" é pré-renderizado em build time (SSG via preact-render-to-string),
// então HIDRATAMOS para reaproveitar o DOM já pintado (sem flash/repaint).
// Rotas que caem no shell do "/" via rewrite do Vercel (ex.: 404) renderizam do zero.
if (pathname === "/" || pathname === "") {
  hydrateRoot(container, <App pathname={pathname} />);
} else {
  container.innerHTML = "";
  createRoot(container).render(<App pathname={pathname} />);
}
