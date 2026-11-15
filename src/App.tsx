import { useEffect, useRef, useState } from 'react'
import { FREE_SCAN_LIMIT } from './billing'
import { ConsentDialog } from './components/ConsentDialog'
import { InterstitialAd } from './components/InterstitialAd'
import { PaywallDialog } from './components/PaywallDialog'
import { BottomNav, type TabId } from './components/BottomNav'
import { Toast } from './components/Toast'
import { pruneHistory, saveHistoryItem } from './data/historyStore'
import type { ScanDraft, ScanItem } from './domain/types'
import { t } from './i18n'
import { privacyHtml, termsHtml } from './legal'
import { History } from './screens/History'
import { Home } from './screens/Home'
import { LegalPage } from './screens/LegalPage'
import { Onboarding } from './screens/Onboarding'
import { Paywall } from './screens/Paywall'
import { Result } from './screens/Result'
import { Settings } from './screens/Settings'
import {
  incrementScanCount,
  isThemeFree,
  readAutoDeleteDays,
  readConsent,
  readHistoryEnabled,
  readIsPro,
  readLang,
  readLastInterstitialAt,
  readOnboarded,
  readScanCount,
  readTheme,
  writeAutoDeleteDays,
  writeConsent,
  writeHistoryEnabled,
  writeIsPro,
  writeLang,
  writeLastInterstitialAt,
  writeOnboarded,
  writeTheme,
  type AutoDeleteDays,
  type Lang,
  type ThemeId,
} from './storage'
import { applyTheme, themes } from './theme'
import { canFreeScan, shouldShowInterstitial } from './viewmodel/monetization'

type Route =
  'consent' | 'onboarding' | 'main' | 'paywall' | 'result' | 'privacy' | 'terms' | 'about'

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `scan_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function initialRoute(): Route {
  if (!readConsent()) return 'consent'
  if (!readOnboarded()) return 'onboarding'
  return 'main'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readLang())
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = readTheme()
    if (!isThemeFree(saved) && !readIsPro()) return 'midnight'
    return saved
  })
  const [isPro, setIsPro] = useState(() => readIsPro())
  const [scanCount, setScanCount] = useState(() => readScanCount())
  const [historyEnabled, setHistoryEnabled] = useState(() => readHistoryEnabled())
  const [autoDeleteDays, setAutoDeleteDays] = useState<AutoDeleteDays>(() => readAutoDeleteDays())
  const [route, setRoute] = useState<Route>(() => initialRoute())
  const [tab, setTab] = useState<TabId>('home')
  const [draft, setDraft] = useState<ScanDraft | null>(null)
  const [historyTick, setHistoryTick] = useState(0)
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [showInterstitial, setShowInterstitial] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)
  const returnTab = useRef<TabId>('settings')
  const legalReturn = useRef<Route>('main')

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

  function acceptConsent() {
    writeConsent()
    setRoute(readOnboarded() ? 'main' : 'onboarding')
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

  function activatePro() {
    writeIsPro(true)
    setIsPro(true)
    showToast(t(lang, 'proActivated'))
  }

  function buyPro() {
    if (readIsPro()) {
      showToast(t(lang, 'alreadyPro'))
      return
    }
    activatePro()
  }

  function restorePurchases() {
    if (readIsPro()) {
      setIsPro(true)
      showToast(t(lang, 'restoreOk'))
      return
    }
    // Preview: restore only succeeds if already purchased locally
    showToast(t(lang, 'restoreNone'))
  }

  function maybeShowInterstitial(nextCount: number) {
    if (
      !shouldShowInterstitial({
        isPro: isPro || readIsPro(),
        scanCount: nextCount,
        lastInterstitialAt: readLastInterstitialAt(),
      })
    ) {
      return
    }
    writeLastInterstitialAt(Date.now())
    setShowInterstitial(true)
  }

  async function handleRecognized(next: ScanDraft) {
    if (!canFreeScan(isPro, scanCount, FREE_SCAN_LIMIT)) {
      setShowLimitDialog(true)
      return
    }

    const nextCount = isPro ? scanCount : incrementScanCount()
    if (!isPro) setScanCount(nextCount)

    setDraft(next)
    setRoute('result')
    maybeShowInterstitial(nextCount)

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

  function openPaywall(from: TabId = 'settings') {
    returnTab.current = from
    setRoute('paywall')
  }

  const showChrome = route === 'main'

  return (
    <div className="app-shell">
      <div className="phone">
        {route === 'consent' && (
          <ConsentDialog
            lang={lang}
            onAccept={acceptConsent}
            onPrivacy={() => {
              legalReturn.current = 'consent'
              setRoute('privacy')
            }}
            onTerms={() => {
              legalReturn.current = 'consent'
              setRoute('terms')
            }}
          />
        )}

        {route === 'onboarding' && <Onboarding lang={lang} onDone={finishOnboarding} />}

        {showChrome && (
          <>
            {tab === 'home' && (
              <Home
                lang={lang}
                isPro={isPro}
                scanCount={scanCount}
                onLimitReached={() => setShowLimitDialog(true)}
                onRecognized={handleRecognized}
              />
            )}
            {tab === 'history' && (
              <History
                lang={lang}
                historyEnabled={historyEnabled}
                refreshKey={historyTick}
                isPro={isPro}
              />
            )}
            {tab === 'settings' && (
              <Settings
                lang={lang}
                theme={themeId}
                isPro={isPro}
                scanCount={scanCount}
                historyEnabled={historyEnabled}
                autoDeleteDays={autoDeleteDays}
                onLang={changeLang}
                onTheme={changeTheme}
                onLockedTheme={() => openPaywall('settings')}
                onHistoryEnabled={changeHistoryEnabled}
                onAutoDeleteDays={changeAutoDeleteDays}
                onBuyPro={() => openPaywall('settings')}
                onRestore={restorePurchases}
                onPrivacy={() => {
                  legalReturn.current = 'main'
                  returnTab.current = 'settings'
                  setRoute('privacy')
                }}
                onTerms={() => {
                  legalReturn.current = 'main'
                  returnTab.current = 'settings'
                  setRoute('terms')
                }}
                onAbout={() => {
                  legalReturn.current = 'main'
                  returnTab.current = 'settings'
                  setRoute('about')
                }}
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
            isPro={isPro}
            onBack={() => {
              setRoute('main')
              setTab(returnTab.current)
            }}
            onBuy={buyPro}
            onRestore={restorePurchases}
          />
        )}

        {route === 'privacy' && (
          <LegalPage
            lang={lang}
            title={t(lang, 'privacy')}
            html={privacyHtml(lang)}
            onBack={() => {
              setRoute(legalReturn.current)
              if (legalReturn.current === 'main') setTab(returnTab.current)
            }}
          />
        )}

        {route === 'terms' && (
          <LegalPage
            lang={lang}
            title={t(lang, 'terms')}
            html={termsHtml(lang)}
            onBack={() => {
              setRoute(legalReturn.current)
              if (legalReturn.current === 'main') setTab(returnTab.current)
            }}
          />
        )}

        {route === 'about' && (
          <LegalPage
            lang={lang}
            title={t(lang, 'about')}
            html={`<h2>ScanMate</h2><p>${t(lang, 'aboutBody')}</p><p>${t(lang, 'version')}</p><p>${t(lang, 'previewBilling')}</p>`}
            onBack={() => {
              setRoute('main')
              setTab('settings')
            }}
          />
        )}

        {showLimitDialog && (
          <PaywallDialog
            lang={lang}
            onClose={() => setShowLimitDialog(false)}
            onOpenPaywall={() => openPaywall('home')}
          />
        )}

        {showInterstitial && (
          <InterstitialAd lang={lang} onClose={() => setShowInterstitial(false)} />
        )}

        <Toast message={toast} />
      </div>
    </div>
  )
}
