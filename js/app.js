// ============================================================
// US INDUSTRIAL INCIDENT TRACKER — MAIN APP
// Idaho Fidelity Foundation
// ============================================================

'use strict';

const CAUSE_CONFIG = {
  accidental:          { label: 'Accidental',             color: '#4a9eff' },
  intentional:         { label: 'Intentional/Sabotage',   color: '#ff3b3b' },
  under_investigation: { label: 'Under Investigation',    color: '#ff8c00' },
  natural_cause:       { label: 'Natural Cause',          color: '#00c896' },
  unknown:             { label: 'Unknown/Unresolved',     color: '#a78bfa' },
};

const FACILITY_CONFIG = {
  oil_refinery:          { label: 'Oil Refinery',         icon: '🏭', shape: 'square'   },
  chemical_plant:        { label: 'Chemical Plant',       icon: '⚗️',  shape: 'diamond'  },
  pipeline:              { label: 'Pipeline',             icon: '🔧', shape: 'triangle' },
  rail_tanker:           { label: 'Rail Tanker',          icon: '🚂', shape: 'pentagon' },
  petrochemical_storage: { label: 'Petrochem Storage',    icon: '🛢️',  shape: 'hexagon'  },
  water_treatment:       { label: 'Water Treatment',      icon: '💧', shape: 'star'     },
  bridge:                { label: 'Bridge',               icon: '🌉', shape: 'cross'    },
  power_grid:            { label: 'Power Plant/Grid',     icon: '⚡', shape: 'lightning'},
};

const SEVERITY_CONFIG = {
  catastrophic: { label: 'Catastrophic', color: '#ff1a1a' },
  major:        { label: 'Major',        color: '#ff6b35' },
  moderate:     { label: 'Moderate',     color: '#ffd93d' },
};

const state = {
  incidents: [],
  filtered: [],
  selectedId: null,
  markers: {},
  articleCache: {},
  filters: {
    search: '',
    causes: new Set(Object.keys(CAUSE_CONFIG)),
    facilities: new Set(Object.keys(FACILITY_CONFIG)),
    yearFrom: 2019,
    yearTo: new Date().getFullYear(),
    xref: null,
    sort: 'date_desc',
  },
};

let map = null;

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initMap();
  loadIncidents();
  initFilters();
  initSearch();
  renderAll();
  setTimeout(() => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) { overlay.classList.add('fade-out'); setTimeout(() => overlay.remove(), 400); }
  }, 800);
});

// ── MAP ───────────────────────────────────────────────────
function initMap() {
  map = L.map('map', { center: [38.5, -97], zoom: 4, zoomControl: false, attributionControl: true });
  L.control.zoom({ position: 'bottomright' }).addTo(map);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors', maxZoom: 18,
  }).addTo(map);
}

function loadIncidents() {
  state.incidents = SEED_INCIDENTS.map(inc => ({ ...inc, year: parseInt(inc.date.split('-')[0]) }));
}

// ── FILTERS ───────────────────────────────────────────────
function initFilters() {
  const fromEl = document.getElementById('year-from');
  const toEl = document.getElementById('year-to');
  const curYear = new Date().getFullYear();
  [fromEl, toEl].forEach(el => {
    for (let y = 2019; y <= curYear; y++) {
      const opt = document.createElement('option');
      opt.value = y; opt.textContent = y; el.appendChild(opt);
    }
  });
  fromEl.value = 2019; toEl.value = curYear;
  fromEl.addEventListener('change', () => { state.filters.yearFrom = +fromEl.value; renderAll(); });
  toEl.addEventListener('change', () => { state.filters.yearTo = +toEl.value; renderAll(); });

  const causeContainer = document.getElementById('cause-toggles');
  Object.entries(CAUSE_CONFIG).forEach(([key, cfg]) => {
    const btn = document.createElement('button');
    btn.className = 'ftoggle active'; btn.dataset.cause = key;
    btn.style.setProperty('--filter-color', cfg.color);
    btn.innerHTML = `<span class="dot" style="background:${cfg.color}"></span>${cfg.label}`;
    btn.addEventListener('click', () => {
      if (state.filters.causes.has(key)) state.filters.causes.delete(key);
      else state.filters.causes.add(key);
      btn.classList.toggle('active'); renderAll();
    });
    causeContainer.appendChild(btn);
  });

  const facContainer = document.getElementById('facility-toggles');
  Object.entries(FACILITY_CONFIG).forEach(([key, cfg]) => {
    const btn = document.createElement('button');
    btn.className = 'fac-toggle active'; btn.dataset.facility = key;
    const count = state.incidents.filter(i => i.facility_type === key).length;
    btn.innerHTML = `<span class="fac-icon">${cfg.icon}</span>${cfg.label}<span class="fac-count" id="fac-count-${key}">${count}</span>`;
    btn.addEventListener('click', () => {
      if (state.filters.facilities.has(key)) state.filters.facilities.delete(key);
      else state.filters.facilities.add(key);
      btn.classList.toggle('active'); renderAll();
    });
    facContainer.appendChild(btn);
  });

  document.querySelectorAll('.xref-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.xref;
      if (state.filters.xref === val) { state.filters.xref = null; btn.classList.remove('active'); }
      else { document.querySelectorAll('.xref-btn').forEach(b => b.classList.remove('active')); state.filters.xref = val; btn.classList.add('active'); }
      renderAll();
    });
  });

  document.getElementById('sort-select').addEventListener('change', (e) => { state.filters.sort = e.target.value; renderAll(); });
}

function initSearch() {
  const input = document.getElementById('search-input');
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { state.filters.search = input.value.trim().toLowerCase(); renderAll(); }, 200);
  });
}

function applyFilters() {
  const { search, causes, facilities, yearFrom, yearTo, xref, sort } = state.filters;
  let result = state.incidents.filter(inc => {
    if (!causes.has(inc.cause)) return false;
    if (!facilities.has(inc.facility_type)) return false;
    if (inc.year < yearFrom || inc.year > yearTo) return false;
    if (xref === 'spilltracker' && !inc.spilltracker_listed) return false;
    if (xref === 'coalition' && !inc.coalition_listed) return false;
    if (xref === 'csb' && !inc.csb_investigated) return false;
    if (xref === 'epa' && !inc.epa_rmp) return false;
    if (search) {
      const hay = `${inc.name} ${inc.city} ${inc.state} ${inc.description} ${inc.cause_detail}`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });
  result.sort((a, b) => {
    switch (sort) {
      case 'date_desc': return new Date(b.date) - new Date(a.date);
      case 'date_asc':  return new Date(a.date) - new Date(b.date);
      case 'severity':  return getSevWeight(b) - getSevWeight(a);
      case 'fatalities': return (b.fatalities + b.injuries) - (a.fatalities + a.injuries);
      default: return 0;
    }
  });
  state.filtered = result;
}

function getSevWeight(inc) { return { catastrophic: 3, major: 2, moderate: 1 }[inc.severity] || 0; }

function renderAll() {
  applyFilters();
  updateHeaderStats();
  renderList();
  renderMarkers();
  updateFacilityCounts();
}

function updateHeaderStats() {
  const f = state.filtered;
  document.getElementById('stat-total').textContent = f.length;
  document.getElementById('stat-fatalities').textContent = f.reduce((s, i) => s + (i.fatalities || 0), 0);
  document.getElementById('stat-injuries').textContent = f.reduce((s, i) => s + (i.injuries || 0), 0);
  document.getElementById('stat-evacuations').textContent = f.reduce((s, i) => s + (i.displaced_temp || 0), 0).toLocaleString();
  // Total confirmed damage
  let totalDamage = 0;
  f.forEach(inc => {
    if (inc.infrastructure_damage?.adjusted) totalDamage += inc.infrastructure_damage.adjusted;
    if (inc.cleanup_cost?.adjusted && inc.cleanup_cost.adjusted !== inc.infrastructure_damage?.adjusted) totalDamage += inc.cleanup_cost.adjusted;
  });
  const dmgEl = document.getElementById('stat-damage');
  if (dmgEl) dmgEl.textContent = totalDamage > 0 ? '$' + formatBigNum(totalDamage) : '—';
}

function formatBigNum(n) {
  if (n >= 1e12) return (n/1e12).toFixed(1) + 'T';
  if (n >= 1e9)  return (n/1e9).toFixed(1) + 'B';
  if (n >= 1e6)  return (n/1e6).toFixed(0) + 'M';
  return n.toLocaleString();
}

function updateFacilityCounts() {
  Object.keys(FACILITY_CONFIG).forEach(key => {
    const el = document.getElementById(`fac-count-${key}`);
    if (el) el.textContent = state.filtered.filter(i => i.facility_type === key).length;
  });
}

// ── INCIDENT LIST ─────────────────────────────────────────
function renderList() {
  const list = document.getElementById('incident-list');
  const countEl = document.getElementById('incident-count-label');
  countEl.innerHTML = `Showing <span>${state.filtered.length}</span> of ${state.incidents.length} incidents`;
  list.innerHTML = '';
  if (state.filtered.length === 0) {
    list.innerHTML = `<div style="padding:20px;text-align:center;font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">NO INCIDENTS MATCH FILTERS</div>`;
    return;
  }
  state.filtered.forEach(inc => {
    const causeCfg = CAUSE_CONFIG[inc.cause] || {};
    const facCfg = FACILITY_CONFIG[inc.facility_type] || {};
    const sevCfg = SEVERITY_CONFIG[inc.severity] || {};
    const card = document.createElement('div');
    card.className = `incident-card${state.selectedId === inc.id ? ' selected' : ''}`;
    card.dataset.id = inc.id;
    card.style.setProperty('--cause-color', causeCfg.color || '#555');
    const xrefs = [];
    if (inc.csb_investigated) xrefs.push('CSB');
    if (inc.epa_rmp) xrefs.push('EPA');
    if (inc.spilltracker_listed) xrefs.push('SpillTracker');
    if (inc.coalition_listed) xrefs.push('Coalition');
    const hasDamage = inc.infrastructure_damage?.adjusted || inc.cleanup_cost?.adjusted;
    card.innerHTML = `
      <div class="ic-top">
        <div class="ic-name">${inc.name}</div>
        <div class="ic-date">${formatDate(inc.date)}</div>
      </div>
      <div class="ic-meta">
        <span class="ic-tag cause" style="--cause-color:${causeCfg.color}">${causeCfg.label || inc.cause}</span>
        <span class="ic-tag facility">${facCfg.icon || ''} ${facCfg.label || inc.facility_type}</span>
        <span class="ic-tag severity" style="--sev-color:${sevCfg.color}">${sevCfg.label || inc.severity}</span>
      </div>
      <div class="ic-location">📍 ${inc.city}, ${inc.state}${hasDamage ? ` <span style="color:var(--accent-gold);margin-left:6px">💰 ${formatBigNum(inc.infrastructure_damage?.adjusted || inc.cleanup_cost?.adjusted)}</span>` : ''}</div>
      ${xrefs.length ? `<div class="ic-crossref">${xrefs.map(x => `<span class="xref-tag">${x}</span>`).join('')}</div>` : ''}
    `;
    card.addEventListener('click', () => selectIncident(inc.id));
    list.appendChild(card);
  });
}

// ── MARKERS ───────────────────────────────────────────────
function renderMarkers() {
  Object.values(state.markers).forEach(m => map.removeLayer(m));
  state.markers = {};
  state.filtered.forEach(inc => {
    const marker = createMarker(inc);
    marker.addTo(map);
    marker.on('click', () => selectIncident(inc.id));
    state.markers[inc.id] = marker;
  });
}

function createMarker(inc) {
  const causeCfg = CAUSE_CONFIG[inc.cause] || { color: '#888' };
  const facCfg = FACILITY_CONFIG[inc.facility_type] || { shape: 'circle' };
  const color = causeCfg.color;
  const shape = facCfg.shape;
  const size = inc.severity === 'catastrophic' ? 18 : inc.severity === 'major' ? 14 : 10;
  const svg = getShapeSVG(shape, color, size);
  const icon = L.divIcon({ html: svg, className: '', iconSize: [size+4, size+4], iconAnchor: [(size+4)/2, (size+4)/2], popupAnchor: [0, -(size+4)/2] });
  const marker = L.marker([inc.lat, inc.lng], { icon });
  marker.bindTooltip(`
    <div style="font-family:var(--font-mono);font-size:11px;">
      <strong>${inc.name}</strong><br>
      <span style="color:${color}">${CAUSE_CONFIG[inc.cause]?.label || inc.cause}</span> · ${inc.city}, ${inc.state}<br>
      <span style="color:#888">${formatDate(inc.date)}</span>
    </div>
  `, { sticky: true });
  return marker;
}

function getShapeSVG(shape, color, size) {
  const s = size + 4; const c = s / 2; const stroke = '#0a0c0f';
  switch (shape) {
    case 'circle':
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><circle cx="${c}" cy="${c}" r="${c-2}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    case 'square':
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="${s-4}" height="${s-4}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    case 'diamond':
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${c},2 ${s-2},${c} ${c},${s-2} 2,${c}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    case 'triangle':
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${c},2 ${s-2},${s-2} 2,${s-2}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    case 'pentagon': {
      const pts = Array.from({length:5},(_,i)=>{ const a=(i*72-90)*Math.PI/180; return `${c+(c-2)*Math.cos(a)},${c+(c-2)*Math.sin(a)}`; }).join(' ');
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    }
    case 'hexagon': {
      const pts = Array.from({length:6},(_,i)=>{ const a=(i*60-90)*Math.PI/180; return `${c+(c-2)*Math.cos(a)},${c+(c-2)*Math.sin(a)}`; }).join(' ');
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    }
    case 'star': {
      const pts = Array.from({length:10},(_,i)=>{ const a=(i*36-90)*Math.PI/180; const r2=i%2===0?c-2:(c-2)*0.5; return `${c+r2*Math.cos(a)},${c+r2*Math.sin(a)}`; }).join(' ');
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    }
    case 'cross': {
      const t=Math.round(s*0.28); const t2=Math.round(s*0.72);
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${t},2 ${t2},2 ${t2},${t} ${s-2},${t} ${s-2},${t2} ${t2},${t2} ${t2},${s-2} ${t},${s-2} ${t},${t2} 2,${t2} 2,${t} ${t},${t}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    }
    case 'lightning': {
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><polygon points="${c},2 ${Math.round(c*0.5)},${c} ${c},${c} ${Math.round(c*0.7)},${s-2} ${s-2},${c} ${c+2},${c}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
    }
    default:
      return `<svg width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg"><circle cx="${c}" cy="${c}" r="${c-2}" fill="${color}" stroke="${stroke}" stroke-width="1.5"/></svg>`;
  }
}

// ── SELECT INCIDENT ───────────────────────────────────────
function selectIncident(id) {
  state.selectedId = id;
  const inc = state.incidents.find(i => i.id === id);
  if (!inc) return;
  document.querySelectorAll('.incident-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
  const card = document.querySelector(`.incident-card[data-id="${id}"]`);
  if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  map.flyTo([inc.lat, inc.lng], 9, { duration: 1 });
  openDetailPanel(inc);
}

// ── DETAIL PANEL ──────────────────────────────────────────
function openDetailPanel(inc) {
  const panel = document.getElementById('detail-panel');
  const causeCfg = CAUSE_CONFIG[inc.cause] || {};
  const facCfg = FACILITY_CONFIG[inc.facility_type] || {};
  const sevCfg = SEVERITY_CONFIG[inc.severity] || {};
  document.getElementById('dp-title').textContent = inc.name;

  const xrefs = [
    { label: 'CSB Investigated', val: inc.csb_investigated },
    { label: 'EPA RMP Filed',    val: inc.epa_rmp },
    { label: 'SpillTracker',     val: inc.spilltracker_listed },
    { label: 'Coalition',        val: inc.coalition_listed },
  ];

  const permDisp = inc.displaced_perm > 0
    ? `<div class="dp-stat"><div class="dp-stat-val" style="color:var(--cause-intentional)">${inc.displaced_perm.toLocaleString()}</div><div class="dp-stat-label">Perm. Displaced</div></div>`
    : '';

  const financialHTML = buildFinancialRows(inc);

  document.getElementById('dp-body').innerHTML = `
    <div class="dp-row">
      <span class="dp-badge" style="border-color:${causeCfg.color};color:${causeCfg.color}">${causeCfg.label || inc.cause}</span>
      <span class="dp-badge" style="border-color:${sevCfg.color};color:${sevCfg.color}">${sevCfg.label || inc.severity}</span>
    </div>
    <div class="dp-row">
      <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">
        ${facCfg.icon || ''} ${facCfg.label || inc.facility_type} · 📍 ${inc.city}, ${inc.state} · 📅 ${formatDate(inc.date)}
      </span>
    </div>

    <div class="dp-stat-grid">
      <div class="dp-stat"><div class="dp-stat-val fatal">${inc.fatalities}</div><div class="dp-stat-label">Fatalities</div></div>
      <div class="dp-stat"><div class="dp-stat-val injured">${inc.injuries}</div><div class="dp-stat-label">Injuries</div></div>
      <div class="dp-stat"><div class="dp-stat-val">${inc.displaced_temp ? inc.displaced_temp.toLocaleString() : '—'}</div><div class="dp-stat-label">Temp. Displaced</div></div>
      ${permDisp}
    </div>

    ${financialHTML}

    <div class="dp-section-title">Cause Detail</div>
    <p class="dp-desc" style="margin-bottom:10px">${inc.cause_detail}</p>

    <div class="dp-section-title">Summary</div>
    <p class="dp-desc">${inc.description}</p>

    <div class="dp-section-title">Cross-Reference</div>
    <div class="dp-crossref">
      ${xrefs.map(x => `<span class="dp-xref-item ${x.val?'tracked':''}">${x.val?'✓':'✗'} ${x.label}</span>`).join('')}
    </div>

    <div class="dp-section-title">News Articles</div>
    <div id="dp-articles"><div class="article-loading"><span class="spinner"></span> Fetching articles...</div></div>
  `;

  panel.classList.add('open');
  fetchArticles(inc);
}

function buildFinancialRows(inc) {
  const rows = [
    { label: 'Cleanup / Remediation', field: inc.cleanup_cost },
    { label: 'Infrastructure Damage', field: inc.infrastructure_damage },
    { label: 'Economic Impact',       field: inc.economic_impact },
  ];

  const hasAny = rows.some(r => r.field?.amount !== null && r.field?.amount !== undefined);
  if (!hasAny) return '';

  return `
    <div class="dp-section-title">Financial Impact</div>
    <div class="dp-financial">
      ${rows.map(r => {
        const f = r.field;
        if (!f || f.amount === null || f.amount === undefined) {
          return `
            <div class="dp-fin-row">
              <div class="dp-fin-label">${r.label}</div>
              <div class="dp-fin-value unknown">—</div>
              <div class="dp-fin-note"></div>
            </div>`;
        }
        const asReported = '$' + formatBigNum(f.amount);
        const adjusted = f.adjusted && f.adjusted !== f.amount ? ` <span class="dp-fin-adj">(${'\$'}${formatBigNum(f.adjusted)} 2025$)</span>` : '';
        const badge = f.confidence === 'confirmed'
          ? `<span class="dp-fin-badge confirmed">✓ Confirmed</span>`
          : `<span class="dp-fin-badge estimated">~ Estimated</span>`;
        return `
          <div class="dp-fin-row">
            <div class="dp-fin-label">${r.label}</div>
            <div class="dp-fin-value">${asReported}${adjusted} ${badge}</div>
            ${f.note ? `<div class="dp-fin-note">${f.note}</div>` : ''}
          </div>`;
      }).join('')}
    </div>
  `;
}

function closeDetailPanel() {
  document.getElementById('detail-panel').classList.remove('open');
  state.selectedId = null;
  document.querySelectorAll('.incident-card').forEach(c => c.classList.remove('selected'));
}
document.getElementById('dp-close').addEventListener('click', closeDetailPanel);

// ── ARTICLE FETCHING ──────────────────────────────────────
async function fetchArticles(inc) {
  const cacheKey = inc.id;
  if (state.articleCache[cacheKey]) { renderArticles(state.articleCache[cacheKey]); return; }
  const container = document.getElementById('dp-articles');
  if (!container) return;

  const query = encodeURIComponent(`"${inc.name}" OR "${inc.city} ${(inc.facility_type||'').replace(/_/g,' ')} explosion fire leak"`);
  const from = inc.date;
  const to = getDatePlusDays(inc.date, 90);
  const gnewsUrl = `https://gnews.io/api/v4/search?q=${query}&from=${from}&to=${to}&lang=en&country=us&max=10&apikey=${CONFIG.GNEWS_API_KEY}`;

  let articles = [];
  try {
    const res = await fetch(gnewsUrl);
    const data = await res.json();
    articles = (data.articles || []).map(a => ({ title: a.title, url: a.url, source: a.source?.name || 'Unknown', publishedAt: a.publishedAt }));
  } catch (e) { console.warn('GNews fetch failed:', e); }

  if (articles.length > 0) {
    try { articles = await scoreArticlesForBias(articles, inc.name); }
    catch (e) { articles = articles.map(a => ({ ...a, biasScore: 'unscored', biasLabel: 'Unscored' })); }
  } else {
    container.innerHTML = `<div class="article-loading" style="color:var(--text-muted)">No articles found via GNews for this incident.</div>`;
    return;
  }

  const top = articles.slice(0, 5);
  state.articleCache[cacheKey] = top;
  renderArticles(top);
}

async function scoreArticlesForBias(articles, incidentName) {
  const prompt = `You are a media bias analyst. Rate each article about "${incidentName}" for factual neutrality:
- "neutral" = factual, low bias (AP, Reuters, local TV/newspaper, government)
- "slight" = minor bias but informative
- "biased" = significant advocacy framing

Return ONLY a JSON array, no other text:
[{"index":0,"biasScore":"neutral","biasLabel":"Neutral — AP/Reuters style"},...]

Articles:
${articles.map((a,i)=>`${i}. Source: ${a.source} | Title: ${a.title}`).join('\n')}`;

  const response = await fetch(CONFIG.ANTHROPIC_WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
  });
  const data = await response.json();
  const text = data.content?.[0]?.text || '[]';
  const clean = text.replace(/```json|```/g,'').trim();
  let scores = [];
  try { scores = JSON.parse(clean); } catch { return articles; }
  const order = { neutral: 0, slight: 1, biased: 2, unscored: 3 };
  return articles
    .map((a,i) => { const s = scores.find(s=>s.index===i)||{}; return {...a, biasScore: s.biasScore||'unscored', biasLabel: s.biasLabel||'Unscored'}; })
    .sort((a,b) => (order[a.biasScore]||3) - (order[b.biasScore]||3));
}

function renderArticles(articles) {
  const container = document.getElementById('dp-articles');
  if (!container) return;
  if (!articles || !articles.length) {
    container.innerHTML = `<div class="article-loading" style="color:var(--text-muted)">No articles found.</div>`; return;
  }
  container.innerHTML = `<div class="article-list">
    ${articles.map(a=>`
      <div class="article-card">
        <div class="article-source">
          <span>${escapeHtml(a.source)}</span>
          <span class="article-bias-score ${a.biasScore==='neutral'?'neutral':a.biasScore==='slight'?'slight':''}">${a.biasLabel||''}</span>
        </div>
        <div class="article-title"><a href="${escapeHtml(a.url)}" target="_blank" rel="noopener">${escapeHtml(a.title)}</a></div>
        <div class="article-date">${a.publishedAt ? formatDate(a.publishedAt.split('T')[0]) : ''}</div>
      </div>`).join('')}
  </div>`;
}

// ── UTILITIES ─────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y,m,d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
}
function getDatePlusDays(dateStr, days) {
  const d = new Date(dateStr); d.setDate(d.getDate()+days); return d.toISOString().split('T')[0];
}
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
