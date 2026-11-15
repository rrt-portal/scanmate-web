import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  title: string
  html: string
  onBack: () => void
}

export function LegalPage({ lang, title, html, onBack }: Props) {
  return (
    <div className="screen">
      <button type="button" className="ghost-btn" onClick={onBack}>
        ← {t(lang, 'back')}
      </button>
      <h1 style={{ margin: '8px 0 16px', fontSize: '1.55rem' }}>{title}</h1>
      <div
        className="screen-scroll legal-body anim-fade-up"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .legal-body h2 { margin: 0 0 12px; font-size: 1.15rem; }
        .legal-body p { margin: 0 0 12px; line-height: 1.5; color: var(--text-muted); }
      `}</style>
    </div>
  )
}
