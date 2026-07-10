// Gera assistente-tecnico-medico-sp.html a partir do index.html (porta geo SP da home).
//
// POR QUE GERADO (e não copiado na mão): o index.html carrega ~300 linhas de tracking inline
// (gtag AW+GA4, beacons __tvrs, handler de WhatsApp, reescrita do link Tintim, FAB) que são o
// coração da conversão do Ads. Uma cópia manual criaria um fork que DERIVA silenciosamente a
// cada ajuste na home. Aqui os <script> são herdados BYTE A BYTE do index.html em toda geração;
// só mudam <title>/metas/canonical/robots e o entry (main-at.tsx -> main-at-sp.tsx). Um gate
// no final aborta se qualquer outro <script> divergir ou se algum primitivo de tracking sumir.
//
// Roda sozinho (`node scripts/gen-at-sp.mjs`) ou importado pelo build (scripts/build.mjs) e
// pelo dev server (vite.config.ts). O arquivo gerado fica no .gitignore — nunca é editado à mão.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const AT_SP_HTML = path.join(ROOT, "assistente-tecnico-medico-sp.html");
export const AT_SP_PATHNAME = "/assistente-tecnico-medico/sp";

const CANONICAL_SP = "https://www.drakellyneisse.com.br/assistente-tecnico-medico/sp";

// título e descrição da home — texto EXATO (aparece no <title>/og/twitter); o gerador aborta
// se a home mudar esses textos, forçando a decisão consciente de como fica a variante SP.
const TITLE_HOME = "Assistente Técnico Médico em Perícia Judicial | Dra. Kelly Neisse";
const TITLE_SP = "Assistente Técnico Médico em Perícia Judicial em São Paulo | Dra. Kelly Neisse";

const DESC_HOME =
  "Tem uma perícia médica no seu processo cível ou trabalhista? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";
const DESC_SP =
  "Tem uma perícia médica no seu processo cível ou trabalhista em São Paulo? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. Atendimento em todo o estado de São Paulo. CRM/MG 109.153.";

const ENTRY_HOME = '<script type="module" src="/src/main-at.tsx"></script>';
const ENTRY_SP = '<script type="module" src="/src/main-at-sp.tsx"></script>';

// Deeplinks Tintim: a porta SP tem fluxo DEDICADO (mesma conta, token próprio — separa o
// rastreio no Tintim por porta). O FAB tem o link cravado no script inline, então ele é a
// SEGUNDA exceção permitida no gate byte a byte (além do entry). DEVE casar com
// AT_SP_WHATSAPP_URL em src/components/at/geo-sp.ts.
const TINTIM_HOME =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/b40002a5-951b-4014-a30a-17af3f592141";
const TINTIM_SP =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/f42174e7-24cc-4583-a56b-9a6161434a15";

// primitivos que TÊM que sobreviver na porta SP (mesmo funil AT da home — mesma conversão Ads)
const TRACKING_PRIMITIVES_SP = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click_at",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
  "AW-16690821688/zjEbCOiG7MAcELj05pY-",
  TINTIM_SP,
];

const extractScripts = (s) => s.match(/<script[\s\S]*?<\/script>/gi) || [];

// replace com contagem obrigatória: se o index.html mudar e o padrão sumir, o build ABORTA
// (nunca gera a porta SP silenciosamente desatualizada).
function replaceCounted(html, from, to, expected, label) {
  const count = html.split(from).length - 1;
  if (count !== expected) {
    throw new Error(`[gen-at-sp] padrão "${label}" esperado ${expected}x no index.html, achei ${count}x — atualize scripts/gen-at-sp.mjs`);
  }
  return html.split(from).join(to);
}

export async function generateAtSpHtml() {
  const src = await readFile(path.join(ROOT, "index.html"), "utf8");
  let out = src;

  // 1) title (aparece em <title>, og:title e twitter:title)
  out = replaceCounted(out, TITLE_HOME, TITLE_SP, 3, "title/og:title/twitter:title");
  // 2) description (meta description, og:description, twitter:description)
  out = replaceCounted(out, DESC_HOME, DESC_SP, 3, "description");
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
    `<link rel="canonical" href="${CANONICAL_SP}" />`,
    1,
    "canonical"
  );
  // 5) og:url próprio da rota
  out = replaceCounted(
    out,
    '<meta property="og:url" content="https://www.drakellyneisse.com.br/">',
    `<meta property="og:url" content="${CANONICAL_SP}">`,
    1,
    "og:url"
  );
  // 6) entry da porta SP (renderiza <AtIndex geo="sp" />)
  out = replaceCounted(out, ENTRY_HOME, ENTRY_SP, 1, "entry main-at.tsx");
  // 7) FAB: troca o deeplink Tintim cravado no script inline pelo fluxo dedicado SP
  out = replaceCounted(out, TINTIM_HOME, TINTIM_SP, 1, "deeplink Tintim do FAB");

  // GATE: todo <script> byte-idêntico ao index.html, exceto DUAS trocas permitidas:
  // o entry (main-at -> main-at-sp) e o deeplink Tintim do FAB (home -> SP).
  const before = extractScripts(src);
  const after = extractScripts(out);
  if (before.length !== after.length) {
    throw new Error(`[gen-at-sp] contagem de <script> divergiu (${before.length} -> ${after.length})`);
  }
  for (let i = 0; i < before.length; i++) {
    if (before[i] === after[i]) continue;
    if (before[i] === ENTRY_HOME && after[i] === ENTRY_SP) continue;
    if (before[i].split(TINTIM_HOME).join(TINTIM_SP) === after[i]) continue;
    throw new Error(`[gen-at-sp] <script> #${i} divergiu do index.html além das trocas permitidas — abortando`);
  }
  for (const sig of TRACKING_PRIMITIVES_SP) {
    if (!out.includes(sig)) throw new Error(`[gen-at-sp] primitivo de tracking ausente: ${sig}`);
  }
  if (out.includes(TINTIM_HOME)) {
    throw new Error("[gen-at-sp] deeplink Tintim da HOME sobrou no HTML da porta SP");
  }
  if (!out.includes("noindex")) throw new Error("[gen-at-sp] noindex não aplicado");

  await writeFile(AT_SP_HTML, out, "utf8");
  console.log(`[gen-at-sp] OK — ${path.basename(AT_SP_HTML)} gerado (${after.length} <script> herdados; entry ${ENTRY_SP.includes("main-at-sp") ? "sp" : "?"})`);
  return AT_SP_HTML;
}

// execução direta: node scripts/gen-at-sp.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateAtSpHtml().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
