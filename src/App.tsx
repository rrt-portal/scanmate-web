import { useEffect, useRef, useState } from 'react'
import { BottomNav, type TabId } from './components/BottomNav'
import { Toast } from './components/Toast'
import { t } from './i18n'
import { History } from './screens/History'
import { Home } from './screens/Home'
import { Onboarding } from './screens/Onboarding'
import { Paywall } from './screens/Paywall'
import { Settings } from './screens/Settings'
import {
  readLang,
  readOnboarded,
  readTheme,
  writeLang,
  writeOnboarded,
  writeTheme,
  type Lang,
  type ThemeId,
} from './storage'
import { applyTheme, themes } from './theme'

type Route = 'onboarding' | 'main' | 'paywall'

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readLang())
  const [themeId, setThemeId] = useState<ThemeId>(() => readTheme())
  const [route, setRoute] = useState<Route>(() => (readOnboarded() ? 'main' : 'onboarding'))
  const [tab, setTab] = useState<TabId>('home')
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    applyTheme(themes[themeId])
  }, [themeId])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  function showToast(message: string) {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 2200)
  }

  function finishOnboarding() {
    writeOnboarded()
    setRoute('main')
  }

  function changeLang(next: Lang) {
    writeLang(next)
    setLang(next)
  }

  function changeTheme(next: ThemeId) {
    writeTheme(next)
    setThemeId(next)
  }

  return (
    <div className="app-shell">
      <div className="phone">
        {route === 'onboarding' && <Onboarding lang={lang} onDone={finishOnboarding} />}

        {route === 'main' && (
          <>
            {tab === 'home' && (
              <Home lang={lang} onPick={() => showToast(t(lang, 'chooseSoon'))} />
            )}
            {tab === 'history' && <History lang={lang} />}
            {tab === 'settings' && (
              <Settings
                lang={lang}
                theme={themeId}
                onLang={changeLang}
                onTheme={changeTheme}
                onBuyPro={() => setRoute('paywall')}
              />
            )}
            <BottomNav lang={lang} active={tab} onChange={setTab} />
          </>
        )}

        {route === 'paywall' && (
          <Paywall
            lang={lang}
            onBack={() => {
              setRoute('main')
              setTab('settings')
            }}
            onBuy={() => showToast(t(lang, 'buySoon'))}
            onRestore={() => showToast(t(lang, 'restoreSoon'))}
          />
        )}

        <Toast message={toast} />
      </div>
    </div>
  )
}
