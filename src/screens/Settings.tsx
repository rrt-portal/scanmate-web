import { FREE_SCAN_LIMIT } from '../billing'
import { t } from '../i18n'
import {
  ALL_THEMES,
  isThemeFree,
  type AutoDeleteDays,
  type Lang,
  type ThemeId,
} from '../storage'
import { themes } from '../theme'

type Props = {
  lang: Lang
  theme: ThemeId
  isPro: boolean
  scanCount: number
  historyEnabled: boolean
  autoDeleteDays: AutoDeleteDays
  onLang: (lang: Lang) => void
  onTheme: (theme: ThemeId) => void
  onLockedTheme: () => void
  onHistoryEnabled: (enabled: boolean) => void
  onAutoDeleteDays: (days: AutoDeleteDays) => void
  onBuyPro: () => void
  onRestore: () => void
  onPrivacy: () => void
  onTerms: () => void
  onAbout: () => void
}

const deleteOptions: { value: AutoDeleteDays; key: 'daysNever' | 'days7' | 'days30' | 'days90' }[] =
  [
    { value: 0, key: 'daysNever' },
    { value: 7, key: 'days7' },
    { value: 30, key: 'days30' },
    { value: 90, key: 'days90' },
  ]

export function Settings({
  lang,
  theme,
  isPro,
  scanCount,
  historyEnabled,
  autoDeleteDays,
  onLang,
  onTheme,
  onLockedTheme,
  onHistoryEnabled,
  onAutoDeleteDays,
  onBuyPro,
  onRestore,
  onPrivacy,
  onTerms,
  onAbout,
}: Props) {
  const left = Math.max(0, FREE_SCAN_LIMIT - scanCount)

  return (
    <div className="screen">
      <div className="screen-scroll">
        <header className="anim-fade-up" style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 700 }}>{t(lang, 'settings')}</h1>
          <p className="muted" style={{ margin: '6px 0 0', fontSize: '0.9rem' }}>
            {isPro
              ? t(lang, 'unlimited')
              : `${t(lang, 'scansLeft')}: ${left}/${FREE_SCAN_LIMIT}`}
            {isPro ? ' · Pro' : ''}
          </p>
        </header>

        <section className="anim-fade-up">
          <p className="section-title">{t(lang, 'themes')}</p>
          <p className="section-sub">
            {t(lang, 'free')} · 3 · {t(lang, 'proBadge')} · 4
          </p>
          <div className="theme-list">
            {ALL_THEMES.map((id) => {
              const free = isThemeFree(id)
              const locked = !free && !isPro
              return (
                <button
                  key={id}
                  type="button"
                  className={`theme-row${theme === id ? ' selected' : ''}${locked ? ' locked' : ''}`}
                  onClick={() => (locked ? onLockedTheme() : onTheme(id))}
                >
                  <span className="swatch" style={{ background: themes[id].swatch }} />
                  <span className="theme-name">{t(lang, id)}</span>
                  {locked ? (
                    <span className="lock">🔒 {t(lang, 'proBadge')}</span>
                  ) : free ? (
                    <span className="tag">{t(lang, 'free')}</span>
                  ) : (
                    <span className="tag pro">{t(lang, 'proBadge')}</span>
                  )}
                </button>
              )
            })}
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

        <section className="anim-fade-up-delay" style={{ marginTop: 26 }}>
          <p className="section-title">{t(lang, 'historySection')}</p>
          <button
            type="button"
            className={`toggle-row${historyEnabled ? ' on' : ''}`}
            onClick={() => onHistoryEnabled(!historyEnabled)}
            aria-pressed={historyEnabled}
          >
            <span>{t(lang, 'historyEnabled')}</span>
            <span className="toggle-pill" aria-hidden />
          </button>

          <p className="section-title" style={{ marginTop: 16 }}>
            {t(lang, 'autoDelete')}
          </p>
          <div className="days-grid">
            {deleteOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={autoDeleteDays === opt.value ? 'selected' : ''}
                onClick={() => onAutoDeleteDays(opt.value)}
                disabled={!historyEnabled}
              >
                {t(lang, opt.key)}
              </button>
            ))}
          </div>
        </section>

        <button type="button" className="pro-row anim-fade-up-delay" onClick={onBuyPro}>
          <span className="pro-badge">PRO</span>
          <span className="pro-label">{isPro ? t(lang, 'proActivated') : t(lang, 'buyPro')}</span>
          <span className="pro-arrow" aria-hidden>
            →
          </span>
        </button>

        <button type="button" className="link-row" onClick={onRestore}>
          {t(lang, 'restore')}
        </button>

        <p className="section-title" style={{ marginTop: 22 }}>
          {t(lang, 'legal')}
        </p>
        <button type="button" className="link-row" onClick={onPrivacy}>
          {t(lang, 'privacy')}
        </button>
        <button type="button" className="link-row" onClick={onTerms}>
          {t(lang, 'terms')}
        </button>
        <button type="button" className="link-row" onClick={onAbout}>
          {t(lang, 'about')}
        </button>
      </div>

      <style>{`
        .theme-list { display: grid; gap: 10px; }
        .theme-row {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          padding: 12px 14px;
          border-radius: 16px;
          background: var(--surface);
          border: 1px solid transparent;
          font-weight: 500;
        }
        .theme-row.selected { border-color: var(--accent); }
        .theme-row.locked { opacity: 0.85; }
        .swatch {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          flex: 0 0 auto;
        }
        .tag, .lock {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .tag.pro, .lock { color: var(--accent); }
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
        .toggle-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 16px;
          background: var(--surface);
          font-weight: 600;
        }
        .toggle-pill {
          width: 46px;
          height: 28px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--text-muted) 35%, transparent);
          position: relative;
          transition: background 160ms ease;
        }
        .toggle-pill::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #fff;
          transition: transform 160ms ease;
        }
        .toggle-row.on .toggle-pill { background: var(--accent); }
        .toggle-row.on .toggle-pill::after { transform: translateX(18px); }
        .days-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 10px;
        }
        .days-grid button {
          padding: 12px 10px;
          border-radius: 14px;
          background: var(--surface);
          font-weight: 600;
          color: var(--text-muted);
          border: 1px solid transparent;
        }
        .days-grid button.selected {
          border-color: var(--accent);
          color: var(--text);
        }
        .days-grid button:disabled { opacity: 0.45; }
        .pro-row {
          margin-top: 24px;
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
        .link-row {
          width: 100%;
          text-align: left;
          margin-top: 8px;
          padding: 12px 4px;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
