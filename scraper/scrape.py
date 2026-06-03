"""
US Industrial Incident Tracker — Weekly Scraper
Idaho Fidelity Foundation
PATCHED: Google News URL resolution, HTML stripping, stronger dedup
"""

import os
import re
import json
import time
import hashlib
import logging
import requests
import feedparser
from datetime import datetime, timedelta
from dateutil import parser as dateparser
from bs4 import BeautifulSoup

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger(__name__)

GNEWS_API_KEY = os.environ.get('GNEWS_API_KEY', '')

TRIGGER_WORDS = [
    'explosion', 'exploded', 'explodes',
    'refinery fire', 'chemical plant fire', 'pipeline explosion',
    'chemical leak', 'chemical spill', 'toxic release', 'toxic spill',
    'hazmat', 'haz-mat', 'hazardous material',
    'shelter in place', 'shelter-in-place',
    'evacuation chemical', 'evacuate plant',
    'pipeline rupture', 'pipeline burst', 'pipeline leak',
    'tanker derailment', 'rail derailment hazardous',
    'refinery explosion', 'plant explosion',
    'ammonia leak', 'chlorine release', 'acid release',
    'benzene leak', 'hydrogen sulfide', 'vinyl chloride',
    'petrochemical fire', 'storage tank fire',
    'substation attack', 'power grid attack', 'grid sabotage',
    'bridge collapse', 'bridge failure', 'bridge struck',
    'nuclear leak', 'tritium leak', 'reactor incident',
    'transformer explosion', 'transformer fire',
    'BLEVE', 'vapor cloud explosion',
    'osha inspection failure chemical',
    'epa violation refinery',
]

EXCLUDE_WORDS = [
    'video game', 'movie', 'film', 'novel', 'book',
    'fundraiser', 'charity', 'donation',
    'anniversary', 'memorial',
    'weather forecast',
    'stock market', 'cryptocurrency',
]

FACILITY_KEYWORDS = {
    'oil_refinery':          ['refinery', 'petroleum refinery', 'crude oil processing'],
    'chemical_plant':        ['chemical plant', 'chemical facility', 'chemical complex', 'petrochemical plant'],
    'pipeline':              ['pipeline', 'gas main', 'transmission line', 'hazardous liquid line'],
    'rail_tanker':           ['rail', 'train', 'tanker car', 'freight derailment'],
    'petrochemical_storage': ['storage tank', 'tank farm', 'lng terminal', 'fuel depot'],
    'water_treatment':       ['water treatment', 'wastewater', 'sewage plant'],
    'bridge':                ['bridge', 'overpass', 'viaduct', 'span'],
    'power_grid':            ['substation', 'power plant', 'electric grid', 'transformer', 'nuclear plant', 'reactor'],
}

CAUSE_KEYWORDS = {
    'intentional':         ['attack', 'sabotage', 'bomb', 'arson', 'shot', 'gunfire', 'terrorism', 'extremist'],
    'natural_cause':       ['hurricane', 'flood', 'tornado', 'lightning', 'earthquake', 'storm'],
    'under_investigation': ['under investigation', 'cause unknown', 'investigating', 'probe'],
    'accidental':          ['accident', 'failure', 'malfunction', 'leak', 'rupture', 'corrosion'],
}

GNEWS_QUERIES = [
    'chemical plant explosion OR fire OR leak USA',
    'oil refinery explosion OR fire USA',
    'pipeline explosion OR rupture OR spill USA',
    'hazmat evacuation USA industrial',
    'rail tanker derailment hazardous materials USA',
    'power substation attack OR explosion USA',
    'bridge collapse OR failure USA',
    'nuclear plant leak OR incident USA',
    'OSHA chemical plant violation USA',
    'EPA refinery enforcement USA',
    'petrochemical storage tank fire USA',
    'ammonia chlorine toxic release USA industrial',
    'CSB Chemical Safety Board investigation',
    'PHMSA pipeline incident USA',
]

STATE_ABBREVS = {
    'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA',
    'Colorado':'CO','Connecticut':'CT','Delaware':'DE','Florida':'FL','Georgia':'GA',
    'Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA',
    'Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD',
    'Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS',
    'Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH',
    'New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC',
    'North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA',
    'Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN',
    'Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA',
    'West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY',
}

STATE_NAME_TO_ABBREV = STATE_ABBREVS
ABBREV_TO_NAME = {v: k for k, v in STATE_ABBREVS.items()}


# ── HELPERS ───────────────────────────────────────────────────────────────────

def make_id(text):
    return 'scraped_' + hashlib.md5(text.encode()).hexdigest()[:10]

def strip_html(text):
    """Remove HTML tags and decode entities."""
    if not text:
        return ''
    return BeautifulSoup(text, 'html.parser').get_text(separator=' ', strip=True)

def resolve_gnews_url(url):
    """Follow Google News RSS redirect to get the real article URL."""
    if not url or 'news.google.com' not in url:
        return url
    try:
        r = requests.get(
            url, timeout=10, allow_redirects=True,
            headers={'User-Agent': 'Mozilla/5.0 (compatible; IFF-Bot/1.0)'}
        )
        final = r.url
        # If still a Google URL, try to extract from the response
        if 'news.google.com' in final:
            soup = BeautifulSoup(r.text, 'html.parser')
            canonical = soup.find('link', rel='canonical')
            if canonical and 'news.google.com' not in canonical.get('href', ''):
                return canonical['href']
        return final
    except Exception as e:
        log.warning(f"URL resolve failed: {e}")
        return url

def is_relevant(text):
    text_lower = text.lower()
    if any(ex in text_lower for ex in EXCLUDE_WORDS):
        return False
    return any(tw in text_lower for tw in TRIGGER_WORDS)

def detect_facility_type(text):
    text_lower = text.lower()
    for ftype, keywords in FACILITY_KEYWORDS.items():
        if any(k in text_lower for k in keywords):
            return ftype
    return 'chemical_plant'

def detect_cause(text):
    text_lower = text.lower()
    for cause, keywords in CAUSE_KEYWORDS.items():
        if any(k in text_lower for k in keywords):
            return cause
    return 'under_investigation'

def extract_state(text):
    for name, abbrev in STATE_NAME_TO_ABBREV.items():
        if name in text or f', {abbrev}' in text or f' {abbrev} ' in text:
            return abbrev
    return 'US'

def extract_city(text):
    m = re.search(r'([A-Z][a-zA-Z\s]{2,20}),\s*([A-Z]{2})', text)
    if m:
        return m.group(1).strip()
    return 'Unknown'

def geocode(city, state):
    try:
        query = f"{city}, {state}, USA"
        url = f"https://nominatim.openstreetmap.org/search?q={requests.utils.quote(query)}&format=json&limit=1"
        r = requests.get(url, headers={'User-Agent': 'IFF-IncidentTracker/1.0 bot@idahofidelity.com'}, timeout=10)
        data = r.json()
        if data:
            return float(data[0]['lat']), float(data[0]['lon'])
    except Exception as e:
        log.warning(f"Geocode failed for {city}, {state}: {e}")
    STATE_CENTROIDS = {
        'TX':(31.0,-100.0),'LA':(31.0,-92.0),'CA':(36.7,-119.4),'OH':(40.4,-82.7),
        'IL':(40.0,-89.0),'PA':(40.9,-77.8),'WI':(44.2,-89.8),'NC':(35.5,-79.4),
        'WA':(47.4,-120.4),'MD':(39.0,-76.8),'OK':(35.5,-96.9),'TN':(35.8,-86.4),
        'MN':(46.4,-93.0),'GA':(32.9,-83.6),'AL':(32.8,-86.8),
        'VA':(37.9,-79.4),'MO':(38.4,-92.5),'MS':(32.7,-89.7),'IA':(42.0,-93.2),
        'KS':(38.5,-98.3),'AZ':(34.2,-111.1),'NM':(34.3,-106.0),'ND':(47.5,-100.4),
        'NJ':(40.0,-74.5),'NY':(43.0,-75.5),'TX':(31.0,-100.0),
    }
    return STATE_CENTROIDS.get(state, (39.5, -98.3))


# ── SCRAPERS ──────────────────────────────────────────────────────────────────

def scrape_csb():
    log.info("Scraping CSB...")
    incidents = []
    try:
        feed = feedparser.parse('https://www.csb.gov/news/investigations/rss/')
        for entry in feed.entries:
            title = strip_html(entry.get('title', ''))
            summary = strip_html(entry.get('summary', ''))
            link = entry.get('link', '')
            published = entry.get('published', '')
            text = f"{title} {summary}"
            if not is_relevant(text):
                continue
            try:
                pub_date = dateparser.parse(published).strftime('%Y-%m-%d')
            except:
                pub_date = datetime.now().strftime('%Y-%m-%d')
            city = extract_city(text)
            state = extract_state(text)
            lat, lng = geocode(city, state)
            incidents.append({
                'id': make_id(title + pub_date),
                'name': title,
                'date': pub_date,
                'lat': lat, 'lng': lng,
                'city': city, 'state': state,
                'facility_type': detect_facility_type(text),
                'cause': detect_cause(text),
                'cause_detail': summary[:200] if summary else 'CSB investigation initiated.',
                'severity': 'major',
                'injuries': 0, 'fatalities': 0,
                'displaced_temp': 0, 'displaced_perm': 0,
                'cleanup_cost': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'description': summary[:400] if summary else title,
                'source_url': link,
                'source': 'CSB',
                'csb_investigated': True, 'spilltracker_listed': False,
                'coalition_listed': False, 'epa_rmp': False,
            })
            time.sleep(0.3)
    except Exception as e:
        log.error(f"CSB scrape failed: {e}")
    log.info(f"CSB: {len(incidents)} incidents")
    return incidents


def scrape_phmsa():
    log.info("Scraping PHMSA...")
    incidents = []
    try:
        feed = feedparser.parse('https://www.phmsa.dot.gov/rss/incidents')
        for entry in feed.entries:
            title = strip_html(entry.get('title', ''))
            summary = strip_html(entry.get('summary', ''))
            link = entry.get('link', '')
            published = entry.get('published', str(datetime.now()))
            text = f"{title} {summary}"
            try:
                pub_date = dateparser.parse(published).strftime('%Y-%m-%d')
            except:
                pub_date = datetime.now().strftime('%Y-%m-%d')
            city = extract_city(text)
            state = extract_state(text)
            lat, lng = geocode(city, state)
            incidents.append({
                'id': make_id(title + pub_date),
                'name': title,
                'date': pub_date,
                'lat': lat, 'lng': lng,
                'city': city, 'state': state,
                'facility_type': 'pipeline',
                'cause': detect_cause(text),
                'cause_detail': summary[:200] if summary else 'PHMSA significant incident report.',
                'severity': 'moderate',
                'injuries': 0, 'fatalities': 0,
                'displaced_temp': 0, 'displaced_perm': 0,
                'cleanup_cost': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'description': summary[:400] if summary else title,
                'source_url': link,
                'source': 'PHMSA',
                'csb_investigated': False, 'spilltracker_listed': False,
                'coalition_listed': False, 'epa_rmp': False,
            })
            time.sleep(0.3)
    except Exception as e:
        log.error(f"PHMSA scrape failed: {e}")
    log.info(f"PHMSA: {len(incidents)} incidents")
    return incidents


def scrape_nrc():
    log.info("Scraping NRC...")
    incidents = []
    try:
        feed = feedparser.parse('https://www.nrc.gov/reading-rm/doc-collections/event-status/event/en.rss')
        cutoff = datetime.now() - timedelta(days=90)
        for entry in feed.entries[:50]:
            title = strip_html(entry.get('title', ''))
            summary = strip_html(entry.get('summary', ''))
            link = entry.get('link', '')
            published = entry.get('published', str(datetime.now()))
            text = f"{title} {summary}"
            if not any(kw in text.lower() for kw in ['leak', 'release', 'fire', 'explosion', 'unusual event', 'alert', 'site area emergency', 'general emergency', 'tritium', 'radiation']):
                continue
            try:
                pub_date = dateparser.parse(published)
                if pub_date.replace(tzinfo=None) < cutoff:
                    continue
                pub_date = pub_date.strftime('%Y-%m-%d')
            except:
                pub_date = datetime.now().strftime('%Y-%m-%d')
            state = extract_state(text)
            city = extract_city(text)
            lat, lng = geocode(city, state)
            incidents.append({
                'id': make_id(title + pub_date),
                'name': f"NRC Event: {title[:80]}",
                'date': pub_date,
                'lat': lat, 'lng': lng,
                'city': city, 'state': state,
                'facility_type': 'power_grid',
                'cause': detect_cause(text),
                'cause_detail': summary[:200] if summary else 'NRC event notification.',
                'severity': 'moderate',
                'injuries': 0, 'fatalities': 0,
                'displaced_temp': 0, 'displaced_perm': 0,
                'cleanup_cost': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                'description': summary[:400] if summary else title,
                'source_url': link,
                'source': 'NRC',
                'csb_investigated': False, 'spilltracker_listed': False,
                'coalition_listed': False, 'epa_rmp': False,
            })
            time.sleep(0.3)
    except Exception as e:
        log.error(f"NRC scrape failed: {e}")
    log.info(f"NRC: {len(incidents)} incidents")
    return incidents


def scrape_epa_echo():
    log.info("Scraping EPA ECHO...")
    incidents = []
    try:
        url = "https://echo.epa.gov/api/search/penalty"
        params = {
            'p_act': 'Y',
            'p_st': '',
            'p_industry': 'petroleum,chemical',
            'output': 'JSON',
            'qcolumns': '1,2,3,4,5,6,7,8,9,10',
        }
        r = requests.get(url, params=params, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data.get('Results', {}).get('PenaltyResults', []) or [])[:20]:
                name = strip_html(item.get('FacilityName', 'Unknown Facility'))
                city = strip_html(item.get('CityName', 'Unknown'))
                state = item.get('StateCode', 'US')
                date = item.get('SettlementDate', datetime.now().strftime('%Y-%m-%d'))
                penalty = item.get('FederalPenaltyImposed', 0)
                lat_s = item.get('Latitude83', '')
                lng_s = item.get('Longitude83', '')
                try:
                    lat = float(lat_s) if lat_s else None
                    lng = float(lng_s) if lng_s else None
                    if not lat or not lng:
                        lat, lng = geocode(city, state)
                except:
                    lat, lng = geocode(city, state)
                try:
                    date = dateparser.parse(str(date)).strftime('%Y-%m-%d')
                except:
                    date = datetime.now().strftime('%Y-%m-%d')
                incidents.append({
                    'id': make_id(name + date),
                    'name': f"EPA Enforcement: {name}",
                    'date': date,
                    'lat': lat, 'lng': lng,
                    'city': city, 'state': state,
                    'facility_type': detect_facility_type(name),
                    'cause': 'accidental',
                    'cause_detail': f"EPA enforcement action. Penalty: ${penalty:,.0f}" if penalty else 'EPA enforcement action.',
                    'severity': 'moderate',
                    'injuries': 0, 'fatalities': 0,
                    'displaced_temp': 0, 'displaced_perm': 0,
                    'cleanup_cost': {'amount': float(penalty) if penalty else None, 'adjusted': float(penalty) if penalty else None, 'confidence': 'confirmed', 'note': 'EPA ECHO enforcement penalty'},
                    'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'description': strip_html(f"EPA enforcement action against {name} in {city}, {state}."),
                    'source_url': f"https://echo.epa.gov/detailed-facility-report?fid={item.get('RegistryId','')}",
                    'source': 'EPA ECHO',
                    'csb_investigated': False, 'spilltracker_listed': False,
                    'coalition_listed': False, 'epa_rmp': True,
                })
    except Exception as e:
        log.error(f"EPA ECHO scrape failed: {e}")
    log.info(f"EPA ECHO: {len(incidents)} incidents")
    return incidents


def scrape_google_news_rss():
    """Google News RSS — resolve real URLs, strip HTML, strong dedup"""
    log.info("Scraping Google News RSS...")
    incidents = []
    seen_titles = set()
    cutoff = datetime.now() - timedelta(days=14)

    for query in GNEWS_QUERIES:
        try:
            encoded = requests.utils.quote(query)
            url = f"https://news.google.com/rss/search?q={encoded}&hl=en-US&gl=US&ceid=US:en"
            feed = feedparser.parse(url)
            log.info(f"  Query '{query[:40]}': {len(feed.entries)} results")

            for entry in feed.entries[:15]:
                title = strip_html(entry.get('title', ''))
                summary = strip_html(entry.get('summary', entry.get('description', '')))
                raw_link = entry.get('link', '')
                published = entry.get('published', str(datetime.now()))
                text = f"{title} {summary}"

                # Strong dedup — first 50 chars of cleaned title
                title_key = re.sub(r'\W+', '', title.lower())[:50]
                if title_key in seen_titles:
                    continue
                seen_titles.add(title_key)

                if not is_relevant(text):
                    continue

                try:
                    pub_date = dateparser.parse(published)
                    if pub_date.replace(tzinfo=None) < cutoff:
                        continue
                    pub_date_str = pub_date.strftime('%Y-%m-%d')
                except:
                    pub_date_str = datetime.now().strftime('%Y-%m-%d')

                # ── RESOLVE REAL URL ──────────────────────────────────
                real_url = resolve_gnews_url(raw_link)
                time.sleep(0.5)  # polite delay after resolution

                city = extract_city(title + ' ' + summary)
                state = extract_state(title + ' ' + summary)
                lat, lng = geocode(city, state)

                # Extract source from "Title - Source" format
                source = 'News'
                clean_title = title
                if ' - ' in title:
                    source = title.split(' - ')[-1].strip()
                    clean_title = ' - '.join(title.split(' - ')[:-1]).strip()

                incidents.append({
                    'id': make_id(clean_title + pub_date_str),
                    'name': clean_title[:120],
                    'date': pub_date_str,
                    'lat': lat, 'lng': lng,
                    'city': city, 'state': state,
                    'facility_type': detect_facility_type(text),
                    'cause': detect_cause(text),
                    'cause_detail': summary[:200] if summary else 'Reported incident.',
                    'severity': 'moderate',
                    'injuries': 0, 'fatalities': 0,
                    'displaced_temp': 0, 'displaced_perm': 0,
                    'cleanup_cost': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'description': summary[:400] if summary else clean_title,
                    'source_url': real_url,   # ← RESOLVED URL
                    'source': source,
                    'csb_investigated': False, 'spilltracker_listed': False,
                    'coalition_listed': False, 'epa_rmp': False,
                    'articles': [{'title': clean_title, 'url': real_url, 'source': source, 'publishedAt': pub_date_str, 'biasScore': 'unscored', 'biasLabel': 'Unscored'}],
                })
            time.sleep(1.5)
        except Exception as e:
            log.error(f"Google News RSS failed for '{query}': {e}")

    log.info(f"Google News: {len(incidents)} incidents")
    return incidents


def scrape_osha_violations():
    log.info("Scraping OSHA violations...")
    incidents = []
    try:
        url = "https://data.dol.gov/get/full_osha_inspection/rows/20/offset/0"
        headers = {'Accept': 'application/json'}
        r = requests.get(url, headers=headers, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data or [])[:30]:
                name = strip_html(item.get('estab_name', 'Unknown Facility'))
                city = strip_html(item.get('city', 'Unknown'))
                state = item.get('state', 'US')
                naics = str(item.get('naics_code', ''))
                close_date = item.get('close_dt', '')
                violation_type = item.get('safety_hlth', '')
                num_violations = item.get('total_viol_cnt', 0)
                relevant_naics = ['211', '212', '213', '324', '325', '331', '333', '486']
                if not any(naics.startswith(n) for n in relevant_naics):
                    continue
                if int(num_violations or 0) == 0:
                    continue
                try:
                    date = dateparser.parse(str(close_date)).strftime('%Y-%m-%d')
                except:
                    date = datetime.now().strftime('%Y-%m-%d')
                lat, lng = geocode(city, state)
                incidents.append({
                    'id': make_id(name + city + date),
                    'name': f"OSHA Inspection Failure: {name}",
                    'date': date,
                    'lat': lat, 'lng': lng,
                    'city': city, 'state': state,
                    'facility_type': detect_facility_type(name),
                    'cause': 'under_investigation',
                    'cause_detail': strip_html(f"OSHA inspection found {num_violations} violations. Type: {violation_type}."),
                    'severity': 'moderate',
                    'injuries': 0, 'fatalities': 0,
                    'displaced_temp': 0, 'displaced_perm': 0,
                    'cleanup_cost': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'infrastructure_damage': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'economic_impact': {'amount': None, 'adjusted': None, 'confidence': None, 'note': None},
                    'description': strip_html(f"OSHA inspection of {name} in {city}, {state} found {num_violations} violations."),
                    'source_url': f"https://www.osha.gov/establishments/{name.replace(' ', '%20')}",
                    'source': 'OSHA',
                    'csb_investigated': False, 'spilltracker_listed': False,
                    'coalition_listed': False, 'epa_rmp': False,
                    'inspection_failure': True,
                })
                time.sleep(0.2)
    except Exception as e:
        log.error(f"OSHA scrape failed: {e}")
    log.info(f"OSHA: {len(incidents)} inspection failures")
    return incidents


def scrape_at_risk_facilities():
    log.info("Scraping at-risk facilities...")
    facilities = []

    try:
        eia_url = "https://api.eia.gov/v2/petroleum/refine/capacity/data/?frequency=annual&data[0]=value&facets[process]=TCP&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=100"
        r = requests.get(eia_url, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data.get('response', {}).get('data', []) or [])[:50]:
                name = item.get('facility-name', item.get('areaName', 'Unknown Refinery'))
                state = item.get('state', item.get('stateCode', 'US'))
                year_built = item.get('year-built', None)
                if not year_built:
                    continue
                try:
                    age = datetime.now().year - int(year_built)
                except:
                    continue
                if age < 25:
                    continue
                lat, lng = geocode(name, state)
                risk_status = 'aging_critical' if age >= 50 else 'aging_moderate' if age >= 35 else 'aging_watch'
                facilities.append({
                    'id': make_id(name + state),
                    'name': name,
                    'city': 'Unknown',
                    'state': state,
                    'lat': lat, 'lng': lng,
                    'facility_type': 'oil_refinery',
                    'year_built': int(year_built),
                    'age_years': age,
                    'risk_status': risk_status,
                    'risk_reason': f"Refinery age: {age} years. EIA operational data.",
                    'source': 'EIA',
                    'inspection_status': 'unknown',
                    'violations': 0,
                    'repairs_planned': False,
                    'last_incident': None,
                })
    except Exception as e:
        log.error(f"EIA scrape failed: {e}")

    try:
        rmp_url = "https://rmp.epa.gov/api/facilities"
        params = {'output': 'JSON', 'rows': 100, 'start': 0}
        r = requests.get(rmp_url, params=params, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data.get('facilities', []) or [])[:50]:
                name = item.get('facilityName', 'Unknown')
                city = item.get('city', 'Unknown')
                state = item.get('stateCd', 'US')
                lat_s = item.get('latitude', '')
                lng_s = item.get('longitude', '')
                last_submission = item.get('submissionDate', '')
                num_accidents = item.get('numAccidents', 0)
                try:
                    lat = float(lat_s) if lat_s else None
                    lng = float(lng_s) if lng_s else None
                    if not lat or not lng:
                        lat, lng = geocode(city, state)
                except:
                    lat, lng = geocode(city, state)
                if int(num_accidents or 0) == 0:
                    continue
                facilities.append({
                    'id': make_id(name + city + state),
                    'name': name,
                    'city': city,
                    'state': state,
                    'lat': lat, 'lng': lng,
                    'facility_type': detect_facility_type(name),
                    'year_built': None,
                    'age_years': None,
                    'risk_status': 'accident_history',
                    'risk_reason': f"EPA RMP: {num_accidents} reported accidents. Active RMP filing.",
                    'source': 'EPA RMP',
                    'inspection_status': 'rmp_filed',
                    'violations': int(num_accidents or 0),
                    'repairs_planned': False,
                    'last_incident': last_submission,
                })
    except Exception as e:
        log.error(f"EPA RMP scrape failed: {e}")

    try:
        aging_pipelines = [
            {'name': 'Transcontinental Gas Pipeline (Transco) - Vintage Segments', 'state': 'NJ', 'city': 'Woodbridge', 'lat': 40.5572, 'lng': -74.2846, 'age': 65, 'risk': 'aging_critical'},
            {'name': 'Tennessee Gas Pipeline - Pre-1960 Segments', 'state': 'TN', 'city': 'Nashville', 'lat': 36.1627, 'lng': -86.7816, 'age': 70, 'risk': 'aging_critical'},
            {'name': 'El Paso Natural Gas - Vintage Southwest Segments', 'state': 'TX', 'city': 'El Paso', 'lat': 31.7619, 'lng': -106.4850, 'age': 68, 'risk': 'aging_critical'},
            {'name': 'Colonial Pipeline System - 1960s Era Sections', 'state': 'AL', 'city': 'Helena', 'lat': 33.2976, 'lng': -86.8439, 'age': 58, 'risk': 'aging_critical'},
            {'name': 'Panhandle Eastern Pipe Line - Pre-1970 Segments', 'state': 'KS', 'city': 'Liberal', 'lat': 37.0433, 'lng': -100.9218, 'age': 72, 'risk': 'aging_critical'},
        ]
        for p in aging_pipelines:
            facilities.append({
                'id': make_id(p['name'] + p['state']),
                'name': p['name'],
                'city': p['city'],
                'state': p['state'],
                'lat': p['lat'], 'lng': p['lng'],
                'facility_type': 'pipeline',
                'year_built': datetime.now().year - p['age'],
                'age_years': p['age'],
                'risk_status': p['risk'],
                'risk_reason': f"Pipeline installed circa {datetime.now().year - p['age']}. Age: {p['age']} years. PHMSA data on aging infrastructure.",
                'source': 'PHMSA',
                'inspection_status': 'unknown',
                'violations': 0,
                'repairs_planned': False,
                'last_incident': None,
            })
    except Exception as e:
        log.error(f"PHMSA pipeline age scrape failed: {e}")

    try:
        nuclear_aging = [
            {'name': 'Diablo Canyon Power Plant', 'city': 'Avila Beach', 'state': 'CA', 'lat': 35.2108, 'lng': -120.8546, 'age': 44, 'risk': 'aging_critical', 'note': 'License extended; seismic concerns'},
            {'name': 'Palisades Nuclear Plant', 'city': 'Covert', 'state': 'MI', 'lat': 42.3227, 'lng': -86.3154, 'age': 53, 'risk': 'aging_critical', 'note': 'Restarting after closure; DOE loan'},
            {'name': 'Monticello Nuclear Plant', 'city': 'Monticello', 'state': 'MN', 'lat': 45.3355, 'lng': -93.8425, 'age': 52, 'risk': 'aging_critical', 'note': '2022 tritium leak; license extension under review'},
            {'name': 'Dresden Nuclear Power Station', 'city': 'Morris', 'state': 'IL', 'lat': 41.3892, 'lng': -88.2682, 'age': 54, 'risk': 'aging_critical', 'note': 'Oldest US BWR still operating'},
            {'name': 'Nine Mile Point Nuclear Station', 'city': 'Scriba', 'state': 'NY', 'lat': 43.5219, 'lng': -76.4101, 'age': 55, 'risk': 'aging_critical', 'note': 'NRC 20-year license renewal pending'},
            {'name': 'Browns Ferry Nuclear Plant', 'city': 'Athens', 'state': 'AL', 'lat': 34.7024, 'lng': -87.1218, 'age': 50, 'risk': 'aging_critical', 'note': 'TVA; license extension approved 2020'},
            {'name': 'Surry Power Station', 'city': 'Surry', 'state': 'VA', 'lat': 37.1653, 'lng': -76.6980, 'age': 52, 'risk': 'aging_critical', 'note': 'Oldest Dominion plant; 80-year license renewal sought'},
        ]
        for n in nuclear_aging:
            facilities.append({
                'id': make_id(n['name']),
                'name': n['name'],
                'city': n['city'],
                'state': n['state'],
                'lat': n['lat'], 'lng': n['lng'],
                'facility_type': 'power_grid',
                'year_built': datetime.now().year - n['age'],
                'age_years': n['age'],
                'risk_status': n['risk'],
                'risk_reason': f"Nuclear plant age: {n['age']} years. {n['note']}",
                'source': 'NRC',
                'inspection_status': 'licensed',
                'violations': 0,
                'repairs_planned': True,
                'last_incident': None,
            })
    except Exception as e:
        log.error(f"Nuclear aging scrape failed: {e}")

    log.info(f"At-risk facilities total: {len(facilities)}")
    return facilities


def scrape_phmsa_corrective_actions():
    log.info("Scraping PHMSA corrective actions...")
    facilities = []
    try:
        url = "https://portal.phmsa.dot.gov/pipeline-security/api/enforcement/cao"
        r = requests.get(url, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data.get('data', []) or [])[:30]:
                name = item.get('operatorName', 'Unknown')
                state = item.get('state', 'US')
                city = item.get('city', 'Unknown')
                date = item.get('issueDate', datetime.now().strftime('%Y-%m-%d'))
                order_num = item.get('caoNumber', '')
                try:
                    date = dateparser.parse(str(date)).strftime('%Y-%m-%d')
                except:
                    date = datetime.now().strftime('%Y-%m-%d')
                lat, lng = geocode(city, state)
                facilities.append({
                    'id': make_id(name + order_num),
                    'name': name,
                    'city': city, 'state': state,
                    'lat': lat, 'lng': lng,
                    'facility_type': 'pipeline',
                    'year_built': None, 'age_years': None,
                    'risk_status': 'accident_history',
                    'risk_reason': f"PHMSA Corrective Action Order #{order_num} issued. Mandatory repairs required.",
                    'source': 'PHMSA CAO',
                    'inspection_status': 'corrective_action_ordered',
                    'violations': 1,
                    'repairs_planned': True,
                    'last_incident': date,
                })
    except Exception as e:
        log.error(f"PHMSA CAO scrape failed: {e}")
    try:
        wl_url = "https://portal.phmsa.dot.gov/pipeline-security/api/enforcement/wl"
        r = requests.get(wl_url, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for item in (data.get('data', []) or [])[:20]:
                name = item.get('operatorName', 'Unknown')
                state = item.get('state', 'US')
                date = item.get('issueDate', datetime.now().strftime('%Y-%m-%d'))
                try:
                    date = dateparser.parse(str(date)).strftime('%Y-%m-%d')
                except:
                    date = datetime.now().strftime('%Y-%m-%d')
                lat, lng = geocode(name, state)
                facilities.append({
                    'id': make_id(name + 'wl' + date),
                    'name': name,
                    'city': 'Unknown', 'state': state,
                    'lat': lat, 'lng': lng,
                    'facility_type': 'pipeline',
                    'year_built': None, 'age_years': None,
                    'risk_status': 'accident_history',
                    'risk_reason': f"PHMSA Warning Letter issued {date}. Safety violations identified.",
                    'source': 'PHMSA Warning Letter',
                    'inspection_status': 'warning_letter_issued',
                    'violations': 1,
                    'repairs_planned': False,
                    'last_incident': date,
                })
    except Exception as e:
        log.error(f"PHMSA warning letters failed: {e}")
    log.info(f"PHMSA CAO/WL: {len(facilities)} facilities")
    return facilities


def scrape_sec_repair_filings():
    log.info("Scraping SEC repair filings...")
    facilities = []
    try:
        keywords = ['pipeline repair', 'refinery upgrade', 'infrastructure repair mandatory',
                    'consent order repair', 'EPA consent decree', 'corrective action plan']
        for kw in keywords[:3]:
            url = f"https://efts.sec.gov/LATEST/search-index?q=%22{requests.utils.quote(kw)}%22&dateRange=custom&startdt={datetime.now().strftime('%Y')}-01-01&forms=10-K,10-Q"
            r = requests.get(url, timeout=15,
                headers={'User-Agent': 'IFF-IncidentTracker/1.0 bot@idahofidelity.com'})
            if r.status_code == 200:
                data = r.json()
                for hit in (data.get('hits', {}).get('hits', []) or [])[:5]:
                    company = hit.get('_source', {}).get('entity_name', 'Unknown')
                    filing_date = hit.get('_source', {}).get('file_date', datetime.now().strftime('%Y-%m-%d'))
                    if not company or company == 'Unknown':
                        continue
                    facilities.append({
                        'id': make_id(company + filing_date + kw),
                        'name': company,
                        'city': 'Unknown', 'state': 'US',
                        'lat': 39.5, 'lng': -98.3,
                        'facility_type': detect_facility_type(company),
                        'year_built': None, 'age_years': None,
                        'risk_status': 'accident_history',
                        'risk_reason': f"SEC filing mentions: {kw}. Filed {filing_date}.",
                        'source': 'SEC EDGAR',
                        'inspection_status': 'repair_disclosed',
                        'violations': 0,
                        'repairs_planned': True,
                        'last_incident': filing_date,
                    })
            time.sleep(1)
    except Exception as e:
        log.error(f"SEC EDGAR scrape failed: {e}")
    log.info(f"SEC filings: {len(facilities)} facilities")
    return facilities


def deduplicate(incidents):
    """Strong dedup — title + full date, not just title + month"""
    seen = {}
    result = []
    for inc in incidents:
        # Use first 60 chars of cleaned title + full date (YYYY-MM-DD)
        key = re.sub(r'\W+', '', inc['name'].lower())[:60] + inc['date'][:10]
        if key not in seen:
            seen[key] = True
            result.append(inc)
    return result


def load_existing_ids():
    existing = set()
    for fname in ['data/incidents.js', 'data/scraped_incidents.js']:
        if os.path.exists(fname):
            with open(fname, 'r') as f:
                for match in re.findall(r'id:\s*["\']([^"\']+)["\']', f.read()):
                    existing.add(match)
    return existing


def write_js(incidents, facilities):
    os.makedirs('data', exist_ok=True)
    inc_json = json.dumps(incidents, indent=2, default=str)
    with open('data/scraped_incidents.js', 'w') as f:
        f.write(f"// Auto-generated by IFF scraper — {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}\n")
        f.write(f"// {len(incidents)} incidents scraped this run\n")
        f.write(f"const SCRAPED_INCIDENTS = {inc_json};\n")
    log.info(f"Wrote {len(incidents)} scraped incidents")
    fac_json = json.dumps(facilities, indent=2, default=str)
    with open('data/at_risk_facilities.js', 'w') as f:
        f.write(f"// Auto-generated by IFF scraper — {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}\n")
        f.write(f"// {len(facilities)} at-risk facilities\n")
        f.write(f"const AT_RISK_FACILITIES = {fac_json};\n")
    log.info(f"Wrote {len(facilities)} at-risk facilities")


def main():
    log.info("=== IFF Incident Scraper Starting ===")
    existing_ids = load_existing_ids()
    log.info(f"Existing incident IDs loaded: {len(existing_ids)}")
    all_incidents = []
    all_incidents += scrape_csb()
    all_incidents += scrape_phmsa()
    all_incidents += scrape_nrc()
    all_incidents += scrape_epa_echo()
    all_incidents += scrape_google_news_rss()
    all_incidents += scrape_osha_violations()
    all_incidents = deduplicate(all_incidents)
    new_incidents = [i for i in all_incidents if i['id'] not in existing_ids]
    log.info(f"New incidents after dedup and filtering: {len(new_incidents)}")
    facilities = scrape_at_risk_facilities()
    facilities += scrape_phmsa_corrective_actions()
    facilities += scrape_sec_repair_filings()
    write_js(new_incidents, facilities)
    log.info("=== Scraper Complete ===")


if __name__ == '__main__':
    main()
