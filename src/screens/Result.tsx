import { useMemo, useState } from 'react'
import { mapsUrlForAddress, telHref } from '../domain/parseText'
import type { ScanDraft } from '../domain/types'
import { t } from '../i18n'
import type { Lang } from '../storage'

type Props = {
  lang: Lang
  draft: ScanDraft
  onBack: () => void
  onShare: () => void
  onToast: (msg: string) => void
}

export function Result({ lang, draft, onBack, onShare, onToast }: Props) {
  const [expanded, setExpanded] = useState(false)
  const preview = useMemo(() => {
    const text = draft.text
    if (expanded || text.length <= 280) return text
    return `${text.slice(0, 280).trim()}…`
  }, [draft.text, expanded])

  const { phone, url, address } = draft.parsed
  const hasActions = Boolean(phone || url || address)

  return (
    <div className="screen result-screen">
      <div className="result-top">
        <button type="button" className="ghost-btn" onClick={onBack}>
          ← {t(lang, 'back')}
        </button>
        <h1>{t(lang, 'result')}</h1>
      </div>

      <div className="screen-scroll anim-fade-up">
        {draft.imageDataUrl && (
          <img className="result-thumb" src={draft.imageDataUrl} alt="" />
        )}

        <div className="result-card">
          <pre
            className="result-text"
            tabIndex={0}
            onCopy={() => onToast(t(lang, 'copied'))}
          >
            {preview}
          </pre>
          {draft.text.length > 280 && (
            <button
              type="button"
              className="ghost-btn expand-btn"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t(lang, 'collapse') : t(lang, 'expand')}
            </button>
          )}
        </div>

        <section className="actions">
          <p className="section-title">{hasActions ? '' : t(lang, 'noActions')}</p>
          {phone && (
            <a className="action-row" href={telHref(phone)}>
              <span className="action-label">{t(lang, 'phone')}</span>
              <span className="action-value">{phone}</span>
              <span className="action-cta">{t(lang, 'call')}</span>
            </a>
          )}
          {url && (
            <a className="action-row" href={url} target="_blank" rel="noreferrer">
              <span className="action-label">{t(lang, 'link')}</span>
              <span className="action-value">{url}</span>
              <span className="action-cta">{t(lang, 'openLink')}</span>
            </a>
          )}
          {address && (
            <a
              className="action-row"
              href={mapsUrlForAddress(address)}
              target="_blank"
              rel="noreferrer"
            >
              <span className="action-label">{t(lang, 'address')}</span>
              <span className="action-value">{address}</span>
              <span className="action-cta">{t(lang, 'openMaps')}</span>
            </a>
          )}
        </section>
      </div>

      <div className="result-footer">
        <button type="button" className="primary-btn" onClick={onShare}>
          {t(lang, 'share')}
        </button>
        <button type="button" className="secondary-btn" onClick={onBack}>
          {t(lang, 'done')}
        </button>
      </div>

      <style>{`
        .result-screen { padding-bottom: 16px; }
        .result-top { display: grid; gap: 4px; margin-bottom: 12px; }
        .result-top h1 { margin: 0; font-size: 1.55rem; font-weight: 700; }
        .result-thumb {
          width: 100%;
          max-height: 160px;
          object-fit: cover;
          border-radius: 16px;
          margin-bottom: 12px;
          border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent);
        }
        .result-card {
          background: var(--surface);
          border-radius: 18px;
          padding: 14px 14px 8px;
          margin-bottom: 18px;
        }
        .result-text {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: var(--font-body);
          font-size: 0.98rem;
          line-height: 1.45;
          user-select: text;
          -webkit-user-select: text;
        }
        .expand-btn { width: 100%; text-align: center; padding: 10px; }
        .actions { display: grid; gap: 10px; }
        .action-row {
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          gap: 2px 10px;
          padding: 12px 14px;
          border-radius: 16px;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          text-decoration: none;
          color: inherit;
        }
        .action-label {
          grid-column: 1;
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .action-value {
          grid-column: 1;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .action-cta {
          grid-column: 2;
          grid-row: 1 / span 2;
          align-self: center;
          color: var(--accent);
          font-weight: 700;
          font-size: 0.85rem;
        }
        .result-footer { display: grid; gap: 10px; padding-top: 8px; }
        .secondary-btn {
          width: 100%;
          border-radius: var(--radius-lg);
          padding: 14px 18px;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
