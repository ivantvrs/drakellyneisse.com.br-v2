import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// `pathname` é injetado pelo prerender em build time (sempre "/") e pelo client na
// hidratação. Mantém o App renderizável fora do browser (SSG) sem tocar window no corpo.
const App = ({ pathname }: { pathname?: string }) => {
  const p = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  return p === "/" || p === "" ? <Index /> : <NotFound />;
};

export default App;
