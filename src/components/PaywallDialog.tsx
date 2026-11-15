import { PRODUCT_PRICE } from '../billing'
import { t } from '../i18n'
import type { Lang } from '../storage'
import { modalCss } from './ConsentDialog'

type Props = {
  lang: Lang
  onClose: () => void
  onOpenPaywall: () => void
}

export function PaywallDialog({ lang, onClose, onOpenPaywall }: Props) {
  return (
    <div className="modal-root" role="dialog" aria-modal="true">
      <div className="modal-card anim-fade-up">
        <h2>{t(lang, 'limitTitle')}</h2>
        <p className="muted">{t(lang, 'limitBody')}</p>
        <p className="price-line">{PRODUCT_PRICE}</p>
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            onClose()
            onOpenPaywall()
          }}
        >
          {t(lang, 'buyPro')}
        </button>
        <button type="button" className="ghost-btn" onClick={onClose}>
          {t(lang, 'close')}
        </button>
      </div>
      <style>{`
        ${modalCss}
        .price-line { margin: 0; font-weight: 800; font-size: 1.2rem; text-align: center; }
      `}</style>
    </div>
  )
}
