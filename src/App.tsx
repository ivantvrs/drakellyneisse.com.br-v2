import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// `pathname` é injetado pelo prerender em build time ("/trabalhista") e pelo client na
// hidratação. Mantém o App renderizável fora do browser (SSG) sem tocar window no corpo.
// Este App agora serve SÓ a porta /trabalhista (perícia trabalhista, antiga home). A HOME ("/")
// é a AtIndex e a /empresa têm entries próprios (main-at.tsx / main-empresa.tsx), roteadas no
// entry-server — fora deste App, de propósito, p/ isolar os bundles de cada porta.
const App = ({ pathname }: { pathname?: string }) => {
  const p = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/trabalhista");
  return p === "/trabalhista" || p === "/trabalhista/" ? <Index /> : <NotFound />;
};

export default App;
