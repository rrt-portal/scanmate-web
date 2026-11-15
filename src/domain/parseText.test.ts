import { describe, expect, it } from 'vitest'
import { mapsUrlForAddress, parseTextUseCase, telHref } from './parseText'

describe('parseTextUseCase', () => {
  it('returns nulls for empty input', () => {
    expect(parseTextUseCase('')).toEqual({ phone: null, url: null, address: null })
    expect(parseTextUseCase('   ')).toEqual({ phone: null, url: null, address: null })
  })

  it('parses international +7 phone with formatting', () => {
    const r = parseTextUseCase('Звони: +7 (999) 123-45-67')
    expect(r.phone).toBe('+79991234567')
  })

  it('parses long digit phone sequences', () => {
    const r = parseTextUseCase('Call 79111234567')
    expect(r.phone).toBe('79111234567')
    expect(r.phone?.replace(/\D/g, '').length).toBeGreaterThanOrEqual(10)
  })

  it('parses US-style phone', () => {
    const r = parseTextUseCase('Office (415) 555-2671')
    expect(r.phone).toBe('4155552671')
  })

  it('rejects too-short digit sequences as phone', () => {
    expect(parseTextUseCase('code 12345').phone).toBeNull()
  })

  it('parses https URL', () => {
    const r = parseTextUseCase('Open https://scanmate.example/app now')
    expect(r.url).toBe('https://scanmate.example/app')
  })

  it('parses www URL and adds https', () => {
    const r = parseTextUseCase('www.example.com/path')
    expect(r.url).toBe('https://www.example.com/path')
  })

  it('strips trailing punctuation from URLs', () => {
    const r = parseTextUseCase('See https://scanmate.example/docs.')
    expect(r.url).toBe('https://scanmate.example/docs')
  })

  it('parses Cyrillic street address with number', () => {
    const r = parseTextUseCase('Адрес: ул. Примерная, д. 10')
    expect(r.address?.toLowerCase()).toContain('пример')
  })

  it('parses Latin ul. address hint', () => {
    const r = parseTextUseCase('Meet at ul. Primernaya 10')
    expect(r.address?.toLowerCase()).toContain('primernaya')
  })

  it('parses English street address', () => {
    const r = parseTextUseCase('Visit 12 Market Street')
    expect(r.address?.toLowerCase()).toContain('street')
  })

  it('parses postal-code style address line', () => {
    const r = parseTextUseCase('Somewhere 101000 Russia')
    expect(r.address).toBeTruthy()
  })

  it('extracts phone, url, and address together', () => {
    const sample = `
ООО ScanMate
Тел: +7 (999) 123-45-67
Сайт: https://scanmate.example/app
Адрес: ул. Примерная, д. 10, 101000
`
    const r = parseTextUseCase(sample)
    expect(r.phone).toContain('999')
    expect(r.url).toContain('scanmate.example')
    expect(r.address?.toLowerCase()).toContain('пример')
  })

  it('handles nbsp-cleaned text', () => {
    const r = parseTextUseCase('Tel:\u00a0+7\u00a0999\u00a0123-45-67')
    expect(r.phone).toBe('+79991234567')
  })

  it('returns first valid phone when several appear', () => {
    const r = parseTextUseCase('A +7 999 111-22-33 then +7 999 444-55-66')
    expect(r.phone).toBe('+79991112233')
  })

  it('ignores bare hostname without TLD for URL', () => {
    // normalizeUrl requires a dot in hostname
    const r = parseTextUseCase('go to www.localhost')
    // www.localhost has a dot — still a hostname; ensure no crash
    expect(r.url === null || r.url.startsWith('https://')).toBe(true)
  })
})

describe('link helpers', () => {
  it('builds tel: href', () => {
    expect(telHref('+7 (999) 123-45-67')).toBe('tel:+79991234567')
  })

  it('builds maps URL', () => {
    expect(mapsUrlForAddress('ул. Примерная, 10')).toContain('https://maps.google.com/?q=')
    expect(mapsUrlForAddress('ул. Примерная, 10')).toContain(
      encodeURIComponent('ул. Примерная, 10'),
    )
  })
})
