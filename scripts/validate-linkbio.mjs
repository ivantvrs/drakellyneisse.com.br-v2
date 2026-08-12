// Validação E2E local da página de link da bio /link-bio-1 (roda sobre dist/, pós-build).
//
//   node scripts/validate-linkbio.mjs            (SHOT=<caminho.png> salva um screenshot mobile)
//
// Espelha scripts/validate-at-br.mjs. Sobe um servidor estático que emula a resolução da Vercel
// (directory index + rewrite /bio) e, com o Chromium do Playwright, verifica:
//   1. /link-bio-1 e /bio servem o MESMO HTML
//   2. head: noindex; gtag de PÚBLICO (AW) + GA4; ZERO label de conversão do Ads; ZERO GTM
//   3. page_view via beacon /g/collect com dl na rota e carregando as UTMs de entrada
//   4. clique nos 6 CTAs: evento `linkbio_click`, NENHUMA conversão do Ads, NENHUM evento do
//      funil pago (whatsapp_click_*), e os parâmetros de origem mesclados no href de destino
//      SEM sobrescrever o utm_content do card
//   5. rede: nenhuma imagem vinda de host externo (a CSP bloquearia, mas o gate confere antes)
//
// Exit 1 em qualquer falha (serve de gate).

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4199;
const BASE = `http://127.0.0.1:${PORT}`;
const SHOT = process.env.SHOT || "";

// Query de entrada do teste: simula o seguidor que chegou à bio por um anúncio de Meta.
// fbclid é o parâmetro que NÃO existe nos hrefs dos cards — é ele que prova o repasse.
const ENTRADA = "utm_source=meta&utm_medium=paid-social&fbclid=TEST123";

// Os 6 pontos de clique na ordem do scroll: data-cta -> utm_content declarado no href ->
// destino esperado. hero e whatsapp-geral compartilham o MESMO link do Tintim (só existem 4
// criados); quem os separa é o utm_content, e é por isso que o gate cobra o par, não o link.
// Cada id do Tintim tem MENSAGEM INICIAL própria no painel (é ela que identifica o público do
// outro lado). Trocar um id sem trocar no painel embaralha a segmentação — daí o token no gate.
const CARDS = [
  ["hero",           "hero",           "e60e4650-d8e3-402e-b7fb-bef6594db534"],
  ["advogado",       "advogado",       "d4a837d4-c310-4502-b933-e726af0269d6"],
  ["empresa",        "empresa",        "13a9207b-f52a-42bc-b999-2a1d29946baf"],
  ["pessoa-fisica",  "pessoa-fisica",  "9266bf13-c5bf-4d35-973d-0665e0cbe36f"],
  ["site",           "site",           "www.drakellyneisse.com.br"], // único sem Tintim
  ["whatsapp-geral", "whatsapp-geral", "e60e4650-d8e3-402e-b7fb-bef6594db534"],
];
// Labels reais de conversão do Ads em produção. NENHUM pode aparecer nesta página.
const LABELS_ADS = [
  "3YOPCNG72c8ZELj05pY-", // /trabalhista
  "zjEbCOiG7MAcELj05pY-", // home + portas geo
  "x1FJCIOxxLocELj05pY-", // /empresa (WhatsApp)
  "-JqLCIaxxLocELj05pY-", // /empresa (ligação)
];

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

function startServer() {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const [p] = req.url.split("?");
      // emula o que a Vercel faz: rewrite de /bio + directory index da pasta em public/
      const limpo = decodeURIComponent(p).replace(/^\/+/, "").replace(/\/+$/, "");
      const file =
        p === "/bio" || p === "/bio/"
          ? path.join(DIST, "link-bio-1", "index.html")
          : path.join(DIST, limpo || "index.html");
      for (const cand of [file, path.join(file, "index.html")]) {
        try {
          const data = await readFile(cand);
          res.writeHead(200, { "Content-Type": TYPES[path.extname(cand).toLowerCase()] || "application/octet-stream" });
          return res.end(data);
        } catch { /* tenta o próximo candidato */ }
      }
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end("nao encontrado");
    }).listen(PORT, () => resolve(srv));
  });
}

let failures = 0;
function check(ok, label, detail = "") {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

async function main() {
  const srv = await startServer();
  const browser = await chromium.launch();

  // ── 1) As duas rotas servem o mesmo HTML ──────────────────────────────────
  console.log("\n[1] Rotas /link-bio-1 e /bio");
  const htmlDireto = await (await fetch(`${BASE}/link-bio-1`)).text();
  const htmlBio = await (await fetch(`${BASE}/bio`)).text();
  check(htmlDireto.length > 0, "/link-bio-1 responde 200", `${htmlDireto.length} bytes`);
  check(htmlDireto === htmlBio, "/bio serve exatamente o mesmo HTML");

  // ── 2) Head e higiene de tracking (no HTML servido, sem depender do browser) ─
  console.log("\n[2] Head e higiene de tracking");
  check(/<meta name="robots" content="noindex, follow"/.test(htmlDireto), "meta robots noindex, follow");
  for (const label of LABELS_ADS) {
    check(!htmlDireto.includes(label), `sem o label de conversão do Ads ${label}`);
  }
  check(!/gtag\(\s*['"]event['"]\s*,\s*['"]conversion['"]/.test(htmlDireto), "sem disparo de conversão do Ads no código");
  check(!/whatsapp_click_(at|empresa)/.test(htmlDireto), "sem os eventos-chave do funil pago");
  check(!htmlDireto.includes("GTM-NH3564MJ"), "sem o contêiner do GTM (porta de entrada de tag de conversão)");
  check(htmlDireto.includes("gtag('config', 'AW-16690821688'"), "tag de PÚBLICO do Ads presente (remarketing)");
  check(htmlDireto.includes("gtag('config', 'G-N6G6FSD34E'"), "GA4 configurado");
  check(htmlDireto.includes("window.__tvrs"), "IIFE __tvrs herdado do index.html");
  check(htmlDireto.includes("tvrsTagged"), "marcação tvrsTagged presente (repasse de parâmetros)");
  check(/var PIXEL_ID = '';\s*\/\/ TODO/.test(htmlDireto), "Meta Pixel com PIXEL_ID vazio + TODO");

  // ── 3) Página no browser: beacon de page_view, rede e cliques ─────────────
  console.log("\n[3] page_view via beacon e rede");
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const gaHits = [];
  const awHits = [];
  const externos = [];
  page.on("request", (req) => {
    const u = req.url();
    if (u.includes("google-analytics.com/g/collect")) gaHits.push(u);
    if (u.includes("googleadservices.com/pagead/conversion") || u.includes("doubleclick.net/pagead/viewthroughconversion")) awHits.push(u);
    if (!u.startsWith(BASE) && !u.startsWith("data:")) externos.push({ tipo: req.resourceType(), host: new URL(u).host });
  });
  // a intro de marca roda 1x por sessão; nos testes semeamos a flag p/ ela não
  // aparecer (screenshots e cliques ficam determinísticos)
  await page.addInitScript(() => { try { sessionStorage.setItem("_lb_intro", "1"); } catch (_) {} });
  await page.goto(`${BASE}/link-bio-1?${ENTRADA}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);

  const pv = gaHits.find((u) => u.includes("en=page_view"));
  check(!!pv, "beacon GA4 page_view emitido");
  if (pv) {
    const dl = decodeURIComponent(new URL(pv).searchParams.get("dl") || "");
    check(dl.includes("/link-bio-1"), "page_view dl com o path da rota", dl.slice(0, 100));
    check(dl.includes("utm_source=meta"), "page_view dl carrega as UTMs de entrada");
  }
  check(awHits.length === 0, "ZERO request de conversão do Google Ads", `${awHits.length} observado(s)`);

  // Imagens de DESIGN só podem vir do próprio host (nada de CDN — os assets vivem em public/).
  // A tag de público do Ads dispara pixels de remarketing como <img> de forma INTERMITENTE
  // (google.com/ads/ga-audiences, doubleclick…); esses hosts são medição, estão liberados na
  // CSP e não podem derrubar o gate — mas são listados à parte para ficarem visíveis.
  const HOSTS_MEDICAO = /(^|\.)(google|googleadservices|googletagmanager|google-analytics|doubleclick|facebook)\.(com|net)$/;
  const imgs = externos.filter((r) => r.tipo === "image");
  const imgDesign = imgs.filter((r) => !HOSTS_MEDICAO.test(r.host));
  check(imgDesign.length === 0, "nenhuma imagem de DESIGN vinda de host externo", imgDesign.map((r) => r.host).join(", ") || "0");
  if (imgs.length) console.log(`  pixels de medição (esperado, não é asset): ${[...new Set(imgs.map((r) => r.host))].join(", ")}`);
  const hosts = [...new Set(externos.map((r) => `${r.host} (${r.tipo})`))].sort();
  console.log(`  hosts externos tocados: ${hosts.join(" | ") || "(nenhum)"}`);

  // ── 4) Cliques nos 5 cards ────────────────────────────────────────────────
  console.log("\n[4] Clique nos 5 cards");
  await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault(), true));
  const encontrados = await page.$$eval("a[data-cta]", (as) => as.map((a) => a.dataset.cta));
  check(encontrados.length === 6, "6 pontos de clique na página", encontrados.join(", "));

  const resultado = await page.evaluate(async () => {
    const anchors = Array.from(document.querySelectorAll("a[data-cta]"));
    const out = [];
    for (const a of anchors) {
      const before = (window.dataLayer || []).length;
      a.click(); // dispara o handler delegado (document, capture) — navegação já prevenida
      await new Promise((r) => setTimeout(r, 60));
      const novos = (window.dataLayer || []).slice(before).map((e) =>
        e && typeof e === "object" && !Array.isArray(e) && "0" in e ? Array.from(e) : e
      );
      out.push({ cta: a.dataset.cta, href: a.href, novos });
    }
    return out;
  });

  check(resultado.map((r) => r.cta).join(",") === CARDS.map((c) => c[0]).join(","), "CTAs na ordem esperada", resultado.map((r) => r.cta).join(","));

  // o par (destino + utm_content) tem que ser único: dois CTAs podem dividir o link do
  // Tintim (hero e fechamento dividem), mas NUNCA com o mesmo utm_content — se isso
  // acontecer os dois viram um só no relatório e a leitura do scroll se perde.
  const pares = CARDS.map((c) => c[2] + "|" + c[1]);
  check(new Set(pares).size === pares.length, "cada CTA tem um par destino+utm_content único");

  for (const [cta, utmContent, destino] of CARDS) {
    const b = resultado.find((r) => r.cta === cta);
    if (!b) { check(false, `[${cta}] card encontrado`); continue; }

    const temGa4 = b.novos.some(
      (e) =>
        (Array.isArray(e) && e[0] === "event" && e[1] === "linkbio_click" && e[2] && e[2].transport_type === "beacon") ||
        (e && !Array.isArray(e) && e.event === "linkbio_click")
    );
    const temConversao = b.novos.some((e) => Array.isArray(e) && e[0] === "event" && e[1] === "conversion");
    const temFunilPago = b.novos.some(
      (e) =>
        (Array.isArray(e) && typeof e[1] === "string" && /^whatsapp_click/.test(e[1])) ||
        (e && !Array.isArray(e) && typeof e.event === "string" && /^whatsapp_click/.test(e.event))
    );
    const u = new URL(b.href);

    check(b.href.includes(destino), `[${cta}] destino correto (${destino.slice(0, 13)}…)`, b.href.slice(0, 90));
    check(!b.href.includes("TODO-"), `[${cta}] sem placeholder no href`);
    check(temGa4, `[${cta}] evento GA4 linkbio_click`);
    check(!temConversao, `[${cta}] NENHUMA conversão do Google Ads disparada`);
    check(!temFunilPago, `[${cta}] NENHUM evento do funil pago disparado`);
    // repasse: fbclid não existe no href declarado, então tem que ter sido acrescentado
    check(u.searchParams.get("fbclid") === "TEST123", `[${cta}] fbclid repassado ao destino`, b.href.slice(0, 120));
    // e o que o card já declarava NÃO pode ser sobrescrito pela query de entrada
    check(u.searchParams.get("utm_content") === utmContent, `[${cta}] utm_content do card preservado`, u.searchParams.get("utm_content") || "(ausente)");
    check(u.searchParams.get("utm_source") === "instagram", `[${cta}] utm_source=instagram preservado (entrada não sobrescreve)`, u.searchParams.get("utm_source") || "");
    check(u.searchParams.get("utm_campaign") === "linkbio-kelly", `[${cta}] utm_campaign=linkbio-kelly preservado`);
  }
  console.log(`  beacons GA4 na rede: ${gaHits.length} | requests de conversão AW: ${awHits.length}`);

  if (SHOT) {
    await page.screenshot({ path: SHOT, fullPage: true });
    console.log(`  screenshot: ${SHOT}`);
  }

  await page.close();
  await browser.close();
  srv.close();

  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
