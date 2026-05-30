# 🦅 Failure Watch
**Idaho Fidelity Foundation**  
Live tracker: `https://idahofidelity.github.io/failure-watch`

---

## What This Is
Tracking US industrial failures, infrastructure decay, and inspection violations since 2010 — chemical plants, oil refineries, pipelines, rail tankers, petrochemical storage, and water treatment facilities. Incidents are color-coded by **cause** (accidental, intentional, under investigation, natural, unknown) and shaped by **facility type**. Each incident links to top neutral news articles scored by AI for factual bias.

Cross-referenced against:
- **CSB** (Chemical Safety Board — federal, neutral)
- **EPA RMP** (Risk Management Plan filings — federal, neutral)
- **SpillTracker.org** (Bloomberg-funded activist tracker — noted for framing bias)
- **Coalition to Prevent Chemical Disasters** (environmental NGO)

---

## Setup (One Time)

### 1. Clone the repo
```bash
git clone https://github.com/idahofidelity/failure-watch.git
cd failure-watch
```

### 2. Add your API keys
Open `config.js` and replace the placeholder values:
```javascript
GNEWS_API_KEY: "your_gnews_key_here",
ANTHROPIC_API_KEY: "your_anthropic_key_here",
```

Get keys at:
- **GNews:** https://gnews.io → Sign up → Dashboard → API Key (free, 100 req/day)
- **Anthropic:** https://console.anthropic.com → API Keys → Create Key

### 3. Deploy to GitHub Pages
1. Push to the `idahofidelity` GitHub org as repo named `failure-watch`
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Live at: `https://idahofidelity.github.io/failure-watch`

---

## Adding New Incidents
Edit `data/incidents.js`. Copy an existing entry and update all fields:

```javascript
{
  id: "inc_031",               // unique, sequential
  name: "Full Incident Name",
  date: "2025-06-01",          // YYYY-MM-DD
  lat: 29.76,                  // decimal coordinates
  lng: -95.36,
  city: "Houston",
  state: "TX",
  facility_type: "oil_refinery", // see options below
  cause: "accidental",           // see options below
  cause_detail: "Detailed cause description",
  severity: "major",             // catastrophic | major | moderate
  injuries: 0,
  fatalities: 0,
  evacuations: 0,
  description: "Full narrative description.",
  csb_investigated: false,
  spilltracker_listed: false,
  coalition_listed: false,
  epa_rmp: false,
},
```

**facility_type options:** `oil_refinery` | `chemical_plant` | `pipeline` | `rail_tanker` | `petrochemical_storage` | `water_treatment`

**cause options:** `accidental` | `intentional` | `under_investigation` | `natural_cause` | `unknown`

---

## API Usage Notes
- **GNews** free tier = 100 requests/day. Articles are cached per session so each incident only queries once.
- **Anthropic** API is called once per incident to score article neutrality. Cached in session memory.
- Both keys are client-side in `config.js`. For a public production site, consider a lightweight proxy to protect keys.

---

## Data Sources
| Source | Type | Notes |
|--------|------|-------|
| CSB (csb.gov) | Federal agency | Most authoritative cause determinations |
| EPA RMP (epa.gov/rmp) | Federal agency | Required filings for high-risk facilities |
| NTSB / PHMSA | Federal agency | Rail and pipeline incidents |
| SpillTracker.org | NGO (Bloomberg) | Cross-ref only — activist framing noted |
| Coalition to Prevent Chemical Disasters | NGO | Cross-ref only — environmental advocacy |
| Wikipedia / Public record | Supplemental | Major incidents with public documentation |

---

## Organization
```
failure-watch/
├── index.html          # Main app
├── config.js           # API keys (DO NOT COMMIT LIVE KEYS)
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # All application logic
├── data/
│   └── incidents.js    # Static seed dataset
└── README.md
```

---

*Idaho Fidelity Foundation · idahofidelity.org*
