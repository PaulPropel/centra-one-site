// Content for /features: the module explorer, "the short version", "why it's different"
// and the one-record timeline. Strings marked HTML may contain <sup> footnote markers only.
//
// Plan facts come from src/data/pricing.ts and STYLE.md: every plan runs the full platform;
// landed costs, multi-currency and Centra AI actions are on Growth and Scale; demand
// forecasting is on the roadmap.

export interface ModuleFeature {
  name: string;
  /** Short qualifier shown as a chip ("FEFO built in"). */
  note?: string;
  /** Only on the Growth and Scale plans. */
  growth?: boolean;
  /** Add the AI actions footnote marker to the plan tag. */
  footnote?: boolean;
  /** Not live yet. */
  roadmap?: boolean;
}

export interface ModuleData {
  /** Also the URL hash: /features#inventory */
  id: "inventory" | "sales" | "purchasing" | "fulfilment" | "portal" | "ai";
  label: string;
  /** Icon name from src/components/Icon.astro. */
  icon: string;
  title: string;
  /** HTML allowed (footnote markers). */
  blurb: string;
  /** Two example rows, styled like the app's mono data rows. */
  data: Array<{ k: string; v: string; tone?: "good" | "accent" | "amber" }>;
  link?: { href: string; label: string };
  features: ModuleFeature[];
}

export const modules: ModuleData[] = [
  {
    id: "inventory",
    label: "Inventory",
    icon: "box",
    title: "Stock you can act on.",
    blurb:
      "Real-time stock across every warehouse and bin, with the traceability wholesale needs: batch, expiry and serial. Counting runs all year, instead of shutting you down once a year.",
    data: [
      { k: "BATCH BG-2026-04 · EXP 14 MAR", v: "PICK FIRST", tone: "accent" },
      { k: "AUCKLAND · BIN A-14-03", v: "96 UNITS" },
    ],
    features: [
      { name: "Real-time stock on hand" },
      { name: "Multi-warehouse" },
      { name: "Bin and location tracking" },
      { name: "Batch and lot tracking", note: "Full lifecycle" },
      { name: "Expiry date tracking", note: "FEFO built in" },
      { name: "Serial number tracking", note: "With warranty" },
      { name: "Stock transfers" },
      { name: "Assembly, kitting and BOM" },
      { name: "ABC cycle counts", note: "Automated daily" },
      { name: "Mobile stocktake" },
      { name: "Landed costs", note: "Multi-currency, 4 methods", growth: true },
    ],
  },
  {
    id: "sales",
    label: "Sales & quoting",
    icon: "file",
    title: "Quote to cash, without rekeying.",
    blurb:
      "CPQ-style quoting with optional items, choice groups and live margin. Customers accept online, the quote becomes an order in one click, and the order follows through to invoice.",
    data: [
      { k: "QT-2026-0036 · COASTLINE CATERING", v: "ACCEPTED ✓", tone: "good" },
      { k: "LIVE MARGIN", v: "34.2%" },
    ],
    features: [
      { name: "Sales orders" },
      { name: "Quote management", note: "CPQ-style" },
      { name: "Online quote acceptance" },
      { name: "Optional line items" },
      { name: "Quote approval workflow" },
      { name: "Quote templates" },
      { name: "Quote analytics" },
      { name: "Backorder management" },
      { name: "Customer price tiers" },
    ],
  },
  {
    id: "purchasing",
    label: "Purchasing",
    icon: "cart",
    title: "Buy on evidence, not instinct.",
    blurb:
      "Reorder suggestions from real demand, draft POs grouped by supplier in one click, and receipting that checks what actually turned up.",
    data: [
      { k: "REORDER SUGGESTIONS", v: "8 PRODUCTS", tone: "amber" },
      { k: "DRAFT PO · CHEMCO NZ", v: "$4,200" },
    ],
    features: [
      { name: "Purchase orders" },
      { name: "Reorder point automation", note: "Bulk draft POs" },
      { name: "Goods receipt" },
      { name: "Multi-currency POs", note: "FX variance tracking", growth: true },
      { name: "Supplier returns" },
    ],
  },
  {
    id: "fulfilment",
    label: "Fulfilment",
    icon: "truck",
    title: "Out the door, and back again.",
    blurb:
      "Pick, pack and dispatch with carrier integrations, plus a full returns workflow with credit notes for when stock comes back.",
    data: [
      { k: "SO-2026-0412 · PICKED", v: "4 OF 4 LINES", tone: "good" },
      { k: "ARAMEX CONSIGNMENT", v: "BOOKED ✓" },
    ],
    link: { href: "/integrations", label: "Carrier integrations" },
    features: [
      { name: "Pick, pack, ship" },
      { name: "Carrier integrations", note: "Aramex, Bascik" },
      { name: "Customer returns (RMA)", note: "With credit notes" },
      { name: "Backorder fulfilment" },
    ],
  },
  {
    id: "portal",
    label: "B2B portal",
    icon: "globe",
    title: "Your customers, self-serving.",
    blurb:
      "A branded ordering portal your customers use directly, plus Shopify stock and order sync, so your store and your portal sell from the same stock.",
    data: [
      { k: "PORTAL ORDER · NORTHSHORE", v: "02:14 AM" },
      { k: "SHOPIFY STOCK SYNC", v: "EVERY 15 MIN", tone: "good" },
    ],
    link: { href: "/integrations", label: "How Shopify sync works" },
    features: [
      { name: "B2B customer portal", note: "Branded, white-label" },
      { name: "Customer order history" },
      { name: "Invoice visibility" },
      { name: "Real-time stock visibility" },
      { name: "Shopify integration", note: "Syncs every 15 min" },
      { name: "Fulfilment tracking to Shopify" },
    ],
  },
  {
    id: "ai",
    label: "Centra AI",
    icon: "sparkles",
    title: "The part that watches for you.",
    blurb:
      "Centra AI knows your whole operation and watches it around the clock. On Growth and Scale it can act on what it finds, with your approval at every step.<sup>1</sup>",
    data: [
      { k: "STOCK COVER · BIOGUARD 5L", v: "ORDER TODAY", tone: "amber" },
      { k: "DRAFT PO-2026-0087", v: "WAITING FOR YOUR OK" },
    ],
    link: { href: "/ai", label: "More about Centra AI" },
    features: [
      { name: "AI assistant", note: "Full business context" },
      { name: "AI takes actions", note: "Creates POs, quotes, transfers", growth: true, footnote: true },
      { name: "Growth Intel alerts", note: "Over 20 alerts" },
      { name: "ABC inventory analysis", note: "Automated daily" },
      { name: "Demand forecasting", roadmap: true },
    ],
  },
];

/** "The short version": the platform in six lines. Body is HTML (footnote markers). */
export const shortVersion: Array<{ icon: string; title: string; body: string; href: string }> = [
  {
    icon: "box",
    title: "Smart inventory",
    body: "Real-time stock across multiple warehouses. Batch tracking, expiry dates, serial numbers and FEFO picking, built in rather than bolted on.",
    href: "#inventory",
  },
  {
    icon: "sparkles",
    title: "AI-powered operations",
    body: "Centra AI watches your business and answers questions. On Growth and Scale it can take action too, with your approval.<sup>1</sup>",
    href: "/ai",
  },
  {
    icon: "file",
    title: "Professional quoting",
    body: "Optional items, choice groups and live margin. Customers accept online, and an accepted quote becomes an order in one click.",
    href: "#sales",
  },
  {
    icon: "globe",
    title: "B2B customer portal",
    body: "Customers order from your branded portal at any hour, without calling you. Order history, invoices and live stock included.",
    href: "#portal",
  },
  {
    icon: "refresh",
    title: "Shopify integration",
    body: "Stock syncs to Shopify every 15 minutes, orders import automatically and tracking goes back on dispatch. Your store sells what's on the shelf.",
    href: "/integrations",
  },
  {
    icon: "cart",
    title: "Purchasing automation",
    body: "Reorder suggestions are worked out for you, and one click turns them into draft POs grouped by supplier. You see what's critical before you run out.",
    href: "#purchasing",
  },
];

/** One product's day, as every module writes it to the same record. HTML allowed in `what`. */
export const recordEvents: Array<{ module: string; tone?: "ai" | "shopify"; what: string; meta: string; when: string }> = [
  { module: "Purchasing", what: "Received 120 units from ChemCo NZ", meta: "PO-2026-0079 · BATCH BG-2026-04", when: "MON 09:12" },
  { module: "Inventory", what: "Put away in Auckland, bin A-14-03", meta: "EXPIRES 14 MAR 2027", when: "MON 09:40" },
  { module: "Sales", what: "Quote accepted by Coastline Catering", meta: "QT-2026-0036 · 40 UNITS", when: "MON 14:05" },
  { module: "Portal", what: "NorthShore Hospital ordered 24 units", meta: "PLACED IN THE B2B PORTAL", when: "TUE 02:14" },
  { module: "Shopify", tone: "shopify", what: "Stock level synced to Shopify", meta: "AUCKLAND LOCATION", when: "TUE 02:25" },
  { module: "Fulfilment", what: "SO-2026-0412 picked, packed and shipped", meta: "ARAMEX · TRACKING ON THE ORDER", when: "TUE 10:20" },
  {
    module: "Centra AI",
    tone: "ai",
    what: "Runs out next Tuesday. ChemCo takes 5 days.",
    meta: "DRAFT PO READY FOR YOUR OK",
    when: "TUE 10:21",
  },
];

/** "Why it's different": the capabilities generic tools treat as add-ons. */
export const differentiators: Array<{
  kicker: string;
  title: string;
  body: string;
  growth?: boolean;
  rows: Array<{ k: string; v: string; tone?: "good" | "accent" }>;
}> = [
  {
    kicker: "Traceability",
    title: "Batch, expiry and FEFO",
    body: "Full batch and lot lifecycle with expiry tracking, and first-expired-first-out picking built into fulfilment. Quarantine handling included. If you move consumables, chemicals or anything with a shelf life, this is the difference between compliance and a recall you can't trace.",
    rows: [
      { k: "BG-2026-04 · EXP 14 MAR 2027", v: "PICK FIRST", tone: "accent" },
      { k: "BG-2026-07 · EXP 02 AUG 2027", v: "NEXT" },
    ],
  },
  {
    kicker: "Traceability",
    title: "Serial numbers and warranty",
    body: "Full serial number tracking with warranty status against each unit, so you know which customer has which serial and whether it's still covered.",
    rows: [
      { k: "SN 40-118-2291", v: "PACIFIC HOTELS" },
      { k: "WARRANTY", v: "COVERED TO JUN 2027", tone: "good" },
    ],
  },
  {
    kicker: "Costing",
    title: "Landed costs, four methods",
    body: "Multi-currency landed cost allocation across four methods, with FX variance tracking on purchase orders. Your margin reflects what the stock actually cost to land, not what the invoice said.",
    growth: true,
    rows: [
      { k: "FOB + FREIGHT + DUTY", v: "$31.84 LANDED" },
      { k: "FX VARIANCE · PO-2026-0071", v: "+$42.10" },
    ],
  },
  {
    kicker: "Selling",
    title: "CPQ-style quoting",
    body: "Optional line items, choice groups, live margin, approval workflows, templates and quote analytics. Customers accept online and the quote becomes an order in one click. No rekeying.",
    rows: [
      { k: "OPTIONAL ITEMS", v: "3 OF 5 TICKED" },
      { k: "LIVE MARGIN", v: "34.2%", tone: "good" },
    ],
  },
  {
    kicker: "Accuracy",
    title: "Automated ABC cycle counts",
    body: "ABC analysis runs daily and suggests what to count next, with a mobile stocktake screen. Counting becomes continuous instead of an annual shutdown.",
    rows: [
      { k: "CLASS A · DUE TODAY", v: "12 PRODUCTS", tone: "accent" },
      { k: "COUNT ACCURACY · 12 WEEKS", v: "99.1%" },
    ],
  },
  {
    kicker: "Customers",
    title: "A branded B2B portal",
    body: "A white-label ordering portal your customers use directly: order history, invoices and real-time stock, at any hour, without phoning your team.",
    rows: [
      { k: "PORTAL ORDER · NORTHSHORE", v: "02:14 AM" },
      { k: "PRICED ON THEIR OWN TIER", v: "PLACED ✓", tone: "good" },
    ],
  },
];
