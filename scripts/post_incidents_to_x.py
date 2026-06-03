"""
post_incidents_to_x.py
Reads data/scraped_incidents.js, deduplicates against data/posted_incident_ids.txt,
and posts any new incidents to X (Failure Watch account).
"""

import os
import re
import json
import time
import tweepy
from datetime import datetime, timezone, timedelta

# ── Paths ────────────────────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INCIDENTS_JS = os.path.join(BASE_DIR, "data", "scraped_incidents.js")
POSTED_LOG   = os.path.join(BASE_DIR, "data", "posted_incident_ids.txt")

# ── Config ───────────────────────────────────────────────────────────────────
MAX_AGE_DAYS = 7       # ignore incidents older than this (prevents blast on first run)
TRACKER_URL  = os.environ.get("TRACKER_URL", "https://idahofidelity.github.io/failure-watch")

# ── Emoji map by facility type ───────────────────────────────────────────────
TYPE_EMOJI = {
    "chemical_plant":  "🏭",
    "refinery":        "🔥",
    "pipeline":        "⚡",
    "bridge":          "🌉",
    "power_plant":     "⚡",
    "nuclear":         "☢️",
    "dam":             "🌊",
    "water":           "💧",
    "rail":            "🚂",
    "mine":            "⛏️",
    "warehouse":       "📦",
    "port":            "⚓",
    "default":         "🚨",
}

TYPE_LABEL = {
    "chemical_plant":  "CHEMICAL PLANT",
    "refinery":        "REFINERY",
    "pipeline":        "PIPELINE",
    "bridge":          "BRIDGE",
    "power_plant":     "POWER PLANT",
    "nuclear":         "NUCLEAR FACILITY",
    "dam":             "DAM",
    "water":           "WATER SYSTEM",
    "rail":            "RAIL",
    "mine":            "MINE",
    "warehouse":       "WAREHOUSE",
    "port":            "PORT",
    "default":         "FACILITY",
}


def load_incidents():
    """Parse scraped_incidents.js — strips JS wrapper, returns list of dicts."""
    with open(INCIDENTS_JS, "r", encoding="utf-8") as f:
        raw = f.read()
    # Strip JS variable assignment wrapper
    raw = re.sub(r"^\s*(const|let|var)\s+\w+\s*=\s*", "", raw, flags=re.MULTILINE)
    raw = re.sub(r";\s*$", "", raw.strip())
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Try extracting array directly
        match = re.search(r"\[.*\]", raw, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return []


def load_posted_ids():
    if not os.path.exists(POSTED_LOG):
        return set()
    with open(POSTED_LOG, "r") as f:
        return set(line.strip() for line in f if line.strip())


def save_posted_id(incident_id):
    with open(POSTED_LOG, "a") as f:
        f.write(f"{incident_id}\n")


def is_recent(incident):
    date_str = incident.get("date") or incident.get("scraped_date") or ""
    if not date_str:
        return True  # no date = assume recent
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return (datetime.now(timezone.utc) - dt) <= timedelta(days=MAX_AGE_DAYS)
    except ValueError:
        return True


def format_tweet(inc):
    ftype      = inc.get("facility_type", "default").lower().replace(" ", "_")
    emoji      = TYPE_EMOJI.get(ftype, TYPE_EMOJI["default"])
    label      = TYPE_LABEL.get(ftype, TYPE_LABEL["default"])
    city       = inc.get("city", "")
    state      = inc.get("state", "")
    location   = f"{city}, {state}".strip(", ")
    name       = inc.get("name", inc.get("facility_name", "Unknown Facility"))
    incident_t = inc.get("incident_type", inc.get("cause_detail", inc.get("cause", "Incident reported")))
    fatalities = inc.get("fatalities", 0) or 0
    injuries   = inc.get("injuries", 0) or 0
    inspections = inc.get("failed_inspections", inc.get("inspection_failures", None))

    # Build casualty line
    if fatalities and injuries:
        cas = f"{fatalities} dead, {injuries} injured."
    elif fatalities:
        cas = f"{fatalities} dead."
    elif injuries:
        cas = f"{injuries} injured."
    else:
        cas = "No casualties reported."

    lines = [
        f"{emoji} {label} — {location}",
        name,
        f"{incident_t}. {cas}",
    ]
    if inspections and int(inspections) > 0:
        lines.append(f"{inspections} failed inspections on record.")
    lines.append(TRACKER_URL)

    return "\n".join(lines)


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

    incidents  = load_incidents()
    posted_ids = load_posted_ids()

    new_incidents = [
        (str(inc.get("id", inc.get("incident_id", i))), inc)
        for i, inc in enumerate(incidents)
        if str(inc.get("id", inc.get("incident_id", i))) not in posted_ids
        and is_recent(inc)
    ]

    if not new_incidents:
        print("No new incidents to post.")
        return

    client = tweepy.Client(
        consumer_key=API_KEY,
        consumer_secret=API_SECRET,
        access_token=ACCESS_TOKEN,
        access_token_secret=ACCESS_TOKEN_SECRET,
    )

    print(f"Posting {len(new_incidents)} new incident(s)...")
    for inc_id, incident in new_incidents:
        tweet = format_tweet(incident)
        print(f"\n--- Tweet preview ---\n{tweet}\n---------------------")
        if post_tweet(client, tweet):
            save_posted_id(inc_id)
            print(f"  ✓ Posted: {inc_id}")
        time.sleep(3)


if __name__ == "__main__":
    main()
