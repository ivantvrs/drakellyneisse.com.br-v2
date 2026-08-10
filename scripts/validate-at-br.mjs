// Validação E2E local da porta nacional /assistente-tecnico-medico/br (roda sobre dist/, pós-build).
//
//   node scripts/validate-at-br.mjs
//
// Espelha scripts/validate-at-sp.mjs. Sobe um servidor estático que emula os rewrites/redirects
// do vercel.json e, com o Chromium do Playwright, verifica os requisitos críticos da campanha BR:
//   1. 301 do caminho pai /assistente-tecnico-medico -> /
//   2. head da porta BR (title nacional/robots noindex/canonical) + H1 e rodapé (sede SP +
//      atuação nacional), CRM/MG intacto e ZERO menção a "estado de São Paulo"
//   3. page_view via beacon /g/collect com dl no path novo carregando as UTMs da URL de entrada
//   4. clique em TODOS os botões de WhatsApp: conversão AW (send_to zjEb…) + whatsapp_click_at
//      + UTMs/gclid propagados ao deeplink do Tintim (fluxo da home, herdado de propósito)
//   5. diff de copy contra a home: <main> idêntico EXCETO a seção Atuação (as 2 frases do briefing)
//   6. home "/" e porta /sp sem regressão
// Exit 1 em qualquer falha (serve de gate).

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4198;
const BASE = `http://127.0.0.1:${PORT}`;
const AW_LABEL = "AW-16690821688/zjEbCOiG7MAcELj05pY-";
const TINTIM_HOME_TOKEN = "b40002a5-951b-4014-a30a-17af3f592141"; // fluxo Tintim da home (herdado pela BR)
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";   // fluxo dedicado da porta SP
const UTMS = "utm_source=google&utm_medium=cpc&utm_campaign=teste_br_validacao&utm_term=assistente%20tecnico%20medico&matchtype=e&gclid=TESTGCLID_BR_123";

// as DUAS únicas frases que a porta BR muda no <main> em relação à home (item 3 do briefing)
const ATUACAO_BR_H2 = "Acompanhamento pericial em todo o Brasil";
const ATUACAO_BR_P = "em qualquer cidade do país.";
const ATUACAO_HOME_H2 = "Acompanhamento presencial em Goiânia, Brasília, Uberlândia e em todo o Brasil";
const ATUACAO_HOME_P = "em Goiânia, Brasília, Uberlândia e em qualquer comarca do país.";

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".png": "image/png" };

function startServer() {
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const [p, q] = req.url.split("?");
      const qs = q ? "?" + q : "";
      if (p === "/assistente-tecnico-medico" || p === "/assistente-tecnico-medico/") {
        res.writeHead(301, { Location: "/" + qs });
        return res.end();
      }
      let file;
      if (p === "/assistente-tecnico-medico/br" || p === "/assistente-tecnico-medico/br/") file = path.join(DIST, "assistente-tecnico-medico-br.html");
      else if (p === "/assistente-tecnico-medico/sp" || p === "/assistente-tecnico-medico/sp/") file = path.join(DIST, "assistente-tecnico-medico-sp.html");
      else if (p === "/empresa" || p === "/empresa/") file = path.join(DIST, "empresa.html");
      else if (p === "/trabalhista" || p === "/trabalhista/") file = path.join(DIST, "trabalhista.html");
      else file = path.join(DIST, decodeURIComponent(p).replace(/^\/+/, "") || "index.html");
      try {
        const data = await readFile(file);
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(data);
      } catch {
        const data = await readFile(path.join(DIST, "index.html"));
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      }
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

  // ── 1) 301 do caminho pai ─────────────────────────────────────────────────
  console.log("\n[1] Redirect /assistente-tecnico-medico -> /");
  const r = await fetch(`${BASE}/assistente-tecnico-medico?utm_source=x`, { redirect: "manual" });
  check(r.status === 301, "status 301", `recebido ${r.status}`);
  check((r.headers.get("location") || "").startsWith("/"), "Location -> /", r.headers.get("location") || "");

  // ── 2) Porta BR — head, conteúdo e tracking ───────────────────────────────
  console.log("\n[2] Porta BR — head, copy nacional e tracking");
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const gaHits = [];
  const awHits = [];
  page.on("request", (req) => {
    const u = req.url();
    if (u.includes("google-analytics.com/g/collect")) gaHits.push(u);
    if (u.includes("googleadservices.com/pagead/conversion") || u.includes("doubleclick.net/pagead/viewthroughconversion")) awHits.push(u);
  });
  await page.goto(`${BASE}/assistente-tecnico-medico/br?${UTMS}`, { waitUntil: "domcontentloaded" });

  const title = await page.title();
  check(title.includes("em Todo o Brasil"), "title nacional (em Todo o Brasil)", title);
  check(!title.includes("São Paulo"), "title sem São Paulo", title);
  const desc = await page.getAttribute('meta[name="description"]', "content");
  check((desc || "").includes("Atendimento em todo o Brasil"), "meta description nacional", (desc || "").slice(-70));
  const robots = await page.getAttribute('meta[name="robots"]', "content");
  check(robots === "noindex, follow", "robots noindex", robots || "(ausente)");
  const canonical = await page.getAttribute('link[rel="canonical"]', "href");
  check(canonical === "https://www.drakellyneisse.com.br/assistente-tecnico-medico/br", "canonical da rota", canonical || "");
  const ogUrl = await page.getAttribute('meta[property="og:url"]', "content");
  check(ogUrl === "https://www.drakellyneisse.com.br/assistente-tecnico-medico/br", "og:url da rota", ogUrl || "");
  const h1 = await page.textContent("h1");
  check(h1.trim() === "Não enfrente a perícia sem um assistente técnico médico do seu lado.", "H1 idêntico ao da home (copy da mãe)", h1.trim().slice(0, 80));

  const brMainText = (await page.textContent("main")).replace(/\s+/g, " ").trim();
  check(brMainText.includes(ATUACAO_BR_H2), "Atuação BR: título nacional");
  check(brMainText.includes(ATUACAO_BR_P), "Atuação BR: 'qualquer cidade do país' no texto");
  check(!brMainText.includes("São Paulo") && !brMainText.includes("Campinas"), "corpo da página sem menção geográfica a SP/Campinas");

  const footer = (await page.textContent("footer")).replace(/\s+/g, " ").trim();
  check(footer.includes("Rua Paim, 189 — Bela Vista, São Paulo/SP"), "rodapé preserva o endereço da sede paulista");
  check(footer.includes("Atuação nacional · Atendimento em todo o Brasil (presencial e remoto)"), "rodapé com a linha de abrangência nacional");
  check(!footer.includes("todo o estado de São Paulo"), "rodapé sem 'todo o estado de São Paulo'");
  check(footer.includes("CRM/MG 109153"), "CRM/MG preservado no rodapé");
  const bodyText = await page.textContent("body");
  check(!/CRM\/SP/.test(bodyText), "nenhuma menção a CRM/SP");

  // page_view beacon com path + UTMs
  await page.waitForTimeout(600);
  const pv = gaHits.find((u) => u.includes("en=page_view"));
  check(!!pv, "beacon GA4 page_view emitido");
  if (pv) {
    const dl = decodeURIComponent(new URL(pv).searchParams.get("dl") || "");
    check(dl.includes("/assistente-tecnico-medico/br"), "page_view dl com path da rota", dl.slice(0, 110));
    check(dl.includes("utm_campaign=teste_br_validacao") && dl.includes("gclid=TESTGCLID_BR_123"), "page_view dl carrega UTMs+gclid");
    const gclidParam = new URL(pv).searchParams.get("gclid");
    check(gclidParam === "TESTGCLID_BR_123", "gclid como param do beacon (atribuição Ads)", gclidParam || "(ausente)");
  }

  // trava a navegação (preventDefault antes dos handlers de tracking) p/ clicar em série
  await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault(), true));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(".bfab-cta", { timeout: 5000 }).catch(() => {});

  console.log("\n[3] Cliques em todos os botões de WhatsApp da porta BR");
  const botoes = await page.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.dataset.cta || "(sem data-cta)"));
  console.log(`  botões Tintim encontrados: ${botoes.length} -> ${botoes.join(", ")}`);
  check(botoes.length >= 8, "todos os CTAs presentes (>= 8)", String(botoes.length));

  const resultado = await page.evaluate(async () => {
    const anchors = Array.from(document.querySelectorAll('a[href*="tintim.link"]'));
    const out = [];
    for (const a of anchors) {
      const before = (window.dataLayer || []).length;
      a.click(); // dispara os handlers delegados (document, capture) — navegação já prevenida
      await new Promise((r) => setTimeout(r, 60));
      const novos = (window.dataLayer || []).slice(before).map((e) =>
        e && typeof e === "object" && !Array.isArray(e) && "0" in e ? Array.from(e) : e
      );
      out.push({ cta: a.dataset.cta || "(sem data-cta)", href: a.href, novos });
    }
    return out;
  });

  for (const b of resultado) {
    const temAw = b.novos.some((e) => Array.isArray(e) && e[0] === "event" && e[1] === "conversion" && e[2] && e[2].send_to === AW_LABEL && e[2].transport_type === "beacon");
    const temGa4 = b.novos.some(
      (e) =>
        (Array.isArray(e) && e[0] === "event" && e[1] === "whatsapp_click_at" && e[2] && e[2].transport_type === "beacon") ||
        (e && !Array.isArray(e) && e.event === "whatsapp_click_at")
    );
    const temUtm = b.href.includes("utm_campaign=teste_br_validacao") && b.href.includes("gclid=TESTGCLID_BR_123");
    check(temAw, `[${b.cta}] conversão AW (${AW_LABEL.split("/")[1]}, beacon)`);
    check(temGa4, `[${b.cta}] evento GA4 whatsapp_click_at`);
    check(temUtm, `[${b.cta}] UTMs+gclid propagados ao Tintim`, b.href.slice(0, 130));
    check(b.href.includes(TINTIM_HOME_TOKEN), `[${b.cta}] deeplink Tintim do fluxo nacional (home)`);
    check(!b.href.includes(TINTIM_SP_TOKEN), `[${b.cta}] sem deeplink da porta SP`);
  }
  if (awHits.length) console.log(`  bônus: ${awHits.length} request(s) de conversão AW observados na rede`);
  console.log(`  beacons GA4 observados na rede: ${gaHits.length}`);
  await page.close();

  // ── 4) Home "/" sem regressão + diff de copy ──────────────────────────────
  console.log("\n[4] Home / — sem regressão e diff de copy contra a BR");
  const home = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const gaHome = [];
  home.on("request", (req) => { if (req.url().includes("google-analytics.com/g/collect")) gaHome.push(req.url()); });
  await home.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const h1Home = await home.textContent("h1");
  check(!h1Home.includes("São Paulo"), "H1 nacional (sem São Paulo)", h1Home.trim().slice(0, 70));
  const robotsHome = await home.getAttribute('meta[name="robots"]', "content");
  check(robotsHome === "index, follow", "robots index,follow", robotsHome || "");
  const canonicalHome = await home.getAttribute('link[rel="canonical"]', "href");
  check(canonicalHome === "https://www.drakellyneisse.com.br/", "canonical da home intacto", canonicalHome || "");
  const footerHome = await home.textContent("footer");
  check(footerHome.includes("Sede em Uberlândia/MG"), "rodapé sede MG intacto");
  const homeMainText = (await home.textContent("main")).replace(/\s+/g, " ").trim();
  check(homeMainText.includes(ATUACAO_HOME_H2), "Atuação da home intacta (Goiânia/Brasília/Uberlândia)");

  // o <main> da BR tem que ser idêntico ao da home APÓS normalizar só as 2 frases da Atuação
  const brNormalized = brMainText
    .replace(ATUACAO_BR_H2, ATUACAO_HOME_H2)
    .replace(ATUACAO_BR_P, ATUACAO_HOME_P);
  check(brNormalized === homeMainText, "copy do <main> idêntica à home (exceto seção Atuação)");

  const tintimHome = await home.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
  check(tintimHome.length > 0 && tintimHome.every((h) => h.includes(TINTIM_HOME_TOKEN)), "botões da home seguem no fluxo Tintim original", `${tintimHome.length} botões`);
  await home.waitForTimeout(600);
  check(!!gaHome.find((u) => u.includes("en=page_view")), "beacon page_view da home segue disparando");
  await home.close();

  // ── 5) Porta /sp sem regressão ────────────────────────────────────────────
  console.log("\n[5] Porta /sp — sem regressão");
  const sp = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  await sp.goto(`${BASE}/assistente-tecnico-medico/sp`, { waitUntil: "domcontentloaded" });
  check((await sp.title()).includes("São Paulo"), "title da SP menciona São Paulo", await sp.title());
  const canonicalSp = await sp.getAttribute('link[rel="canonical"]', "href");
  check(canonicalSp === "https://www.drakellyneisse.com.br/assistente-tecnico-medico/sp", "canonical da SP intacto", canonicalSp || "");
  const footerSp = await sp.textContent("footer");
  check(footerSp.includes("Atendimento em todo o estado de São Paulo e no Brasil"), "rodapé da SP intacto");
  const mainSp = (await sp.textContent("main")).replace(/\s+/g, " ").trim();
  check(mainSp.includes("Acompanhamento pericial em São Paulo e em todo o Brasil"), "Atuação da SP intacta");
  const tintimSp = await sp.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
  check(tintimSp.length > 0 && tintimSp.every((h) => h.includes(TINTIM_SP_TOKEN)), "botões da SP seguem no fluxo Tintim dedicado", `${tintimSp.length} botões`);
  await sp.close();

  await browser.close();
  srv.close();

  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
