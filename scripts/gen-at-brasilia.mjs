// Gera assistente-tecnico-medico-brasilia.html a partir do index.html (porta geo Brasília da home,
// campanha Google Ads [DF] Brasília 80 km; clone técnico da porta Goiânia).
//
// POR QUE GERADO (e não copiado na mão): mesmo motivo das portas SP e Goiânia (ver
// scripts/gen-at-sp.mjs) — o index.html carrega ~300 linhas de tracking inline (gtag AW+GA4,
// beacons __tvrs, handler de WhatsApp, reescrita do link Tintim, FAB) que são o coração da
// conversão do Ads. Aqui os <script> são herdados BYTE A BYTE do index.html em toda geração; só
// mudam <title>/metas/canonical/robots, o entry (main-at.tsx -> main-at-brasilia.tsx) e o deeplink
// Tintim do FAB. Diferente da Goiânia, a FAQ desta porta é a da home (9 perguntas), então o JSON-LD
// FAQPage NÃO é tocado (o gerador confere que ele continua idêntico ao da home).
// Um gate no final aborta se qualquer outro <script> divergir, se algum primitivo de tracking
// sumir ou se o fluxo Tintim da home (ou da SP/BR/Goiânia) aparecer em qualquer ponto do HTML.
//
// Roda sozinho (`node scripts/gen-at-brasilia.mjs`) ou importado pelo build (scripts/build.mjs) e
// pelo dev server (vite.config.ts). O arquivo gerado fica no .gitignore — nunca é editado à mão.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const AT_BRASILIA_HTML = path.join(ROOT, "assistente-tecnico-medico-brasilia.html");
export const AT_BRASILIA_PATHNAME = "/assistente-tecnico-medico/brasilia";

const CANONICAL_BRASILIA = "https://www.drakellyneisse.com.br/assistente-tecnico-medico/brasilia";

// título e descrição da home — texto EXATO (aparece no <title>/og/twitter); o gerador aborta
// se a home mudar esses textos, forçando a decisão consciente de como fica a variante Brasília.
const TITLE_HOME = "Assistente Técnico Médico em Perícia Judicial | Dra. Kelly Neisse";
const TITLE_BRASILIA = "Assistente Técnico Médico em Perícia Judicial em Brasília | Dra. Kelly Neisse";

// mesma frase da home, só com "em Brasília" depois de "trabalhista" (briefing 15/11)
const DESC_HOME =
  "Tem uma perícia médica no seu processo cível ou trabalhista? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";
const DESC_BRASILIA =
  "Tem uma perícia médica no seu processo cível ou trabalhista em Brasília? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";

const ENTRY_HOME = '<script type="module" src="/src/main-at.tsx"></script>';
const ENTRY_BRASILIA = '<script type="module" src="/src/main-at-brasilia.tsx"></script>';

// Deeplinks Tintim: a porta Brasília tem fluxo DEDICADO (mesma conta, token próprio — separa o
// rastreio no Tintim por porta). O FAB tem o link cravado no script inline, então ele é a
// SEGUNDA exceção permitida no gate byte a byte (além do entry). DEVE casar com
// AT_BRASILIA_WHATSAPP_URL em src/components/at/geo-brasilia.ts (conferido abaixo).
const TINTIM_HOME =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/b40002a5-951b-4014-a30a-17af3f592141";
// fluxo dedicado [DF], criado pelo Ivan em 14/11/2026 (mensagem: "Olá, Dra. Kelly! Tenho um
// processo em Brasília e gostaria de enviar os documentos para análise."; número (34) 99687-8758).
// Não usar o link "redirect-to-whatsapp" (é a versão para Meta Ads).
const TINTIM_BRASILIA =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/8d7669f3-ce94-42c3-bb70-ae9d6578c692";
// tokens da home e das outras portas — NUNCA podem aparecer nesta (nem como URL, nem soltos)
const TINTIM_HOME_TOKEN = "b40002a5-951b-4014-a30a-17af3f592141";
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";
const TINTIM_BR_TOKEN = "59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";
const TINTIM_GOIANIA_TOKEN = "1fdae0e4-bc5c-4ca6-b902-637cee0d58f0";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const extractFaqPage = (html, onde) => {
  const blocos = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)]
    .map((m) => JSON.parse(m[1]))
    .filter((o) => o["@type"] === "FAQPage");
  if (blocos.length !== 1) throw new Error(`[gen-at-brasilia] esperado 1 JSON-LD FAQPage no ${onde}, achei ${blocos.length}`);
  return blocos[0].mainEntity || [];
};

// primitivos que TÊM que sobreviver na porta Brasília (mesmo funil AT da home — mesma conversão Ads)
const TRACKING_PRIMITIVES_BRASILIA = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click_at",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
  "AW-16690821688/zjEbCOiG7MAcELj05pY-",
  TINTIM_BRASILIA,
];

const extractScripts = (s) => s.match(/<script[\s\S]*?<\/script>/gi) || [];

// replace com contagem obrigatória: se o index.html mudar e o padrão sumir, o build ABORTA
// (nunca gera a porta Brasília silenciosamente desatualizada).
function replaceCounted(html, from, to, expected, label) {
  const count = html.split(from).length - 1;
  if (count !== expected) {
    throw new Error(`[gen-at-brasilia] padrão "${label}" esperado ${expected}x no index.html, achei ${count}x — atualize scripts/gen-at-brasilia.mjs`);
  }
  return html.split(from).join(to);
}

export async function generateAtBrasiliaHtml() {
  // o deeplink do FAB (aqui) e o dos botões React (geo-brasilia.ts) têm que ser o MESMO fluxo
  const geoSrc = await readFile(path.join(ROOT, "src", "components", "at", "geo-brasilia.ts"), "utf8");
  if (!geoSrc.includes(`"${TINTIM_BRASILIA}"`)) {
    throw new Error("[gen-at-brasilia] TINTIM_BRASILIA não casa com AT_BRASILIA_WHATSAPP_URL de src/components/at/geo-brasilia.ts");
  }
  // token do fluxo [DF]: tem que ser um UUID real e diferente dos fluxos das outras portas
  const tokenBrasilia = TINTIM_BRASILIA.split("/").pop();
  if (!UUID_RE.test(tokenBrasilia)) {
    throw new Error(`[gen-at-brasilia] token do fluxo Tintim de Brasília inválido ("${tokenBrasilia}") — sem token real não há deploy`);
  }
  if ([TINTIM_HOME_TOKEN, TINTIM_SP_TOKEN, TINTIM_BR_TOKEN, TINTIM_GOIANIA_TOKEN].includes(tokenBrasilia)) {
    throw new Error("[gen-at-brasilia] o token de Brasília é o de outra porta (home/SP/BR/Goiânia) — cada campanha tem fluxo Tintim próprio");
  }

  const src = await readFile(path.join(ROOT, "index.html"), "utf8");
  let out = src;

  // FAQPage da home: 9 perguntas. A porta usa a MESMA FAQ (visível e schema) — nada a tirar.
  const faqHome = extractFaqPage(src, "index.html");
  if (faqHome.length !== 9) {
    throw new Error(`[gen-at-brasilia] FAQPage do index.html mudou (${faqHome.length} perguntas) — atualize scripts/gen-at-brasilia.mjs`);
  }

  // 1) title (aparece em <title>, og:title e twitter:title)
  out = replaceCounted(out, TITLE_HOME, TITLE_BRASILIA, 3, "title/og:title/twitter:title");
  // 2) description (meta description, og:description, twitter:description)
  out = replaceCounted(out, DESC_HOME, DESC_BRASILIA, 3, "description");
  // 3) noindex — rota exclusiva de tráfego pago (decisão reversível; a home segue index,follow)
  out = replaceCounted(
    out,
    '<meta name="robots" content="index, follow" />',
    '<meta name="robots" content="noindex, follow" />',
    1,
    "robots"
  );
  // 4) canonical próprio da rota
  out = replaceCounted(
    out,
    '<link rel="canonical" href="https://www.drakellyneisse.com.br/" />',
    `<link rel="canonical" href="${CANONICAL_BRASILIA}" />`,
    1,
    "canonical"
  );
  // 5) og:url próprio da rota
  out = replaceCounted(
    out,
    '<meta property="og:url" content="https://www.drakellyneisse.com.br/">',
    `<meta property="og:url" content="${CANONICAL_BRASILIA}">`,
    1,
    "og:url"
  );
  // 6) entry da porta Brasília (renderiza <AtIndex geo="brasilia" />)
  out = replaceCounted(out, ENTRY_HOME, ENTRY_BRASILIA, 1, "entry main-at.tsx");
  // 7) FAB: troca o deeplink Tintim cravado no script inline pelo fluxo dedicado de Brasília
  out = replaceCounted(out, TINTIM_HOME, TINTIM_BRASILIA, 1, "deeplink Tintim do FAB");

  // JSON-LD FAQPage da porta = o da home, intacto (9 perguntas, mesma ordem, mesmos textos)
  const faqPorta = extractFaqPage(out, "HTML da porta");
  if (JSON.stringify(faqPorta) !== JSON.stringify(faqHome)) {
    throw new Error("[gen-at-brasilia] JSON-LD FAQPage da porta divergiu do da home");
  }

  // GATE: todo <script> byte-idêntico ao index.html, exceto as trocas permitidas — o entry
  // (main-at -> main-at-brasilia) e o deeplink Tintim do FAB (home -> Brasília).
  const allowed = (s) => s.split(ENTRY_HOME).join(ENTRY_BRASILIA).split(TINTIM_HOME).join(TINTIM_BRASILIA);
  const before = extractScripts(src);
  const after = extractScripts(out);
  if (before.length !== after.length) {
    throw new Error(`[gen-at-brasilia] contagem de <script> divergiu (${before.length} -> ${after.length})`);
  }
  for (let i = 0; i < before.length; i++) {
    if (before[i] === after[i]) continue;
    if (allowed(before[i]) === after[i]) continue;
    throw new Error(`[gen-at-brasilia] <script> #${i} divergiu do index.html além das trocas permitidas — abortando`);
  }
  for (const sig of TRACKING_PRIMITIVES_BRASILIA) {
    if (!out.includes(sig)) throw new Error(`[gen-at-brasilia] primitivo de tracking ausente: ${sig}`);
  }
  if (out.includes(TINTIM_HOME) || out.includes(TINTIM_HOME_TOKEN)) {
    throw new Error("[gen-at-brasilia] deeplink Tintim da HOME sobrou no HTML da porta Brasília");
  }
  if (out.includes(TINTIM_SP_TOKEN) || out.includes(TINTIM_BR_TOKEN) || out.includes(TINTIM_GOIANIA_TOKEN)) {
    throw new Error("[gen-at-brasilia] deeplink Tintim da porta SP, BR ou Goiânia vazou para a porta Brasília");
  }
  if (!out.includes("noindex")) throw new Error("[gen-at-brasilia] noindex não aplicado");
  // regra 2 do briefing: nenhum tribunal do DF no <head> herdado (o corpo é conferido no validador)
  for (const t of ["TRT-10", "TJDFT"]) {
    if (out.includes(t)) throw new Error(`[gen-at-brasilia] "${t}" não pode aparecer na porta Brasília`);
  }

  await writeFile(AT_BRASILIA_HTML, out, "utf8");
  console.log(`[gen-at-brasilia] OK — ${path.basename(AT_BRASILIA_HTML)} gerado (${after.length} <script> herdados; entry brasilia)`);
  return AT_BRASILIA_HTML;
}

// execução direta: node scripts/gen-at-brasilia.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateAtBrasiliaHtml().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
