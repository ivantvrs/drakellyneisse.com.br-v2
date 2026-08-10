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
import { generateAtSpHtml, AT_SP_HTML, AT_SP_PATHNAME } from "./gen-at-sp.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const DIST_INDEX = path.join(DIST, "index.html");
const DIST_EMPRESA = path.join(DIST, "empresa.html");
const DIST_TRABALHISTA = path.join(DIST, "trabalhista.html");
const DIST_AT_SP = path.join(DIST, "assistente-tecnico-medico-sp.html");
const NOT_FOUND_HTML = path.join(ROOT, "404.html");
const DIST_404 = path.join(DIST, "404.html");
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

// Funil da HOME ("/" — dist/index.html: assistência técnica em perícia judicial; antiga /at):
// mesmos primitivos + as assinaturas próprias dessa porta.
// Conversão WhatsApp = "[Contato] WhatsApp — AT" (Ads id 7652180840), criada 17/06.
// Label real espelhado abaixo como safety-net (o gate garante que o build não perca o send_to).
// Esta porta NÃO usa conversão de ligação (decisão do Ivan): sem label/handler de tel:.
const TRACKING_PRIMITIVES_AT = [
  ...TRACKING_PRIMITIVES,
  "whatsapp_click_at",
  "AW-16690821688/zjEbCOiG7MAcELj05pY-",
];

// Funil /trabalhista (antiga home): base + o label REAL de conversão do WhatsApp dessa porta,
// fixado p/ o gate falhar se o send_to for trocado/removido (espelha AT e EMPRESA; antes a base
// só checava o substring "whatsapp_click", deixando o label 3YOP sem proteção contra regressão).
const TRACKING_PRIMITIVES_TRABALHISTA = [
  ...TRACKING_PRIMITIVES,
  "AW-16690821688/3YOPCNG72c8ZELj05pY-",
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

// localiza os arquivos content-hashed do hero novo (recorte desktop + foto mobile).
async function findHeroAssets() {
  const files = await readdir(path.join(ROOT, "dist", "assets"));
  const pick = (re) => {
    const f = files.find((x) => re.test(x));
    if (!f) throw new Error(`asset do hero não encontrado (${re}) em dist/assets`);
    return `/assets/${f}`;
  };
  return {
    mobile: pick(/^kelly-hero-mobile-[^.]+\.webp$/),
    mobileAvif: pick(/^kelly-hero-mobile-[^.]+\.avif$/),
    desktop: pick(/^kelly-hero-recorte-[^.]+\.webp$/),
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

  // entry CSS do app: index-*.css (HOME/AT), empresa-*.css (/empresa), trabalhista-*.css
  // (/trabalhista), at-sp-*.css (porta geo /assistente-tecnico-medico/sp) ou notfound-*.css
  // (404.html).
  const linkRe = /<link\b[^>]*rel="stylesheet"[^>]*href="(\/assets\/(?:index|empresa|trabalhista|at-sp|notfound)-[^"]+\.css)"[^>]*>/i;
  const m = html.match(linkRe);
  if (!m) throw new Error("link do CSS do app (<link rel=stylesheet ...index|empresa|trabalhista.css>) não encontrado");
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
  // 0) gera a porta geo SP a partir do index.html (scripts de tracking herdados byte a byte;
  //    gate próprio dentro do gerador). SEMPRE regenerada — nunca editada à mão.
  console.log("[build] gen (at-sp)…");
  await generateAtSpHtml();

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

  // 1c) client (porta /trabalhista — perícia trabalhista, antiga home) — build ISOLADO de
  //     trabalhista.html no MESMO dist/, idêntico ao passo da empresa. Mantém index/empresa
  //     intocados: a /trabalhista ganha seu próprio `trabalhista-*`.
  console.log("[build] client (trabalhista)…");
  await build({
    build: {
      outDir: "dist",
      emptyOutDir: false,
      rollupOptions: {
        input: { trabalhista: path.join(ROOT, "trabalhista.html") },
      },
    },
  });

  // 1d) client (porta geo /assistente-tecnico-medico/sp) — build ISOLADO do HTML gerado no
  //     passo 0, no MESMO dist/ (emptyOutDir:false), idêntico ao padrão empresa/trabalhista.
  //     Input key "at-sp" -> assets at-sp-*.{js,css} próprios; chunks compartilhados têm o
  //     mesmo hash e o overwrite é inofensivo.
  console.log("[build] client (at-sp)…");
  await build({
    build: {
      outDir: "dist",
      emptyOutDir: false,
      rollupOptions: {
        input: { "at-sp": AT_SP_HTML },
      },
    },
  });

  // 1e) client (404.html) — build ISOLADO no MESMO dist/, mesmo padrão das portas acima.
  //     Input key "notfound" (e não "404": o nome vira prefixo dos assets e um chunk começando
  //     com dígito é pedir confusão nos regex/globs de asset).
  console.log("[build] client (404)…");
  await build({
    build: {
      outDir: "dist",
      emptyOutDir: false,
      rollupOptions: {
        input: { notfound: NOT_FOUND_HTML },
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

  // 4) preload do hero (elemento de LCP) — POR PÁGINA.
  //    index/trabalhista usam kelly-hero-mobile.webp (foto full-bleed mobile). Preloadamos SÓ o mobile:
  //    é o LCP no celular, onde a conexão é lenta e o CWV do Google é medido. O recorte desktop
  //    NÃO é preloadado de propósito — ele carrega pelo <picture> (eager + fetchpriority high) e,
  //    sem preload do recorte, NENHUM browser o baixa no mobile (nem os que ignoram `media` em
  //    <link rel=preload>), eliminando o cross-download dos dois heros que inflava o LCP.
  //    A /empresa tem hero AVIF próprio (hero-dra-kelly-*) e é descoberto cedo pelo preload
  //    scanner do <picture>; por isso NÃO recebe preload de kelly-hero — antes ela baixava ~285KB
  //    de um hero que nem exibe.
  const heroAssets = await findHeroAssets();
  // Preload em AVIF + `type="image/avif"`: browsers que suportam AVIF (95%+) já puxam a versão
  // leve; os que não suportam IGNORAM o preload (pelo type) e caem no WebP do <picture> via
  // preload scanner. Sem media no desktop p/ não baixar nada errado no mobile (ver comentário acima).
  const heroPreloadKelly =
    `<link rel="preload" as="image" media="(max-width: 767.98px)" type="image/avif" href="${heroAssets.mobileAvif}" fetchpriority="high" />`;
  console.log(`[build] preload hero (index/trabalhista) — mobile AVIF: ${heroAssets.mobileAvif}`);

  // A HOME ("/") agora é a página de assistência técnica em perícia judicial (antiga /at) e usa
  // os primitivos do funil AT; /trabalhista é a antiga home (perícia trabalhista) e herda os
  // primitivos-base; /empresa permanece com os seus. Cada porta tem gate byte-a-byte próprio.
  await processPage({ pathname: "/",            distFile: DIST_INDEX,       label: "index",       render, heroPreload: heroPreloadKelly, trackingPrimitives: TRACKING_PRIMITIVES_AT });
  await processPage({ pathname: "/empresa",     distFile: DIST_EMPRESA,     label: "empresa",     render, heroPreload: "",               trackingPrimitives: TRACKING_PRIMITIVES_EMPRESA });
  await processPage({ pathname: "/trabalhista", distFile: DIST_TRABALHISTA, label: "trabalhista", render, heroPreload: heroPreloadKelly, trackingPrimitives: TRACKING_PRIMITIVES_TRABALHISTA });
  // Porta geo SP: MESMO funil AT da home (mesma conversão Ads zjEb…, mesmo whatsapp_click_at).
  await processPage({ pathname: AT_SP_PATHNAME, distFile: DIST_AT_SP,       label: "at-sp",       render, heroPreload: heroPreloadKelly, trackingPrimitives: TRACKING_PRIMITIVES_AT });
  // 404: sem preload de hero (não tem imagem) e sem primitivos de tracking (a página não carrega
  // NENHUMA tag de medição de propósito — ver 404.html). O gate byte-a-byte dos <script> continua
  // valendo: só o entry do Vite deve existir ali.
  await processPage({ pathname: "/404",         distFile: DIST_404,         label: "404",         render, heroPreload: "",               trackingPrimitives: [] });

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
