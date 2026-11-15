import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  onAccept: () => void
  onPrivacy: () => void
  onTerms: () => void
}

export function ConsentDialog({ lang, onAccept, onPrivacy, onTerms }: Props) {
  return (
    <div className="modal-root" role="dialog" aria-modal="true">
      <div className="modal-card anim-fade-up">
        <h2>{t(lang, 'consentTitle')}</h2>
        <p className="muted">{t(lang, 'consentBody')}</p>
        <div className="modal-links">
          <button type="button" className="ghost-btn" onClick={onPrivacy}>
            {t(lang, 'privacy')}
          </button>
          <button type="button" className="ghost-btn" onClick={onTerms}>
            {t(lang, 'terms')}
          </button>
        </div>
        <button type="button" className="primary-btn" onClick={onAccept}>
          {t(lang, 'consentAccept')}
        </button>
      </div>
      <style>{modalCss}</style>
    </div>
  )
}

export const modalCss = `
  .modal-root {
    position: absolute;
    inset: 0;
    z-index: 40;
    display: grid;
    place-items: center;
    padding: 20px;
    background: rgba(0,0,0,0.62);
  }
  .modal-card {
    width: min(100%, 360px);
    background: var(--bg);
    border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
    border-radius: 20px;
    padding: 20px 18px;
    display: grid;
    gap: 12px;
  }
  .modal-card h2 { margin: 0; font-size: 1.35rem; }
  .modal-card p { margin: 0; line-height: 1.45; font-size: 0.95rem; }
  .modal-links { display: flex; gap: 8px; flex-wrap: wrap; }
`
