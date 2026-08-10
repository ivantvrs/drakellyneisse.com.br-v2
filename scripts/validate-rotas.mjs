// Validação da matriz de rotas (roda sobre dist/, pós-build).
//
//   node scripts/validate-rotas.mjs
//
// Sobe um servidor que EMULA a resolução da Vercel na ordem real dela:
//   1. redirects do vercel.json  ->  301/308
//   2. filesystem (dist/…), inclusive "clean URL" (arquivo sem extensão, com ou sem barra final)
//   3. rewrites do vercel.json
//   4. nada casou  ->  dist/404.html com status 404
//
// As regras vêm do PRÓPRIO vercel.json (nada hardcoded aqui), então mexer nele muda o teste junto.
//
// LIMITE HONESTO: isto é uma emulação. Ela pega rota faltando, redirect quebrado e soft 404 —
// que é o que motivou a mudança —, mas quem decide de verdade é a Vercel. Depois do deploy,
// repetir a matriz com `curl -I` (sem -L) contra o preview. As rotas de /api/* não são testáveis
// aqui (são funções serverless, não arquivos em dist/).

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = 4196;
const BASE = `http://127.0.0.1:${PORT}`;

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".jpg": "image/jpeg", ".png": "image/png", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };

// converte o `source` do vercel.json em regex: suporta literais, "(.*)" e ":param*"
const toRe = (src) => new RegExp("^" + src.replace(/:[a-zA-Z]+\*/g, "(.*)").replace(/\//g, "\\/").replace(/\(\.\*\)/g, "(?:.*)") + "$");

async function existeArquivo(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

// resolve um pathname contra dist/ do jeito que a Vercel resolve estático:
// caminho exato -> <caminho>/index.html (directory index) -> <caminho>.html
//
// O directory index NÃO é detalhe: /politica-de-privacidade e /termos-de-uso são PASTAS em
// public/ (cada uma com seu index.html) — estão no rodapé de todas as páginas e no sitemap, e
// não têm rewrite no vercel.json. Sem esse candidato aqui, o teste acusava 404 nelas.
async function resolverArquivo(pathname) {
  const limpo = decodeURIComponent(pathname).replace(/^\/+/, "");
  const semBarra = limpo.replace(/\/+$/, "");
  const candidatos = [
    path.join(DIST, limpo || "index.html"),
    path.join(DIST, semBarra, "index.html"),
    path.join(DIST, semBarra + ".html"),
  ];
  for (const c of candidatos) {
    if (await existeArquivo(c)) return c;
  }
  return null;
}

function startServer(config) {
  const redirects = (config.redirects || []).map((r) => ({ ...r, re: toRe(r.source) }));
  const rewrites = (config.rewrites || []).map((r) => ({ ...r, re: toRe(r.source) }));

  return new Promise((resolve) => {
    const srv = createServer(async (req, res) => {
      const [p, q] = req.url.split("?");
      const qs = q ? "?" + q : "";

      // 1) redirects
      for (const r of redirects) {
        if (r.re.test(p)) {
          res.writeHead(r.statusCode || 308, { Location: r.destination });
          return res.end();
        }
      }

      // 2) filesystem (arquivo estático real, incluindo os sem extensão em public/)
      let file = await resolverArquivo(p);

      // 3) rewrites
      if (!file) {
        for (const r of rewrites) {
          if (r.re.test(p)) {
            if (r.destination.startsWith("/api/")) {
              res.writeHead(200, { "Content-Type": "text/plain" });
              return res.end("(função serverless — fora do escopo desta emulação)");
            }
            file = await resolverArquivo(r.destination);
            break;
          }
        }
      }

      // 4) 404 real
      if (!file) {
        const data = await readFile(path.join(DIST, "404.html"));
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      }

      const data = await readFile(file);
      res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream", "X-Served-File": path.basename(file) });
      res.end(data + (qs ? "" : ""));
    }).listen(PORT, () => resolve(srv));
  });
}

let failures = 0;
function check(ok, label, detail = "") {
  console.log(`${ok ? "  PASS" : "  FAIL"}  ${label}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

// Toda rewrite declarada no vercel.json DEVE responder 200 servindo o arquivo que ela aponta.
// Derivado do config (e não escrito à mão) para que uma porta nova — a /br, p.ex. — entre no
// teste sozinha assim que ganhar a sua rewrite, sem alguém precisar lembrar de editar esta lista.
function matrizDasRewrites(config) {
  return (config.rewrites || [])
    .filter((r) => !r.destination.startsWith("/api/") && !r.source.includes("("))
    .map((r) => [r.source, 200, path.basename(r.destination)]);
}

// pathname -> status esperado (+ arquivo esperado, quando importa qual página respondeu)
const MATRIZ = [
  // home (não tem rewrite: é o índice do próprio dist/)
  ["/", 200, "index.html"],
  // query string e âncora (a âncora nem chega ao servidor, mas o path tem que seguir 200)
  ["/?utm_source=google&utm_medium=cpc&gclid=teste", 200, "index.html"],
  ["/empresa?utm_source=google&gclid=teste", 200, "empresa.html"],
  // servidos direto de public/ — NÃO estão na lista de rewrites e dependem só do filesystem; é
  // justamente o tipo de URL que o catch-all mascarava. As duas primeiras são PASTAS com
  // index.html dentro, estão no sitemap E no rodapé de todas as páginas.
  ["/politica-de-privacidade", 200, "index.html"],
  ["/politica-de-privacidade/", 200, "index.html"],
  ["/termos-de-uso", 200, "index.html"],
  ["/termos-de-uso/", 200, "index.html"],
  ["/sitemap.xml", 200, "sitemap.xml"],
  ["/robots.txt", 200, "robots.txt"],
  ["/favicon.ico", 200, "favicon.ico"],
  // redirects que NÃO podem mudar
  ["/at", 301],
  ["/at/qualquer-coisa", 301],
  ["/assistente-tecnico-medico", 301],
  ["/assistente-tecnico-medico/", 301],
  // o que motivou a tarefa: rota inexistente = 404 REAL (antes era 200 + home)
  ["/rota-inexistente-xyz", 404],
  ["/assistente-tecnico-medico/rj", 404],
  ["/empresas", 404],
  ["/home", 404],
  // NÃO testar "/index": tanto aqui quanto na Vercel ele resolve para index.html pelo candidato
  // "<caminho>.html" e responde 200. É inofensivo (ninguém anuncia /index) e mexer nisso exigiria
  // desligar a resolução .html, que é o que faz /empresa funcionar caso a rewrite caia.
];

async function main() {
  const config = JSON.parse(await readFile(path.join(ROOT, "vercel.json"), "utf8"));
  const temCatchAll = (config.rewrites || []).some((r) => r.source === "/(.*)");
  const srv = await startServer(config);

  console.log("\n[1] vercel.json");
  check(!temCatchAll, "catch-all /(.*) -> /index.html REMOVIDO (era a causa do soft 404)");
  check(await existeArquivo(path.join(DIST, "404.html")), "dist/404.html existe");

  const matriz = [...matrizDasRewrites(config), ...MATRIZ];
  console.log(`\n[2] Matriz de rotas (${matriz.length} casos; ${matrizDasRewrites(config).length} derivados das rewrites)`);
  for (const [url, esperado, arquivo] of matriz) {
    const r = await fetch(BASE + url, { redirect: "manual" });
    const servido = r.headers.get("x-served-file") || "";
    const okStatus = r.status === esperado;
    const okArquivo = !arquivo || servido === arquivo;
    check(okStatus && okArquivo, `${esperado}  ${url}`, okStatus ? (okArquivo ? servido : `servido ${servido}, esperado ${arquivo}`) : `recebido ${r.status}`);
  }

  console.log("\n[3] Conteúdo do 404");
  const r404 = await fetch(`${BASE}/rota-inexistente-xyz`);
  const html = await r404.text();
  check(/<meta name="robots" content="noindex, follow"/.test(html), "404 com noindex, follow");
  check(/Página não encontrada/.test(html), "404 com a mensagem visível (prerender, sem depender de JS)");
  for (const destino of ["/empresa", "/trabalhista"]) {
    check(html.includes(`href="${destino}"`), `404 com link para ${destino}`);
  }
  check(html.includes('href="/"'), "404 com link para a home");
  check(!/googletagmanager|gtag\(|__tvrs|dataLayer/.test(html), "404 sem tags de tracking (decisão de projeto)");

  console.log("\n[4] Âncoras da home (navegação interna client-side)");
  const home = await (await fetch(`${BASE}/`)).text();
  for (const id of ["servicos", "faq"]) {
    check(home.includes(`id="${id}"`), `#${id} existe no HTML da home`);
  }

  srv.close();
  console.log(`\n${failures === 0 ? "✅ TUDO PASSOU" : `❌ ${failures} FALHA(S)`}`);
  console.log("Lembrete: reexecutar a matriz com `curl -I` contra o preview — a Vercel é a autoridade final.");
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
