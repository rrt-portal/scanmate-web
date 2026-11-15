import { FREE_SCAN_LIMIT, INTERSTITIAL_COOLDOWN_MS, INTERSTITIAL_EVERY } from '../billing'

/** Pure helpers for Stage 3 monetization UX (testable view-model logic). */

export function scansRemaining(isPro: boolean, scanCount: number, limit = FREE_SCAN_LIMIT): number {
  if (isPro) return Number.POSITIVE_INFINITY
  return Math.max(0, limit - Math.max(0, scanCount))
}

export function canFreeScan(isPro: boolean, scanCount: number, limit = FREE_SCAN_LIMIT): boolean {
  return isPro || scanCount < limit
}

export function shouldShowInterstitial(opts: {
  isPro: boolean
  scanCount: number
  lastInterstitialAt: number
  now?: number
  every?: number
  cooldownMs?: number
}): boolean {
  const {
    isPro,
    scanCount,
    lastInterstitialAt,
    now = Date.now(),
    every = INTERSTITIAL_EVERY,
    cooldownMs = INTERSTITIAL_COOLDOWN_MS,
  } = opts
  if (isPro) return false
  if (scanCount <= 0 || scanCount % every !== 0) return false
  return now - lastInterstitialAt >= cooldownMs
}
