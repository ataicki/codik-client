import { useState } from 'react'
import { Alert, Button, Group, Stack, Text, TextInput, Textarea } from '@mantine/core'
import Editor from '@monaco-editor/react'
import type { CourseCodeExercise } from '../../../../entities'
import { outlinedInputStyles } from '../model/inputStyles'
import { useCourseBuilderActions } from '../model/CourseBuilderContext'
import { outputsMatch, runJavaScriptInWorker } from '../../../../shared/code'

type Props = {
    moduleId: string
    stepId: string
    codeExercise: CourseCodeExercise
}

const CodeExerciseEditor = ({ moduleId, stepId, codeExercise }: Props) => {
    const { updateCodeExercise, removeCodeExercise } = useCourseBuilderActions()

    const [checkMessage, setCheckMessage] = useState<string | null>(null)
    const [checking, setChecking] = useState(false)

    const patchExercise = (patch: Partial<CourseCodeExercise>) => {
        updateCodeExercise(moduleId, stepId, codeExercise.id, patch)
    }

    const verifyStarter = async () => {
        setChecking(true)
        setCheckMessage(null)

        try {
            const { output, error } = await runJavaScriptInWorker(codeExercise.starterCode, 5000)

            if (error) {
                setCheckMessage(`Ошибка выполнения: ${error}`)
                return
            }

            if (outputsMatch(output, codeExercise.expectedOutput)) {
                setCheckMessage('Вывод совпадает с ожидаемым результатом.')
            } else {
                setCheckMessage(
                    `Вывод не совпадает.\nПолучено:\n${output}\n\nОжидалось:\n${codeExercise.expectedOutput.trim()}`,
                )
            }
        } finally {
            setChecking(false)
        }
    }

    return (
        <Stack gap="sm">
            <Group justify="space-between">
                <div>
                    <Text fw={600}>Кодовая задача (JavaScript)</Text>
                </div>

                <Button
                    color="red"
                    variant="light"
                    onClick={() => removeCodeExercise(moduleId, stepId, codeExercise.id)}
                >
                    Удалить
                </Button>
            </Group>

            <TextInput
                label="Название задачи"
                value={codeExercise.taskTitle}
                onChange={e => patchExercise({ taskTitle: e.currentTarget.value })}
                styles={outlinedInputStyles}
            />

            <Textarea
                label="Описание"
                value={codeExercise.description}
                onChange={e => patchExercise({ description: e.currentTarget.value })}
                minRows={3}
                styles={outlinedInputStyles}
            />

            <Textarea
                label="Ожидаемый вывод"
                value={codeExercise.expectedOutput}
                onChange={e => patchExercise({ expectedOutput: e.currentTarget.value })}
                minRows={2}
                styles={outlinedInputStyles}
            />

            <Text size="xs" c="dimmed">
                Стартовый код
            </Text>

            <div style={{ border: '1px solid var(--mantine-color-gray-4)', borderRadius: 8 }}>
                <Editor
                    height="200px"
                    defaultLanguage="javascript"
                    theme="vs-light"
                    value={codeExercise.starterCode}
                    onChange={value => patchExercise({ starterCode: value ?? '' })}
                    options={{ minimap: { enabled: false }, fontSize: 13 }}
                />
            </div>

            <Group>
                <Button variant="light" onClick={verifyStarter} loading={checking}>
                    Проверить код
                </Button>
            </Group>

            {checkMessage && (
                <Alert color={checkMessage.includes('совпадает') ? 'green' : 'yellow'}>
                    <Text style={{ whiteSpace: 'pre-wrap' }}>{checkMessage}</Text>
                </Alert>
            )}
        </Stack>
    )
}

export default CodeExerciseEditor
