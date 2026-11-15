# ScanMate Web

Stage 1 browser preview of ScanMate — dark mint OCR companion UI.

## Stack

- Vite + React + TypeScript
- `localStorage` for onboarding, language, and theme
- Default language: Russian

## Screens

- Onboarding (3 slides + Skip/Start)
- Home empty state + screenshot picker stub (toast)
- History empty state
- Settings: Midnight / Ocean / Ember themes, ru/en, Buy Pro
- Paywall stub (Buy / Restore → toast)

## Run

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:5173/`.
