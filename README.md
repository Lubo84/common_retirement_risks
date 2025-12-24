# Hostplus Retirement Toolkit (static GitHub Pages build)

This repo is a **static, client-side** web app you can host on **GitHub Pages**.
It bundles three member-friendly experiences we discussed:

1. **Retirement Snapshot** (3–4 min quiz) → personalised “next best actions” + micro‑modules
2. **Risk Radar** → pick your top retirement risks, get plain‑English guidance, and optional curated “Ask AI”
3. **Drawdown Guide** → helps a pension member pick a payment amount and see trade‑offs

## Quick start (local)
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
1. Create a GitHub repo, e.g. `retirement-toolkit`
2. Push this code to `main`
3. In GitHub repo settings → Pages:
   - Build & deployment: **GitHub Actions**
4. This repo includes a workflow: `.github/workflows/deploy.yml`

### Important: set the correct base path
If your Pages URL is `https://<user>.github.io/<repo>/`, you must set the base path at build time.
The workflow already does this for you using `VITE_REPO_BASE`.

If you build locally for that same URL:
```bash
VITE_REPO_BASE="/<repo>/" npm run build
```

## Optional: “Ask AI” in Risk Radar
By default, the in-app chat is **rule-based** and stays on-topic.
If you want it powered by an LLM:
- Use a serverless proxy (recommended) so you **don’t expose keys in the browser**
- See `server/README.md` for a minimal Node proxy you can run locally (not for GitHub Pages)

## Compliance note
This is general information only. It’s not personal advice and doesn’t take account of objectives,
financial situation, or needs. Users should consider their circumstances and seek advice if needed.
