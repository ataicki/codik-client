import JsRunnerWorker from './jsCodeRunner.worker.ts?worker'

type WorkerOk = { id: string; ok: true; output: string }
type WorkerErr = { id: string; ok: false; error: string }
type WorkerResult = WorkerOk | WorkerErr

let worker: Worker | null = null
const pending = new Map<string, (result: WorkerResult) => void>()

const getWorker = () => {
    if (!worker) {
        worker = new JsRunnerWorker()
        worker.onmessage = (event: MessageEvent<WorkerResult>) => {
            const data = event.data
            const handler = pending.get(data.id)
            if (handler) {
                pending.delete(data.id)
                handler(data)
            }
        }
    }
    return worker
}

export const normalizeCodeOutput = (value: string) => value.trim().replace(/\r\n/g, '\n')

export const runJavaScriptInWorker = (
    code: string,
    timeoutMs = 4000,
): Promise<{ output: string; error?: string }> => {
    const id = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`

    return new Promise(resolve => {
        const w = getWorker()
        pending.set(id, result => {
            if (result.ok) {
                resolve({ output: normalizeCodeOutput(result.output) })
            } else {
                resolve({ output: '', error: result.error })
            }
        })
        w.postMessage({ id, code, timeoutMs })
    })
}

export const outputsMatch = (actual: string, expected: string) =>
    normalizeCodeOutput(actual) === normalizeCodeOutput(expected)
