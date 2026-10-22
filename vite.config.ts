import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GitHub Pages project sites are served from /<repo>/, while dev runs at the root.
// vite-plugin-singlefile forces Vite's own `base` to "./", so expose the prefix separately.
const REPO_BASE_PATH = "/influx-systems-website";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    __BASE_PATH__: JSON.stringify(command === "build" ? REPO_BASE_PATH : ""),
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
