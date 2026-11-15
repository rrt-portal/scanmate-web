# ScanMate Web

Browser preview of ScanMate — dark mint OCR companion UI.

## Stack

- Vite + React + TypeScript
- `tesseract.js` OCR (`eng+rus`)
- IndexedDB history (max 50) + `localStorage` settings
- Default language: Russian

## Stage 2

- Image picker (`accept=image/*`) → preview → OCR with progress / retry
- `parseTextUseCase` extracts phone / URL / address
- Result: selectable text, expand, smart links (`tel:` / `https:` / Maps), Web Share
- History cards, detail sheet, delete / clear all, auto-delete days
- System fonts only (no Google Fonts CDN)

## Run

```bash
npm install
npm run dev
```

Opens at `http://127.0.0.1:5173/`.
