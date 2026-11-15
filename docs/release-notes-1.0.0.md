# ScanMate Web 1.0.0 — Release notes

**Date:** 2026-11-15  
**Tag:** `v1.0.0`  
**Repo:** https://github.com/rrt-portal/scanmate-web  
**Preview app:** https://scanmate.apps.grok.bot

## Highlights

- Browser OCR preview (Tesseract.js, Russian default UI)
- Smart actions from parsed text (phone / URL / address)
- Local history (IndexedDB), settings, consent
- Preview Pro monetization ($2.99 mock), free scan limit, demo ads, Pro themes
- CI: lint + format + tests + build
- **Public legal pages** for store listings (Privacy / Terms, EN + RU)

## Legal URLs (Play Console / App Store Connect)

**Live now** (published web preview — use these until GitHub Pages is enabled by a repo admin):

- Privacy (EN): `https://scanmate.apps.grok.bot/legal/privacy.html`
- Privacy (RU): `https://scanmate.apps.grok.bot/legal/privacy.ru.html`
- Terms (EN): `https://scanmate.apps.grok.bot/legal/terms.html`
- Terms (RU): `https://scanmate.apps.grok.bot/legal/terms.ru.html`
- Index: `https://scanmate.apps.grok.bot/legal/`

**GitHub Pages** (workflow `.github/workflows/pages.yml` is ready; enable **Settings → Pages → Source: GitHub Actions** once):

- `https://rrt-portal.github.io/scanmate-web/` (+ `privacy.html` / `terms.html` / RU variants)

## Out of scope for 1.0.0 web

- Real Google Play Billing / App Store charges in the browser
- Live AdMob network calls (demo placeholders only)
