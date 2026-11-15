export const KEYS = {
  onboarded: 'scanmate.onboarded',
  lang: 'scanmate.lang',
  theme: 'scanmate.theme',
  historyEnabled: 'scanmate.historyEnabled',
  autoDeleteDays: 'scanmate.autoDeleteDays',
} as const

export type Lang = 'ru' | 'en'
export type ThemeId = 'midnight' | 'ocean' | 'ember'
export type AutoDeleteDays = 0 | 7 | 30 | 90

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
  const v = localStorage.getItem(KEYS.theme)
  if (v === 'ocean' || v === 'ember' || v === 'midnight') return v
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
