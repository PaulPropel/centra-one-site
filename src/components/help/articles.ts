// Loads the help centre articles from the content collection, in category order, with
// everything the hub, search and article pages need. Build-time only.
import { getCollection } from "astro:content";
import { helpCategories, getHelpCategory, type HelpCategory } from "../../data/help";
import { htmlToText, readingMinutes, type Heading } from "../article/longform";

export interface HelpArticle {
  /** "<category>/<slug>", the content collection id. */
  id: string;
  slug: string;
  category: HelpCategory;
  url: string;
  title: string;
  summary: string;
  updated: string;
  order: number;
  related: string[];
  html: string;
  headings: Heading[];
  /** Plain text of the body, for search. */
  text: string;
  minutes: number;
}

export async function getHelpArticles(): Promise<HelpArticle[]> {
  const entries = await getCollection("help");
  const articles = entries.map((entry): HelpArticle => {
    const [categorySlug, slug] = entry.id.split("/");
    const category = getHelpCategory(categorySlug);
    if (!category || !slug) {
      throw new Error(
        `Help article "${entry.id}" must live in src/content/help/<category>/<slug>.md, with a category listed in src/data/help.ts.`,
      );
    }
    const html = entry.rendered?.html ?? "";
    const text = htmlToText(html);
    return {
      id: entry.id,
      slug,
      category,
      url: `/help/${category.slug}/${slug}`,
      title: entry.data.title,
      summary: entry.data.summary,
      updated: entry.data.updated,
      order: entry.data.order,
      related: entry.data.related,
      html,
      headings: (entry.rendered?.metadata?.headings ?? []) as Heading[],
      text,
      minutes: readingMinutes(text),
    };
  });

  const categoryIndex = (a: HelpArticle) => helpCategories.indexOf(a.category);
  return articles.sort(
    (a, b) => categoryIndex(a) - categoryIndex(b) || a.order - b.order || a.title.localeCompare(b.title),
  );
}

/** Up to `count` other articles: same category first, then the article's own picks, then the rest in order. */
export function relatedArticles(article: HelpArticle, all: HelpArticle[], count = 3): HelpArticle[] {
  const others = all.filter((a) => a.id !== article.id);
  const sameCategory = others.filter((a) => a.category.slug === article.category.slug);
  const picked = article.related
    .map((id) => others.find((a) => a.id === id))
    .filter((a): a is HelpArticle => a !== undefined);
  const ordered = new Set([...sameCategory, ...picked, ...others]);
  return [...ordered].slice(0, count);
}

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}
