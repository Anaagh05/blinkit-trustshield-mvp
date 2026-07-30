# Blinkit TrustShield + AI Review Intelligence — AI-Native MVP

## Context

### The Business Problem

Quick-commerce users on Blinkit exhibit highly repetitive shopping behavior — **72% repeat-buy from the same categories**. The strategic goal is to **increase the percentage of Monthly Active Customers who purchase from at least one new category every month** (e.g., a grocery buyer starts buying electronics, a snack buyer starts buying personal care).

### Research Summary

| Phase | What Was Done | Key Output |
|-------|---------------|------------|
| **Part 1 — AI Discovery Engine** | Analyzed 2,313 reviews across 6 platforms using Gemini 2.5 Flash/Pro | Live Dashboard |
| **Part 2 — User Interviews** | Conducted 13 structured interviews with Blinkit users (23–35, working professionals) | Interview Data |
| **Part 3 — Problem Definition** | Synthesized AI insights + primary research into a validated problem statement | See below |

### Validated Problem Statement

> **Target Segment**: Working professionals (23–35) who use Blinkit 2–3x/week for groceries but have **never confidently purchased a non-grocery/high-value item** on the platform.
>
> **Root Cause**: Users lack **trust signals** (reviews, authenticity badges, return guarantees) and **sufficient product information** to feel confident buying unfamiliar or high-value items on a quick-commerce platform they associate only with groceries.
>
> **User Workaround**: Default to Amazon, Flipkart, or Nykaa for non-grocery purchases despite Blinkit offering the same items with 10-minute delivery.
>
> **User Value**: Reduces purchase anxiety for new categories → unlocks the convenience of 10-min delivery for items they currently wait 2–3 days to receive.
>
> **Business Value**: Increases cross-category adoption → higher AOV, improved retention, and expanded addressable market per user.

---

## Part 4: AI-Native MVP

### What We're Building

A **functional, deployed prototype** of an enhanced **Product Detail Page (PDP)** for a non-grocery, high-value item on Blinkit. The PDP features two AI-native trust-building components that directly address the validated pain points from Parts 1–3.

### Demo Product

| Field   | Value                                  |
|---------|----------------------------------------|
| Product | **boAt Airdopes 141 Wireless Earbuds** |
| Price   | **₹1,499**                             |
| Category | Electronics & Accessories (non-grocery) |

> Chosen because it represents exactly the type of high-value, non-grocery item users hesitate to buy on Blinkit.

---

## Tech Stack

| Layer       | Technology                       | Cost |
|-------------|----------------------------------|------|
| Framework   | **React** (Vite)                 | Free |
| Styling     | **Tailwind CSS**                 | Free |
| AI Backend  | **Google Gemini 2.0 Flash API**  | Free (15 RPM / 1M tokens/day) |
| Deployment  | **Vercel** (Hobby tier)          | Free |
| Data        | Mock review dataset (JSON)       | Bundled in app |

---

## Core Features

### 1. 🛡️ TrustShield Banner

> **Solves**: "Lack of Trust" + "Return/Replacement Concerns" — validated by **10/13 interviewees**

A highly visible trust-building banner positioned just below the product title and price.

| Trust Signal | Display |
|-------------|---------|
| 🛡️ **Brand Authorized · Verified Supply Chain** | Sourced from authorized distributors — not an absolute "100%" claim, legally defensible |
| 📦 **Easy Doorstep Return · No Questions Asked** | 48-hour return window with same-day pickup scheduling — operationally feasible, financially sustainable |

**Why this matters** (from research):
- *"I am unsure about product authenticity, quality, or warranty for expensive/brand items on quick commerce."* — 8/13 users
- *"I worry about hassle-free returns or replacements if the item is defective or wrong."* — 5/13 users

---

### 2. ✨ AI Review Summarizer + Pros/Cons

> **Solves**: "Insufficient Information" — validated by **6/13 interviewees** + **920 discovery engine reviews**

A section titled **"What Buyers Are Saying"** with a CTA button: **"✨ Summarize Reviews with AI"**.

**How it works**:
1. User taps the button.
2. App sends **20 curated reviews** (trimmed to 150 chars each) to **Gemini 2.0 Flash** in a **single combined API call**.
3. A loading skeleton is shown while the API responds.
4. Gemini returns a **structured JSON response** containing ALL AI outputs at once:

```json
{
  "summary": "Buyers highlight fast delivery and genuine product quality...",
  "pros": ["Great sound quality", "Fast Blinkit delivery"],
  "cons": ["Bass could be stronger"],
  "quickAsk": {
    "genuine": "boAt is an authorized seller on Blinkit with a verified supply chain...",
    "returns": "Blinkit offers a no-questions-asked doorstep return within 48 hours...",
    "worthIt": "At ₹1,499 with 10-min delivery + doorstep returns, you save time and hassle..."
  }
}
```

5. Result is **cached in `sessionStorage`** — revisiting the page uses the cache, zero additional API calls.

---

### 3. ❓ AI Quick-Ask Buttons

> **Solves**: Specific purchase anxieties — without adding a full chatbot that contradicts the "intent-driven" user behavior

Three **pre-set, tappable question buttons** that address the exact pain points from user interviews:

| Button | Maps to Research Pain Point |
|--------|---------------------------|
| 🛡️ *"Is this product genuine?"* | Lack of Trust (8/13 users) |
| 📦 *"What if I don't like it?"* | Return Concerns (5/13 users) |
| 💰 *"Why is this worth it?"* | Price Sensitivity (6/13 users) — reframed as value proposition |

**How it works**:
1. Answers are **pre-fetched** as part of the single Gemini API call.
2. User taps a question button.
3. The cached answer is **instantly revealed** — no API call, no loading state.

---

## Token Efficiency Strategy

All AI features are powered by a **single combined Gemini API call** per user session.

| Optimization | Detail |
|-------------|--------|
| **Single API call** | One prompt returns summary + pros/cons + all 3 quick-ask answers |
| **Curated reviews** | Only 20 most relevant reviews sent, each trimmed to 150 chars |
| **Session caching** | Result cached in `sessionStorage` — page revisits cost 0 tokens |
| **Gemini 2.0 Flash** | Fastest, cheapest model in the Gemini family |

---

## How Each Feature Maps to Research

| Research Finding | MVP Feature |
|-----------------|-------------|
| 72% users repeat-buy same categories | PDP for a **non-grocery** item showcases cross-category buying |
| 0 trust signals for new categories | **TrustShield Banner** — Brand Authorized + Easy Doorstep Return |
| "Insufficient Information" (6/13 users) | **AI Review Summarizer** with real Gemini-powered summaries |
| "Lack of Trust" (8/13 users) | **Quick-Ask: "Is this genuine?"** — AI confirms authorized supply chain |
| "Return Concerns" (5/13 users) | **Quick-Ask: "What if I don't like it?"** — AI explains 48-hr return |
| "Price Sensitivity" (6/13 users) | **Quick-Ask: "Why is this worth it?"** — AI highlights value |
| 9/13 are intent-driven (< 2 min sessions) | **No chatbot** — one-tap buttons, zero friction |
