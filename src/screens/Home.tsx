import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconDocPlus } from '../icons'

type Props = {
  lang: Lang
  onPick: () => void
}

export function Home({ lang, onPick }: Props) {
  return (
    <div className="screen">
      <header className="home-header anim-fade-up">
        <div className="brand-solid" style={{ fontSize: '1.55rem' }}>
          ScanMate
        </div>
        <div className="muted" style={{ marginTop: 4, fontSize: '0.95rem' }}>
          {t(lang, 'home')}
        </div>
      </header>

      <div className="empty">
        <div className="empty-card anim-fade-up-delay">
          <div className="empty-icon anim-pulse">
            <IconDocPlus />
          </div>
          <h2>{t(lang, 'emptyTitle')}</h2>
          <p>{t(lang, 'emptyBody')}</p>
          <button type="button" className="primary-btn" onClick={onPick} style={{ marginTop: 8 }}>
            {t(lang, 'chooseScreenshot')}
          </button>
        </div>
      </div>
    </div>
  )
}
