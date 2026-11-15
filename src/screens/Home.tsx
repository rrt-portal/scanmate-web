import { useRef, useState } from 'react'
import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconDocPlus } from '../icons'
import { recognizeImage } from '../ocr/recognize'
import { parseTextUseCase } from '../domain/parseText'
import type { ScanDraft } from '../domain/types'

type Props = {
  lang: Lang
  onRecognized: (draft: ScanDraft) => void
}

export function Home({ lang, onRecognized }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState<number | null>(null)
  const [status, setStatus] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  function openPicker() {
    inputRef.current?.click()
  }

  function onFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setError(null)
    const reader = new FileReader()
    reader.onload = () => {
      const url = String(reader.result ?? '')
      setPreviewUrl(url)
    }
    reader.readAsDataURL(file)
  }

  async function runOcr() {
    if (!previewUrl || busy) return
    setBusy(true)
    setError(null)
    setProgress(0)
    setStatus(t(lang, 'recognizing'))
    try {
      const text = await recognizeImage(previewUrl, (p) => {
        setProgress(Math.max(0, Math.min(1, p.progress)))
        if (p.status) setStatus(p.status)
      })
      const parsed = parseTextUseCase(text)
      onRecognized({ imageDataUrl: previewUrl, text: text || '—', parsed })
      setProgress(null)
      setStatus('')
    } catch {
      setError(t(lang, 'ocrError'))
      setProgress(null)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="screen">
      <header className="home-header anim-fade-up">
        <div className="brand-solid" style={{ fontSize: '1.55rem' }}>
          ScanMate
        </div>
        <div className="muted" style={{ marginTop: 4, fontSize: '0.95rem' }}>
          {t(lang, 'home')}
        </div>
      </header>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          onFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      {!previewUrl ? (
        <div className="empty">
          <div className="empty-card anim-fade-up-delay">
            <div className="empty-icon anim-pulse">
              <IconDocPlus />
            </div>
            <h2>{t(lang, 'emptyTitle')}</h2>
            <p>{t(lang, 'emptyBody')}</p>
            <button type="button" className="primary-btn" onClick={openPicker} style={{ marginTop: 8 }}>
              {t(lang, 'chooseScreenshot')}
            </button>
          </div>
        </div>
      ) : (
        <div className="screen-scroll preview-wrap anim-fade-up">
          <img className="preview-img" src={previewUrl} alt="" />
          {progress !== null && (
            <div className="ocr-progress" aria-live="polite">
              <div className="ocr-bar">
                <span style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
              <div className="muted ocr-status">
                {t(lang, 'recognizing')} {Math.round((progress ?? 0) * 100)}%
                {status ? ` · ${status}` : ''}
              </div>
            </div>
          )}
          {error && (
            <div className="ocr-error">
              <p>{error}</p>
              <button type="button" className="primary-btn" onClick={runOcr}>
                {t(lang, 'retry')}
              </button>
            </div>
          )}
          {!error && progress === null && (
            <div className="preview-actions">
              <button type="button" className="primary-btn" disabled={busy} onClick={runOcr}>
                {t(lang, 'recognize')}
              </button>
              <button type="button" className="ghost-btn" onClick={openPicker}>
                {t(lang, 'changeImage')}
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        .preview-wrap { display: grid; gap: 14px; align-content: start; }
        .preview-img {
          width: 100%;
          max-height: 48vh;
          object-fit: contain;
          border-radius: 18px;
          background: var(--surface-strong);
          border: 1px solid color-mix(in srgb, var(--accent) 14%, transparent);
        }
        .preview-actions { display: grid; gap: 8px; }
        .ocr-progress { display: grid; gap: 8px; }
        .ocr-bar {
          height: 10px;
          border-radius: 999px;
          background: var(--surface);
          overflow: hidden;
        }
        .ocr-bar span {
          display: block;
          height: 100%;
          background: var(--accent);
          transition: width 120ms linear;
        }
        .ocr-status { font-size: 0.85rem; }
        .ocr-error {
          display: grid;
          gap: 10px;
          padding: 14px;
          border-radius: 16px;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, #ff6b6b 45%, transparent);
        }
        .ocr-error p { margin: 0; font-weight: 600; }
      `}</style>
    </div>
  )
}
