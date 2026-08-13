// ============================================================
// FAILURE WATCH — CONFIG
// Idaho Fidelity Foundation
// ============================================================
// Never commit live keys. Load GNews from a Worker secret or
// replace the placeholder locally (do not push it).

const CONFIG = {
  GNEWS_API_KEY: "YOUR_GNEWS_API_KEY",
  ANTHROPIC_WORKER_URL: "https://iff-incident-proxy.thisisntmyspammail.workers.dev",

  // GNews search settings
  GNEWS_MAX_ARTICLES: 5,
  GNEWS_LANG: "en",
  GNEWS_COUNTRY: "us",

  // How many years back to show by default
  DEFAULT_YEAR_RANGE: 16,

  // Branding
  SITE_NAME: "Failure Watch",
  ORG_NAME: "Idaho Fidelity Foundation",
  ORG_URL: "http://idahofidelity.com",
};