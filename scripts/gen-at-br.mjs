// Gera assistente-tecnico-medico-br.html a partir do index.html (porta nacional /br da home).
//
// POR QUE GERADO (e não copiado na mão): mesmo motivo da porta SP (ver scripts/gen-at-sp.mjs) —
// o index.html carrega ~300 linhas de tracking inline (gtag AW+GA4, beacons __tvrs, handler de
// WhatsApp, reescrita do link Tintim, FAB) que são o coração da conversão do Ads. Aqui os
// <script> são herdados BYTE A BYTE do index.html em toda geração; só mudam <title>/metas/
// canonical/robots e o entry (main-at.tsx -> main-at-br.tsx). Um gate no final aborta se
// qualquer outro <script> divergir ou se algum primitivo de tracking sumir.
//
// São TRÊS as exceções permitidas no gate byte a byte desta porta: o entry, o deeplink Tintim
// do FAB (fluxo dedicado [BR]) e o campo `url` do JSON-LD ProfessionalService (URL própria da
// rota, em vez da home). Qualquer outra divergência em <script> aborta a geração.
//
// Roda sozinho (`node scripts/gen-at-br.mjs`) ou importado pelo build (scripts/build.mjs) e
// pelo dev server (vite.config.ts). O arquivo gerado fica no .gitignore — nunca é editado à mão.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const AT_BR_HTML = path.join(ROOT, "assistente-tecnico-medico-br.html");
export const AT_BR_PATHNAME = "/assistente-tecnico-medico/br";

const CANONICAL_BR = "https://www.drakellyneisse.com.br/assistente-tecnico-medico/br";

// título e descrição da home — texto EXATO (aparece no <title>/og/twitter); o gerador aborta
// se a home mudar esses textos, forçando a decisão consciente de como fica a variante BR.
const TITLE_HOME = "Assistente Técnico Médico em Perícia Judicial | Dra. Kelly Neisse";
const TITLE_BR = "Assistente Técnico Médico em Perícia Judicial em Todo o Brasil | Dra. Kelly Neisse";

const DESC_HOME =
  "Tem uma perícia médica no seu processo cível ou trabalhista? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. CRM/MG 109.153.";
const DESC_BR =
  "Tem uma perícia médica no seu processo cível ou trabalhista? A Dra. Kelly Neisse atua como assistente técnica médica: analisa o caso, formula quesitos, acompanha a perícia e contesta o laudo. Atendimento em todo o Brasil (presencial e remoto). CRM/MG 109.153.";

const ENTRY_HOME = '<script type="module" src="/src/main-at.tsx"></script>';
const ENTRY_BR = '<script type="module" src="/src/main-at-br.tsx"></script>';

// Deeplinks Tintim: a porta BR tem fluxo DEDICADO (mesma conta, token próprio — separa o
// rastreio no Tintim por porta). O FAB tem o link cravado no script inline, por isso ele é uma
// das exceções do gate. DEVE casar com AT_BR_WHATSAPP_URL em src/components/at/geo-br.ts.
const TINTIM_HOME =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/b40002a5-951b-4014-a30a-17af3f592141";
const TINTIM_BR =
  "https://tintim.link/whatsapp/9032d846-c29e-46d1-a300-01417d56fcb0/59de1b8b-00ba-4bfd-a87b-d7f30b9a9472";
// token do fluxo da porta SP — NUNCA pode aparecer nesta porta (veio do clone da /sp)
const TINTIM_SP_TOKEN = "f42174e7-24cc-4583-a56b-9a6161434a15";

// JSON-LD ProfessionalService: `url` deve ser a da própria rota, não a da home.
// A VÍRGULA final é o que torna esta âncora única e é essencial: o bloco Person tem o mesmo par
// chave/valor SEM vírgula (último campo do objeto) e segue apontando para a home de propósito —
// é a URL da pessoa, não da oferta desta porta. Âncora de UMA linha (nada de \n) p/ o gerador
// funcionar igual em checkout com LF (Vercel/Linux) e com CRLF (Windows).
const SCHEMA_URL_HOME = '"url": "https://www.drakellyneisse.com.br/",';
const SCHEMA_URL_BR = `"url": "${CANONICAL_BR}",`;

// primitivos que TÊM que sobreviver na porta BR (mesmo funil AT da home — mesma conversão Ads)
const TRACKING_PRIMITIVES_BR = [
  "__tvrs", "G-N6G6FSD34E", "google-analytics.com/g/collect", "whatsapp_click_at",
  "scroll_depth", "page_view", "GTM-NH3564MJ", "AW-16690821688", "tvrsTagged",
  "dataLayer", "navigator.sendBeacon", "gtm.drakellyneisse.com.br",
  "AW-16690821688/zjEbCOiG7MAcELj05pY-",
  TINTIM_BR,
];

const extractScripts = (s) => s.match(/<script[\s\S]*?<\/script>/gi) || [];

// replace com contagem obrigatória: se o index.html mudar e o padrão sumir, o build ABORTA
// (nunca gera a porta BR silenciosamente desatualizada).
function replaceCounted(html, from, to, expected, label) {
  const count = html.split(from).length - 1;
  if (count !== expected) {
    throw new Error(`[gen-at-br] padrão "${label}" esperado ${expected}x no index.html, achei ${count}x — atualize scripts/gen-at-br.mjs`);
  }
  return html.split(from).join(to);
}

export async function generateAtBrHtml() {
  const src = await readFile(path.join(ROOT, "index.html"), "utf8");
  let out = src;

  // 1) title (aparece em <title>, og:title e twitter:title)
  out = replaceCounted(out, TITLE_HOME, TITLE_BR, 3, "title/og:title/twitter:title");
  // 2) description (meta description, og:description, twitter:description)
  out = replaceCounted(out, DESC_HOME, DESC_BR, 3, "description");
  // 3) noindex — rota exclusiva de tráfego pago; a home "/" já cobre a busca orgânica nacional
  //    (indexar as duas criaria conteúdo duplicado com a mãe). Decisão reversível.
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
    `<link rel="canonical" href="${CANONICAL_BR}" />`,
    1,
    "canonical"
  );
  // 5) og:url próprio da rota
  out = replaceCounted(
    out,
    '<meta property="og:url" content="https://www.drakellyneisse.com.br/">',
    `<meta property="og:url" content="${CANONICAL_BR}">`,
    1,
    "og:url"
  );
  // 6) entry da porta BR (renderiza <AtIndex geo="br" />)
  out = replaceCounted(out, ENTRY_HOME, ENTRY_BR, 1, "entry main-at.tsx");
  // 7) FAB: troca o deeplink Tintim cravado no script inline pelo fluxo dedicado [BR]
  out = replaceCounted(out, TINTIM_HOME, TINTIM_BR, 1, "deeplink Tintim do FAB");
  // 8) JSON-LD ProfessionalService: url própria da rota (o areaServed já é Country/Brasil)
  out = replaceCounted(out, SCHEMA_URL_HOME, SCHEMA_URL_BR, 1, "url do JSON-LD ProfessionalService");

  // GATE: todo <script> byte-idêntico ao index.html, exceto as TRÊS trocas permitidas — o entry
  // (main-at -> main-at-br), o deeplink Tintim do FAB (home -> BR) e o url do JSON-LD.
  const allowed = (s) =>
    s.split(ENTRY_HOME).join(ENTRY_BR)
      .split(TINTIM_HOME).join(TINTIM_BR)
      .split(SCHEMA_URL_HOME).join(SCHEMA_URL_BR);
  const before = extractScripts(src);
  const after = extractScripts(out);
  if (before.length !== after.length) {
    throw new Error(`[gen-at-br] contagem de <script> divergiu (${before.length} -> ${after.length})`);
  }
  for (let i = 0; i < before.length; i++) {
    if (before[i] === after[i]) continue;
    if (allowed(before[i]) === after[i]) continue;
    throw new Error(`[gen-at-br] <script> #${i} divergiu do index.html além das trocas permitidas — abortando`);
  }
  for (const sig of TRACKING_PRIMITIVES_BR) {
    if (!out.includes(sig)) throw new Error(`[gen-at-br] primitivo de tracking ausente: ${sig}`);
  }
  if (out.includes(TINTIM_HOME)) {
    throw new Error("[gen-at-br] deeplink Tintim da HOME sobrou no HTML da porta BR");
  }
  if (out.includes(TINTIM_SP_TOKEN)) {
    throw new Error("[gen-at-br] deeplink Tintim da porta SP vazou para a porta BR");
  }
  if (!out.includes("noindex")) throw new Error("[gen-at-br] noindex não aplicado");
  if (!out.includes(CANONICAL_BR)) throw new Error("[gen-at-br] canonical da rota não aplicado");
  if (!out.includes(`"url": "${CANONICAL_BR}",`)) {
    throw new Error("[gen-at-br] url do JSON-LD não aponta para a rota");
  }

  await writeFile(AT_BR_HTML, out, "utf8");
  console.log(`[gen-at-br] OK — ${path.basename(AT_BR_HTML)} gerado (${after.length} <script> herdados; entry br)`);
  return AT_BR_HTML;
}

// execução direta: node scripts/gen-at-br.mjs
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateAtBrHtml().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
