export const KEYS = {
  onboarded: 'scanmate.onboarded',
  lang: 'scanmate.lang',
  theme: 'scanmate.theme',
  historyEnabled: 'scanmate.historyEnabled',
  autoDeleteDays: 'scanmate.autoDeleteDays',
  isPro: 'scanmate.isPro',
  scanCount: 'scanmate.scanCount',
  consent: 'scanmate.consent',
  lastInterstitialAt: 'scanmate.lastInterstitialAt',
} as const

export type Lang = 'ru' | 'en'
export type ThemeId =
  | 'midnight'
  | 'ocean'
  | 'ember'
  | 'aurora'
  | 'violet'
  | 'rose'
  | 'slate'
export type AutoDeleteDays = 0 | 7 | 30 | 90

export const FREE_THEMES: ThemeId[] = ['midnight', 'ocean', 'ember']
export const PRO_THEMES: ThemeId[] = ['aurora', 'violet', 'rose', 'slate']
export const ALL_THEMES: ThemeId[] = [...FREE_THEMES, ...PRO_THEMES]

export function isThemeFree(id: ThemeId): boolean {
  return FREE_THEMES.includes(id)
}

export function readOnboarded(): boolean {
  return localStorage.getItem(KEYS.onboarded) === '1'
}

export function writeOnboarded(): void {
  localStorage.setItem(KEYS.onboarded, '1')
}

export function readLang(): Lang {
  const v = localStorage.getItem(KEYS.lang)
  return v === 'en' ? 'en' : 'ru'
}

export function writeLang(lang: Lang): void {
  localStorage.setItem(KEYS.lang, lang)
}

export function readTheme(): ThemeId {
  const v = localStorage.getItem(KEYS.theme) as ThemeId | null
  if (v && ALL_THEMES.includes(v)) return v
  return 'midnight'
}

export function writeTheme(theme: ThemeId): void {
  localStorage.setItem(KEYS.theme, theme)
}

export function readHistoryEnabled(): boolean {
  const v = localStorage.getItem(KEYS.historyEnabled)
  return v === null ? true : v === '1'
}

export function writeHistoryEnabled(enabled: boolean): void {
  localStorage.setItem(KEYS.historyEnabled, enabled ? '1' : '0')
}

export function readAutoDeleteDays(): AutoDeleteDays {
  const n = Number(localStorage.getItem(KEYS.autoDeleteDays))
  if (n === 7 || n === 30 || n === 90 || n === 0) return n
  return 30
}

export function writeAutoDeleteDays(days: AutoDeleteDays): void {
  localStorage.setItem(KEYS.autoDeleteDays, String(days))
}

export function readIsPro(): boolean {
  return localStorage.getItem(KEYS.isPro) === '1'
}

export function writeIsPro(isPro: boolean): void {
  localStorage.setItem(KEYS.isPro, isPro ? '1' : '0')
}

export function readScanCount(): number {
  const n = Number(localStorage.getItem(KEYS.scanCount))
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}

export function writeScanCount(count: number): void {
  localStorage.setItem(KEYS.scanCount, String(Math.max(0, Math.floor(count))))
}

export function incrementScanCount(): number {
  const next = readScanCount() + 1
  writeScanCount(next)
  return next
}

export function readConsent(): boolean {
  return localStorage.getItem(KEYS.consent) === '1'
}

export function writeConsent(): void {
  localStorage.setItem(KEYS.consent, '1')
}

export function readLastInterstitialAt(): number {
  const n = Number(localStorage.getItem(KEYS.lastInterstitialAt))
  return Number.isFinite(n) ? n : 0
}

export function writeLastInterstitialAt(ts: number): void {
  localStorage.setItem(KEYS.lastInterstitialAt, String(ts))
}
