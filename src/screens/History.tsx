import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconHistory } from '../icons'

type Props = {
  lang: Lang
}

export function History({ lang }: Props) {
  return (
    <div className="screen">
      <header className="anim-fade-up">
        <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 700 }}>{t(lang, 'history')}</h1>
      </header>
      <div className="empty">
        <div className="empty-card anim-fade-up-delay">
          <div className="empty-icon">
            <IconHistory />
          </div>
          <h2>{t(lang, 'historyEmpty')}</h2>
          <p>{t(lang, 'historyBody')}</p>
        </div>
      </div>
    </div>
  )
}
