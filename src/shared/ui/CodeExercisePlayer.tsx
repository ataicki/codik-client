import { useEffect, useRef, useState } from 'react'
import { Alert, Button, Group, Paper, Stack, Text, Title } from '@mantine/core'
import Editor from '@monaco-editor/react'
import ReactMarkdown from 'react-markdown'
import type { CourseCodeExercise } from '../../entities'
import { outputsMatch, runJavaScriptInWorker } from '../code'

type Props = {
    exercise: CourseCodeExercise
    initialCode?: string
    onSuccess?: () => void
}

const CodeExercisePlayer = ({ exercise, initialCode, onSuccess }: Props) => {
    const [code, setCode] = useState(initialCode ?? exercise.starterCode)
    const [running, setRunning] = useState(false)
    const [feedback, setFeedback] = useState<string | null>(null)
    const [ok, setOk] = useState<boolean | null>(null)
    const successReported = useRef(false)

    useEffect(() => {
        successReported.current = false
        setCode(initialCode ?? exercise.starterCode)
        setFeedback(null)
        setOk(null)
    }, [exercise.id, exercise.starterCode, initialCode])

    const run = async () => {
        setRunning(true)
        setFeedback(null)
        setOk(null)
        try {
            const { output, error } = await runJavaScriptInWorker(code, 5000)
            if (error) {
                setFeedback(error)
                setOk(false)
                return
            }
            const pass = outputsMatch(output, exercise.expectedOutput)
            setOk(pass)
            setFeedback(pass ? 'Верно!' : `Получено:\n${output}`)
            if (pass && !successReported.current) {
                successReported.current = true
                onSuccess?.()
            }
        } finally {
            setRunning(false)
        }
    }

    return (
        <Paper withBorder p="md" radius="md">
            <Stack gap="md">
                <div>
                    <Title order={5}>{exercise.taskTitle || 'Задача'}</Title>
                    {exercise.description ? (
                        <Text size="sm" c="dimmed" mt={4} component="div">
                            <ReactMarkdown>{exercise.description}</ReactMarkdown>
                        </Text>
                    ) : null}
                </div>
                <div style={{ border: '1px solid var(--mantine-color-gray-4)', borderRadius: 8, overflow: 'hidden' }}>
                    <Editor
                        height="220px"
                        defaultLanguage="javascript"
                        theme="vs-light"
                        value={code}
                        onChange={value => setCode(value ?? '')}
                        options={{ minimap: { enabled: false }, fontSize: 13 }}
                    />
                </div>
                <Group>
                    <Button onClick={run} loading={running}>
                        Запустить и проверить
                    </Button>
                </Group>
                {feedback !== null && (
                    <Alert color={ok ? 'green' : 'red'}>
                        <Text style={{ whiteSpace: 'pre-wrap' }}>{feedback}</Text>
                    </Alert>
                )}
            </Stack>
        </Paper>
    )
}

export default CodeExercisePlayer
