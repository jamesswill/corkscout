/* =====================================================================
   Corkscout — seed script
   ---------------------------------------------------------------------
   Loads the VERIFIED wines from data.js into Supabase. It first PURGES
   the existing rows so the database always matches data.js exactly — no
   stale/fabricated leftovers.

   USAGE (locally):
     npm install
     SUPABASE_URL="https://xxxx.supabase.co" \
     SUPABASE_SERVICE_KEY="<secret key>" \
     node seed.js
   (In CI this runs automatically via .github/workflows/deploy.yml.)
   ===================================================================== */

const { createClient } = require("@supabase/supabase-js");
const { WINES, RESTAURANTS } = require("./data.js");

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_KEY;
if (!URL || !KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars.");
  process.exit(1);
}
const db = createClient(URL, KEY, { auth: { persistSession: false } });

async function purge() {
  // children first (FK order). gte('id', 0) matches every row.
  for (const t of ["pours", "wines", "restaurants"]) {
    const { error } = await db.from(t).delete().gte("id", 0);
    if (error) throw error;
  }
  console.log("  ✓ purged old rows");
}

async function main() {
  console.log(`Seeding ${RESTAURANTS.length} restaurants / ${WINES.length} wines...`);
  await purge();

  // ---- restaurants ----
  const restRows = RESTAURANTS.map(r => ({
    name: r.name, area: r.area, neighborhood: r.neighborhood || null,
    michelin: r.michelin ?? 0, has_sommelier: true,
    menu_url: r.menu_url || null, menu_checked: r.menu_checked || null,
  }));
  const { data: rests, error: e1 } = await db.from("restaurants").insert(restRows).select();
  if (e1) throw e1;
  const restId = Object.fromEntries(rests.map(r => [r.name, r.id]));
  console.log(`  ✓ ${rests.length} restaurants`);

  // ---- wines (dedup by producer_cuvee + vintage) ----
  const wineKey = w => `${w.n}|||${w.v}`;
  const seen = new Map();
  for (const w of WINES) {
    if (!seen.has(wineKey(w))) seen.set(wineKey(w), {
      producer_cuvee: w.n, vintage: w.v, type: w.t, grape: w.g, region: w.r,
    });
  }
  const { data: wines, error: e2 } = await db.from("wines").insert([...seen.values()]).select();
  if (e2) throw e2;
  const wineId = Object.fromEntries(wines.map(w => [`${w.producer_cuvee}|||${w.vintage}`, w.id]));
  console.log(`  ✓ ${wines.length} wines`);

  // ---- pours (wine × restaurant × glass price) ----
  const pourRows = WINES.map(w => ({
    wine_id: wineId[wineKey(w)], restaurant_id: restId[w.rest], glass_price: w.gp,
  }));
  const { data: pours, error: e3 } = await db.from("pours").insert(pourRows).select();
  if (e3) throw e3;
  console.log(`  ✓ ${pours.length} pours`);
  console.log("Done.");
}

main().catch(err => { console.error("Seed failed:", err.message || err); process.exit(1); });
