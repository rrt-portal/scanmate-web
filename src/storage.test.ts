import { beforeEach, describe, expect, it } from 'vitest'
import {
  incrementScanCount,
  isThemeFree,
  readAutoDeleteDays,
  readConsent,
  readHistoryEnabled,
  readIsPro,
  readLang,
  readScanCount,
  readTheme,
  writeAutoDeleteDays,
  writeConsent,
  writeHistoryEnabled,
  writeIsPro,
  writeLang,
  writeScanCount,
  writeTheme,
} from './storage'

describe('storage settings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults language to Russian', () => {
    expect(readLang()).toBe('ru')
  })

  it('persists language toggle', () => {
    writeLang('en')
    expect(readLang()).toBe('en')
    writeLang('ru')
    expect(readLang()).toBe('ru')
  })

  it('defaults theme to midnight and validates ids', () => {
    expect(readTheme()).toBe('midnight')
    writeTheme('ocean')
    expect(readTheme()).toBe('ocean')
    localStorage.setItem('scanmate.theme', 'not-a-theme')
    expect(readTheme()).toBe('midnight')
  })

  it('marks free vs pro themes', () => {
    expect(isThemeFree('midnight')).toBe(true)
    expect(isThemeFree('aurora')).toBe(false)
  })

  it('defaults history enabled true', () => {
    expect(readHistoryEnabled()).toBe(true)
    writeHistoryEnabled(false)
    expect(readHistoryEnabled()).toBe(false)
  })

  it('defaults auto-delete to 30 days', () => {
    expect(readAutoDeleteDays()).toBe(30)
    writeAutoDeleteDays(7)
    expect(readAutoDeleteDays()).toBe(7)
  })

  it('tracks Pro flag', () => {
    expect(readIsPro()).toBe(false)
    writeIsPro(true)
    expect(readIsPro()).toBe(true)
    writeIsPro(false)
    expect(readIsPro()).toBe(false)
  })

  it('increments scan count from zero', () => {
    expect(readScanCount()).toBe(0)
    expect(incrementScanCount()).toBe(1)
    expect(incrementScanCount()).toBe(2)
    expect(readScanCount()).toBe(2)
  })

  it('clamps negative scan writes', () => {
    writeScanCount(-3)
    expect(readScanCount()).toBe(0)
  })

  it('persists consent', () => {
    expect(readConsent()).toBe(false)
    writeConsent()
    expect(readConsent()).toBe(true)
  })
})
