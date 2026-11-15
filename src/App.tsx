import { useEffect, useRef, useState } from 'react'
import { pruneHistory, saveHistoryItem } from './data/historyStore'
import { BottomNav, type TabId } from './components/BottomNav'
import { Toast } from './components/Toast'
import type { ScanDraft, ScanItem } from './domain/types'
import { t } from './i18n'
import { History } from './screens/History'
import { Home } from './screens/Home'
import { Onboarding } from './screens/Onboarding'
import { Paywall } from './screens/Paywall'
import { Result } from './screens/Result'
import { Settings } from './screens/Settings'
import {
  readAutoDeleteDays,
  readHistoryEnabled,
  readLang,
  readOnboarded,
  readTheme,
  writeAutoDeleteDays,
  writeHistoryEnabled,
  writeLang,
  writeOnboarded,
  writeTheme,
  type AutoDeleteDays,
  type Lang,
  type ThemeId,
} from './storage'
import { applyTheme, themes } from './theme'

type Route = 'onboarding' | 'main' | 'paywall' | 'result'

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `scan_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readLang())
  const [themeId, setThemeId] = useState<ThemeId>(() => readTheme())
  const [historyEnabled, setHistoryEnabled] = useState(() => readHistoryEnabled())
  const [autoDeleteDays, setAutoDeleteDays] = useState<AutoDeleteDays>(() => readAutoDeleteDays())
  const [route, setRoute] = useState<Route>(() => (readOnboarded() ? 'main' : 'onboarding'))
  const [tab, setTab] = useState<TabId>('home')
  const [draft, setDraft] = useState<ScanDraft | null>(null)
  const [historyTick, setHistoryTick] = useState(0)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    applyTheme(themes[themeId])
  }, [themeId])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!historyEnabled) return
    void pruneHistory(autoDeleteDays).then((n) => {
      if (n > 0) setHistoryTick((v) => v + 1)
    })
  }, [historyEnabled, autoDeleteDays])

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

  function changeHistoryEnabled(enabled: boolean) {
    writeHistoryEnabled(enabled)
    setHistoryEnabled(enabled)
  }

  function changeAutoDeleteDays(days: AutoDeleteDays) {
    writeAutoDeleteDays(days)
    setAutoDeleteDays(days)
  }

  async function handleRecognized(next: ScanDraft) {
    setDraft(next)
    setRoute('result')
    if (!historyEnabled) {
      showToast(t(lang, 'historyDisabled'))
      return
    }
    const item: ScanItem = {
      id: newId(),
      text: next.text,
      imageDataUrl: next.imageDataUrl,
      timestamp: Date.now(),
      phone: next.parsed.phone,
      url: next.parsed.url,
      address: next.parsed.address,
    }
    try {
      await saveHistoryItem(item)
      setHistoryTick((v) => v + 1)
      showToast(t(lang, 'savedToHistory'))
    } catch {
      /* keep result even if history write fails */
    }
  }

  async function shareDraft() {
    if (!draft) return
    try {
      if (navigator.share) {
        await navigator.share({ title: 'ScanMate', text: draft.text })
        return
      }
      await navigator.clipboard.writeText(draft.text)
      showToast(t(lang, 'copied'))
    } catch {
      showToast(t(lang, 'shareUnavailable'))
    }
  }

  return (
    <div className="app-shell">
      <div className="phone">
        {route === 'onboarding' && <Onboarding lang={lang} onDone={finishOnboarding} />}

        {route === 'main' && (
          <>
            {tab === 'home' && <Home lang={lang} onRecognized={handleRecognized} />}
            {tab === 'history' && (
              <History lang={lang} historyEnabled={historyEnabled} refreshKey={historyTick} />
            )}
            {tab === 'settings' && (
              <Settings
                lang={lang}
                theme={themeId}
                historyEnabled={historyEnabled}
                autoDeleteDays={autoDeleteDays}
                onLang={changeLang}
                onTheme={changeTheme}
                onHistoryEnabled={changeHistoryEnabled}
                onAutoDeleteDays={changeAutoDeleteDays}
                onBuyPro={() => setRoute('paywall')}
              />
            )}
            <BottomNav lang={lang} active={tab} onChange={setTab} />
          </>
        )}

        {route === 'result' && draft && (
          <Result
            lang={lang}
            draft={draft}
            onBack={() => setRoute('main')}
            onShare={() => void shareDraft()}
            onToast={showToast}
          />
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
