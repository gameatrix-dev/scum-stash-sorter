import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import fs from "node:fs";

// Standalone SPA build for the desktop app: everything inlined into one
// index.html so it works when opened straight from disk (file://).
export default defineConfig({
  base: "./",
  root: path.resolve(import.meta.dirname, "renderer"),
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "inline-single-file",
      closeBundle() {
        const out = path.resolve(import.meta.dirname, "../dist-desktop");
        const htmlPath = path.join(out, "index.html");
        let html = fs.readFileSync(htmlPath, "utf8");

        let inlineJs = "";
        html = html.replace(
          /<script[^>]*src="\.?\/?([^"]+\.js)"[^>]*><\/script>/g,
          (_m, src: string) => {
            inlineJs += fs.readFileSync(path.join(out, src), "utf8");
            return "";
          },
        );
        let inlineCss = "";
        html = html.replace(
          /<link[^>]*rel="stylesheet"[^>]*href="\.?\/?([^"]+\.css)"[^>]*>/g,
          (_m, href: string) => {
            const css = fs.readFileSync(path.join(out, href), "utf8");
            inlineCss += css;
            return "";
          },
        );

        html = html.replace("</head>", () => `<style>${inlineCss}</style></head>`);
        const safeJs = inlineJs.split("</script").join("<\\/script");
        html = html.replace("</body>", () => `<script>${safeJs}</script></body>`);
        fs.writeFileSync(htmlPath, html);
        fs.rmSync(path.join(out, "assets"), { recursive: true, force: true });
      },
    },
  ],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "../src") },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "../dist-desktop"),
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 100 * 1024 * 1024,
    modulePreload: false,
    rollupOptions: {
      output: { format: "iife", inlineDynamicImports: true },
    },
  },
});
