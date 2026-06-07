import { renderToStringAsync } from "preact-render-to-string";
import App from "./App";
import EmpresaIndex from "./pages/EmpresaIndex";

// Entry usado SÓ no build (SSG). renderToStringAsync resolve os lazy()/Suspense das páginas,
// produzindo o HTML completo que é injetado no #root do dist/{index,empresa}.html.
// A /empresa é roteada AQUI (fora do App) p/ manter o bundle client da "/" intocado.
export async function render(pathname = "/"): Promise<string> {
  const tree =
    pathname === "/empresa" || pathname === "/empresa/"
      ? <EmpresaIndex />
      : <App pathname={pathname} />;
  return await renderToStringAsync(tree);
}
