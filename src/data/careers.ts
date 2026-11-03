// Open roles on /careers, with their JobPosting structured data. Role ids are anchors
// (/careers#<id>) and JobPosting identifiers: keep them stable while a role is open.
import { EMAIL } from "./site";

export type Department = "Engineering" | "Sales" | "Product" | "Support";

export interface Role {
  id: string;
  department: Department;
  title: string;
  /** Shown on the role. */
  location: string;
  /** ISO country codes applicants must live in. Empty means anywhere. */
  countries: string[];
  type: "Full-time";
  /** ISO date the role was posted. */
  posted: string;
  description: string;
  requirements: string[];
}

export const departments: Department[] = ["Engineering", "Sales", "Product", "Support"];

export const roles: Role[] = [
  {
    id: "full-stack-engineer",
    department: "Engineering",
    title: "Full-Stack Engineer",
    location: "Remote, NZ or AU preferred",
    countries: ["NZ", "AU"],
    type: "Full-time",
    posted: "2026-07-01",
    description:
      "We're looking for a full-stack engineer who loves building products that real businesses depend on. You'll work across the whole Centra One stack, from database schema design to React UI, shipping features that wholesale businesses use every day.",
    requirements: [
      "Strong TypeScript and React experience",
      "Comfortable with PostgreSQL and Supabase or a similar backend platform",
      "Product-minded: you care about the user experience, not just the code",
      "Experience building SaaS products preferred",
      "Bonus: experience with TanStack Router or a similar full-stack React framework",
    ],
  },
  {
    id: "ai-ml-engineer",
    department: "Engineering",
    title: "AI/ML Engineer",
    location: "Remote, worldwide",
    countries: [],
    type: "Full-time",
    posted: "2026-07-01",
    description:
      "Help us build the AI at the heart of Centra One. You'll work on Centra AI, our agentic system that monitors businesses, surfaces insights and takes action for users, with their approval. This isn't a research role: you'll be shipping AI features to production.",
    requirements: [
      "Experience building production AI applications with LLMs (Claude, GPT-4, Gemini)",
      "Understanding of RAG, function calling and agentic patterns",
      "Strong software engineering fundamentals. This is a product engineering role.",
      "Experience with prompt engineering and context management",
      "Bonus: experience with wholesale, supply chain or ERP systems",
    ],
  },
  {
    id: "account-executive-anz",
    department: "Sales",
    title: "Account Executive, ANZ",
    location: "Remote, NZ or AU",
    countries: ["NZ", "AU"],
    type: "Full-time",
    posted: "2026-07-01",
    description:
      "We need a hungry, product-savvy Account Executive to own the ANZ market. You'll run the full sales cycle, from outbound prospecting to closing, with wholesale businesses across New Zealand and Australia who are ready to replace Cin7 or Unleashed.",
    requirements: [
      "2+ years of B2B SaaS sales experience",
      "Understanding of wholesale, distribution or supply chain businesses",
      "A consultative approach: you solve problems, not just pitch features",
      "Experience selling against Cin7, Unleashed or similar inventory platforms a strong advantage",
      "Based in NZ or AU preferred",
    ],
  },
  {
    id: "product-designer",
    department: "Product",
    title: "Product Designer",
    location: "Remote, worldwide",
    countries: [],
    type: "Full-time",
    posted: "2026-07-01",
    description:
      "We're looking for a product designer who can make complex wholesale workflows feel simple. Centra One covers inventory, sales, purchasing, fulfilment, a B2B portal and an AI that takes action, from batch and lot tracking to drafting purchase orders. Every part of it needs to be clear for warehouse managers and accounts teams alike.",
    requirements: [
      "A strong product design portfolio, B2B SaaS preferred",
      "Proficient in Figma",
      "Deep understanding of UX for complex, data-heavy applications",
      "Able to work across the whole design process: research, wireframes, high fidelity and handoff",
      "Bonus: experience designing for mobile warehouse workflows",
    ],
  },
  {
    id: "customer-success-manager",
    department: "Support",
    title: "Customer Success Manager",
    location: "Remote, NZ or AU",
    countries: ["NZ", "AU"],
    type: "Full-time",
    posted: "2026-07-01",
    description:
      "Our customers are wholesale businesses running real operations on Centra One. As our first Customer Success Manager you'll own onboarding, training and retention, making sure every customer gets the most from the platform and becomes a long-term advocate.",
    requirements: [
      "Experience in customer success or implementation at a SaaS company",
      "Strong empathy: you genuinely care about customer outcomes",
      "Understanding of wholesale or inventory management workflows",
      "Excellent written and verbal communication",
      "Based in NZ or AU strongly preferred, because being in our customers' time zones matters",
    ],
  },
];

const mailto = (subject: string, body?: string) =>
  `mailto:${EMAIL.careers}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/** "Apply" opens an email to careers@ with the subject and a short template filled in. */
export const applyHref = (role: Role) =>
  mailto(
    `Application: ${role.title}`,
    `Hi, I am interested in the ${role.title} position at Centra One.\n\nAbout me:\n\nWhy Centra One:\n\nMy CV / portfolio:\n`,
  );

export const generalApplicationHref = mailto("General application: Centra One");

const countryNames: Record<string, string> = { NZ: "New Zealand", AU: "Australia" };
export const countryName = (code: string) => countryNames[code] ?? code;
