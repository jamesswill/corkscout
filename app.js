/* =====================================================================
   Corkscout — frontend app
   Reads wines from Supabase (the `pour_cards` view), then filters
   client-side. Type-first: pick a wine type, then narrow by area /
   restaurant / body / price. No free-text search, no LLM.
   ===================================================================== */

let WINES = [];        // filled by loadWines() on startup
let activeType = "";   // "" = all types

const TYPES = [
  { v: "",          label: "All" },
  { v: "sparkling", label: "Sparkling" },
  { v: "white",     label: "White" },
  { v: "rosé",   label: "Rosé" },
  { v: "orange",    label: "Orange" },
  { v: "red",       label: "Red" },
  { v: "dessert",   label: "Dessert" },
];
const AREA_LABEL = { LA: "West LA", NYC: "NYC", CAM: "Cambridge MA" };

/* ---------- buy links ---------- */
// Strip accents using a Unicode property escape (pure-ASCII source, robust).
function deburr(s){ return (s||"").normalize("NFD").replace(/\p{Diacritic}/gu,""); }

function wsUrl(w){
  let core = deburr(w.n).replace(/["'.,!]/g,"").replace(/[\(\)\/]/g," ");
  let reg  = deburr((w.r||"").split(",")[0]);
  let terms = (core+" "+reg).toLowerCase().split(/\s+/).filter(Boolean).join("+");
  return "https://www.wine-searcher.com/find/"+encodeURIComponent(terms).replace(/%2B/g,"+");
}
function ddUrl(w){
  // Simple global DoorDash search on the wine name (best-effort; their URL
  // scheme is undocumented). Vintage dropped to widen the match.
  let q = deburr(w.n).replace(/["']/g,"").trim();
  return "https://www.doordash.com/search/store/"+encodeURIComponent(q)+"/";
}

/* ---------- render ---------- */
const el = id => document.getElementById(id);

function card(w){
  const styleTags = (w.s||[]).slice(0,4).map(s=>`<span class="tg">${s}</span>`).join("");
  const pairTags  = (w.p||[]).slice(0,3).map(p=>`<span class="tg pair">${p}</span>`).join("");
  const star = w.michelin>0
    ? `<span class="star" title="${w.michelin} Michelin star${w.michelin>1?"s":""}">${"★".repeat(w.michelin)}</span>` : "";
  const endorse = w.list_count>1
    ? `<span class="endorse" title="Poured at ${w.list_count} restaurants in this set">on ${w.list_count} lists</span>` : "";
  return `<div class="card">
    <div class="typebar t-${w.t}"></div>
    <h3 class="wname">${w.n} <span class="vint">${w.v}</span></h3>
    <p class="sub">${w.g} &middot; ${w.r} &middot; ${w.t}${w.b?` &middot; ${w.b}-bodied`:""}</p>
    <div class="tags">${styleTags}${pairTags}${endorse}</div>
    <div class="rest">
      <span><b>${w.rest}</b> ${star}</span><span class="area-pill">${AREA_LABEL[w.area]}</span>
      <span class="glass"><span class="amt">$${w.gp}</span><span class="lbl">per glass</span></span>
    </div>
    <div class="buys">
      <a class="buy ws" href="${wsUrl(w)}" target="_blank" rel="noopener">Wine-Searcher</a>
      <a class="buy dd" href="${ddUrl(w)}" target="_blank" rel="noopener">DoorDash</a>
    </div>
  </div>`;
}

function run(){
  const fArea=el("fArea").value, fRest=el("fRest").value, fBody=el("fBody").value, fPrice=+el("fPrice").value;
  let list = WINES.filter(w=>{
    if(activeType && w.t!==activeType) return false;
    if(fArea && w.area!==fArea) return false;
    if(fRest && w.rest!==fRest) return false;
    if(fBody && w.b!==fBody) return false;
    if(w.gp>fPrice) return false;
    return true;
  });
  // Most-endorsed first (on more lists), then cheapest glass, then name.
  list.sort((a,b)=> (b.list_count||1)-(a.list_count||1) || a.gp-b.gp || (a.n>b.n?1:-1));
  el("grid").innerHTML = list.length
    ? list.map(card).join("")
    : `<div class="empty">No wines match these filters — try widening them.</div>`;
  el("count").textContent = `${list.length} wine${list.length!==1?"s":""}`;
}

/* ---------- data loading (Supabase) ---------- */
async function loadWines(){
  if(!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY || window.SUPABASE_URL.includes("YOUR-")){
    el("grid").innerHTML = `<div class="empty">Not connected yet. Copy <b>config.example.js</b> to <b>config.js</b> and paste your Supabase project URL + publishable key. (See README.)</div>`;
    el("count").textContent = "";
    return;
  }
  const db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  el("count").textContent = "Loading…";
  const { data, error } = await db.from("pour_cards").select("*");
  if(error){
    el("grid").innerHTML = `<div class="empty">Couldn't load wines: ${error.message}. Check that the deploy ran and your keys are correct.</div>`;
    return;
  }
  WINES = data || [];
  initUI();
}

/* ---------- UI wire-up ---------- */
function initUI(){
  // type buttons (the centerpiece)
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
  const order=["LA","NYC","CAM"];
  const groups={LA:[],NYC:[],CAM:[]};
  WINES.forEach(w=>{ if(groups[w.area] && !groups[w.area].includes(w.rest)) groups[w.area].push(w.rest); });
  let html='<option value="">Any restaurant</option>';
  order.forEach(a=>{ html+=`<optgroup label="${AREA_LABEL[a]}">`+
    groups[a].sort().map(r=>`<option value="${r.replace(/"/g,'&quot;')}">${r}</option>`).join("")+`</optgroup>`; });
  el("fRest").innerHTML=html;

  ["fArea","fRest","fBody"].forEach(id=>el(id).addEventListener("change",run));
  el("fPrice").addEventListener("input",()=>{ el("priceVal").textContent="$"+el("fPrice").value; run(); });
  el("clear").addEventListener("click",()=>{
    activeType="";
    [...el("typebtns").children].forEach(c=>c.classList.toggle("active", c.dataset.type===""));
    el("fArea").value=""; el("fRest").value=""; el("fBody").value=""; el("fPrice").value=60; el("priceVal").textContent="$60";
    run();
  });

  run();
}

loadWines();
