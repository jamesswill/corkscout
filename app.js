/* =====================================================================
   Corkscout — frontend app
   Reads VERIFIED wines from Supabase (the `pour_cards` view) and filters
   client-side. Type-first; every card links to the restaurant's real menu.
   ===================================================================== */

let WINES = [];        // filled by loadWines() on startup
let activeType = "";   // "" = all types

const TYPES = [
  { v: "",          label: "All" },
  { v: "sparkling", label: "Sparkling" },
  { v: "white",     label: "White" },
  { v: "rosé",      label: "Rosé" },
  { v: "orange",    label: "Orange" },
  { v: "red",       label: "Red" },
  { v: "dessert",   label: "Dessert" },
  { v: "sake",      label: "Sake" },
];
const AREA_LABEL = { LA: "Los Angeles", NYC: "New York", BOS: "Boston", CAM: "Boston" };
const AREA_ORDER = ["LA", "NYC", "BOS"];

/* ---------- buy links ---------- */
function deburr(s){ return (s||"").normalize("NFD").replace(/\p{Diacritic}/gu,""); }
function wsUrl(w){
  let core = deburr(w.n).replace(/["'.,!]/g,"").replace(/[\(\)\/]/g," ");
  let reg  = deburr((w.r||"").split(",")[0]);
  let terms = (core+" "+reg).toLowerCase().split(/\s+/).filter(Boolean).join("+");
  return "https://www.wine-searcher.com/find/"+encodeURIComponent(terms).replace(/%2B/g,"+");
}
function ddUrl(w){
  let q = deburr(w.n).replace(/["']/g,"").trim();
  return "https://www.doordash.com/search/store/"+encodeURIComponent(q)+"/";
}

/* ---------- render ---------- */
const el = id => document.getElementById(id);

function card(w){
  const star = w.michelin>0
    ? `<span class="star" title="${w.michelin} Michelin star${w.michelin>1?"s":""}">${"★".repeat(w.michelin)}</span>` : "";
  const checked = w.menu_checked ? ` title="from their published menu · checked ${w.menu_checked}"` : "";
  const src = w.menu_url
    ? `<a class="src" href="${w.menu_url}" target="_blank" rel="noopener"${checked}>verified on ${w.rest}'s menu ↗</a>`
    : "";
  return `<div class="card">
    <div class="typebar t-${w.t}"></div>
    <h3 class="wname">${w.n} <span class="vint">${w.v}</span></h3>
    <p class="sub">${[w.g, w.r].filter(Boolean).join(" &middot; ")}</p>
    <div class="rest">
      <span><b>${w.rest}</b> ${star}</span><span class="area-pill">${AREA_LABEL[w.area]||w.area}</span>
      <span class="glass"><span class="amt">$${w.gp}</span><span class="lbl">per glass</span></span>
    </div>
    ${src}
    <div class="buys">
      <a class="buy ws" href="${wsUrl(w)}" target="_blank" rel="noopener">Wine-Searcher</a>
      <a class="buy dd" href="${ddUrl(w)}" target="_blank" rel="noopener">DoorDash</a>
    </div>
  </div>`;
}

function run(){
  const fArea=el("fArea").value, fRest=el("fRest").value, fPrice=+el("fPrice").value;
  let list = WINES.filter(w=>{
    if(activeType && w.t!==activeType) return false;
    if(fArea && w.area!==fArea) return false;
    if(fRest && w.rest!==fRest) return false;
    if(w.gp>fPrice) return false;
    return true;
  });
  // cheapest glass first, then name
  list.sort((a,b)=> a.gp-b.gp || (a.n>b.n?1:-1));
  el("grid").innerHTML = list.length
    ? list.map(card).join("")
    : `<div class="empty">No wines match these filters — try widening them.</div>`;
  el("count").textContent = `${list.length} verified wine${list.length!==1?"s":""}`;
}

/* ---------- data loading (Supabase) ---------- */
async function loadWines(){
  if(!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY || window.SUPABASE_URL.includes("YOUR-")){
    el("grid").innerHTML = `<div class="empty">Not connected yet. Copy <b>config.example.js</b> to <b>config.js</b> and paste your Supabase project URL + publishable key.</div>`;
    el("count").textContent = "";
    return;
  }
  const db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  el("count").textContent = "Loading…";
  const { data, error } = await db.from("pour_cards").select("*");
  if(error){
    el("grid").innerHTML = `<div class="empty">Couldn't load wines: ${error.message}.</div>`;
    return;
  }
  WINES = data || [];
  initUI();
}

/* ---------- UI wire-up ---------- */
function initUI(){
  el("typebtns").innerHTML = TYPES.map(t =>
    `<button class="typebtn${t.v===activeType?' active':''}" data-type="${t.v}">${t.label}</button>`
  ).join("");
  el("typebtns").addEventListener("click", e=>{
    const b = e.target.closest(".typebtn"); if(!b) return;
    activeType = b.dataset.type;
    [...el("typebtns").children].forEach(c=>c.classList.toggle("active", c===b));
    run();
  });

  // restaurant filter, grouped by area
  const groups = {}; AREA_ORDER.forEach(a=>groups[a]=[]);
  WINES.forEach(w=>{ if(groups[w.area] && !groups[w.area].includes(w.rest)) groups[w.area].push(w.rest); });
  let html='<option value="">Any restaurant</option>';
  AREA_ORDER.forEach(a=>{ if(groups[a].length) html+=`<optgroup label="${AREA_LABEL[a]}">`+
    groups[a].sort().map(r=>`<option value="${r.replace(/"/g,'&quot;')}">${r}</option>`).join("")+`</optgroup>`; });
  el("fRest").innerHTML=html;

  ["fArea","fRest"].forEach(id=>el(id).addEventListener("change",run));
  el("fPrice").addEventListener("input",()=>{ el("priceVal").textContent="$"+el("fPrice").value; run(); });
  el("clear").addEventListener("click",()=>{
    activeType="";
    [...el("typebtns").children].forEach(c=>c.classList.toggle("active", c.dataset.type===""));
    el("fArea").value=""; el("fRest").value=""; el("fPrice").value=120; el("priceVal").textContent="$120";
    run();
  });

  run();
}

loadWines();
