# Changelog

All notable changes to ScanMate Web are documented here.

## [1.0.0] — 2026-11-15

### Added

- Hosted legal pages under `public/legal/` (privacy + terms, EN/RU) for Play / App Store listing URLs
- GitHub Pages workflow deploying `public/legal`
- Release notes (`docs/release-notes-1.0.0.md`) and publish section in README
- Stage 1–4 product + quality baseline: OCR preview, history, mock Pro, demo ads, Vitest/CI

### Notes

- Web billing/ads remain **preview mocks** (not Play Billing / live AdMob)
- OCR runs in-browser via Tesseract.js (`eng+rus`)

## [0.4.0] — 2026-11-15

- Stage 4: Vitest, ESLint/Prettier, GitHub Actions CI

## [0.3.0] — 2026-11-15

- Stage 3: mock Pro, scan limit, demo ads, Pro themes, consent/legal in-app

## [0.2.0] — 2026-11-15

- Stage 2: OCR, smart actions, IndexedDB history

## [0.1.0] — 2026-11-15

- Stage 1: onboarding, empty states, themes, paywall stub
