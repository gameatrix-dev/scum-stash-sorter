import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Standalone SPA build used only for the Electron desktop app.
export default defineConfig({
  base: "./",
  root: path.resolve(import.meta.dirname, "renderer"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "../src") },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "../dist-desktop"),
    emptyOutDir: true,
  },
});
