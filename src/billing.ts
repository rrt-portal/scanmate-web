/** Preview billing — not Play Billing / real charges. */
export const PRODUCT_PRICE = '$2.99'
export const FREE_SCAN_LIMIT = 5
export const INTERSTITIAL_EVERY = 3
export const INTERSTITIAL_COOLDOWN_MS = 2 * 60 * 1000

export const PREVIEW_BILLING_NOTE = {
  ru: 'Это превью-биллинг: покупка не списывает деньги и не связана с Google Play.',
  en: 'Preview billing only: no real charge and not connected to Google Play.',
} as const
