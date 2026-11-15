import { t } from '../i18n'
import type { Lang } from '../storage'
import { modalCss } from './ConsentDialog'

type Props = {
  lang: Lang
  onClose: () => void
}

export function InterstitialAd({ lang, onClose }: Props) {
  return (
    <div className="modal-root" role="dialog" aria-modal="true">
      <div className="modal-card interstitial anim-fade-up">
        <div className="ad-kicker">{t(lang, 'demoAd')}</div>
        <h2>{t(lang, 'interstitialTitle')}</h2>
        <p className="muted">{t(lang, 'interstitialBody')}</p>
        <div className="ad-fake">AdMob · preview stub</div>
        <button type="button" className="primary-btn" onClick={onClose}>
          {t(lang, 'close')}
        </button>
      </div>
      <style>{`
        ${modalCss}
        .interstitial .ad-kicker {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }
        .ad-fake {
          height: 120px;
          border-radius: 14px;
          display: grid;
          place-items: center;
          background: repeating-linear-gradient(
            -45deg,
            color-mix(in srgb, var(--accent) 8%, transparent),
            color-mix(in srgb, var(--accent) 8%, transparent) 10px,
            transparent 10px,
            transparent 20px
          );
          border: 1px dashed color-mix(in srgb, var(--accent) 35%, transparent);
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
