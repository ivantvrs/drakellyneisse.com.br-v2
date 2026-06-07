import { hydrateRoot } from "react-dom/client";
import EmpresaIndex from "./pages/EmpresaIndex.tsx";
import "./index.css";

// Entry CLIENT da porta /empresa — separado de main.tsx de propósito, p/ que o bundle da
// LP do advogado ("/") permaneça intocado (nenhum código de empresa entra no entry do index).
// O HTML da /empresa é pré-renderizado em build time (SSG), então HIDRATAMOS o DOM já pintado.
const container = document.getElementById("root")!;
hydrateRoot(container, <EmpresaIndex />);
