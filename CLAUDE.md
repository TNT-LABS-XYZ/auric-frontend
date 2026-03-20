# Auric Frontend

> **Purpose:** Context for Claude when working in this repository. Read this first.

**Last updated:** 2026-03-20
**Status:** Hackathon build (deadline: March 21, 2026)

---

## Project Overview

### Tether Gold DCA Engine (Hackathon)

Hackathon entry for Tether WDK (deadline: March 21). A gold savings engine that executes XAU₮ accumulation strategies on behalf of users. Users define plans via a Telegram bot or web dashboard (DCA schedules, price-triggered buys, goal-based targets, or AI agent strategies), and the engine monitors XAU₮ market conditions, evaluates signals, and settles USDT to XAU₮ on-chain via WDK. No manual intervention after setup.

Targeting LATAM where USDT is already a trusted inflation hedge and XAU₮ represents the natural next step: gold savings that work while you sleep.

### Goal

Build a working gold savings engine that demonstrates autonomous rule-based execution on Tether's WDK. A user should be able to define a savings strategy via Telegram or the web app, walk away, and receive a notification when the engine executes on their behalf.

The "wow" moment: set a rule, walk away, get notified that it executed.

### Scope

**In scope:**

- Engine: signal evaluation loop, rule condition matching, execution via WDK
- WDK integration: wallet creation, balance checks, USDT to XAU₮ swaps, withdrawals, tx confirmation
- Telegram bot: onboarding, rule creation flow, notifications, user commands (/status, /history, /pause, /edit, /withdraw)
- Web app: Auth0 login, dashboard (balances, plans, history, account management)
- AI agent strategy type: Claude-powered adaptive DCA with persistent memory
- MCP server: tool-based interface for Claude integrations
- Landing page: design, copy, deploy
- Documentation: architecture overview, setup instructions

**Out of scope:**

- Multi-asset support beyond XAU₮

### Strategy Types

| Type            | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `dca`           | Fixed-amount buys on a schedule (hourly/daily/weekly/monthly)                                                                              |
| `price_trigger` | Buy when XAU₮ drops below a price threshold                                                                                                |
| `goal`          | Accumulate toward a target XAU₮ amount                                                                                                     |
| `ai_agent`      | Claude-powered adaptive DCA — adjusts buy amount (50-150% of base) based on market context, with persistent memory and multi-step planning |

### User Flow

Landing Page > Web App (Auth0 login) or Telegram Bot > Create/Connect Wallet (WDK) > Fund with USDT > Define Plan (DCA / Price Trigger / Goal / AI Agent) > Engine Monitors + Evaluates > Executes On-Chain > User Gets Notified > Ongoing Management via Dashboard or Bot Commands

### Metadata

- Lead: Juan
- Members: David, Hugo, Juan
- Start date: Mar 14, 2026
- Target date: Mar 21, 2026

---

## Repository Structure

```
├── website/              # Marketing landing page (Next.js + Tailwind)
├── src/                  # Web app (Next.js + Auth0)
│   └── app/
│       ├── page.tsx              # Entry: login gate + dashboard router
│       ├── auth0-provider.tsx    # Auth0Provider wrapper
│       ├── layout.tsx            # Root layout with fonts
│       ├── helpers.ts            # Shared utility functions + tests
│       ├── helpers.test.ts       # Vitest tests for helpers
│       ├── hooks/
│       │   └── useAccount.ts     # Master auth + data hook
│       ├── components/
│       │   ├── Dashboard.tsx     # Main dashboard container
│       │   ├── AuricWordmark.tsx # Logo SVGs
│       │   ├── Icons.tsx         # Icon components
│       │   ├── Skeletons.tsx     # Loading states
│       │   ├── StatusBadge.tsx   # Strategy status badge
│       │   ├── WalletCard.tsx    # Wallet display
│       │   ├── ui.tsx            # Generic UI components
│       │   └── dashboard/
│       │       ├── Header.tsx          # Sticky nav
│       │       ├── BalanceSection.tsx   # Holdings + stats
│       │       ├── StrategiesSection.tsx # Plans list
│       │       ├── HistorySection.tsx   # Transaction history
│       │       ├── AccountSection.tsx   # Wallet, Telegram, MCP
│       │       └── shared.tsx          # Formatters, animations
│       └── api/
│           └── account/route.ts  # Server-side account creation proxy
├── package.json          # Root config
└── CLAUDE.md             # This file
```

### Deployment

Two separate Vercel projects on the same repo (tnt-labs team):

- **Website** (`website/`): Root directory set to `website` in Vercel
- **Web app** (root): Project `auric-app`, deployed at `auric-app-mu.vercel.app`

### Backend

The backend (`auric-backend`) is a separate repo deployed on Railway at `auric-backend-production.up.railway.app`. Built with NestJS + MongoDB.

Key backend features:

- WDK integration (wallet creation, token swaps, transfers)
- Strategy engine (evaluates every minute via cron)
- AI agent reasoning via Claude (claude-sonnet-4-6)
- Telegram bot
- MCP server for tool-based access
- Circuit breaker: auto-pauses strategies after consecutive failures

---

## Development Workflow

### Running locally

**Frontend (web app):**

```bash
cd /path/to/auric-frontend
npm run dev          # Runs on :3000
```

**Backend** (separate repo):

```bash
cd /path/to/auric-backend
npm run start:dev    # Runs on :3002
```

Frontend `.env.local` must have:

- `NEXT_PUBLIC_API_URL` — backend URL (localhost:3002 for dev)
- `NEXT_PUBLIC_TELEGRAM_BOT` — bot username
- `BACKEND_URL` — server-side backend URL
- `OPERATOR_API_KEY` — server-side key for account creation

### Auth

The web app uses **Auth0** for authentication:

- Domain: `dev-bvi655h85sxmwolm.us.auth0.com`
- The `useAccount` hook manages auth state, API calls, and data polling (60s interval)

### Tests

Tests use **Vitest**. Run with:

```bash
npx vitest run
```

`helpers.test.ts` covers critical data transformation logic — parseBalance, isZeroBalance, fmt6, formatRuleSummary, formatRuleDetail. These guard against type mismatches between backend API responses (strings) and frontend expectations (numbers).

### Visual QA with Playwright

**Every time you change the website or web app**, verify visually using the Playwright MCP tools:

1. Start the dev server (`npm run dev`)
2. Use `browser_navigate` to load `http://localhost:3000`
3. Use `browser_take_screenshot` to check the page looks correct
4. **Always check mobile** — resize to 390x844 (`browser_resize`) and screenshot again

Common issues to watch for:

- Content overflow on small screens
- Z-index conflicts between overlapping sections (e.g., sticky header vs modals)

---

## What is Auric?

Auric is TNT Labs' automated gold (XAU₮) accumulation engine.

Auric is built by **TNT Labs** for the Tether WDK hackathon.

**Auric is not a trading bot.** It executes the user's plans, not its own decisions. (The AI agent type adjusts buy amounts within user-defined bounds, but never decides independently to buy or sell.)

---

## Brand & Tone

### Core Voice

**Confident but approachable** — quiet authority, not hype.
**Benefit-first** — lead with what users can now do.
**Clean and direct** — no fluff, no filler, no AI theater.

### Language Rules

**Use:**

- "Your rules" / "your conditions" / "your intent"
- "Plan" (not "strategy" or "bot") in user-facing copy
- "Watches" / "monitors" / "surfaces"
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

_"If I get a 'gm bro. let's HODL!' notification, I delete the app without even opening it."_ — Noel

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

| Dimension      | Auric                      | Alternatives               |
| -------------- | -------------------------- | -------------------------- |
| Interaction    | Proactive (system watches) | Reactive (user checks)     |
| Control        | User-defined rules         | System-driven              |
| Trust          | Progressive delegation     | Immediate automation       |
| Custody        | Non-custodial, WDK-based   | Requires funds on exchange |
| Workflow       | Web dashboard + Telegram   | Fragmented tools           |
| Explainability | "Matches your rule"        | "AI recommends"            |

---

## UX Anti-Patterns (Avoid)

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
