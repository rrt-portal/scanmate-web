import type { ReactNode } from 'react'
import { t } from '../i18n'
import type { Lang } from '../storage'
import { IconHistory, IconHome, IconSettings } from '../icons'

export type TabId = 'home' | 'history' | 'settings'

type Props = {
  lang: Lang
  active: TabId
  onChange: (tab: TabId) => void
}

export function BottomNav({ lang, active, onChange }: Props) {
  const items: { id: TabId; label: string; icon: ReactNode }[] = [
    { id: 'home', label: t(lang, 'home'), icon: <IconHome /> },
    { id: 'history', label: t(lang, 'history'), icon: <IconHistory /> },
    { id: 'settings', label: t(lang, 'settings'), icon: <IconSettings /> },
  ]

  return (
    <nav className="bottom-nav" aria-label="Main">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`nav-item${active === item.id ? ' active' : ''}`}
          onClick={() => onChange(item.id)}
          aria-current={active === item.id ? 'page' : undefined}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
