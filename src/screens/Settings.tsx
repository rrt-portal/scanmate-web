import { t } from '../i18n'
import type { Lang, ThemeId } from '../storage'

type Props = {
  lang: Lang
  theme: ThemeId
  onLang: (lang: Lang) => void
  onTheme: (theme: ThemeId) => void
  onBuyPro: () => void
}

const themeMeta: { id: ThemeId; swatch: string }[] = [
  { id: 'midnight', swatch: 'linear-gradient(135deg, #0a0f0d, #5CFFB1)' },
  { id: 'ocean', swatch: 'linear-gradient(135deg, #0a121c, #5CD1F1)' },
  { id: 'ember', swatch: 'linear-gradient(135deg, #140e08, #FFB05C)' },
]

export function Settings({ lang, theme, onLang, onTheme, onBuyPro }: Props) {
  return (
    <div className="screen">
      <div className="screen-scroll">
        <header className="anim-fade-up" style={{ marginBottom: 22 }}>
          <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 700 }}>{t(lang, 'settings')}</h1>
        </header>

        <section className="anim-fade-up">
          <p className="section-title">{t(lang, 'themes')}</p>
          <p className="section-sub">{t(lang, 'free')}</p>
          <div className="theme-list">
            {themeMeta.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`theme-row${theme === item.id ? ' selected' : ''}`}
                onClick={() => onTheme(item.id)}
              >
                <span className="swatch" style={{ background: item.swatch }} />
                <span>{t(lang, item.id)}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="anim-fade-up-delay" style={{ marginTop: 26 }}>
          <p className="section-title">{t(lang, 'language')}</p>
          <div className="lang-toggle" role="group" aria-label={t(lang, 'language')}>
            <button
              type="button"
              className={lang === 'ru' ? 'selected' : ''}
              onClick={() => onLang('ru')}
            >
              Русский
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'selected' : ''}
              onClick={() => onLang('en')}
            >
              English
            </button>
          </div>
        </section>

        <button type="button" className="pro-row anim-fade-up-delay" onClick={onBuyPro}>
          <span className="pro-badge">PRO</span>
          <span className="pro-label">{t(lang, 'buyPro')}</span>
          <span className="pro-arrow" aria-hidden>
            →
          </span>
        </button>
      </div>

      <style>{`
        .theme-list { display: grid; gap: 10px; }
        .theme-row {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          text-align: left;
          padding: 12px 14px;
          border-radius: 16px;
          background: var(--surface);
          border: 1px solid transparent;
          font-weight: 500;
        }
        .theme-row.selected {
          border-color: var(--accent);
        }
        .swatch {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          flex: 0 0 auto;
        }
        .lang-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
          padding: 4px;
          border-radius: 999px;
          background: var(--surface);
        }
        .lang-toggle button {
          border-radius: 999px;
          padding: 12px 10px;
          font-weight: 600;
          color: var(--text-muted);
        }
        .lang-toggle button.selected {
          background: var(--accent);
          color: var(--on-accent);
        }
        .pro-row {
          margin-top: 28px;
          width: 100%;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 18px;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--accent) 55%, transparent);
        }
        .pro-badge {
          display: inline-grid;
          place-items: center;
          min-width: 42px;
          padding: 4px 8px;
          border-radius: 8px;
          background: var(--accent);
          color: var(--on-accent);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.04em;
        }
        .pro-label { font-weight: 600; text-align: left; }
        .pro-arrow { color: var(--accent); font-size: 1.1rem; }
      `}</style>
    </div>
  )
}
