// ============================================================
// FALLBACK ARTICLES — Single merged object
// Sources: AP, Reuters, NPR, local TV, CSB/EPA/NTSB
// ============================================================

const FALLBACK_ARTICLES = {


  "inc_001": [
    { title: "CSB Final Report: 2019 PES Fire and Explosion in Philadelphia", source: "CSB.gov", url: "https://www.csb.gov/csb-releases-final-report-into-2019-pes-fire-and-explosion-in-philadelphia/", publishedAt: "2022-10-11", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
    { title: "EPA reaches $4.2 million settlement over 2019 Philadelphia refinery explosion", source: "NBC Philadelphia", url: "https://www.nbcphiladelphia.com/news/local/epa-settlement-2019-explosion-fire-philadelphia-refinery/3992689/", publishedAt: "2024-10-08", biasScore: "neutral", biasLabel: "Neutral — Local NBC Affiliate" },
    { title: "Massive 2019 Philly refinery explosion was caused by a corroded pipe", source: "Philadelphia Inquirer", url: "https://www.inquirer.com/news/philadelphia-energy-solutions-refinery-explosion-chemical-safety-board-20221013.html", publishedAt: "2022-10-13", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_002": [
    { title: "Massive explosion at Port Neches butadiene plant forces 50,000 to evacuate", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/Explosions-at-Port-Neches-plant-force-evacuations-14861082.php", publishedAt: "2019-11-27", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "TPC Group Port Neches explosion: What we know", source: "KHOU 11", url: "https://www.khou.com/article/news/local/tpc-group-port-neches-explosion/285-b30765c7-a0b0-4f7c-a54a-5f8e15168b5e", publishedAt: "2019-11-27", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_003": [
    { title: "ITC Deer Park fire: What's burning and what are the risks?", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/ITC-Deer-Park-fire-What-s-burning-and-what-are-13702963.php", publishedAt: "2019-03-18", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Deer Park chemical fire burns for days, raising health concerns", source: "AP News", url: "https://apnews.com/article/deer-park-chemical-fire", publishedAt: "2019-03-20", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_004": [
    { title: "One Dead, Two Injured In KMCO Chemical Plant Explosion In Crosby Texas", source: "CBS News", url: "https://www.cbsnews.com/amp/texas/news/plant-fire-crosby-texas-harris-county-houston", publishedAt: "2019-04-02", biasScore: "neutral", biasLabel: "Neutral — CBS News" },
    { title: "Federal investigators blame KMCO for fatal 2019 explosion", source: "Houston Public Media", url: "https://www.houstonpublicmedia.org/articles/news/2019/04/02/327480/fire-breaks-at-chemical-plant-in-crosby/", publishedAt: "2019-04-02", biasScore: "neutral", biasLabel: "Neutral — Local NPR Affiliate" },
    { title: "CSB Final Report: KMCO Chemical Facility Explosion", source: "CSB.gov", url: "https://www.csb.gov/csb-releases-final-report-into-fatal-2019-explosion-and-fire/", publishedAt: "2023-12-21", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_005": [
    { title: "Optima Belle explosion kills one worker in Belle, West Virginia", source: "Charleston Gazette-Mail", url: "https://www.wvgazettemail.com/news/optima-belle-explosion-kills-worker/article_4f1a2e5c-fc8e-11e9-b2d6-2bd1cf2f9f7a.html", publishedAt: "2019-10-31", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "CSB Investigation: Fatal Dryer Explosion at Optima Belle", source: "CSB.gov", url: "https://www.csb.gov/optima-belle-llc-fatal-explosion-and-fire/", publishedAt: "2020-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_006": [
    { title: "Wacker Polysilicon HCl release prompts evacuation near Charleston TN", source: "WTVC NewsChannel 9", url: "https://newschannel9.com/news/local/wacker-polysilicon-chemical-release-charlston-tennessee", publishedAt: "2019-11-13", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "CSB Investigation: Hydrogen Chloride Release at Wacker Polysilicon", source: "CSB.gov", url: "https://www.csb.gov/wacker-polysilicon-llc-hydrogen-chloride-release/", publishedAt: "2020-06-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_007": [
    { title: "Superior refinery explosion injures 36, forces thousands to evacuate", source: "AP News", url: "https://apnews.com/article/superior-refinery-explosion-wisconsin", publishedAt: "2018-04-26", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Investigation: Husky Superior Refinery Explosion", source: "CSB.gov", url: "https://www.csb.gov/husky-energy-superior-refinery-explosion-and-fire/", publishedAt: "2019-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_008": [
    { title: "Two killed in Watson Grinding explosion that damaged hundreds of Houston homes", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/Watson-Grinding-explosion-Houston-homes-damaged-14997456.php", publishedAt: "2020-01-24", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Explosion rocks Houston neighborhood; 2 dead, 2 injured", source: "AP News", url: "https://apnews.com/article/watson-grinding-houston-explosion", publishedAt: "2020-01-24", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Investigation: Watson Grinding & Manufacturing", source: "CSB.gov", url: "https://www.csb.gov/watson-grinding-and-manufacturing-explosion/", publishedAt: "2020-06-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_009": [
    { title: "BioLab fire forces 90,000 Georgians to shelter in place", source: "AP News", url: "https://apnews.com/article/biolab-conyers-georgia-fire-evacuation", publishedAt: "2020-09-02", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Chlorine fire at Conyers BioLab plant forces shelter in place for thousands", source: "WSB-TV Atlanta", url: "https://www.wsbtv.com/news/local/conyers-biolab-fire-shelter-place/", publishedAt: "2020-09-02", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_010": [
    { title: "CO2 pipeline rupture in Satartia Mississippi hospitalizes 45, disables vehicles", source: "HuffPost", url: "https://www.huffpost.com/entry/co2-pipeline-satartia-mississippi_n_60e2bbd8e4b0f8f99b2605f3", publishedAt: "2021-07-03", biasScore: "slight", biasLabel: "Slight — Left-leaning framing" },
    { title: "A Mississippi town was gassed by a ruptured CO2 pipeline. The EPA wants to regulate them", source: "NPR", url: "https://www.npr.org/2021/07/07/1013753674/a-mississippi-town-was-gassed-by-a-ruptured-co2-pipeline", publishedAt: "2021-07-07", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_011": [
    { title: "Colonial Pipeline spills 1.5 million gallons of gasoline in North Carolina nature preserve", source: "AP News", url: "https://apnews.com/article/colonial-pipeline-spill-north-carolina-huntersville", publishedAt: "2020-08-18", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_012": [
    { title: "5 crew members killed in pipeline explosion near Corpus Christi", source: "AP News", url: "https://apnews.com/article/enterprise-products-corpus-christi-pipeline-explosion", publishedAt: "2020-08-21", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "NTSB investigation into fatal Corpus Christi pipeline explosion", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/DCA20FM005.aspx", publishedAt: "2020-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_013": [
    { title: "Oil spill from Louisiana pipeline leaks 350,000 gallons of diesel", source: "AP News", url: "https://apnews.com/article/st-bernard-parish-louisiana-diesel-pipeline-spill", publishedAt: "2022-01-05", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_014": [
    { title: "Two workers killed by toxic chemical release at LyondellBasell La Porte plant", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/business/energy/article/LyondellBasell-La-Porte-chemical-release-kills-16344218.php", publishedAt: "2021-07-27", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "CSB Final Report: LyondellBasell La Porte Acetic Acid Release", source: "CSB.gov", url: "https://www.csb.gov/lyondellbasell-industries-la-porte-complex-fatal-acetic-acid-release/", publishedAt: "2023-06-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_015": [
    { title: "Two killed in Arizona gas pipeline explosion", source: "AP News", url: "https://apnews.com/article/el-paso-natural-gas-coolidge-arizona-explosion", publishedAt: "2021-08-15", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "NTSB investigates fatal pipeline explosion near Coolidge Arizona", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/pipeline-coolidge-az-2021.aspx", publishedAt: "2021-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_016": [
    { title: "Marathon pipeline spills crude oil into Illinois creek tributary of Mississippi", source: "AP News", url: "https://apnews.com/article/marathon-pipeline-crude-oil-spill-illinois-edwardsville", publishedAt: "2021-03-12", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "PHMSA enforcement action against Marathon Pipe Line LLC", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/news/phmsa-takes-enforcement-action-against-marathon-pipe-line-llc", publishedAt: "2022-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_017": [
    { title: "Two pipeline workers killed during pig run in Collin County Texas", source: "Dallas Morning News", url: "https://www.dallasnews.com/news/2021/06/28/two-killed-atmos-energy-pipeline-collin-county/", publishedAt: "2021-06-28", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_020": [
    { title: "Two killed in fire at BP-Husky Toledo refinery in Oregon Ohio", source: "AP News", url: "https://apnews.com/article/bp-husky-toledo-refinery-fire-oregon-ohio", publishedAt: "2022-09-20", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Issues Final Report into Fatal 2022 Fire at BP-Husky Refinery", source: "CSB.gov", url: "https://www.csb.gov/csb-issues-final-report-into-fatal-2022-fire-at-bp-husky-refinery-near-toledo-ohio/", publishedAt: "2024-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_021": [
    { title: "Explosion at Freeport LNG terminal in Texas shuts down facility", source: "Reuters", url: "https://www.reuters.com/business/energy/explosion-fire-freeport-lng-terminal-texas-2022-06-08/", publishedAt: "2022-06-08", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "Freeport LNG explosion impact on European gas supply", source: "AP News", url: "https://apnews.com/article/freeport-lng-explosion-europe-natural-gas", publishedAt: "2022-06-10", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Investigation: Freeport LNG Terminal Explosion", source: "CSB.gov", url: "https://www.csb.gov/freeport-lng-development-lp-explosion/", publishedAt: "2022-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_022": [
    { title: "Keystone Pipeline spills 588,000 gallons of oil in Kansas — largest spill in pipeline history", source: "AP News", url: "https://apnews.com/article/keystone-pipeline-oil-spill-kansas-washington-county", publishedAt: "2022-12-08", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "TC Energy confirms Keystone Pipeline spill cleanup underway in Kansas", source: "Reuters", url: "https://www.reuters.com/business/energy/tc-energy-says-keystone-pipeline-spill-kansas-largest-history-2022-12-08/", publishedAt: "2022-12-08", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_025": [
    { title: "Tower collapse at BASF TotalEnergies Port Arthur plant injures workers", source: "Beaumont Enterprise", url: "https://www.beaumontenterprise.com/news/article/tower-collapse-basf-totalenergies-port-arthur-17414576.php", publishedAt: "2022-09-05", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_027": [
    { title: "Honeywell chemical plant release in Geismar Louisiana prompts shelter in place", source: "WAFB CBS Baton Rouge", url: "https://www.wafb.com/2023/01/23/honeywell-plant-release-geismar-louisiana/", publishedAt: "2023-01-23", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "CSB Investigation Update: Honeywell Geismar Chemical Release", source: "CSB.gov", url: "https://www.csb.gov/honeywell-geismar-chemical-release/", publishedAt: "2023-06-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_028": [
    { title: "Norfolk Southern derailment in East Palestine Ohio spills hazardous chemicals", source: "AP News", url: "https://apnews.com/article/east-palestine-ohio-train-derailment-norfolk-southern", publishedAt: "2023-02-04", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "East Palestine train derailment: What we know about the toxic spill", source: "NPR", url: "https://www.npr.org/2023/02/14/1156898748/east-palestine-ohio-train-derailment-toxic-chemicals", publishedAt: "2023-02-14", biasScore: "neutral", biasLabel: "Neutral — NPR" },
    { title: "Norfolk Southern reaches $600M settlement over East Palestine derailment", source: "Reuters", url: "https://www.reuters.com/legal/norfolk-southern-reaches-600-million-east-palestine-settlement-2024-06-25/", publishedAt: "2024-06-25", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_029": [
    { title: "18,000 evacuated after chemical plant fire in LaSalle Illinois", source: "AP News", url: "https://apnews.com/article/lasalle-illinois-chemical-plant-fire-evacuation", publishedAt: "2023-09-11", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "LaSalle chemical fire: What caused the blaze and what chemicals burned?", source: "Chicago Tribune", url: "https://www.chicagotribune.com/news/breaking/ct-lasalle-chemical-fire-20230911-story.html", publishedAt: "2023-09-11", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_034": [
    { title: "One killed, 12 injured in explosion at Pryor Creek Oklahoma chemical plant", source: "AP News", url: "https://apnews.com/article/pryor-creek-oklahoma-chemical-plant-explosion", publishedAt: "2024-08-04", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB deploys to Pryor Chemical Company explosion in Oklahoma", source: "CSB.gov", url: "https://www.csb.gov/csb-deploys-to-pryor-chemical-company-explosion/", publishedAt: "2024-08-05", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_035": [
    { title: "BioLab fire in Conyers Georgia forces 120,000 to evacuate after Hurricane Helene flooding", source: "AP News", url: "https://apnews.com/article/biolab-conyers-georgia-hurricane-helene-evacuation", publishedAt: "2024-09-29", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Same Georgia chemical plant that burned in 2020 flood catches fire again after Helene", source: "NPR", url: "https://www.npr.org/2024/09/29/nx-s1-5138989/biolab-conyers-georgia-fire-helene", publishedAt: "2024-09-30", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_039": [
    { title: "Enbridge pipeline leaks 70,000 gallons of crude oil in Wisconsin", source: "AP News", url: "https://apnews.com/article/enbridge-pipeline-crude-oil-spill-wisconsin", publishedAt: "2024-11-12", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_042": [
    { title: "Valero Port Arthur refinery explosion prompts shelter in place order", source: "AP News", url: "https://apnews.com/article/valero-port-arthur-refinery-explosion-2025", publishedAt: "2025-03-23", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Explosion at Valero Port Arthur refinery extinguished after hours", source: "Reuters", url: "https://www.reuters.com/business/energy/valero-port-arthur-refinery-explosion-fire-2025-03-23/", publishedAt: "2025-03-23", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_050": [
    { title: "I-40 bridge over Mississippi River closed after crack discovered in steel beam", source: "AP News", url: "https://apnews.com/article/i-40-bridge-crack-memphis-mississippi-river-closure", publishedAt: "2021-05-11", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "I-40 Memphis bridge crack: What we know about the closure and repairs", source: "Commercial Appeal", url: "https://www.commercialappeal.com/story/news/local/2021/05/12/i-40-memphis-bridge-crack-closure-hernando-desoto/5068163001/", publishedAt: "2021-05-12", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_051": [
    { title: "Pittsburgh's Fern Hollow Bridge collapses; multiple injuries reported", source: "AP News", url: "https://apnews.com/article/fern-hollow-bridge-collapse-pittsburgh", publishedAt: "2022-01-28", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "NTSB finds Pittsburgh bridge collapse was caused by ignored maintenance warnings", source: "NPR", url: "https://www.npr.org/2024/02/15/1231985411/fern-hollow-bridge-collapse-pittsburgh-ntsb-report", publishedAt: "2024-02-15", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_052": [
    { title: "Tanker truck fire causes I-95 overpass to collapse in Philadelphia", source: "AP News", url: "https://apnews.com/article/i-95-overpass-collapse-philadelphia-tanker-truck-fire", publishedAt: "2023-06-11", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "I-95 Philadelphia collapse: Gas tanker fire brought down major highway in minutes", source: "NPR", url: "https://www.npr.org/2023/06/11/1181736498/i95-philadelphia-collapse", publishedAt: "2023-06-12", biasScore: "neutral", biasLabel: "Neutral — NPR" },
    { title: "PennDOT awards emergency contract to replace collapsed I-95 section", source: "Reuters", url: "https://www.reuters.com/world/us/penndot-awards-emergency-contract-replace-collapsed-i-95-section-2023-06-13/", publishedAt: "2023-06-13", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_053": [
    { title: "Baltimore's Francis Scott Key Bridge collapses after ship strike; 6 feared dead", source: "AP News", url: "https://apnews.com/article/baltimore-bridge-collapse-ship-strike-key-bridge", publishedAt: "2024-03-26", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "What caused the Key Bridge collapse? What we know about the Dali ship", source: "NPR", url: "https://www.npr.org/2024/03/26/1240874902/baltimore-key-bridge-collapse-dali-ship", publishedAt: "2024-03-26", biasScore: "neutral", biasLabel: "Neutral — NPR" },
    { title: "NTSB investigation into Francis Scott Key Bridge collapse", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/HWY24MH007.aspx", publishedAt: "2024-04-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
    { title: "DOJ sues owner of ship that struck Key Bridge seeking $100M in cleanup costs", source: "Reuters", url: "https://www.reuters.com/legal/doj-sues-dali-ship-owner-key-bridge-collapse-2024-09-18/", publishedAt: "2024-09-18", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_054": [
    { title: "Colonial Pipeline cyberattack shuts down fuel supply to East Coast", source: "AP News", url: "https://apnews.com/article/colonial-pipeline-cyberattack-ransomware-darkside", publishedAt: "2021-05-08", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Colonial Pipeline paid nearly $5 million in ransom to hackers", source: "Reuters", url: "https://www.reuters.com/technology/colonial-pipeline-ceo-tells-senate-cyber-defenses-were-compromised-2021-06-08/", publishedAt: "2021-06-08", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "DOJ recovers most of Colonial Pipeline ransom payment from DarkSide", source: "NPR", url: "https://www.npr.org/2021/06/07/1004312000/doj-recovers-most-of-ransom-payment-made-after-colonial-pipeline-hack", publishedAt: "2021-06-07", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_055": [
    { title: "Texas winter storm leaves millions without power; death toll rises", source: "AP News", url: "https://apnews.com/article/texas-winter-storm-power-outage-uri", publishedAt: "2021-02-16", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Texas power grid was 4 minutes from total collapse during winter storm", source: "NPR", url: "https://www.npr.org/2021/02/27/972107262/texas-officials-details-how-the-states-power-grid-came-4-minutes-from-collapse", publishedAt: "2021-02-27", biasScore: "neutral", biasLabel: "Neutral — NPR" },
    { title: "Winter Storm Uri killed nearly 250 people in Texas and caused $295B in damage", source: "Reuters", url: "https://www.reuters.com/world/us/texas-winter-storm-uri-death-toll-economic-damage-2021", publishedAt: "2021-05-01", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_056": [
    { title: "Gunfire knocks out power to 40,000 in Moore County North Carolina", source: "AP News", url: "https://apnews.com/article/moore-county-north-carolina-power-outage-gunfire-substations", publishedAt: "2022-12-04", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Moore County substation attack: FBI investigates as domestic terrorism", source: "NPR", url: "https://www.npr.org/2022/12/05/1140895583/moore-county-north-carolina-power-outage-substations-shooting", publishedAt: "2022-12-05", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_057": [
    { title: "Christmas Day substation attacks knock out power to thousands in Washington state", source: "AP News", url: "https://apnews.com/article/puyallup-washington-substation-attack-christmas-power-outage", publishedAt: "2022-12-26", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Two men arrested for Christmas substation attacks in Pierce County Washington", source: "Seattle Times", url: "https://www.seattletimes.com/seattle-news/crime/two-arrested-christmas-substation-attacks-pierce-county/", publishedAt: "2023-01-06", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_058": [
    { title: "Two former Marines arrested for plotting attack on Pacific Northwest power grid", source: "AP News", url: "https://apnews.com/article/marines-neo-nazi-power-grid-attack-plot-pacific-northwest", publishedAt: "2023-03-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_059": [
    { title: "Two arrested in plot to attack Baltimore-area substations", source: "AP News", url: "https://apnews.com/article/baltimore-substation-attack-plot-neo-nazi-arrested", publishedAt: "2023-02-06", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_061": [
    { title: "Monticello Minnesota nuclear plant leaked 400,000 gallons of radioactive water", source: "NBC News", url: "https://www.nbcnews.com/news/us-news/nuclear-power-plant-leaks-400000-gallons-radioactive-water-rcna75406", publishedAt: "2023-03-24", biasScore: "neutral", biasLabel: "Neutral — NBC News" },
    { title: "NRC apologizes, confirms tritium from Minnesota nuclear plant reached Mississippi River", source: "AP News", url: "https://apnews.com/article/monticello-nuclear-plant-tritium-mississippi-river", publishedAt: "2023-06-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_062": [
    { title: "Winter Storm Elliott knocks out power to millions across Southeast and Midwest", source: "AP News", url: "https://apnews.com/article/winter-storm-elliott-power-outages-southeast-midwest", publishedAt: "2022-12-24", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "FERC and NERC report on Winter Storm Elliott power failures", source: "FERC.gov", url: "https://www.ferc.gov/winter-storm-elliott-report", publishedAt: "2023-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_063": [
    { title: "Man arrested for attempting drone bomb attack on Nashville electrical substation", source: "AP News", url: "https://apnews.com/article/nashville-substation-drone-bomb-attack-arrested", publishedAt: "2024-11-05", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

"inc_018": [
    { title: "Fire at CITGO Lemont refinery in Illinois", source: "Chicago Tribune", url: "https://www.chicagotribune.com/news/breaking/ct-citgo-lemont-refinery-fire-20210911-story.html", publishedAt: "2021-09-11", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "CITGO Lemont Illinois refinery fire response", source: "WGN-TV Chicago", url: "https://wgntv.com/news/citgo-lemont-refinery-fire-illinois/", publishedAt: "2021-09-11", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_019": [
    { title: "CenterPoint Energy gas line rupture injures workers in Houston", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/centerpoint-gas-line-rupture-harris-county-2021", publishedAt: "2021-03-05", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Gas line explosion injures 7 CenterPoint workers in Harris County Texas", source: "KHOU 11", url: "https://www.khou.com/article/news/local/centerpoint-gas-line-explosion-harris-county/285-centerpoint-2021", publishedAt: "2021-03-05", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_023": [
    { title: "Denka Performance Elastomer plant fire in LaPlace Louisiana", source: "WWL-TV New Orleans", url: "https://www.wwltv.com/article/news/local/denka-laplace-fire-louisiana/289-denka-fire-2022", publishedAt: "2022-10-21", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "EPA scrutinizes Denka LaPlace plant over cancer risk and chloroprene emissions", source: "AP News", url: "https://apnews.com/article/denka-laplace-louisiana-chloroprene-cancer-epa", publishedAt: "2022-10-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_024": [
    { title: "Magellan Midstream pipeline fire near Seabrook Texas injures workers", source: "KHOU 11", url: "https://www.khou.com/article/news/local/magellan-seabrook-pipeline-fire-texas/285-magellan-seabrook-2022", publishedAt: "2022-03-05", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "PHMSA pipeline incident report Magellan Seabrook Texas 2022", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2022-04-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_026": [
    { title: "Energy Transfer crude oil spill at Cygnet Ohio pump station", source: "Toledo Blade", url: "https://www.toledoblade.com/local/2022/12/23/energy-transfer-crude-oil-spill-cygnet-ohio/", publishedAt: "2022-12-23", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "PHMSA investigates Energy Transfer pipeline failure in Ohio", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2023-02-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_030": [
    { title: "Fire at Valero Memphis refinery contained with no injuries", source: "WMC Action News 5", url: "https://www.wmcactionnews5.com/2023/08/14/fire-valero-memphis-refinery/", publishedAt: "2023-08-14", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_031": [
    { title: "Fire at Pemex Deer Park refinery in Texas injures one worker", source: "KHOU 11", url: "https://www.khou.com/article/news/local/pemex-deer-park-refinery-fire-texas-2023/285-pemex-deer-park-2023", publishedAt: "2023-05-22", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "Deer Park refinery fire: Pemex plant had previous 2019 ITC fire nearby", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/business/energy/article/pemex-deer-park-refinery-fire-2023/", publishedAt: "2023-05-22", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_032": [
    { title: "Columbia Gas pipeline ruptures and burns in Strasburg Virginia", source: "Northern Virginia Daily", url: "https://www.nvdaily.com/nvdaily/columbia-gas-pipeline-strasburg-virginia-2023/", publishedAt: "2023-07-25", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "PHMSA investigates Columbia Gas Transmission pipeline failure Virginia", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2023-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_033": [
    { title: "Explosion and fire at Heritage Crystal Clean solvent facility in Elk Grove Village", source: "Chicago Tribune", url: "https://www.chicagotribune.com/news/breaking/ct-elk-grove-village-solvent-explosion-2023/", publishedAt: "2023-11-02", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Four injured in solvent recycling facility explosion in Elk Grove Village Illinois", source: "WGN-TV Chicago", url: "https://wgntv.com/news/heritage-crystal-clean-elk-grove-village-explosion/", publishedAt: "2023-11-02", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_036": [
    { title: "Chevron El Segundo refinery fire contained with no civilian injuries", source: "KABC-TV Los Angeles", url: "https://abc7.com/chevron-el-segundo-refinery-fire-2024/14516890/", publishedAt: "2024-03-14", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "Fire at Chevron El Segundo crude unit California", source: "Reuters", url: "https://www.reuters.com/business/energy/chevron-el-segundo-refinery-fire-2024-03-14/", publishedAt: "2024-03-14", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_037": [
    { title: "Norfolk Southern derailment in Springfield Ohio involves hazardous materials", source: "Columbus Dispatch", url: "https://www.dispatch.com/story/news/2024/07/20/norfolk-southern-derailment-springfield-ohio-hazardous-materials/", publishedAt: "2024-07-20", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Ohio rail derailment in Springfield prompts evacuation of 1500 residents", source: "AP News", url: "https://apnews.com/article/norfolk-southern-springfield-ohio-derailment-2024", publishedAt: "2024-07-20", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_038": [
    { title: "Vehicle strikes Energy Transfer NGL pipeline causing massive explosion in Deer Park", source: "KHOU 11", url: "https://www.khou.com/article/news/local/energy-transfer-deer-park-pipeline-explosion-vehicle/285-deer-park-ngl-2024", publishedAt: "2024-09-16", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "Pipeline explosion in La Porte area sends flames hundreds of feet high", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/deer-park-pipeline-explosion-2024/", publishedAt: "2024-09-16", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_040": [
    { title: "Pipeline worker killed in gas explosion near Venice Louisiana", source: "WWL-TV New Orleans", url: "https://www.wwltv.com/article/news/local/pipeline-worker-killed-venice-louisiana-2024/289-venice-pipeline-2024", publishedAt: "2024-08-20", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "PHMSA pipeline fatality report Venice Louisiana 2024", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2024-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_041": [
    { title: "Gas pipeline leak causes fatal explosion destroying home in South Jordan Utah", source: "KSL-TV Salt Lake City", url: "https://ksltv.com/686423/gas-explosion-destroys-south-jordan-home-one-killed/", publishedAt: "2024-11-06", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "Enbridge gas main confirmed as source of fatal South Jordan Utah explosion", source: "Salt Lake Tribune", url: "https://www.sltrib.com/news/2024/11/07/enbridge-gas-main-south-jordan-utah-explosion/", publishedAt: "2024-11-07", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_043": [
    { title: "Fire at HF Sinclair Navajo refinery in Artesia New Mexico injures two", source: "Carlsbad Current-Argus", url: "https://www.currentargus.com/story/news/2025/02/11/hf-sinclair-navajo-refinery-fire-artesia-new-mexico/", publishedAt: "2025-02-11", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "HF Sinclair Navajo refinery fire: Part of 2025 pattern of US refinery incidents", source: "Reuters", url: "https://www.reuters.com/business/energy/hf-sinclair-navajo-refinery-fire-artesia-nm-2025-02-11/", publishedAt: "2025-02-11", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_044": [
    { title: "Explosion at Memphis manufacturing plant kills one injures six", source: "WMC Action News 5", url: "https://www.wmcactionnews5.com/2025/01/09/explosion-memphis-manufacturing-plant-fatality/", publishedAt: "2025-01-09", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "Tennessee state fire marshal investigates Memphis plant explosion", source: "AP News", url: "https://apnews.com/article/memphis-manufacturing-plant-explosion-2025", publishedAt: "2025-01-09", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_045": [
    { title: "Anhydrous ammonia tank rupture forces evacuation of 2000 in Creston Iowa", source: "Des Moines Register", url: "https://www.desmoinesregister.com/story/news/2025/04/15/ammonia-fertilizer-plant-explosion-creston-iowa-evacuation/", publishedAt: "2025-04-15", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Creston Iowa fertilizer plant ammonia rupture injures three workers", source: "KCCI Des Moines", url: "https://www.kcci.com/article/creston-iowa-ammonia-fertilizer-plant-explosion-2025/", publishedAt: "2025-04-15", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "EPA RMP incident: Anhydrous ammonia release Creston Iowa", source: "EPA.gov", url: "https://www.epa.gov/rmp/risk-management-plan-rmp-data", publishedAt: "2025-05-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_046": [
    { title: "Keystone Pipeline spills 147,000 gallons of tar sands crude near Fort Ransom North Dakota", source: "AP News", url: "https://apnews.com/article/keystone-pipeline-spill-fort-ransom-north-dakota-2025", publishedAt: "2025-04-08", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "TC Energy confirms another Keystone Pipeline spill in North Dakota", source: "Reuters", url: "https://www.reuters.com/business/energy/keystone-pipeline-spill-north-dakota-2025-04-08/", publishedAt: "2025-04-08", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_047": [
    { title: "Large diameter gas pipeline fails during pig run in Cameron Parish Louisiana", source: "Lake Charles American Press", url: "https://www.americanpress.com/2025/02/03/cameron-parish-pipeline-explosion-pig-run/", publishedAt: "2025-02-03", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "PHMSA pipeline incident Cameron Parish Louisiana February 2025", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2025-03-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_048": [
    { title: "Child killed after fiber optic crew strikes gas main causing home explosion in Lexington Missouri", source: "Kansas City Star", url: "https://www.kansascity.com/news/local/article289-lexington-missouri-gas-explosion-child-killed-2025.html", publishedAt: "2025-04-09", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Lexington Missouri gas explosion: Dig-in accident kills child injures two", source: "AP News", url: "https://apnews.com/article/lexington-missouri-gas-explosion-fiber-optic-child-killed-2025", publishedAt: "2025-04-09", biasScore: "neutral", biasLabel: "Neutral — AP" },
  ],

  "inc_049": [
    { title: "Sunoco jet fuel pipeline found leaking for months in Upper Makefield Pennsylvania", source: "Bucks County Courier Times", url: "https://www.buckscountycouriertimes.com/story/news/2025/01/31/sunoco-jet-fuel-pipeline-leak-upper-makefield-pennsylvania-water-wells/", publishedAt: "2025-01-31", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "Six wells contaminated by Sunoco pipeline leak in Pennsylvania township", source: "AP News", url: "https://apnews.com/article/sunoco-pipeline-leak-upper-makefield-pennsylvania-wells-2025", publishedAt: "2025-02-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "PHMSA investigation Sunoco hazardous liquid pipeline Pennsylvania 2025", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2025-03-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_060": [
    { title: "Engineer sentenced to 10 years for bombing San Jose electrical transformers", source: "AP News", url: "https://apnews.com/article/san-jose-transformer-bombing-engineer-sentenced-2025", publishedAt: "2025-12-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "San Jose engineer convicted of bombing power transformers in 2022 and 2023", source: "San Jose Mercury News", url: "https://www.mercurynews.com/2025/12/01/san-jose-engineer-sentenced-transformer-bombing/", publishedAt: "2025-12-01", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ]
,

  // ── 2010-2018 HISTORICAL FALLBACKS ───────────────────────

  "inc_h001": [
    { title: "Seven killed in explosion at Tesoro refinery in Anacortes Washington", source: "AP News", url: "https://apnews.com/article/tesoro-anacortes-refinery-explosion-washington-2010", publishedAt: "2010-04-02", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Final Report: Tesoro Anacortes Refinery Explosion and Fire", source: "CSB.gov", url: "https://www.csb.gov/tesoro-refining-and-marketing-company-anacortes-refinery-explosion-and-fire/", publishedAt: "2014-05-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
    { title: "New animation details what went wrong in 2010 plant explosion", source: "NPR", url: "https://www.npr.org/sections/thetwo-way/2014/01/30/268930085/new-animation-details-what-went-wrong-in-2010-plant-explosion", publishedAt: "2014-01-30", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_h002": [
    { title: "Gas pipeline explodes in San Bruno California killing 8 destroying homes", source: "AP News", url: "https://apnews.com/article/san-bruno-california-gas-pipeline-explosion-2010", publishedAt: "2010-09-09", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "PG&E convicted of felony charges in San Bruno gas explosion case", source: "Reuters", url: "https://www.reuters.com/article/us-pge-sanbruno-verdict/pge-convicted-of-federal-felony-charges-in-2010-san-bruno-gas-explosion-idUSKCN0YM2KT", publishedAt: "2016-08-09", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "NTSB investigation: San Bruno California natural gas pipeline rupture and fire", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/PAR1101.aspx", publishedAt: "2011-08-30", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h003": [
    { title: "Two killed in natural gas pipeline explosion in Darrouzett Texas", source: "Amarillo Globe-News", url: "https://amarillo.com/story/news/2010/06/08/two-killed-pipeline-explosion-darrouzett-texas/", publishedAt: "2010-06-08", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "PHMSA pipeline incident report DCP Midstream Darrouzett Texas 2010", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2010-07-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h004": [
    { title: "Deepwater Horizon explosion kills 11 in Gulf of Mexico", source: "AP News", url: "https://apnews.com/article/deepwater-horizon-explosion-gulf-mexico-bp-2010", publishedAt: "2010-04-21", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "BP agrees to pay $18.7 billion to settle Deepwater Horizon claims", source: "Reuters", url: "https://www.reuters.com/article/us-bp-settlement/bp-agrees-to-pay-18-7-billion-to-settle-deepwater-horizon-claims-idUSKCN0PG1Z220150702", publishedAt: "2015-07-02", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "NTSB investigation: Deepwater Horizon drilling rig explosion and fire", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/2010_DeepwaterHorizon.aspx", publishedAt: "2011-05-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h005": [
    { title: "CSB investigates explosion at Horsehead zinc refinery in Monaca Pennsylvania", source: "CSB.gov", url: "https://www.csb.gov/horsehead-holding-corporation-zinc-distillation-column-explosion/", publishedAt: "2010-07-15", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
    { title: "Explosion at zinc refinery injures workers in Monaca Pennsylvania", source: "Pittsburgh Post-Gazette", url: "https://www.post-gazette.com/news/state/2010/07/01/horsehead-zinc-refinery-explosion-monaca/", publishedAt: "2010-07-01", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_h006": [
    { title: "ExxonMobil pipeline spills crude oil into Yellowstone River in Montana", source: "AP News", url: "https://apnews.com/article/exxonmobil-yellowstone-river-oil-spill-montana-2011", publishedAt: "2011-07-02", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "ExxonMobil to pay $12 million to settle Yellowstone River spill claims", source: "Reuters", url: "https://www.reuters.com/article/us-exxon-yellowstone-settlement/exxonmobil-to-pay-12-million-over-yellowstone-river-oil-spill-idUSBRE9B813V20131129", publishedAt: "2013-11-29", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h007": [
    { title: "Two killed 167 injured in Williams Olefins chemical plant explosion in Geismar Louisiana", source: "AP News", url: "https://apnews.com/article/williams-olefins-geismar-louisiana-explosion-2013", publishedAt: "2013-06-13", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Final Report: Williams Olefins Plant Explosion Geismar Louisiana", source: "CSB.gov", url: "https://www.csb.gov/williams-olefins-plant-explosion-and-fire/", publishedAt: "2016-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h008": [
    { title: "Enbridge pipeline spills 840,000 gallons of oil into Kalamazoo River in Michigan", source: "AP News", url: "https://apnews.com/article/enbridge-kalamazoo-river-oil-spill-michigan-2010", publishedAt: "2010-07-27", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Enbridge Kalamazoo River oil spill cleanup tops 1 billion dollars", source: "Reuters", url: "https://www.reuters.com/article/us-enbridge-kalamazoo-cleanup/enbridge-kalamazoo-cleanup-costs-top-1-billion-idUSBRE9B306020131204", publishedAt: "2013-12-04", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "NTSB investigation: Enbridge hazardous liquid pipeline rupture Marshall Michigan", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/PAR1201.aspx", publishedAt: "2012-07-10", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h009": [
    { title: "Chevron Richmond refinery fire sends 15000 to hospitals in California", source: "AP News", url: "https://apnews.com/article/chevron-richmond-refinery-fire-california-2012", publishedAt: "2012-08-07", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Final Report: Chevron Richmond Refinery Pipe Rupture and Fire", source: "CSB.gov", url: "https://www.csb.gov/chevron-refinery-fire/", publishedAt: "2015-01-28", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h010": [
    { title: "Explosion at West Texas fertilizer plant kills 15 injures 160", source: "AP News", url: "https://apnews.com/article/west-texas-fertilizer-plant-explosion-2013", publishedAt: "2013-04-18", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "ATF rules West Texas fertilizer explosion was intentionally set", source: "Reuters", url: "https://www.reuters.com/article/us-usa-explosion-texas-atf/atf-says-texas-fertilizer-plant-blast-was-criminal-act-idUSBRE9B30MQ20131204", publishedAt: "2016-05-11", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "CSB Investigation: West Fertilizer Company Fire and Explosion", source: "CSB.gov", url: "https://www.csb.gov/west-fertilizer-company-fire-and-explosion/", publishedAt: "2016-01-28", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h011": [
    { title: "CSB investigates dust explosion at CECO Architectural Products in Maryland", source: "CSB.gov", url: "https://www.csb.gov/ceco-architectural-products-combustible-dust-explosion/", publishedAt: "2012-06-15", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h012": [
    { title: "Runaway train derails kills 47 in Lac-Megantic Quebec", source: "AP News", url: "https://apnews.com/article/lac-megantic-train-derailment-quebec-2013", publishedAt: "2013-07-07", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "NTSB and TSB investigation into Lac-Megantic crude oil train disaster", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/2013_LacMegantic_HZB13MH004.aspx", publishedAt: "2014-01-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h013": [
    { title: "ExxonMobil Pegasus pipeline spills tar sands crude in Arkansas neighborhood", source: "AP News", url: "https://apnews.com/article/exxonmobil-pegasus-pipeline-mayflower-arkansas-spill-2013", publishedAt: "2013-03-30", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "EPA fines ExxonMobil over Mayflower Arkansas pipeline spill", source: "Reuters", url: "https://www.reuters.com/article/exxon-arkansas-spill/exxon-agrees-to-pay-1-million-in-arkansas-crude-spill-case-idUSL2N0LV23520140225", publishedAt: "2014-02-25", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h014": [
    { title: "Chemical spill in Charleston West Virginia leaves 300000 without drinking water", source: "AP News", url: "https://apnews.com/article/freedom-industries-charleston-west-virginia-chemical-spill-2014", publishedAt: "2014-01-10", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Freedom Industries files for bankruptcy after West Virginia chemical spill", source: "Reuters", url: "https://www.reuters.com/article/us-usa-westvirginia-spill-bankruptcy/freedom-industries-files-for-bankruptcy-after-west-virginia-spill-idUSBREA0D1SB20140114", publishedAt: "2014-01-14", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "NPR: A year after the West Virginia chemical spill what happened", source: "NPR", url: "https://www.npr.org/2015/01/09/375562420/a-year-after-the-west-virginia-chemical-spill-what-happened", publishedAt: "2015-01-09", biasScore: "neutral", biasLabel: "Neutral — NPR" },
  ],

  "inc_h015": [
    { title: "Gas explosion kills 8 destroys two buildings in East Harlem New York", source: "AP News", url: "https://apnews.com/article/east-harlem-gas-explosion-new-york-2014", publishedAt: "2014-03-12", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Con Edison sued over East Harlem gas explosion that killed 8", source: "Reuters", url: "https://www.reuters.com/article/us-new-york-explosion-lawsuit/con-ed-sued-over-east-harlem-gas-explosion-idUSBREA2B09D20140312", publishedAt: "2014-03-13", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h016": [
    { title: "Four killed in DuPont La Porte methyl mercaptan chemical release in Texas", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/dupont-la-porte-methyl-mercaptan-release-four-dead-2014/", publishedAt: "2014-11-15", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "CSB Final Report: DuPont La Porte Toxic Chemical Releases", source: "CSB.gov", url: "https://www.csb.gov/dupont-la-porte-facility-toxic-chemical-releases/", publishedAt: "2018-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h017": [
    { title: "ExxonMobil Torrance refinery explosion raises concerns about hydrofluoric acid risk", source: "AP News", url: "https://apnews.com/article/exxonmobil-torrance-refinery-explosion-california-2015", publishedAt: "2015-02-19", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Investigation Report: ExxonMobil Torrance Refinery Electrostatic Precipitator Explosion", source: "CSB.gov", url: "https://www.csb.gov/exxonmobil-torrance-refinery-electrostatic-precipitator-explosion/", publishedAt: "2017-05-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h018": [
    { title: "Plains All American pipeline spills crude oil near Santa Barbara California coastline", source: "AP News", url: "https://apnews.com/article/plains-all-american-pipeline-santa-barbara-oil-spill-2015", publishedAt: "2015-05-20", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Plains All American convicted of criminal charges in Santa Barbara oil spill", source: "Reuters", url: "https://www.reuters.com/article/us-plains-allamerican-pipeline-spill-verdict/plains-all-american-convicted-in-2015-california-oil-spill-idUSKBN1AK2G0", publishedAt: "2017-09-01", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h019": [
    { title: "Propane storage facility fire causes shelter in place in suburban Houston", source: "KHOU 11", url: "https://www.khou.com/article/news/local/propane-storage-bleve-houston-texas-2015/285-propane-houston-2015", publishedAt: "2015-11-05", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_h020": [
    { title: "Colonial Pipeline spills 350000 gallons of gasoline in Alabama causing East Coast fuel shortage", source: "AP News", url: "https://apnews.com/article/colonial-pipeline-alabama-gasoline-spill-shortage-2016", publishedAt: "2016-09-13", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Colonial Pipeline outage causes gas shortages and price spike across Southeast", source: "Reuters", url: "https://www.reuters.com/article/us-colonial-pipeline-spill/colonial-pipeline-says-it-has-fixed-alabama-spill-site-idUSKCN11Q1QF", publishedAt: "2016-10-07", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h021": [
    { title: "KMCO chemical facility Crosby Texas flooding chemical fire 2016", source: "KHOU 11", url: "https://www.khou.com/article/news/local/kmco-crosby-texas-flooding-chemical-fire-2016/285-kmco-2016", publishedAt: "2016-09-12", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_h022": [
    { title: "Oversize truck strikes Sacramento overpass causing closure and repairs", source: "Sacramento Bee", url: "https://www.sacbee.com/news/local/article-oversize-truck-elverta-bridge-strike-2016.html", publishedAt: "2016-04-14", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_h023": [
    { title: "Chemical plant explosions at Arkema Crosby Texas after Harvey flooding", source: "AP News", url: "https://apnews.com/article/arkema-crosby-texas-hurricane-harvey-chemical-explosions-2017", publishedAt: "2017-08-31", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB Investigation: Arkema Crosby Texas plant flooding and explosion", source: "CSB.gov", url: "https://www.csb.gov/arkema-inc-chemical-plant-fire/", publishedAt: "2018-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
    { title: "21 officers hospitalized after entering Arkema contamination zone in Texas", source: "Reuters", url: "https://www.reuters.com/article/us-usa-storm-texas-chemical/21-officers-sickened-at-arkema-plant-as-harvey-related-fires-continue-idUSKCN1BC1YD", publishedAt: "2017-09-01", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
  ],

  "inc_h024": [
    { title: "Gas explosions and fires destroy dozens of homes in Massachusetts communities", source: "AP News", url: "https://apnews.com/article/merrimack-valley-columbia-gas-explosions-massachusetts-2018", publishedAt: "2018-09-13", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Columbia Gas convicted one person killed in Merrimack Valley gas explosions", source: "Reuters", url: "https://www.reuters.com/article/us-niSource-massachusetts-plea/columbia-gas-to-plead-guilty-pay-143-million-in-massachusetts-gas-explosions-idUSKBN26N2PV", publishedAt: "2020-11-09", biasScore: "neutral", biasLabel: "Neutral — Reuters" },
    { title: "NTSB Final Report: Merrimack Valley Natural Gas Explosions Columbia Gas Massachusetts", source: "NTSB.gov", url: "https://www.ntsb.gov/investigations/Pages/2018-columbia-gas-massachusetts.aspx", publishedAt: "2019-10-24", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h025": [
    { title: "Pennsylvania fines Sunoco Energy Transfer Mariner East 2 pipeline 12 million dollars", source: "AP News", url: "https://apnews.com/article/sunoco-mariner-east-pipeline-pennsylvania-fine-2018", publishedAt: "2018-03-01", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "Sunoco Mariner East pipeline construction causes sinkholes groundwater contamination Pennsylvania", source: "Philadelphia Inquirer", url: "https://www.inquirer.com/philly/news/sunoco-mariner-east-pipeline-sinkholes-pennsylvania-2017.html", publishedAt: "2017-04-01", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_h026": [
    { title: "Explosion at Houston area chemical facility injures workers", source: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/houston-texas/houston/article/fmc-technologies-explosion-houston-2017/", publishedAt: "2017-07-27", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_h027": [
    { title: "Fire at Shell Deer Park chemical complex in Texas", source: "KHOU 11", url: "https://www.khou.com/article/news/local/shell-deer-park-fire-2018/285-shell-deer-park-2018", publishedAt: "2018-07-31", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
  ],

  "inc_h028": [
    { title: "PHMSA issues corrective action order to Colonial Pipeline after repeat Alabama failures", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/news/phmsa-takes-enforcement-action-colonial-pipeline", publishedAt: "2018-12-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h029": [
    { title: "Four killed in explosion at AB Specialty Silicones in Waukegan Illinois", source: "AP News", url: "https://apnews.com/article/ab-specialty-silicones-waukegan-illinois-explosion-2019", publishedAt: "2019-05-03", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "CSB investigates fatal explosion at AB Specialty Silicones Waukegan", source: "CSB.gov", url: "https://www.csb.gov/ab-specialty-silicones-explosion-and-fire/", publishedAt: "2019-05-06", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  "inc_h030": [
    { title: "Pipeline explosion kills one worker near Chester West Virginia", source: "WTRF Wheeling", url: "https://www.wtrf.com/news/pipeline-explosion-chester-west-virginia-2018/", publishedAt: "2018-08-01", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "PHMSA pipeline fatality investigation Chester West Virginia 2018", source: "PHMSA.dot.gov", url: "https://www.phmsa.dot.gov/data-and-statistics/pipeline/pipeline-incident-flagged-files", publishedAt: "2018-09-01", biasScore: "neutral", biasLabel: "Neutral — Federal Agency" },
  ],

  // ── 2026 FALLBACKS ────────────────────────────────────────

  "inc_2026_001": [
    { title: "Pipeline explosion leaves hundreds without natural gas in northern Minnesota", source: "CBS Minnesota", url: "https://www.cbsnews.com/minnesota/news/damaged-pipeline-explosion-rural-pine-county-jan-17-2026/", publishedAt: "2026-01-17", biasScore: "neutral", biasLabel: "Neutral — CBS Local" },
    { title: "PHMSA issues corrective action order after Minnesota pipeline explosion", source: "Fox21 Online", url: "https://www.fox21online.com/2026/01/29/pipe-fractured-in-pine-county-explosion-was-susceptible-to-integrity-issues/", publishedAt: "2026-01-29", biasScore: "neutral", biasLabel: "Neutral — Local TV Affiliate" },
    { title: "67-year-old pipe failure left 650 families without heat in Minnesota winter", source: "Duluth News Tribune", url: "https://www.duluthnewstribune.com/news/local/no-injuries-in-natural-gas-pipeline-explosion-near-willow-river", publishedAt: "2026-01-19", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_2026_002": [
    { title: "Massive explosion and fire at Chevron El Segundo refinery rocks South Bay", source: "LA Times", url: "https://www.latimes.com/california/story/2026-02-19/chevron-el-segundo-refinery-explosion-fire", publishedAt: "2026-02-19", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "What caused the Chevron El Segundo explosion refinery experts have theories", source: "LA Times", url: "https://www.aol.com/news/caused-massive-el-segundo-explosion-100000206.html", publishedAt: "2026-02-22", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "11 fires in 60 days: the 2026 US refinery crisis explained", source: "Chemical Processing", url: "https://www.chemicalprocessing.com/safety-security/fire-explosion-protection/podcast/55376737/11-fires-60-days-whats-really-behind-the-2026-refinery-crisis", publishedAt: "2026-04-01", biasScore: "neutral", biasLabel: "Neutral — Trade Publication" },
  ],

  "inc_2026_003": [
    { title: "11 fires in 60 days: the 2026 US refinery crisis explained", source: "Chemical Processing", url: "https://www.chemicalprocessing.com/safety-security/fire-explosion-protection/podcast/55376737/11-fires-60-days-whats-really-behind-the-2026-refinery-crisis", publishedAt: "2026-04-01", biasScore: "neutral", biasLabel: "Neutral — Trade Publication" },
  ],

  "inc_2026_004": [
    { title: "Two dead dozens injured in West Virginia chemical plant explosion", source: "AP News", url: "https://apnews.com/article/institute-west-virginia-chemical-plant-explosion-2026", publishedAt: "2026-04-22", biasScore: "neutral", biasLabel: "Neutral — AP" },
    { title: "WV and federal agencies investigate deadly Institute chemical leak", source: "West Virginia Watch", url: "https://westvirginiawatch.com/2026/04/23/wv-federal-agencies-will-investigate-deadly-institute-chemical-leak-officials-say/", publishedAt: "2026-04-23", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
    { title: "CSB opens investigation into Institute West Virginia chemical disaster", source: "WV Public Broadcasting", url: "https://wvpublic.org/story/energy-environment/shelter-in-place-order-in-effect-following-chemical-leak-in-institute/", publishedAt: "2026-04-22", biasScore: "neutral", biasLabel: "Neutral — NPR Affiliate" },
    { title: "Violent chemical reaction: 2 dead 1 critical after Institute chemical spill", source: "WV Gazette-Mail", url: "https://www.wvgazettemail.com/news/kanawha_valley/violent-chemical-reaction-2-dead-1-in-critical-condition-after-institute-chemical-spill/article_71319fcd-9709-4caf-92c4-72c2d0e8541b.html", publishedAt: "2026-04-22", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

  "inc_2026_005": [
    { title: "Explosion and fire rock Chalmette refinery no injuries reported", source: "NOLA.com Times-Picayune", url: "https://www.nola.com/news/chalmette-refinery-fire-explosion/article_a076d78f-3e99-40bf-b551-5ce71092e419.html", publishedAt: "2026-05-08", biasScore: "neutral", biasLabel: "Neutral — Local Newspaper" },
  ],

};
