# CLAUDE.md

The centra-one.ai marketing website: an Astro 7 static site served by the Cloudflare Worker `centra-one-site`. The app itself (portal.centra-one.ai) is a separate repo, `centra-one-app`.

- Read `STYLE.md` before changing any page. It holds the design system, the copy rules (plain, human, New Zealand English, no em or en dashes) and the product facts the copy must stick to.
- `README.md` covers commands, deploys and configuration.
- Changes go on a branch with a pull request. Cloudflare Workers Builds deploys `main` to production; other branches upload preview versions.
- Commands: `npm ci`, `npm run build`, `npm run check` (types), `npm run preview` (the real Worker via `wrangler dev` on port 8787).
- Plans and prices live in `src/data/pricing.ts`. When they change, update `public/llms.txt` by hand.
- Never commit secrets. `RESEND_API_KEY` is a Cloudflare secret on the Worker.
- The Content-Security-Policy in `public/_headers` only allows this origin: no inline scripts and nothing loaded from other domains.
