import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Entry CLIENT da porta /trabalhista (perícia trabalhista, antiga home). trabalhista.html é
// servida só em /trabalhista (rewrite do vercel.json), então o pathname aqui é sempre
// "/trabalhista" — passado ao App p/ ele renderizar <Index /> (e não NotFound).
const container = document.getElementById("root")!;
const pathname = window.location.pathname;

// O HTML de /trabalhista é pré-renderizado em build time (SSG via preact-render-to-string),
// então HIDRATAMOS para reaproveitar o DOM já pintado (sem flash/repaint).
// Em DEV o #root vem VAZIO — hidratar contra DOM vazio quebra o Preact (TypeError em
// diffChildren); por isso só hidratamos quando há conteúdo pré-renderizado.
const isPrerendered = container.childElementCount > 0;
if (isPrerendered) {
  hydrateRoot(container, <App pathname={pathname} />);
} else {
  container.innerHTML = "";
  createRoot(container).render(<App pathname={pathname} />);
}
