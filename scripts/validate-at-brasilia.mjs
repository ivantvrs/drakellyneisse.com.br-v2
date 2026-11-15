// Validação E2E local da porta geo /assistente-tecnico-medico/brasilia (roda sobre dist/, pós-build).
//
//   node scripts/validate-at-brasilia.mjs
//
// Espelha scripts/validate-at-goiania.mjs. Sobe um servidor estático que emula os rewrites/redirects
// do vercel.json e, com o Chromium do Playwright, verifica os requisitos da campanha [DF]:
//   1. rota nova responde 200 e o caminho pai /assistente-tecnico-medico segue com 301 -> /
//   2. head (title com Brasília, description, robots noindex, canonical, og:url) e JSON-LD sem
//      LocalBusiness/endereço/Brasília; FAQPage com as 9 perguntas da home, na mesma ordem
//   3. desktop (1366 e 1280): H1 idêntico ao da home, selo "Brasília e entorno" em 1 linha, linha
//      presencial logo abaixo do botão do hero, SEM a pergunta e a microprova de sigilo da Goiânia,
//      FAQ visível com as 9 da home, Atuação e rodapé de Brasília, CRM/MG 109153
//   4. conteúdo proibido: TRT-10, TJDFT, "sede em Brasília", "médico da equipe", Rua Paim,
//      sede/escritório/consultório/sala/endereço em Brasília, CRM/DF, "a Dra. Kelly acompanha",
//      preço/valor/proposta fora da copy da home, outro médico, travessão nos textos novos
//   5. page_view via beacon /g/collect com dl no path novo carregando UTMs + gclid
//   6. clique em TODOS os botões de WhatsApp: conversão AW (zjEb…) + whatsapp_click_at + UTMs/gclid
//      propagados ao deeplink do fluxo Tintim de Brasília (8d7669f3…), nunca o da home/SP/BR/Goiânia
//   7. mobile (Pixel 7): selo em até 2 linhas, linha presencial abaixo do botão, H1 da home
//   8. diff de copy contra a home: <main> idêntico EXCETO selo, linha presencial e Atuação
//   9. home "/", /sp, /br e /goiania sem regressão e sem nenhum texto da porta Brasília
//  10. sitelinks do anúncio (?sl=…, e #sobre): a porta abre sem erro e se comporta como a /goiania
//      (o sl é só repassado ao link do Tintim pelo script herdado; só o #sobre rola, pela âncora)
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
const PORT = 4195;
const BASE = `http://127.0.0.1:${PORT}`;
const ROTA = "/assistente-tecnico-medico/brasilia";
const ROTA_GO = "/assistente-tecnico-medico/goiania";
const CANONICAL = `https://www.drakellyneisse.com.br${ROTA}`;
const AW_LABEL = "AW-16690821688/zjEbCOiG7MAcELj05pY-";
const TINTIM_BSB_TOKEN = "8d7669f3-ce94-42c3-bb70-ae9d6578c692";  // fluxo dedicado da campanha [DF] (briefing 15/11)
const TINTIM_HOME_TOKEN = "b40002a5-951b-4014-a30a-17af3f592141"; // fluxo Tintim da home
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";   // fluxo dedicado da porta SP
const TINTIM_BR_TOKEN = "59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";   // fluxo dedicado da campanha [BR]
const TINTIM_GO_TOKEN = "1fdae0e4-bc5c-4ca6-b902-637cee0d58f0";   // fluxo dedicado da campanha [GO]
const OUTROS_TOKENS = [TINTIM_HOME_TOKEN, TINTIM_SP_TOKEN, TINTIM_BR_TOKEN, TINTIM_GO_TOKEN];

// UTMs/gclid do teste definidos no briefing de 15/11 (hits interceptados: não sujam GA4/Ads)
const UTMS = "utm_source=google&utm_medium=cpc&utm_campaign=pesquisa-at-brasilia&utm_term=assistente%20tecnico%20medico&matchtype=e&gclid=TESTGCLID_DF_123";

// os 8 sitelinks da campanha [DF] (?sl=<nome>; "Sobre" também leva #sobre)
const SITELINKS = ["sobre#sobre", "antes-do-exame", "empresas", "parecer", "pericia-marcada", "manifestacao", "orcamento-2h", "presencial"];

// textos do briefing — conferidos LITERALMENTE (não importados do código, de propósito)
const HOME_HERO_SELO = "Assistente técnico pericial · Perícia judicial";
const BSB_HERO_SELO = "Assistente técnico · Brasília e entorno";
const BSB_HERO_PRESENCIAL = "Acompanhamento presencial na perícia em Brasília e entorno.";
const GO_HERO_MOMENTO = "Perícia marcada, prazo de quesitos ou laudo desfavorável?"; // só Goiânia: NÃO pode estar na porta
const GO_HERO_SIGILO = "Sigilo do seu processo";                                     // só Goiânia: NÃO pode estar na porta
const HOME_HERO_SIGILO = "Seus dados estão protegidos";
const BSB_ATUACAO_H2 = "Acompanhamento presencial em Brasília e em todo o Brasil";
const BSB_ATUACAO_CIDADES = "Brasília, Taguatinga, Águas Claras, Luziânia, Valparaíso de Goiás, Formosa";
const BSB_ATUACAO_P = `Acompanhamento presencial da perícia onde ela acontecer: em ${BSB_ATUACAO_CIDADES} e em qualquer outra cidade do país.`;
const HOME_ATUACAO_H2 = "Acompanhamento presencial em Goiânia, Brasília, Uberlândia e em todo o Brasil";
const HOME_ATUACAO_P = "A Dra. Kelly acompanha a perícia presencialmente onde ela acontecer, em Goiânia, Brasília, Uberlândia e em qualquer comarca do país.";
const BSB_FOOTER = "Atendimento presencial em Brasília e entorno · Atuação em todo o Brasil (presencial e remoto)";
const H1_HOME = "Não enfrente a perícia sem um assistente técnico médico do seu lado.";
// 1ª microprova do hero, comum às páginas AT (06/11/2026)
const HERO_MICROPROVA_ORCAMENTO = "Orçamento em até 2h úteis";
// FAQ 08 (copy da home, herdada): única resposta que fala de orçamento/valor; fica fora do filtro de preço
const FAQ_08_A = "A parte que o indica adianta os honorários do assistente técnico, que são separados dos honorários do perito do juízo (CPC, art. 95). O orçamento é feito por caso, sem mensalidade, e você sabe o valor antes de decidir.";

// o que a porta MUDA no <main> em relação à home: [item, texto na porta, texto na home ("" = só
// existe na porta), ocorrências esperadas no <main> da porta]. Aplicados em sequência sobre o
// <main> da porta, os pares têm que reproduzir EXATAMENTE o <main> da home.
const COPY_BSB = [
  ["selo", BSB_HERO_SELO, HOME_HERO_SELO, 2],
  ["linha presencial", BSB_HERO_PRESENCIAL, "", 2],
  ["Atuação (parágrafo)", BSB_ATUACAO_P, HOME_ATUACAO_P, 1],
  ["Atuação (título)", BSB_ATUACAO_H2, HOME_ATUACAO_H2, 1],
];
// textos da porta Goiânia que NÃO podem vazar para a porta Brasília (copy v2 só da Goiânia)
const SO_GOIANIA = [GO_HERO_MOMENTO, GO_HERO_SIGILO, "Goiânia e região", "Aparecida de Goiânia", "TJGO · TJMG · TJSP · TJMT · TRT-3"];

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
      if (p === ROTA || p === ROTA + "/") file = path.join(DIST, "assistente-tecnico-medico-brasilia.html");
      else if (p === ROTA_GO || p === ROTA_GO + "/") file = path.join(DIST, "assistente-tecnico-medico-goiania.html");
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
const norm = (s) => s.replace(/\s+/g, " ").trim();

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

// o elemento logo depois ("next") do botão de WhatsApp VISÍVEL do hero tem exatamente o texto
// `txt` e está visível?
const linhaLogoAbaixoDoBotao = (page) =>
  page.evaluate((t) => {
    const a = Array.from(document.querySelectorAll('#inicio a[data-cta="cta_hero_wpp"]')).find((el) => el.checkVisibility());
    const viz = a && a.nextElementSibling;
    return !!viz && viz.textContent.trim() === t && viz.checkVisibility();
  }, BSB_HERO_PRESENCIAL);

// em quantas linhas o texto do selo VISÍVEL quebra (rects da Range = 1 por linha)
const linhasDoSelo = (page) =>
  page.evaluate((t) => {
    const span = Array.from(document.querySelectorAll("#inicio span")).find((el) => el.textContent.trim() === t && el.checkVisibility());
    if (!span) return 0;
    const r = document.createRange();
    r.selectNodeContents(span);
    return new Set(Array.from(r.getClientRects()).map((x) => Math.round(x.top))).size;
  }, BSB_HERO_SELO);

// checagens do hero da porta (desktop e mobile)
async function checaHero(page, onde) {
  check((await contaVisiveis(page, "#inicio span", BSB_HERO_SELO)) === 1, `selo "${BSB_HERO_SELO}" visível (${onde})`);
  check((await contaVisiveis(page, "#inicio p", BSB_HERO_PRESENCIAL)) === 1, `linha presencial visível (${onde})`);
  check(await linhaLogoAbaixoDoBotao(page), `linha presencial logo abaixo do botão de WhatsApp do hero (${onde})`);
  check((await contaVisiveis(page, "#inicio p", HERO_MICROPROVA_ORCAMENTO)) === 1, `microprova "${HERO_MICROPROVA_ORCAMENTO}" visível (${onde})`);
  check((await contaVisiveis(page, "#inicio p", HOME_HERO_SIGILO)) === 1, `2ª microprova da home ("${HOME_HERO_SIGILO}") visível (${onde})`);
  check((await contaVisiveis(page, "#inicio p", GO_HERO_MOMENTO)) === 0, `sem a pergunta da Goiânia acima do botão (${onde})`);
}

// FAQ visível: [pergunta, resposta] por item
const faqVisivelDe = (page) =>
  page.$$eval('#faq [id^="at-faq-btn-"]', (bs) =>
    bs.map((b) => [b.querySelector("span.flex-1").textContent.trim(), document.getElementById(b.getAttribute("aria-controls")).textContent.trim()]));

// comportamento de um sitelink numa porta: carrega sem erro, rola (ou não) e repassa o sl ao Tintim
async function abrirSitelink(ctx, rota, sl) {
  const [param, hash] = sl.split("#");
  const page = await ctx.newPage();
  const erros = [];
  page.on("pageerror", (e) => erros.push(String(e)));
  const resp = await page.goto(`${BASE}${rota}?sl=${param}&${UTMS}${hash ? "#" + hash : ""}`, { waitUntil: "load" });
  await page.waitForTimeout(400);
  const r = await page.evaluate((h) => {
    const alvo = h ? document.getElementById(h) : null;
    const topo = alvo ? Math.round(alvo.getBoundingClientRect().top) : null;
    const hero = document.querySelector('#inicio a[data-cta="cta_hero_wpp"]');
    // clique com navegação prevenida: só roda o handler que reescreve o link do Tintim
    window.addEventListener("click", (e) => e.preventDefault(), true);
    hero.click();
    return { h1: (document.querySelector("h1") || {}).textContent || "", scrollY: Math.round(window.scrollY), alvoTopo: topo, href: hero.href };
  }, hash || "");
  await page.close();
  return { status: resp.status(), erros, ...r };
}

async function main() {
  // token do fluxo Tintim de Brasília: lido do single source (geo-brasilia.ts) e conferido com o briefing
  const geoSrc = await readFile(path.join(ROOT, "src", "components", "at", "geo-brasilia.ts"), "utf8");
  const tintimBsb = (geoSrc.match(/AT_BRASILIA_WHATSAPP_URL\s*=\s*"([^"]+)"/) || [])[1] || "";
  const tokenNoCodigo = tintimBsb.split("/").pop();

  const srv = await startServer();
  const browser = await chromium.launch();

  // ── 1) rota nova 200 + 301 do caminho pai ─────────────────────────────────
  console.log("\n[1] Rotas e token");
  for (const p of [ROTA, ROTA + "/"]) {
    const rr = await fetch(`${BASE}${p}?${UTMS}`);
    const body = await rr.text();
    check(rr.status === 200 && body.includes(`<link rel="canonical" href="${CANONICAL}" />`), `${p} responde 200 com o HTML da porta`, `status ${rr.status}`);
  }
  const r = await fetch(`${BASE}/assistente-tecnico-medico?utm_source=x`, { redirect: "manual" });
  check(r.status === 301, "/assistente-tecnico-medico segue com 301", `recebido ${r.status}`);
  check((r.headers.get("location") || "").startsWith("/"), "Location -> /", r.headers.get("location") || "");
  check(tokenNoCodigo === TINTIM_BSB_TOKEN, "token Tintim de Brasília no código = token do briefing (8d7669f3…)", tokenNoCodigo);
  check(!tintimBsb.includes("redirect-to-whatsapp"), "deeplink tintim.link/whatsapp (não o redirect-to-whatsapp do Meta Ads)");
  check(!OUTROS_TOKENS.includes(TINTIM_BSB_TOKEN), "token de Brasília diferente dos fluxos home/SP/BR/Goiânia");

  // ── 2+3) Porta Brasília — head, conteúdo (desktop) ────────────────────────
  console.log("\n[2] Porta Brasília — head e JSON-LD");
  const ctx = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const gaHits = [];
  page.on("request", (req) => {
    const u = req.url();
    if (u.includes("google-analytics.com/g/collect")) gaHits.push(u);
  });
  await page.goto(`${BASE}${ROTA}?${UTMS}`, { waitUntil: "domcontentloaded" });

  const title = await page.title();
  check(title === "Assistente Técnico Médico em Perícia Judicial em Brasília | Dra. Kelly Neisse", "title com Brasília", title);
  const desc = (await page.getAttribute('meta[name="description"]', "content")) || "";
  check(desc.startsWith("Tem uma perícia médica no seu processo cível ou trabalhista em Brasília? "), "meta description com 'em Brasília'", desc.slice(0, 80));
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
  // pré-carregamentos herdados da home (hero AVIF do mobile e fontes)
  const preloadHero = await page.$('link[rel="preload"][as="image"][type="image/avif"]');
  check(!!preloadHero, "preload do hero (AVIF) herdado da home");

  const ld = await page.$$eval('script[type="application/ld+json"]', (ss) => ss.map((s) => JSON.parse(s.textContent)));
  const ldStr = JSON.stringify(ld);
  check(!ldStr.includes("LocalBusiness"), "JSON-LD sem LocalBusiness");
  check(!/"address"/.test(ldStr) && !/Bras[ií]lia/i.test(ldStr), "JSON-LD sem endereço e sem Brasília");

  // FAQPage do schema = FAQ visível da porta = FAQ da home (9 perguntas, mesma ordem)
  const faqLd = ld.find((o) => o["@type"] === "FAQPage");
  const faqSchema = (faqLd?.mainEntity || []).map((q) => [q.name, q.acceptedAnswer?.text]);
  const faqVisivel = await faqVisivelDe(page);
  check(faqSchema.length === 9 && JSON.stringify(faqSchema) === JSON.stringify(faqVisivel), "JSON-LD FAQPage idêntico à FAQ visível (9)", `${faqSchema.length} no schema, ${faqVisivel.length} visíveis`);

  console.log("\n[3] Porta Brasília — conteúdo (desktop 1366px)");
  const h1 = (await page.textContent("h1")).trim();
  check(h1 === H1_HOME, "H1 idêntico ao da home", h1.slice(0, 80));
  await checaHero(page, "desktop 1366");
  const linhasSelo1366 = await linhasDoSelo(page);
  check(linhasSelo1366 === 1, "selo em 1 linha (desktop 1366)", `${linhasSelo1366} linha(s)`);

  const bsbMainText = norm(await page.textContent("main"));
  check(bsbMainText.includes(BSB_ATUACAO_H2), "Atuação: título de Brasília");
  check(bsbMainText.includes(BSB_ATUACAO_P), "Atuação: Brasília, Taguatinga, Águas Claras, Luziânia, Valparaíso de Goiás, Formosa");
  check(!bsbMainText.includes("Uberlândia") && !bsbMainText.includes("Goiânia"), "corpo sem Goiânia/Uberlândia (lista da home)");

  const footer = norm(await page.textContent("footer"));
  check(footer.includes(BSB_FOOTER), "rodapé com a linha de Brasília");
  check(!/sede/i.test(footer), "rodapé sem 'sede'");
  check(footer.includes("CRM/MG 109153"), "CRM/MG 109153 no rodapé");

  // ── 4) Conteúdo proibido ──────────────────────────────────────────────────
  console.log("\n[4] Conteúdo proibido");
  const rawHtml = await (await fetch(`${BASE}${ROTA}`)).text();
  for (const t of ["TRT-10", "TJDFT", "Rua Paim", "médico da equipe", "Quanto custa"]) check(!rawHtml.includes(t), `HTML sem "${t}"`);
  // link da home (e das portas SP/BR/Goiânia) proibido em QUALQUER ponto do HTML, inclusive no FAB inline
  check(!rawHtml.includes(TINTIM_HOME_TOKEN), "HTML sem o fluxo Tintim da home");
  check(!OUTROS_TOKENS.slice(1).some((t) => rawHtml.includes(t)), "HTML sem os fluxos Tintim da SP/BR/Goiânia");
  check(rawHtml.includes(TINTIM_BSB_TOKEN), "HTML com o fluxo Tintim de Brasília");
  check(!/sede em bras[ií]lia/i.test(rawHtml), 'HTML sem "sede em Brasília"');
  check(!rawHtml.includes("redirect-to-whatsapp"), 'HTML sem o link "redirect-to-whatsapp" (Meta Ads)');
  for (const t of SO_GOIANIA) check(!rawHtml.includes(t), `HTML sem texto só da Goiânia: "${t}"`);
  // bloco a bloco: o textContent do <body> inteiro cola blocos vizinhos sem separador e gera
  // falso positivo
  const blocos = await page.$$eval("#root p, #root h1, #root h2, #root h3, #root h4, #root li, #root a, #root button, #root summary",
    (els) => els.map((el) => el.textContent.replace(/\s+/g, " ").trim()));
  const sugereSede = blocos.filter((t) => /(sede|escrit[oó]rio|consult[oó]rio|endere[cç]o|\bsala\b)[^.·]{0,30}bras[ií]lia/i.test(t));
  check(sugereSede.length === 0, "nenhum texto sugere sede/escritório/consultório/sala/endereço em Brasília", sugereSede.join(" | ").slice(0, 160));
  check(!blocos.some((t) => /CRM\/DF/.test(t)), "nenhuma menção a CRM/DF");
  check(!blocos.some((t) => /Distrito Federal|\bDF\b/.test(t)), "nenhuma menção a 'Distrito Federal' ou 'DF' no corpo");
  // regra 3: os textos NOVOS da porta não dizem quem vai à perícia (a frase da home na Atuação,
  // "A Dra. Kelly acompanha a perícia presencialmente…", foi trocada pela da Goiânia). A copy
  // herdada da home ("A Dra. Kelly acompanha o exame…" em Para quem e Públicos) fica como está.
  const textosNovos = [BSB_FOOTER, ...COPY_BSB.map(([, bsb]) => bsb)];
  check(!textosNovos.some((t) => /Dra\. Kelly acompanha|m[ée]dico da equipe/i.test(t)), 'textos novos sem "a Dra. Kelly acompanha" nem "médico da equipe" (quem vai à perícia)');
  check(!bsbMainText.includes(HOME_ATUACAO_P.slice(0, 40)), 'Atuação sem a frase da home "A Dra. Kelly acompanha a perícia presencialmente…"');
  // regra 8: nada de preço/valor/proposta além do que a home já tem (microprova e FAQ 08)
  const precos = blocos.filter((t) => t !== HERO_MICROPROVA_ORCAMENTO && t !== FAQ_08_A && /pre[çc]o|or[çc]amento|mensalidade|\bvalor\b|proposta|\bcontrato\b/i.test(t));
  check(precos.length === 0, `nenhum texto sobre preço, valor ou proposta além da copy da home`, precos.join(" | ").slice(0, 160));
  const medicos = [...new Set(blocos.flatMap((t) => t.match(/\bDra?\.\s+[A-ZÀ-Ú][a-zà-ú]+/g) || []))];
  check(medicos.every((m) => m === "Dra. Kelly"), "nenhum nome de outro médico (só Dra. Kelly)", medicos.join(", "));
  for (const t of [title, desc, BSB_FOOTER, ...COPY_BSB.map(([, bsb]) => bsb)]) {
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
    check(dl.includes("utm_campaign=pesquisa-at-brasilia") && dl.includes("gclid=TESTGCLID_DF_123"), "page_view dl carrega UTMs+gclid");
    const gclidParam = new URL(pv).searchParams.get("gclid");
    check(gclidParam === "TESTGCLID_DF_123", "gclid como param do beacon (atribuição Ads)", gclidParam || "(ausente)");
  }

  // ── 6) Cliques em todos os botões de WhatsApp ─────────────────────────────
  // trava a navegação (preventDefault antes dos handlers de tracking) p/ clicar em série
  await page.evaluate(() => window.addEventListener("click", (e) => e.preventDefault(), true));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForSelector(".bfab-cta", { timeout: 5000 }).catch(() => {});

  console.log("\n[6] Cliques em todos os botões de WhatsApp da porta Brasília");
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
    const temUtm = b.href.includes("utm_campaign=pesquisa-at-brasilia") && b.href.includes("gclid=TESTGCLID_DF_123");
    check(temAw, `[${b.cta}] conversão AW (${AW_LABEL.split("/")[1]}, beacon)`);
    check(temGa4, `[${b.cta}] evento GA4 whatsapp_click_at`);
    check(temUtm, `[${b.cta}] UTMs+gclid propagados ao Tintim`, b.href.slice(0, 130));
    check(b.href.includes(`/${TINTIM_BSB_TOKEN}`), `[${b.cta}] deeplink Tintim do fluxo de Brasília`);
    check(!OUTROS_TOKENS.some((t) => b.href.includes(t)), `[${b.cta}] sem deeplink da home/SP/BR/Goiânia`);
  }
  // mesmo mecanismo da home em produção: whatsapp_click_at sai por beacon MANUAL /g/collect
  const wppBeacons = gaHits.filter((u) => u.includes("en=whatsapp_click_at")).length;
  check(wppBeacons >= botoes.length, "whatsapp_click_at por beacon manual /g/collect (1 por botão)", `${wppBeacons} beacon(s) p/ ${botoes.length} botões`);
  await ctx.close();

  // ── 3b) Desktop 1280 (largura do briefing) ────────────────────────────────
  console.log("\n[3b] Porta Brasília — hero (desktop 1280px)");
  const ctx1280 = await newContext(browser, { viewport: { width: 1280, height: 800 } });
  const p1280 = await ctx1280.newPage();
  await p1280.goto(`${BASE}${ROTA}?${UTMS}`, { waitUntil: "load" });
  await p1280.evaluate(() => document.fonts.ready);
  await checaHero(p1280, "desktop 1280");
  const linhasSelo1280 = await linhasDoSelo(p1280);
  check(linhasSelo1280 === 1, "selo em 1 linha (desktop 1280)", `${linhasSelo1280} linha(s)`);
  await ctx1280.close();

  // ── 7) Mobile (Pixel 7) ───────────────────────────────────────────────────
  console.log("\n[7] Porta Brasília — mobile (Pixel 7)");
  const ctxMob = await newContext(browser, { ...devices["Pixel 7"] });
  const mob = await ctxMob.newPage();
  await mob.goto(`${BASE}${ROTA}?${UTMS}`, { waitUntil: "load" });
  await mob.evaluate(() => document.fonts.ready);
  await checaHero(mob, "mobile");
  const linhasSelo = await linhasDoSelo(mob);
  check(linhasSelo >= 1 && linhasSelo <= 2, "selo cabe em até 2 linhas no Pixel 7", `${linhasSelo} linha(s)`);
  const h1Mob = (await mob.textContent("h1")).trim();
  check(h1Mob === H1_HOME, "H1 idêntico ao da home (mobile)");
  await ctxMob.close();

  // ── 8) Home "/" sem regressão + diff de copy ──────────────────────────────
  console.log("\n[8] Home / — sem regressão e diff de copy contra a porta Brasília");
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
  const homeMainText = norm(await home.textContent("main"));
  check(homeMainText.includes(HOME_ATUACAO_H2) && homeMainText.includes(HOME_ATUACAO_P), "Atuação da home intacta (Goiânia, Brasília, Uberlândia)");
  const bsbNaHome = COPY_BSB.filter(([, bsb]) => homeMainText.includes(bsb.trim())).map(([item]) => item);
  check(bsbNaHome.length === 0, "home sem nenhum texto da porta Brasília", bsbNaHome.join(", "));
  const faqHome = await faqVisivelDe(home);
  check(faqHome.length === 9 && JSON.stringify(faqHome) === JSON.stringify(faqVisivel), "FAQ da porta = FAQ da home (9 perguntas, mesma ordem)");

  // o <main> da porta tem que ser idêntico ao da home APÓS desfazer, item a item, as trocas
  let bsbNormalized = bsbMainText;
  for (const [item, bsb, homeTxt, n] of COPY_BSB) {
    const achou = bsbNormalized.split(bsb).length - 1;
    check(achou === n, `${item} aplicado na porta (${n}x)`, `achei ${achou}x: "${bsb.trim().slice(0, 60)}${bsb.length > 60 ? "…" : ""}"`);
    bsbNormalized = bsbNormalized.split(bsb).join(homeTxt);
  }
  bsbNormalized = norm(bsbNormalized);
  check(bsbNormalized === homeMainText, "copy do <main> idêntica à home (exceto selo, linha presencial e Atuação)");
  if (bsbNormalized !== homeMainText) {
    let i = 0;
    while (i < bsbNormalized.length && bsbNormalized[i] === homeMainText[i]) i++;
    console.log(`  1ª divergência em ${i}:\n    porta: …${bsbNormalized.slice(Math.max(0, i - 60), i + 80)}\n    home:  …${homeMainText.slice(Math.max(0, i - 60), i + 80)}`);
  }

  const tintimHome = await home.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
  check(tintimHome.length > 0 && tintimHome.every((h) => h.includes(TINTIM_HOME_TOKEN)), "botões da home seguem no fluxo Tintim original", `${tintimHome.length} botões`);
  await home.waitForTimeout(600);
  check(!!gaHome.find((u) => u.includes("en=page_view")), "beacon page_view da home segue disparando");
  await ctxHome.close();

  // ── 9) Portas /sp, /br e /goiania sem regressão ───────────────────────────
  console.log("\n[9] Portas /sp, /br e /goiania — sem regressão");
  const ctxPortas = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  for (const [rota, token, trecho, nFaq] of [
    ["/assistente-tecnico-medico/sp", TINTIM_SP_TOKEN, "Acompanhamento pericial em São Paulo e em todo o Brasil", 9],
    ["/assistente-tecnico-medico/br", TINTIM_BR_TOKEN, "Acompanhamento pericial em todo o Brasil", 9],
    [ROTA_GO, TINTIM_GO_TOKEN, "Acompanhamento presencial em Goiânia e em todo o Brasil", 7],
  ]) {
    const pg = await ctxPortas.newPage();
    await pg.goto(`${BASE}${rota}`, { waitUntil: "domcontentloaded" });
    const canon = await pg.getAttribute('link[rel="canonical"]', "href");
    check(canon === `https://www.drakellyneisse.com.br${rota}`, `${rota}: canonical intacto`, canon || "");
    const mainTxt = norm(await pg.textContent("main"));
    check(mainTxt.includes(trecho), `${rota}: Atuação intacta`);
    const bsb = COPY_BSB.filter(([, t]) => mainTxt.includes(t.trim())).map(([item]) => item);
    check(bsb.length === 0, `${rota}: sem nenhum texto da porta Brasília`, bsb.join(", "));
    const faq = await faqVisivelDe(pg);
    check(faq.length === nFaq, `${rota}: FAQ com ${nFaq} perguntas`, `${faq.length}`);
    const links = await pg.$$eval('a[href*="tintim.link"]', (as) => as.map((a) => a.href));
    check(links.length > 0 && links.every((h) => h.includes(token)), `${rota}: botões no fluxo Tintim próprio`, `${links.length} botões`);
    await pg.close();
  }
  await ctxPortas.close();

  // ── 10) Sitelinks (?sl=…) — mesmo comportamento da /goiania ───────────────
  // Não há código tratando `sl`: o script herdado da home só repassa a query inteira ao link do
  // Tintim no clique; o único que rola é o "Sobre", pela âncora #sobre do navegador.
  console.log("\n[10] Sitelinks ?sl= — a porta abre sem erro e se comporta como a /goiania");
  const ctxSl = await newContext(browser, { viewport: { width: 1366, height: 900 } });
  for (const sl of SITELINKS) {
    const [param, hash] = sl.split("#");
    const bsb = await abrirSitelink(ctxSl, ROTA, sl);
    const go = await abrirSitelink(ctxSl, ROTA_GO, sl);
    check(bsb.status === 200 && bsb.erros.length === 0 && bsb.h1.trim() === H1_HOME, `?sl=${sl}: porta abre com 200, sem erro de JS e com o H1`, bsb.erros.join(" | ").slice(0, 120));
    check(bsb.href.includes(`sl=${param}`) && bsb.href.includes(`/${TINTIM_BSB_TOKEN}`), `?sl=${sl}: sl repassado ao deeplink Tintim de Brasília`, bsb.href.slice(0, 120));
    check(go.href.includes(`sl=${param}`) === bsb.href.includes(`sl=${param}`), `?sl=${sl}: repasse do sl igual ao da /goiania`);
    if (hash) {
      // a rolagem é a âncora NATIVA do navegador (nenhum código das portas trata o hash): nas duas
      // portas a página pula para #sobre no load; a posição exata depois varia porque dobras abaixo
      // do hero ainda assentam o layout. O que se confere é o mesmo comportamento: alvo existe e a
      // página rolou. A medida sai no log como informação.
      check(bsb.alvoTopo !== null && bsb.scrollY > 0 && go.scrollY > 0, `?sl=${sl}: #${hash} existe e a página rola até ele no load, como na /goiania`, `scrollY ${bsb.scrollY} (Goiânia ${go.scrollY})`);
      console.log(`  INFO  ?sl=${sl}: topo de #${hash} após o load em ${bsb.alvoTopo}px (Goiânia: ${go.alvoTopo}px)`);
    } else {
      check(bsb.scrollY === go.scrollY, `?sl=${sl}: mesma posição de rolagem da /goiania (só registra o parâmetro)`, `${bsb.scrollY} vs ${go.scrollY}`);
    }
  }
  await ctxSl.close();

  await browser.close();
  srv.close();

  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
