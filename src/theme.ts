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
  swatch: string
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
    swatch: 'linear-gradient(135deg, #0a0f0d, #5CFFB1)',
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
    swatch: 'linear-gradient(135deg, #0a121c, #5CD1F1)',
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
    swatch: 'linear-gradient(135deg, #140e08, #FFB05C)',
  },
  aurora: {
    id: 'aurora',
    accent: '#7DFFB0',
    accentSoft: 'rgba(125, 255, 176, 0.16)',
    accentMuted: 'rgba(125, 255, 176, 0.55)',
    bg: '#040A12',
    bgGlowA: 'rgba(20, 90, 90, 0.5)',
    bgGlowB: 'rgba(40, 30, 90, 0.4)',
    surface: 'rgba(14, 28, 34, 0.92)',
    surfaceStrong: 'rgba(8, 18, 24, 0.96)',
    text: '#EEFFF8',
    textMuted: '#8DA8A0',
    onAccent: '#04120C',
    navActiveBg: 'rgba(24, 64, 56, 0.75)',
    toastBg: 'rgba(10, 22, 24, 0.94)',
    swatch: 'linear-gradient(135deg, #0a2030, #7DFFB0 50%, #8B7DFF)',
  },
  violet: {
    id: 'violet',
    accent: '#C4A1FF',
    accentSoft: 'rgba(196, 161, 255, 0.16)',
    accentMuted: 'rgba(196, 161, 255, 0.55)',
    bg: '#0A0712',
    bgGlowA: 'rgba(60, 30, 100, 0.5)',
    bgGlowB: 'rgba(30, 16, 60, 0.45)',
    surface: 'rgba(28, 20, 42, 0.92)',
    surfaceStrong: 'rgba(18, 12, 30, 0.96)',
    text: '#F6F1FF',
    textMuted: '#A79ABA',
    onAccent: '#140C22',
    navActiveBg: 'rgba(52, 36, 80, 0.75)',
    toastBg: 'rgba(18, 12, 28, 0.94)',
    swatch: 'linear-gradient(135deg, #120a1c, #C4A1FF)',
  },
  rose: {
    id: 'rose',
    accent: '#FF8FB5',
    accentSoft: 'rgba(255, 143, 181, 0.16)',
    accentMuted: 'rgba(255, 143, 181, 0.55)',
    bg: '#10070C',
    bgGlowA: 'rgba(90, 30, 50, 0.5)',
    bgGlowB: 'rgba(50, 16, 30, 0.45)',
    surface: 'rgba(36, 18, 26, 0.92)',
    surfaceStrong: 'rgba(24, 12, 18, 0.96)',
    text: '#FFF0F5',
    textMuted: '#B898A4',
    onAccent: '#1A0A10',
    navActiveBg: 'rgba(72, 30, 46, 0.75)',
    toastBg: 'rgba(24, 12, 18, 0.94)',
    swatch: 'linear-gradient(135deg, #18080f, #FF8FB5)',
  },
  slate: {
    id: 'slate',
    accent: '#9EB4C8',
    accentSoft: 'rgba(158, 180, 200, 0.16)',
    accentMuted: 'rgba(158, 180, 200, 0.55)',
    bg: '#0A0C10',
    bgGlowA: 'rgba(40, 50, 64, 0.5)',
    bgGlowB: 'rgba(24, 30, 40, 0.45)',
    surface: 'rgba(24, 28, 34, 0.92)',
    surfaceStrong: 'rgba(16, 18, 22, 0.96)',
    text: '#EEF3F8',
    textMuted: '#94A0AC',
    onAccent: '#0C1016',
    navActiveBg: 'rgba(40, 48, 58, 0.75)',
    toastBg: 'rgba(16, 20, 26, 0.94)',
    swatch: 'linear-gradient(135deg, #10141a, #9EB4C8)',
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
