# ScanMate Web

Browser preview of ScanMate — dark mint OCR companion UI.

## Stack

- Vite + React + TypeScript
- `tesseract.js` OCR (`eng+rus`)
- IndexedDB history (max 50) + `localStorage` settings
- Preview billing / demo ads (no Play Billing, no AdMob network)
- Default language: Russian

## Stage 3

- Mock Pro at `$2.99` (Buy / Restore via `localStorage.isPro`)
- Free scan limit 5 → paywall dialog; Pro unlimited
- 3 free + 4 Pro themes (lock → paywall)
- Demo banner ads on Home/History; interstitial every 3rd scan (2 min cap)
- Consent dialog; Privacy / Terms / About pages
- Clear “preview billing” messaging

## Run

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:5173/`.
