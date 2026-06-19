/* =====================================================================
   Pour Decisions — frontend app
   Reads wines from Supabase (the `pour_cards` view), then runs entirely
   client-side: faceted + natural-language search, no LLM, no tokens.
   ===================================================================== */

let WINES = [];  // filled by loadWines() on startup

/* ---------- NL QUERY DICTIONARIES ---------- */
const TYPE_KW = {
  sparkling:["sparkling","bubbles","bubbly","champagne","cava","prosecco","pet nat","pét-nat","petnat","pet-nat","fizz","fizzy","crémant","cremant"],
  white:["white"],
  "rosé":["rosé","rose","rosato","pink","blush"],
  orange:["orange","skin contact","skin-contact","amber"],
  red:["red"],
  dessert:["dessert","sweet","port","sherry","madeira","fortified"]
};
const STYLE_KW = ["crisp","mineral","light","full","full-bodied","bold","rich","oaky","buttery","tannic","juicy","funky","natural","off-dry","dry","fruity","earthy","elegant","chillable","aromatic","floral","savory","nutty","textured","peppery","fresh","spritzy","organic"];
const PAIR_KW = {
  seafood:["seafood","fish"], oysters:["oyster","oysters"], shellfish:["shellfish","crab","lobster","shrimp","scallop"],
  spicy:["spicy","spice","thai","szechuan","sichuan","curry","heat"], beef:["beef","steak","burger"],
  pork:["pork","charcuterie","ham"], chicken:["chicken","poultry","turkey"], cheese:["cheese","cheeses"],
  pasta:["pasta","noodle"], pizza:["pizza"], vegetarian:["vegetarian","veggie","vegetable","salad","veg"],
  aperitif:["aperitif","apéritif","aperatif","sip","porch","sipping"], dessert:["dessert","sweet"]
};
const BODY_KW = {light:["light","light-bodied"], full:["full","full-bodied","bold","big","heavy"], medium:["medium","medium-bodied"]};

const EXAMPLES = ["sparkling rosé","crisp white for seafood","bold red for steak","orange wine","something funky & natural","off-dry white for spicy food","light red I can chill","champagne under $30","earthy red for cheese"];
const AREA_LABEL = {LA:"West LA",NYC:"NYC",CAM:"Cambridge MA"};

/* ---------- SLUG -> WINE-SEARCHER ---------- */
function deburr(s){return (s||"").normalize("NFD").replace(/[̀-ͯ]/g,"");}
function wsUrl(w){
  let core = deburr(w.n).replace(/["'.,!]/g,"").replace(/[\(\)\/]/g," ");
  let reg = deburr((w.r||"").split(",")[0]);
  let terms = (core+" "+reg).toLowerCase().split(/\s+/).filter(Boolean).join("+");
  return "https://www.wine-searcher.com/find/"+encodeURIComponent(terms).replace(/%2B/g,"+");
}

/* ---------- PARSE + SCORE ---------- */
function parse(q){
  q=" "+q.toLowerCase().replace(/[-]/g," ")+" ";
  const out={type:null,styles:[],pairs:[],body:null,free:[]};
  for(const [type,kws] of Object.entries(TYPE_KW)){
    for(const k of kws){ if(q.includes(" "+k.replace(/-/g," ")+" ")||q.includes(k.replace(/-/g," "))){ out.type=type; } }
  }
  for(const s of STYLE_KW){ if(q.includes(s.replace(/-/g," "))) out.styles.push(s); }
  for(const [p,kws] of Object.entries(PAIR_KW)){ for(const k of kws){ if(q.includes(k)){ out.pairs.push(p); break; } } }
  for(const [b,kws] of Object.entries(BODY_KW)){ for(const k of kws){ if(q.includes(" "+k+" ")){ out.body=b; } } }
  const known=new Set();
  Object.values(TYPE_KW).flat().forEach(x=>known.add(x));
  STYLE_KW.forEach(x=>known.add(x));
  Object.values(PAIR_KW).flat().forEach(x=>known.add(x));
  Object.values(BODY_KW).flat().forEach(x=>known.add(x));
  ["a","an","the","for","with","that","will","pair","pairs","good","great","some","me","i","of","and","to","under","wine","bottle","glass","something","nice","really","go","goes","like","want","looking"].forEach(x=>known.add(x));
  q.replace(/\$\d+/g,"").split(/\s+/).filter(Boolean).forEach(t=>{ if(!known.has(t)&&t.length>2) out.free.push(t); });
  let m=q.match(/\$?\s?(\d{2})(?:\s|$)/); out.priceHint = (q.includes("under")&&m)?+m[1]:null;
  let m2=q.match(/\$(\d{2})/); if(m2) out.priceHint=+m2[1];
  return out;
}
function score(w,P){
  let sc=0;
  if(P.type){ if(w.t===P.type) sc+=6; else return 0; }
  if(P.body){ if(w.b===P.body) sc+=2; }
  for(const s of P.styles){ if((w.s||[]).includes(s)) sc+=3; }
  for(const p of P.pairs){ if((w.p||[]).includes(p)) sc+=4; }
  const hay=deburr((w.n+" "+w.g+" "+w.r+" "+w.rest).toLowerCase());
  for(const f of P.free){ if(hay.includes(deburr(f))) sc+=2; }
  if(P.priceHint && w.gp<=P.priceHint) sc+=1;
  if(P.type && sc===6) sc=2;
  return sc;
}

/* ---------- RENDER ---------- */
const el=id=>document.getElementById(id);
function card(w){
  const styleTags=(w.s||[]).slice(0,4).map(s=>`<span class="tg">${s}</span>`).join("");
  const pairTags=(w.p||[]).slice(0,3).map(p=>`<span class="tg pair">${p}</span>`).join("");
  const star = w.michelin>0 ? `<span class="star" title="${w.michelin} Michelin star${w.michelin>1?"s":""}">${"★".repeat(w.michelin)}</span>` : "";
  const endorse = w.list_count>1 ? `<span class="endorse" title="Poured at ${w.list_count} restaurants in this set">on ${w.list_count} lists</span>` : "";
  return `<div class="card">
    <div class="typebar t-${w.t}"></div>
    <h3 class="wname">${w.n} ${w.v!=="NV"?`<span class="vint">${w.v}</span>`:`<span class="vint">NV</span>`}</h3>
    <p class="sub">${w.g} · ${w.r} · ${w.t}${w.b?` · ${w.b}-bodied`:""}</p>
    <div class="tags">${styleTags}${pairTags}${endorse}</div>
    <div class="rest">
      <span><b>${w.rest}</b> ${star}</span><span class="area-pill">${AREA_LABEL[w.area]}</span>
      <span class="glass"><span class="amt">$${w.gp}</span><span class="lbl">per glass</span></span>
    </div>
    <a class="buy" href="${wsUrl(w)}" target="_blank" rel="noopener">🔎 Find a bottle near you →</a>
  </div>`;
}
function run(){
  const q=el("q").value.trim();
  const fType=el("fType").value, fArea=el("fArea").value, fRest=el("fRest").value, fBody=el("fBody").value, fPrice=+el("fPrice").value;
  let list=WINES.filter(w=>{
    if(fType && w.t!==fType) return false;
    if(fArea && w.area!==fArea) return false;
    if(fRest && w.rest!==fRest) return false;
    if(fBody && w.b!==fBody) return false;
    if(w.gp>fPrice) return false;
    return true;
  });
  let scored;
  if(q){
    const P=parse(q);
    if(P.priceHint){ list=list.filter(w=>w.gp<=P.priceHint); }
    scored=list.map(w=>({w,sc:score(w,P)})).filter(x=>x.sc>0).sort((a,b)=>b.sc-a.sc||a.w.gp-b.w.gp);
  }else{
    scored=list.sort((a,b)=> (a.area>b.area?1:a.area<b.area?-1:0) || a.gp-b.gp ).map(w=>({w,sc:0}));
  }
  el("grid").innerHTML = scored.length
    ? scored.map(x=>card(x.w)).join("")
    : `<div class="empty">No matches — try loosening a filter, or one of the suggestions above.</div>`;
  el("count").textContent = `${scored.length} wine${scored.length!==1?"s":""}${q?" matched":""}`;
}

/* ---------- DATA LOADING (Supabase) ---------- */
async function loadWines(){
  if(!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY || window.SUPABASE_URL.includes("YOUR-")){
    el("grid").innerHTML = `<div class="empty">⚙️ Not connected yet. Copy <b>config.example.js</b> to <b>config.js</b> and paste your Supabase project URL + anon key. (See README.)</div>`;
    el("count").textContent = "";
    return;
  }
  const db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  el("count").textContent = "Loading…";
  const { data, error } = await db.from("pour_cards").select("*");
  if(error){
    el("grid").innerHTML = `<div class="empty">Couldn't load wines: ${error.message}. Check that you ran schema.sql and seed.js, and that your keys are correct.</div>`;
    return;
  }
  WINES = data || [];
  initUI();
}

/* ---------- UI WIRE-UP ---------- */
function initUI(){
  // restaurant filter, grouped by area
  const order=["LA","NYC","CAM"];
  const groups={LA:[],NYC:[],CAM:[]};
  WINES.forEach(w=>{ if(groups[w.area] && !groups[w.area].includes(w.rest)) groups[w.area].push(w.rest); });
  let html='<option value="">Any restaurant</option>';
  order.forEach(a=>{ html+=`<optgroup label="${AREA_LABEL[a]}">`+
    groups[a].sort().map(r=>`<option value="${r.replace(/"/g,'&quot;')}">${r}</option>`).join("")+`</optgroup>`; });
  el("fRest").innerHTML=html;

  el("examples").innerHTML=EXAMPLES.map(e=>`<span class="ex">${e}</span>`).join("");
  el("examples").addEventListener("click",e=>{ if(e.target.classList.contains("ex")){ el("q").value=e.target.textContent; run(); }});
  el("q").addEventListener("input",run);
  ["fType","fArea","fRest","fBody"].forEach(id=>el(id).addEventListener("change",run));
  el("fPrice").addEventListener("input",()=>{ el("priceVal").textContent="$"+el("fPrice").value; run(); });
  el("clear").addEventListener("click",()=>{ el("q").value="";el("fType").value="";el("fArea").value="";el("fRest").value="";el("fBody").value="";el("fPrice").value=60;el("priceVal").textContent="$60"; run(); });
  run();
}

loadWines();
