import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => {
  const p = window.location.pathname;
  return p === "/" || p === "" ? <Index /> : <NotFound />;
};

export default App;
