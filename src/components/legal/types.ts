// Shape of a legal document (/privacy, /terms) rendered by LegalPage.astro.

export interface LegalSection {
  /** Anchor id. Kept the same as the old site so existing links still land. */
  id: string;
  title: string;
  /** Section body. Static, trusted HTML (paragraphs, lists, h3, blockquote, dl). */
  html: string;
}

export interface LegalDoc {
  /** H1 and <title>, sentence case. */
  title: string;
  description: string;
  intro: string;
  path: string;
  /** "3 November 2026" and its ISO date. */
  updated: string;
  updatedIso: string;
  sections: LegalSection[];
  /** The other legal page, linked under the table of contents. */
  related: { href: string; label: string };
}
