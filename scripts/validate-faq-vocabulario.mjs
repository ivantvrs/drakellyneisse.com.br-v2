// Validação E2E do vocabulário de busca nas 4 páginas AT (roda sobre dist/, pós-build).
//
//   node scripts/validate-faq-vocabulario.mjs
//
// Tarefa de 06/11/2026 (aprovada pelo Ivan): FAQ nova, parágrafo do "O que é", selo do hero da
// mãe e 1ª microprova do hero. Para "/", /sp, /br e /goiania confere:
//   1. JSON-LD FAQPage idêntico à FAQ visível e ao texto aprovado, palavra por palavra e na mesma
//      ordem (9 na home, /sp e /br; 7 em Goiânia, sem a 08 e a 09), com as respostas no HTML do
//      SSG mesmo com o item fechado
//   2. "assistente técnico judicial" e "assistente técnico pericial" no texto da página
//   3. HTML sem "Quanto custa"
//   4. textos novos sem travessão (— ou –) e sem cidade/estado (regra anti-geo da home)
//   5. selo do hero da home, /sp e /br: no máximo 2 linhas no Pixel 7 e 1 no desktop (1024, 1366
//      e 1920 px); Goiânia segue com o selo próprio
//   6. hero com "Orçamento em até 2h úteis" no celular e no desktop (1 linha) e sem "Resposta
//      rápida" como microprova isolada; a linha do CTA final "Resposta rápida · Cível e
//      trabalhista · CRM/MG 109.153" continua na home, /sp e /br (Goiânia já tem a dela)
//   7. "O que é" com o parágrafo novo; "24h / Análise inicial" do advogado intacto
//   8. hidratação 1:1: texto do hero, do "O que é" e do FAQ igual no SSG (sem JS) e no client
// Os HITS de medição (GA4/Ads/Meta) são interceptados e respondidos localmente.
// Exit 1 em qualquer falha (serve de gate).

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, devices } from "@playwright/test";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4196;
const BASE = `http://127.0.0.1:${PORT}`;

// textos aprovados — conferidos LITERALMENTE (não importados do código, de propósito)
const SELO_MAE = "Assistente técnico pericial · Perícia judicial";
const SELO_GO = "Assistente técnico · Goiânia e região";
const MICROPROVA = "Orçamento em até 2h úteis";
const MICROPROVA_ANTIGA = "Resposta rápida";
const CTA_FINAL_LINHA = "Resposta rápida · Cível e trabalhista · CRM/MG 109.153";
const OQUEE_P =
  "É o seu médico de confiança dentro da perícia. No processo, também aparece como assistente técnico judicial ou assistente técnico pericial. O que ele faz:";
const TERMOS = ["assistente técnico judicial", "assistente técnico pericial"];
const FAQ = [
  ["Eu preciso mesmo de um assistente técnico?", "Não é obrigatório, mas é um direito seu. Sem ele, o laudo do perito entra no processo sem nenhum contraponto médico, e é nesse laudo que o juiz se baseia. E depois do exame só dá para questionar o que foi perguntado e registrado."],
  ["Assistente técnico judicial, pericial ou médico: qual é a diferença?", "Nenhuma, é o mesmo papel com nomes diferentes. A lei chama de assistente técnico (CPC, art. 465), e no dia a dia se fala em assistente técnico judicial ou assistente técnico pericial. Quando a perícia é médica, quem cumpre esse papel é um médico: o assistente técnico médico, indicado por uma das partes para acompanhar a perícia judicial."],
  ["Procurei um médico perito particular. É isso?", "O perito é nomeado pelo juiz e não pode ser contratado por nenhum dos lados. O que você contrata é o médico assistente técnico, que acompanha a perícia do seu lado, formula os quesitos e analisa o laudo."],
  ["Serve para o meu lado do processo?", "Sim. O assistente técnico pode ser indicado por qualquer das partes. A Dra. Kelly atua de forma técnica, ao lado de quem a contrata."],
  ["Meu advogado precisa autorizar?", "A contratação é da parte. A Dra. Kelly trabalha em conjunto com o seu advogado, cuidando exclusivamente da parte médica, não no lugar dele."],
  ["Quando devo procurar?", "Assim que souber da perícia ou da nomeação do perito. A indicação do assistente técnico e a apresentação dos quesitos têm prazo curto, contado da intimação do despacho que nomeia o perito: no CPC, são 15 dias (art. 465, § 1º)."],
  ["Já recebi o laudo. Ainda dá tempo?", "Em muitos casos, sim. Depois que o laudo é juntado, as partes podem se manifestar e o assistente técnico pode apresentar parecer: no CPC, o prazo é de 15 dias (art. 477, § 1º). Quanto antes o laudo for analisado, mais completa fica a impugnação."],
  ["Quem paga os honorários do assistente técnico?", "A parte que o indica adianta os honorários do assistente técnico, que são separados dos honorários do perito do juízo (CPC, art. 95). O orçamento é feito por caso, sem mensalidade, e você sabe o valor antes de decidir."],
  ["A Dra. Kelly atende no meu estado?", "Sim. A análise do laudo, os quesitos e o parecer técnico são feitos para processos de todo o Brasil, e o acompanhamento presencial da perícia acontece onde ela for marcada."],
];
const TEXTOS_NOVOS = [SELO_MAE, MICROPROVA, OQUEE_P, ...FAQ.flat()];
// anti-geo: nenhum texto novo cita cidade ou estado ("todo o Brasil" é o país, não uma praça)
const GEO_RE = /São Paulo|Minas|Goiás|Goiânia|Brasília|Uberlândia|Campinas|Distrito Federal|\b(SP|MG|GO|DF|RJ|MT)\b/;

const PAGINAS = [
  { nome: "home", rota: "/", arquivo: "index.html", nFaq: 9, selo: SELO_MAE, ctaFinal: true },
  { nome: "sp", rota: "/assistente-tecnico-medico/sp", arquivo: "assistente-tecnico-medico-sp.html", nFaq: 9, selo: SELO_MAE, ctaFinal: true },
  { nome: "br", rota: "/assistente-tecnico-medico/br", arquivo: "assistente-tecnico-medico-br.html", nFaq: 9, selo: SELO_MAE, ctaFinal: true },
  { nome: "goiania", rota: "/assistente-tecnico-medico/goiania", arquivo: "assistente-tecnico-medico-goiania.html", nFaq: 7, selo: SELO_GO, ctaFinal: false },
];
// desktop: o selo tem que caber em 1 linha nestas larguras (em 768 px, borda do breakpoint md, o
// selo antigo e o de Goiânia já quebravam em 2; a medida sai no log só como informação)
const DESKTOPS_GATE = [1024, 1366, 1920];
const DESKTOP_INFO = 768;

const HIT_RE = /google-analytics\.com\/g\/collect|analytics\.google\.com\/g\/collect|googleadservices\.com\/pagead|doubleclick\.net\/|google\.com\/(pagead|ccm)\/|facebook\.com\/tr/;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2" };

function startServer() {
  const porRota = Object.fromEntries(PAGINAS.flatMap((p) => [[p.rota, p.arquivo], [p.rota + "/", p.arquivo]]));
  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const p = req.url.split("?")[0];
      const file = path.join(DIST, porRota[p] || decodeURIComponent(p).replace(/^\/+/, ""));
      try {
        const data = await readFile(file);
        res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end();
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

async function newContext(browser, opts) {
  const ctx = await browser.newContext(opts);
  await ctx.route(HIT_RE, (route) => route.fulfill({ status: 204, body: "" }));
  return ctx;
}

async function abrir(ctx, rota) {
  const page = await ctx.newPage();
  await page.goto(`${BASE}${rota}`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}

// hero VISÍVEL no viewport atual: texto e nº de linhas do selo e da 1ª microprova (linhas = tops
// distintos dos nós de TEXTO; o ícone svg ficaria em outro top e contaria como linha a mais)
const medirHero = (page, selo, micro) =>
  page.evaluate(([seloTxt, microTxt]) => {
    const linhas = (el) => {
      const tops = new Set();
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        if (!n.textContent.trim()) continue;
        const r = document.createRange();
        r.selectNodeContents(n);
        for (const x of r.getClientRects()) tops.add(Math.round(x.top));
      }
      return tops.size;
    };
    const vis = (sel, t) => Array.from(document.querySelectorAll(sel)).filter((el) => el.textContent.trim() === t && el.checkVisibility());
    const selos = vis("#inicio p > span", seloTxt);
    const micros = vis("#inicio p", microTxt);
    return {
      selos: selos.length,
      seloLinhas: selos[0] ? linhas(selos[0]) : 0,
      micros: micros.length,
      microLinhas: micros[0] ? linhas(micros[0]) : 0,
    };
  }, [selo, micro]);

// texto das seções tocadas por esta tarefa (hero, "O que é", FAQ), p/ comparar SSG x client.
// Ignora o conteúdo de <style>/<script>: o <style> inline do AtOQueE sai do SSG com as aspas
// escapadas (`content: &quot;&quot;`) e o client o reescreve; isso é anterior a esta tarefa e não
// é texto da página.
const textoSecoes = (page) =>
  page.evaluate(() => ["#inicio", "#o-que-e", "#faq"].map((s) => {
    const el = document.querySelector(s);
    if (!el) return "";
    const partes = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.parentElement.closest("style, script")) partes.push(n.textContent);
    }
    return partes.join("").replace(/\s+/g, " ").trim();
  }));

async function main() {
  console.log("\n[0] Textos novos (fonte: briefing de 06/11/2026)");
  for (const t of TEXTOS_NOVOS) {
    check(!/[—–]/.test(t), `sem travessão: "${t.slice(0, 50)}${t.length > 50 ? "…" : ""}"`);
  }
  const comGeo = TEXTOS_NOVOS.filter((t) => GEO_RE.test(t));
  check(comGeo.length === 0, "nenhum texto novo cita cidade ou estado (anti-geo)", comGeo.join(" | ").slice(0, 160));

  const srv = await startServer();
  const browser = await chromium.launch();

  for (const pg of PAGINAS) {
    const esperado = FAQ.slice(0, pg.nFaq);
    console.log(`\n[${pg.nome}] ${pg.rota}`);

    // ── HTML servido (SSG, antes de qualquer JS) ──
    const raw = await (await fetch(`${BASE}${pg.rota}`)).text();
    const rootHtml = raw.slice(raw.indexOf('<div id="root">'));
    check(raw.length > 0 && rootHtml.length > 1000, "HTML com o conteúdo do SSG no #root", `${rootHtml.length} chars`);
    check(!raw.includes("Quanto custa"), 'HTML sem "Quanto custa"');
    for (const t of TERMOS) check(rootHtml.includes(t), `SSG contém "${t}"`);
    const faltandoNoSsg = esperado.filter(([q, a]) => !rootHtml.includes(q) || !rootHtml.includes(a)).map(([q]) => q);
    check(faltandoNoSsg.length === 0, `as ${pg.nFaq} perguntas e respostas no HTML do SSG (itens fechados)`, faltandoNoSsg.join(" | "));
    if (pg.nFaq < FAQ.length) {
      const sobrou = FAQ.slice(pg.nFaq).filter(([q]) => raw.includes(q)).map(([q]) => q);
      check(sobrou.length === 0, "HTML sem a 08 e a 09 (nem visível nem no JSON-LD)", sobrou.join(" | "));
    }

    // ── sem JS: texto das seções tocadas como sai do SSG ──
    const ctxSemJs = await newContext(browser, { viewport: { width: 1366, height: 900 }, javaScriptEnabled: false });
    const semJs = await abrir(ctxSemJs, pg.rota);
    const secoesSsg = await textoSecoes(semJs);
    await ctxSemJs.close();

    // ── desktop 1366 (com JS, hidratado) ──
    const ctx = await newContext(browser, { viewport: { width: 1366, height: 900 } });
    const page = await abrir(ctx, pg.rota);
    await page.waitForTimeout(400);

    const ld = await page.$$eval('script[type="application/ld+json"]', (ss) => ss.map((s) => JSON.parse(s.textContent)));
    const faqLd = ld.filter((o) => o["@type"] === "FAQPage");
    const schema = (faqLd[0]?.mainEntity || []).map((q) => [q.name, q.acceptedAnswer?.text]);
    const visivel = await page.$$eval('#faq [id^="at-faq-btn-"]', (bs) =>
      bs.map((b) => [b.querySelector("span.flex-1").textContent.trim(), document.getElementById(b.getAttribute("aria-controls")).textContent.trim()]));
    check(faqLd.length === 1, "1 JSON-LD FAQPage no <head>", `${faqLd.length}`);
    check(JSON.stringify(schema) === JSON.stringify(visivel), `JSON-LD FAQPage idêntico à FAQ visível (${pg.nFaq})`, `${schema.length} no schema, ${visivel.length} visíveis`);
    check(JSON.stringify(visivel) === JSON.stringify(esperado), "FAQ visível = texto aprovado, palavra por palavra e na mesma ordem");
    if (JSON.stringify(visivel) !== JSON.stringify(esperado)) {
      visivel.forEach(([q, a], i) => {
        if (!esperado[i] || q !== esperado[i][0] || a !== esperado[i][1]) console.log(`    item ${i + 1} difere: "${q}"`);
      });
    }
    const fechados = await page.$$eval('#faq [id^="at-faq-btn-"]', (bs) => bs.every((b) => b.getAttribute("aria-expanded") === "false"));
    check(fechados, "itens do FAQ fechados ao carregar (respostas no DOM mesmo assim)");

    const mainTxt = norm(await page.textContent("main"));
    for (const t of TERMOS) check(mainTxt.includes(t), `texto da página contém "${t}"`);
    check(!mainTxt.includes("Quanto custa"), 'texto da página sem "Quanto custa"');

    const oqueE = norm(await page.textContent("#o-que-e"));
    check(oqueE.includes(OQUEE_P), '"O que é": parágrafo novo');
    check(!oqueE.includes("dentro da perícia. Ele:"), '"O que é": texto antigo ("Ele:") saiu');
    check(mainTxt.includes("24hAnálise inicial"), '"24h / Análise inicial" do advogado intacto');

    // hero desktop: selo, microprova nova e nada de "Resposta rápida" no hero
    const heroD = await medirHero(page, pg.selo, MICROPROVA);
    check(heroD.selos === 1, `selo "${pg.selo}" visível (desktop 1366)`);
    check(heroD.seloLinhas === 1, "selo em 1 linha (desktop 1366)", `${heroD.seloLinhas} linha(s)`);
    check(heroD.micros === 1, `microprova "${MICROPROVA}" visível (desktop 1366)`);
    check(heroD.microLinhas === 1, "microprova em 1 linha (desktop 1366)", `${heroD.microLinhas} linha(s)`);
    const heroTxt = norm(await page.textContent("#inicio"));
    check(!heroTxt.includes(MICROPROVA_ANTIGA), `hero sem "${MICROPROVA_ANTIGA}" (celular e desktop, no DOM)`);
    const isoladas = await page.$$eval("#root *", (els, t) => els.filter((el) => el.textContent.trim() === t).length, MICROPROVA_ANTIGA);
    check(isoladas === 0, `nenhum elemento com "${MICROPROVA_ANTIGA}" isolado na página`, `${isoladas}`);
    const nRapida = mainTxt.split(MICROPROVA_ANTIGA).length - 1;
    if (pg.ctaFinal) {
      check(nRapida === 1 && mainTxt.includes(CTA_FINAL_LINHA), `CTA final mantém "${CTA_FINAL_LINHA}" (única ocorrência de "${MICROPROVA_ANTIGA}")`, `${nRapida}x`);
    } else {
      check(nRapida === 0, `porta sem "${MICROPROVA_ANTIGA}" (CTA final tem a linha própria)`, `${nRapida}x`);
    }

    // hidratação 1:1 nas seções tocadas
    const secoesClient = await textoSecoes(page);
    ["hero", "O que é", "FAQ"].forEach((nome, i) => {
      check(secoesSsg[i].length > 0 && secoesSsg[i] === secoesClient[i], `hidratação 1:1: texto do ${nome} igual no SSG e no client`);
    });
    await ctx.close();

    // ── outras larguras de desktop ──
    for (const w of [...DESKTOPS_GATE.filter((x) => x !== 1366), DESKTOP_INFO]) {
      const c = await newContext(browser, { viewport: { width: w, height: 900 } });
      const p = await abrir(c, pg.rota);
      const h = await medirHero(p, pg.selo, MICROPROVA);
      if (w === DESKTOP_INFO) {
        console.log(`  INFO  ${w}px (borda do breakpoint md): selo em ${h.seloLinhas} linha(s), microprova em ${h.microLinhas}`);
      } else {
        check(h.selos === 1 && h.seloLinhas === 1, `selo em 1 linha (desktop ${w})`, `${h.seloLinhas} linha(s)`);
        check(h.micros === 1 && h.microLinhas === 1, `microprova em 1 linha (desktop ${w})`, `${h.microLinhas} linha(s)`);
      }
      await c.close();
    }

    // ── Pixel 7 ──
    const ctxMob = await newContext(browser, { ...devices["Pixel 7"] });
    const mob = await abrir(ctxMob, pg.rota);
    const heroM = await medirHero(mob, pg.selo, MICROPROVA);
    const maxSelo = pg.selo === SELO_MAE ? 2 : 1;
    check(heroM.selos === 1, `selo "${pg.selo}" visível (Pixel 7)`);
    check(heroM.seloLinhas >= 1 && heroM.seloLinhas <= maxSelo, `selo em no máximo ${maxSelo} linha(s) (Pixel 7)`, `${heroM.seloLinhas} linha(s)`);
    check(heroM.micros === 1, `microprova "${MICROPROVA}" visível (Pixel 7)`);
    check(heroM.microLinhas === 1, "microprova em 1 linha (Pixel 7)", `${heroM.microLinhas} linha(s)`);
    await ctxMob.close();
  }

  await browser.close();
  srv.close();
  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
