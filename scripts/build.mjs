// Build de produção com prerender (SSG) — um único comando, sem encadeamento de shell
// (funciona no PowerShell local e no sh do Vercel).
//
// Passos:
//   1. build do client  -> dist/ (index.html com scripts de tracking intactos, #root vazio)
//   2. build SSR do entry-server -> dist-ssr/ (só usado aqui, não vai pro deploy)
//   3. renderiza o App ("/") para HTML e injeta dentro do <div id="root"> do dist/index.html
//   4. injeta <link rel=preload> da imagem do hero (elemento de LCP no mobile)
//   5. remove dist-ssr/
//
// Resultado: dist/index.html já contém o conteúdo real (H1, parágrafos, copy do negócio)
// no markup estático, sem precisar executar JS. O client hidrata por cima (main.tsx).

import { build } from "vite";
import { readFile, writeFile, rm, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_INDEX = path.join(ROOT, "dist", "index.html");
const SERVER_OUT = path.join(ROOT, "dist-ssr");
const ROOT_RE = /<div id="root">\s*<\/div>/;

async function findServerEntry() {
  const files = await readdir(SERVER_OUT);
  const entry = files.find(
    (f) => f.startsWith("entry-server") && (f.endsWith(".js") || f.endsWith(".mjs"))
  );
  if (!entry) {
    throw new Error(`entry-server.* não encontrado em ${SERVER_OUT} (achei: ${files.join(", ")})`);
  }
  return path.join(SERVER_OUT, entry);
}

// acha o nome content-hashed da imagem do hero (não hardcodar o hash)
async function findHeroHref() {
  const files = await readdir(path.join(ROOT, "dist", "assets"));
  const hero = files.find((f) => /^hero-dra-kelly-.*\.webp$/.test(f));
  if (!hero) throw new Error("hero-dra-kelly-*.webp não encontrado em dist/assets");
  return `/assets/${hero}`;
}

async function main() {
  // 1) client
  console.log("[build] client…");
  await build();

  // 2) SSR (entry-server) — isSsrBuild fica true no vite.config.
  //    noExternal: true faz o Vite EMPACOTAR as deps (lucide-react, preact, etc.) aplicando
  //    o alias react->preact/compat. Sem isso, o Node carregaria o React real de lucide-react
  //    e o preact-render-to-string quebraria ("[object Object] is not a valid HTML tag name").
  console.log("[build] ssr (entry-server)…");
  await build({
    ssr: { noExternal: true },
    build: {
      ssr: "src/entry-server.tsx",
      outDir: "dist-ssr",
      emptyOutDir: true,
    },
  });

  // 3) renderiza e injeta no #root
  console.log("[build] prerender…");
  const serverEntry = await findServerEntry();
  const { render } = await import(pathToFileURL(serverEntry).href);
  const appHtml = await render("/");

  let html = await readFile(DIST_INDEX, "utf8");
  if (!ROOT_RE.test(html)) {
    throw new Error('marcador <div id="root"></div> não encontrado em dist/index.html');
  }
  html = html.replace(ROOT_RE, `<div id="root">${appHtml}</div>`);

  // 4) preload da imagem do hero (elemento de LCP no mobile — corrige o resource load delay).
  //    Resource hint INERTE: não executa JS, não toca em nenhum <script>. Injeta cedo no <head>.
  const heroHref = await findHeroHref();
  html = html.replace(
    /<head>/i,
    `<head>\n    <link rel="preload" as="image" type="image/webp" href="${heroHref}" fetchpriority="high" />`
  );
  console.log(`[build] preload do hero: ${heroHref}`);

  await writeFile(DIST_INDEX, html, "utf8");

  // 5) limpa o bundle de servidor (não deve ir pro deploy)
  await rm(SERVER_OUT, { recursive: true, force: true });

  console.log(`[build] OK — ${appHtml.length} chars no #root; preload do hero injetado`);
}

main().catch((err) => {
  console.error("[build] FALHOU:", err);
  process.exit(1);
});
