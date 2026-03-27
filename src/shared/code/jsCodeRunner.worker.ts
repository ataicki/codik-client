/// <reference lib="webworker" />

type WorkerRequest = { id: string; code: string; timeoutMs: number }

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
    const { id, code, timeoutMs } = event.data
    const logs: string[] = []
    const mockConsole = {
        log: (...args: unknown[]) => {
            logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '))
        },
        error: (...args: unknown[]) => {
            logs.push(args.map(a => String(a)).join(' '))
        },
    }

    let finished = false
    const timeoutId = setTimeout(() => {
        if (finished) return
        finished = true
        self.postMessage({ id, ok: false, error: 'Превышено время выполнения' })
    }, timeoutMs)

    try {
        const runner = new Function('console', `"use strict";\n${code}`)
        const ret = runner(mockConsole)
        if (finished) return
        finished = true
        clearTimeout(timeoutId)
        const output =
            logs.length > 0 ? logs.join('\n') : ret !== undefined && ret !== null ? String(ret) : ''
        self.postMessage({ id, ok: true, output })
    } catch (error) {
        if (finished) return
        finished = true
        clearTimeout(timeoutId)
        self.postMessage({ id, ok: false, error: error instanceof Error ? error.message : String(error) })
    }
}

export {}
