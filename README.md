# Nullryns (Øryns) — Company Website

The official website for **Nullryns (Øryns)**, a Kenyan software development collective building purposeful digital solutions. Built as a full-stack monorepo with a React + Vite frontend, Express 5 API backend, PostgreSQL database, and an admin dashboard for managing client enquiries.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Site Structure & Pages](#site-structure--pages)
4. [User Flows](#user-flows)
5. [Architecture](#architecture)
6. [Database Schema](#database-schema)
7. [API Reference](#api-reference)
8. [Admin Dashboard](#admin-dashboard)
9. [Email Notifications](#email-notifications)
10. [Environment Variables](#environment-variables)
11. [Local Development](#local-development)
12. [Deployment Guide](#deployment-guide)
    - [Step 1 — Push to GitHub](#step-1--push-to-github)
    - [Step 2 — Set up Supabase (Database)](#step-2--set-up-supabase-database)
    - [Step 3 — Deploy on Render](#step-3--deploy-on-render)
    - [Step 4 — Configure Environment Variables on Render](#step-4--configure-environment-variables-on-render)
    - [Step 5 — Run Database Migrations on Render](#step-5--run-database-migrations-on-render)
    - [Step 6 — Verify & Go Live](#step-6--verify--go-live)
13. [Colour Palette](#colour-palette)

---

## Project Overview

Nullryns (Øryns) is a software development collective based in Kenya. The website serves as:

- A **marketing site** showcasing services, projects, and team members
- A **lead generation tool** via the Contact form and "Start a Project" inquiry form
- An **admin hub** where the team can view messages, manage project inquiries, and track pipeline status
- A **training information page** describing training programs offered

The backend is a single Express service. In production it serves both the compiled React frontend (as static files) **and** the `/api` routes — so only one Render service is needed.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, TypeScript, Tailwind CSS v4 |
| Routing | React Router v7 |
| API client | TanStack React Query + Orval (code-generated from OpenAPI spec) |
| Backend | Express 5, TypeScript, Node.js 24 |
| Database | PostgreSQL (Supabase in production) |
| ORM | Drizzle ORM + drizzle-zod |
| Validation | Zod v4 |
| Email | Resend |
| Auth (admin) | express-session + PIN |
| Monorepo | pnpm workspaces |
| Build | esbuild (server), Vite (frontend) |
| Logging | Pino + pino-http |

---

## Site Structure & Pages

```
/                   → Home           — hero, tagline, services overview, call to action
/about              → About          — mission, story, values, GitHub link
/services           → Services       — 6 core service cards (web, mobile, cloud, AI, UX, data)
/projects           → Projects       — case study cards for past work
/team               → Team           — team member cards with roles and skills
/training           → Training       — training programs offered (bootcamps, workshops)
/contact            → Contact        — contact form (name, email, phone, company, service, message)
/start-a-project    → Start Project  — detailed project inquiry form (service type, budget, timeline, description)
/admin              → Admin          — PIN-gated dashboard (see below)
```

---

## User Flows

### 1. Visitor enquires via Contact form
```
Visitor fills /contact form
  → POST /api/contact (public)
  → Row saved to contact_messages table
  → Email notification sent to Nullryns@atomicmail.com (via Resend)
  → Success message shown to visitor
```

### 2. Visitor submits a project inquiry
```
Visitor fills /start-a-project form (service, budget, timeline, description)
  → POST /api/inquiries (public)
  → Row saved to inquiries table with status = "new"
  → Email notification sent to Nullryns@atomicmail.com (via Resend)
  → Success message shown to visitor
```

### 3. Admin reviews enquiries
```
Team member visits /admin
  → PIN gate shown (enters ADMIN_PIN)
  → POST /api/admin/login verifies PIN → creates server session
  → Dashboard unlocks showing:
      - Contact Messages tab  (GET /api/contact)
      - Project Inquiries tab (GET /api/inquiries)
  → Admin can move inquiry status through pipeline:
      new → in-discussion → quoted → closed
      (PATCH /api/inquiries/:id/status)
  → Sign out destroys session (POST /api/admin/logout)
```

---

## Architecture

```
pnpm monorepo
├── artifacts/
│   ├── nullryns-web/          # React + Vite frontend
│   │   └── src/
│   │       ├── pages/         # One component per route
│   │       ├── components/    # Shared UI (Navbar, Footer, etc.)
│   │       └── App.tsx        # React Router configuration
│   └── api-server/            # Express 5 backend
│       └── src/
│           ├── app.ts         # Express setup, session, static serving (prod)
│           ├── routes/        # contact, inquiries, adminAuth, health
│           ├── middleware/    # requireAdmin
│           └── lib/           # logger, email (Resend)
├── lib/
│   ├── db/                    # Drizzle ORM schema + client
│   ├── api-spec/              # OpenAPI spec (openapi.yaml) + Orval config
│   ├── api-client-react/      # Generated React Query hooks (do not edit)
│   └── api-zod/               # Generated Zod schemas (do not edit)
└── render-build.sh            # Single build script for Render deployment
```

**Key architectural decisions:**
- **Single Render service** — Express serves both `/api` routes AND the built Vite frontend as static files in `NODE_ENV=production`. No separate static hosting needed.
- **Contract-first API** — The OpenAPI spec in `lib/api-spec/openapi.yaml` is the single source of truth. React Query hooks and Zod validators are code-generated with `pnpm --filter @workspace/api-spec run codegen`.
- **Session-based admin auth** — No JWT complexity. `express-session` with a PIN stored in env. Cookies are `httpOnly`, `secure: true` in production, `sameSite: none` for cross-subdomain cookies on Render.
- **Fire-and-forget emails** — Email is sent after `res.status(201).json(...)` so an email failure never blocks the API response. Errors are logged via Pino.

---

## Database Schema

### `contact_messages`
| Column | Type | Notes |
|---|---|---|
| id | serial | Primary key |
| full_name | text | Required |
| email | text | Required |
| phone | text | Optional |
| company | text | Optional |
| service | text | Optional — which service they're interested in |
| message | text | Required |
| created_at | timestamp | Auto-set on insert |

### `inquiries`
| Column | Type | Notes |
|---|---|---|
| id | serial | Primary key |
| full_name | text | Required |
| email | text | Required |
| phone | text | Optional |
| company | text | Optional |
| service_type | text | Required — type of project |
| budget_range | text | Optional |
| timeline | text | Optional |
| description | text | Required — project description |
| status | text | `new` → `in-discussion` → `quoted` → `closed` |
| created_at | timestamp | Auto-set on insert |

---

## API Reference

All routes are prefixed with `/api`.

### Public routes

| Method | Path | Description |
|---|---|---|
| GET | `/api/healthz` | Health check — returns `{ status: "ok" }` |
| POST | `/api/contact` | Submit a contact form message |
| POST | `/api/inquiries` | Submit a project inquiry |
| POST | `/api/admin/login` | PIN login — creates admin session |
| GET | `/api/admin/session` | Check if current session is authenticated |

### Protected routes (require admin session)

| Method | Path | Description |
|---|---|---|
| GET | `/api/contact` | List all contact messages |
| GET | `/api/inquiries` | List all project inquiries |
| PATCH | `/api/inquiries/:id/status` | Update inquiry status |
| POST | `/api/admin/logout` | Destroy admin session |

---

## Admin Dashboard

Navigate to `/admin` on the live site.

1. Enter the **admin PIN** (set via `ADMIN_PIN` environment variable)
2. The dashboard shows two tabs:
   - **Contact Messages** — all messages submitted via the /contact form
   - **Project Inquiries** — all inquiries with a status pipeline
3. Use the status dropdown on each inquiry card to move it through:
   `new` → `in-discussion` → `quoted` → `closed`
4. Click **Sign out** to end the session

To change the PIN: update `ADMIN_PIN` in your environment/secrets and restart the server. No code changes needed.

---

## Email Notifications

When a visitor submits either form, a formatted HTML email is sent to **Nullryns@atomicmail.com** via [Resend](https://resend.com).

- **Contact form** → subject: `New Contact Message from <name>`
- **Project inquiry** → subject: `New Project Inquiry from <name>`

Emails include all submitted fields in a branded table. If `RESEND_API_KEY` is not set the server logs a warning and continues without sending.

> **Note:** Resend's free tier sends from `onboarding@resend.dev`. To send from your own domain (e.g. `notifications@nullryns.com`), add and verify your domain in the Resend dashboard, then update the `FROM` constant in `artifacts/api-server/src/lib/email.ts`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string (e.g. Supabase) |
| `SESSION_SECRET` | ✅ | Long random string for signing session cookies |
| `ADMIN_PIN` | ✅ | Numeric or alphanumeric PIN for admin access |
| `RESEND_API_KEY` | ✅ | API key from resend.com for email notifications |
| `NODE_ENV` | ✅ (prod) | Set to `production` on Render |
| `PORT` | Set by Render | Port for the Express server |

---

## Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Set environment variables (copy to .env or set in Replit Secrets)
# DATABASE_URL, SESSION_SECRET, ADMIN_PIN, RESEND_API_KEY

# 3. Push database schema (first time only, or after schema changes)
pnpm --filter @workspace/db run push

# 4. The Replit workflows handle running both services — or run manually:
pnpm --filter @workspace/api-server run dev     # API on :8080
pnpm --filter @workspace/nullryns-web run dev   # Frontend on configured port

# 5. Regenerate API hooks after changing openapi.yaml
pnpm --filter @workspace/api-spec run codegen

# 6. Typecheck everything
pnpm run typecheck
```

---

## Deployment Guide

The production deployment uses:
- **Supabase** — managed PostgreSQL database (free tier available)
- **Render** — single web service running the Express server (which also serves the frontend)

### Step 1 — Push to GitHub

Make sure your code is in a GitHub repository. From your project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Nullryns/<your-repo-name>.git
git push -u origin main
```

---

### Step 2 — Set up Supabase (Database)

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **New project** — choose a name (e.g. `nullryns-prod`), set a strong database password, pick a region closest to Kenya (e.g. **eu-west-1** / Frankfurt, or **ap-southeast-1** / Singapore)
3. Wait for the project to provision (~1 minute)
4. In the left sidebar go to **Project Settings → Database**
5. Scroll to **Connection string** → select **URI** mode
6. Copy the connection string — it looks like:
   ```
   postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres
   ```
7. Replace `<password>` with your actual database password
8. **Save this URL** — you'll need it in Step 4

> **Important:** Supabase requires SSL. The connection string already includes this. Drizzle will connect correctly.

---

### Step 3 — Deploy on Render

1. Go to [render.com](https://render.com) and sign in (or create a free account)
2. Click **New → Web Service**
3. Connect your GitHub account and select your repository
4. Configure the service:

   | Setting | Value |
   |---|---|
   | **Name** | `nullryns-web` (or any name you like) |
   | **Region** | Oregon (US West) or Frankfurt (EU) |
   | **Branch** | `main` |
   | **Root Directory** | *(leave blank)* |
   | **Runtime** | `Node` |
   | **Build Command** | `npm install -g pnpm && bash render-build.sh` |
   | **Start Command** | `NODE_ENV=production node --enable-source-maps artifacts/api-server/dist/index.mjs` |
   | **Instance Type** | Free (or Starter for always-on) |

5. Click **Create Web Service** — Render will start building

---

### Step 4 — Configure Environment Variables on Render

After creating the service, go to the service's **Environment** tab and add these variables:

| Key | Value |
|---|---|
| `DATABASE_URL` | Your Supabase connection string from Step 2 |
| `SESSION_SECRET` | A long random string — generate one with: `openssl rand -base64 32` |
| `ADMIN_PIN` | Your chosen admin PIN (e.g. `9847`) |
| `RESEND_API_KEY` | Your Resend API key |
| `NODE_ENV` | `production` |

Click **Save Changes** — Render will automatically redeploy.

---

### Step 5 — Run Database Migrations on Render

The database tables need to be created in Supabase before the app can work.

**Option A — Using Render Shell (easiest):**

1. In your Render service dashboard, click **Shell**
2. Run:
   ```bash
   pnpm --filter @workspace/db run push
   ```
   This runs `drizzle-kit push` which creates the `contact_messages` and `inquiries` tables.

**Option B — Using Supabase SQL Editor:**

1. In your Supabase project, go to **SQL Editor**
2. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service_type TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

---

### Step 6 — Verify & Go Live

1. Once the Render deploy finishes (green ✅), open your Render URL (e.g. `https://nullryns-web.onrender.com`)
2. Check the site loads correctly
3. Test the health endpoint: `https://nullryns-web.onrender.com/api/healthz` → should return `{"status":"ok"}`
4. Submit a test contact message — you should receive an email at Nullryns@atomicmail.com
5. Visit `/admin`, enter your PIN, and confirm the message appears in the dashboard

**Custom domain (optional):**
In the Render service → **Settings → Custom Domains**, add your domain (e.g. `nullryns.com`) and follow the DNS instructions to point it at Render.

---

## Colour Palette

| Role | Hex | Usage |
|---|---|---|
| Primary (dark brown) | `#3B2A1E` | Headings, navbar background |
| Secondary (medium brown) | `#5E4634` | Subheadings, hover states |
| Accent (warm gold) | `#C4A484` | Highlights, badges, borders |
| Background Light | `#FAF7F2` | Light mode page background |
| Background Dark | `#121212` | Dark mode page background |

> **Note for developers:** In dark mode, Tailwind's `text-accent` maps to a near-black value due to the theme config. Always use `style={{ color: '#C4A484' }}` or a custom utility class when you need the brand gold colour in dark mode.

---

*Built with ❤ by Nullryns (Øryns) — [github.com/Nullryns](https://github.com/Nullryns)*
