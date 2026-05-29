// Build de produção com prerender (SSG) — um único comando, sem encadeamento de shell
// (funciona no PowerShell local e no sh do Vercel).
//
// Passos:
//   1. build do client  -> dist/ (index.html com scripts de tracking intactos, #root vazio)
//   2. build SSR do entry-server -> dist-ssr/ (só usado aqui, não vai pro deploy)
//   3. renderiza o App ("/") para HTML e injeta dentro do <div id="root"> do dist/index.html
//   4. injeta <link rel=preload> RESPONSIVO da imagem do hero (elemento de LCP no mobile)
//   5. inlina o CSS crítico (beasties só COMPUTA; injeção CIRÚRGICA por string) e carrega o
//      CSS completo async — os <script> de tracking NUNCA passam por parser (gate byte-a-byte)
//   6. remove dist-ssr/
//
// Resultado: dist/index.html já contém o conteúdo real (H1, parágrafos, copy do negócio)
// no markup estático, sem precisar executar JS. O client hidrata por cima (main.tsx).
//
// SKIP_CRITICAL=1 pula só o passo 5 (usado em medição A/B local).

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

// primitivos de tracking que TÊM que continuar no dist/index.html (safety net pós-Fase B)
const TRACKING_PRIMITIVES = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
];

const extractScripts = (s) => s.match(/<script[\s\S]*?<\/script>/gi) || [];

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

// monta o srcset (3 larguras) com os nomes content-hashed das variantes do hero (sem hardcodar
// hash): hero-dra-kelly-m-[h] (828w), hero-dra-kelly-md-[h] (1280w), hero-dra-kelly-[h] (1920w).
async function findHeroSrcset() {
  const files = await readdir(path.join(ROOT, "dist", "assets"));
  const pick = (re) => {
    const f = files.find((x) => re.test(x));
    if (!f) throw new Error(`variante do hero não encontrada (${re}) em dist/assets`);
    return `/assets/${f}`;
  };
  // [^.]+ p/ aceitar hashes do Vite que contêm hífen (ex.: hero-dra-kelly-md-ChV-7Fu3.webp)
  const m = pick(/^hero-dra-kelly-m-[^.]+\.webp$/);
  const md = pick(/^hero-dra-kelly-md-[^.]+\.webp$/);
  const full = pick(/^hero-dra-kelly-(?!m-|md-)[^.]+\.webp$/);
  return `${m} 828w, ${md} 1280w, ${full} 1920w`;
}

// usa o beasties APENAS para COMPUTAR a string de CSS crítico (descarta o resto do output dele).
async function computeCriticalCss(html) {
  const beasties = new Beasties({
    path: DIST,            // resolve os href /assets/*.css a partir de dist/
    publicPath: "/",
    pruneSource: false,    // mantém o CSS completo p/ a carga async
    mergeStylesheets: true,
    logLevel: "silent",
  });
  const out = await beasties.process(html);
  const css = [...out.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
  if (!css.trim()) throw new Error("beasties não produziu CSS crítico");
  return css;
}

// Injeção CIRÚRGICA do CSS crítico (Fase B): insere <style id=critical-css> e reescreve SÓ a
// linha do <link rel=stylesheet> do app p/ carga async (preload swap + <noscript>). NENHUM
// <script> passa por parser — o gate byte-a-byte aborta o build se algum mudar 1 byte.
async function inlineCriticalCss(html) {
  const css = await computeCriticalCss(html);
  const scriptsBefore = extractScripts(html);

  const linkRe = /<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/index-[^"]+\.css)"[^>]*>/i;
  const m = html.match(linkRe);
  if (!m) throw new Error("link do CSS do app (<link rel=stylesheet ...index.css>) não encontrado");
  const href = m[1];
  const cross = /crossorigin/i.test(m[0]) ? " crossorigin" : "";

  const replacement =
    `<style id="critical-css">${css}</style>` +
    `<link rel="preload" href="${href}" as="style"${cross} onload="this.onload=null;this.rel='stylesheet'">` +
    `<noscript><link rel="stylesheet" href="${href}"${cross}></noscript>`;

  const out = html.replace(linkRe, replacement);

  // GATE byte-a-byte: cada <script> idêntico em ordem e em bytes (senão aborta)
  const scriptsAfter = extractScripts(out);
  if (scriptsBefore.length !== scriptsAfter.length) {
    throw new Error(`Fase B mudou a contagem de <script> (${scriptsBefore.length} -> ${scriptsAfter.length})`);
  }
  for (let i = 0; i < scriptsBefore.length; i++) {
    if (scriptsBefore[i] !== scriptsAfter[i]) {
      throw new Error(`Fase B alterou o <script> #${i} (gate byte-a-byte FALHOU) — abortando`);
    }
  }
  for (const sig of TRACKING_PRIMITIVES) {
    if (!out.includes(sig)) throw new Error(`primitivo de tracking sumiu após Fase B: ${sig}`);
  }
  console.log(`[build] CSS crítico inline (cirúrgico): ${css.length} chars; ${scriptsAfter.length} <script> byte-idênticos ✓`);
  return out;
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

  // 4) preload RESPONSIVO da imagem do hero (elemento de LCP no mobile). imagesrcset espelha
  //    o srcset do <img>, então o browser pré-carrega a MESMA variante que vai usar (mobile ~17KB).
  //    Resource hint INERTE: não executa JS, não toca em nenhum <script>. Injeta cedo no <head>.
  const heroSrcset = await findHeroSrcset();
  const heroPreload = `<link rel="preload" as="image" imagesrcset="${heroSrcset}" imagesizes="100vw" fetchpriority="high" />`;
  html = html.replace(/<head>/i, `<head>\n    ${heroPreload}`);
  console.log(`[build] preload responsivo do hero: ${heroSrcset}`);

  // 5) CSS crítico inline (Fase B) — remove o render-blocking. SKIP_CRITICAL=1 pula (A/B).
  if (process.env.SKIP_CRITICAL !== "1") {
    html = await inlineCriticalCss(html);
  } else {
    console.log("[build] SKIP_CRITICAL=1 — pulei o CSS crítico");
  }

  await writeFile(DIST_INDEX, html, "utf8");

  // 6) limpa o bundle de servidor (não deve ir pro deploy)
  await rm(SERVER_OUT, { recursive: true, force: true });

  console.log(`[build] OK — ${appHtml.length} chars no #root; hero responsivo + CSS crítico aplicados`);
}

main().catch((err) => {
  console.error("[build] FALHOU:", err);
  process.exit(1);
});
