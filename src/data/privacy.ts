// Privacy policy text for /privacy. Carried over from the old site with factual fixes only
// (legal entity, hosting, data location, cookies, Xero direction, reply times). Keep in line
// with HOSTING, EMAIL and REPLY_TIME in data/site.ts.
import type { LegalDoc } from "../components/legal/types";
import { EMAIL, REPLY_TIME } from "./site";

const mail = EMAIL.privacy;

export const privacy: LegalDoc = {
  title: "Privacy policy",
  description: "How Centra One collects, uses and protects your personal information.",
  intro: "This policy explains how Centra One collects, uses, and protects your personal information.",
  path: "/privacy",
  updated: "3 November 2026",
  updatedIso: "2026-11-03",
  related: { href: "/terms", label: "Terms of service" },
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      html: `
<p>Centra One is a wholesale business management platform developed and operated by Centra One Limited, a company based in New Zealand. Our platform helps wholesale businesses manage their inventory, orders, purchasing, and customer relationships.</p>
<dl class="legal-contact">
  <div><dt>Contact</dt><dd><a href="mailto:${mail}">${mail}</a></dd></div>
  <div><dt>Website</dt><dd><a href="/">centra-one.ai</a></dd></div>
</dl>`,
    },
    {
      id: "information-we-collect",
      title: "Information we collect",
      html: `
<p>We collect information in three ways:</p>
<h3>Information you provide directly</h3>
<ul>
  <li><strong>Account information:</strong> name, email address, company name, and password when you create an account</li>
  <li><strong>Business data:</strong> products, customers, suppliers, orders, invoices, and other wholesale business data you enter into the platform</li>
  <li><strong>Payment information:</strong> billing details processed securely via Stripe (we do not store card numbers)</li>
  <li><strong>Communications:</strong> emails or messages you send to our support team</li>
</ul>
<h3>Information collected automatically</h3>
<ul>
  <li><strong>Usage data:</strong> pages visited, features used, actions taken within the platform</li>
  <li><strong>Device information:</strong> browser type, operating system, IP address</li>
  <li><strong>Log data:</strong> server logs including timestamps, error reports, and performance data</li>
  <li><strong>Cookies:</strong> essential session cookies for authentication (see <a href="#cookies">Cookies</a>)</li>
</ul>
<h3>Information from third parties</h3>
<ul>
  <li><strong>Xero:</strong> the Xero connection is push only. When you connect your Xero account, Centra One sends invoices, contacts, and bills from purchase orders to Xero. We do not collect invoice or payment data back from Xero</li>
  <li><strong>Shopify:</strong> order, customer, and product data when you connect your Shopify store</li>
  <li><strong>Other integrations:</strong> data from any third-party services you choose to connect</li>
</ul>`,
    },
    {
      id: "how-we-use",
      title: "How we use your information",
      html: `
<p>We use your information to:</p>
<ul>
  <li>Provide and operate the Centra One platform</li>
  <li>Process your subscription and billing</li>
  <li>Send transactional emails (order confirmations, quote notifications, system alerts)</li>
  <li>Provide customer support</li>
  <li>Improve and develop new features</li>
  <li>Send product updates and changelog notifications (you can unsubscribe at any time)</li>
  <li>Comply with legal obligations</li>
  <li>Detect and prevent fraud and security incidents</li>
</ul>
<blockquote>
  <p><strong>We do not sell your personal information to third parties.</strong></p>
  <p>We do not use your business data to train AI models. <strong>Your data is yours.</strong></p>
</blockquote>`,
    },
    {
      id: "data-storage",
      title: "Data storage and security",
      html: `
<p>Your data is stored on Supabase infrastructure hosted on AWS in Sydney, Australia. We implement the following security measures:</p>
<ul>
  <li>Row-level security (RLS) on all database tables, so your data is isolated from other tenants</li>
  <li>Encryption in transit (TLS 1.2+) for all data transfers</li>
  <li>Encryption at rest for all stored data</li>
  <li>Automated daily backups</li>
  <li>Access controls: employees only access customer data when required for support</li>
  <li>API keys and secrets stored as environment variables, never in source code</li>
</ul>
<p>While we take security seriously, no system is 100% secure. We will notify you promptly in the event of a data breach that affects your information.</p>`,
    },
    {
      id: "data-sharing",
      title: "Data sharing and disclosure",
      html: `
<p>We share your data only in these circumstances:</p>
<h3>Service providers</h3>
<p>We use trusted third-party services to operate the platform:</p>
<ul>
  <li>Supabase (database hosting)</li>
  <li>Cloudflare (application and website hosting)</li>
  <li>Anthropic (Centra AI: your questions and the business data needed to answer them, which Anthropic does not use to train its models)</li>
  <li>Stripe (payment processing)</li>
  <li>Resend (transactional email)</li>
</ul>
<p>All service providers are bound by data processing agreements.</p>
<h3>Integrations you authorise</h3>
<p>When you connect third-party services (Xero, Shopify, etc.) we share relevant data with those services as required to provide the integration.</p>
<h3>Legal requirements</h3>
<p>We may disclose your information if required by law, court order, or to protect the rights and safety of Centra One or others.</p>
<h3>Business transfers</h3>
<p>If Centra One is acquired or merges with another company, your data may be transferred as part of that transaction. We will notify you before this happens.</p>
<blockquote><p><strong>We will never sell your data.</strong></p></blockquote>`,
    },
    {
      id: "your-rights",
      title: "Your rights",
      html: `
<p>Depending on your location you may have the following rights regarding your personal information:</p>
<ul>
  <li><strong>Access:</strong> request a copy of the personal data we hold about you</li>
  <li><strong>Correction:</strong> request that we correct inaccurate or incomplete data</li>
  <li><strong>Deletion:</strong> request that we delete your personal data, subject to legal retention requirements</li>
  <li><strong>Portability:</strong> request your data in a machine-readable format</li>
  <li><strong>Objection:</strong> object to certain uses of your data</li>
  <li><strong>Restriction:</strong> request that we restrict processing of your data</li>
</ul>
<p>New Zealand residents have rights under the <em>Privacy Act 2020</em>. Australian residents have rights under the <em>Privacy Act 1988</em>. EU/UK residents have rights under GDPR/UK GDPR.</p>
<p>To exercise any of these rights: email <a href="mailto:${mail}?subject=Privacy%20Request">${mail}</a> with the subject "Privacy Request". We will respond within 20 working days.</p>`,
    },
    {
      id: "cookies",
      title: "Cookies",
      html: `
<p>We use essential cookies only:</p>
<ul>
  <li><strong>Authentication:</strong> keeping you logged in during your session</li>
</ul>
<p>We do not use analytics, advertising, or tracking cookies, and we do not track you across other websites.</p>
<p>You can disable cookies in your browser settings. Note that disabling session cookies will prevent you from logging in.</p>`,
    },
    {
      id: "data-retention",
      title: "Data retention",
      html: `
<p>We retain your data for as long as your account is active. If you cancel your subscription:</p>
<ul>
  <li>Your data remains accessible for 30 days after cancellation</li>
  <li>After 30 days your data is permanently deleted from our systems</li>
  <li>Backups containing your data are purged within 90 days</li>
</ul>
<p>Some data may be retained longer where required by law (e.g. financial records for 7 years under NZ tax law).</p>
<p>You can request immediate deletion of your data by contacting <a href="mailto:${mail}">${mail}</a>.</p>`,
    },
    {
      id: "childrens-privacy",
      title: "Children's privacy",
      html: `
<p>Centra One is a business-to-business platform intended for use by adults operating wholesale businesses. We do not knowingly collect personal information from anyone under 18 years of age. If you believe we have inadvertently collected such information please <a href="mailto:${mail}">contact us immediately</a>.</p>`,
    },
    {
      id: "changes",
      title: "Changes to this policy",
      html: `
<p>We may update this privacy policy from time to time. When we make material changes:</p>
<ul>
  <li>We will update the "Last updated" date at the top of this page</li>
  <li>We will notify account holders by email at least 14 days before changes take effect</li>
  <li>Continued use of the platform after changes take effect constitutes acceptance</li>
</ul>
<p>We encourage you to review this policy periodically.</p>`,
    },
    {
      id: "contact-us",
      title: "Contact us",
      html: `
<p>If you have any questions about this privacy policy or how we handle your data:</p>
<dl class="legal-contact">
  <div><dt>Email</dt><dd><a href="mailto:${mail}?subject=Privacy%20Enquiry">${mail}</a></dd></div>
  <div><dt>Subject line</dt><dd>"Privacy Enquiry"</dd></div>
  <div><dt>Response time</dt><dd>We aim to respond ${REPLY_TIME}.</dd></div>
</dl>
<p><strong>For formal privacy complaints:</strong></p>
<ul>
  <li>New Zealand: <a href="https://privacy.org.nz" rel="noopener">Office of the Privacy Commissioner</a> (privacy.org.nz)</li>
  <li>Australia: <a href="https://oaic.gov.au" rel="noopener">Office of the Australian Information Commissioner</a> (oaic.gov.au)</li>
</ul>`,
    },
  ],
};
