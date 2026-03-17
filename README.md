# Auric Frontend

Monorepo for Auric's web properties: the marketing landing page and the web app (in progress).

Auric is an autonomous gold savings engine. Users define accumulation rules (DCA, price triggers, savings goals) and Auric executes USDT to XAU₮ swaps on-chain via Tether's WDK. Primary interface is a Telegram bot; this repo handles the web layer.

---

## Structure

```
.
├── website/          # Marketing landing page (deployed on Vercel)
├── src/app/          # Web app (in progress)
├── context/          # Brand voice and guidelines
└── CLAUDE.md         # AI assistant context
```

---

## Marketing Landing Page

Self-contained Next.js project in `website/`. Has its own `package.json` and dependencies.

```bash
cd website
npm install
npm run dev        # → http://localhost:3000
```

Deployed on Vercel (tnt-labs team). Root directory in Vercel is set to `website/`.

- Bilingual (EN/ES) with language toggle
- Responsive (desktop + mobile)
- Copy follows brand voice guidelines in `context/`

---

## Web App

Next.js app at the repo root (`src/app/`). In progress.

```bash
npm install
npm run dev        # → http://localhost:3000
```

---

## Related Repos

- **[auric-backend](https://github.com/TNT-LABS-XYZ/auric-backend)** — NestJS backend: engine, WDK integration, Telegram bot, REST API, MCP server

---

## Brand Resources

- `context/brand_voice.md` — writing voice and tone guidelines
- `context/brand_guidelines.md` — colors, typography, logo, design rules
