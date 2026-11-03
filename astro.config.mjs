// Static marketing site for centra-one.ai. Astro builds plain HTML into dist/, which the
// Cloudflare Worker in worker/index.ts serves as static assets (see wrangler.jsonc).
// URLs have no trailing slash: build.format "file" writes /features as features.html and
// the Worker's asset handling drops trailing slashes to match.
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://centra-one.ai",
  trailingSlash: "never",
  build: {
    format: "file",
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404"),
    }),
  ],
  devToolbar: { enabled: false },
  vite: {
    build: {
      // Never inline scripts or fonts as data: URIs, so the Content-Security-Policy in
      // public/_headers can stay strict (script-src 'self', font-src 'self').
      assetsInlineLimit: 0,
      // three.js is one ~540 kB chunk, loaded lazily by the homepage hero only.
      chunkSizeWarningLimit: 700,
    },
  },
});
