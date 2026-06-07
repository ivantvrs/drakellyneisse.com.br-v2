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
const DIST_EMPRESA = path.join(DIST, "empresa.html");
const SERVER_OUT = path.join(ROOT, "dist-ssr");
const ROOT_RE = /<div id="root">\s*<\/div>/;

// primitivos de tracking que TÊM que continuar no dist/index.html (safety net pós-Fase B)
const TRACKING_PRIMITIVES = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
];

// Funil EMPRESA (dist/empresa.html): mesmos primitivos + as assinaturas próprias da /empresa.
// Os dois conversion labels reais do Ads são checados como primitivo (o da ligação começa com
// hífen logo após a barra — `/-JqLC...` — parte do label; o gate garante que não se perca).
const TRACKING_PRIMITIVES_EMPRESA = [
  ...TRACKING_PRIMITIVES,
  "whatsapp_click_empresa", "call_click_empresa", 'href^="tel:"',
  "AW-16690821688/x1FJCIOxxLocELj05pY-", "AW-16690821688/-JqLCIaxxLocELj05pY-",
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
async function findHeroSrcsets() {
  const files = await readdir(path.join(ROOT, "dist", "assets"));
  const pick = (re) => {
    const f = files.find((x) => re.test(x));
    if (!f) throw new Error(`variante do hero não encontrada (${re}) em dist/assets`);
    return `/assets/${f}`;
  };
  // [^.]+ p/ aceitar hashes do Vite que contêm hífen (ex.: hero-dra-kelly-md-ChV-7Fu3.webp)
  const srcset = (ext) => {
    const m = pick(new RegExp(`^hero-dra-kelly-m-[^.]+\\.${ext}$`));
    const md = pick(new RegExp(`^hero-dra-kelly-md-[^.]+\\.${ext}$`));
    const full = pick(new RegExp(`^hero-dra-kelly-(?!m-|md-)[^.]+\\.${ext}$`));
    return `${m} 828w, ${md} 1280w, ${full} 1920w`;
  };
  // Arte dirigida do mobile (< 768px): hero-mob (828w) + hero-mob-2x (1280w).
  const mobileSrcset = (ext) => {
    const m1 = pick(new RegExp(`^hero-mob-(?!2x-)[^.]+\\.${ext}$`));
    const m2 = pick(new RegExp(`^hero-mob-2x-[^.]+\\.${ext}$`));
    return `${m1} 828w, ${m2} 1280w`;
  };
  return {
    avif: srcset("avif"),
    webp: srcset("webp"),
    mobileAvif: mobileSrcset("avif"),
    mobileWebp: mobileSrcset("webp"),
  };
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
async function inlineCriticalCss(html, trackingPrimitives) {
  const css = await computeCriticalCss(html);
  const scriptsBefore = extractScripts(html);

  // entry CSS do app: index-*.css (LP advogado) ou empresa-*.css (build isolado da /empresa).
  const linkRe = /<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/(?:index|empresa)-[^"]+\.css)"[^>]*>/i;
  const m = html.match(linkRe);
  if (!m) throw new Error("link do CSS do app (<link rel=stylesheet ...index|empresa.css>) não encontrado");
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
  for (const sig of trackingPrimitives) {
    if (!out.includes(sig)) throw new Error(`primitivo de tracking sumiu após Fase B: ${sig}`);
  }
  console.log(`[build] CSS crítico inline (cirúrgico): ${css.length} chars; ${scriptsAfter.length} <script> byte-idênticos ✓`);
  return out;
}

async function main() {
  // 1) client (LP advogado) — index.html exatamente como antes (output byte-idêntico).
  console.log("[build] client (index)…");
  await build();

  // 1b) client (porta empresário) — build ISOLADO de empresa.html no MESMO dist/, sem limpar
  //     o build do index (emptyOutDir:false). Mantém a LP do advogado intocada: o entry/CSS do
  //     index continua `index-*`; a empresa ganha seu próprio `empresa-*`. Chunks compartilhados
  //     (vendor/preact) têm conteúdo idêntico -> mesmo hash -> overwrite inofensivo.
  console.log("[build] client (empresa)…");
  await build({
    build: {
      outDir: "dist",
      emptyOutDir: false,
      rollupOptions: {
        input: { empresa: path.join(ROOT, "empresa.html") },
      },
    },
  });

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

  // 3) renderiza e injeta no #root — uma vez por página (cada uma tem seu próprio gate).
  console.log("[build] prerender…");
  const serverEntry = await findServerEntry();
  const { render } = await import(pathToFileURL(serverEntry).href);

  // 4) preload RESPONSIVO da imagem do hero (elemento de LCP no mobile). Como o <picture> usa
  //    ARTE DIRIGIDA (imagem diferente no mobile < 768px vs desktop), são DOIS preloads com
  //    `media` complementar: o browser baixa só o que casa com o viewport — mobile pré-carrega
  //    a imagem do retrato (~9KB), desktop pré-carrega a cena larga. imagesrcset espelha o srcset
  //    AVIF de cada <source>, garantindo a MESMA variante (sem download duplicado). type=avif faz
  //    SÓ navegadores com AVIF baixarem; os demais caem no <source webp> e descobrem a imagem cedo
  //    pelo HTML pré-renderizado. Resource hints INERTES: não executam JS.
  //    As duas páginas usam os MESMOS assets de hero, então o preload é idêntico p/ ambas.
  const heroSrcsets = await findHeroSrcsets();
  const heroPreload =
    `<link rel="preload" as="image" media="(max-width: 767.98px)" type="image/avif" imagesrcset="${heroSrcsets.mobileAvif}" imagesizes="100vw" fetchpriority="high" />` +
    `<link rel="preload" as="image" media="(min-width: 768px)" type="image/avif" imagesrcset="${heroSrcsets.avif}" imagesizes="100vw" fetchpriority="high" />`;
  console.log(`[build] preload AVIF hero — mobile: ${heroSrcsets.mobileAvif}`);
  console.log(`[build] preload AVIF hero — desktop: ${heroSrcsets.avif}`);

  // a LP do advogado ("/") é processada com a MESMA lógica de sempre (output inalterado);
  // a porta do empresário ("/empresa") roda a pipeline idêntica sobre seu próprio HTML/gate.
  await processPage({ pathname: "/",        distFile: DIST_INDEX,   label: "index",   render, heroPreload, trackingPrimitives: TRACKING_PRIMITIVES });
  await processPage({ pathname: "/empresa", distFile: DIST_EMPRESA, label: "empresa", render, heroPreload, trackingPrimitives: TRACKING_PRIMITIVES_EMPRESA });

  // 6) limpa o bundle de servidor (não deve ir pro deploy)
  await rm(SERVER_OUT, { recursive: true, force: true });
}

// Processa UMA página: render → injeta #root → preload do hero → CSS crítico (com gate
// byte-a-byte próprio) → grava. Cada página tem gate independente; mexer numa não afeta a outra.
async function processPage({ pathname, distFile, label, render, heroPreload, trackingPrimitives }) {
  const appHtml = await render(pathname);

  let html = await readFile(distFile, "utf8");
  if (!ROOT_RE.test(html)) {
    throw new Error(`marcador <div id="root"></div> não encontrado em ${distFile}`);
  }
  html = html.replace(ROOT_RE, `<div id="root">${appHtml}</div>`);

  html = html.replace(/<head>/i, `<head>\n    ${heroPreload}`);

  // CSS crítico inline (Fase B) — remove o render-blocking. SKIP_CRITICAL=1 pula (A/B).
  if (process.env.SKIP_CRITICAL !== "1") {
    html = await inlineCriticalCss(html, trackingPrimitives);
  } else {
    console.log("[build] SKIP_CRITICAL=1 — pulei o CSS crítico");
  }

  await writeFile(distFile, html, "utf8");
  console.log(`[build] OK (${label}) — ${appHtml.length} chars no #root; hero responsivo + CSS crítico aplicados`);
}

main().catch((err) => {
  console.error("[build] FALHOU:", err);
  process.exit(1);
});
