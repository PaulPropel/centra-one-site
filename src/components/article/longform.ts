// Helpers for long-form Markdown (help articles and blog posts). Build-time only.

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export type CalloutKind = "tip" | "warn" | "formula" | "roadmap";

/** Picks a callout style from its label. See the notes in src/content.config.ts. */
export function calloutKind(label: string): CalloutKind {
  const l = label.trim().toLowerCase();
  if (/^(important|warning|caution|common mistake)\b/.test(l)) return "warn";
  if (l.startsWith("formula")) return "formula";
  if (/^(on the roadmap|roadmap)\b/.test(l)) return "roadmap";
  return "tip";
}

/**
 * Turns a blockquote that starts with a bold label on its own line
 * (`> **Tip**`, blank `>` line, then the text) into a styled callout.
 * Any other blockquote is left as it is and keeps the plain .prose style.
 */
export function enhanceCallouts(html: string): string {
  return html.replace(/<blockquote>\s*<p><strong>([^<]{1,60})<\/strong><\/p>/g, (_match, label: string) => {
    const kind = calloutKind(label);
    return `<blockquote class="callout callout-${kind}"><p class="callout-label">${label}</p>`;
  });
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** Plain text of rendered HTML, for search and reading time. */
export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
      if (code[0] === "#") {
        const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
        return Number.isFinite(n) ? String.fromCodePoint(n) : match;
      }
      return ENTITIES[code.toLowerCase()] ?? match;
    })
    .replace(/\s+/g, " ")
    .trim();
}

/** Minutes to read, at a steady 220 words a minute, never less than one. */
export function readingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-06" or "2026-06-14" → "June 2026". */
export function monthYear(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}
