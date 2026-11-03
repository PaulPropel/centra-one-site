// Site-wide facts. Use these instead of hard-coding URLs, emails or claims in pages.

export const SITE_URL = "https://centra-one.ai";
export const PORTAL_URL = "https://portal.centra-one.ai";
/** Every "Start free trial" button goes here. */
export const SIGNUP_URL = `${PORTAL_URL}/signup`;
export const LOGIN_URL = `${PORTAL_URL}/login`;

export const COMPANY = {
  name: "Centra One",
  legalName: "Centra One Limited",
  country: "New Zealand",
};

export const EMAIL = {
  hello: "hello@centra-one.ai",
  support: "support@centra-one.ai",
  careers: "careers@centra-one.ai",
  privacy: "hello@centra-one.ai",
};

/** One promise, used everywhere we say how fast we reply. */
export const REPLY_TIME = "within one business day";

/** Where things run. Keep privacy, terms, FAQ and llms.txt in line with this. */
export const HOSTING = {
  app: "Cloudflare",
  database: "Supabase, in Sydney, Australia",
  email: "Resend",
  ai: "Anthropic (Claude)",
};
