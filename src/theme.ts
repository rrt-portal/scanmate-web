import type { ThemeId } from './storage'

export type ThemeTokens = {
  id: ThemeId
  accent: string
  accentSoft: string
  accentMuted: string
  bg: string
  bgGlowA: string
  bgGlowB: string
  surface: string
  surfaceStrong: string
  text: string
  textMuted: string
  onAccent: string
  navActiveBg: string
  toastBg: string
}

export const themes: Record<ThemeId, ThemeTokens> = {
  midnight: {
    id: 'midnight',
    accent: '#5CFFB1',
    accentSoft: 'rgba(92, 255, 177, 0.16)',
    accentMuted: 'rgba(92, 255, 177, 0.55)',
    bg: '#050807',
    bgGlowA: 'rgba(18, 72, 52, 0.55)',
    bgGlowB: 'rgba(8, 40, 30, 0.45)',
    surface: 'rgba(18, 28, 24, 0.92)',
    surfaceStrong: 'rgba(12, 20, 17, 0.96)',
    text: '#F4FFFB',
    textMuted: '#8E9A97',
    onAccent: '#06120C',
    navActiveBg: 'rgba(28, 68, 50, 0.75)',
    toastBg: 'rgba(14, 22, 19, 0.94)',
  },
  ocean: {
    id: 'ocean',
    accent: '#5CD1F1',
    accentSoft: 'rgba(92, 209, 241, 0.16)',
    accentMuted: 'rgba(92, 209, 241, 0.55)',
    bg: '#070B12',
    bgGlowA: 'rgba(18, 48, 78, 0.55)',
    bgGlowB: 'rgba(10, 28, 48, 0.45)',
    surface: 'rgba(16, 28, 40, 0.92)',
    surfaceStrong: 'rgba(10, 18, 28, 0.96)',
    text: '#F2F8FF',
    textMuted: '#8FA3B5',
    onAccent: '#061018',
    navActiveBg: 'rgba(24, 52, 72, 0.75)',
    toastBg: 'rgba(12, 20, 30, 0.94)',
  },
  ember: {
    id: 'ember',
    accent: '#FFB05C',
    accentSoft: 'rgba(255, 176, 92, 0.16)',
    accentMuted: 'rgba(255, 176, 92, 0.55)',
    bg: '#0B0805',
    bgGlowA: 'rgba(78, 42, 12, 0.55)',
    bgGlowB: 'rgba(48, 24, 8, 0.45)',
    surface: 'rgba(32, 22, 14, 0.92)',
    surfaceStrong: 'rgba(20, 14, 10, 0.96)',
    text: '#FFF8F0',
    textMuted: '#A89A8E',
    onAccent: '#180E06',
    navActiveBg: 'rgba(72, 42, 18, 0.75)',
    toastBg: 'rgba(22, 16, 12, 0.94)',
  },
}

export function applyTheme(theme: ThemeTokens): void {
  const root = document.documentElement
  root.dataset.theme = theme.id
  root.style.setProperty('--accent', theme.accent)
  root.style.setProperty('--accent-soft', theme.accentSoft)
  root.style.setProperty('--accent-muted', theme.accentMuted)
  root.style.setProperty('--bg', theme.bg)
  root.style.setProperty('--bg-glow-a', theme.bgGlowA)
  root.style.setProperty('--bg-glow-b', theme.bgGlowB)
  root.style.setProperty('--surface', theme.surface)
  root.style.setProperty('--surface-strong', theme.surfaceStrong)
  root.style.setProperty('--text', theme.text)
  root.style.setProperty('--text-muted', theme.textMuted)
  root.style.setProperty('--on-accent', theme.onAccent)
  root.style.setProperty('--nav-active-bg', theme.navActiveBg)
  root.style.setProperty('--toast-bg', theme.toastBg)
}
