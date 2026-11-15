import { PRODUCT_PRICE } from '../billing'
import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  isPro: boolean
  onBack: () => void
  onBuy: () => void
  onRestore: () => void
}

export function Paywall({ lang, isPro, onBack, onBuy, onRestore }: Props) {
  const features = [
    t(lang, 'featureThemes'),
    t(lang, 'featureHistory'),
    t(lang, 'featureOcr'),
    t(lang, 'featurePriority'),
  ]

  return (
    <div className="screen paywall">
      <button type="button" className="ghost-btn back" onClick={onBack}>
        ← {t(lang, 'back')}
      </button>

      <div className="pay-main anim-fade-up">
        <div className="brand" style={{ fontSize: '1.8rem' }}>
          ScanMate
        </div>
        <h1>{t(lang, 'proTitle')}</h1>
        <p className="muted">{t(lang, 'proSubtitle')}</p>
        <p className="preview-note">{t(lang, 'previewBilling')}</p>

        <ul>
          {features.map((item) => (
            <li key={item}>
              <span className="bullet" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pay-footer anim-fade-up-delay">
        {isPro ? (
          <div className="pro-active">{t(lang, 'proActivated')}</div>
        ) : (
          <>
            <div className="price">
              {PRODUCT_PRICE}
              <span className="muted"> · preview</span>
            </div>
            <button type="button" className="primary-btn" onClick={onBuy}>
              {t(lang, 'buy')}
            </button>
          </>
        )}
        <button type="button" className="ghost-btn restore" onClick={onRestore}>
          {t(lang, 'restore')}
        </button>
      </div>

      <style>{`
        .paywall { padding-bottom: 24px; }
        .paywall .back { align-self: flex-start; margin-bottom: 8px; }
        .pay-main { flex: 1; display: grid; align-content: start; gap: 12px; padding-top: 12px; }
        .pay-main h1 {
          margin: 8px 0 0;
          font-family: var(--font-brand);
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .pay-main p { margin: 0; line-height: 1.45; max-width: 36ch; }
        .preview-note {
          font-size: 0.85rem !important;
          padding: 10px 12px;
          border-radius: 12px;
          background: var(--surface);
          color: var(--text-muted) !important;
        }
        .pay-main ul {
          list-style: none;
          margin: 20px 0 0;
          padding: 0;
          display: grid;
          gap: 14px;
        }
        .pay-main li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
          font-weight: 500;
        }
        .bullet {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-soft);
          flex: 0 0 auto;
        }
        .pay-footer { display: grid; gap: 12px; justify-items: center; }
        .price { font-size: 1.2rem; font-weight: 700; }
        .restore { color: var(--text-muted); }
        .pro-active {
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 16px;
          background: var(--accent-soft);
          color: var(--accent);
          font-weight: 800;
        }
      `}</style>
    </div>
  )
}
