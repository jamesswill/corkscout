/* =====================================================================
   Pour Decisions — seed script
   ---------------------------------------------------------------------
   Loads the wines from data.js into your Supabase database, normalized
   into restaurants / wines / pours.

   This is also the template for FUTURE ingestion: whenever you scrape or
   hand-add a new list, you produce rows in this same shape and upsert them.
   The LLM (if used) only runs at THIS step to turn messy text into rows —
   never when a user searches.

   USAGE
     1. npm init -y
     2. npm install @supabase/supabase-js
     3. Get your keys: Supabase Dashboard → Project Settings → API
          - Project URL                -> SUPABASE_URL
          - service_role key (secret!) -> SUPABASE_SERVICE_KEY
        The service_role key bypasses Row Level Security so it can write.
        NEVER put it in the frontend or commit it. Pass it as an env var:
     4. SUPABASE_URL="https://xxxx.supabase.co" \
        SUPABASE_SERVICE_KEY="eyJhbGciOi..." \
        node seed.js
   ===================================================================== */

const { createClient } = require("@supabase/supabase-js");
const { WINES } = require("./data.js");

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars. See usage at top of this file.");
  process.exit(1);
}
const db = createClient(URL, KEY, { auth: { persistSession: false } });

/* Extra restaurant metadata that isn't in the per-wine data.
   Add a venue here to give it Michelin stars / sommelier flags / neighborhood.
   Anything not listed defaults to michelin:0, sommelier:true (these are all
   wine-serious rooms), neighborhood:null. */
const RESTAURANT_META = {
  "Rustic Canyon":          { area:"LA",  neighborhood:"Santa Monica", michelin:0 },
  "Felix Trattoria":        { area:"LA",  neighborhood:"Venice",       michelin:0 },
  "Cassia":                 { area:"LA",  neighborhood:"Santa Monica", michelin:0 },
  "Esters Wine Shop & Bar": { area:"LA",  neighborhood:"Santa Monica", michelin:0 },
  "Pasjoli":                { area:"LA",  neighborhood:"Santa Monica", michelin:1 },
  "Juliet":                 { area:"LA",  neighborhood:"Culver City",  michelin:0 },
  "Stanley's Wet Goods":    { area:"LA",  neighborhood:"Culver City",  michelin:0 },
  "Ruffian":                { area:"NYC", neighborhood:"East Village",        michelin:0 },
  "Wildair":                { area:"NYC", neighborhood:"Lower East Side",     michelin:0 },
  "The Four Horsemen":      { area:"NYC", neighborhood:"Williamsburg",        michelin:1 },
  "Stars":                  { area:"NYC", neighborhood:"East Village",        michelin:0 },
  "Estela":                 { area:"NYC", neighborhood:"NoHo",                michelin:0 },
  "Eleven Madison Park":    { area:"NYC", neighborhood:"Flatiron",            michelin:3 },
  "Le Bernardin":           { area:"NYC", neighborhood:"Midtown",             michelin:3 },
  "Gramercy Tavern":        { area:"NYC", neighborhood:"Flatiron",            michelin:0 },
  "Oleana":                 { area:"CAM", neighborhood:"Cambridge (Inman Sq)", michelin:0 },
  "BISq":                   { area:"CAM", neighborhood:"Cambridge (Inman Sq)", michelin:0 },
  "Pammy's":                { area:"CAM", neighborhood:"Cambridge",            michelin:0 },
  "Field & Vine":           { area:"CAM", neighborhood:"Somerville",           michelin:0 },
  "Spoke Wine Bar":         { area:"CAM", neighborhood:"Somerville",           michelin:0 },
};

async function main() {
  console.log(`Seeding ${WINES.length} wines...`);

  // ---- 1. restaurants (unique by name) ----
  const restNames = [...new Set(WINES.map(w => w.rest))];
  const restRows = restNames.map(name => {
    const meta = RESTAURANT_META[name] || {};
    const area = meta.area || (WINES.find(w => w.rest === name).area);
    return {
      name,
      area,
      neighborhood: meta.neighborhood || null,
      michelin: meta.michelin ?? 0,
      has_sommelier: meta.has_sommelier ?? true,
    };
  });
  const { data: rests, error: e1 } = await db
    .from("restaurants").upsert(restRows, { onConflict: "name" }).select();
  if (e1) throw e1;
  const restId = Object.fromEntries(rests.map(r => [r.name, r.id]));
  console.log(`  ✓ ${rests.length} restaurants`);

  // ---- 2. wines (unique by producer_cuvee + vintage) ----
  const wineKey = w => `${w.n}|||${w.v}`;
  const seen = new Map();
  for (const w of WINES) {
    const k = wineKey(w);
    if (!seen.has(k)) seen.set(k, {
      producer_cuvee: w.n,
      vintage: w.v,
      type: w.t,
      grape: w.g,
      region: w.r,
      body: w.b,
      style_tags: w.s,
      pairing_tags: w.p,
    });
  }
  const wineRows = [...seen.values()];
  const { data: wines, error: e2 } = await db
    .from("wines").upsert(wineRows, { onConflict: "producer_cuvee,vintage" }).select();
  if (e2) throw e2;
  const wineId = Object.fromEntries(wines.map(w => [`${w.producer_cuvee}|||${w.vintage}`, w.id]));
  console.log(`  ✓ ${wines.length} wines`);

  // ---- 3. pours (wine × restaurant × price) ----
  const pourRows = WINES.map(w => ({
    wine_id: wineId[wineKey(w)],
    restaurant_id: restId[w.rest],
    glass_price: w.gp,
  }));
  const { data: pours, error: e3 } = await db
    .from("pours").upsert(pourRows, { onConflict: "wine_id,restaurant_id" }).select();
  if (e3) throw e3;
  console.log(`  ✓ ${pours.length} pours`);

  console.log("Done. Open the Table Editor in Supabase to see your data,");
  console.log("or run:  select * from pour_cards limit 5;");
}

main().catch(err => { console.error("Seed failed:", err.message || err); process.exit(1); });
