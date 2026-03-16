# Auric Frontend

> **Purpose:** Context for Claude when working in this repository. Read this first.

**Last updated:** 2026-03-16
**Status:** Hackathon build (deadline: March 21, 2026)

---

## Project Overview

### Tether Gold DCA Engine (Hackathon)

Hackathon entry for Tether WDK (deadline: March 21). A gold savings engine that executes XAU₮ accumulation strategies on behalf of users. Users define rules via a Telegram bot (DCA schedules, price-triggered buys, or goal-based targets), and the engine monitors XAU₮ market conditions, evaluates signals, and settles USDT to XAU₮ on-chain via WDK. No manual intervention after setup.

Targeting LATAM where USDT is already a trusted inflation hedge and XAU₮ represents the natural next step: gold savings that work while you sleep.

Target: 2-3 days of work.

### Goal

Build a working gold savings engine that demonstrates autonomous rule-based execution on Tether's WDK. A user should be able to define a savings strategy via Telegram, walk away, and receive a notification when the engine executes on their behalf.

The "wow" moment: set a rule, walk away, get notified that it executed.

### Scope

**In scope:**
- Engine: signal evaluation loop, rule condition matching, execution via WDK
- WDK integration: wallet creation, balance checks, USDT to XAU₮ swaps, tx confirmation
- Telegram bot: onboarding, rule creation flow, notifications, user commands (/status, /history, /pause, /edit, /withdraw)
- Landing page: design, copy, deploy
- Documentation: architecture overview, setup instructions

**Out of scope:**
- Frontend web app
- OpenClaw or any external agent framework
- Multi-asset support beyond XAU₮
- Advanced TA signals (keep it to price + DCA + goal-based for v1)

### User Flow

Landing Page > Telegram Bot > Create/Connect Wallet (WDK) > Fund with USDT > Define Strategy (DCA / Price Trigger / Goal) > Engine Monitors + Evaluates > Executes On-Chain > User Gets Notified > Ongoing Management via Bot Commands

### Metadata
- Status: Discovery
- Lead: Juan
- Members: David, Hugo, Juan
- Start date: Mar 14, 2026
- Target date: Mar 21, 2026

---

## Repository Structure

```
├── landing/          # Marketing landing page (Next.js + Tailwind)
├── src/              # App (future — out of scope for hackathon)
├── package.json      # Root config
└── CLAUDE.md         # This file
```

The landing page is a self-contained Next.js project in `landing/`. It has its own `package.json`, `node_modules`, and dev server.

---

## What is Auric?

Auric is the product name for Quant's first vertical: automated gold (XAU₮) accumulation.

Auric is built by **TNT Labs**, the same team behind Quant. Quant is the broader automation execution layer for crypto. Auric is a focused application of Quant's engine for gold savings, built for the Tether WDK hackathon.

**Auric is not a trading bot.** It executes the user's rules, not its own decisions.

---

## Brand & Tone

### Core Voice

**Confident but approachable** — quiet authority, not hype.
**Benefit-first** — lead with what users can now do.
**Clean and direct** — no fluff, no filler, no AI theater.

### Language Rules

**Use:**
- "Your rules" / "your conditions" / "your intent"
- "Watches" / "monitors" / "surfaces"
- "Plan" (not "strategy" or "bot")
- "Approve" / "confirm"
- "Acts when you'd act"
- "Watches while you sleep"
- "Gold that works while you sleep" (primary headline)

**Never use:**
- "Bot" / "agent" / "autonomous" (in user-facing copy)
- "AI-powered" as a leading adjective
- "Smart" / "intelligent" as marketing descriptors
- "gm" / "HODL" / "WAGMI" / crypto-bro tone
- "Robo-advisor" / "portfolio manager"
- "Powerful" / "revolutionary" / "cutting-edge"
- Emojis (never, in any content)

### Hard boundary from research:
*"If I get a 'gm bro. let's HODL!' notification, I delete the app without even opening it."* — Noel

---

## Product Principles

1. **Delegate attention before execution** — users stop watching markets before enabling auto-execute.
2. **Make intent explicit, execution constrained** — users define clear rules; Auric executes only within those bounds.
3. **Prefer silence to noise** — no alerts without intent. No interruptions without relevance.
4. **Reflect the user's logic back to them** — "This matches your rule" not "Auric decided."
5. **Earn trust through repetition, not configuration** — trust is built through demonstrated correctness over time.

---

## Core Positioning

**For** people in LATAM who already use USDT to protect their savings,
**who** want exposure to gold but can't watch markets 24/7,
**Auric is** a patient gold savings engine
**that** watches XAU₮ markets on your behalf and accumulates according to your rules.
**Unlike** trading bots or exchanges, Auric reflects your own rules back to you — it never decides for you.

### The Core Insight

Users don't need help making decisions. They need help with **execution readiness and timing**.

### Key Differentiators

| Dimension | Auric | Alternatives |
|-----------|-------|-------------|
| Interaction | Proactive (system watches) | Reactive (user checks) |
| Control | User-defined rules | System-driven |
| Trust | Progressive delegation | Immediate automation |
| Custody | Non-custodial, WDK-based | Requires funds on exchange |
| Workflow | Single surface (Telegram) | Fragmented tools |
| Explainability | "Matches your rule" | "AI recommends" |

---

## UX Anti-Patterns (Avoid)

- Dashboards as primary surfaces
- Real-time charts as default views
- Bot or agent metaphors in copy
- Gamification
- Confidence scores or probabilities

---

## Related Context

For full product strategy, positioning framework, user research synthesis, and competitive analysis, see the Quant-context repo at `/Users/davidfernandez/TNT Labs/Quant-context/`.

Key files there:
- `CLAUDE.md` — full product context
- `product beta/product_positioning.md` — positioning framework
- `business-context/quant_brand_tone.md` — brand voice guide
- `user-research/research-synthesis.md` — user interview insights
