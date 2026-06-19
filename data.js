/* =====================================================================
   Pour Decisions — WINE DATA
   ---------------------------------------------------------------------
   This is the only file you need to edit to add/remove wines or venues.
   The app (index.html) reads the WINES array below.

   SCHEMA — each wine is one object:
     n    : producer + cuvée            (string, required)
     v    : vintage, or "NV"            (string, required)
     t    : type  — one of: sparkling | white | rosé | orange | red | dessert
     g    : grape(s)                    (string)
     r    : region, country             (string)  e.g. "Loire, France"
     b    : body  — light | medium | full
     s    : style tags   (array)        e.g. ["crisp","mineral","dry"]
     p    : pairing tags (array)        e.g. ["seafood","oysters"]
     rest : restaurant name             (string, must match across its wines)
     area : LA | NYC | CAM              (West LA | East Village & nearby | Cambridge & nearby)
     gp   : glass price in USD          (number)

   TIPS
   - Keep `rest` spelled identically for every wine at the same venue —
     the restaurant filter groups on it.
   - Style/pairing tags are free-form, but reuse existing tags where you
     can so search stays consistent (see the dictionaries in index.html
     for the words the natural-language search understands).
   - The "Find a bottle" link is generated automatically from n + region.
   ===================================================================== */

const WINES = [
/* ===== WEST LA (Culver City · Santa Monica · Venice) ===== */
/* Rustic Canyon — Santa Monica */
{n:"Lieu Dit Sauvignon Blanc",v:"2022",t:"white",g:"Sauvignon Blanc",r:"Santa Ynez Valley, CA",b:"light",s:["crisp","mineral","dry"],p:["seafood","oysters","aperitif","vegetarian"],rest:"Rustic Canyon",area:"LA",gp:18},
{n:"Domaine de la Pépière Muscadet Sèvre et Maine",v:"2022",t:"white",g:"Melon de Bourgogne",r:"Loire, France",b:"light",s:["crisp","mineral","dry"],p:["seafood","oysters","shellfish"],rest:"Rustic Canyon",area:"LA",gp:16},
{n:"Sandhi Chardonnay",v:"2021",t:"white",g:"Chardonnay",r:"Sta. Rita Hills, CA",b:"medium",s:["mineral","elegant","dry"],p:["seafood","chicken","cheese"],rest:"Rustic Canyon",area:"LA",gp:22},
{n:"Liquid Farm \"Vogelzang\" Rosé",v:"2023",t:"rosé",g:"Mourvèdre / Grenache",r:"Santa Barbara, CA",b:"light",s:["crisp","dry","fruity"],p:["seafood","aperitif","spicy"],rest:"Rustic Canyon",area:"LA",gp:16},
{n:"Broc Cellars \"Love Red\"",v:"2023",t:"red",g:"Valdiguié / Carignan",r:"California",b:"light",s:["juicy","natural","chillable","fruity"],p:["pizza","pasta","cheese","pork"],rest:"Rustic Canyon",area:"LA",gp:17},
{n:"Jolie-Laide Trousseau Gris",v:"2022",t:"orange",g:"Trousseau Gris",r:"Russian River, CA",b:"light",s:["skin-contact","textured","mineral"],p:["spicy","seafood","cheese"],rest:"Rustic Canyon",area:"LA",gp:20},
{n:"Birichino Grenache",v:"2022",t:"red",g:"Grenache",r:"Central Coast, CA",b:"medium",s:["elegant","chillable","earthy"],p:["pork","chicken","pasta"],rest:"Rustic Canyon",area:"LA",gp:17},

/* Felix Trattoria — Venice */
{n:"Ca' dei Zago Prosecco Col Fondo",v:"NV",t:"sparkling",g:"Glera",r:"Valdobbiadene, Veneto",b:"light",s:["dry","natural","crisp"],p:["aperitif","seafood","pizza"],rest:"Felix Trattoria",area:"LA",gp:18},
{n:"Benanti Etna Bianco",v:"2022",t:"white",g:"Carricante",r:"Etna, Sicily",b:"medium",s:["mineral","crisp","dry"],p:["seafood","shellfish","vegetarian"],rest:"Felix Trattoria",area:"LA",gp:19},
{n:"Pieropan Soave Classico",v:"2022",t:"white",g:"Garganega",r:"Veneto, Italy",b:"light",s:["crisp","mineral","elegant"],p:["seafood","pasta","aperitif"],rest:"Felix Trattoria",area:"LA",gp:16},
{n:"COS Cerasuolo di Vittoria",v:"2021",t:"red",g:"Nero d'Avola / Frappato",r:"Sicily, Italy",b:"medium",s:["juicy","natural","earthy"],p:["pasta","pork","cheese"],rest:"Felix Trattoria",area:"LA",gp:21},
{n:"G.D. Vajra Langhe Nebbiolo",v:"2021",t:"red",g:"Nebbiolo",r:"Piedmont, Italy",b:"medium",s:["tannic","elegant","earthy"],p:["beef","pasta","cheese"],rest:"Felix Trattoria",area:"LA",gp:20},
{n:"Cantina Giardino \"Paski\" Fiano",v:"2022",t:"orange",g:"Fiano",r:"Campania, Italy",b:"medium",s:["skin-contact","textured","natural"],p:["cheese","pork","spicy"],rest:"Felix Trattoria",area:"LA",gp:18},
{n:"Arianna Occhipinti SP68 Rosato",v:"2023",t:"rosé",g:"Frappato",r:"Sicily, Italy",b:"light",s:["natural","dry","fruity"],p:["aperitif","pasta","seafood"],rest:"Felix Trattoria",area:"LA",gp:17},

/* Cassia — Santa Monica (SE-Asian brasserie) */
{n:"Billecart-Salmon Brut Rosé Champagne",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay",r:"Champagne, France",b:"light",s:["elegant","crisp","dry"],p:["aperitif","seafood","spicy"],rest:"Cassia",area:"LA",gp:28},
{n:"Trimbach Riesling",v:"2021",t:"white",g:"Riesling",r:"Alsace, France",b:"light",s:["crisp","dry","mineral","aromatic"],p:["spicy","seafood","shellfish"],rest:"Cassia",area:"LA",gp:17},
{n:"Dr. Loosen \"Blue Slate\" Riesling Kabinett",v:"2022",t:"white",g:"Riesling",r:"Mosel, Germany",b:"light",s:["off-dry","aromatic","mineral"],p:["spicy","aperitif","seafood"],rest:"Cassia",area:"LA",gp:16},
{n:"Zind-Humbrecht Gewürztraminer",v:"2021",t:"white",g:"Gewürztraminer",r:"Alsace, France",b:"medium",s:["aromatic","off-dry","rich"],p:["spicy","cheese","pork"],rest:"Cassia",area:"LA",gp:19},
{n:"Domaine Tempier Bandol Rosé",v:"2023",t:"rosé",g:"Mourvèdre",r:"Provence, France",b:"medium",s:["dry","elegant","savory"],p:["seafood","spicy","chicken"],rest:"Cassia",area:"LA",gp:24},
{n:"Donkey & Goat \"Stone Crusher\" Roussanne",v:"2022",t:"orange",g:"Roussanne",r:"California",b:"medium",s:["skin-contact","textured","natural"],p:["spicy","cheese","pork"],rest:"Cassia",area:"LA",gp:19},
{n:"Chappellet \"Mountain Cuvée\"",v:"2021",t:"red",g:"Cabernet Sauvignon",r:"Napa Valley, CA",b:"full",s:["bold","rich","tannic"],p:["beef","cheese","pork"],rest:"Cassia",area:"LA",gp:22},

/* Esters Wine Shop & Bar — Santa Monica */
{n:"Pierre Péters \"Cuvée de Réserve\" Blanc de Blancs",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",b:"light",s:["mineral","crisp","elegant"],p:["aperitif","seafood","oysters"],rest:"Esters Wine Shop & Bar",area:"LA",gp:30},
{n:"François Cotat Sancerre \"Les Caillottes\"",v:"2022",t:"white",g:"Sauvignon Blanc",r:"Loire, France",b:"medium",s:["crisp","mineral","dry"],p:["seafood","shellfish","vegetarian"],rest:"Esters Wine Shop & Bar",area:"LA",gp:22},
{n:"Domaine William Fèvre Chablis",v:"2022",t:"white",g:"Chardonnay",r:"Chablis, France",b:"medium",s:["mineral","crisp","dry"],p:["seafood","oysters","chicken"],rest:"Esters Wine Shop & Bar",area:"LA",gp:23},
{n:"Lioco \"Indica\" Rosé",v:"2023",t:"rosé",g:"Carignan",r:"Mendocino, CA",b:"light",s:["dry","crisp","natural"],p:["aperitif","seafood","spicy"],rest:"Esters Wine Shop & Bar",area:"LA",gp:16},
{n:"Movia Ribolla Gialla",v:"2019",t:"orange",g:"Ribolla Gialla",r:"Brda, Slovenia",b:"full",s:["skin-contact","textured","natural"],p:["cheese","pork","spicy"],rest:"Esters Wine Shop & Bar",area:"LA",gp:21},
{n:"Arnot-Roberts Trousseau",v:"2022",t:"red",g:"Trousseau",r:"North Coast, CA",b:"light",s:["chillable","elegant","earthy"],p:["pork","chicken","cheese"],rest:"Esters Wine Shop & Bar",area:"LA",gp:24},
{n:"Bedrock \"Old Vine\" Zinfandel",v:"2021",t:"red",g:"Zinfandel",r:"California",b:"full",s:["bold","rich","fruity"],p:["beef","pork","pizza"],rest:"Esters Wine Shop & Bar",area:"LA",gp:20},

/* Pasjoli — Santa Monica (Michelin star, French) */
{n:"Champagne Agrapart \"Les 7 Crus\" Brut",v:"NV",t:"sparkling",g:"Chardonnay / Pinot Noir",r:"Champagne, France",b:"light",s:["mineral","elegant","crisp"],p:["aperitif","seafood","oysters"],rest:"Pasjoli",area:"LA",gp:32},
{n:"Domaine Vacheron Sancerre",v:"2022",t:"white",g:"Sauvignon Blanc",r:"Loire, France",b:"medium",s:["crisp","mineral","dry"],p:["seafood","shellfish","chicken"],rest:"Pasjoli",area:"LA",gp:21},
{n:"Domaine Leflaive Mâcon-Verzé",v:"2021",t:"white",g:"Chardonnay",r:"Burgundy, France",b:"medium",s:["elegant","mineral","dry"],p:["seafood","chicken","cheese"],rest:"Pasjoli",area:"LA",gp:26},
{n:"Domaine Huet Vouvray Sec \"Le Mont\"",v:"2022",t:"white",g:"Chenin Blanc",r:"Loire, France",b:"medium",s:["mineral","dry","textured"],p:["seafood","pork","cheese"],rest:"Pasjoli",area:"LA",gp:20},
{n:"Domaine Ott \"Clos Mireille\" Rosé",v:"2023",t:"rosé",g:"Grenache / Cinsault",r:"Provence, France",b:"light",s:["elegant","dry","crisp"],p:["seafood","aperitif","chicken"],rest:"Pasjoli",area:"LA",gp:22},
{n:"Jean-Marc Burgaud Morgon \"Côte du Py\"",v:"2022",t:"red",g:"Gamay",r:"Beaujolais, France",b:"medium",s:["juicy","elegant","chillable"],p:["pork","chicken","cheese","pasta"],rest:"Pasjoli",area:"LA",gp:18},
{n:"Château de Pibarnon Bandol Rouge",v:"2019",t:"red",g:"Mourvèdre",r:"Provence, France",b:"full",s:["earthy","tannic","rich"],p:["beef","cheese","pork"],rest:"Pasjoli",area:"LA",gp:24},

/* Juliet — Culver City (wine-driven, seafood-leaning) */
{n:"Champagne Marie-Courtin \"Résonance\" Extra Brut",v:"NV",t:"sparkling",g:"Pinot Noir",r:"Champagne, France",b:"light",s:["natural","mineral","dry"],p:["aperitif","seafood","oysters"],rest:"Juliet",area:"LA",gp:26},
{n:"Clos Sainte Magdeleine Cassis Blanc",v:"2022",t:"white",g:"Marsanne / Clairette",r:"Provence, France",b:"light",s:["mineral","crisp","dry"],p:["seafood","shellfish","oysters"],rest:"Juliet",area:"LA",gp:19},
{n:"Domaine Belluard \"Le Feu\" Gringet",v:"2021",t:"white",g:"Gringet",r:"Savoie, France",b:"medium",s:["mineral","textured","dry"],p:["seafood","chicken","vegetarian"],rest:"Juliet",area:"LA",gp:24},
{n:"Massican \"Annia\"",v:"2022",t:"white",g:"Tocai / Ribolla / Chardonnay",r:"Napa Valley, CA",b:"medium",s:["crisp","fresh","textured"],p:["seafood","pasta","aperitif"],rest:"Juliet",area:"LA",gp:21},
{n:"Vincent Gaudry Sancerre Rosé",v:"2022",t:"rosé",g:"Pinot Noir",r:"Loire, France",b:"light",s:["dry","mineral","elegant"],p:["seafood","aperitif","spicy"],rest:"Juliet",area:"LA",gp:20},
{n:"Lo-Fi Cabernet Franc",v:"2022",t:"red",g:"Cabernet Franc",r:"Central Coast, CA",b:"light",s:["chillable","juicy","fresh","natural"],p:["pork","pasta","cheese"],rest:"Juliet",area:"LA",gp:17},
{n:"Day Wines \"Vin de Days\" Pinot Noir",v:"2022",t:"red",g:"Pinot Noir",r:"Willamette Valley, OR",b:"light",s:["chillable","juicy","elegant"],p:["chicken","pork","cheese"],rest:"Juliet",area:"LA",gp:18},

/* Stanley's Wet Goods — Culver City (wine bar / bottle shop, natural value) */
{n:"Wonderwerk \"It Was All A Dream\" Pét-Nat",v:"NV",t:"sparkling",g:"Field blend",r:"California",b:"light",s:["funky","natural","juicy"],p:["aperitif","spicy","pizza"],rest:"Stanley's Wet Goods",area:"LA",gp:17},
{n:"Stirm Wine Co. Riesling",v:"2022",t:"white",g:"Riesling",r:"Cienega Valley, CA",b:"light",s:["dry","mineral","natural"],p:["seafood","spicy","aperitif"],rest:"Stanley's Wet Goods",area:"LA",gp:17},
{n:"Florèz \"Shangri-La\" Riesling",v:"2022",t:"white",g:"Riesling",r:"California",b:"light",s:["off-dry","natural","aromatic"],p:["spicy","seafood","aperitif"],rest:"Stanley's Wet Goods",area:"LA",gp:16},
{n:"Scar of the Sea \"Bassi Vineyard\" Chardonnay",v:"2022",t:"white",g:"Chardonnay",r:"San Luis Obispo, CA",b:"medium",s:["textured","mineral","fresh"],p:["seafood","chicken","cheese"],rest:"Stanley's Wet Goods",area:"LA",gp:19},
{n:"Las Jaras \"Glou Glou\"",v:"2023",t:"red",g:"Carignan / Valdiguié",r:"California",b:"light",s:["juicy","chillable","natural","fruity"],p:["pizza","pasta","pork"],rest:"Stanley's Wet Goods",area:"LA",gp:15},
{n:"Martha Stoumen \"Post Flirtation\" Red",v:"2023",t:"red",g:"Zinfandel / Carignan",r:"California",b:"light",s:["juicy","natural","chillable"],p:["pizza","cheese","pasta"],rest:"Stanley's Wet Goods",area:"LA",gp:18},
{n:"Vinca Minor Carignan",v:"2022",t:"red",g:"Carignan",r:"California",b:"medium",s:["earthy","natural","chillable"],p:["pork","beef","cheese"],rest:"Stanley's Wet Goods",area:"LA",gp:16},

/* ===== EAST VILLAGE NYC & NEARBY ===== */
/* Ruffian — East Village (natural / orange focus) */
{n:"Strohmeier \"Trauben, Liebe und Zeit\" Pét-Nat",v:"NV",t:"sparkling",g:"Welschriesling",r:"Styria, Austria",b:"light",s:["natural","dry","funky"],p:["aperitif","spicy","seafood"],rest:"Ruffian",area:"NYC",gp:18},
{n:"Gut Oggau \"Theodora\"",v:"2022",t:"white",g:"Grüner Veltliner / Welschriesling",r:"Burgenland, Austria",b:"light",s:["natural","crisp","mineral"],p:["seafood","vegetarian","aperitif"],rest:"Ruffian",area:"NYC",gp:21},
{n:"Christian Tschida \"Himmel auf Erden\" Weiss",v:"2021",t:"orange",g:"Field blend",r:"Burgenland, Austria",b:"medium",s:["skin-contact","funky","natural"],p:["cheese","spicy","pork"],rest:"Ruffian",area:"NYC",gp:22},
{n:"Radikon \"Slatnik\"",v:"2020",t:"orange",g:"Friulano / Chardonnay",r:"Friuli, Italy",b:"full",s:["skin-contact","textured","natural"],p:["cheese","pork","spicy"],rest:"Ruffian",area:"NYC",gp:24},
{n:"Frank Cornelissen \"Susucaru\" Rosato",v:"2023",t:"rosé",g:"Nerello Mascalese",r:"Etna, Sicily",b:"light",s:["natural","dry","fruity"],p:["aperitif","pizza","seafood"],rest:"Ruffian",area:"NYC",gp:20},
{n:"Envínate \"Lousas\" Mencía",v:"2022",t:"red",g:"Mencía",r:"Ribeira Sacra, Spain",b:"medium",s:["earthy","elegant","chillable"],p:["pork","beef","cheese"],rest:"Ruffian",area:"NYC",gp:19},
{n:"Partida Creus \"VN\" Vinel·lo Tinto",v:"2022",t:"red",g:"Sumoll",r:"Catalonia, Spain",b:"light",s:["funky","natural","chillable","juicy"],p:["pizza","cheese","pasta"],rest:"Ruffian",area:"NYC",gp:18},

/* Wildair — Lower East Side */
{n:"Ulysse Collin \"Les Maillons\" Blanc de Noirs",v:"NV",t:"sparkling",g:"Pinot Noir",r:"Champagne, France",b:"medium",s:["rich","mineral","elegant"],p:["seafood","chicken","cheese"],rest:"Wildair",area:"NYC",gp:34},
{n:"Bichi \"Pet Mex\" Pét-Nat",v:"NV",t:"sparkling",g:"Tempranillo blend",r:"Baja California, Mexico",b:"light",s:["funky","natural","juicy"],p:["aperitif","spicy","pizza"],rest:"Wildair",area:"NYC",gp:17},
{n:"Luneau-Papin Muscadet \"Le L d'Or\"",v:"2021",t:"white",g:"Melon de Bourgogne",r:"Loire, France",b:"light",s:["crisp","mineral","dry"],p:["seafood","oysters","shellfish"],rest:"Wildair",area:"NYC",gp:17},
{n:"Foradori \"Fontanasanta\" Manzoni Bianco",v:"2021",t:"white",g:"Manzoni Bianco",r:"Trentino, Italy",b:"medium",s:["textured","mineral","natural"],p:["seafood","cheese","vegetarian"],rest:"Wildair",area:"NYC",gp:22},
{n:"COS \"Pithos\" Bianco",v:"2021",t:"orange",g:"Grecanico",r:"Sicily, Italy",b:"medium",s:["skin-contact","natural","textured"],p:["spicy","cheese","seafood"],rest:"Wildair",area:"NYC",gp:20},
{n:"Matthiasson \"Tendu\" Red",v:"2023",t:"red",g:"Aglianico / Montepulciano",r:"California",b:"light",s:["chillable","juicy","fresh"],p:["pizza","pasta","pork"],rest:"Wildair",area:"NYC",gp:16},
{n:"Domaine de la Côte Pinot Noir \"Bloom's Field\"",v:"2021",t:"red",g:"Pinot Noir",r:"Sta. Rita Hills, CA",b:"medium",s:["elegant","earthy","rich"],p:["chicken","pork","cheese"],rest:"Wildair",area:"NYC",gp:26},

/* The Four Horsemen — Williamsburg (Michelin star) */
{n:"Pierre Gerbais \"Grains de Celles\" Champagne",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay / Pinot Blanc",r:"Champagne, France",b:"light",s:["crisp","elegant","mineral"],p:["aperitif","seafood","oysters"],rest:"The Four Horsemen",area:"NYC",gp:28},
{n:"Pattes Loup Chablis \"Vent d'Ange\"",v:"2021",t:"white",g:"Chardonnay",r:"Chablis, France",b:"medium",s:["mineral","crisp","dry"],p:["seafood","oysters","chicken"],rest:"The Four Horsemen",area:"NYC",gp:24},
{n:"Hervé Villemade Cheverny Blanc",v:"2022",t:"white",g:"Sauvignon / Chardonnay",r:"Loire, France",b:"light",s:["crisp","natural","dry"],p:["seafood","aperitif","vegetarian"],rest:"The Four Horsemen",area:"NYC",gp:18},
{n:"La Stoppa \"Ageno\"",v:"2019",t:"orange",g:"Malvasia / Ortrugo",r:"Emilia, Italy",b:"full",s:["skin-contact","funky","textured"],p:["cheese","pork","spicy"],rest:"The Four Horsemen",area:"NYC",gp:23},
{n:"Pheasant's Tears Rkatsiteli",v:"2021",t:"orange",g:"Rkatsiteli",r:"Kakheti, Georgia",b:"medium",s:["skin-contact","earthy","natural"],p:["cheese","spicy","pork"],rest:"The Four Horsemen",area:"NYC",gp:17},
{n:"Clos Saron \"Home Vineyard\" Pinot Noir",v:"2020",t:"red",g:"Pinot Noir",r:"Sierra Foothills, CA",b:"medium",s:["elegant","earthy","natural"],p:["chicken","pork","cheese"],rest:"The Four Horsemen",area:"NYC",gp:26},
{n:"Frank Cornelissen \"Munjebel\" Rosso",v:"2021",t:"red",g:"Nerello Mascalese",r:"Etna, Sicily",b:"medium",s:["earthy","natural","elegant"],p:["beef","pork","pasta"],rest:"The Four Horsemen",area:"NYC",gp:25},

/* Stars — East Village (France/Spain/Germany, value focus) */
{n:"Vouette et Sorbée \"Fidèle\" Brut Nature",v:"NV",t:"sparkling",g:"Pinot Noir",r:"Champagne, France",b:"medium",s:["natural","mineral","dry"],p:["seafood","cheese","aperitif"],rest:"Stars",area:"NYC",gp:26},
{n:"Peter Lauer \"Senior\" Riesling",v:"2022",t:"white",g:"Riesling",r:"Saar, Germany",b:"light",s:["off-dry","aromatic","mineral"],p:["spicy","seafood","aperitif"],rest:"Stars",area:"NYC",gp:20},
{n:"Julien Meyer Riesling \"Nature\"",v:"2022",t:"white",g:"Riesling",r:"Alsace, France",b:"light",s:["mineral","dry","natural"],p:["seafood","shellfish","vegetarian"],rest:"Stars",area:"NYC",gp:17},
{n:"Domaine de Montbourgeau \"L'Étoile\"",v:"2020",t:"white",g:"Savagnin / Chardonnay",r:"Jura, France",b:"medium",s:["textured","nutty","mineral"],p:["chicken","cheese","seafood"],rest:"Stars",area:"NYC",gp:22},
{n:"Catherine & Pierre Breton Bourgueil \"Trinch!\"",v:"2022",t:"red",g:"Cabernet Franc",r:"Loire, France",b:"medium",s:["juicy","earthy","chillable"],p:["pork","beef","cheese"],rest:"Stars",area:"NYC",gp:18},
{n:"Comando G \"La Bruja de Rozas\" Garnacha",v:"2022",t:"red",g:"Garnacha",r:"Sierra de Gredos, Spain",b:"medium",s:["elegant","fresh","earthy"],p:["pork","chicken","cheese"],rest:"Stars",area:"NYC",gp:21},
{n:"Bodegas Ponce \"Clos Lojen\" Bobal",v:"2022",t:"red",g:"Bobal",r:"Manchuela, Spain",b:"light",s:["juicy","chillable","fruity"],p:["pizza","pasta","pork"],rest:"Stars",area:"NYC",gp:16},

/* Estela — NoHo */
{n:"Bérêche & Fils Brut Réserve",v:"NV",t:"sparkling",g:"Chardonnay / Pinot Noir / Meunier",r:"Champagne, France",b:"medium",s:["elegant","mineral","rich"],p:["seafood","chicken","cheese"],rest:"Estela",area:"NYC",gp:30},
{n:"Edi Kante Vitovska",v:"2020",t:"white",g:"Vitovska",r:"Carso, Italy",b:"medium",s:["mineral","textured","dry"],p:["seafood","vegetarian","cheese"],rest:"Estela",area:"NYC",gp:22},
{n:"Tatomer \"Kick-on Ranch\" Riesling",v:"2022",t:"white",g:"Riesling",r:"Santa Barbara, CA",b:"light",s:["dry","mineral","crisp"],p:["seafood","spicy","shellfish"],rest:"Estela",area:"NYC",gp:18},
{n:"Sandlands Chenin Blanc",v:"2022",t:"white",g:"Chenin Blanc",r:"California",b:"medium",s:["textured","dry","fresh"],p:["chicken","seafood","cheese"],rest:"Estela",area:"NYC",gp:19},
{n:"Thibaud Boudignon Anjou Rosé",v:"2023",t:"rosé",g:"Cabernet Franc",r:"Loire, France",b:"light",s:["elegant","dry","mineral"],p:["seafood","aperitif","chicken"],rest:"Estela",area:"NYC",gp:21},
{n:"Occhipinti \"Il Frappato\"",v:"2022",t:"red",g:"Frappato",r:"Sicily, Italy",b:"light",s:["floral","juicy","chillable","natural"],p:["pasta","pork","pizza"],rest:"Estela",area:"NYC",gp:23},
{n:"Cantina Giardino \"Le Fole\" Aglianico",v:"2021",t:"red",g:"Aglianico",r:"Campania, Italy",b:"full",s:["earthy","natural","tannic"],p:["beef","cheese","pork"],rest:"Estela",area:"NYC",gp:20},

/* Eleven Madison Park — Flatiron, NYC (3 Michelin, world-class cellar) */
{n:"Larmandier-Bernier \"Latitude\" Blanc de Blancs Extra Brut",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",b:"light",s:["mineral","elegant","dry"],p:["aperitif","seafood","oysters"],rest:"Eleven Madison Park",area:"NYC",gp:36},
{n:"Egly-Ouriet Brut Tradition Grand Cru",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay",r:"Champagne, France",b:"medium",s:["rich","mineral","elegant"],p:["seafood","chicken","cheese"],rest:"Eleven Madison Park",area:"NYC",gp:48},
{n:"François Chidaine Montlouis \"Clos du Breuil\"",v:"2022",t:"white",g:"Chenin Blanc",r:"Loire, France",b:"medium",s:["dry","mineral","textured"],p:["seafood","chicken","vegetarian"],rest:"Eleven Madison Park",area:"NYC",gp:22},
{n:"Egon Müller \"Scharzhofberger\" Riesling Kabinett",v:"2021",t:"white",g:"Riesling",r:"Saar, Germany",b:"light",s:["off-dry","mineral","aromatic"],p:["spicy","seafood","aperitif"],rest:"Eleven Madison Park",area:"NYC",gp:38},
{n:"Domaine Roulot Bourgogne Blanc",v:"2021",t:"white",g:"Chardonnay",r:"Burgundy, France",b:"medium",s:["mineral","elegant","dry"],p:["seafood","chicken","cheese"],rest:"Eleven Madison Park",area:"NYC",gp:42},
{n:"Domaine Jamet Côtes du Rhône Syrah",v:"2021",t:"red",g:"Syrah",r:"Northern Rhône, France",b:"full",s:["peppery","earthy","rich"],p:["beef","pork","cheese"],rest:"Eleven Madison Park",area:"NYC",gp:30},
{n:"Domaine Dujac Morey-Saint-Denis",v:"2020",t:"red",g:"Pinot Noir",r:"Burgundy, France",b:"medium",s:["elegant","earthy","silky"],p:["chicken","pork","cheese"],rest:"Eleven Madison Park",area:"NYC",gp:55},

/* Le Bernardin — Midtown, NYC (3 Michelin, seafood) */
{n:"Pol Roger Brut Réserve Champagne",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay / Meunier",r:"Champagne, France",b:"light",s:["crisp","elegant","dry"],p:["aperitif","seafood","oysters"],rest:"Le Bernardin",area:"NYC",gp:32},
{n:"Domaine William Fèvre Chablis 1er Cru \"Montmains\"",v:"2021",t:"white",g:"Chardonnay",r:"Chablis, France",b:"medium",s:["mineral","crisp","elegant"],p:["seafood","oysters","shellfish"],rest:"Le Bernardin",area:"NYC",gp:34},
{n:"Henri Bourgeois Sancerre \"La Bourgeoise\"",v:"2021",t:"white",g:"Sauvignon Blanc",r:"Loire, France",b:"medium",s:["crisp","mineral","dry"],p:["seafood","shellfish","vegetarian"],rest:"Le Bernardin",area:"NYC",gp:26},
{n:"Do Ferreiro Albariño",v:"2022",t:"white",g:"Albariño",r:"Rías Baixas, Spain",b:"light",s:["crisp","mineral","fresh"],p:["seafood","shellfish","oysters"],rest:"Le Bernardin",area:"NYC",gp:22},
{n:"Trimbach Riesling Réserve",v:"2020",t:"white",g:"Riesling",r:"Alsace, France",b:"light",s:["dry","mineral","aromatic"],p:["seafood","spicy","shellfish"],rest:"Le Bernardin",area:"NYC",gp:24},
{n:"Louis Jadot Puligny-Montrachet",v:"2021",t:"white",g:"Chardonnay",r:"Burgundy, France",b:"medium",s:["elegant","rich","mineral"],p:["seafood","chicken","cheese"],rest:"Le Bernardin",area:"NYC",gp:40},
{n:"Domaine Faiveley Mercurey Rouge",v:"2021",t:"red",g:"Pinot Noir",r:"Burgundy, France",b:"medium",s:["elegant","earthy","fresh"],p:["chicken","pork","cheese"],rest:"Le Bernardin",area:"NYC",gp:24},

/* Gramercy Tavern — Flatiron, NYC (deep American cellar) */
{n:"Paul Bara Brut Réserve Grand Cru Bouzy",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay",r:"Champagne, France",b:"medium",s:["rich","elegant","dry"],p:["aperitif","seafood","cheese"],rest:"Gramercy Tavern",area:"NYC",gp:28},
{n:"Hermann J. Wiemer \"HJW Vineyard\" Riesling",v:"2021",t:"white",g:"Riesling",r:"Finger Lakes, NY",b:"light",s:["dry","mineral","crisp"],p:["seafood","spicy","aperitif"],rest:"Gramercy Tavern",area:"NYC",gp:19},
{n:"Stony Hill Chardonnay",v:"2020",t:"white",g:"Chardonnay",r:"Napa Valley, CA",b:"medium",s:["mineral","elegant","dry"],p:["seafood","chicken","cheese"],rest:"Gramercy Tavern",area:"NYC",gp:26},
{n:"Wölffer Estate \"Summer in a Bottle\" Rosé",v:"2023",t:"rosé",g:"Merlot / Chardonnay / Cabernet Franc",r:"Long Island, NY",b:"light",s:["crisp","dry","fruity"],p:["seafood","aperitif","spicy"],rest:"Gramercy Tavern",area:"NYC",gp:19},
{n:"Bedell Cellars Cabernet Franc",v:"2020",t:"red",g:"Cabernet Franc",r:"Long Island, NY",b:"medium",s:["earthy","fresh","elegant"],p:["pork","beef","cheese"],rest:"Gramercy Tavern",area:"NYC",gp:18},
{n:"Calera Central Coast Pinot Noir",v:"2021",t:"red",g:"Pinot Noir",r:"Central Coast, CA",b:"medium",s:["elegant","fruity","fresh"],p:["chicken","pork","cheese"],rest:"Gramercy Tavern",area:"NYC",gp:22},
{n:"Qupé Central Coast Syrah",v:"2021",t:"red",g:"Syrah",r:"Central Coast, CA",b:"full",s:["peppery","rich","bold"],p:["beef","pork","cheese"],rest:"Gramercy Tavern",area:"NYC",gp:20},

/* ===== CAMBRIDGE MA & NEARBY ===== */
/* Oleana — Cambridge (Eastern Med) */
{n:"Ameztoi \"Rubentis\" Txakolina Rosé",v:"2023",t:"rosé",g:"Hondarrabi Zuri / Beltza",r:"Getariako, Spain",b:"light",s:["crisp","spritzy","dry"],p:["seafood","aperitif","spicy"],rest:"Oleana",area:"CAM",gp:16},
{n:"Sigalas Assyrtiko",v:"2022",t:"white",g:"Assyrtiko",r:"Santorini, Greece",b:"medium",s:["crisp","mineral","dry"],p:["seafood","shellfish","vegetarian"],rest:"Oleana",area:"CAM",gp:19},
{n:"Tselepos Moschofilero",v:"2023",t:"white",g:"Moschofilero",r:"Mantinia, Greece",b:"light",s:["aromatic","crisp","dry"],p:["spicy","seafood","aperitif"],rest:"Oleana",area:"CAM",gp:15},
{n:"Domaine Ostertag \"Les Jardins\" Riesling",v:"2021",t:"white",g:"Riesling",r:"Alsace, France",b:"light",s:["aromatic","mineral","dry"],p:["spicy","seafood","chicken"],rest:"Oleana",area:"CAM",gp:18},
{n:"Clos Cibonne \"Tibouren\" Rosé",v:"2022",t:"rosé",g:"Tibouren",r:"Provence, France",b:"medium",s:["savory","dry","textured"],p:["seafood","cheese","spicy"],rest:"Oleana",area:"CAM",gp:20},
{n:"Thymiopoulos \"Young Vines\" Xinomavro",v:"2022",t:"red",g:"Xinomavro",r:"Naoussa, Greece",b:"medium",s:["juicy","earthy","fresh"],p:["pork","beef","pasta"],rest:"Oleana",area:"CAM",gp:17},
{n:"Domaine des Tourelles Rouge",v:"2020",t:"red",g:"Cinsault / Syrah / Cabernet",r:"Bekaa Valley, Lebanon",b:"full",s:["earthy","rich","spiced"],p:["beef","spicy","cheese","pork"],rest:"Oleana",area:"CAM",gp:16},

/* BISq — Cambridge (French-focused, sherry/madeira) */
{n:"Champagne Chartogne-Taillet \"Sainte Anne\"",v:"NV",t:"sparkling",g:"Chardonnay / Pinot Noir",r:"Champagne, France",b:"light",s:["mineral","crisp","elegant"],p:["aperitif","seafood","oysters"],rest:"BISq",area:"CAM",gp:24},
{n:"Equipo Navazos \"La Bota\" Fino",v:"NV",t:"dessert",g:"Palomino (Fino Sherry)",r:"Jerez, Spain",b:"light",s:["dry","nutty","savory"],p:["aperitif","seafood","cheese"],rest:"BISq",area:"CAM",gp:14},
{n:"Pascal Jolivet Sancerre",v:"2022",t:"white",g:"Sauvignon Blanc",r:"Loire, France",b:"light",s:["crisp","mineral","dry"],p:["seafood","shellfish","vegetarian"],rest:"BISq",area:"CAM",gp:17},
{n:"Jean Foillard Morgon \"Côte du Py\"",v:"2022",t:"red",g:"Gamay",r:"Beaujolais, France",b:"medium",s:["juicy","elegant","chillable","natural"],p:["pork","chicken","cheese","pasta"],rest:"BISq",area:"CAM",gp:22},
{n:"Château Simone Palette Rosé",v:"2022",t:"rosé",g:"Grenache / Mourvèdre / Cinsault",r:"Provence, France",b:"medium",s:["elegant","savory","dry"],p:["seafood","chicken","cheese"],rest:"BISq",area:"CAM",gp:23},
{n:"Domaine Georges Vernay \"Sainte Agathe\" Syrah",v:"2021",t:"red",g:"Syrah",r:"Northern Rhône, France",b:"full",s:["peppery","rich","earthy"],p:["beef","pork","cheese"],rest:"BISq",area:"CAM",gp:21},
{n:"Blandy's 5-Year Verdelho Madeira",v:"NV",t:"dessert",g:"Verdelho",r:"Madeira, Portugal",b:"medium",s:["off-dry","nutty","rich"],p:["cheese","dessert","pork"],rest:"BISq",area:"CAM",gp:13},

/* Pammy's — Cambridge (Italian-influenced) */
{n:"Bele Casel Asolo Prosecco Superiore Brut",v:"NV",t:"sparkling",g:"Glera",r:"Asolo, Veneto",b:"light",s:["crisp","dry","fresh"],p:["aperitif","seafood","pizza"],rest:"Pammy's",area:"CAM",gp:14},
{n:"Vietti Roero Arneis",v:"2023",t:"white",g:"Arneis",r:"Piedmont, Italy",b:"light",s:["crisp","floral","dry"],p:["seafood","aperitif","vegetarian"],rest:"Pammy's",area:"CAM",gp:16},
{n:"Inama Soave Classico",v:"2022",t:"white",g:"Garganega",r:"Veneto, Italy",b:"light",s:["crisp","mineral","dry"],p:["seafood","pasta","chicken"],rest:"Pammy's",area:"CAM",gp:15},
{n:"Cantina Terlano Pinot Bianco",v:"2022",t:"white",g:"Pinot Bianco",r:"Alto Adige, Italy",b:"medium",s:["mineral","crisp","textured"],p:["seafood","chicken","cheese"],rest:"Pammy's",area:"CAM",gp:17},
{n:"Cantina Tramin Gewürztraminer",v:"2022",t:"white",g:"Gewürztraminer",r:"Alto Adige, Italy",b:"medium",s:["aromatic","off-dry","rich"],p:["spicy","cheese","pork"],rest:"Pammy's",area:"CAM",gp:16},
{n:"Paolo Scavino Langhe Nebbiolo",v:"2021",t:"red",g:"Nebbiolo",r:"Piedmont, Italy",b:"medium",s:["tannic","elegant","earthy"],p:["beef","pasta","cheese"],rest:"Pammy's",area:"CAM",gp:19},
{n:"Tenuta delle Terre Nere Etna Rosso",v:"2022",t:"red",g:"Nerello Mascalese",r:"Etna, Sicily",b:"medium",s:["earthy","elegant","fresh"],p:["pork","pasta","cheese"],rest:"Pammy's",area:"CAM",gp:20},

/* Field & Vine — Somerville (farm-to-table, small grower) */
{n:"Laherte Frères \"Ultradition\" Brut",v:"NV",t:"sparkling",g:"Meunier / Chardonnay / Pinot Noir",r:"Champagne, France",b:"light",s:["crisp","natural","mineral"],p:["aperitif","seafood","oysters"],rest:"Field & Vine",area:"CAM",gp:22},
{n:"Les Capriades \"Pétillant Original Sec\"",v:"NV",t:"sparkling",g:"Chenin / Menu Pineau",r:"Loire, France",b:"light",s:["natural","dry","fresh"],p:["aperitif","seafood","spicy"],rest:"Field & Vine",area:"CAM",gp:18},
{n:"Catherine Riss \"Tout Naturellement\" Riesling",v:"2022",t:"white",g:"Riesling",r:"Alsace, France",b:"light",s:["dry","natural","mineral"],p:["seafood","spicy","vegetarian"],rest:"Field & Vine",area:"CAM",gp:17},
{n:"Julien Labet Chardonnay \"Fleur de Marne\"",v:"2021",t:"white",g:"Chardonnay",r:"Jura, France",b:"medium",s:["textured","mineral","dry"],p:["chicken","seafood","cheese"],rest:"Field & Vine",area:"CAM",gp:21},
{n:"Channing Daughters Rosato di Lagrein",v:"2023",t:"rosé",g:"Lagrein",r:"Long Island, NY",b:"light",s:["dry","natural","fruity"],p:["seafood","aperitif","pork"],rest:"Field & Vine",area:"CAM",gp:16},
{n:"Bloomer Creek \"Tanzen Dame\" Riesling",v:"2021",t:"white",g:"Riesling",r:"Finger Lakes, NY",b:"light",s:["off-dry","mineral","natural"],p:["spicy","seafood","aperitif"],rest:"Field & Vine",area:"CAM",gp:16},
{n:"Eyrie Vineyards Pinot Noir",v:"2021",t:"red",g:"Pinot Noir",r:"Willamette Valley, OR",b:"medium",s:["elegant","earthy","fresh"],p:["chicken","pork","cheese"],rest:"Field & Vine",area:"CAM",gp:22},

/* Spoke Wine Bar — Somerville (eclectic) */
{n:"Raventós i Blanc \"De Nit\" Rosé",v:"2022",t:"sparkling",g:"Macabeu / Xarel·lo / Monastrell",r:"Conca del Riu Anoia, Spain",b:"light",s:["crisp","dry","elegant"],p:["aperitif","seafood","spicy"],rest:"Spoke Wine Bar",area:"CAM",gp:15},
{n:"Txomin Etxaniz Getariako Txakolina",v:"2023",t:"white",g:"Hondarrabi Zuri",r:"Getariako, Spain",b:"light",s:["crisp","spritzy","dry"],p:["seafood","shellfish","aperitif"],rest:"Spoke Wine Bar",area:"CAM",gp:14},
{n:"Bernabeleva \"Navaherreros\" Blanco",v:"2022",t:"white",g:"Albillo Real",r:"Madrid, Spain",b:"medium",s:["textured","fresh","dry"],p:["seafood","chicken","vegetarian"],rest:"Spoke Wine Bar",area:"CAM",gp:17},
{n:"Le Coste \"Bianco\"",v:"2021",t:"orange",g:"Procanico / Malvasia",r:"Lazio, Italy",b:"medium",s:["skin-contact","funky","natural"],p:["cheese","spicy","pork"],rest:"Spoke Wine Bar",area:"CAM",gp:19},
{n:"Marcel Lapierre Morgon",v:"2022",t:"red",g:"Gamay",r:"Beaujolais, France",b:"medium",s:["juicy","natural","chillable"],p:["pork","chicken","cheese","pasta"],rest:"Spoke Wine Bar",area:"CAM",gp:19},
{n:"Meinklang \"Burgenland Rot\" Zweigelt",v:"2022",t:"red",g:"Zweigelt / Blaufränkisch",r:"Burgenland, Austria",b:"light",s:["chillable","juicy","organic"],p:["pizza","pasta","pork"],rest:"Spoke Wine Bar",area:"CAM",gp:15},
{n:"Olga Raffault Chinon \"Les Picasses\"",v:"2019",t:"red",g:"Cabernet Franc",r:"Loire, France",b:"medium",s:["earthy","elegant","savory"],p:["beef","pork","cheese"],rest:"Spoke Wine Bar",area:"CAM",gp:18}
];

/* Make the data importable by a test runner (Node) without affecting the browser. */
if (typeof module !== "undefined" && module.exports) { module.exports = { WINES }; }
