import { createRoot, hydrateRoot } from "react-dom/client";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import "./index.css";

// Entry CLIENT do 404.html. A página é 100% estática (SSG) e não depende de JS para funcionar —
// este entry só hidrata o markup já pintado, mantendo o mesmo pipeline das outras portas.
// Sem web-vitals aqui: não faz sentido medir CWV de campo de uma página de erro.
const container = document.getElementById("root")!;
if (container.firstChild) {
  hydrateRoot(container, <NotFoundPage />);
} else {
  createRoot(container).render(<NotFoundPage />);
}
