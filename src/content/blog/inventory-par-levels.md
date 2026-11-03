---
title: "Inventory par levels: a complete guide for wholesalers"
description: "How to calculate par levels and safety stock for every product, with formulas and a worked example. Plus what Centra One does for you today."
subtitle: "How to work out the right reorder point for every product in your warehouse, and which parts of the job Centra One can take off your hands."
category: "Inventory management"
published: "2026-06"
updated: "2026-11"
related: ["inventory/setting-up-products", "ai-features/understanding-centra-ai"]
---

Running out of stock costs a wholesale business more than a lost sale. It damages customer relationships, halts production lines and sends buyers straight to your competitors. Yet holding too much stock ties up working capital and raises the risk of expiry or obsolescence.

The answer is a well-defined **par level**: the minimum quantity you should always have on hand before placing a new order. This guide explains what par levels are, walks through the formulas wholesalers use to calculate them, and shows which parts of the job Centra One handles for you today.

## What are inventory par levels?

A **par level** is the minimum amount of stock you need on hand to meet expected demand until your next delivery arrives. When your actual stock drops to or below this level, it's time to reorder.

Think of it like the fuel light in a car. You don't wait until the tank is empty: you refuel when the warning light comes on. Your par level is that warning light for every product in your warehouse.

For wholesalers, par levels matter even more because:

- Customer orders are often large and infrequent, so one stockout can mean losing a major client
- Supplier lead times vary, especially for imported goods
- Many wholesale products have expiry dates (chemicals, food, pharmaceuticals)
- Seasonal demand spikes can catch you out if your par levels never change

> **Key distinction**
>
> Par level is the *minimum stock threshold* that triggers action. Reorder point is the *specific moment* you place the order. In practice, most wholesalers set them to the same number and reorder when stock hits par. Some industries, hospitality especially, use "par" for the full level you top up to. In this guide it means the point where you reorder.

## The basic par level formula

The simplest and most widely used formula combines your average demand during the lead time with a safety stock buffer:

> **Formula: basic par level**
>
> `Par level = (Average daily usage × Lead time in days) + Safety stock`
>
> This is the minimum quantity to keep on hand. When stock drops to this number, place a new order.

### Breaking down each part

**Average daily usage** is the typical number of units you sell per day. Work it out by dividing the total units sold over a period by the number of days in that period.

> **Formula: average daily usage**
>
> `Average daily usage = Total units sold ÷ Number of days`
>
> Use a 30, 60 or 90-day window. For seasonal products, use the same period from the previous year.

**Lead time** is the number of days between placing an order and receiving the goods. It includes supplier processing time, transit, and any receiving or inspection delays at your warehouse.

**Safety stock** is extra stock held as a buffer against unexpected demand spikes or supply delays. Without it, a single late delivery or one large customer order can wipe you out.

## How to calculate safety stock

Safety stock is where most wholesalers either overcompensate (tying up too much capital) or undercompensate (risking stockouts). A statistically sound approach uses how much your demand and your lead times vary:

> **Formula: safety stock with demand and lead time variability**
>
> `Safety stock = Z × √(Lead time × σd² + Average daily demand² × σLT²)`
>
> Z is your service factor: 1.65 for a 95% service level, 2.33 for 99%. σd is the standard deviation of daily demand and σLT is the standard deviation of the lead time in days. Both measure how far the actual numbers swing from the average.

If that looks complex, here's a simpler rule of thumb that works well for most wholesale businesses:

> **Formula: simplified safety stock**
>
> `Safety stock = Average daily usage × Lead time × Safety factor`
>
> Use a safety factor of 0.5 (a 50% buffer) for stable products, 1.0 (a 100% buffer) for unpredictable or critical items, and 0.25 for highly predictable, low-value goods.

> **Common mistake**
>
> Don't use the same safety stock percentage across your whole catalogue. A $2,000 industrial pump and a $5 packet of screws shouldn't have the same buffer strategy. Apply higher buffers to high-value, critical or long-lead-time items.

## Worked example: one product, start to finish

Here's a real-world example. Say you sell a commercial degreaser with these numbers:

- Average monthly sales: 240 units
- Supplier lead time: 14 days
- Demand is fairly stable (low variance)
- The product is moderately critical: customers expect it to be in stock

Work it out in four steps:

1. **Average daily usage:** `240 units ÷ 30 days = 8 units a day`
2. **Lead time demand:** `8 units a day × 14 days = 112 units`
3. **Safety stock:** `8 units a day × 14 days × 0.5 = 56 units`
4. **Par level:** `112 + 56 = 168 units`

**Result:** set the par level at 168 units. When stock on hand drops to 168, place a new order. During the 14-day lead time you expect to sell 112 units, which leaves 56 units of safety stock when the delivery arrives.

<!-- figure:par-level -->

## Factors that affect par levels in wholesale

The basic formula is a starting point. Real wholesale operations need to adjust their par levels for a few business-specific factors.

### Minimum order quantities (MOQs)

Your supplier may require orders in cases of 50 or pallets of 100. If your calculated par level is 168 but your MOQ is 200, either round up the reorder quantity or move your par level up to line up better with the order increments.

### Shelf life and expiry dates

For batch-tracked products like chemicals or food, your par level has to account for how much you can sell before expiry. A par level of 500 units is useless if half of them expire before you sell them.

### Seasonality

Pool chemicals sell faster in summer. Ice melt sells faster in winter. Static par levels fail here: you need seasonal par levels that rise before the peak season and fall afterwards.

### Customer contracts and SLAs

If you have a contract guaranteeing 48-hour delivery to a major client, your par levels for the items they order most need to reflect that commitment. That often means more safety stock.

### Warehouse location

If you run more than one warehouse, set par levels per location. A product that sells 50 units a week in Auckland may only sell 5 in Christchurch. Centralised purchasing with location-specific par levels stops slow branches from overstocking.

## What Centra One handles for you today

Calculating par levels by hand for hundreds or thousands of SKUs is a full-time job, and by the time you finish the spreadsheet the numbers are already out of date. Here's how Centra One helps today.

### Reorder points on every product

Give each product a reorder point (your par level) and a reorder quantity (how much to order). [Setting up your product catalogue](/help/inventory/setting-up-products) shows you how.

### Daily reorder suggestions

Every day, Centra One checks projected stock against your reorder points, counting what's already on order. Anything that needs ordering is scored from Critical to Low and grouped by supplier, and one click turns the suggestions into draft purchase orders for you to review.

### Alerts before you run out

Growth Intel alerts flag products that are critically low (under three days of stock) or below their reorder point, and batches that are close to expiring, so your purchasing team knows what to deal with first.

> **Centra AI actions**
>
> On the Growth and Scale plans you can ask Centra AI what needs reordering and have it draft the purchase orders, grouped by supplier. Nothing is sent until you approve it.

### Stock in every warehouse

Centra One shows live stock for each warehouse. Stock transfers move it between locations through a draft, dispatched and received workflow, so a slow branch can send its surplus to a busy one.

### Counts you can trust

Par levels are only as good as the stock figures behind them. ABC classification and rotating cycle counts keep your numbers accurate without shutting the warehouse for a full stocktake.

> **On the roadmap**
>
> Automatic demand forecasting and dynamic safety stock are on our roadmap. They aren't live yet. The plan is for Centra One to forecast demand for each SKU from your sales history and seasonal patterns, and to set safety stock from each product's demand swings and how reliable its supplier is. Until then, use the formulas above to set your reorder points and let Centra One do the watching and the paperwork. We'll announce it in the [changelog](/changelog) when it ships.

## Par level checklist for wholesale businesses

1. Calculate average daily usage for each SKU from at least 60 days of sales history
2. Record accurate lead times for every supplier, including processing and transit
3. Set safety stock from demand variability and how critical the product is, not a flat percentage
4. Adjust for seasonality by reviewing par levels every quarter
5. Factor in MOQs, expiry dates and customer SLAs
6. Review and update par levels monthly, because demand patterns change
7. Use an inventory system that turns your reorder points into reorder suggestions from live stock

## Conclusion

Par levels are the foundation of efficient wholesale inventory management. The right par level keeps stock flowing, capital working and customers happy. The wrong one leads to stockouts, overstuffed warehouses and burned cash.

The formulas in this guide give you a solid starting point. In a real operation with thousands of SKUs, several locations and shifting demand, the hard part is keeping up. Centra One takes on the watching and the reordering paperwork: you set the reorder points, and it tells you what needs ordering and drafts the purchase orders for you to approve.
