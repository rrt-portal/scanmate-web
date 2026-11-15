# ScanMate Web

Browser preview of ScanMate — dark mint OCR companion UI.

**Release:** [v1.0.0](./docs/release-notes-1.0.0.md) · [CHANGELOG](./CHANGELOG.md)

## Stack

- Vite + React + TypeScript
- `tesseract.js` OCR (`eng+rus`)
- IndexedDB history (max 50) + `localStorage` settings
- Preview billing / demo ads (no Play Billing, no AdMob network)
- Vitest + ESLint + Prettier + GitHub Actions CI
- Default language: Russian

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

## Publish / store listing

| Resource                    | URL / path                                                     |
| --------------------------- | -------------------------------------------------------------- |
| Web preview (Cursor)        | https://scanmate.apps.grok.bot                                 |
| Legal index (GitHub Pages)  | https://rrt-portal.github.io/scanmate-web/                     |
| Privacy (EN)                | https://rrt-portal.github.io/scanmate-web/privacy.html         |
| Terms (EN)                  | https://rrt-portal.github.io/scanmate-web/terms.html           |
| Privacy (RU)                | https://rrt-portal.github.io/scanmate-web/privacy.ru.html      |
| Terms (RU)                  | https://rrt-portal.github.io/scanmate-web/terms.ru.html        |
| In-app / Vite static copies | `/legal/` from `public/legal/`                                 |
| Store listing pointers      | [docs/store_listing/README.md](./docs/store_listing/README.md) |
| Android listing pack        | Link when present: sibling `docs/store_listing/` (Android)     |
| iOS listing pack            | Link when present: sibling `docs/store_listing/` (iOS)         |

Legal HTML is deployed by `.github/workflows/pages.yml` (GitHub Pages from `public/legal`). Use those URLs in Play Console / App Store Connect. Replace placeholder support emails before production.

Release notes: [docs/release-notes-1.0.0.md](./docs/release-notes-1.0.0.md).

## Stages (summary)

1. Onboarding, empty states, themes, paywall stub
2. OCR, smart actions, history
3. Mock Pro, limits, demo ads, consent
4. Tests + CI
5. Legal Pages + 1.0.0 release docs

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
