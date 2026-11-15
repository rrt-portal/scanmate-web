# Contributing to ScanMate Web

Thanks for helping with the ScanMate browser preview.

## Setup

```bash
npm install --legacy-peer-deps
npm run dev
```

App: `http://127.0.0.1:5173/`.

Use `--legacy-peer-deps` because the toolchain pins TypeScript 7 while `typescript-eslint` still declares a narrower peer range.

## Workflow

1. Branch from `main` (or work on `main` for Stage agents as assigned).
2. Keep Stage 3 product behavior intact unless the task explicitly changes UX.
3. Add/adjust Vitest coverage for parse/store/view-model logic when changing those areas.
4. Run the full local CI gate before pushing:

```bash
npm run lint
npm run format:check
npm test
npm run build
```

5. Prefer focused commits. Stage release commits use the Russian `Этап N: …` style already on `main`.

## Code style

- TypeScript + React function components
- Prettier is the formatter (`npm run format`)
- ESLint (+ oxlint) must stay clean
- No Google Fonts CDN; prefer system fonts
- Preview billing/ads stay mocked — do not wire real Play Billing / AdMob here

## Tests

See **Testing** in `README.md`. Unit tests live next to sources as `*.test.ts(x)`.
