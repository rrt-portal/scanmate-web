import { useEffect, useState } from 'react'
import { clearHistory, deleteHistoryItem, listHistory } from '../data/historyStore'
import { mapsUrlForAddress, telHref } from '../domain/parseText'
import type { ScanItem } from '../domain/types'
import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconHistory } from '../icons'

type Props = {
  lang: Lang
  historyEnabled: boolean
  refreshKey: number
}

export function History({ lang, historyEnabled, refreshKey }: Props) {
  const [items, setItems] = useState<ScanItem[]>([])
  const [selected, setSelected] = useState<ScanItem | null>(null)
  const [loading, setLoading] = useState(true)

  async function reload() {
    setLoading(true)
    try {
      const list = historyEnabled ? await listHistory() : []
      setItems(list)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void reload()
  }, [historyEnabled, refreshKey])

  async function onDelete(id: string) {
    await deleteHistoryItem(id)
    if (selected?.id === id) setSelected(null)
    await reload()
  }

  async function onClear() {
    if (!window.confirm(t(lang, 'confirmClear'))) return
    await clearHistory()
    setSelected(null)
    await reload()
  }

  function formatWhen(ts: number) {
    try {
      return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(ts)
    } catch {
      return new Date(ts).toLocaleString()
    }
  }

  if (!historyEnabled) {
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
            <h2>{t(lang, 'historyOffTitle')}</h2>
            <p>{t(lang, 'historyOffBody')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <header className="hist-header anim-fade-up">
        <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 700 }}>{t(lang, 'history')}</h1>
        {items.length > 0 && (
          <button type="button" className="ghost-btn" onClick={onClear}>
            {t(lang, 'clearAll')}
          </button>
        )}
      </header>

      {loading ? (
        <div className="empty muted">{t(lang, 'recognizing')}</div>
      ) : items.length === 0 ? (
        <div className="empty">
          <div className="empty-card anim-fade-up-delay">
            <div className="empty-icon">
              <IconHistory />
            </div>
            <h2>{t(lang, 'historyEmpty')}</h2>
            <p>{t(lang, 'historyBody')}</p>
          </div>
        </div>
      ) : (
        <div className="screen-scroll hist-list anim-fade-up">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="hist-card"
              onClick={() => setSelected(item)}
            >
              {item.imageDataUrl ? (
                <img src={item.imageDataUrl} alt="" />
              ) : (
                <div className="hist-fallback">
                  <IconHistory />
                </div>
              )}
              <div className="hist-meta">
                <div className="hist-text">{item.text}</div>
                <div className="muted hist-when">{formatWhen(item.timestamp)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="sheet" role="dialog" aria-modal="true">
          <button type="button" className="sheet-backdrop" onClick={() => setSelected(null)} />
          <div className="sheet-panel anim-fade-up">
            <div className="sheet-grab" />
            <div className="sheet-scroll">
              {selected.imageDataUrl && (
                <img className="sheet-img" src={selected.imageDataUrl} alt="" />
              )}
              <pre className="sheet-text">{selected.text}</pre>
              <div className="sheet-actions">
                {selected.phone && (
                  <a className="chip" href={telHref(selected.phone)}>
                    {t(lang, 'call')}
                  </a>
                )}
                {selected.url && (
                  <a className="chip" href={selected.url} target="_blank" rel="noreferrer">
                    {t(lang, 'openLink')}
                  </a>
                )}
                {selected.address && (
                  <a
                    className="chip"
                    href={mapsUrlForAddress(selected.address)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t(lang, 'openMaps')}
                  </a>
                )}
              </div>
            </div>
            <div className="sheet-footer">
              <button
                type="button"
                className="danger-btn"
                onClick={() => void onDelete(selected.id)}
              >
                {t(lang, 'delete')}
              </button>
              <button type="button" className="primary-btn" onClick={() => setSelected(null)}>
                {t(lang, 'done')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hist-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .hist-list { display: grid; gap: 10px; align-content: start; }
        .hist-card {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 12px;
          text-align: left;
          padding: 10px;
          border-radius: 16px;
          background: var(--surface);
          border: 1px solid transparent;
        }
        .hist-card img, .hist-fallback {
          width: 72px;
          height: 72px;
          border-radius: 12px;
          object-fit: cover;
          background: var(--surface-strong);
        }
        .hist-fallback {
          display: grid;
          place-items: center;
          color: var(--accent);
        }
        .hist-meta { min-width: 0; display: grid; gap: 6px; align-content: center; }
        .hist-text {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 500;
          line-height: 1.35;
        }
        .hist-when { font-size: 0.8rem; }
        .sheet {
          position: absolute;
          inset: 0;
          z-index: 30;
          display: grid;
          align-items: end;
        }
        .sheet-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
        }
        .sheet-panel {
          position: relative;
          max-height: 78%;
          display: flex;
          flex-direction: column;
          border-radius: 22px 22px 0 0;
          background: var(--bg);
          border-top: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
          padding: 10px 16px 16px;
        }
        .sheet-grab {
          width: 42px;
          height: 4px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--text-muted) 55%, transparent);
          margin: 4px auto 12px;
        }
        .sheet-scroll { overflow: auto; flex: 1; min-height: 0; }
        .sheet-img {
          width: 100%;
          max-height: 180px;
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 12px;
        }
        .sheet-text {
          margin: 0 0 12px;
          white-space: pre-wrap;
          word-break: break-word;
          font-family: var(--font-body);
          user-select: text;
        }
        .sheet-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--accent-soft);
          color: var(--accent);
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .sheet-footer { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .danger-btn {
          border-radius: var(--radius-lg);
          padding: 14px 12px;
          background: color-mix(in srgb, #ff5c5c 18%, var(--surface));
          border: 1px solid color-mix(in srgb, #ff5c5c 45%, transparent);
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
