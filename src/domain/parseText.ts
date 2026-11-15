import type { ParsedActions } from './types'

const PHONE_RE =
  /(?:(?:\+|00)\d{1,3}[\s-]?)?(?:\(?\d{2,4}\)?[\s-]?)?\d{3}[\s-]?\d{2,4}[\s-]?\d{2,4}/g

const URL_RE =
  /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`\[\]]+/gi

const ADDRESS_HINT_RE =
  /\b(?:ул\.?|улица|пр\.?|проспект|пер\.?|переулок|б-р|бульвар|ш\.?|шоссе|д\.|дом|кв\.|ul\.?|street|st\.|ave\.|avenue|road|rd\.|blvd\.|lane|ln\.)\b/i

const ADDRESS_LINE_RE =
  /^.{0,120}?(?:\d{5,6}|[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}).{0,80}$/im

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, '')
  const compact = digits.startsWith('+')
    ? `+${digits.slice(1).replace(/\D/g, '')}`
    : digits.replace(/\D/g, '')
  const count = compact.replace(/\D/g, '').length
  if (count < 10 || count > 15) return null
  return compact
}

function normalizeUrl(raw: string): string | null {
  let value = raw.replace(/[),.;:!?]+$/g, '')
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`
  try {
    const u = new URL(value)
    if (!u.hostname.includes('.')) return null
    return u.toString()
  } catch {
    return null
  }
}

function extractAddress(text: string): string | null {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)

  for (const line of lines) {
    if (ADDRESS_HINT_RE.test(line) && /\d/.test(line) && line.length >= 8) {
      return line.slice(0, 160)
    }
  }

  const postal = text.match(ADDRESS_LINE_RE)
  if (postal?.[0]) return postal[0].trim().slice(0, 160)

  const joined = lines.find(
    (l) => ADDRESS_HINT_RE.test(l) && l.split(/\s+/).length >= 3,
  )
  return joined ? joined.slice(0, 160) : null
}

/** Stage 2 ParseTextUseCase parity: phone / url / address from OCR text. */
export function parseTextUseCase(text: string): ParsedActions {
  const cleaned = text.replace(/\u00a0/g, ' ').trim()
  if (!cleaned) return { phone: null, url: null, address: null }

  let phone: string | null = null
  for (const match of cleaned.matchAll(PHONE_RE)) {
    phone = normalizePhone(match[0])
    if (phone) break
  }

  let url: string | null = null
  for (const match of cleaned.matchAll(URL_RE)) {
    url = normalizeUrl(match[0])
    if (url) break
  }

  const address = extractAddress(cleaned)
  return { phone, url, address }
}

export function mapsUrlForAddress(address: string): string {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
