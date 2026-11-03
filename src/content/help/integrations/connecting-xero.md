---
title: "Connecting Xero to Centra One"
summary: "Send invoices, contacts and bills from Centra One to Xero, with GST and account codes set line by line."
updated: "2026-11"
order: 1
related: ["purchasing/create-purchase-order", "getting-started/your-first-30-minutes", "settings/managing-users"]
---

## What the Xero integration does

Centra One sends your sales and purchasing paperwork to Xero, so nobody has to key it in twice:

- **Invoices** raised in Centra One go to Xero. By default they arrive as Awaiting Approval, so someone can check them before they reach your ledger. If Centra One emails a customer's invoices for you, theirs arrive already approved.
- **Contacts** for your customers and suppliers go to Xero.
- **Bills** from your purchase orders go to Xero.
- **GST and account codes** are set on every line, using the mappings you choose. Tax-inclusive and tax-exclusive prices are both handled.

## It's a one-way push

Everything goes from Centra One to Xero. Nothing comes back:

- Payments you record in Xero don't update invoices in Centra One. Use Xero as your record of what has been paid.
- Changes you make to a contact in Xero don't come back to Centra One, so keep customer and supplier details up to date in Centra One.

Centra One is the system of record for orders and stock, and Xero stays the system of record for your books. Pulling changes back from Xero isn't available. If that changes, we'll say so in the [changelog](/changelog).

## Connecting your Xero account

1. Go to **Settings > Integrations > Xero**.
2. Click **Connect Xero**.
3. You're taken to Xero to authorise the connection.
4. Log in to Xero and select your organisation.
5. Click **Allow Access**.
6. You're returned to Centra One, and the connection is active.

## Configuring the integration

After connecting:

1. Map your Centra One tax rates to your Xero tax rates.
2. Select the Xero accounts for sales, purchases and inventory.
3. Choose whether to send historical invoices to Xero.
4. Click **Save configuration**.

## When invoices are sent

Invoices go to Xero automatically when they're created or updated in Centra One.

Before anything is posted, Centra One checks it. If something is missing, such as a tax rate or an account with no Xero mapping, the push stops and you see an error that names what's missing. Incomplete data never reaches your books. Add the missing mapping in **Settings > Integrations > Xero** and the push can go through.

> **Important**
>
> If you already have contacts in Xero, Centra One matches them by email address. Check that your customer and supplier email addresses are correct before you connect.
