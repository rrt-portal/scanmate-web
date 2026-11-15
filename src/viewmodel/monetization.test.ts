import { describe, expect, it } from 'vitest'
import { FREE_SCAN_LIMIT, INTERSTITIAL_COOLDOWN_MS } from '../billing'
import { canFreeScan, scansRemaining, shouldShowInterstitial } from './monetization'

describe('monetization view-model', () => {
  it('allows unlimited remaining for Pro', () => {
    expect(scansRemaining(true, 99)).toBe(Number.POSITIVE_INFINITY)
    expect(canFreeScan(true, 99)).toBe(true)
  })

  it('computes free remaining against limit', () => {
    expect(scansRemaining(false, 0)).toBe(FREE_SCAN_LIMIT)
    expect(scansRemaining(false, 3)).toBe(FREE_SCAN_LIMIT - 3)
    expect(scansRemaining(false, FREE_SCAN_LIMIT)).toBe(0)
    expect(canFreeScan(false, FREE_SCAN_LIMIT - 1)).toBe(true)
    expect(canFreeScan(false, FREE_SCAN_LIMIT)).toBe(false)
  })

  it('shows interstitial every Nth scan after cooldown', () => {
    const now = 1_000_000
    expect(
      shouldShowInterstitial({
        isPro: false,
        scanCount: 3,
        lastInterstitialAt: 0,
        now,
      }),
    ).toBe(true)

    expect(
      shouldShowInterstitial({
        isPro: false,
        scanCount: 3,
        lastInterstitialAt: now - 1000,
        now,
      }),
    ).toBe(false)

    expect(
      shouldShowInterstitial({
        isPro: false,
        scanCount: 3,
        lastInterstitialAt: now - INTERSTITIAL_COOLDOWN_MS - 1,
        now,
      }),
    ).toBe(true)
  })

  it('skips interstitial for Pro and non-multiples', () => {
    expect(shouldShowInterstitial({ isPro: true, scanCount: 3, lastInterstitialAt: 0 })).toBe(false)
    expect(shouldShowInterstitial({ isPro: false, scanCount: 2, lastInterstitialAt: 0 })).toBe(
      false,
    )
    expect(shouldShowInterstitial({ isPro: false, scanCount: 0, lastInterstitialAt: 0 })).toBe(
      false,
    )
  })
})
