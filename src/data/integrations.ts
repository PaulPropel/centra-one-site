// Content for /integrations. Facts (STYLE.md): Xero is push only, nothing comes back from
// Xero. Shopify: stock to Shopify every 15 minutes, orders in automatically, tracking back on
// dispatch, customer details with the order. Carriers live: Aramex and Bascik Transport.
// Coming soon: API access, MYOB, WooCommerce, Stripe payments. STYLE.md lists what never to name.

/** out = Centra One to the partner, in = the partner to Centra One. */
export type FlowDir = "out" | "in";

export interface Flow {
  what: string;
  dir: FlowDir;
  note: string;
}

export interface LiveIntegration {
  id: "xero" | "shopify" | "bascik" | "aramex";
  name: string;
  mark: string;
  category: string;
  desc: string;
  flows: Flow[];
  /** A plain line under the flows (e.g. "push only"). */
  footer?: string;
}

export const live: LiveIntegration[] = [
  {
    id: "xero",
    name: "Xero",
    mark: "Xe",
    category: "Accounting",
    desc: "Your books and your floor stop disagreeing. Invoices, bills and contacts push from Centra One to Xero, with per-line GST resolved correctly before anything reaches your accounts. By default they arrive in Xero as Awaiting Approval, so someone checks them before they post.",
    flows: [
      { what: "Invoices", dir: "out", note: "To Xero" },
      { what: "Contacts", dir: "out", note: "To Xero" },
      { what: "Bills from purchase orders", dir: "out", note: "To Xero" },
      { what: "Per-line GST and account codes", dir: "out", note: "To Xero" },
    ],
    footer: "One way. Nothing syncs back from Xero.",
  },
  {
    id: "shopify",
    name: "Shopify",
    mark: "Sh",
    category: "Sales channel",
    desc: "Stock levels sync to Shopify every 15 minutes. Orders import automatically, and fulfilment tracking goes back to the store on dispatch. Your warehouses map to Shopify locations, so each location shows the right number.",
    flows: [
      { what: "Stock levels", dir: "out", note: "Every 15 min" },
      { what: "Orders", dir: "in", note: "Automatic" },
      { what: "Fulfilment tracking", dir: "out", note: "On dispatch" },
      { what: "Customer details", dir: "in", note: "With the order" },
    ],
  },
  {
    id: "bascik",
    name: "Bascik Transport",
    mark: "Ba",
    category: "Freight and delivery",
    desc: "Book freight straight from a dispatch without rekeying an address. Consignments are created from the order and tracking comes back against it.",
    flows: [
      { what: "Consignments", dir: "out", note: "On dispatch" },
      { what: "Delivery addresses", dir: "out", note: "From the order" },
      { what: "Tracking numbers", dir: "in", note: "Back to the order" },
    ],
  },
  {
    id: "aramex",
    name: "Aramex",
    mark: "Ar",
    category: "Freight and delivery",
    desc: "Create Aramex consignments from the pick and pack screen. Labels and tracking come back to the order, so your team and your customer see the same status.",
    flows: [
      { what: "Consignments", dir: "out", note: "On dispatch" },
      { what: "Delivery addresses", dir: "out", note: "From the order" },
      { what: "Tracking numbers", dir: "in", note: "Back to the order" },
    ],
  },
];

export const comingSoon: Array<{ mark: string; name: string; body: string; note?: string }> = [
  { mark: "API", name: "API access", body: "Build your own integrations against Centra One directly.", note: "Scale plan" },
  { mark: "My", name: "MYOB", body: "Accounting sync for businesses running MYOB instead of Xero." },
  { mark: "Wo", name: "WooCommerce", body: "Stock and order sync for WooCommerce stores." },
  { mark: "St", name: "Stripe", body: "Take payment against invoices and B2B portal orders." },
];

export const principles: Array<{ icon: string; title: string; body: string; k: string; v: string }> = [
  {
    icon: "database",
    title: "One source of truth",
    body: "Centra One keeps the record of your orders, stock and invoices, and Xero keeps your books. Sync runs one way, from Centra One to Xero, so the two never disagree about which is right.",
    k: "CENTRA ONE → XERO",
    v: "ONE WAY",
  },
  {
    icon: "receipt",
    title: "Tax done properly",
    body: "Per-line GST is resolved against your own tax rates and mapped to the right Xero codes before anything posts. A mixed-rate invoice arrives correct, not averaged.",
    k: "GST 15% · NO GST",
    v: "PER LINE",
  },
  {
    icon: "lock",
    title: "Connected per business",
    body: "Each business connects its own accounts. Your data goes to your Xero and your Shopify. Never pooled, never shared.",
    k: "DATA POOLED",
    v: "NEVER",
  },
];
