# centra-one.ai

The Centra One marketing website. Static pages built with [Astro](https://astro.build), served by a Cloudflare Worker with static assets. The only server code is the enquiry form endpoint.

The app itself (portal.centra-one.ai) lives in a separate repo, `centra-one-app`.

## Run it

Node 22 (see `.node-version`).

```sh
npm ci
npm run dev        # Astro dev server on http://localhost:4321
npm run build      # static build into dist/
npm run preview    # wrangler dev: the real Worker + dist/ on http://localhost:8787
npm run check      # astro check (types)
```

`npm run preview` runs the Worker locally, so it behaves like production: no trailing slashes, the 404 page, `_headers`, `_redirects` and `/api/enquiry`. Without a Resend key the enquiry endpoint answers 503 "We couldn't send that just now", which is expected locally.

## Deploy

Cloudflare Workers Builds deploys the `main` branch to the `centra-one-site` Worker.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Other branches get preview URLs (`preview_urls` is on in `wrangler.jsonc`).

Configuration lives in `wrangler.jsonc`:

| Name | Type | What it is |
|---|---|---|
| `ENQUIRY_TO` | var | Where website enquiries are emailed (paul@centra-one.ai) |
| `ENQUIRY_FROM` | var | The From address. Must be on a domain verified in Resend |
| `RESEND_API_KEY` | **secret** | Resend API key with sending access. Set it in the Cloudflare dashboard (Worker > Settings > Variables and Secrets, type Secret). Never commit it |

## How it's put together

```
src/
  pages/            one file per URL (build.format "file": /pricing -> dist/pricing.html)
  layouts/          BaseLayout: head tags, fonts, nav, footer, scroll-reveal fallback
  components/       shared pieces (PageHeader, PricingPlans, ChatDemo, FaqList, CtaClosing, Icon)
  components/home/  the homepage hero (three.js), platform tiles, numbers
  scripts/          hero3d.ts (the 3D scene, loaded lazily), hero-progress.ts
  data/             site facts, plans and prices, FAQs, the Centra AI demo script
  content/          help centre articles (Markdown)
  styles/global.css the design system
public/             static files: icons, og.png, _headers, _redirects, robots.txt, llms.txt
worker/index.ts     the Worker: /api/enquiry, everything else from dist/
STYLE.md            how to add or change pages: design system, copy rules and product facts
```

Prices and plan details come from `src/data/pricing.ts`. Change them there and every page (and `public/llms.txt`, by hand) follows.

## Security

`public/_headers` sets a strict Content-Security-Policy: scripts, fonts and connections are same-origin only. Astro is configured never to inline scripts (`assetsInlineLimit: 0`), so don't add inline `<script>` code or anything loaded from another domain. If you add a third-party service (analytics, a chat widget), the CSP needs updating, and so does the privacy policy.
