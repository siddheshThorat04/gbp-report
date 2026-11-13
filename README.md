# GBP Health (Business Profile Health)

A free tool: the visitor types their business name, picks it from Google, and gets a 0 to 100 profile health score with a
breakdown of what to fix. Same stack as `mmore-audit`: Vite + React on Vercel, with `/api` forwarded to Frappe.

## How it works
1. `audit_search_places` (existing Frappe script, shared with the audit app) finds the business: `{q}` -> `[{place_id, name, address}]`.
2. `gbp_health_report` (new Frappe Server Script, already created) fetches the profile, the 5 latest reviews, the photo count,
   attributes, opening hours and up to 15 nearby competitors from the Places API (New): `{place_id}` -> raw data.
3. `src/score.js` turns that raw data into the score. All thresholds are in `CONFIG` at the top of that file.

Only public Places data is used (no Google Business Profile API, no owner login). Because of that:
- GBP posts and the services link are **not scored** (listed under "Not scored"); the total is scaled to 100 over what is measured.
- Review velocity and consistency use only the 5 most recent reviews Google returns.
- The photo count is capped at 10 (Google returns at most 10).
- Keyword presence is judged from the business name and category.

## Search as you type
The business box is Google's Places Autocomplete widget, same as the audit app. It needs a **browser** Maps key:
- Create/reuse a key with **Maps JavaScript API** and **Places API (New)** enabled, restricted by HTTP referrer to your site
  (and `localhost` for development).
- Set it as `VITE_GOOGLE_MAPS_KEY` in Vercel (Project Settings -> Environment Variables) and in a local `.env`, then redeploy.
- Without the key the app still works: it falls back to a plain name search (the `audit_search_places` script).

## Run locally
```
npm install
npm run dev            # live: /api is proxied to app.mmore.works
VITE_USE_MOCK=true npm run dev   # sample data, no backend needed
npm test               # checks for the scoring rules
```

## Deploy (Vercel)
1. Push this folder to a new GitHub repo.
2. Vercel -> Add New Project -> import the repo. Framework preset: Vite (build `npm run build`, output `dist`). No env vars needed.
3. `vercel.json` already forwards `/api/*` to `https://app.mmore.works/api/*` and serves `index.html` for every route.

## Backend notes
- Server Script `gbp_health_report` is public (`allow_guest`) and rate limited to 20 calls per hour per IP (Server Script settings).
- It reuses the Places API key in **Audit Settings** (`google_places_api_key`, and the `enabled` switch).
- Place Details with reviews and attributes is billed on Google's higher Places tiers. Check your Places pricing before promoting the tool.
- Errors are logged under **Error Log** with titles starting `gbp_health_report:`.
