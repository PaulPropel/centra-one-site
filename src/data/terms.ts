// Terms of service text for /terms. Carried over from the old site with factual fixes only
// (legal entity, hosting, API access, extra-user price format, reply time).
import type { LegalDoc } from "../components/legal/types";
import { COMPANY, EMAIL, REPLY_TIME } from "./site";
import { EXTRA_USER_PRICE, TRIAL_DAYS } from "./pricing";

const mail = EMAIL.hello;
const entity = COMPANY.legalName;
const termsMail = `mailto:${mail}?subject=Terms%20of%20Service%20Enquiry`;

export const terms: LegalDoc = {
  title: "Terms of service",
  description:
    "The terms that govern your use of the Centra One platform: billing, your data, acceptable use, liability and more.",
  intro: "These terms govern your use of the Centra One platform. Please read them carefully.",
  path: "/terms",
  updated: "3 November 2026",
  updatedIso: "2026-11-03",
  related: { href: "/privacy", label: "Privacy policy" },
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of terms",
      html: `
<p>By creating an account or using the Centra One platform you agree to be bound by these Terms of Service and our <a href="/privacy">Privacy Policy</a>. If you are using Centra One on behalf of a business, you represent that you have the authority to bind that business to these terms.</p>
<p>If you do not agree to these terms you may not use the platform.</p>
<p>These terms constitute a legally binding agreement between you (or your business) and ${entity}, a company registered in New Zealand.</p>`,
    },
    {
      id: "description",
      title: "Description of service",
      html: `
<p>Centra One is a cloud-based wholesale business management platform providing inventory management, order management, purchasing, quoting, and related tools for wholesale businesses. The platform includes:</p>
<ul>
  <li>Web-based application accessible via any modern browser</li>
  <li>B2B customer portal for your customers</li>
  <li>Mobile-optimised interfaces for warehouse operations</li>
  <li>AI-powered features including Centra AI assistant</li>
  <li>Third-party integrations (Xero, Shopify, and others)</li>
  <li>API access (coming soon, on the Scale plan)</li>
</ul>
<p>We reserve the right to modify, suspend, or discontinue any feature of the service with reasonable notice.</p>`,
    },
    {
      id: "account",
      title: "Account registration",
      html: `
<p>To use Centra One you must:</p>
<ul>
  <li>Provide accurate and complete registration information</li>
  <li>Maintain the security of your account credentials</li>
  <li>Notify us immediately of any unauthorised access to your account</li>
  <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
  <li>Use the platform only for lawful wholesale business purposes</li>
</ul>
<p>You are responsible for all activity that occurs under your account. Each account represents one business entity. You may not share your account with another business or use one account for multiple unrelated businesses.</p>
<p>User seats are allocated per your subscription plan. Additional users can be added at the rates specified on our <a href="/pricing">pricing page</a>.</p>`,
    },
    {
      id: "billing",
      title: "Subscription and billing",
      html: `
<h3>Pricing and plans</h3>
<p>Centra One is offered on a subscription basis. Current pricing is available at <a href="/pricing">centra-one.ai/pricing</a>. Plans are based on your business annual revenue as self-reported. We reserve the right to request verification of revenue tier.</p>
<h3>Billing</h3>
<ul>
  <li>Subscriptions are billed monthly in advance</li>
  <li>Payment is processed via Stripe</li>
  <li>By providing payment details you authorise us to charge your payment method on the billing date each month</li>
  <li>All prices are in the currency displayed at time of purchase</li>
  <li>Prices are exclusive of applicable taxes (GST, VAT etc.) which will be added where required by law</li>
</ul>
<h3>Free trial</h3>
<ul>
  <li>New accounts receive a ${TRIAL_DAYS}-day free trial with full access to all features</li>
  <li>No credit card is required to start a trial</li>
  <li>At the end of the trial period you must subscribe to continue using the platform</li>
  <li>Trial data is retained for 30 days after trial expiry</li>
</ul>
<h3>Changes and upgrades</h3>
<ul>
  <li>You may upgrade your plan at any time. Changes take effect immediately and are billed pro-rata</li>
  <li>Downgrades take effect at the end of the current billing period</li>
  <li>Additional users beyond your plan limit are billed at <strong>US$${EXTRA_USER_PRICE} per user per month</strong></li>
</ul>
<h3>Refunds</h3>
<ul>
  <li>We do not offer refunds for partial months</li>
  <li>If you cancel mid-month you retain access until the end of the billing period</li>
  <li>In exceptional circumstances (e.g. extended platform outage) we may issue credits at our discretion</li>
</ul>`,
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      html: `
<p>You agree not to use Centra One to:</p>
<ul>
  <li>Violate any applicable laws or regulations</li>
  <li>Infringe the intellectual property rights of any third party</li>
  <li>Upload or transmit malicious code, viruses, or harmful content</li>
  <li>Attempt to gain unauthorised access to other accounts or systems</li>
  <li>Reverse engineer, decompile, or attempt to extract the source code of the platform</li>
  <li>Use automated tools to scrape or extract data from the platform without our permission</li>
  <li>Resell, sublicense, or white-label the platform without our written consent</li>
  <li>Use the platform in a way that interferes with other customers' use of the service</li>
  <li>Impersonate any person or entity</li>
</ul>
<blockquote class="callout-warn"><p><strong>We reserve the right to suspend or terminate accounts that violate these terms without notice.</strong></p></blockquote>`,
    },
    {
      id: "your-data",
      title: "Your data",
      html: `
<h3>Ownership</h3>
<p>You own all data you enter into Centra One. We do not claim any ownership over your business data: products, customers, orders, invoices, and any other data you create.</p>
<blockquote><p><strong>You own all data you enter into Centra One.</strong></p></blockquote>
<h3>Licence to operate</h3>
<p>By using the platform you grant Centra One a limited licence to store, process, and display your data solely for the purpose of providing the service to you.</p>
<blockquote><p><strong>We do not use your business data for any other purpose including training AI models.</strong></p></blockquote>
<h3>Data portability</h3>
<p>You can export your data at any time from within the platform. On cancellation we will provide a full data export upon request within 30 days.</p>
<h3>Data security</h3>
<p>We implement industry-standard security measures as described in our <a href="/privacy">Privacy Policy</a>. While we take security seriously no system is completely secure and we cannot guarantee absolute security of your data.</p>
<h3>AI features</h3>
<p>When you use Centra AI the content of your queries and relevant business context is sent to Anthropic's API for processing. This data is subject to <a href="https://www.anthropic.com/privacy" rel="noopener">Anthropic's data handling policies</a>. We do not store the content of AI conversations beyond what is needed to provide the service.</p>`,
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      html: `
<h3>Centra One platform</h3>
<p>The Centra One platform, including its software, design, trademarks, and content, is owned by ${entity} and protected by intellectual property laws. These terms do not grant you any rights to our intellectual property except the limited right to use the platform as described here.</p>
<h3>Your content</h3>
<p>You retain all intellectual property rights in the data and content you upload to the platform. You are responsible for ensuring you have the right to use and upload any content you add to Centra One.</p>
<h3>Feedback</h3>
<p>If you provide feedback, suggestions, or ideas about the platform we may use these to improve the service without any obligation to compensate you.</p>`,
    },
    {
      id: "integrations",
      title: "Integrations and third parties",
      html: `
<p>Third-party integrations (Xero, Shopify, Aramex, and others) are provided as a convenience. Your use of these integrations is subject to the terms and privacy policies of those third parties.</p>
<p>We are not responsible for:</p>
<ul>
  <li>The availability or accuracy of third-party services</li>
  <li>Data handling by third-party services</li>
  <li>Changes to third-party APIs that may affect integrations</li>
  <li>Any loss or damage arising from your use of third-party integrations</li>
</ul>
<p>We will provide reasonable notice of integration changes where possible but cannot guarantee continuity of all integrations.</p>`,
    },
    {
      id: "availability",
      title: "Availability and uptime",
      html: `
<p>We aim to provide a reliable service but do not guarantee 100% uptime. Planned maintenance will be communicated in advance where possible.</p>
<blockquote><p><strong>We do not offer 100% uptime guarantees but aim to be reliable.</strong></p></blockquote>
<p>We are not liable for downtime caused by:</p>
<ul>
  <li>Third-party infrastructure failures (AWS, Supabase, Cloudflare)</li>
  <li>Scheduled maintenance</li>
  <li>Circumstances outside our reasonable control (force majeure)</li>
  <li>Your own network or device issues</li>
</ul>
<p>Enterprise plan customers are entitled to an uptime SLA as specified in their agreement.</p>`,
    },
    {
      id: "liability",
      title: "Limitation of liability",
      html: `
<p><strong>To the maximum extent permitted by applicable law:</strong></p>
<p>${entity} will not be liable for any indirect, incidental, special, consequential, or punitive damages including but not limited to loss of profits, loss of data, loss of business, or loss of goodwill arising from your use of the platform.</p>
<p>Our total liability to you for any claim arising from these terms or your use of the platform will not exceed the total amount you paid us in the 12 months preceding the claim.</p>
<p>Nothing in these terms excludes liability that cannot be excluded under applicable law including the New Zealand <em>Consumer Guarantees Act</em> or <em>Australian Consumer Law</em> where applicable.</p>`,
    },
    {
      id: "indemnification",
      title: "Indemnification",
      html: `
<p>You agree to indemnify and hold harmless ${entity} and its officers, employees, and contractors from any claims, losses, damages, and expenses (including reasonable legal fees) arising from:</p>
<ul>
  <li>Your use of the platform in violation of these terms</li>
  <li>Your violation of any applicable law or regulation</li>
  <li>Your infringement of any third party's intellectual property or other rights</li>
  <li>Any data you upload to the platform that causes harm to a third party</li>
</ul>`,
    },
    {
      id: "termination",
      title: "Termination",
      html: `
<p>You may cancel your subscription at any time from Settings &gt; Billing. Cancellation takes effect at the end of your current billing period.</p>
<p>We may suspend or terminate your account immediately if:</p>
<ul>
  <li>You violate these terms</li>
  <li>You fail to pay subscription fees after reasonable notice</li>
  <li>We are required to do so by law</li>
  <li>We reasonably believe your use poses a security risk</li>
</ul>
<p>On termination:</p>
<ul>
  <li>Your access to the platform will cease</li>
  <li>Your data will be retained for 30 days then permanently deleted</li>
  <li>You may request a data export within the 30-day retention period</li>
  <li>Any outstanding fees become immediately due</li>
</ul>`,
    },
    {
      id: "disputes",
      title: "Dispute resolution",
      html: `
<h3>Governing law</h3>
<p>These terms are governed by the laws of New Zealand. You agree to submit to the non-exclusive jurisdiction of the New Zealand courts.</p>
<h3>Disputes</h3>
<p>If you have a dispute with us please contact <a href="${termsMail}">${mail}</a> first. We will make every effort to resolve disputes informally. If we cannot resolve a dispute informally within 30 days either party may pursue their legal remedies.</p>
<p>For customers in Australia, Australian Consumer Law applies and you may have additional rights under that legislation.</p>`,
    },
    {
      id: "changes",
      title: "Changes to these terms",
      html: `
<p>We may update these terms from time to time. When we make material changes:</p>
<ul>
  <li>We will update the Last updated date at the top of this page</li>
  <li>We will notify account holders by email at least 14 days before changes take effect for existing customers</li>
  <li>New customers are bound by the terms in effect at the time of registration</li>
  <li>Continued use of the platform after changes take effect constitutes acceptance of the new terms</li>
</ul>
<p>If you do not agree with changes to the terms you may cancel your subscription before the changes take effect.</p>`,
    },
    {
      id: "contact",
      title: "Contact us",
      html: `
<p>For questions about these terms:</p>
<dl class="legal-contact">
  <div><dt>Email</dt><dd><a href="${termsMail}">${mail}</a></dd></div>
  <div><dt>Subject line</dt><dd>"Terms of Service Enquiry"</dd></div>
  <div><dt>Response time</dt><dd>We aim to respond ${REPLY_TIME}.</dd></div>
</dl>
<p>${entity}<br />New Zealand</p>`,
    },
  ],
};
