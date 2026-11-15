import { useMemo, useState } from 'react'
import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconScan } from '../icons'

type Props = {
  lang: Lang
  onDone: () => void
}

export function Onboarding({ lang, onDone }: Props) {
  const [index, setIndex] = useState(0)

  const slides = useMemo(
    () => [
      {
        title: t(lang, 'slide1Title'),
        body: t(lang, 'slide1Body'),
        art: (
          <div className="onb-art anim-pulse" style={{ color: 'var(--accent)' }}>
            <IconScan />
          </div>
        ),
      },
      {
        title: t(lang, 'slide2Title'),
        body: t(lang, 'slide2Body'),
        art: (
          <div className="onb-stack anim-pulse" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        ),
      },
      {
        title: t(lang, 'slide3Title'),
        body: t(lang, 'slide3Body'),
        art: (
          <div className="onb-bars anim-pulse" aria-hidden>
            <i style={{ background: '#5CFFB1' }} />
            <i style={{ background: '#5CD1F1', height: 72 }} />
            <i style={{ background: '#FFB05C', height: 42 }} />
          </div>
        ),
      },
    ],
    [lang],
  )

  const slide = slides[index]
  const isLast = index === slides.length - 1

  return (
    <div className="screen onboarding">
      <div className="onb-top">
        <button type="button" className="ghost-btn" onClick={onDone}>
          {t(lang, 'skip')}
        </button>
      </div>

      <div className="onb-main anim-fade-up" key={index}>
        <div className="brand onb-brand">ScanMate</div>
        {slide.art}
        <h1>{slide.title}</h1>
        <p className="muted anim-fade-up-delay">{slide.body}</p>
      </div>

      <div className="onb-footer">
        <div className="dots" aria-hidden>
          {slides.map((_, i) => (
            <span key={i} className={i === index ? 'dot active' : 'dot'} />
          ))}
        </div>
        <button
          type="button"
          className="primary-btn"
          onClick={() => {
            if (isLast) onDone()
            else setIndex((v) => v + 1)
          }}
        >
          {isLast ? t(lang, 'start') : t(lang, 'next')}
        </button>
      </div>

      <style>{`
        .onboarding { padding-bottom: 24px; }
        .onb-top { display: flex; justify-content: flex-end; min-height: 36px; }
        .onb-main {
          flex: 1;
          display: grid;
          align-content: center;
          justify-items: center;
          text-align: center;
          gap: 18px;
          padding: 8px 8px 24px;
        }
        .onb-brand { font-size: 2rem; }
        .onb-main h1 {
          margin: 4px 0 0;
          font-size: 1.7rem;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .onb-main p {
          margin: 0;
          max-width: 320px;
          line-height: 1.5;
          font-size: 0.98rem;
        }
        .onb-art { width: 96px; height: 96px; display: grid; place-items: center; }
        .onb-art svg { width: 88px; height: 88px; }
        .onb-stack {
          width: 110px;
          height: 92px;
          position: relative;
        }
        .onb-stack span {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          border: 2px solid color-mix(in srgb, var(--accent) 70%, white 10%);
          background: color-mix(in srgb, var(--accent) 10%, transparent);
        }
        .onb-stack span:nth-child(1) { transform: translate(10px, -8px) rotate(6deg); opacity: 0.45; }
        .onb-stack span:nth-child(2) { transform: translate(-6px, 4px) rotate(-4deg); opacity: 0.7; }
        .onb-stack span:nth-child(3) { transform: translate(0, 10px); }
        .onb-bars {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          height: 80px;
        }
        .onb-bars i {
          display: block;
          width: 22px;
          height: 56px;
          border-radius: 10px;
        }
        .onb-footer { display: grid; gap: 16px; }
        .dots { display: flex; justify-content: center; gap: 8px; align-items: center; }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--text-muted) 55%, transparent);
        }
        .dot.active {
          width: 22px;
          background: var(--accent);
        }
      `}</style>
    </div>
  )
}
