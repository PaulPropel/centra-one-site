// Single source of truth for plans and prices. Used by the homepage, /pricing and llms.txt.
// Prices are USD per month, billed monthly per organisation.

export interface Plan {
  id: "starter" | "growth" | "scale";
  name: string;
  price: number;
  band: string;
  users: number;
  blurb: string;
  /** Shown above the feature list for higher tiers ("Everything in Starter, plus:"). */
  intro?: string;
  /** Short list for the homepage. HTML allowed (for footnote markers). Static, trusted content only. */
  features: string[];
  /** Longer list for /pricing (falls back to `features`). Same HTML rules. */
  details?: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 59,
    band: "Up to $1M revenue",
    users: 3,
    blurb: "Everything you need to run your wholesale business from day one.",
    features: [
      "Inventory, orders and purchasing",
      "Quoting with online acceptance",
      "B2B customer portal",
      "Shopify integration",
      "Centra AI assistant",
    ],
    details: [
      "Full inventory management",
      "Unlimited products and warehouses",
      "Sales orders and purchase orders",
      "Quoting with online acceptance",
      "B2B customer portal",
      "Shopify integration",
      "Centra AI assistant",
      "Batch, serial and expiry tracking",
      "Reorder automation",
      "All reporting",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 129,
    band: "$1M to $2.5M revenue",
    users: 5,
    popular: true,
    blurb: "For growing wholesale businesses scaling their operations.",
    intro: "Everything in Starter, plus:",
    features: [
      "Centra AI actions<sup>1</sup>",
      "Multi-currency and landed costs",
      "Custom document templates",
      "Dedicated onboarding session",
      "Priority email support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: 199,
    band: "$2.5M to $5M revenue",
    users: 10,
    blurb: "For established wholesale operations running at scale.",
    intro: "Everything in Growth, plus:",
    features: [
      "Phone support",
      "Quarterly business review",
      "Custom integrations consultation",
      "Early access to new features",
      "API access (coming soon)",
    ],
  },
];

export const EXTRA_USER_PRICE = 15;
export const TRIAL_DAYS = 30;

/** Footnote 1 on any page that mentions Centra AI actions. */
export const AI_ACTIONS_FOOTNOTE =
  "Drafting purchase orders, follow-ups and other Centra AI actions are included with the Growth and Scale plans. Nothing is sent until you approve it.";

export const PRICING_FOOTNOTE =
  "Prices are in US dollars and billed monthly per organisation. Revenue bands are annual wholesale revenue. Product screens and figures are illustrative.";

/** Revenue finder notes, keyed by recommended plan. */
export const finderNotes: Record<string, string> = {
  starter: "Starter runs the full platform for businesses finding their feet, with up to 3 users.",
  growth: "Growth adds Centra AI actions, multi-currency and landed costs, and a dedicated onboarding session.",
  scale: "Scale adds phone support, quarterly business reviews and early access to new features.",
  custom: "Over $5M, we'll build a plan around you: unlimited users, dedicated support, custom integrations and SLA guarantees.",
};
