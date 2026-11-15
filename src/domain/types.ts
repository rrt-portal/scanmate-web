export type ParsedActions = {
  phone: string | null
  url: string | null
  address: string | null
}

export type ScanItem = {
  id: string
  text: string
  imageDataUrl: string | null
  timestamp: number
  phone: string | null
  url: string | null
  address: string | null
}

export type ScanDraft = {
  imageDataUrl: string
  text: string
  parsed: ParsedActions
}
