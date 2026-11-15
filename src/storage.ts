export const KEYS = {
  onboarded: 'scanmate.onboarded',
  lang: 'scanmate.lang',
  theme: 'scanmate.theme',
} as const

export type Lang = 'ru' | 'en'
export type ThemeId = 'midnight' | 'ocean' | 'ember'

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
