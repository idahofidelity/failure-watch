# Failure Watch — X Bot Setup

Two automated posting workflows for the [@FailureWatch](https://x.com) account.

---

## What It Does

| Workflow | Schedule | Source | Post Type |
|---|---|---|---|
| `post_incidents_to_x.yml` | Every 15 min | `data/scraped_incidents.js` | Breaking incident |
| `post_daily_warning_to_x.yml` | 8 AM + 6 PM MT | `data/at_risk_facilities.js`, `data/scraped_incidents.js`, `js/app.js` | At-risk facility warning |

---

## GitHub Secrets Required

**Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|---|---|
| `X_API_KEY` | developer.twitter.com → Your app → Keys and Tokens |
| `X_API_SECRET` | Same page |
| `X_ACCESS_TOKEN` | Same page → Access Token and Secret |
| `X_ACCESS_TOKEN_SECRET` | Same page |
| `TRACKER_URL` | `https://idahofidelity.github.io/failure-watch` |

> ⚠️ **Critical:** X developer app must be set to **Read and Write** permissions  
> before generating the Access Token. If you set it after, regenerate the token.

---

## Files to Add to Repo

```
.github/workflows/
    post_incidents_to_x.yml
    post_daily_warning_to_x.yml
scripts/
    post_incidents_to_x.py
    post_daily_warning_to_x.py
data/
    posted_incident_ids.txt     ← commit empty, bot appends to it
    posted_warning_ids.txt      ← commit empty, bot appends to it
```

---

## Tweet Formats

**Incident (breaking):**
```
🔥 REFINERY — Corpus Christi, TX
Valero Corpus Christi
Explosion. 3 injured.
7 failed inspections on record.
https://idahofidelity.github.io/failure-watch
```

**Warning (daily):**
```
⚠️ AT RISK — Memphis, TN
I-40 Hernando de Soto Bridge
Critical crack. Repair deferred twice.
4 failed inspections on record. Rated structurally deficient.
https://idahofidelity.github.io/failure-watch
```

---

## Deduplication Logic

- **Incidents:** Each incident ID logged to `posted_incident_ids.txt`. Never re-posted.
- **Warnings:** Each facility ID logged to `posted_warning_ids.txt` with date. 30-day cooldown before re-posting same facility.
- **Age filter:** Incidents older than 7 days ignored on first run (prevents blast when bot launches).

---

## Warning Post Priority

Bot picks from top 5 highest-scoring facilities each run (randomized within top 5 for variety).

Scoring:
- +10 per failed inspection
- +5 per open violation
- +20 for corrective action order
- +25 for structurally deficient rating
- +30/50 for major/catastrophic severity

---

## Data Sources the Warning Bot Reads

1. `data/at_risk_facilities.js` — live scraped at-risk facilities
2. `data/scraped_incidents.js` — live scraped recent incidents  
3. `js/app.js` — static hardcoded historical incidents (reads `INCIDENTS` array)

Any facility in any of these sources with `failed_inspections > 0` or open violations is eligible.
