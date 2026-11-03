// Scripted Centra AI conversations for the "Just ask" demo (homepage and /ai).
// Strings may contain <strong>; they are static and trusted. Keep the BioGuard story
// consistent everywhere: it runs out next Tuesday, ChemCo NZ takes 5 days to deliver.

export interface DemoItem {
  html: string;
  tone?: "amber" | "red" | "blue";
}
export interface DemoConvo {
  id: string;
  kind: string;
  question: string;
  lead: string;
  items?: DemoItem[];
  stats?: Array<{ label: string; value: string }>;
  tail?: string;
  action?: { title: string; detail: string };
}

export const conversations: DemoConvo[] = [
  {
    id: "focus",
    kind: "Analysis",
    question: "What should I focus on today?",
    lead: "Good morning. Three things need you today:",
    items: [
      {
        tone: "amber",
        html: "<strong>BioGuard Disinfectant 5L</strong> runs out next Tuesday, and ChemCo NZ takes 5 days to deliver. Order today.",
      },
      {
        tone: "amber",
        html: "Quote <strong>QT-2026-0041</strong> for Pacific Hotels ($9,400) was opened yesterday but not accepted. A follow-up could help.",
      },
      { tone: "red", html: "Invoice <strong>INV-2026-0003</strong> for NorthShore Hospital ($4,200) is 14 days overdue." },
    ],
    tail: "Want me to action any of these?",
  },
  {
    id: "reorder",
    kind: "Action",
    question: "What needs reordering?",
    lead: "3 products will run out before their next delivery:",
    items: [
      { tone: "amber", html: "<strong>BioGuard Disinfectant 5L</strong>: 7 days of stock, 5-day lead time" },
      { tone: "amber", html: "<strong>SealTight Safety Goggles</strong>: 9 days of stock, 8-day lead time" },
      { tone: "amber", html: "<strong>PalmCare Foam Soap</strong>: 5 days of stock, 4-day lead time" },
    ],
    tail: "I can draft purchase orders for these now, grouped by supplier. Shall I?",
    action: {
      title: "Create draft purchase orders",
      detail: "3 products across 2 suppliers. Saved as drafts for your review.",
    },
  },
  {
    id: "stock",
    kind: "Ask",
    question: "How much Hand Sanitiser 5L do we have?",
    lead: "You have <strong>142 units</strong> across 2 warehouses.",
    stats: [
      { label: "Auckland", value: "96" },
      { label: "Wellington", value: "46" },
    ],
    tail: "That's about 18 days of stock at current sales.",
  },
  {
    id: "all-pos",
    kind: "Action",
    question: "Create POs for everything that needs reordering",
    lead: "I found 8 products below their reorder point across 4 suppliers. I can create:",
    items: [
      { tone: "blue", html: "PO for <strong>ChemCo NZ</strong>: 3 products, est. $4,200" },
      { tone: "blue", html: "PO for <strong>SafeGuard Products</strong>: 2 products, est. $1,800" },
      { tone: "blue", html: "PO for <strong>PaperPro Supplies</strong>: 2 products, est. $890" },
      { tone: "blue", html: "PO for <strong>PackRight Industries</strong>: 1 product, est. $320" },
    ],
    tail: "Total estimated value: <strong>$7,210</strong>. They'll be saved as drafts for your review. Shall I create them?",
    action: {
      title: "Create 4 draft purchase orders",
      detail: "8 products across 4 suppliers. Drafts only, nothing is sent.",
    },
  },
  {
    id: "quiet",
    kind: "Intelligence",
    question: "Which customers have gone quiet?",
    lead: "Based on how often and how recently they order, 3 customers have slowed down:",
    items: [
      { tone: "amber", html: "<strong>BrightClean Services</strong>: last ordered 47 days ago, usually every 2 weeks" },
      { tone: "amber", html: "<strong>Gold Coast Hospitality Group</strong>: order value down 60% on last quarter" },
      { tone: "amber", html: "<strong>SafeWork Industries</strong>: no orders since raising a complaint 3 weeks ago" },
    ],
    tail: "Want me to draft follow-up emails?",
  },
];
