import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ConsentDialog } from './ConsentDialog'

describe('ConsentDialog smoke', () => {
  it('renders consent copy and accepts', async () => {
    const user = userEvent.setup()
    const onAccept = vi.fn()
    const onPrivacy = vi.fn()
    const onTerms = vi.fn()

    render(<ConsentDialog lang="ru" onAccept={onAccept} onPrivacy={onPrivacy} onTerms={onTerms} />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Согласие')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Принимаю' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Конфиденциальность' }))
    expect(onPrivacy).toHaveBeenCalledOnce()

    await user.click(screen.getByRole('button', { name: 'Принимаю' }))
    expect(onAccept).toHaveBeenCalledOnce()
  })

  it('renders English strings', () => {
    render(
      <ConsentDialog
        lang="en"
        onAccept={() => undefined}
        onPrivacy={() => undefined}
        onTerms={() => undefined}
      />,
    )
    expect(screen.getByText('Consent')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'I agree' })).toBeInTheDocument()
  })
})
