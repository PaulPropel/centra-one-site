// Every Centra One release, newest month first. Used by /changelog and /rss.xml.
// Entry ids are permanent anchors (/changelog#<id>) and RSS guids: never change or reuse one.
// Add new months at the top. Counts on the page are computed from this list.

export type ChangeType = "new" | "imp" | "int" | "ai";

/** Label on each entry, and the label of its filter (filters are plural where it reads better). */
export const CHANGE_TYPES: Record<ChangeType, { tag: string; filter: string }> = {
  new: { tag: "New", filter: "New" },
  imp: { tag: "Improved", filter: "Improved" },
  int: { tag: "Integration", filter: "Integrations" },
  ai: { tag: "AI", filter: "AI" },
};

export interface ChangeEntry {
  id: string;
  type: ChangeType;
  title: string;
  body: string;
  /** Mentions Centra AI actions, so it carries the AI actions footnote (Growth and Scale plans). */
  aiActions?: boolean;
}

export interface ChangeMonth {
  label: string;
  /** First day of the month (YYYY-MM-DD). Used as the RSS publication date. */
  date: string;
  entries: ChangeEntry[];
}

export const changelog: ChangeMonth[] = [
  {
    label: "July 2026",
    date: "2026-07-01",
    entries: [
      {
        id: "tax-rate-management",
        type: "new",
        title: "Tax rate management",
        body: "Manage your own GST and zero-rated tax rates in settings, with per-line tax resolution across invoices, sales orders and purchase orders. Sensible NZ defaults are seeded for every new business.",
      },
      {
        id: "xero-tax-and-account-mapping",
        type: "int",
        title: "Corrected Xero tax and account mapping",
        body: "Per-line tax now resolves to the right Xero tax type instead of a single default, inclusive and exclusive pricing are both handled, and a pre-flight check blocks a sync before it can post incomplete data to your books.",
      },
      {
        id: "invoices-sync-as-awaiting-approval",
        type: "imp",
        title: "Invoices sync as Awaiting Approval",
        body: "Invoices pushed to Xero now land in Awaiting Approval rather than posting as approved, so a human reviews before anything hits the ledger.",
      },
    ],
  },
  {
    label: "June 2026",
    date: "2026-06-01",
    entries: [
      {
        id: "shopify-integration",
        type: "int",
        title: "Shopify integration",
        body: "Connect a Shopify store and stop overselling: stock levels push to Shopify every fifteen minutes, Shopify orders arrive as sales orders, and fulfilment and tracking numbers go back to the store on dispatch. Centra One warehouses map to Shopify locations, so multi-location sellers get the right number in the right place.",
      },
      {
        id: "xero-sync-reliability",
        type: "int",
        title: "Xero sync reliability",
        body: "Contacts, invoices and bills push to Xero far more reliably, and a missing mapping now surfaces as a clear, named error instead of failing silently. Xero remains a one-way push from Centra One. Pulling changes back from Xero is not live yet, and we will say so here on the day it is.",
      },
      {
        id: "ai-agentic-actions",
        type: "ai",
        title: "Centra AI can take action",
        body: "Centra AI stopped being advice-only. It can draft purchase orders from reorder suggestions, update prices in bulk, raise draft quotes and stock transfers, and chase quote follow-ups. Every action is gated behind your explicit confirmation and written to an audit trail in Settings.",
        aiActions: true,
      },
      {
        id: "sales-redesign",
        type: "new",
        title: "Sales redesign",
        body: "Sales orders, quotes, invoices and payments rebuilt around status buckets and fulfilment progress, so you can see what is stuck rather than scrolling a flat list. Adds quote pipeline, AR ageing and a sales overview.",
      },
      {
        id: "customer-records-rebuilt",
        type: "new",
        title: "Customer records rebuilt",
        body: "The customer list now shows open orders, twelve-month spend, open balance and last order date at a glance, with full sales history on each customer: the questions a rep asks before picking up the phone.",
      },
      {
        id: "natural-language-product-search",
        type: "ai",
        title: "Natural-language product search",
        body: "Describe what you are looking for in plain English, like “cables under $50 with low stock”, and Centra AI turns it into a filtered product list.",
      },
      {
        id: "stock-transfers-and-assembly",
        type: "new",
        title: "Stock transfers and assembly / BOM",
        body: "Move stock between warehouses through a draft → dispatched → received workflow with partial receipts and variance tracking. Build kits from components with bills of materials, assembly orders and FEFO-aware kit resolution at dispatch.",
      },
      {
        id: "user-permissions",
        type: "new",
        title: "User roles and permissions",
        body: "Sales Rep, Warehouse Staff, Accounts and Read Only roles with per-user overrides, and cost price and margin visibility gated by role, so you can give the warehouse a login without showing them your buy prices.",
      },
      {
        id: "cycle-counts-and-abc",
        type: "new",
        title: "Cycle counts and ABC classification",
        body: "Products are classified A/B/C by stock value and counted on a rotating schedule, so inventory stays accurate without shutting the warehouse for a stocktake. Includes manager review of suggestions, a twelve-week accuracy trend and a recurring-variance report.",
      },
    ],
  },
  {
    label: "May 2026",
    date: "2026-05-01",
    entries: [
      {
        id: "interactive-quotes",
        type: "new",
        title: "Interactive quotes with optional items",
        body: "Quotes became documents the customer can work with: optional line items they tick on or off, either/or choice groups, and a total that updates live before they accept. Adds quote templates, per-line margin badges and an acceptance-rate dashboard.",
      },
      {
        id: "digital-quote-acceptance",
        type: "new",
        title: "Digital quote acceptance and approvals",
        body: "Quotes are sent as a branded link and accepted online with no customer login, with view tracking, expiry dates, versioning and an internal approval step before anything goes out. No more PDF attachments and manual chasing.",
      },
      {
        id: "purchasing-redesign",
        type: "new",
        title: "Purchasing redesign",
        body: "Purchase orders reorganised into open, received and closed buckets with overdue flagging, plus a purchasing overview showing on-order value and what is due in this week.",
      },
      {
        id: "reorder-point-automation",
        type: "new",
        title: "Reorder point automation",
        body: "Daily reorder suggestions based on projected stock including open POs, scored Critical to Low, grouped by supplier and turned into draft purchase orders with one click. The purchasing manager stops checking stock levels by hand every Monday.",
      },
      {
        id: "goods-receipt-improvements",
        type: "imp",
        title: "Goods receipt improvements",
        body: "Receipting screens consolidated with discrepancy flagging, so a short delivery is caught at the dock rather than at invoice-matching time.",
      },
      {
        id: "inventory-redesign",
        type: "new",
        title: "Inventory redesign",
        body: "Product list cut back to the columns that matter, with server-side stock and margin sorting, low-stock filtering, and an overview carrying reorder and stock-value tiles.",
      },
    ],
  },
  {
    label: "April 2026",
    date: "2026-04-01",
    entries: [
      {
        id: "growth-intel-alerts",
        type: "ai",
        title: "Growth Intel alerts",
        body: "Over twenty automated alerts covering inventory, purchasing, sales, financial and integration health: dead stock, margin erosion, overdue POs, customers going quiet. No configuration. They simply start arriving.",
      },
      {
        id: "batch-lot-tracking",
        type: "new",
        title: "Batch/lot tracking with FEFO",
        body: "Full traceability from receipt to dispatch: batch lifecycle with quarantine and write-off, FEFO picking suggestions, use-by / best-before / retest expiry types, 7- and 30-day expiry alerts, and a shelf-life check at goods receipt. Serial numbers and warranty tracking ship alongside.",
      },
      {
        id: "landed-costs-and-fx",
        type: "new",
        title: "Landed costs and multi-currency FX",
        body: "Know what imported stock actually cost you: four landed-cost allocation methods feeding average cost on receipt, multi-currency POs with payment schedules, planned-versus-actual FX variance and a blended rate across multiple payments.",
      },
      {
        id: "theme-system",
        type: "imp",
        title: "Theme system",
        body: "Multiple visual themes with your preference remembered across sessions and devices.",
      },
    ],
  },
  {
    label: "March 2026",
    date: "2026-03-01",
    entries: [
      {
        id: "centra-one-launch",
        type: "new",
        title: "Centra One launches",
        body: "The first production release: products and inventory, purchase orders and goods receipt, sales orders with pick/pack/ship, customers and suppliers, multi-warehouse stock on hand, stocktake with a mobile counting screen, backorders, returns with credit notes, a stock movements ledger and a service desk. Enough to retire the spreadsheets on day one.",
      },
      {
        id: "b2b-customer-portal",
        type: "new",
        title: "B2B customer portal",
        body: "Customers place their own orders against their own pricing in a branded portal, with order history and document downloads. It launched with the document designer for invoices and quotes.",
      },
      {
        id: "xero-accounting-integration",
        type: "int",
        title: "Xero accounting integration",
        body: "Contacts, invoices and bills push from Centra One into Xero, so the books stay current without re-keying. Push only: Centra One is the system of record for orders and stock.",
      },
      {
        id: "ai-playbooks-and-onboarding",
        type: "ai",
        title: "AI playbooks and onboarding",
        body: "Playbook automation for repetitive operational work, and a guided onboarding wizard that gets products, customers and opening stock into the system in an afternoon.",
      },
    ],
  },
];

/** Every entry, newest first, with its month. */
export const changelogEntries = changelog.flatMap((month) => month.entries.map((entry) => ({ ...entry, month })));

export const changelogCounts: Record<"all" | ChangeType, number> = {
  all: changelogEntries.length,
  new: changelogEntries.filter((e) => e.type === "new").length,
  imp: changelogEntries.filter((e) => e.type === "imp").length,
  int: changelogEntries.filter((e) => e.type === "int").length,
  ai: changelogEntries.filter((e) => e.type === "ai").length,
};
