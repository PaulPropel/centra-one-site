# Building pages for centra-one.ai

Read this before adding or changing a page. The homepage (`src/pages/index.astro`) is the reference for look and feel: dark, technical, generous spacing, huge tight headlines, mono labels, Centra Blue glows, and motion that follows the scroll.

## Stack and commands

- Astro 7, static output (`dist/`), served by a Cloudflare Worker (`worker/index.ts`, `wrangler.jsonc`). The Worker only handles `/api/*` (the enquiry form). Everything else is a static file.
- URLs have no trailing slash and no `.html`: link to `/features`, `/help/inventory/setting-up-products`. `build.format` is `"file"`, so `src/pages/pricing.astro` becomes `dist/pricing.html`.
- Several people build at once, so **always build through the lock**:
  - `flock /home/claude/centra-one-site/.build.lock npm run build`
  - type check: `flock /home/claude/centra-one-site/.build.lock npx astro check`
  - Hold the lock for a build plus screenshots, so nobody rebuilds `dist/` under you:
    `flock /home/claude/centra-one-site/.build.lock sh -c 'npm run build && node <your screenshot script>'`
- Preview the build with `npx astro preview --port <port> --host 127.0.0.1 --ignore-lock` (run it in the background; `--ignore-lock` lets more than one preview run at once). `npm run preview` runs the real Worker with `wrangler dev` instead. Playwright is installed globally: use `require("playwright")` from a `.cjs` file.
- Vanilla TypeScript only, in Astro `<script>` tags (Astro bundles them into files). No React, no new dependencies.

## Files you must not edit

`src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/SiteNav.astro`, `src/components/SiteFooter.astro`, `src/components/{PageHeader,CtaClosing,FaqList,PricingPlans,ChatDemo,Icon}.astro`, `src/components/home/*`, `src/scripts/*`, `src/data/{site,pricing,faq,ai-demo}.ts`, `worker/*`, `astro.config.mjs`, `wrangler.jsonc`, `package.json`.

If you need a shared change (a new utility class, a new icon, a fact in `data/`), make the page work with a scoped `<style>` instead and list the change you'd suggest in your final report.

Put page-specific styles in a scoped `<style>` in the page or in your own component under `src/components/<page>/`. Put page data in `src/data/<page>.ts` if it's long.

## Page skeleton

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PageHeader from "../components/PageHeader.astro";
import CtaClosing from "../components/CtaClosing.astro";
import { SIGNUP_URL } from "../data/site";
---

<BaseLayout title="Pricing" description="One or two plain sentences, under 160 characters.">
  <PageHeader eyebrow="Pricing" title='Simple pricing.<br><span class="dim">Based on your size.</span>' lead="...">
    <div class="btn-row">
      <a class="btn btn-primary" href={SIGNUP_URL}>Start free trial</a>
      <a class="btn btn-secondary" href="/contact?kind=demo#form">Book a demo</a>
    </div>
  </PageHeader>

  <section class="section">
    <div class="container">
      <p class="eyebrow rv">Section label</p>
      <h2 class="h2 rv mt-24">Short headline.<br /><span class="dim">Quieter second line.</span></h2>
      <p class="lead rv2 mt-24">One or two sentences.</p>
      <div class="grid-auto mt-48">...</div>
    </div>
  </section>

  <CtaClosing title='Start with the <span class="shine">plan that fits.</span>' lead="..." />
</BaseLayout>
```

- `BaseLayout` props: `title` (without the brand; " · Centra One" is added), `description`, optional `jsonLd`, `footnotes` (numbered, shown in the footer; reference with `<sup>1</sup>`), `notes` (unnumbered fine print), `noindex`, `type="article"`.
- `PageHeader` gives the page its only `<h1>` and clears the floating nav. Don't add another `h1`.
- `CtaClosing` defaults to "Your business. Handled." with Start free trial and Book a demo. Pass `logo={false}` for a quieter ending, `secondary={null}` to drop the second button.

## Design system (classes in `src/styles/global.css`)

Layout: `container` (1120px), `container-wide` (1240px), `container-narrow` (820px), `section` (big vertical padding), `section-tight`, `split` (two columns that wrap), `grid-auto` (cards, min 300px), `grid-auto-sm` (min 220px), `span-all`, `center`, `relative`, `mt-8/12/16/24/32/48/64`, `gap-*`.

Type: `eyebrow` (mono, uppercase, blue), `display` (homepage-size), `h1`, `h2`, `h3`, `h4`, `lead`, `body`, `small`, `muted`, `subtle`, `dim` (use for the quiet second line of a headline), `mono`, `fine` (mono uppercase fine print), `shine` (animated gradient text; use on one or two words, not whole headlines).

Buttons: `btn` plus `btn-primary` (one per view), `btn-secondary`, `btn-ghost`, `btn-sm`, `btn-block`; group with `btn-row`.

Surfaces: `glass` (gradient card, 28px radius) with `pad` or `pad-lg`; `glass-solid` (frosted panel); `tile` + `tile-title` (feature tile); `tile-xero`, `tile-shopify`, `tile-accent`; `chip`/`chips`; `data` (mono key/value row inside a tile; `data-good`, `data-accent`); `pill`; `dot`; `live` (pulsing dot, takes `color`); `grid-bg` (faint blueprint grid, put first inside a `relative` section); `table-wrap` + `table` (with `num`, `yes`, `no`, `own` cells); `faq` (or just use `FaqList`); `prose` (long-form text: help articles, legal, blog).

Forms: `field`, `label`, `input`, `select`, `textarea`, `form-grid`, `notice notice-ok`, `notice notice-err`, `hp` (honeypot).

Motion: `rv`, `rv2`, `rv3` fade and rise as they scroll into view (stagger by using all three). `in` + `d1..d4` animate on load (PageHeader uses them). Don't put `rv` on an element whose `transform` you also animate or set; wrap it instead. Everything must still look right with `prefers-reduced-motion: reduce`.

Colour tokens: `--text` (headings), `--text-2` (body), `--text-3` (secondary), `--text-4` (fine print only), `--accent` #1A1AFF (buttons), `--accent-3` (links, eyebrows), `--amber`, `--red`, `--green`, `--xero`, `--shopify`. Body text should be `--text-2` or brighter.

Components:
- `PageHeader` (`eyebrow`, `title` HTML, `lead`, `center`, `large`, slot for buttons)
- `CtaClosing` (`title` HTML, `lead`, `primary`, `secondary`, `fine`, `logo`)
- `FaqList` (`items` of `{ q, a }`, `openFirst`)
- `PricingPlans` (`detailed`, `finder`)
- `ChatDemo` (`ids` from `src/data/ai-demo.ts`, `footnote`; default slot is the copy above the question buttons)
- `Icon` (`name`, `size`, `stroke`, `label`). Names: arrow-right, arrow-left, arrow-down, arrow-up, arrow-up-right, chevron-right, chevron-down, check, x, plus, minus, mail, phone, message, search, sparkles, box, layers, file, cart, truck, scan, plug, users, settings, help, info, alert, bell, zap, refresh, clock, calendar, shield, lock, database, globe, pin, chart, trend, rocket, home, login, external, code, receipt, tag, heart, star, flag.

Look at the homepage components (`src/components/home/*`, `ChatDemo`, `PricingPlans`) for how cards, mock UI and data rows are built. Mock product UI (cards that look like the app) is encouraged: it sells better than icons. Buttons inside mock UI are `<span>`s with `aria-hidden="true"`, never real buttons.

## Copy rules

- No em dashes (—) or en dashes (–), anywhere: not in copy, titles, meta descriptions or alt text. Use a full stop, a comma, a colon or "to" ("$1M to $2.5M"). Check with `grep -rn "[—–]" src/pages src/components src/data src/content`.
- Plain, human, short sentences. Say what it does. No hype: never "revolutionary", "seamless", "unlock", "leverage", "cutting-edge", "game-changer", "supercharge", "effortless", "empower", "robust", "next-generation".
- New Zealand English: organisation, colour, centre, licence (noun), cheque, programme, catalogue, enquiry.
- Prices are US dollars: "US$59 a month" in prose, "$59 US / month" in plan cards.
- Sentence case for headings and buttons ("Start free trial", "Book a demo").
- Keep the voice of the existing site where it's good; rewrite where it's wordy. Carry over all real content and facts.

## Facts (these override anything in the old site)

Source of the old content: `/home/claude/centra-site-content/` (`pages/<route>.md`, `help/`, `blog/`, `changelog.json`, `careers.json`, `interactive.md`, `README.md` lists known problems). Fix these everywhere:

- **Links.** Every "Start free trial" goes to `SIGNUP_URL` (portal `/signup`), never `/login`. "Sign in" goes to `LOGIN_URL`. "Book a demo" or "Book a walkthrough" goes to `/contact?kind=demo#form`; enterprise to `/contact?kind=enterprise#form`; support to `/contact?kind=support#form`. There is no demo modal.
- **Plans differ.** Never say "every plan includes everything", "features aren't held back" or "the tier only sets users and support". Say: every plan runs the full platform (inventory, orders, purchasing, quoting, B2B portal, Shopify, the Centra AI assistant); Growth adds Centra AI actions, multi-currency and landed costs, custom document templates, a dedicated onboarding session and priority email support; Scale adds phone support, a quarterly business review, custom integrations consultation, early access and API access (coming soon). Use `src/data/pricing.ts`.
- **Centra AI.** The assistant (questions, answers, alerts) is on every plan. Actions (drafting purchase orders, quotes, transfers, follow-up emails) are on Growth and Scale, and nothing is sent or saved without approval. Use footnote `AI_ACTIONS_FOOTNOTE` from `data/pricing.ts` where actions are mentioned.
- **Extra users** are US$15 per user per month. Trial is 30 days, no credit card.
- **Xero is push only.** Invoices, contacts, bills from purchase orders, and per-line GST and account codes go from Centra One to Xero. Nothing comes back: no payment status, no "payments sync from Xero", no "reflects it when paid".
- **Shopify:** stock levels to Shopify every 15 minutes, orders import automatically, fulfilment tracking goes back on dispatch, customer details come in with the order.
- **Carriers live:** Aramex and Bascik Transport (consignments on dispatch, tracking back to the order).
- **Coming soon:** API access, MYOB, WooCommerce, Stripe payments. QuickBooks is not planned: never mention it.
- **Demand forecasting and dynamic safety stock are on the roadmap**, not live. Reorder points, reorder suggestions and ABC cycle counts are live.
- **Hosting and data:** data is stored in Sydney, Australia (Supabase), encrypted at rest and backed up every day. The app and website run on Cloudflare. Email goes through Resend. AI is Anthropic's Claude. Never mention Vercel, Lovable, Gmail or "NZ data hosting".
- **Company:** Centra One Limited, a New Zealand company. Built in New Zealand for wholesalers, distributors and small manufacturers in New Zealand and Australia.
- **Cookies:** essential cookies only (the app's sign-in). No analytics, advertising or tracking cookies, and no cookie banner.
- **Reply time:** "within one business day", everywhere (`REPLY_TIME`). Privacy requests: within 20 working days.
- **Emails:** hello@centra-one.ai (general, legal, privacy), support@centra-one.ai (customers), careers@centra-one.ai (jobs). Use `EMAIL` from `data/site.ts`.
- **Never publish demo or test logins** (email addresses or passwords for demo accounts).
- **Counts must be true.** Don't claim numbers of articles, customers or integrations you can't count from the content.
- Dates: today is November 2026. "Last updated" on legal pages: 3 November 2026.

## Interactivity

- Progressive enhancement: the page must be complete and readable without JavaScript. Enhance after load (tabs, filters, accordions).
- Scripts go in Astro `<script>` tags (bundled). Never `<script is:inline>` with code, never inline `onclick=` handlers, never anything loaded from another domain (fonts, images, scripts, iframes, embeds). The Content-Security-Policy blocks them.
- Buttons are `<button type="button">`, links are `<a>`. Tabs use `role="tablist"`/`tab`/`tabpanel` with arrow-key support. Filters use `aria-pressed`. Keep focus visible. Tap targets at least 44px.
- Respect `prefers-reduced-motion`.

## SEO

- Each page: unique `title` and `description`. Add JSON-LD where it fits (Product with offers on /pricing, JobPosting per role on /careers, Article on blog posts and help articles, BreadcrumbList on help articles).
- Internal links without trailing slashes. Images need `width`, `height` and real `alt` (or `alt=""` if decorative).

## Before you report back

1. `flock ... npm run build` passes with no warnings from your files, and `flock ... npx astro check` shows no errors in your files.
2. Screenshot each of your pages at 1440×900 and 390×844 (scroll through the whole page) and look at them. Fix overlaps, overflow, unreadable text, and anything that looks unlike the homepage.
3. No console errors, no failed requests, no horizontal scroll at 390px.
4. `grep` your files for `—`, `–`, `lovable`, `vercel`, `quickbooks`, `/login` used as a trial link, `demo@`.
5. Report: pages built, anything you couldn't carry over, every factual change you made to the old copy (especially legal pages), and any shared change you'd suggest.
