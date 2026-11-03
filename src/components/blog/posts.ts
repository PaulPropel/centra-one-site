// Blog posts from the content collection, newest first, with what the index and post pages
// need. Drafts are left out. Build-time only.
import { getCollection } from "astro:content";
import { htmlToText, readingMinutes, type Heading } from "../article/longform";

export interface BlogPost {
  id: string;
  url: string;
  title: string;
  description: string;
  subtitle: string;
  category: string;
  published: string;
  updated?: string;
  related: string[];
  html: string;
  headings: Heading[];
  minutes: number;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const entries = await getCollection("blog", ({ data }) => !data.draft);
  return entries
    .map((entry): BlogPost => {
      const html = entry.rendered?.html ?? "";
      return {
        id: entry.id,
        url: `/blog/${entry.id}`,
        title: entry.data.title,
        description: entry.data.description,
        subtitle: entry.data.subtitle,
        category: entry.data.category,
        published: entry.data.published,
        updated: entry.data.updated,
        related: entry.data.related,
        html,
        headings: (entry.rendered?.metadata?.headings ?? []) as Heading[],
        minutes: readingMinutes(htmlToText(html)),
      };
    })
    .sort((a, b) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title));
}
