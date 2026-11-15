# ScanMate Web

Browser preview of ScanMate — dark mint OCR companion UI.

## Stack

- Vite + React + TypeScript
- `tesseract.js` OCR (`eng+rus`)
- IndexedDB history (max 50) + `localStorage` settings
- Preview billing / demo ads (no Play Billing, no AdMob network)
- Vitest + ESLint + Prettier + GitHub Actions CI
- Default language: Russian

## Stage 3 (product)

- Mock Pro at `$2.99` (Buy / Restore via `localStorage`)
- Free scan limit 5 → paywall dialog; Pro unlimited
- 3 free + 4 Pro themes (lock → paywall)
- Demo banner ads on Home/History; interstitial every 3rd scan (2 min cap)
- Consent dialog; Privacy / Terms / About pages

## Stage 4 (quality)

- Vitest unit tests for `parseText`, storage, history store, monetization helpers
- Light component smoke (Consent dialog)
- ESLint + Prettier + oxlint
- GitHub Actions: lint + format check + test + build

## Run

```bash
npm install --legacy-peer-deps
npm run dev
```

Opens at `http://127.0.0.1:5173/`.

## Testing

```bash
npm test              # Vitest (happy-dom)
npm run test:watch    # watch mode
npm run lint          # ESLint + oxlint
npm run format        # Prettier write
npm run format:check  # Prettier check
npm run build         # tsc + Vite production build
```

CI runs the same gate on pushes/PRs to `main` (see `.github/workflows/ci.yml`).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
