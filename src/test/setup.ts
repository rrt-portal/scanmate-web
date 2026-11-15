import '@testing-library/jest-dom/vitest'
import 'fake-indexeddb/auto'

if (typeof globalThis.localStorage === 'undefined' || !globalThis.localStorage.clear) {
  const store = new Map<string, string>()
  globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k)! : null),
    setItem: (k, v) => {
      store.set(String(k), String(v))
    },
    removeItem: (k) => {
      store.delete(String(k))
    },
    clear: () => store.clear(),
    key: (i) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size
    },
  }
}
