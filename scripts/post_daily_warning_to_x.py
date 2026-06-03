"""
post_daily_warning_to_x.py
Twice daily: picks a high-risk facility or structurally deficient asset
from the tracker's static data and posts a warning tweet.

Priority order:
  1. Scraped at_risk_facilities.js entries (inspection violations, corrective orders)
  2. Static incidents with failed_inspections > 0 that were NOT catastrophic
     (i.e., the facility is still standing / still at risk)
  3. Static incidents where severity == "major" with known inspection failures
"""

import os
import re
import json
import random
import time
import tweepy
from datetime import datetime, timezone

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AT_RISK_JS      = os.path.join(BASE_DIR, "data", "at_risk_facilities.js")
INCIDENTS_JS    = os.path.join(BASE_DIR, "data", "scraped_incidents.js")
STATIC_DATA_JS  = os.path.join(BASE_DIR, "js", "app.js")       # hardcoded incidents live here
POSTED_WARN_LOG = os.path.join(BASE_DIR, "data", "posted_warning_ids.txt")

TRACKER_URL = os.environ.get("TRACKER_URL", "https://idahofidelity.github.io/failure-watch")

# ── How many days before re-posting same facility ────────────────────────────
REPOST_COOLDOWN_DAYS = 30

# ── Emoji / label maps ───────────────────────────────────────────────────────
TYPE_EMOJI = {
    "chemical_plant": "🏭",
    "refinery":       "🔥",
    "pipeline":       "⚡",
    "bridge":         "🌉",
    "power_plant":    "⚡",
    "nuclear":        "☢️",
    "dam":            "🌊",
    "water":          "💧",
    "rail":           "🚂",
    "mine":           "⛏️",
    "warehouse":      "📦",
    "port":           "⚓",
    "default":        "⚠️",
}

TYPE_LABEL = {
    "chemical_plant": "CHEMICAL PLANT",
    "refinery":       "REFINERY",
    "pipeline":       "PIPELINE",
    "bridge":         "BRIDGE",
    "power_plant":    "POWER PLANT",
    "nuclear":        "NUCLEAR FACILITY",
    "dam":            "DAM",
    "water":          "WATER SYSTEM",
    "rail":           "RAIL",
    "mine":           "MINE",
    "warehouse":      "WAREHOUSE",
    "port":           "PORT",
    "default":        "FACILITY",
}

# ── Warning message templates ─────────────────────────────────────────────────
# {emoji}, {label}, {location}, {name}, {risk_detail}, {inspection_line}, {url}
WARNING_TEMPLATES = [
    "{emoji} AT RISK — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} INSPECTION FAILURE — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} STRUCTURAL CONCERN — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
    "{emoji} UNRESOLVED VIOLATIONS — {location}\n{name}\n{risk_detail}\n{inspection_line}\n{url}",
]


def load_js_data(filepath):
    """Parse a JS file that exports a JSON array or object. Returns parsed data or []."""
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()
    # Strip JS variable wrapper
    raw = re.sub(r"^\s*(const|let|var)\s+\w+\s*=\s*", "", raw, flags=re.MULTILINE)
    raw = re.sub(r";\s*$", "", raw.strip())
    try:
        return json.loads(raw)
    except (json.JSONDecodeError, ValueError):
        match = re.search(r"\[.*\]", raw, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                pass
    return []


def extract_static_incidents_from_appjs(filepath):
    """
    app.js stores the hardcoded incident objects in a JS array.
    We use a regex to extract all { id: "...", ... } objects.
    Returns a list of dicts for incidents that have failed_inspections data.
    """
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        raw = f.read()

    # Find the incidents array — looks for: const INCIDENTS = [ ... ];
    match = re.search(r"(?:const|let|var)\s+INCIDENTS\s*=\s*(\[.*?\]);", raw, re.DOTALL)
    if not match:
        # Try alternate pattern
        match = re.search(r"incidents\s*=\s*(\[.*?\]);", raw, re.DOTALL | re.IGNORECASE)
    if not match:
        return []

    try:
        data = json.loads(match.group(1))
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, ValueError):
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
        delta = (datetime.now(timezone.utc) - last).days
        return delta < REPOST_COOLDOWN_DAYS
    except ValueError:
        return False


def score_risk(facility):
    """Higher = more urgent to post."""
    score = 0
    fi = int(facility.get("failed_inspections", facility.get("inspection_failures", 0)) or 0)
    score += fi * 10
    violations = int(facility.get("violations", facility.get("open_violations", 0)) or 0)
    score += violations * 5
    severity = str(facility.get("severity", "")).lower()
    if severity == "catastrophic":
        score += 50
    elif severity == "major":
        score += 30
    elif severity == "moderate":
        score += 10
    if facility.get("corrective_action_order"):
        score += 20
    if facility.get("structurally_deficient") or facility.get("poor_rating"):
        score += 25
    return score


def build_candidates(at_risk_list, scraped_list, static_list):
    """Merge all sources into a normalized candidate list."""
    candidates = []

    # Source 1: at_risk_facilities.js
    for f in at_risk_list:
        fid = str(f.get("id", f.get("facility_id", f.get("name", ""))))
        if not fid:
            continue
        fi = int(f.get("failed_inspections", f.get("inspection_failures", 0)) or 0)
        violations = int(f.get("violations", f.get("open_violations", 0)) or 0)
        if fi == 0 and violations == 0 and not f.get("corrective_action_order"):
            continue
        candidates.append({
            "id":              f"atrisk_{fid}",
            "name":            f.get("name", f.get("facility_name", "Unknown Facility")),
            "facility_type":   f.get("facility_type", f.get("type", "default")),
            "city":            f.get("city", ""),
            "state":           f.get("state", ""),
            "failed_inspections": fi,
            "violations":      violations,
            "risk_detail":     f.get("risk_summary", f.get("violation_summary",
                                f.get("corrective_detail", "Unresolved inspection violations."))),
            "corrective_action_order": f.get("corrective_action_order", False),
            "structurally_deficient":  f.get("structurally_deficient", False),
            "score":           score_risk(f),
            "source":          "at_risk",
        })

    # Source 2: scraped incidents with inspection data
    for inc in scraped_list:
        fi = int(inc.get("failed_inspections", inc.get("inspection_failures", 0)) or 0)
        if fi == 0:
            continue
        iid = str(inc.get("id", inc.get("incident_id", inc.get("name", ""))))
        candidates.append({
            "id":              f"scraped_{iid}",
            "name":            inc.get("name", inc.get("facility_name", "Unknown Facility")),
            "facility_type":   inc.get("facility_type", "default"),
            "city":            inc.get("city", ""),
            "state":           inc.get("state", ""),
            "failed_inspections": fi,
            "violations":      0,
            "risk_detail":     inc.get("cause_detail", inc.get("incident_type",
                                "Prior incident with unresolved inspection findings.")),
            "corrective_action_order": False,
            "structurally_deficient":  False,
            "score":           score_risk(inc),
            "source":          "scraped",
        })

    # Source 3: static hardcoded incidents with inspection data
    for inc in static_list:
        fi = int(inc.get("failed_inspections", inc.get("inspection_failures", 0)) or 0)
        if fi == 0:
            continue
        iid = str(inc.get("id", inc.get("name", "")))
        candidates.append({
            "id":              f"static_{iid}",
            "name":            inc.get("name", "Unknown Facility"),
            "facility_type":   inc.get("facility_type", "default"),
            "city":            inc.get("city", ""),
            "state":           inc.get("state", ""),
            "failed_inspections": fi,
            "violations":      0,
            "risk_detail":     inc.get("cause_detail", inc.get("description",
                                "Prior incident with known inspection failures.")),
            "corrective_action_order": False,
            "structurally_deficient":  inc.get("severity") == "major",
            "score":           score_risk(inc),
            "source":          "static",
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
    fi       = facility["failed_inspections"]
    viol     = facility["violations"]

    # Build inspection line
    parts = []
    if fi:
        parts.append(f"{fi} failed inspection{'s' if fi != 1 else ''} on record.")
    if viol:
        parts.append(f"{viol} open violation{'s' if viol != 1 else ''}.")
    if facility.get("corrective_action_order"):
        parts.append("Corrective action order issued.")
    if facility.get("structurally_deficient"):
        parts.append("Rated structurally deficient.")
    inspection_line = " ".join(parts) if parts else "Inspection record flagged."

    # Truncate risk detail to ~80 chars
    risk_detail = facility["risk_detail"]
    if len(risk_detail) > 85:
        risk_detail = risk_detail[:82].rsplit(" ", 1)[0] + "..."

    template = random.choice(WARNING_TEMPLATES)
    tweet = template.format(
        emoji=emoji,
        label=label,
        location=location,
        name=name,
        risk_detail=risk_detail,
        inspection_line=inspection_line,
        url=TRACKER_URL,
    )

    # Hard cap at 280 chars — trim risk_detail if needed
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

    # Load all data sources
    at_risk_list  = load_js_data(AT_RISK_JS)
    scraped_list  = load_js_data(INCIDENTS_JS)
    static_list   = extract_static_incidents_from_appjs(STATIC_DATA_JS)

    print(f"Sources: {len(at_risk_list)} at-risk, {len(scraped_list)} scraped, {len(static_list)} static")

    candidates   = build_candidates(at_risk_list, scraped_list, static_list)
    posted_map   = load_posted_warning_ids()

    # Filter out cooldown
    available = [c for c in candidates if not is_on_cooldown(c["id"], posted_map)]

    if not available:
        print("All candidates on cooldown. Resetting and picking highest-score.")
        available = candidates  # fallback: ignore cooldown rather than go silent

    if not available:
        print("No at-risk facilities found in any data source.")
        return

    # Sort by score descending, pick top 5, randomize within top 5 for variety
    available.sort(key=lambda x: x["score"], reverse=True)
    pool   = available[:5]
    chosen = random.choice(pool)

    tweet = format_warning_tweet(chosen)
    print(f"\n--- Warning tweet preview ---\n{tweet}\n-----------------------------")
    print(f"Source: {chosen['source']} | ID: {chosen['id']} | Score: {chosen['score']}")

    client = tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
    )

    if post_tweet(client, tweet):
        save_posted_warning_id(chosen["id"])
        print(f"  ✓ Posted warning for: {chosen['name']}")
    else:
        print("  ✗ Failed to post warning.")


if __name__ == "__main__":
    main()
