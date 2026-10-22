// Validação E2E local da porta geo /assistente-tecnico-medico/goiania (roda sobre dist/, pós-build).
//
//   node scripts/validate-at-goiania.mjs
//
// Espelha scripts/validate-at-br.mjs. Sobe um servidor estático que emula os rewrites/redirects
// do vercel.json e, com o Chromium do Playwright, verifica os requisitos da campanha [GO]:
//   1. rota nova responde 200 e o caminho pai /assistente-tecnico-medico segue com 301 -> /
//   2. head (title com Goiânia, description, robots noindex, canonical, og:url) e JSON-LD sem
//      LocalBusiness/endereço
//   3. desktop: H1 idêntico ao da home, selo "Goiânia e região", pergunta logo ACIMA e linha
//      presencial logo abaixo do botão do hero, microprova de sigilo, Atuação e rodapé de Goiânia,
//      CRM/MG 109153, JSON-LD FAQPage igual à FAQ visível
//   4. conteúdo proibido: TRT-18, "sede em Goiânia", Rua Paim, sede/escritório/sala em Goiânia,
//      textos que a copy v2 tirou (médico da equipe, Quanto custa, TRT-3 sozinho), preço/valor,
//      outro médico, travessão nos textos novos (TJGO é PERMITIDO: a Dra. Kelly é cadastrada no
//      TJGO e a copy da home cita isso; o briefing de 22/10 dizia o contrário e o Ivan corrigiu)
//   5. page_view via beacon /g/collect com dl no path novo carregando UTMs + gclid
//   6. clique em TODOS os botões de WhatsApp: conversão AW (zjEb…) + whatsapp_click_at + UTMs/gclid
//      propagados ao deeplink do fluxo Tintim de Goiânia
//   7. mobile (Pixel 7): selo em 1 linha, pergunta acima e linha presencial abaixo do botão
//   8. diff de copy contra a home: <main> idêntico EXCETO os itens A1–A21 da copy v2 (um a um)
//   9. home "/", /sp e /br sem regressão e sem nenhum texto da porta Goiânia
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

// UTMs/gclid do teste definidos no briefing de 22/10 (hits interceptados: não sujam GA4/Ads)
const UTMS = "utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-at-goiania&utm_term=assistente%20tecnico%20medico&matchtype=e&gclid=TESTGCLID_GO_123";

// textos do briefing — conferidos LITERALMENTE (não importados do código, de propósito)
const HOME_HERO_SELO = "Assistência técnica médica · Perícia Médica";
const GO_HERO_SELO = "Assistente técnico · Goiânia e região";                                   // A1
const GO_HERO_PRESENCIAL = "Acompanhamento presencial em perícias em Goiânia e região.";            // A2
const GO_HERO_MOMENTO = "Perícia marcada, prazo de quesitos ou laudo desfavorável?";                // A3
const GO_HERO_SIGILO = "Sigilo do seu processo";                                                    // A4
const GO_ATUACAO_H2 = "Acompanhamento presencial em Goiânia e em todo o Brasil";
const GO_ATUACAO_P = "Acompanhamento presencial da perícia onde ela acontecer: em Goiânia, Aparecida de Goiânia, Anápolis, nas cidades da região e em qualquer outra cidade do país."; // A20
const HOME_ATUACAO_H2 = "Acompanhamento presencial em Goiânia, Brasília, Uberlândia e em todo o Brasil";
const HOME_ATUACAO_P = "em Goiânia, Brasília, Uberlândia e em qualquer comarca do país.";
const GO_FOOTER = "Atendimento presencial em Goiânia e região · Atuação em todo o Brasil (presencial e remoto)";
const H1_HOME = "Não enfrente a perícia sem um assistente técnico médico do seu lado.";
const GO_FAQ_06_Q = "Procurei um médico perito particular. É isso?";                               // A19

// copy v2 (briefing de 22/10, Grupo A): [item, texto na porta, texto na home ("" = só existe na
// porta), ocorrências esperadas no <main> da porta]. ORDEM importa: o texto mais longo vem antes
// do que é prefixo dele (A5 antes de A18; A7 antes de A16). Aplicados em sequência sobre o <main>
// da porta, os pares têm que reproduzir EXATAMENTE o <main> da home.
const COPY_V2 = [
  ["A1", GO_HERO_SELO, HOME_HERO_SELO, 2],
  ["A3", GO_HERO_MOMENTO, "", 2],
  ["A2", GO_HERO_PRESENCIAL, "", 2],
  ["A4", GO_HERO_SIGILO, "Seus dados estão protegidos", 2],
  ["A5", " E depois do exame só dá para questionar o que foi perguntado e registrado. Por isso o assistente técnico entra antes da perícia, e não só quando o laudo sai.", "", 1],
  ["A6", "Você vai passar por uma perícia e quer um médico do seu lado? O laudo pode pesar na decisão.", "Você vai passar por uma perícia e o laudo pode pesar na decisão.", 1],
  ["A7", "Acompanhamento presencial de perícias em Goiânia e região", "Acompanhamento presencial da perícia", 1],
  ["A8", "Perita cadastrada no TJGO, TJMG, TJSP, TJMT e TRT-3, com foco exclusivo em perícia médica judicial. CRM/MG 109.153.", "Perita cadastrada no TRT-3, com foco exclusivo em perícia médica judicial. CRM/MG 109.153.", 1],
  ["A9", "Reclamatória trabalhista", "Reclamatória · TRT-3", 1],
  ["A10", "Quesitos dentro do prazo, mesmo quando ele é de poucos dias", "Resposta no prazo apertado, em geral cerca de 15 dias após a nomeação", 1],
  ["A11", "Assistência técnica pericial com foco exclusivo em perícia médica judicial: trabalhista e cível", "Foco exclusivo em perícia médica judicial: trabalhista e cível", 1],
  ["A12", "Perita cadastrada no TJGO, TJMG, TJSP, TJMT e TRT-3 · CRM/MG 109.153 · foco exclusivo em perícia médica judicial.", "Perita cadastrada em TRT-3, TJGO, TJSP, TJMT e TJMG · CRM/MG 109.153 · foco exclusivo em perícia médica judicial.", 1],
  ["A13", "Atendo em conjunto com o seu escritório · Trabalhista e cível · Goiânia e região", "Atendo em conjunto com o seu escritório · Trabalhista e cível · Brasil todo", 1],
  ["A14", " Por isso não existe médico perito particular. O que você pode ter é um médico assistente técnico, do seu lado na perícia.", "", 1],
  ["A15/A17", "TJGO · TJMG · TJSP · TJMT · TRT-3", "TRT-3 · TJGO · TJSP · TJMT · TJMG", 2],
  ["A16", "Goiânia e regiãoAcompanhamento presencial de perícias", "BrasilAtuação técnica em todo o país", 1],
  ["A18", " E depois do exame só dá para questionar o que foi perguntado e registrado.", "", 1],
  ["A19", `${GO_FAQ_06_Q}O perito é nomeado pelo juiz e não pode ser contratado por nenhum dos lados. O que você contrata é o médico assistente técnico, que acompanha a perícia do seu lado, formula os quesitos e analisa o laudo.`, "Quanto custa?Orçamento por caso, sem mensalidade. Você sabe o valor antes de fechar.", 1],
  ["A20", GO_ATUACAO_P, `A Dra. Kelly acompanha a perícia presencialmente onde ela acontecer, ${HOME_ATUACAO_P}`, 1],
  ["Atuação (título)", GO_ATUACAO_H2, HOME_ATUACAO_H2, 1],
  ["A21", "Goiânia e região · Cível e trabalhista · CRM/MG 109.153", "Resposta rápida · Cível e trabalhista · CRM/MG 109.153", 1],
];
// textos que a copy v2 TIROU da porta (não podem sobrar no HTML)
const REMOVIDOS_V2 = ["com médico da equipe", "Quanto custa", "Perita cadastrada no TRT-3", "Reclamatória · TRT-3", "Seus dados estão protegidos"];

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

// o elemento logo antes ("prev") ou logo depois ("next") do botão de WhatsApp VISÍVEL do hero
// tem exatamente o texto `txt` e está visível?
const vizinhoDoBotao = (page, lado, txt) =>
  page.evaluate(([l, t]) => {
    const a = Array.from(document.querySelectorAll('#inicio a[data-cta="cta_hero_wpp"]')).find((el) => el.checkVisibility());
    const viz = a && (l === "prev" ? a.previousElementSibling : a.nextElementSibling);
    return !!viz && viz.textContent.trim() === t && viz.checkVisibility();
  }, [lado, txt]);
const linhaLogoAbaixoDoBotao = (page) => vizinhoDoBotao(page, "next", GO_HERO_PRESENCIAL);

// em quantas linhas o texto do selo VISÍVEL quebra (rects da Range = 1 por linha)
const linhasDoSelo = (page) =>
  page.evaluate((t) => {
    const span = Array.from(document.querySelectorAll("#inicio span")).find((el) => el.textContent.trim() === t && el.checkVisibility());
    if (!span) return 0;
    const r = document.createRange();
    r.selectNodeContents(span);
    return new Set(Array.from(r.getClientRects()).map((x) => Math.round(x.top))).size;
  }, GO_HERO_SELO);

// checagens do hero da porta (desktop e mobile)
async function checaHero(page, onde) {
  check((await contaVisiveis(page, "#inicio span", GO_HERO_SELO)) === 1, `A1 selo "${GO_HERO_SELO}" visível (${onde})`);
  check((await contaVisiveis(page, "#inicio p", GO_HERO_MOMENTO)) === 1, `A3 pergunta visível (${onde})`);
  check(await vizinhoDoBotao(page, "prev", GO_HERO_MOMENTO), `A3 pergunta logo ACIMA do botão de WhatsApp do hero (${onde})`);
  check((await contaVisiveis(page, "#inicio p", GO_HERO_PRESENCIAL)) === 1, `A2 linha presencial visível (${onde})`);
  check(await linhaLogoAbaixoDoBotao(page), `A2 linha presencial logo abaixo do botão de WhatsApp do hero (${onde})`);
  check((await contaVisiveis(page, "#inicio p", GO_HERO_SIGILO)) === 1, `A4 microprova "${GO_HERO_SIGILO}" visível (${onde})`);
}

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
  check(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(TINTIM_GO_TOKEN), "token Tintim de Goiânia com formato de UUID", TINTIM_GO_TOKEN);
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

  // FAQPage do schema = FAQ visível da porta, pergunta a pergunta (copy v2: A18 e A19 nos dois)
  const faqLd = ld.find((o) => o["@type"] === "FAQPage");
  const faqSchema = (faqLd?.mainEntity || []).map((q) => [q.name, q.acceptedAnswer?.text]);
  const faqVisivel = await page.$$eval('#faq [id^="at-faq-btn-"]', (bs) =>
    bs.map((b) => [b.querySelector("span.flex-1").textContent.trim(), document.getElementById(b.getAttribute("aria-controls")).textContent.trim()]));
  check(faqSchema.length === 6 && JSON.stringify(faqSchema) === JSON.stringify(faqVisivel), "JSON-LD FAQPage idêntico à FAQ visível", `${faqSchema.length} no schema, ${faqVisivel.length} visíveis`);
  check(faqSchema.some(([q]) => q === GO_FAQ_06_Q), "JSON-LD FAQPage com a pergunta do perito particular (A19)");

  console.log("\n[3] Porta Goiânia — conteúdo (desktop 1366px)");
  const h1 = (await page.textContent("h1")).trim();
  check(h1 === H1_HOME, "H1 idêntico ao da home", h1.slice(0, 80));
  await checaHero(page, "desktop");

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
  // link da home (e das portas SP/BR) proibido em QUALQUER ponto do HTML, inclusive no FAB inline
  check(!rawHtml.includes(TINTIM_HOME_TOKEN), "HTML sem o fluxo Tintim da home");
  check(!rawHtml.includes(TINTIM_SP_TOKEN) && !rawHtml.includes(TINTIM_BR_TOKEN), "HTML sem os fluxos Tintim da SP/BR");
  check(rawHtml.includes(TINTIM_GO_TOKEN), "HTML com o fluxo Tintim de Goiânia");
  check(!/sede em goi[aâ]nia/i.test(rawHtml), 'HTML sem "sede em Goiânia"');
  // bloco a bloco: o textContent do <body> inteiro cola blocos vizinhos sem separador e gera
  // falso positivo ("…e escritórios" + "Assistência técnica médica · Goiânia…")
  const blocos = await page.$$eval("#root p, #root h1, #root h2, #root h3, #root h4, #root li, #root a, #root button, #root summary",
    (els) => els.map((el) => el.textContent.replace(/\s+/g, " ").trim()));
  // "." e "·" encerram a frase/item: "o seu escritório · Trabalhista e cível · Goiânia e região"
  // (A13) fala do escritório do ADVOGADO, não de um escritório da Dra. Kelly em Goiânia
  const sugereSede = blocos.filter((t) => /(sede|escrit[oó]rio|consult[oó]rio|endere[cç]o|\bsala\b)[^.·]{0,30}goi[aâ]nia/i.test(t));
  check(sugereSede.length === 0, "nenhum texto sugere sede/escritório/consultório/sala/endereço em Goiânia", sugereSede.join(" | ").slice(0, 160));
  check(!blocos.some((t) => /CRM\/GO/.test(t)), "nenhuma menção a CRM/GO");
  for (const t of REMOVIDOS_V2) check(!rawHtml.includes(t), `HTML sem "${t}" (saiu na copy v2)`);
  const precos = blocos.filter((t) => /pre[çc]o|or[çc]amento|mensalidade|\bvalor\b|proposta/i.test(t));
  check(precos.length === 0, "nenhum texto sobre preço, valor ou proposta", precos.join(" | ").slice(0, 160));
  const medicos = [...new Set(blocos.flatMap((t) => t.match(/\bDra?\.\s+[A-ZÀ-Ú][a-zà-ú]+/g) || []))];
  check(medicos.every((m) => m === "Dra. Kelly"), "nenhum nome de outro médico (só Dra. Kelly)", medicos.join(", "));
  for (const t of [title, desc, GO_FOOTER, ...COPY_V2.map(([, go]) => go)]) {
    check(!/[—–]/.test(t), `sem travessão: "${t.trim().slice(0, 50)}${t.length > 50 ? "…" : ""}"`);
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
  await checaHero(mob, "mobile");
  const linhasSelo = await linhasDoSelo(mob);
  check(linhasSelo === 1, "A1 selo cabe em 1 linha no Pixel 7", `${linhasSelo} linha(s)`);
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
  const v2NaHome = COPY_V2.filter(([, go]) => homeMainText.includes(go.trim())).map(([item]) => item);
  check(v2NaHome.length === 0, "home sem nenhum texto da copy v2 de Goiânia", v2NaHome.join(", "));

  // o <main> da porta tem que ser idêntico ao da home APÓS desfazer, item a item, as trocas da
  // copy v2 (cada item tem que aparecer o número de vezes esperado)
  let goNormalized = goMainText;
  for (const [item, go, homeTxt, n] of COPY_V2) {
    const achou = goNormalized.split(go).length - 1;
    check(achou === n, `${item} aplicado na porta (${n}x)`, `achei ${achou}x: "${go.trim().slice(0, 60)}${go.length > 60 ? "…" : ""}"`);
    goNormalized = goNormalized.split(go).join(homeTxt);
  }
  goNormalized = goNormalized.replace(/\s+/g, " ").trim();
  check(goNormalized === homeMainText, "copy do <main> idêntica à home (exceto os itens A1 a A21)");
  if (goNormalized !== homeMainText) {
    let i = 0;
    while (i < goNormalized.length && goNormalized[i] === homeMainText[i]) i++;
    console.log(`  1ª divergência em ${i}:\n    porta: …${goNormalized.slice(Math.max(0, i - 60), i + 80)}\n    home:  …${homeMainText.slice(Math.max(0, i - 60), i + 80)}`);
  }

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
    const v2 = COPY_V2.filter(([, go]) => mainTxt.includes(go.trim())).map(([item]) => item);
    check(v2.length === 0, `${rota}: sem nenhum texto da copy v2 de Goiânia`, v2.join(", "));
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
