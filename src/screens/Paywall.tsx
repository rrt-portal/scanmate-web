import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  onBack: () => void
  onBuy: () => void
  onRestore: () => void
}

export function Paywall({ lang, onBack, onBuy, onRestore }: Props) {
  const features = [t(lang, 'featureThemes'), t(lang, 'featureHistory'), t(lang, 'featureOcr')]

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
        <div className="price">{t(lang, 'price')}</div>
        <button type="button" className="primary-btn" onClick={onBuy}>
          {t(lang, 'buy')}
        </button>
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
        .pay-main p { margin: 0; line-height: 1.45; max-width: 34ch; }
        .pay-main ul {
          list-style: none;
          margin: 28px 0 0;
          padding: 0;
          display: grid;
          gap: 16px;
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
      `}</style>
    </div>
  )
}
