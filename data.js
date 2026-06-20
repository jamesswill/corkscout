/* =====================================================================
   Corkscout — WINE DATA  (VERIFIED ONLY)
   ---------------------------------------------------------------------
   Every wine below is transcribed from the restaurant's ACTUAL published
   by-the-glass menu. `gp` is the printed by-the-glass price. Each
   restaurant carries the menu_url it came from and the date it was checked.
   NOTHING here is invented. If a venue's menu can't be found/verified, it
   simply isn't in this file.

   Wine fields:  n (producer + cuvée) · v (vintage/"NV") · t (type:
   sparkling|white|rosé|orange|red|dessert) · g (grape) · r (region) ·
   rest (restaurant, must match RESTAURANTS.name) · gp (glass price, USD)
   ===================================================================== */

const RESTAURANTS = [
  { name:"Gramercy Tavern", area:"NYC", neighborhood:"Flatiron, Manhattan", michelin:1,
    menu_url:"https://www.gramercytavern.com/dining-room-menu/#beverage-list",
    menu_checked:"2026-06-19" },
  { name:"Juliet", area:"LA", neighborhood:"Culver City", michelin:0,
    menu_url:"https://www.juliet.la/s/Juliet.pdf",
    menu_checked:"2026-06-19" },
  { name:"Grill 23 & Bar", area:"BOS", neighborhood:"Back Bay, Boston", michelin:0,
    menu_url:"https://www.grill23.com/menus",
    menu_checked:"2026-06-19" },
  { name:"n/soto", area:"LA", neighborhood:"West Adams, LA", michelin:0,
    menu_url:"https://n-soto.com/menu",
    menu_checked:"2026-06-19" },
  { name:"King", area:"NYC", neighborhood:"SoHo, Manhattan", michelin:1,
    menu_url:"https://kingrestaurant.nyc/cocktails-wines-by-the-glass",
    menu_checked:"2026-06-19" },
  { name:"Estela", area:"NYC", neighborhood:"NoHo, Manhattan", michelin:1,
    menu_url:"https://hub.binwise.com/restaurant/estela/list/estela-wine-list.pdf",
    menu_checked:"2026-06-19" },
];

const WINES = [
/* ===== GRAMERCY TAVERN — Flatiron, NYC =====
   Source: Gramercy Tavern wine-by-the-glass list, checked 2026-06-19 */
{n:"Channing Daughters Pét-Nat 'Rosato'",v:"2024",t:"sparkling",g:"Merlot / Lagrein",r:"Long Island, New York",rest:"Gramercy Tavern",gp:19},
{n:"Ananas Prosecco Brut",v:"NV",t:"sparkling",g:"Glera",r:"Valdobbiadene, Veneto, Italy",rest:"Gramercy Tavern",gp:16},
{n:"Champagne G. Wanner Blanc de Blancs Extra Brut",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"Gramercy Tavern",gp:38},
{n:"Emmerich Knoll 'Loibner' Grüner Veltliner Federspiel",v:"2024",t:"white",g:"Grüner Veltliner",r:"Wachau, Austria",rest:"Gramercy Tavern",gp:28},
{n:"La Staffa Verdicchio dei Castelli di Jesi Classico",v:"2024",t:"white",g:"Verdicchio",r:"Le Marche, Italy",rest:"Gramercy Tavern",gp:18},
{n:"La Marea 'Kristy' Albariño",v:"2024",t:"white",g:"Albariño",r:"Monterey, California",rest:"Gramercy Tavern",gp:20},
{n:"Dominique et Janine Crochet Sancerre",v:"2024",t:"white",g:"Sauvignon Blanc",r:"Loire, France",rest:"Gramercy Tavern",gp:25},
{n:"Cole Ranch Riesling",v:"2022",t:"white",g:"Riesling",r:"Mendocino, California",rest:"Gramercy Tavern",gp:21},
{n:"Benoni Chardonnay",v:"2023",t:"white",g:"Chardonnay",r:"Russian River Valley, Sonoma, California",rest:"Gramercy Tavern",gp:26},
{n:"Dominique & Romain Collet 'Vieilles Vignes' Chablis",v:"2022",t:"white",g:"Chardonnay",r:"Chablis, Burgundy, France",rest:"Gramercy Tavern",gp:26},
{n:"Barbichette 'Poc à Poc' Muscat",v:"2024",t:"orange",g:"Muscat",r:"Seneca Lake, New York",rest:"Gramercy Tavern",gp:19},
{n:"Red Car Pinot Noir Rosé (Magnum)",v:"2024",t:"rosé",g:"Pinot Noir",r:"Sonoma Coast, California",rest:"Gramercy Tavern",gp:19},
{n:"Red Tail Ridge 'RTR Estate' Teroldego",v:"2022",t:"red",g:"Teroldego",r:"Finger Lakes, New York",rest:"Gramercy Tavern",gp:20},
{n:"Kelley Fox 'Mirabai' Pinot Noir",v:"2024",t:"red",g:"Pinot Noir",r:"Dundee Hills, Willamette Valley, Oregon",rest:"Gramercy Tavern",gp:24},
{n:"Il Palazzone 'La Collina' Sangiovese",v:"NV",t:"red",g:"Sangiovese",r:"Tuscany, Italy",rest:"Gramercy Tavern",gp:19},
{n:"Produttori del Barbaresco Nebbiolo",v:"2022",t:"red",g:"Nebbiolo",r:"Piedmont, Italy",rest:"Gramercy Tavern",gp:35},
{n:"The Withers Grenache",v:"2018",t:"red",g:"Grenache",r:"El Dorado, Sierra Foothills, California",rest:"Gramercy Tavern",gp:18},
{n:"Sixteen 600 Zinfandel",v:"2022",t:"red",g:"Zinfandel",r:"Sonoma, California",rest:"Gramercy Tavern",gp:25},
{n:"Soussans Cabernet Blend",v:"2020",t:"red",g:"Cabernet Blend",r:"Margaux, Bordeaux, France",rest:"Gramercy Tavern",gp:24},
{n:"Pax 'The Bench Vineyard' Syrah",v:"2023",t:"red",g:"Syrah",r:"Clements Hills, Lodi, California",rest:"Gramercy Tavern",gp:23},
{n:"Ceritas 'Colima' Cabernet Sauvignon",v:"2022",t:"red",g:"Cabernet Sauvignon",r:"California",rest:"Gramercy Tavern",gp:34},
{n:"Matthiasson 'Village' Cabernet Sauvignon",v:"2023",t:"red",g:"Cabernet Sauvignon",r:"Napa, California",rest:"Gramercy Tavern",gp:22},

/* ===== JULIET — Culver City, LA =====
   Source: Juliet by-the-glass menu (juliet.la/s/Juliet.pdf), checked 2026-06-19.
   Price = full GLASS pour (the 3rd of the 1oz/half/glass/carafe columns). */
{n:"Jacques Lassaigne 'Les Vignes de Montgueux' Extra Brut, Blanc de Blancs",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"Juliet",gp:40},
{n:"Pierre Deville 'Copin' Extra Brut, Blanc de Blancs Grand Cru",v:"2018",t:"sparkling",g:"Chardonnay",r:"Verzy, Champagne, France",rest:"Juliet",gp:18},
{n:"Vincent Charlot 'Fruit de ma Passion' Extra Brut",v:"2014",t:"sparkling",g:"Champagne blend",r:"Champagne, France",rest:"Juliet",gp:20},
{n:"Olivier Horiot 'Métisse' Brut Nature",v:"NV",t:"sparkling",g:"Pinot Noir / Chardonnay",r:"Les Riceys, Champagne, France",rest:"Juliet",gp:30},
{n:"Frederic Savart 'L'Ouverture' Extra Brut, Blanc de Noirs 1er Cru",v:"NV",t:"sparkling",g:"Pinot Noir",r:"Champagne, France",rest:"Juliet",gp:24},
{n:"Pierre Baillette 'Coeur de Craie' Extra Brut, Blanc de Noirs",v:"2016",t:"sparkling",g:"Pinot Noir",r:"Rilly la Montagne, Champagne, France",rest:"Juliet",gp:26},
{n:"Agrapart & Fils '7 Crus' Extra Brut, Blanc de Blancs Grand Cru",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"Juliet",gp:28},
{n:"Laherte Frères 'Rosé de Meunier' Extra Brut",v:"NV",t:"sparkling",g:"Meunier",r:"Champagne, France",rest:"Juliet",gp:22},
{n:"Louis Roederer 'Cristal' Brut",v:"2013",t:"sparkling",g:"Chardonnay / Pinot Noir",r:"Champagne, France",rest:"Juliet",gp:90},
{n:"Jacques Selosse 'Initial' Brut, Blanc de Blancs Grand Cru",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"Juliet",gp:120},
{n:"Domaine Ott Château Romassan, Bandol",v:"2023",t:"rosé",g:"Mourvèdre / Cinsault",r:"Bandol, Provence, France",rest:"Juliet",gp:32},
{n:"Domaine Tempier, Bandol",v:"2023",t:"rosé",g:"Grenache / Mourvèdre / Cinsault",r:"Bandol, Provence, France",rest:"Juliet",gp:30},
{n:"Château La Coste",v:"2023",t:"rosé",g:"Cabernet Sauvignon / Cinsault",r:"Coteaux d'Aix en Provence, France",rest:"Juliet",gp:18},
{n:"Château Simone, Palette",v:"2021",t:"rosé",g:"Grenache / Mourvèdre",r:"Palette, Provence, France",rest:"Juliet",gp:36},
{n:"Bonnet-Huteau 'Les Bonnet Blancs' Muscadet",v:"2023",t:"white",g:"Melon de Bourgogne",r:"Muscadet, Loire, France",rest:"Juliet",gp:16},
{n:"Domaine du Pélican 'Grand Curoulet' Arbois",v:"2018",t:"white",g:"Chardonnay",r:"Arbois, Jura, France",rest:"Juliet",gp:30},
{n:"Pierre Boisson 'Murgey de Limozin'",v:"2019",t:"white",g:"Chardonnay",r:"Burgundy, France",rest:"Juliet",gp:28},
{n:"Jean Masson 'Lisa' Apremont",v:"2023",t:"white",g:"Jacquère",r:"Apremont, Savoie, France",rest:"Juliet",gp:20},
{n:"Josmeyer 'Mise du Printemps'",v:"2023",t:"white",g:"Pinot Blanc",r:"Alsace, France",rest:"Juliet",gp:19},
{n:"Le Roc des Anges 'l'Oca'",v:"2020",t:"white",g:"Macabeu",r:"Côtes Catalanes, France",rest:"Juliet",gp:27},
{n:"Valentini Trebbiano d'Abruzzo",v:"2017",t:"white",g:"Trebbiano",r:"Abruzzo, Italy",rest:"Juliet",gp:50},
{n:"Fumey Chatelain Poulsard, Arbois",v:"2019",t:"red",g:"Poulsard",r:"Arbois, Jura, France",rest:"Juliet",gp:16},
{n:"Domaine du Pélican 'Béranger' Trousseau, Arbois",v:"2019",t:"red",g:"Trousseau",r:"Arbois, Jura, France",rest:"Juliet",gp:36},
{n:"Dupré-Goujon 'La Démarante' Côte de Brouilly",v:"2021",t:"red",g:"Gamay",r:"Beaujolais, France",rest:"Juliet",gp:20},
{n:"Catherine & Pierre Breton Grolleau",v:"2021",t:"red",g:"Grolleau",r:"Val de Loire, France",rest:"Juliet",gp:18},
{n:"Antoine Sanzay 'Les Poyeux' Saumur-Champigny",v:"2015",t:"red",g:"Cabernet Franc",r:"Saumur-Champigny, Loire, France",rest:"Juliet",gp:33},
{n:"Bruno Clair 'Les Grasses Têtes' Marsannay",v:"2020",t:"red",g:"Pinot Noir",r:"Marsannay, Burgundy, France",rest:"Juliet",gp:30},
{n:"Domaine de l'Arlot 'Mont des Oiseaux' Nuits-Saint-Georges",v:"2020",t:"red",g:"Pinot Noir",r:"Nuits-Saint-Georges, Burgundy, France",rest:"Juliet",gp:35},
{n:"Marquis d'Angerville 'Champans' Volnay 1er Cru",v:"2018",t:"red",g:"Pinot Noir",r:"Volnay, Burgundy, France",rest:"Juliet",gp:90},
{n:"Hudelot-Baillet Chambolle-Musigny Vieilles Vignes",v:"2019",t:"red",g:"Pinot Noir",r:"Chambolle-Musigny, Burgundy, France",rest:"Juliet",gp:43},
{n:"Olivier Rivière 'Les Jardins d'Édina' Côtes de Bourg",v:"2022",t:"red",g:"Merlot",r:"Côtes de Bourg, Bordeaux, France",rest:"Juliet",gp:19},
{n:"Jamet 'Fructus Voluptas' Côte-Rôtie",v:"2018",t:"red",g:"Syrah",r:"Côte-Rôtie, Rhône, France",rest:"Juliet",gp:45},
{n:"Poderi Colla 'Bussia' Barolo",v:"2017",t:"red",g:"Nebbiolo",r:"Barolo, Piedmont, Italy",rest:"Juliet",gp:35},

/* ===== GRILL 23 & BAR — Back Bay, Boston =====
   Source: Grill 23 beverage list (Wine List 06.17.26), via grill23.com/menus,
   checked 2026-06-19. (Still + sparkling by-the-glass; their by-the-glass
   port/madeira/sherry list is omitted.) */
{n:"Nominé-Renard Brut",v:"NV",t:"sparkling",g:"Champagne blend",r:"Villevenard, Champagne, France",rest:"Grill 23 & Bar",gp:42},
{n:"Girost-Moussy 'Tradition' Brut",v:"NV",t:"sparkling",g:"Champagne blend",r:"Congy, Champagne, France",rest:"Grill 23 & Bar",gp:28},
{n:"Zonin Prosecco Extra Brut",v:"NV",t:"sparkling",g:"Glera",r:"Prosecco DOC, Italy",rest:"Grill 23 & Bar",gp:14},
{n:"Marqués de Cáceres 'Deusa Nai' Albariño",v:"2023",t:"white",g:"Albariño",r:"Rías Baixas, Spain",rest:"Grill 23 & Bar",gp:15},
{n:"Dial Tone Chardonnay",v:"2024",t:"white",g:"Chardonnay",r:"Santa Barbara County, California",rest:"Grill 23 & Bar",gp:18},
{n:"Mathieu Paquet 'Cuvée Louise' Mâcon-Villages",v:"2023",t:"white",g:"Chardonnay",r:"Burgundy, France",rest:"Grill 23 & Bar",gp:18},
{n:"Famille Savary Chablis 1er Cru 'Fourchaume'",v:"2023",t:"white",g:"Chardonnay",r:"Chablis, Burgundy, France",rest:"Grill 23 & Bar",gp:35},
{n:"Hirsch 'Hirschvergnügen' Grüner Veltliner",v:"2023",t:"white",g:"Grüner Veltliner",r:"Kamptal, Austria",rest:"Grill 23 & Bar",gp:15},
{n:"Ca' Donini Pinot Grigio",v:"2024",t:"white",g:"Pinot Grigio",r:"delle Venezie, Italy",rest:"Grill 23 & Bar",gp:12},
{n:"Willi Haag 'Brauneberger Juffer' Riesling Kabinett",v:"2024",t:"white",g:"Riesling",r:"Mosel, Germany",rest:"Grill 23 & Bar",gp:16},
{n:"Groth Sauvignon Blanc",v:"2024",t:"white",g:"Sauvignon Blanc",r:"Napa Valley, California",rest:"Grill 23 & Bar",gp:16},
{n:"Peyrassol 'La Croix' Rosé",v:"2025",t:"rosé",g:"Grenache / Cinsault / Syrah",r:"Méditerranée IGP, France",rest:"Grill 23 & Bar",gp:16},
{n:"Mount Veeder Cabernet Sauvignon",v:"2021",t:"red",g:"Cabernet Sauvignon",r:"Napa Valley, California",rest:"Grill 23 & Bar",gp:32},
{n:"Daou Cabernet Sauvignon",v:"2023",t:"red",g:"Cabernet Sauvignon",r:"Paso Robles, California",rest:"Grill 23 & Bar",gp:18},
{n:"Château Fontanès 'Les Traverses' Cabernet Sauvignon",v:"2023",t:"red",g:"Cabernet Sauvignon",r:"Vin de Pays d'Oc, France",rest:"Grill 23 & Bar",gp:13},
{n:"Château Moulin Merlot",v:"2020",t:"red",g:"Merlot",r:"Canon-Fronsac, Bordeaux, France",rest:"Grill 23 & Bar",gp:22},
{n:"Altos Las Hormigas Malbec",v:"2023",t:"red",g:"Malbec",r:"Mendoza, Argentina",rest:"Grill 23 & Bar",gp:15},
{n:"G.D. Vajra Langhe Nebbiolo",v:"2024",t:"red",g:"Nebbiolo",r:"Piedmont, Italy",rest:"Grill 23 & Bar",gp:18},
{n:"RouteStock Pinot Noir",v:"2023",t:"red",g:"Pinot Noir",r:"Sonoma Coast, California",rest:"Grill 23 & Bar",gp:17},
{n:"Castello di Ama 'Montebuoni' Chianti Classico Riserva",v:"2021",t:"red",g:"Sangiovese",r:"Tuscany, Italy",rest:"Grill 23 & Bar",gp:28},
{n:"J.L. Chave Selections 'Mon Coeur' Côtes-du-Rhône",v:"2024",t:"red",g:"Syrah / Grenache",r:"Rhône, France",rest:"Grill 23 & Bar",gp:17},
{n:"Pago del Cielo 'Celeste' Crianza Tempranillo",v:"2022",t:"red",g:"Tempranillo",r:"Ribera del Duero, Spain",rest:"Grill 23 & Bar",gp:18},

/* ===== n/soto — West Adams, LA =====
   Source: n/soto menu (n-soto.com/menu, "Sake by the Glass"), checked 2026-06-19.
   Sake graded by classification; region "Japan" except where the brewery is
   explicitly elsewhere (Brooklyn Kura). */
{n:"Uehara 'Forest Spirit'",v:"NV",t:"sake",g:"Usunigori Junmai",r:"Japan",rest:"n/soto",gp:17},
{n:"Sawanoi 'Super Dry'",v:"NV",t:"sake",g:"Junmai",r:"Japan",rest:"n/soto",gp:16},
{n:"Shibata 'Pink' (200ml)",v:"NV",t:"sake",g:"Nigori Junmai Ginjo",r:"Japan",rest:"n/soto",gp:19},
{n:"Kamenoi 'Kudoki Jozu'",v:"NV",t:"sake",g:"Junmai Ginjo",r:"Japan",rest:"n/soto",gp:14},
{n:"Azumanofumoto 'First Wave'",v:"NV",t:"sake",g:"Junmai Ginjo",r:"Japan",rest:"n/soto",gp:16},
{n:"Koueigiku 'Twilight Orange'",v:"NV",t:"sake",g:"Junmai Ginjo",r:"Japan",rest:"n/soto",gp:15},
{n:"Tenryo 'Imperial Landing'",v:"NV",t:"sake",g:"Junmai Daiginjo",r:"Japan",rest:"n/soto",gp:17},
{n:"Kodama 'Clear Moon'",v:"NV",t:"sake",g:"Junmai Ginjo",r:"Japan",rest:"n/soto",gp:16},
{n:"Kirei 'Mannen'",v:"NV",t:"sake",g:"Junmai Daiginjo",r:"Japan",rest:"n/soto",gp:15},
{n:"Brooklyn Kura 'Ashokan' (375ml)",v:"NV",t:"sake",g:"Junmai Ginjo",r:"Brooklyn, New York",rest:"n/soto",gp:36},
{n:"Ohmine '3 Grain'",v:"NV",t:"sake",g:"Junmai Daiginjo",r:"Japan",rest:"n/soto",gp:22},
{n:"Hououbiden 'Asahimai'",v:"NV",t:"sake",g:"Junmai Daiginjo",r:"Japan",rest:"n/soto",gp:19},

/* ===== KING — SoHo, NYC =====
   Source: King "Wines by the Glass" page (kingrestaurant.nyc/cocktails-wines-by-the-glass),
   checked 2026-06-19. */
{n:"Diletta Tonello 'io Teti' Spumante",v:"2018",t:"sparkling",g:"Spumante",r:"Italy",rest:"King",gp:19},
{n:"Pierre Moncuit 'Hugues de Coulmet' Blanc de Blancs Champagne",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"King",gp:30},
{n:"Domaine de la Pépière 'Gras Moutons' Muscadet",v:"2021",t:"white",g:"Melon de Bourgogne",r:"Loire, France",rest:"King",gp:16},
{n:"Arnaud Lambert 'Clos du Midi' Chenin Blanc",v:"2021",t:"white",g:"Chenin Blanc",r:"Saumur, Loire, France",rest:"King",gp:18},
{n:"Monastero Trappiste Vitorchiano 'Coenobium Bianco'",v:"2021",t:"white",g:"Trebbiano",r:"Lazio, Italy",rest:"King",gp:19},
{n:"Claudio Vio Pigato",v:"2021",t:"white",g:"Pigato",r:"Riviera Ligure di Ponente, Liguria, Italy",rest:"King",gp:22},
{n:"King Rosé",v:"2021",t:"rosé",g:"",r:"Languedoc, France",rest:"King",gp:16},
{n:"La Villana Aleatico Rosato",v:"NV",t:"rosé",g:"Aleatico",r:"Lazio, Italy",rest:"King",gp:17},
{n:"Equis (M. Graillot) 'Crozes-Hermitage Équinoxe'",v:"2021",t:"red",g:"Syrah",r:"Crozes-Hermitage, Rhône, France",rest:"King",gp:18},
{n:"M. Lapierre 'Raisins Gaulois'",v:"2021",t:"red",g:"Gamay",r:"Beaujolais, France",rest:"King",gp:20},
{n:"Georges Roy 'Savigny-lès-Beaune Les Picotins'",v:"2020",t:"red",g:"Pinot Noir",r:"Burgundy, France",rest:"King",gp:21},
{n:"Maison Arrextea 'Irouléguy Rouge'",v:"2019",t:"red",g:"Cabernet blend",r:"Irouléguy, France",rest:"King",gp:24},

/* ===== ESTELA — NoHo, NYC =====
   Source: Estela wine list (By the Glass section), checked 2026-06-19.
   Estela groups its glass pours as Under Flor / Sparkling / White / Skin
   Contact / Red, plus dessert-by-the-glass; flor & fortified shown as dessert. */
{n:"Alvear '3 Miradas' Vino de Pueblo",v:"2021",t:"white",g:"",r:"Andalucía, Spain",rest:"Estela",gp:14},
{n:"Bénédicte & Stéphane Tissot Arbois Savagnin Sous Voile",v:"2021",t:"white",g:"Savagnin",r:"Jura, France",rest:"Estela",gp:29},
{n:"El Maestro Sierra 12-Year Amontillado",v:"NV",t:"dessert",g:"Amontillado Sherry",r:"Jerez, Andalucía, Spain",rest:"Estela",gp:19},
{n:"Zafeirakis 'Prologue' Extra Brut Rosé",v:"NV",t:"sparkling",g:"",r:"Thessaly, Greece",rest:"Estela",gp:18},
{n:"Franck Bonville Blanc de Blancs Grand Cru",v:"NV",t:"sparkling",g:"Chardonnay",r:"Champagne, France",rest:"Estela",gp:32},
{n:"JB Becker 'Münsterer Rheinberg' Riesling Kabinett Trocken",v:"2023",t:"white",g:"Riesling",r:"Rheingau, Germany",rest:"Estela",gp:23},
{n:"Domaine Lupin Roussette de Savoie 'Frangy'",v:"2024",t:"white",g:"Altesse",r:"Savoie, France",rest:"Estela",gp:20},
{n:"Natus Vini 'Intus' Branco",v:"2022",t:"white",g:"",r:"Alentejano, Portugal",rest:"Estela",gp:19},
{n:"Domaine Paquet Bourgogne Blanc",v:"2024",t:"white",g:"Chardonnay",r:"Burgundy, France",rest:"Estela",gp:25},
{n:"Arnot-Roberts Touriga Nacional Rosé",v:"2025",t:"orange",g:"Touriga Nacional",r:"California, USA",rest:"Estela",gp:19},
{n:"Yohan Lardy 'Poppy' Gamay",v:"2024",t:"red",g:"Gamay",r:"Beaujolais, France",rest:"Estela",gp:18},
{n:"Tierra Fundida 'Wanderer' Listán Negro",v:"2024",t:"red",g:"Listán Negro",r:"Canary Islands, Spain",rest:"Estela",gp:21},
{n:"Le Petit Saint Vincent Cabernet Franc, Saumur-Champigny",v:"2022",t:"red",g:"Cabernet Franc",r:"Loire, France",rest:"Estela",gp:19},
{n:"Elodie Jaume 'Coudoulet' Côtes du Rhône",v:"2024",t:"red",g:"",r:"Rhône, France",rest:"Estela",gp:23},
{n:"Pablo Fallabrino 'Alcyone' Tannat",v:"NV",t:"dessert",g:"Tannat",r:"Atlántida, Uruguay",rest:"Estela",gp:18},
{n:"Rare Wine Co. 'Boston Bual' Madeira",v:"NV",t:"dessert",g:"Bual",r:"Madeira, Portugal",rest:"Estela",gp:20}
];

/* Importable by the Node seed script without affecting the browser. */
if (typeof module !== "undefined" && module.exports) { module.exports = { WINES, RESTAURANTS }; }
