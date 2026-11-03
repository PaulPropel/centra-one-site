// FAQ copy shared between pages. Answers may contain simple HTML (links); static and trusted.
export interface Faq {
  q: string;
  a: string;
}

export const homeFaq: Faq[] = [
  {
    q: "Do I need a credit card to start?",
    a: "No. Start your 30-day free trial without a card, and cancel any time before it ends.",
  },
  {
    q: "How long does it take to set up?",
    a: "Less than a day. Bring your product list and we'll help you import it.",
  },
  {
    q: "Does it work with Xero and Shopify?",
    a: "Yes. Invoices go to Xero automatically. Shopify stock syncs every 15 minutes, and web orders come straight in as sales orders.",
  },
  {
    q: "Where is my data stored?",
    a: "In Sydney, Australia. It's encrypted at rest and backed up every day.",
  },
];

export const pricingFaq: Faq[] = [
  {
    q: "What counts as annual revenue?",
    a: "Your total wholesale revenue processed through Centra One. We don't audit it. You pick the plan that fits your business.",
  },
  {
    q: "What happens if I grow into the next tier?",
    a: "We'll let you know as you get close. Upgrading is instant, and your data and settings carry straight over.",
  },
  {
    q: "Can I add more users?",
    a: "Yes. Extra users are US$15 a month each on any plan, or move up a plan for more included users.",
  },
  {
    q: "Do I need a credit card to start?",
    a: "No. Start your free trial without a card, and cancel any time before it ends.",
  },
  {
    q: "What's different on the bigger plans?",
    a: "Every plan runs the full platform: inventory, orders, purchasing, quoting, the B2B portal and the Centra AI assistant. Growth and Scale add more users, Centra AI actions such as drafting purchase orders, multi-currency and landed costs, custom templates and more hands-on support.",
  },
];
