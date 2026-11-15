import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  placement: 'home' | 'history'
}

export function AdBanner({ lang, placement }: Props) {
  return (
    <div className="ad-banner" data-placement={placement} role="complementary" aria-label={t(lang, 'demoAd')}>
      <span className="ad-label">{t(lang, 'demoAd')}</span>
      <span className="ad-body">{t(lang, 'demoAdBody')}</span>
      <style>{`
        .ad-banner {
          margin: 0 0 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px dashed color-mix(in srgb, var(--accent) 35%, transparent);
          background: color-mix(in srgb, var(--surface) 80%, transparent);
          display: grid;
          gap: 2px;
          text-align: center;
        }
        .ad-label {
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 700;
        }
        .ad-body { font-size: 0.82rem; color: var(--text-muted); }
      `}</style>
    </div>
  )
}
