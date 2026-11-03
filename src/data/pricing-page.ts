// Content for /pricing beyond the plans themselves (those live in src/data/pricing.ts).

/** The core of the platform that comes with every plan, grouped for scanning. */
export const coreFeatures: Array<{ group: string; items: string[] }> = [
  {
    group: "Inventory",
    items: [
      "Real-time stock on hand",
      "Multi-warehouse",
      "Bin and location tracking",
      "Batch and lot tracking",
      "Expiry tracking with FEFO",
      "Serial numbers and warranty",
      "Stock transfers",
      "Assembly, kitting and BOM",
      "Automated ABC cycle counts",
      "Mobile stocktake",
    ],
  },
  {
    group: "Sales",
    items: [
      "Sales orders",
      "Full CPQ-style quoting",
      "Online quote acceptance",
      "Backorder management",
      "Customer price tiers",
    ],
  },
  {
    group: "Purchasing and fulfilment",
    items: [
      "Purchase orders",
      "Reorder point automation",
      "Goods receipt",
      "Supplier returns",
      "Customer returns and credit notes",
      "Pick, pack, ship",
    ],
  },
  {
    group: "Channels and AI",
    items: ["Branded B2B portal", "Shopify integration", "Centra AI assistant", "Over 20 Growth Intel alerts"],
  },
];

/** own = Centra One's edge, yes = has it, no = missing or weaker, plain = neutral. */
export type Tone = "own" | "yes" | "no" | "plain";

export interface CompareCell {
  text: string;
  tone?: Tone;
  /** Growth and Scale only. */
  growth?: boolean;
  /** Footnote number to attach (AI actions). */
  footnote?: number;
}

export interface CompareRow {
  feature: string;
  cells: CompareCell[];
}

export interface CompareGroup {
  title: string;
  open?: boolean;
  rows: CompareRow[];
}

const yes: CompareCell = { text: "Yes", tone: "yes" };
const none: CompareCell = { text: "None", tone: "no" };
const allYes = (feature: string): CompareRow => ({ feature, cells: [yes, yes, yes] });

export const competitors = ["Centra One", "Cin7 Core", "Unleashed"];

/** Based on publicly available information as of June 2026 (say so wherever this is shown). */
export const comparison: CompareGroup[] = [
  {
    title: "Pricing & commercial",
    open: true,
    rows: [
      {
        feature: "Starting price",
        cells: [
          { text: "From US$59 a month", tone: "own" },
          { text: "About US$349 a month", tone: "no" },
          { text: "About US$399 a month", tone: "no" },
        ],
      },
      {
        feature: "Free trial",
        cells: [
          { text: "30 days, no card", tone: "own" },
          { text: "Demo only", tone: "no" },
          { text: "14 days", tone: "plain" },
        ],
      },
      {
        feature: "Price transparency",
        cells: [
          { text: "Public pricing", tone: "own" },
          { text: "Hidden add-on costs", tone: "no" },
          { text: "Public pricing", tone: "yes" },
        ],
      },
    ],
  },
  {
    title: "Inventory management",
    rows: [
      allYes("Real-time stock on hand"),
      allYes("Multi-warehouse"),
      { feature: "Bin and location tracking", cells: [yes, yes, { text: "Limited", tone: "no" }] },
      {
        feature: "Batch and lot tracking",
        cells: [{ text: "Full lifecycle", tone: "own" }, { text: "Available", tone: "plain" }, { text: "Basic", tone: "no" }],
      },
      {
        feature: "Expiry date tracking",
        cells: [{ text: "FEFO built in", tone: "own" }, { text: "Limited", tone: "no" }, yes],
      },
      {
        feature: "Serial number tracking",
        cells: [{ text: "Full, with warranty", tone: "own" }, { text: "Available", tone: "plain" }, { text: "Basic", tone: "no" }],
      },
      allYes("Stock transfers"),
      allYes("Assembly, kitting and BOM"),
      {
        feature: "Cycle counts (ABC)",
        cells: [{ text: "Automated daily", tone: "own" }, { text: "Manual", tone: "no" }, { text: "Basic", tone: "no" }],
      },
      allYes("Mobile stocktake"),
      {
        feature: "Landed costs",
        cells: [{ text: "Multi-currency, 4 methods", tone: "own", growth: true }, yes, { text: "Limited", tone: "no" }],
      },
    ],
  },
  {
    title: "Sales & quoting",
    rows: [
      allYes("Sales orders"),
      {
        feature: "Quote management",
        cells: [{ text: "Full CPQ-style", tone: "own" }, { text: "Basic", tone: "no" }, { text: "Limited", tone: "no" }],
      },
      allYes("Online quote acceptance"),
      allYes("Optional line items"),
      { feature: "Quote approval workflow", cells: [yes, { text: "Via tasks", tone: "plain" }, yes] },
      allYes("Quote templates"),
      allYes("Quote analytics"),
      allYes("Backorder management"),
      allYes("Customer price tiers"),
    ],
  },
  {
    title: "Purchasing",
    rows: [
      allYes("Purchase orders"),
      {
        feature: "Reorder point automation",
        cells: [{ text: "Daily suggestions, bulk draft POs", tone: "own" }, yes, yes],
      },
      allYes("Goods receipt"),
      {
        feature: "Multi-currency POs",
        cells: [{ text: "With FX variance tracking", tone: "own", growth: true }, yes, { text: "Basic", tone: "no" }],
      },
      allYes("Supplier returns"),
    ],
  },
  {
    title: "Returns, fulfilment & B2B",
    rows: [
      {
        feature: "Customer returns (RMA)",
        cells: [{ text: "Full workflow and credit notes", tone: "own" }, { text: "Basic", tone: "no" }, { text: "Basic", tone: "no" }],
      },
      allYes("Pick, pack, ship"),
      {
        feature: "Carrier integrations",
        cells: [yes, { text: "Some carriers", tone: "plain" }, { text: "Limited in NZ", tone: "no" }],
      },
      {
        feature: "B2B customer portal",
        cells: [{ text: "Branded, white-label", tone: "own" }, { text: "Basic", tone: "no" }, none],
      },
    ],
  },
  {
    title: "AI & intelligence",
    open: true,
    rows: [
      { feature: "AI assistant", cells: [{ text: "Full business context", tone: "own" }, none, none] },
      {
        feature: "AI takes actions",
        cells: [{ text: "Creates POs, quotes, transfers", tone: "own", growth: true, footnote: 1 }, none, none],
      },
      {
        feature: "Growth alerts",
        cells: [{ text: "Over 20 automated alerts", tone: "own" }, { text: "Basic reporting", tone: "no" }, { text: "Basic", tone: "no" }],
      },
      {
        feature: "ABC inventory analysis",
        cells: [{ text: "Automated daily", tone: "own" }, { text: "Manual", tone: "no" }, { text: "Manual", tone: "no" }],
      },
      {
        feature: "Demand forecasting",
        cells: [{ text: "On the roadmap", tone: "no" }, { text: "Basic", tone: "no" }, { text: "Basic", tone: "no" }],
      },
    ],
  },
];
