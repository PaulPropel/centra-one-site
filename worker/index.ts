// Cloudflare Worker for centra-one.ai.
//
// Static pages are served straight from the assets binding (dist/). This code only runs for
// /api/* (see "run_worker_first" in wrangler.jsonc): website enquiries from /contact, which are
// validated here and emailed through Resend to ENQUIRY_TO.
//
// Secrets (set in Cloudflare, never committed): RESEND_API_KEY.

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  ENQUIRY_TO: string;
  ENQUIRY_FROM: string;
}

const KINDS: Record<string, string> = {
  demo: "Book a walkthrough",
  pricing: "Question about pricing",
  enterprise: "Enterprise pricing",
  support: "I need help",
  partner: "Partnership or press",
  other: "Something else",
};

const LIMITS: Record<string, number> = {
  name: 120,
  email: 255,
  company: 200,
  revenue: 60,
  users: 40,
  warehouses: 40,
  account: 200,
  message: 5000,
  website: 200,
};

const ALLOWED_HOSTS = new Set(["centra-one.ai", "www.centra-one.ai", "localhost", "127.0.0.1"]);
const MAX_BODY_BYTES = 32 * 1024;
const MIN_FILL_MS = 2500;

type Fields = Record<string, string>;

function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      ...extra,
    },
  });
}

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // some privacy tools strip Origin; the honeypot and timing checks still apply
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_HOSTS.has(host) || host.endsWith(".workers.dev");
  } catch {
    return false;
  }
}

async function readFields(request: Request): Promise<Fields> {
  const type = request.headers.get("content-type") || "";
  const out: Fields = {};
  if (type.includes("application/json")) {
    const data = (await request.json()) as Record<string, unknown>;
    for (const [k, v] of Object.entries(data)) if (typeof v === "string") out[k] = v;
  } else {
    const form = await request.formData();
    for (const [k, v] of form.entries()) if (typeof v === "string") out[k] = v;
  }
  for (const k of Object.keys(out)) out[k] = out[k].trim();
  return out;
}

function validate(f: Fields): { field: string; error: string } | null {
  if (!f.name) return { field: "name", error: "Please tell us your name." };
  if (!f.email) return { field: "email", error: "Please add a work email." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return { field: "email", error: "That email doesn't look right." };
  for (const [k, max] of Object.entries(LIMITS)) {
    if ((f[k] || "").length > max) return { field: k, error: "That's a bit long. Please shorten it and try again." };
  }
  return null;
}

function emailText(f: Fields, label: string): string {
  const rows: Array<[string, string | undefined]> = [
    ["Enquiry type", label],
    ["Name", f.name],
    ["Email", f.email],
    ["Company", f.company],
    ["Revenue", f.revenue],
    ["Users needed", f.users],
    ["Warehouses", f.warehouses],
    ["Account", f.account],
  ];
  const lines = rows.filter(([, v]) => v).map(([k, v]) => `${(k + ":").padEnd(15)}${v}`);
  lines.push("", "Message:", f.message || "(empty)");
  return lines.join("\n");
}

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
  // The contact page posts with fetch and asks for JSON. Without JavaScript the browser posts
  // the form itself, so we answer with a redirect: success to a static thank-you page, errors
  // back to the form (the page shows ?error= when it can).
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  const redirect = (location: string) =>
    new Response(null, { status: 303, headers: { location, "cache-control": "no-store" } });
  let kind = "";
  const sent = () => (wantsJson ? json({ ok: true }) : redirect("/contact/sent"));
  const fail = (status: number, error: string, field?: string) => {
    if (wantsJson) return json({ ok: false, error, field }, status);
    const params = new URLSearchParams();
    if (kind) params.set("kind", kind);
    params.set("error", error);
    return redirect(`/contact?${params.toString()}#form`);
  };

  if (!originAllowed(request)) return fail(403, "Please send this from the Centra One website.");
  const length = Number(request.headers.get("content-length") || "0");
  if (length > MAX_BODY_BYTES) return fail(413, "That message is too long to send.");

  let f: Fields;
  try {
    f = await readFields(request);
  } catch {
    return fail(400, "Please check the form and try again.");
  }
  if (KINDS[f.kind]) kind = f.kind;

  // Spam traps: a hidden field people never fill in, and forms submitted impossibly fast.
  // Both get a normal-looking success so bots learn nothing.
  const started = Number(f.started || "0");
  const tooFast = started > 0 && Date.now() - started < MIN_FILL_MS;
  if (f.website || tooFast) return sent();

  const problem = validate(f);
  if (problem) return fail(422, problem.error, problem.field);

  const label = KINDS[f.kind] || KINDS.demo;
  if (!env.RESEND_API_KEY) {
    console.error("enquiry not sent: RESEND_API_KEY is not set");
    return fail(503, "We couldn't send that just now. Please email us directly.");
  }

  const subject = `Centra One enquiry: ${label}, ${f.name}${f.company ? ` (${f.company})` : ""}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: [env.ENQUIRY_TO],
      reply_to: f.email,
      subject,
      text: emailText(f, label),
    }),
  });
  if (!res.ok) {
    console.error("enquiry send failed", res.status, await res.text().catch(() => ""));
    return fail(502, "We couldn't send that just now. Please email us directly.");
  }
  return sent();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") return json({ ok: false, error: "Method not allowed" }, 405, { allow: "POST" });
      return handleEnquiry(request, env);
    }
    if (url.pathname.startsWith("/api/")) return json({ ok: false, error: "Not found" }, 404);
    return env.ASSETS.fetch(request);
  },
};
