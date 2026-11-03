// Content for /ai (the scripted chat itself lives in src/data/ai-demo.ts).
// Facts: the assistant (questions, answers, alerts) is on every plan; actions are on Growth
// and Scale and nothing is sent or saved without approval (AI_ACTIONS_FOOTNOTE).
import type { Faq } from "./faq";

/** Example questions shown in the "Ask" mock. */
export const exampleQuestions = [
  "What is my best selling product this month?",
  "Which customers owe me money?",
  "What is my gross margin this quarter?",
  "Which batches expire in 30 days?",
];

export type Severity = "red" | "amber" | "green" | "blue";

/** The "Watch" mock: a morning's alerts. */
export const alertFeed: Array<{ tone: Severity; title: string; detail: string; when: string }> = [
  { tone: "red", title: "Critically low stock", detail: "3 products under 2 days of cover", when: "NOW" },
  { tone: "amber", title: "Expiring soon", detail: "A SaniWipe batch expires in 5 days", when: "08:58" },
  { tone: "red", title: "Overdue invoices", detail: "$24,500 outstanding", when: "08:30" },
  { tone: "amber", title: "Reorder suggestions", detail: "8 products below their reorder point", when: "08:00" },
  { tone: "green", title: "Quote accepted", detail: "NorthShore Hospital, $3,180", when: "YESTERDAY" },
  { tone: "blue", title: "PO overdue", detail: "ChemCo NZ, expected 3 days ago", when: "YESTERDAY" },
];

/** The "Act" mock: what Centra AI can do, each one waiting for a person to confirm. */
export const aiActions = [
  "Create draft purchase orders",
  "Update product prices",
  "Create draft quotes",
  "Create stock transfers",
  "Send quote follow-ups",
  "Update reorder settings",
];

/** Growth Intel: every alert, grouped. Counted on the page, so keep this list true. */
export const alertGroups: Array<{ id: string; name: string; icon: string; alerts: string[] }> = [
  {
    id: "inventory",
    name: "Inventory",
    icon: "box",
    alerts: [
      "Stock critically low (under 3 days)",
      "Stock below reorder point",
      "Negative stock on hand",
      "Dead stock (no sales in 90 days)",
      "Batch expiring within 7 days",
      "Batch expiring within 30 days",
      "Expired stock still on hand",
      "Batch quarantine backlog",
      "Cycle count suggestion ready",
    ],
  },
  {
    id: "purchasing",
    name: "Purchasing",
    icon: "cart",
    alerts: [
      "Reorder suggestions pending",
      "Purchase order overdue for delivery",
      "Supplier return unresolved",
    ],
  },
  {
    id: "sales",
    name: "Sales",
    icon: "file",
    alerts: [
      "Quote accepted, ready to convert",
      "Quote expiring soon",
      "Quote not viewed after sending",
      "Backorders awaiting fulfilment",
    ],
  },
  {
    id: "financial",
    name: "Financial",
    icon: "receipt",
    alerts: [
      "Invoice 7 days overdue",
      "Invoice 30 days overdue",
      "Customer approaching credit limit",
    ],
  },
  {
    id: "integrations",
    name: "Integrations",
    icon: "plug",
    alerts: [
      "Shopify sync failed",
      "Unmatched SKUs on Shopify orders",
    ],
  },
];

export const alertCount = alertGroups.reduce((n, g) => n + g.alerts.length, 0);
/** "Over 20": rounded down to the ten below, so it stays true as alerts are added. */
export const alertCountLabel = `Over ${Math.max(10, Math.floor((alertCount - 1) / 10) * 10)}`;

/** Safety: the four guardrails. */
export const guardrails: Array<{ icon: string; title: string; body: string }> = [
  {
    icon: "check",
    title: "Every action needs your OK",
    body: "Centra AI never acts without your explicit approval. It shows exactly what it's about to do (which products, which suppliers, which prices) before you confirm. One wrong click doesn't cost you money.",
  },
  {
    icon: "lock",
    title: "Your data never crosses businesses",
    body: "Centra AI can only ever see your business's data. Controls at the database level keep every business separate, even if someone tries to trick the AI.",
  },
  {
    icon: "shield",
    title: "It can't approve or delete",
    body: "It can create drafts and send messages you've approved. It can't post a stocktake, dispatch an order, approve a purchase order or delete anything. Irreversible steps stay with people.",
  },
  {
    icon: "file",
    title: "Every action is logged",
    body: "Everything Centra AI does is recorded in the AI Actions log: what it did, who approved it, when, and the result.",
  },
];

/** The AI Actions log mock. */
export const actionLog: Array<{ when: string; what: string; who: string; result: string; tone: "good" | "muted" }> = [
  { when: "09:12", what: "Created 2 draft POs for ChemCo NZ and SafeGuard Products", who: "Approved by Sam K.", result: "DRAFTS SAVED", tone: "good" },
  { when: "09:40", what: "Sent a quote follow-up to Pacific Hotels", who: "Approved by Sam K.", result: "SENT", tone: "good" },
  { when: "10:05", what: "Stock transfer, Auckland to Wellington", who: "Cancelled by Ana T.", result: "NOT CREATED", tone: "muted" },
  { when: "11:30", what: "Updated prices on 14 products", who: "Approved by Ana T.", result: "UPDATED", tone: "good" },
];

export const humanOnly = ["Post a stocktake", "Dispatch an order", "Approve a PO", "Delete anything"];

/** Shown on the page and used for the FAQPage JSON-LD, so keep both in step. Plain text. */
export const aiFaq: Faq[] = [
  {
    q: "What is Centra AI?",
    a: "An assistant built into Centra One that can see your inventory, orders, customers and finances. It answers questions from your real data and watches the business around the clock. On Growth and Scale it can also take action, with your approval.",
  },
  {
    q: "Which plans include Centra AI?",
    a: "Every plan includes the assistant: questions, answers and Growth Intel alerts. Actions, such as drafting purchase orders, quotes, stock transfers and follow-up emails, are included with Growth and Scale.",
  },
  {
    q: "Which AI model powers Centra AI?",
    a: "Claude, made by Anthropic.",
  },
  {
    q: "Can Centra AI do anything without my approval?",
    a: "No. Every action needs your confirmation first. It can create drafts and send messages you've approved, but it can't post a stocktake, dispatch an order, approve a purchase order or delete anything. Every action is recorded in the AI Actions log.",
  },
  {
    q: "Is my business data used to train AI models?",
    a: "No. Your data is only used to answer your questions, and it never crosses between businesses.",
  },
  {
    q: "How many Growth Intel alerts are there?",
    a: `${alertCountLabel}, covering inventory, purchasing, sales, finance and integrations. They need no setup: connect your data and they start arriving.`,
  },
];

/** Comparison: Centra AI against a general-purpose AI chat tool and no AI at all. */
export const aiCompare: Array<{ capability: string; centra: string; growth?: boolean }> = [
  { capability: "Knows your stock levels", centra: "Real-time" },
  { capability: "Knows your customers", centra: "Full history" },
  { capability: "Monitors the business 24/7", centra: "Automated" },
  { capability: "Takes action", centra: "With your confirmation", growth: true },
  { capability: "Built into your workflow", centra: "Native" },
  { capability: "Wholesale-specific", centra: "Purpose-built" },
  { capability: "Audit trail", centra: "Full log" },
];
