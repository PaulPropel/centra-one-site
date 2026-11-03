// /rss.xml: the changelog as an RSS feed, newest first. Each item links to its entry's
// permanent anchor on /changelog, which is also its guid.
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { changelogEntries, CHANGE_TYPES } from "../data/changelog";
import { SITE_URL } from "../data/site";

export function GET(context: APIContext) {
  const site = context.site?.href ?? SITE_URL;
  return rss({
    title: "Centra One changelog",
    description: "What we've shipped, and when. Every release to Centra One, in the open.",
    // The channel links to the changelog page; item links resolve against it.
    site: new URL("/changelog", site).href,
    trailingSlash: false,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      "<language>en-nz</language>",
      `<atom:link href="${new URL("/rss.xml", site).href}" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: changelogEntries.map((entry) => ({
      title: `${CHANGE_TYPES[entry.type].tag}: ${entry.title}`,
      link: `/changelog#${entry.id}`,
      pubDate: new Date(`${entry.month.date}T00:00:00Z`),
      description: entry.body,
      categories: [CHANGE_TYPES[entry.type].tag],
    })),
  });
}
