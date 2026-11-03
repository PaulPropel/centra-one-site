// The /contact enquiry router and its quick answers.
// Field names must match the enquiry Worker (worker/index.ts): kind, name, email, company,
// revenue, users, warehouses, account, message, plus the honeypot "website" and "started".
import type { Faq } from "./faq";
import { LOGIN_URL } from "./site";

export type EnquiryKind = "demo" | "pricing" | "enterprise" | "support" | "partner" | "other";

/** Optional field groups a route can show besides name, email and message. "users" is the
 * users needed and warehouses pair (enterprise). */
export type EnquiryField = "company" | "revenue" | "users" | "account";

export interface EnquiryRoute {
  kind: EnquiryKind;
  title: string;
  subtitle: string;
  /** Label in the "What do you need?" select (the no-JavaScript form). */
  option: string;
  icon: "calendar" | "tag" | "layers" | "help" | "users" | "message";
  fields: EnquiryField[];
  messageLabel: string;
  messagePlaceholder: string;
  /** Shown under the message box. */
  hint?: string;
  /** Shown next to the Send button. Static, trusted HTML. */
  expectation?: string;
}

export const enquiryRoutes: EnquiryRoute[] = [
  {
    kind: "demo",
    title: "Book a walkthrough",
    subtitle: "See it running on your own numbers",
    option: "Book a walkthrough",
    icon: "calendar",
    fields: ["company", "revenue"],
    messageLabel: "What would you like to see?",
    messagePlaceholder: "Tell us about your business: what you sell, how many SKUs, what you run today.",
    hint: "Bring your product list and we'll demo on your data.",
    expectation: "We'll be in touch to arrange a time.",
  },
  {
    kind: "pricing",
    title: "Question about pricing",
    subtitle: "Plans, tiers, users, billing",
    option: "Question about pricing",
    icon: "tag",
    fields: ["company", "revenue"],
    messageLabel: "Your question",
    messagePlaceholder: "What would you like to know?",
    expectation: 'Most pricing questions are answered on the <a href="/pricing">pricing page</a>.',
  },
  {
    kind: "enterprise",
    title: "Enterprise pricing",
    subtitle: "Revenue over $5M",
    option: "Enterprise pricing (revenue over $5M)",
    icon: "layers",
    fields: ["company", "users"],
    messageLabel: "Requirements",
    messagePlaceholder: "Integrations, SLA needs, migration from an existing system…",
    expectation: "Custom pricing, unlimited users, SLA guarantees.",
  },
  {
    kind: "support",
    title: "I need help",
    subtitle: "Existing customer support",
    option: "I need help (existing customers)",
    icon: "help",
    fields: ["account"],
    messageLabel: "What's happening?",
    messagePlaceholder: "Describe the issue and where you saw it.",
    expectation: `Support is usually fastest from <a href="${LOGIN_URL}">inside the platform</a>.`,
  },
  {
    kind: "partner",
    title: "Partnership or press",
    subtitle: "Integrations, resellers, media",
    option: "Partnership or press",
    icon: "users",
    fields: ["company"],
    messageLabel: "Tell us more",
    messagePlaceholder: "What are you proposing?",
  },
  {
    kind: "other",
    title: "Something else",
    subtitle: "Anything not covered above",
    option: "Something else",
    icon: "message",
    fields: [],
    messageLabel: "Message",
    messagePlaceholder: "How can we help?",
  },
];

/** Annual revenue choices. The chosen text is what lands in the enquiry email. */
export const revenueBands = ["Under $1M", "$1M to $2.5M", "$2.5M to $5M", "Over $5M"];

/** Same limits as the Worker, so the browser stops overlong input before it's sent. */
export const fieldLimits = {
  name: 120,
  email: 255,
  company: 200,
  users: 40,
  warehouses: 40,
  account: 200,
  message: 5000,
} as const;

/** Messages the Worker can send back in ?error= after a no-JavaScript post. Anything else in
 * the URL is shown as a generic message, so nobody can put their own words on this page. */
export const workerErrors = [
  "Please send this from the Centra One website.",
  "That message is too long to send.",
  "Please check the form and try again.",
  "Please tell us your name.",
  "Please add a work email.",
  "That email doesn't look right.",
  "That's a bit long. Please shorten it and try again.",
  "We couldn't send that just now. Please email us directly.",
];

/** Quick answers. Footnote 1 is AI_ACTIONS_FOOTNOTE on /contact. */
export const contactFaq: Faq[] = [
  {
    q: "How much does it cost?",
    a: 'Plans start at US$59 a month and are priced on your annual revenue. Every plan runs the full platform, and bigger plans add more users, Centra AI actions<sup>1</sup> and more hands-on help. <a href="/pricing">See full pricing</a>.',
  },
  {
    q: "Can I try it before committing?",
    a: "Yes. Start a 30-day free trial with no credit card, and cancel any time before it ends.",
  },
  {
    q: "Do you integrate with Xero and Shopify?",
    a: 'Yes. Both are live, along with Aramex and Bascik Transport for freight. MYOB, WooCommerce, Stripe payments and API access are coming soon. <a href="/integrations">See what syncs</a>.',
  },
  {
    q: "How long does setup take?",
    a: "Importing products, customers and suppliers takes under an hour. Most businesses are running within a day.",
  },
  {
    q: "My revenue is over $5M. What then?",
    a: 'We do custom pricing above $5M: unlimited users, dedicated support, custom integrations and SLA guarantees. <a href="/contact?kind=enterprise#form">Choose Enterprise pricing</a> and tell us about your operation.',
  },
];
