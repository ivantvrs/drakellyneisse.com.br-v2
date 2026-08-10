import { renderToStringAsync } from "preact-render-to-string";
import App from "./App";
import EmpresaIndex from "./pages/EmpresaIndex";
import AtIndex from "./pages/AtIndex";

// Entry usado SÓ no build (SSG). renderToStringAsync resolve os lazy()/Suspense das páginas,
// produzindo o HTML completo que é injetado no #root do dist/{index,empresa,trabalhista}.html.
// A HOME ("/") agora é a página de assistência técnica em perícia judicial (AtIndex) — a página mãe.
// A antiga home (perícia trabalhista, App→Index) virou a porta /trabalhista. /empresa permanece.
export async function render(pathname = "/"): Promise<string> {
  let tree;
  if (pathname === "/empresa" || pathname === "/empresa/") {
    tree = <EmpresaIndex />;
  } else if (pathname === "/trabalhista" || pathname === "/trabalhista/") {
    tree = <App pathname={pathname} />;
  } else if (pathname === "/assistente-tecnico-medico/sp" || pathname === "/assistente-tecnico-medico/sp/") {
    // Porta geo SP: mesma AtIndex da home, com hero/rodapé parametrizados p/ São Paulo.
    tree = <AtIndex geo="sp" />;
  } else if (pathname === "/assistente-tecnico-medico/br" || pathname === "/assistente-tecnico-medico/br/") {
    // Porta geo BR (campanha nacional): mesma AtIndex, rodapé com sede SP + atuação nacional.
    tree = <AtIndex geo="br" />;
  } else {
    // "/" e qualquer outra rota caem na home (AtIndex).
    tree = <AtIndex />;
  }
  return await renderToStringAsync(tree);
}
