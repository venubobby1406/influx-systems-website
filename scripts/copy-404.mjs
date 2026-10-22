// GitHub Pages has no SPA fallback: unknown paths get served 404.html.
// Copying the single-file build lets the client-side router render the right page.
import { copyFileSync } from "node:fs";

copyFileSync("dist/index.html", "dist/404.html");
