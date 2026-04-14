import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
    // Async CSS: transforma o <link rel="stylesheet"> injetado pelo Vite
    // em preload não-bloqueante (com fallback <noscript>) para liberar o FCP/LCP.
    {
      name: "async-css",
      apply: "build",
      enforce: "post",
      transformIndexHtml(html: string) {
        const linkRe = /<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g;
        const noscripts: string[] = [];
        const transformed = html.replace(linkRe, (_m, href) => {
          noscripts.push(`<link rel="stylesheet" href="${href}">`);
          return `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">`;
        });
        if (!noscripts.length) return html;
        return transformed.replace(
          "</head>",
          `<noscript>${noscripts.join("")}</noscript></head>`
        );
      },
    } satisfies Plugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
}));
