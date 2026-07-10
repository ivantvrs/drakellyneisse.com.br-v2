import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    // DEV-only (apply:"serve"): mapeia as URLs limpas /empresa, /trabalhista e
    // /assistente-tecnico-medico/sp -> *.html no dev server, espelhando os rewrites do
    // vercel.json (inclusive o 301 do caminho pai). Não tem efeito no build de produção.
    {
      name: "portas-paralelas-dev-rewrite",
      apply: "serve",
      async configureServer(server) {
        // regenera a porta geo SP a partir do index.html ao subir o dev (arquivo gitignorado)
        const { generateAtSpHtml } = await import("./scripts/gen-at-sp.mjs");
        await generateAtSpHtml();
        server.middlewares.use((req, res, next) => {
          if (req.url === "/empresa" || req.url === "/empresa/") req.url = "/empresa.html";
          if (req.url === "/trabalhista" || req.url === "/trabalhista/") req.url = "/trabalhista.html";
          const [p, q] = (req.url || "").split("?");
          if (p === "/assistente-tecnico-medico/sp" || p === "/assistente-tecnico-medico/sp/") {
            // preserva a query (?utm_*, gclid…) — essencial p/ testar a propagação ao Tintim
            req.url = "/assistente-tecnico-medico-sp.html" + (q ? "?" + q : "");
          } else if (p === "/assistente-tecnico-medico" || p === "/assistente-tecnico-medico/") {
            res.writeHead(301, { Location: "/" + (q ? "?" + q : "") });
            res.end();
            return;
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "react": "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
      "react/jsx-dev-runtime": "preact/jsx-runtime",
    },
    dedupe: ["preact", "preact/compat", "preact/hooks"],
  },
  build: {
    target: "es2020",
    rollupOptions: {
      // manualChunks só faz sentido no bundle do client; no build SSR (entry-server,
      // usado apenas no prerender) ele atrapalha e não tem efeito útil.
      // OBS: o input da /empresa NÃO entra aqui de propósito — empresa.html é construída num
      // passo ISOLADO em scripts/build.mjs (outDir compartilhado, emptyOutDir:false) para que
      // o build da LP do advogado (index.html) permaneça byte-idêntico ao de hoje.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              vendor: ["preact", "preact/compat", "preact/hooks"],
            },
          },
    },
  },
}));
