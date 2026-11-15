import { createWorker, type Worker } from 'tesseract.js'

export type OcrProgress = {
  status: string
  progress: number
}

let workerPromise: Promise<Worker> | null = null

async function getWorker(onProgress?: (p: OcrProgress) => void): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = (async () => {
      const worker = await createWorker('eng+rus', 1, {
        logger: (m) => {
          if (!onProgress) return
          const progress = typeof m.progress === 'number' ? m.progress : 0
          onProgress({ status: String(m.status ?? ''), progress })
        },
      })
      return worker
    })()
  }
  return workerPromise
}

export async function recognizeImage(
  image: string | File | Blob,
  onProgress?: (p: OcrProgress) => void,
): Promise<string> {
  // Recreate worker with fresh logger when progress callback changes
  if (workerPromise) {
    try {
      const old = await workerPromise
      await old.terminate()
    } catch {
      /* ignore */
    }
    workerPromise = null
  }

  const worker = await getWorker(onProgress)
  try {
    const { data } = await worker.recognize(image)
    return (data.text ?? '').trim()
  } catch (err) {
    workerPromise = null
    try {
      await worker.terminate()
    } catch {
      /* ignore */
    }
    throw err
  }
}

export async function disposeOcrWorker(): Promise<void> {
  if (!workerPromise) return
  try {
    const worker = await workerPromise
    await worker.terminate()
  } finally {
    workerPromise = null
  }
}
