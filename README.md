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

| Resource                           | URL / path                                                     |
| ---------------------------------- | -------------------------------------------------------------- |
| Web preview (Cursor)               | https://scanmate.apps.grok.bot                                 |
| **Legal (live for Play)**          | https://scanmate.apps.grok.bot/legal/                          |
| Privacy (EN, live)                 | https://scanmate.apps.grok.bot/legal/privacy.html              |
| Terms (EN, live)                   | https://scanmate.apps.grok.bot/legal/terms.html                |
| Privacy (RU, live)                 | https://scanmate.apps.grok.bot/legal/privacy.ru.html           |
| Terms (RU, live)                   | https://scanmate.apps.grok.bot/legal/terms.ru.html             |
| Legal (GitHub Pages, after enable) | https://rrt-portal.github.io/scanmate-web/                     |
| Static sources                     | `public/legal/`                                                |
| Store listing pointers             | [docs/store_listing/README.md](./docs/store_listing/README.md) |
| Android listing pack               | When present: sibling `docs/store_listing/` (Android)          |
| iOS listing pack                   | When present: sibling `docs/store_listing/` (iOS)              |

Legal HTML ships in `public/legal/` and is republished with the web preview for immediate store URLs. `.github/workflows/pages.yml` deploys the same folder to GitHub Pages once a repo admin sets **Pages → Source: GitHub Actions** (API enable returned 403 for this token). Replace placeholder support emails before production.

Release notes: [docs/release-notes-1.0.0.md](./docs/release-notes-1.0.0.md).

## Stages (summary)

1. Onboarding, empty states, themes, paywall stub
2. OCR, smart actions, history
3. Mock Pro, limits, demo ads, consent
4. Tests + CI
5. Legal Pages + 1.0.0 release docs

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
