import { renderToStringAsync } from "preact-render-to-string";
import App from "./App";
import EmpresaIndex from "./pages/EmpresaIndex";
import AtIndex from "./pages/AtIndex";

// Entry usado SÓ no build (SSG). renderToStringAsync resolve os lazy()/Suspense das páginas,
// produzindo o HTML completo que é injetado no #root do dist/{index,empresa,at}.html.
// As portas /empresa e /at são roteadas AQUI (fora do App) p/ manter o bundle client da "/" intocado.
export async function render(pathname = "/"): Promise<string> {
  let tree;
  if (pathname === "/empresa" || pathname === "/empresa/") {
    tree = <EmpresaIndex />;
  } else if (pathname === "/at" || pathname === "/at/") {
    tree = <AtIndex />;
  } else {
    tree = <App pathname={pathname} />;
  }
  return await renderToStringAsync(tree);
}
