import type { ScanItem } from '../domain/types'

const DB_NAME = 'scanmate'
const DB_VERSION = 1
const STORE = 'history'
export const HISTORY_MAX = 50

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' })
        store.createIndex('timestamp', 'timestamp')
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error ?? new Error('IndexedDB open failed'))
  })
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB tx failed'))
    tx.onabort = () => reject(tx.error ?? new Error('IndexedDB tx aborted'))
  })
}

export async function listHistory(): Promise<ScanItem[]> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).index('timestamp').getAll()
    req.onsuccess = () => {
      const items = (req.result as ScanItem[])
        .slice()
        .sort((a, b) => b.timestamp - a.timestamp)
      resolve(items)
    }
    req.onerror = () => reject(req.error ?? new Error('list failed'))
  })
}

export async function saveHistoryItem(item: ScanItem): Promise<void> {
  const existing = await listHistory()
  const merged = [item, ...existing.filter((e) => e.id !== item.id)].sort(
    (a, b) => b.timestamp - a.timestamp,
  )
  const keep = merged.slice(0, HISTORY_MAX)
  const keepIds = new Set(keep.map((e) => e.id))
  const drop = existing.filter((e) => !keepIds.has(e.id))

  const db = await openDb()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  store.put(item)
  for (const old of drop) store.delete(old.id)
  await txDone(tx)
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const db = await openDb()
  const tx = db.transaction(STORE, 'readwrite')
  tx.objectStore(STORE).delete(id)
  await txDone(tx)
}

export async function clearHistory(): Promise<void> {
  const db = await openDb()
  const tx = db.transaction(STORE, 'readwrite')
  tx.objectStore(STORE).clear()
  await txDone(tx)
}

export async function pruneHistory(autoDeleteDays: number): Promise<number> {
  if (autoDeleteDays <= 0) return 0
  const cutoff = Date.now() - autoDeleteDays * 24 * 60 * 60 * 1000
  const items = await listHistory()
  const stale = items.filter((i) => i.timestamp < cutoff)
  if (!stale.length) return 0
  const db = await openDb()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  for (const item of stale) store.delete(item.id)
  await txDone(tx)
  return stale.length
}
