# Deploy NEXUME AI on Render (manual)

Three separate services:

| Service | Folder | Render type |
|---------|--------|---------------|
| **Frontend** | `ai-resume-builder/` | Static Site |
| **Backend (Strapi)** | `backend/ai-resume-admin/` | Web Service + PostgreSQL |
| **ATS API** | `Resume-ATS-Checker-main/` | Web Service (already live) |

Repo: `https://github.com/akshad110/Nexume_AI`

---

## 1. Push to GitHub (one time)

```powershell
cd "C:\Users\Akshad\OneDrive\Documents\Desktop\RESUME_BUILDER"
git add .
git status
git commit -m "Prepare Render deploy: frontend, Strapi backend, branding"
git push origin main
```

Never commit `.env`, `.env.local`, or API keys.

---

## 2. Backend — Strapi (`backend/ai-resume-admin`)

### Step A — PostgreSQL database

1. [Render Dashboard](https://dashboard.render.com) → **New +** → **PostgreSQL**
2. Name: `nexume-strapi-db` → **Create**
3. Copy **Internal Database URL** (use internal URL for Strapi on Render)

### Step B — Web Service (Strapi)

1. **New +** → **Web Service** → connect **Nexume_AI** repo
2. Settings:

| Field | Value |
|-------|--------|
| **Name** | `nexume-strapi-api` |
| **Root Directory** | `backend/ai-resume-admin` |
| **Runtime** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | Free or Starter |

3. **Environment variables** (Environment tab):

```
NODE_ENV=production
HOST=0.0.0.0
PORT=10000

DATABASE_CLIENT=postgres
DATABASE_URL=<paste Internal Database URL from Step A>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=false

APP_KEYS=<4 random strings, comma-separated>
API_TOKEN_SALT=<random>
ADMIN_JWT_SECRET=<random>
TRANSFER_TOKEN_SALT=<random>
JWT_SECRET=<random>
ENCRYPTION_KEY=<random>

CORS_ORIGINS=https://YOUR-FRONTEND.onrender.com,http://localhost:5173
```

Generate secrets (PowerShell):

```powershell
# Run 5 times for salts/secrets; use 4 comma-separated for APP_KEYS
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

4. Deploy → wait until **Live**
5. Open `https://nexume-strapi-api.onrender.com/admin` → create admin user (first time only)

### Step C — Strapi API token (for frontend)

1. Strapi Admin → **Settings** → **API Tokens** → **Create new API Token**
2. Name: `frontend`, Type: **Full access** (or custom with `user-resume` find/create/update/delete)
3. Copy token → use as `VITE_STRAPI_API_KEY` on frontend

### Step D — Permissions

**Settings** → **Users & Permissions** → **Roles** → **Public** (if using public role)  
Or rely on API token only (your app uses Bearer token — recommended).

Ensure `user-resume` collection exists with fields from `STRAPI_FIELDS_SETUP.md`.

---

## 3. Frontend — React (`ai-resume-builder`)

1. **New +** → **Static Site** → connect **Nexume_AI**
2. Settings:

| Field | Value |
|-------|--------|
| **Name** | `nexume-ai-app` |
| **Root Directory** | `ai-resume-builder` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

3. **Environment variables** (required at **build** time):

```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_or_pk_test_...
VITE_STRAPI_API_URL=https://nexume-strapi-api.onrender.com/api
VITE_STRAPI_API_KEY=<token from Strapi Step C>
VITE_ATS_API_URL=https://nexume-ats-api.onrender.com
VITE_GOOGLE_AI_API_KEY=<optional>
```

4. Deploy → copy URL e.g. `https://nexume-ai-app.onrender.com`

5. **Update Strapi CORS** — set `CORS_ORIGINS` to your real frontend URL → redeploy Strapi

6. **Clerk** — [Clerk Dashboard](https://dashboard.clerk.com) → your app → **Domains** → add frontend Render URL

---

## 4. ATS API (optional — if not deployed yet)

| Field | Value |
|-------|--------|
| **Root Directory** | `Resume-ATS-Checker-main` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn --bind 0.0.0.0:$PORT main:app` |
| **Env** | `GEMINI_API_KEY=...` |

---

## 5. Verify

1. Frontend loads → sign in with Clerk  
2. Dashboard → create resume (hits Strapi)  
3. ATS Checker → run scan (hits ATS API)  
4. Download PDF  

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `ECONNREFUSED 127.0.0.1:3306` on Render | You copied **local MySQL** env to Render. Delete `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`. Set `DATABASE_CLIENT=postgres`, `DATABASE_URL` (Render Postgres **Internal** URL), `DATABASE_SSL=true`. Redeploy. |
| `self-signed certificate` on Render Postgres | Add `DATABASE_SSL_REJECT_UNAUTHORIZED=false` (keep `DATABASE_SSL=true`). Redeploy. |
| `No open ports detected` | Strapi crashed before starting (usually DB error above). Fix DB env first; ensure `HOST=0.0.0.0` and do not hardcode `PORT=1337` on Render (Render sets `PORT` automatically). |
| Strapi build fails on free tier | Use Starter plan or reduce memory; ensure Node 20+ |
| CORS error in browser | Add exact frontend URL to `CORS_ORIGINS`, redeploy Strapi |
| Blank page after refresh on frontend | `public/_redirects` must exist (already added) |
| API 401 | Regenerate Strapi token; check `VITE_STRAPI_API_KEY` |
| ATS timeout | Render free tier cold start — wait 30–60s |
| Env not applied on frontend | Static Site vars are build-time — trigger **Manual Deploy** after changing |

---

## URLs checklist

After deploy, fill in:

- Frontend: `https://________________.onrender.com`
- Strapi API: `https://________________.onrender.com/api`
- Strapi Admin: `https://________________.onrender.com/admin`
- ATS API: `https://nexume-ats-api.onrender.com`
