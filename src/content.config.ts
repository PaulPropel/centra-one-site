// Content collections: help centre articles and blog posts, written in Markdown.
//
// Help articles: src/content/help/<category>/<slug>.md, served at /help/<category>/<slug>.
// The folder is the category and must match a slug in src/data/help.ts.
// Blog posts: src/content/blog/<slug>.md, served at /blog/<slug>.
//
// Writing rules (see STYLE.md): no em or en dashes, and never type "--" or "---" inside a
// sentence, because Markdown's smart punctuation turns them into dashes. Use a full stop,
// comma or colon instead.
//
// Callouts are blockquotes whose first line is a bold label on its own:
//
//   > **Tip**
//   >
//   > Upload your logo as a PNG or JPG.
//
// The label picks the style: "Important", "Warning" or "Common mistake" are amber,
// labels starting "Formula" are formula boxes, "On the roadmap" is violet, anything else
// ("Tip", "Info", "Key distinction") is blue. See src/components/article/longform.ts.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/** "2026-06" (month known) or "2026-11-03" (exact day). */
const isoDate = z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/, "Use YYYY-MM or YYYY-MM-DD");

const help = defineCollection({
  loader: glob({ pattern: "*/*.md", base: "./src/content/help" }),
  schema: z.object({
    title: z.string(),
    /** One sentence. Used on cards, in search results and as the meta description. */
    summary: z.string().max(160),
    /** When the article's content last changed. */
    updated: isoDate,
    /** Sort order within its category. */
    order: z.number().int().default(1),
    /** Article ids ("<category>/<slug>") to suggest after this one, after same-category articles. */
    related: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    /** Meta description, under 160 characters. */
    description: z.string().max(160),
    /** Shown under the title. */
    subtitle: z.string(),
    category: z.string(),
    published: isoDate,
    updated: isoDate.optional(),
    /** Help articles ("<category>/<slug>") to link at the end of the post. */
    related: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { help, blog };
