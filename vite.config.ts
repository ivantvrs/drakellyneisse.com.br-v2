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
    // DEV-only (apply:"serve"): mapeia a URL limpa /empresa -> /empresa.html no dev server,
    // espelhando o rewrite do vercel.json. Não tem efeito no build de produção.
    {
      name: "empresa-dev-rewrite",
      apply: "serve",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/empresa" || req.url === "/empresa/") req.url = "/empresa.html";
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
