// Gera assistente-tecnico-medico-goiania.html a partir do index.html (porta geo Goiânia da home,
// campanha Google Ads [GO] Goiânia 60 km).
//
// POR QUE GERADO (e não copiado na mão): mesmo motivo da porta SP (ver scripts/gen-at-sp.mjs) —
// o index.html carrega ~300 linhas de tracking inline (gtag AW+GA4, beacons __tvrs, handler de
// WhatsApp, reescrita do link Tintim, FAB) que são o coração da conversão do Ads. Aqui os
// <script> são herdados BYTE A BYTE do index.html em toda geração; só mudam <title>/metas/
// canonical/robots, o entry (main-at.tsx -> main-at-goiania.tsx) e o deeplink Tintim do FAB.
// Um gate no final aborta se qualquer outro <script> divergir, se algum primitivo de tracking
// sumir ou se o fluxo Tintim da home (ou da SP/BR) aparecer em qualquer ponto do HTML.
//
// Roda sozinho (`node scripts/gen-at-goiania.mjs`) ou importado pelo build (scripts/build.mjs) e
// pelo dev server (vite.config.ts). O arquivo gerado fica no .gitignore — nunca é editado à mão.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const AT_GOIANIA_HTML = path.join(ROOT, "assistente-tecnico-medico-goiania.html");
export const AT_GOIANIA_PATHNAME = "/assistente-tecnico-medico/goiania";

const CANONICAL_GOIANIA = "https://www.drakellyneisse.com.br/assistente-tecnico-medico/goiania";

// título e descrição da home — texto EXATO (aparece no <title>/og/twitter); o gerador aborta
// se a home mudar esses textos, forçando a decisão consciente de como fica a variante Goiânia.
const TITLE_HOME = "Assistente Técnico Médico em Perícia Judicial | Dra. Kelly Neisse";
const TITLE_GOIANIA = "Assistente Técnico Médico em Perícia Judicial em Goiânia | Dra. Kelly Neisse";

// mesma frase da home, só com "em Goiânia" depois de "trabalhista" (briefing 22/10)
const DESC_HOME =
  "Tem uma perícia médica no seu processo cível ou trabalhista? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";
const DESC_GOIANIA =
  "Tem uma perícia médica no seu processo cível ou trabalhista em Goiânia? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";

const ENTRY_HOME = '<script type="module" src="/src/main-at.tsx"></script>';
const ENTRY_GOIANIA = '<script type="module" src="/src/main-at-goiania.tsx"></script>';

// Deeplinks Tintim: a porta Goiânia tem fluxo DEDICADO (mesma conta, token próprio — separa o
// rastreio no Tintim por porta). O FAB tem o link cravado no script inline, então ele é a
// SEGUNDA exceção permitida no gate byte a byte (além do entry). DEVE casar com
// AT_GOIANIA_WHATSAPP_URL em src/components/at/geo-goiania.ts (conferido abaixo).
const TINTIM_HOME =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/b40002a5-951b-4014-a30a-17af3f592141";
// fluxo dedicado [GO], criado pelo Ivan em 22/10/2026
const TINTIM_GOIANIA =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/1fdae0e4-bc5c-4ca6-b902-637cee0d58f0";
// tokens da home e das outras portas — NUNCA podem aparecer nesta (nem como URL, nem soltos)
const TINTIM_HOME_TOKEN = "b40002a5-951b-4014-a30a-17af3f592141";
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";
const TINTIM_BR_TOKEN = "59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";

// primitivos que TÊM que sobreviver na porta Goiânia (mesmo funil AT da home — mesma conversão Ads)
const TRACKING_PRIMITIVES_GOIANIA = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click_at",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
  "AW-16690821688/zjEbCOiG7MAcELj05pY-",
  TINTIM_GOIANIA,
];

const extractScripts = (s) => s.match(/<script[\s\S]*?<\/script>/gi) || [];

// replace com contagem obrigatória: se o index.html mudar e o padrão sumir, o build ABORTA
// (nunca gera a porta Goiânia silenciosamente desatualizada).
function replaceCounted(html, from, to, expected, label) {
  const count = html.split(from).length - 1;
  if (count !== expected) {
    throw new Error(`[gen-at-goiania] padrão "${label}" esperado ${expected}x no index.html, achei ${count}x — atualize scripts/gen-at-goiania.mjs`);
  }
  return html.split(from).join(to);
}

export async function generateAtGoianiaHtml() {
  // o deeplink do FAB (aqui) e o dos botões React (geo-goiania.ts) têm que ser o MESMO fluxo
  const geoSrc = await readFile(path.join(ROOT, "src", "components", "at", "geo-goiania.ts"), "utf8");
  if (!geoSrc.includes(`"${TINTIM_GOIANIA}"`)) {
    throw new Error("[gen-at-goiania] TINTIM_GOIANIA não casa com AT_GOIANIA_WHATSAPP_URL de src/components/at/geo-goiania.ts");
  }

  const src = await readFile(path.join(ROOT, "index.html"), "utf8");
  let out = src;

  // 1) title (aparece em <title>, og:title e twitter:title)
  out = replaceCounted(out, TITLE_HOME, TITLE_GOIANIA, 3, "title/og:title/twitter:title");
  // 2) description (meta description, og:description, twitter:description)
  out = replaceCounted(out, DESC_HOME, DESC_GOIANIA, 3, "description");
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
    `<link rel="canonical" href="${CANONICAL_GOIANIA}" />`,
    1,
    "canonical"
  );
  // 5) og:url próprio da rota
  out = replaceCounted(
    out,
    '<meta property="og:url" content="https://www.drakellyneisse.com.br/">',
    `<meta property="og:url" content="${CANONICAL_GOIANIA}">`,
    1,
    "og:url"
  );
  // 6) entry da porta Goiânia (renderiza <AtIndex geo="goiania" />)
  out = replaceCounted(out, ENTRY_HOME, ENTRY_GOIANIA, 1, "entry main-at.tsx");
  // 7) FAB: troca o deeplink Tintim cravado no script inline pelo fluxo dedicado de Goiânia
  out = replaceCounted(out, TINTIM_HOME, TINTIM_GOIANIA, 1, "deeplink Tintim do FAB");

  // GATE: todo <script> byte-idêntico ao index.html, exceto DUAS trocas permitidas:
  // o entry (main-at -> main-at-goiania) e o deeplink Tintim do FAB (home -> Goiânia).
  const before = extractScripts(src);
  const after = extractScripts(out);
  if (before.length !== after.length) {
    throw new Error(`[gen-at-goiania] contagem de <script> divergiu (${before.length} -> ${after.length})`);
  }
  for (let i = 0; i < before.length; i++) {
    if (before[i] === after[i]) continue;
    if (before[i] === ENTRY_HOME && after[i] === ENTRY_GOIANIA) continue;
    if (before[i].split(TINTIM_HOME).join(TINTIM_GOIANIA) === after[i]) continue;
    throw new Error(`[gen-at-goiania] <script> #${i} divergiu do index.html além das trocas permitidas — abortando`);
  }
  for (const sig of TRACKING_PRIMITIVES_GOIANIA) {
    if (!out.includes(sig)) throw new Error(`[gen-at-goiania] primitivo de tracking ausente: ${sig}`);
  }
  if (out.includes(TINTIM_HOME) || out.includes(TINTIM_HOME_TOKEN)) {
    throw new Error("[gen-at-goiania] deeplink Tintim da HOME sobrou no HTML da porta Goiânia");
  }
  if (out.includes(TINTIM_SP_TOKEN) || out.includes(TINTIM_BR_TOKEN)) {
    throw new Error("[gen-at-goiania] deeplink Tintim da porta SP ou BR vazou para a porta Goiânia");
  }
  if (!out.includes("noindex")) throw new Error("[gen-at-goiania] noindex não aplicado");

  await writeFile(AT_GOIANIA_HTML, out, "utf8");
  console.log(`[gen-at-goiania] OK — ${path.basename(AT_GOIANIA_HTML)} gerado (${after.length} <script> herdados; entry goiania)`);
  return AT_GOIANIA_HTML;
}

// execução direta: node scripts/gen-at-goiania.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateAtGoianiaHtml().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
