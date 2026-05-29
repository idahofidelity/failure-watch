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
};
