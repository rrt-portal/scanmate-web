import { beforeEach, describe, expect, it } from 'vitest'
import type { ScanItem } from '../domain/types'
import {
  HISTORY_MAX,
  clearHistory,
  deleteHistoryItem,
  listHistory,
  pruneHistory,
  saveHistoryItem,
} from './historyStore'

function item(partial: Partial<ScanItem> & { id: string }): ScanItem {
  return {
    text: partial.text ?? `text-${partial.id}`,
    imageDataUrl: partial.imageDataUrl ?? null,
    timestamp: partial.timestamp ?? Date.now(),
    phone: partial.phone ?? null,
    url: partial.url ?? null,
    address: partial.address ?? null,
    ...partial,
  }
}

describe('historyStore', () => {
  beforeEach(async () => {
    await clearHistory()
  })

  it('saves and lists newest first', async () => {
    await saveHistoryItem(item({ id: 'a', timestamp: 100, text: 'older' }))
    await saveHistoryItem(item({ id: 'b', timestamp: 200, text: 'newer' }))
    const list = await listHistory()
    expect(list.map((x) => x.id)).toEqual(['b', 'a'])
  })

  it('updates existing id in place', async () => {
    await saveHistoryItem(item({ id: 'a', text: 'one', timestamp: 1 }))
    await saveHistoryItem(item({ id: 'a', text: 'two', timestamp: 2 }))
    const list = await listHistory()
    expect(list).toHaveLength(1)
    expect(list[0]?.text).toBe('two')
  })

  it('deletes a single item', async () => {
    await saveHistoryItem(item({ id: 'a', timestamp: 1 }))
    await saveHistoryItem(item({ id: 'b', timestamp: 2 }))
    await deleteHistoryItem('a')
    expect((await listHistory()).map((x) => x.id)).toEqual(['b'])
  })

  it('clears all items', async () => {
    await saveHistoryItem(item({ id: 'a', timestamp: 1 }))
    await clearHistory()
    expect(await listHistory()).toEqual([])
  })

  it('enforces max 50 items', async () => {
    for (let i = 0; i < HISTORY_MAX + 5; i++) {
      await saveHistoryItem(item({ id: `id-${i}`, timestamp: i + 1 }))
    }
    const list = await listHistory()
    expect(list).toHaveLength(HISTORY_MAX)
    expect(list[0]?.id).toBe(`id-${HISTORY_MAX + 4}`)
    expect(list.some((x) => x.id === 'id-0')).toBe(false)
  })

  it('prunes by auto-delete days', async () => {
    const now = Date.now()
    await saveHistoryItem(item({ id: 'fresh', timestamp: now }))
    await saveHistoryItem(item({ id: 'stale', timestamp: now - 10 * 24 * 60 * 60 * 1000 }))
    const removed = await pruneHistory(7)
    expect(removed).toBe(1)
    const list = await listHistory()
    expect(list.map((x) => x.id)).toEqual(['fresh'])
  })

  it('prune with 0 days is a no-op', async () => {
    await saveHistoryItem(item({ id: 'a', timestamp: 1 }))
    expect(await pruneHistory(0)).toBe(0)
    expect(await listHistory()).toHaveLength(1)
  })
})
