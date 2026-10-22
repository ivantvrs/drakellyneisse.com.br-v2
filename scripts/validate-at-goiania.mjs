// Validação E2E local da porta geo /assistente-tecnico-medico/goiania (roda sobre dist/, pós-build).
//
//   node scripts/validate-at-goiania.mjs
//
// Espelha scripts/validate-at-br.mjs. Sobe um servidor estático que emula os rewrites/redirects
// do vercel.json e, com o Chromium do Playwright, verifica os requisitos da campanha [GO]:
//   1. rota nova responde 200 e o caminho pai /assistente-tecnico-medico segue com 301 -> /
//   2. head (title com Goiânia, description, robots noindex, canonical, og:url) e JSON-LD sem
//      LocalBusiness/endereço
//   3. desktop: H1 idêntico ao da home, selo "Goiânia e região", linha de acompanhamento presencial
//      logo abaixo do botão do hero, Atuação e rodapé de Goiânia, CRM/MG 109153
//   4. conteúdo proibido: TRT-18, "sede em Goiânia", Rua Paim, sede/escritório em Goiânia,
//      travessão nos textos novos (TJGO é PERMITIDO: a Dra. Kelly é cadastrada no TJGO e a copy
//      da home cita isso; o briefing de 22/10 dizia o contrário e o Ivan corrigiu no mesmo dia)
//   5. page_view via beacon /g/collect com dl no path novo carregando UTMs + gclid
//   6. clique em TODOS os botões de WhatsApp: conversão AW (zjEb…) + whatsapp_click_at + UTMs/gclid
//      propagados ao deeplink do fluxo Tintim de Goiânia
//   7. mobile (Pixel 7): selo e linha presencial visíveis, linha logo abaixo do botão
//   8. diff de copy contra a home: <main> idêntico EXCETO selo/linha do hero e a seção Atuação
//   9. home "/", /sp e /br sem regressão
// Os HITS de medição (GA4/Ads/Meta) são interceptados e respondidos localmente: o teste vê a
// requisição sair, mas nada chega às contas (o utm_campaign do teste é o da campanha real).
// Exit 1 em qualquer falha (serve de gate).

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4197;
const BASE = `http://127.0.0.1:${PORT}`;
const ROTA = "/assistente-tecnico-medico/goiania";
const CANONICAL = `https://www.drakellyneisse.com.br${ROTA}`;
const AW_LABEL = "AW-16690821688/zjEbCOiG7MAcELj05pY-";
const TINTIM_HOME_TOKEN = "b40002a5-951b-4014-a30a-17af3f592141"; // fluxo Tintim da home
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";   // fluxo dedicado da porta SP
const TINTIM_BR_TOKEN = "59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";   // fluxo dedicado da campanha [BR]
const TINTIM_PLACEHOLDER = "COLE-AQUI-TOKEN-TINTIM-GOIANIA";

// UTMs/gclid do teste definidos no briefing de 22/10 (hits interceptados: não sujam GA4/Ads)
const UTMS = "utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-at-goiania&utm_term=assistente%20tecnico%20medico&matchtype=e&gclid=TESTGCLID_GO_123";

// textos do briefing — conferidos LITERALMENTE (não importados do código, de propósito)
const HOME_HERO_SELO = "Assistência técnica médica · Perícia Médica";
const GO_HERO_SELO = "Assistência técnica médica · Goiânia e região";
const GO_HERO_PRESENCIAL = "Acompanhamento presencial na perícia em Goiânia, com médico da equipe.";
const GO_ATUACAO_H2 = "Acompanhamento presencial em Goiânia e em todo o Brasil";
const GO_ATUACAO_P = "em Goiânia, Aparecida de Goiânia, Anápolis e em qualquer outra cidade do país.";
const HOME_ATUACAO_H2 = "Acompanhamento presencial em Goiânia, Brasília, Uberlândia e em todo o Brasil";
const HOME_ATUACAO_P = "em Goiânia, Brasília, Uberlândia e em qualquer comarca do país.";
const GO_FOOTER = "Atendimento presencial em Goiânia e região · Atuação em todo o Brasil (presencial e remoto)";
const H1_HOME = "Não enfrente a perícia sem um assistente técnico médico do seu lado.";

// hits de medição interceptados (os scripts gtag/GTM carregam normalmente)
const HIT_RE = /google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect|googleadservices\.com\/pagead|doubleclick\.net\/|google\.com\/(pagead|ccm)\/|facebook\.com\/tr/;

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
      if (p === ROTA || p === ROTA + "/") file = path.join(DIST, "assistente-tecnico-medico-goiania.html");
      else if (p === "/assistente-tecnico-medico/br" || p === "/assistente-tecnico-medico/br/") file = path.join(DIST, "assistente-tecnico-medico-br.html");
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

// contexto com os hits de medição interceptados (respondidos 204 localmente)
async function newContext(browser, opts) {
  const ctx = await browser.newContext(opts);
  await ctx.route(HIT_RE, (route) => route.fulfill({ status: 204, body: "" }));
  return ctx;
}

// quantos elementos `sel` VISÍVEIS têm exatamente o texto `t`
const contaVisiveis = (page, sel, t) =>
  page.evaluate(([s, txt]) =>
    Array.from(document.querySelectorAll(s)).filter((el) => el.textContent.trim() === txt && el.checkVisibility()).length,
  [sel, t]);

// a linha presencial é o elemento logo depois do botão de WhatsApp VISÍVEL do hero?
const linhaLogoAbaixoDoBotao = (page) =>
  page.evaluate((txt) => {
    const a = Array.from(document.querySelectorAll('#inicio a[data-cta="cta_hero_wpp"]')).find((el) => el.checkVisibility());
    const next = a && a.nextElementSibling;
    return !!next && next.textContent.trim() === txt && next.checkVisibility();
  }, GO_HERO_PRESENCIAL);

async function main() {
  // token do fluxo Tintim de Goiânia: lido do single source (geo-goiania.ts)
  const geoSrc = await readFile(path.join(ROOT, "src", "components", "at", "geo-goiania.ts"), "utf8");
  const tintimGo = (geoSrc.match(/AT_GOIANIA_WHATSAPP_URL\s*=\s*"([^"]+)"/) || [])[1] || "";
  const TINTIM_GO_TOKEN = tintimGo.split("/").pop();

  const srv = await startServer();
  const browser = await chromium.launch();

  // ── 1) rota nova 200 + 301 do caminho pai ─────────────────────────────────
  console.log("\n[1] Rotas");
  for (const p of [ROTA, ROTA + "/"]) {
    const rr = await fetch(`${BASE}${p}?${UTMS}`);
    const body = await rr.text();
    check(rr.status === 200 && body.includes(`<link rel="canonical" href="${CANONICAL}" />`), `${p} responde 200 com o HTML da porta`, `status ${rr.status}`);
  }
  const r = await fetch(`${BASE}/assistente-tecnico-medico?utm_source=x`, { redirect: "manual" });
  check(r.status === 301, "/assistente-tecnico-medico segue com 301", `recebido ${r.status}`);
  check((r.headers.get("location") || "").startsWith("/"), "Location -> /", r.headers.get("location") || "");
  if (TINTIM_GO_TOKEN === TINTIM_PLACEHOLDER) {
    if (process.env.ALLOW_TINTIM_PLACEHOLDER === "1") console.log(`  WARN  token Tintim de Goiânia ainda é o placeholder (liberado por ALLOW_TINTIM_PLACEHOLDER=1)`);
    else check(false, "token Tintim de Goiânia real (sem placeholder)", TINTIM_GO_TOKEN);
  } else {
    check(/^[0-9a-f-]{36}$/.test(TINTIM_GO_TOKEN), "token Tintim de Goiânia com formato de UUID", TINTIM_GO_TOKEN);
  }
  check(![TINTIM_HOME_TOKEN, TINTIM_SP_TOKEN, TINTIM_BR_TOKEN].includes(TINTIM_GO_TOKEN), "token de Goiânia diferente dos fluxos home/SP/BR");

  // ── 2+3) Porta Goiânia — head, conteúdo (desktop) ─────────────────────────
  console.log("\n[2] Porta Goiânia — head e JSON-LD");
  const ctx = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const gaHits = [];
  page.on("request", (req) => {
    const u = req.url();
    if (u.includes("google-analytics.com/g/collect")) gaHits.push(u);
  });
  await page.goto(`${BASE}${ROTA}?${UTMS}`, { waitUntil: "domcontentloaded" });

  const title = await page.title();
  check(title === "Assistente Técnico Médico em Perícia Judicial em Goiânia | Dra. Kelly Neisse", "title com Goiânia", title);
  const desc = (await page.getAttribute('meta[name="description"]', "content")) || "";
  check(desc.startsWith("Tem uma perícia médica no seu processo cível ou trabalhista em Goiânia? "), "meta description com 'em Goiânia'", desc.slice(0, 80));
  for (const sel of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    check((await page.getAttribute(sel, "content")) === title, `${sel} = title`);
  }
  for (const sel of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    check((await page.getAttribute(sel, "content")) === desc, `${sel} = description`);
  }
  const robots = await page.getAttribute('meta[name="robots"]', "content");
  check(robots === "noindex, follow", "robots noindex", robots || "(ausente)");
  const canonical = await page.getAttribute('link[rel="canonical"]', "href");
  check(canonical === CANONICAL, "canonical da rota", canonical || "");
  const ogUrl = await page.getAttribute('meta[property="og:url"]', "content");
  check(ogUrl === CANONICAL, "og:url da rota", ogUrl || "");

  const ld = await page.$$eval('script[type="application/ld+json"]', (ss) => ss.map((s) => JSON.parse(s.textContent)));
  const ldStr = JSON.stringify(ld);
  check(!ldStr.includes("LocalBusiness"), "JSON-LD sem LocalBusiness");
  check(!/"address"/.test(ldStr) && !/Goi[aâ]nia/i.test(ldStr), "JSON-LD sem endereço e sem Goiânia");

  console.log("\n[3] Porta Goiânia — conteúdo (desktop 1366px)");
  const h1 = (await page.textContent("h1")).trim();
  check(h1 === H1_HOME, "H1 idêntico ao da home", h1.slice(0, 80));
  check((await contaVisiveis(page, "#inicio span", GO_HERO_SELO)) === 1, "selo do hero 'Goiânia e região' visível no desktop");
  check((await contaVisiveis(page, "#inicio p", GO_HERO_PRESENCIAL)) === 1, "linha presencial visível no desktop");
  check(await linhaLogoAbaixoDoBotao(page), "linha presencial logo abaixo do botão de WhatsApp do hero (desktop)");

  const goMainText = (await page.textContent("main")).replace(/\s+/g, " ").trim();
  check(goMainText.includes(GO_ATUACAO_H2), "Atuação: título de Goiânia");
  check(goMainText.includes(GO_ATUACAO_P), "Atuação: Goiânia, Aparecida de Goiânia, Anápolis");
  check(!goMainText.includes("Brasília") && !goMainText.includes("Uberlândia"), "corpo sem Brasília/Uberlândia (lista da home)");

  const footer = (await page.textContent("footer")).replace(/\s+/g, " ").trim();
  check(footer.includes(GO_FOOTER), "rodapé com a linha de Goiânia");
  check(!/sede/i.test(footer), "rodapé sem 'sede'");
  check(footer.includes("CRM/MG 109153"), "CRM/MG 109153 no rodapé");

  // ── 4) Conteúdo proibido ──────────────────────────────────────────────────
  console.log("\n[4] Conteúdo proibido");
  const rawHtml = await (await fetch(`${BASE}${ROTA}`)).text();
  for (const t of ["TRT-18", "Rua Paim"]) check(!rawHtml.includes(t), `HTML sem "${t}"`);
  check(!/sede em goi[aâ]nia/i.test(rawHtml), 'HTML sem "sede em Goiânia"');
  // bloco a bloco: o textContent do <body> inteiro cola blocos vizinhos sem separador e gera
  // falso positivo ("…e escritórios" + "Assistência técnica médica · Goiânia…")
  const blocos = await page.$$eval("#root p, #root h1, #root h2, #root h3, #root h4, #root li, #root a, #root button, #root summary",
    (els) => els.map((el) => el.textContent.replace(/\s+/g, " ").trim()));
  const sugereSede = blocos.filter((t) => /(sede|escrit[oó]rio|consult[oó]rio|endere[cç]o)[^.]{0,30}goi[aâ]nia/i.test(t));
  check(sugereSede.length === 0, "nenhum texto sugere sede/escritório/consultório/endereço em Goiânia", sugereSede.join(" | ").slice(0, 160));
  check(!blocos.some((t) => /CRM\/GO/.test(t)), "nenhuma menção a CRM/GO");
  for (const t of [title, desc, GO_HERO_SELO, GO_HERO_PRESENCIAL, GO_ATUACAO_H2, GO_ATUACAO_P, GO_FOOTER]) {
    check(!/[—–]/.test(t), `sem travessão: "${t.slice(0, 50)}${t.length > 50 ? "…" : ""}"`);
  }

  // ── 5) page_view beacon com path + UTMs + gclid ───────────────────────────
  console.log("\n[5] page_view");
  await page.waitForTimeout(600);
  const pv = gaHits.find((u) => u.includes("en=page_view"));
  check(!!pv, "beacon GA4 page_view emitido");
  if (pv) {
    const dl = decodeURIComponent(new URL(pv).searchParams.get("dl") || "");
    check(dl.includes(ROTA), "page_view dl com path da rota", dl.slice(0, 110));
    check(dl.includes("utm_campaign=pesquisa-at-goiania") && dl.includes("gclid=TESTGCLID_GO_123"), "page_view dl carrega UTMs+gclid");
    const gclidParam = new URL(pv).searchParams.get("gclid");
    check(gclidParam === "TESTGCLID_GO_123", "gclid como param do beacon (atribuição Ads)", gclidParam || "(ausente)");
  }

  // ── 6) Cliques em todos os botões de WhatsApp ─────────────────────────────
  // trava a navegação (preventDefault antes dos handlers de tracking) p/ clicar em série
  await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault(), true));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(".bfab-cta", { timeout: 5000 }).catch(() => {});

  console.log("\n[6] Cliques em todos os botões de WhatsApp da porta Goiânia");
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
    const temUtm = b.href.includes("utm_campaign=pesquisa-at-goiania") && b.href.includes("gclid=TESTGCLID_GO_123");
    check(temAw, `[${b.cta}] conversão AW (${AW_LABEL.split("/")[1]}, beacon)`);
    check(temGa4, `[${b.cta}] evento GA4 whatsapp_click_at`);
    check(temUtm, `[${b.cta}] UTMs+gclid propagados ao Tintim`, b.href.slice(0, 130));
    check(b.href.includes(`/${TINTIM_GO_TOKEN}`), `[${b.cta}] deeplink Tintim do fluxo de Goiânia`);
    check(![TINTIM_HOME_TOKEN, TINTIM_SP_TOKEN, TINTIM_BR_TOKEN].some((t) => b.href.includes(t)), `[${b.cta}] sem deeplink da home/SP/BR`);
  }
  // mesmo mecanismo da home em produção: whatsapp_click_at sai por beacon MANUAL /g/collect
  const wppBeacons = gaHits.filter((u) => u.includes("en=whatsapp_click_at")).length;
  check(wppBeacons >= botoes.length, "whatsapp_click_at por beacon manual /g/collect (1 por botão)", `${wppBeacons} beacon(s) p/ ${botoes.length} botões`);
  await ctx.close();

  // ── 7) Mobile (Pixel 7) ───────────────────────────────────────────────────
  console.log("\n[7] Porta Goiânia — mobile (Pixel 7)");
  const ctxMob = await newContext(browser, { ...devices["Pixel 7"] });
  const mob = await ctxMob.newPage();
  await mob.goto(`${BASE}${ROTA}?${UTMS}`, { waitUntil: "domcontentloaded" });
  check((await contaVisiveis(mob, "#inicio span", GO_HERO_SELO)) === 1, "selo do hero 'Goiânia e região' visível no mobile");
  check((await contaVisiveis(mob, "#inicio p", GO_HERO_PRESENCIAL)) === 1, "linha presencial visível no mobile");
  check(await linhaLogoAbaixoDoBotao(mob), "linha presencial logo abaixo do botão de WhatsApp do hero (mobile)");
  const h1Mob = (await mob.textContent("h1")).trim();
  check(h1Mob === H1_HOME, "H1 idêntico ao da home (mobile)");
  await ctxMob.close();

  // ── 8) Home "/" sem regressão + diff de copy ──────────────────────────────
  console.log("\n[8] Home / — sem regressão e diff de copy contra a porta Goiânia");
  const ctxHome = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  const home = await ctxHome.newPage();
  const gaHome = [];
  home.on("request", (req) => { if (req.url().includes("google-analytics.com/g/collect")) gaHome.push(req.url()); });
  await home.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  const h1Home = (await home.textContent("h1")).trim();
  check(h1Home === H1_HOME, "H1 da home intacto", h1Home.slice(0, 70));
  const robotsHome = await home.getAttribute('meta[name="robots"]', "content");
  check(robotsHome === "index, follow", "robots index,follow", robotsHome || "");
  const canonicalHome = await home.getAttribute('link[rel="canonical"]', "href");
  check(canonicalHome === "https://www.drakellyneisse.com.br/", "canonical da home intacto", canonicalHome || "");
  const footerHome = await home.textContent("footer");
  check(footerHome.includes("Sede em Uberlândia/MG"), "rodapé sede MG intacto");
  const homeMainText = (await home.textContent("main")).replace(/\s+/g, " ").trim();
  check(homeMainText.includes(HOME_ATUACAO_H2) && homeMainText.includes(HOME_ATUACAO_P), "Atuação da home intacta (Goiânia, Brasília, Uberlândia)");
  check(!homeMainText.includes(GO_HERO_PRESENCIAL) && !homeMainText.includes(GO_HERO_SELO), "home sem selo/linha de Goiânia");

  // o <main> da porta tem que ser idêntico ao da home APÓS normalizar só o selo, a linha do hero
  // e as 2 frases da Atuação
  const goNormalized = goMainText
    .split(GO_HERO_PRESENCIAL).join("")
    .split(GO_HERO_SELO).join(HOME_HERO_SELO)
    .replace(GO_ATUACAO_H2, HOME_ATUACAO_H2)
    .replace(GO_ATUACAO_P, HOME_ATUACAO_P)
    .replace(/\s+/g, " ").trim();
  check(goNormalized === homeMainText, "copy do <main> idêntica à home (exceto selo/linha do hero e Atuação)");

  const tintimHome = await home.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
  check(tintimHome.length > 0 && tintimHome.every((h) => h.includes(TINTIM_HOME_TOKEN)), "botões da home seguem no fluxo Tintim original", `${tintimHome.length} botões`);
  await home.waitForTimeout(600);
  check(!!gaHome.find((u) => u.includes("en=page_view")), "beacon page_view da home segue disparando");
  await ctxHome.close();

  // ── 9) Portas /sp e /br sem regressão ─────────────────────────────────────
  console.log("\n[9] Portas /sp e /br — sem regressão");
  const ctxPortas = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  for (const [rota, token, trecho] of [
    ["/assistente-tecnico-medico/sp", TINTIM_SP_TOKEN, "Acompanhamento pericial em São Paulo e em todo o Brasil"],
    ["/assistente-tecnico-medico/br", TINTIM_BR_TOKEN, "Acompanhamento pericial em todo o Brasil"],
  ]) {
    const pg = await ctxPortas.newPage();
    await pg.goto(`${BASE}${rota}`, { waitUntil: "domcontentloaded" });
    const canon = await pg.getAttribute('link[rel="canonical"]', "href");
    check(canon === `https://www.drakellyneisse.com.br${rota}`, `${rota}: canonical intacto`, canon || "");
    const mainTxt = (await pg.textContent("main")).replace(/\s+/g, " ").trim();
    check(mainTxt.includes(trecho), `${rota}: Atuação intacta`);
    check(!mainTxt.includes(GO_HERO_PRESENCIAL) && !mainTxt.includes(GO_HERO_SELO), `${rota}: sem selo/linha de Goiânia`);
    const links = await pg.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
    check(links.length > 0 && links.every((h) => h.includes(token)), `${rota}: botões no fluxo Tintim próprio`, `${links.length} botões`);
    await pg.close();
  }
  await ctxPortas.close();

  await browser.close();
  srv.close();

  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
