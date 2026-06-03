"""
post_daily_warning_to_x.py
Twice daily: picks a high-risk facility from tracker data and posts a warning tweet.

Priority order:
  1. at_risk_facilities.js — aging_critical or any named facility with risk data
  2. scraped_incidents.js  — facilities with failed_inspections > 0
  3. data/incidents.js     — SEED_INCIDENTS static data (named facilities only)
"""

import os
import re
import json
import random
import tweepy
from datetime import datetime, timezone

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AT_RISK_JS      = os.path.join(BASE_DIR, "data", "at_risk_facilities.js")
SCRAPED_JS      = os.path.join(BASE_DIR, "data", "scraped_incidents.js")
SEED_JS         = os.path.join(BASE_DIR, "data", "incidents.js")
POSTED_WARN_LOG = os.path.join(BASE_DIR, "data", "posted_warning_ids.txt")

TRACKER_URL = os.environ.get("TRACKER_URL", "https://idahofidelity.github.io/failure-watch")
REPOST_COOLDOWN_DAYS = 30

# ── Emoji / label maps ───────────────────────────────────────────────────────
TYPE_EMOJI = {
    "chemical_plant":        "🏭",
    "oil_refinery":          "🔥",
    "refinery":              "🔥",
    "pipeline":              "🔧",
    "bridge":                "🌉",
    "power_plant":           "⚡",
    "power_grid":            "⚡",
    "nuclear":               "☢️",
    "dam":                   "🌊",
    "water_treatment":       "💧",
    "water":                 "💧",
    "rail":                  "🚂",
    "rail_tanker":           "🚂",
    "mine":                  "⛏️",
    "petrochemical_storage": "🛢️",
    "warehouse":             "📦",
    "port":                  "⚓",
    "default":               "⚠️",
}

TYPE_LABEL = {
    "chemical_plant":        "CHEMICAL PLANT",
    "oil_refinery":          "REFINERY",
    "refinery":              "REFINERY",
    "pipeline":              "PIPELINE",
    "bridge":                "BRIDGE",
    "power_plant":           "POWER PLANT",
    "power_grid":            "POWER PLANT",
    "nuclear":               "NUCLEAR FACILITY",
    "dam":                   "DAM",
    "water_treatment":       "WATER SYSTEM",
    "water":                 "WATER SYSTEM",
    "rail":                  "RAIL",
    "rail_tanker":           "RAIL TANKER",
    "mine":                  "MINE",
    "petrochemical_storage": "PETROCHEM STORAGE",
    "warehouse":             "WAREHOUSE",
    "port":                  "PORT",
    "default":               "FACILITY",
}

WARNING_TEMPLATES = [
    "{emoji} AT RISK — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} AGING INFRASTRUCTURE — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} INSPECTION CONCERN — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} UNRESOLVED RISK — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
]


def load_js_array(filepath, var_name=None):
    """Parse a JS file exporting an array. Tries var_name first, then any array."""
    if not os.path.exists(filepath):
        print(f"  File not found: {filepath}")
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()

    # Try specific variable name first
    if var_name:
        pattern = rf"(?:const|let|var)\s+{re.escape(var_name)}\s*=\s*(\[.*?\]);"
        match = re.search(pattern, raw, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(1))
            except json.JSONDecodeError:
                pass

    # Fallback: strip JS wrapper and parse
    cleaned = re.sub(r"^\s*(?:const|let|var)\s+\w+\s*=\s*", "", raw, flags=re.MULTILINE)
    cleaned = re.sub(r";\s*$", "", cleaned.strip())
    try:
        result = json.loads(cleaned)
        return result if isinstance(result, list) else []
    except (json.JSONDecodeError, ValueError):
        pass

    # Last resort: find any array
    match = re.search(r"\[.*\]", raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except json.JSONDecodeError:
            pass
    return []


def load_posted_warning_ids():
    if not os.path.exists(POSTED_WARN_LOG):
        return {}
    result = {}
    with open(POSTED_WARN_LOG, "r") as f:
        for line in f:
            line = line.strip()
            if "|" in line:
                wid, ts = line.split("|", 1)
                result[wid.strip()] = ts.strip()
            elif line:
                result[line] = "1970-01-01"
    return result


def save_posted_warning_id(wid):
    with open(POSTED_WARN_LOG, "a") as f:
        f.write(f"{wid}|{datetime.now(timezone.utc).date().isoformat()}\n")


def is_on_cooldown(wid, posted_map):
    if wid not in posted_map:
        return False
    try:
        last = datetime.fromisoformat(posted_map[wid])
        if last.tzinfo is None:
            last = last.replace(tzinfo=timezone.utc)
        return (datetime.now(timezone.utc) - last).days < REPOST_COOLDOWN_DAYS
    except ValueError:
        return False


def score_risk(f):
    score = 0
    score += int(f.get("failed_inspections", 0) or 0) * 10
    score += int(f.get("violations", 0) or 0) * 5
    age = int(f.get("age_years", 0) or 0)
    if age >= 60:
        score += 40
    elif age >= 50:
        score += 25
    elif age >= 40:
        score += 10
    if f.get("risk_status") == "aging_critical":
        score += 20
    if f.get("corrective_action_order"):
        score += 20
    if f.get("structurally_deficient"):
        score += 25
    sev = str(f.get("severity", "")).lower()
    if sev == "catastrophic":
        score += 50
    elif sev == "major":
        score += 30
    elif sev == "moderate":
        score += 10
    return score


def build_inspection_line(f):
    parts = []
    fi = int(f.get("failed_inspections", 0) or 0)
    viol = int(f.get("violations", 0) or 0)
    age = int(f.get("age_years", 0) or 0)
    if fi:
        parts.append(f"{fi} failed inspection{'s' if fi != 1 else ''} on record.")
    if viol:
        parts.append(f"{viol} open violation{'s' if viol != 1 else ''}.")
    if f.get("corrective_action_order"):
        parts.append("Corrective action order issued.")
    if f.get("structurally_deficient"):
        parts.append("Rated structurally deficient.")
    if age >= 40 and not parts:
        parts.append(f"{age} years in service.")
    if f.get("repairs_planned"):
        parts.append("Repairs planned but not completed.")
    return " ".join(parts) if parts else "Risk flagged by federal database."


def build_candidates(at_risk_list, scraped_list, seed_list):
    candidates = []
    seen_ids = set()

    # Source 1: at_risk_facilities.js — skip Unknown names
    for f in at_risk_list:
        name = f.get("name", "")
        if not name or name.strip().lower() in ("unknown", ""):
            continue
        fid = f"atrisk_{f.get('id', name)}"
        if fid in seen_ids:
            continue
        seen_ids.add(fid)
        risk_detail = f.get("risk_reason", f.get("risk_summary", f.get("violation_summary", "")))
        if not risk_detail:
            continue
        candidates.append({
            "id":            fid,
            "name":          name,
            "facility_type": f.get("facility_type", "default"),
            "city":          f.get("city", ""),
            "state":         f.get("state", ""),
            "failed_inspections": int(f.get("failed_inspections", 0) or 0),
            "violations":    int(f.get("violations", 0) or 0),
            "age_years":     int(f.get("age_years", 0) or 0),
            "risk_detail":   risk_detail,
            "repairs_planned":         f.get("repairs_planned", False),
            "corrective_action_order": f.get("corrective_action_order", False),
            "structurally_deficient":  f.get("structurally_deficient", False),
            "risk_status":   f.get("risk_status", ""),
            "score":         score_risk(f),
            "source":        "at_risk",
        })

    # Source 2: scraped_incidents.js — only those with failed_inspections
    for inc in scraped_list:
        name = inc.get("name", inc.get("facility_name", ""))
        if not name or name.strip().lower() in ("unknown", ""):
            continue
        fi = int(inc.get("failed_inspections", inc.get("inspection_failures", 0)) or 0)
        if fi == 0:
            continue
        iid = f"scraped_{inc.get('id', name)}"
        if iid in seen_ids:
            continue
        seen_ids.add(iid)
        candidates.append({
            "id":            iid,
            "name":          name,
            "facility_type": inc.get("facility_type", "default"),
            "city":          inc.get("city", ""),
            "state":         inc.get("state", ""),
            "failed_inspections": fi,
            "violations":    0,
            "age_years":     0,
            "risk_detail":   inc.get("cause_detail", inc.get("incident_type", "Prior incident with unresolved inspection findings.")),
            "repairs_planned":         False,
            "corrective_action_order": False,
            "structurally_deficient":  False,
            "risk_status":   "",
            "score":         score_risk(inc),
            "source":        "scraped",
        })

    # Source 3: SEED_INCIDENTS static data
    for inc in seed_list:
        name = inc.get("name", inc.get("facility_name", ""))
        if not name or name.strip().lower() in ("unknown", ""):
            continue
        fi = int(inc.get("failed_inspections", inc.get("inspection_failures", 0)) or 0)
        sev = str(inc.get("severity", "")).lower()
        # Include if has inspection failures OR is major/catastrophic
        if fi == 0 and sev not in ("major", "catastrophic"):
            continue
        iid = f"seed_{inc.get('id', name)}"
        if iid in seen_ids:
            continue
        seen_ids.add(iid)
        candidates.append({
            "id":            iid,
            "name":          name,
            "facility_type": inc.get("facility_type", "default"),
            "city":          inc.get("city", ""),
            "state":         inc.get("state", ""),
            "failed_inspections": fi,
            "violations":    0,
            "age_years":     0,
            "risk_detail":   inc.get("cause_detail", inc.get("description", f"{sev.title()} incident on record.")),
            "repairs_planned":         False,
            "corrective_action_order": False,
            "structurally_deficient":  sev == "major",
            "risk_status":   "",
            "score":         score_risk(inc),
            "source":        "seed",
        })

    return candidates


def format_warning_tweet(facility):
    ftype    = facility["facility_type"].lower().replace(" ", "_")
    emoji    = TYPE_EMOJI.get(ftype, TYPE_EMOJI["default"])
    label    = TYPE_LABEL.get(ftype, TYPE_LABEL["default"])
    city     = facility["city"]
    state    = facility["state"]
    location = f"{city}, {state}".strip(", ")
    name     = facility["name"]

    risk_detail     = facility["risk_detail"]
    inspection_line = build_inspection_line(facility)

    # Truncate risk detail if needed
    if len(risk_detail) > 85:
        risk_detail = risk_detail[:82].rsplit(" ", 1)[0] + "..."

    template = random.choice(WARNING_TEMPLATES)
    tweet = template.format(
        emoji=emoji, label=label, location=location, name=name,
        risk_detail=risk_detail, inspection_line=inspection_line, url=TRACKER_URL,
    )

    # Hard cap 280 chars
    while len(tweet) > 280 and len(risk_detail) > 20:
        risk_detail = risk_detail[:-4] + "..."
        tweet = template.format(
            emoji=emoji, label=label, location=location, name=name,
            risk_detail=risk_detail, inspection_line=inspection_line, url=TRACKER_URL,
        )

    return tweet


def post_tweet(client, text):
    try:
        client.create_tweet(text=text)
        return True
    except tweepy.TweepyException as e:
        print(f"  ✗ Tweet failed: {e}")
        return False


def main():
    API_KEY             = os.environ["X_API_KEY"]
    API_SECRET          = os.environ["X_API_SECRET"]
    ACCESS_TOKEN        = os.environ["X_ACCESS_TOKEN"]
    ACCESS_TOKEN_SECRET = os.environ["X_ACCESS_TOKEN_SECRET"]

    at_risk_list = load_js_array(AT_RISK_JS, "AT_RISK_FACILITIES")
    scraped_list = load_js_array(SCRAPED_JS, "SCRAPED_INCIDENTS")
    seed_list    = load_js_array(SEED_JS,    "SEED_INCIDENTS")

    print(f"Sources: {len(at_risk_list)} at-risk, {len(scraped_list)} scraped, {len(seed_list)} seed")

    candidates = build_candidates(at_risk_list, scraped_list, seed_list)
    print(f"Eligible candidates: {len(candidates)}")

    if not candidates:
        print("No eligible candidates found.")
        return

    posted_map = load_posted_warning_ids()
    available  = [c for c in candidates if not is_on_cooldown(c["id"], posted_map)]

    if not available:
        print("All on cooldown — resetting.")
        available = candidates

    available.sort(key=lambda x: x["score"], reverse=True)
    pool   = available[:5]
    chosen = random.choice(pool)

    tweet = format_warning_tweet(chosen)
    print(f"\n--- Warning tweet preview ---\n{tweet}\n-----------------------------")
    print(f"Source: {chosen['source']} | Score: {chosen['score']} | Name: {chosen['name']}")

    client = tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
    )

    if post_tweet(client, tweet):
        save_posted_warning_id(chosen["id"])
        print(f"  ✓ Posted: {chosen['name']}")
    else:
        print("  ✗ Failed.")


if __name__ == "__main__":
    main()
