# CorkScout 🍷

Find great-value bottles by mining the **by-the-glass** lists of wine-serious
restaurants. A wine on a good restaurant's BTG list is an implicit sommelier
endorsement — and usually a smart retail buy. Ask for what you're in the mood
for ("crisp white for seafood", "sparkling rosé"), get the wine, the restaurant
+ glass price, and a live link to local shops that sell the bottle.

## Architecture

```
Browser (index.html + app.js)
   │   reads, anon key, read-only
   ▼
Supabase (Postgres + auto REST API)
   ▲
   │   writes, service_role key, run locally
seed.js  ◄── data.js   (the seed dataset; also the template for future ingestion)
```

- **The catalog lives in the database.** The browser just queries it and filters
  client-side. **Search uses zero LLM tokens** — it's plain JS over the rows.
- **The LLM (if/when used) stays at the edges:** turning scraped lists into rows
  at ingest time, and optionally translating a free-form question into filters.
  It never sees the whole catalog, so cost stays flat as the data grows.

### Data model (see `schema.sql`)
- `restaurants` — venue, area, Michelin stars, sommelier, neighborhood
- `wines` — one row per distinct bottle (producer + cuvée + vintage + tags)
- `pours` — a wine on a restaurant's list, at a glass price (the many-to-many link)
- `pour_cards` (view) — flattens the three back into ready-to-render cards,
  including `list_count` = how many lists a wine appears on (the endorsement signal)

## Files
| file | what it is |
|------|------------|
| `index.html` | the page: layout + styles + script includes |
| `app.js` | search/filter/render; loads data from Supabase |
| `data.js` | the seed wine list — **edit this to add wines**, then re-run `seed.js` |
| `schema.sql` | database tables + view + security; run once in Supabase |
| `seed.js` | loads `data.js` into the database |
| `config.example.js` | template for your Supabase keys → copy to `config.js` |

## Setup (one time)

### 1. Create the database
1. Make a free project at [supabase.com](https://supabase.com).
2. Dashboard → **SQL Editor** → New query → paste all of `schema.sql` → **Run**.

### 2. Load the data
```bash
npm init -y
npm install @supabase/supabase-js

# keys: Supabase Dashboard → Project Settings → API
SUPABASE_URL="https://YOUR-ref.supabase.co" \
SUPABASE_SERVICE_KEY="YOUR-service_role-key" \
node seed.js
```
You should see `✓ 20 restaurants / ✓ 140 wines / ✓ 140 pours`.
(The `service_role` key is secret — it's only used here, never in the browser,
and never committed.)

### 3. Connect the frontend
```bash
cp config.example.js config.js
```
Edit `config.js` with your **Project URL** and **anon public** key (same API page).

### 4. Run it
Open `index.html` in a browser — but because it fetches over the network, use a
tiny local server rather than `file://`:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Add / edit wines
1. Edit `data.js` (the schema is documented at the top of that file).
2. Re-run `node seed.js` — it upserts, so it won't create duplicates.

## Deploy later
Any static host works (the app is just HTML/JS hitting Supabase's API):
GitHub Pages, Netlify, Cloudflare Pages. Remember to upload your `config.js`
(or set the two values another way) since it's gitignored.

## Continuous deployment (GitHub Actions)

Once the repo is on GitHub, `.github/workflows/deploy.yml` runs on every push to
`main`: it applies `schema.sql` to your database and re-seeds from `data.js`.
So adding a wine becomes: edit `data.js` → commit → push → the database updates
itself. No manual SQL pasting or local seeding.

Add these three **repository secrets**
(GitHub repo → Settings → Secrets and variables → Actions → New repository secret):

| secret | where to find it (Supabase dashboard) |
|--------|----------------------------------------|
| `SUPABASE_DB_URL` | **Connect** (top bar) → **Session pooler** → copy the URI (`postgresql://postgres.<ref>:[PASSWORD]@...pooler.supabase.com:5432/postgres`). Put your DB password in place of `[PASSWORD]`. Use the **pooler**, not the direct connection — GitHub runners are IPv4-only. |
| `SUPABASE_URL` | Project Settings → API → **Project URL** |
| `SUPABASE_SERVICE_KEY` | Project Settings → API → **`service_role`** key (secret) |

Re-run a deploy anytime from the **Actions** tab → *Deploy to Supabase* → **Run workflow**.

## Suggested git setup
```bash
git init
git add .
git commit -m "Pour Decisions: Supabase-backed v1"
git branch -M main
git remote add origin git@github.com:YOUR-USERNAME/pour-decisions.git
git push -u origin main
```
