// Help centre categories, in display order. Articles live in src/content/help/<category>/<slug>.md
// (see src/content.config.ts). Article counts are always computed from the content, never typed in.
import type { IconName } from "../components/Icon.astro";

export interface HelpCategory {
  slug: string;
  title: string;
  description: string;
  icon: IconName;
}

export const helpCategories: HelpCategory[] = [
  { slug: "getting-started", title: "Getting started", description: "New to Centra One? Start here.", icon: "rocket" },
  { slug: "inventory", title: "Inventory management", description: "Products, stock, warehouses and movements.", icon: "box" },
  { slug: "sales", title: "Sales and quoting", description: "Orders, quotes, invoices and customers.", icon: "file" },
  { slug: "purchasing", title: "Purchasing", description: "Purchase orders, suppliers and goods receipt.", icon: "cart" },
  { slug: "ai-features", title: "Centra AI", description: "Questions, alerts and Centra AI actions.", icon: "sparkles" },
  { slug: "integrations", title: "Integrations", description: "Xero, Shopify and freight carriers.", icon: "plug" },
  { slug: "portal", title: "B2B portal", description: "Setting up and running your customer portal.", icon: "users" },
  { slug: "settings", title: "Settings and admin", description: "Account, billing, users and configuration.", icon: "settings" },
  { slug: "troubleshooting", title: "Troubleshooting", description: "Common issues and how to fix them.", icon: "help" },
];

export const helpCategorySlugs = helpCategories.map((c) => c.slug);

export function getHelpCategory(slug: string): HelpCategory | undefined {
  return helpCategories.find((c) => c.slug === slug);
}
