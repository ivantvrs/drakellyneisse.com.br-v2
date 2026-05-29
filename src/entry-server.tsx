import { renderToStringAsync } from "preact-render-to-string";
import App from "./App";

// Entry usado SÓ no build (SSG). renderToStringAsync resolve os lazy()/Suspense do Index,
// produzindo o HTML completo da página que é injetado no #root do dist/index.html.
export async function render(pathname = "/"): Promise<string> {
  return await renderToStringAsync(<App pathname={pathname} />);
}
