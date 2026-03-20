# Auric Frontend

Monorepo for Auric's web properties: a marketing landing page (`website/`) and a web dashboard (`src/app/`). Both are Next.js projects deployed separately on Vercel.

Auric is an automated gold savings engine. Users define accumulation rules (DCA, price triggers, savings goals, AI agent) and Auric executes USDT to XAU₮ swaps on-chain via Tether's WDK.

---

## Repository Structure

```
.
├── website/          # Marketing landing page — own package.json, runs on :3001
├── src/app/          # Web dashboard — Auth0 login, plans, history, account
├── .env.local        # Web app environment variables (see setup below)
└── CLAUDE.md         # Project context for AI assistant
```

---

## Landing Page (`website/`)

Self-contained Next.js project. No environment variables required.

```bash
cd website
npm install
npm run dev        # → http://localhost:3001
```

> The landing page runs on port **3001** by default to avoid conflicts with the web app. If needed, change it in `website/package.json` or pass `-- --port 3001`.

**Deployed on Vercel** (tnt-labs team). Root directory in Vercel project is set to `website/`.

---

## Web App (root)

Next.js app at the repo root. Requires a backend connection and Auth0.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example file and fill in the values:

```bash
cp .env.local.example .env.local
```

| Variable                   | Description                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`      | Backend base URL visible to the browser (e.g. `http://localhost:3002`) |
| `NEXT_PUBLIC_TELEGRAM_BOT` | Telegram bot username (without `@`)                                    |
| `BACKEND_URL`              | Backend base URL for server-side calls (usually same as above)         |
| `OPERATOR_API_KEY`         | Server-side key used by the account creation API route                 |

### 3. Start the dev server

```bash
npm run dev        # → http://localhost:3000
```

### 4. Run tests

```bash
npx vitest run
```

Tests cover the critical data transformation helpers in `src/app/helpers.ts`.

**Deployed on Vercel** as project `auric-app`, at `auric-app-mu.vercel.app`.

---

## Backend

The backend is a separate repo ([auric-backend](https://github.com/TNT-LABS-XYZ/auric-backend)) deployed on Railway at `auric-backend-production.up.railway.app`.

To point at the production backend, set these in `.env.local`:

```
NEXT_PUBLIC_API_URL=https://auric-backend-production.up.railway.app
BACKEND_URL=https://auric-backend-production.up.railway.app
```

To run it locally instead:

```bash
cd /path/to/auric-backend
npm run start:dev  # → http://localhost:3002
```

---

## Related Resources

- `context/brand_voice.md` — writing voice and tone
- `context/brand_guidelines.md` — colors, typography, logo
- `CLAUDE.md` — full project context (architecture, strategy types, UX principles)
