// Build de produção com prerender (SSG) + otimização de LCP — um único comando, sem
// encadeamento de shell (funciona no PowerShell local e no sh do Vercel).
//
// Passos:
//   1. build do client  -> dist/ (index.html com scripts de tracking intactos, #root vazio)
//   2. build SSR do entry-server -> dist-ssr/ (só usado aqui, não vai pro deploy)
//   3. renderiza o App ("/") e injeta dentro do <div id="root"> do dist/index.html
//   4. injeta <link rel=preload> da imagem do hero (elemento de LCP no mobile)
//   5. inlina o CSS crítico (beasties) e carrega o resto async (remove render-blocking)
//   6. remove dist-ssr/
//
// SKIP_OPT=1 pula 4+5 (usado só pra medição A/B local do efeito da otimização).
//
// INEGOCIÁVEL: os <script> de tracking ficam byte-idênticos. O beasties só mexe em
// <style>/<link rel=stylesheet> (verificado: 9/9 scripts idênticos) e há um assert no fim.

import { build } from "vite";
import Beasties from "beasties";
import { readFile, writeFile, rm, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DIST_INDEX = path.join(DIST, "index.html");
const SERVER_OUT = path.join(ROOT, "dist-ssr");
const ROOT_RE = /<div id="root">\s*<\/div>/;
const SKIP_OPT = process.env.SKIP_OPT === "1";

// primitivos de tracking que TÊM que continuar no dist/index.html (safety net pós-beasties)
const TRACKING_PRIMITIVES = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
];

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
  const files = await readdir(path.join(DIST, "assets"));
  const hero = files.find((f) => /^hero-dra-kelly-.*\.webp$/.test(f));
  if (!hero) throw new Error("hero-dra-kelly-*.webp não encontrado em dist/assets");
  return `/assets/${hero}`;
}

function injectHeroPreload(html, href) {
  const tag = `<link rel="preload" as="image" type="image/webp" href="${href}" fetchpriority="high" />`;
  // o mais cedo possível no <head> para o preload scanner achar a imagem de LCP de imediato
  return html.replace(/<head>/i, `<head>\n    ${tag}`);
}

async function inlineCriticalCss(html) {
  const beasties = new Beasties({
    path: DIST,            // resolve os href /assets/*.css a partir de dist/
    publicPath: "/",
    preload: "swap",       // <link rel=preload as=style onload="this.rel='stylesheet'"> + <noscript>
    pruneSource: false,    // mantém o CSS completo para a carga async (não prune total)
    mergeStylesheets: true,
    logLevel: "silent",
  });
  return await beasties.process(html);
}

function assertScriptsPreserved(before, after) {
  const scriptsBefore = before.match(/<script[\s\S]*?<\/script>/gi) || [];
  const scriptsAfter = after.match(/<script[\s\S]*?<\/script>/gi) || [];
  if (scriptsBefore.length !== scriptsAfter.length) {
    throw new Error(`beasties alterou a quantidade de <script> (${scriptsBefore.length} -> ${scriptsAfter.length})`);
  }
  // ordem + bytes idênticos
  for (let i = 0; i < scriptsBefore.length; i++) {
    if (scriptsBefore[i] !== scriptsAfter[i]) {
      throw new Error(`<script> #${i} foi alterado/movido pelo beasties:\n  ${scriptsBefore[i].slice(0, 100)}`);
    }
  }
  for (const sig of TRACKING_PRIMITIVES) {
    if (!after.includes(sig)) throw new Error(`primitivo de tracking sumiu após otimização: ${sig}`);
  }
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

  if (!SKIP_OPT) {
    // 4) preload do hero (elemento de LCP no mobile — corrige os ~380ms de resource load delay)
    const heroHref = await findHeroHref();
    html = injectHeroPreload(html, heroHref);
    console.log(`[build] preload do hero: ${heroHref}`);

    // 5) CSS crítico inline + resto async (remove o CSS render-blocking)
    const beforeBeasties = html;
    html = await inlineCriticalCss(html);
    assertScriptsPreserved(beforeBeasties, html); // garante scripts byte-idênticos
    console.log("[build] CSS crítico inlinado (scripts de tracking byte-idênticos ✓)");
  } else {
    console.log("[build] SKIP_OPT=1 — pulei preload do hero + CSS crítico");
  }

  await writeFile(DIST_INDEX, html, "utf8");

  // 6) limpa o bundle de servidor (não deve ir pro deploy)
  await rm(SERVER_OUT, { recursive: true, force: true });

  console.log(`[build] OK — ${appHtml.length} chars no #root; index.html final = ${html.length} bytes`);
}

main().catch((err) => {
  console.error("[build] FALHOU:", err);
  process.exit(1);
});
