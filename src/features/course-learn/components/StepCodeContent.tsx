import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Paper, Stack, Title } from '@mantine/core'
import type { CourseCodeExercise } from '../../../entities'
import CodeExercisePlayer from '../../../shared/ui/CodeExercisePlayer'

type Props = {
    title: string
    exercises: CourseCodeExercise[]
    onPass: () => void
}

export const StepCodeContent = ({ title, exercises, onPass }: Props) => {
    const [doneIds, setDoneIds] = useState<Record<string, boolean>>({})
    const passReported = useRef(false)

    const total = exercises.length
    const completedCount = useMemo(
        () => exercises.filter(ex => doneIds[ex.id]).length,
        [doneIds, exercises],
    )

    const markDone = useCallback((id: string) => {
        setDoneIds(prev => (prev[id] ? prev : { ...prev, [id]: true }))
    }, [])

    useEffect(() => {
        if (!total || passReported.current) return
        if (exercises.every(ex => doneIds[ex.id])) {
            passReported.current = true
            onPass()
        }
    }, [doneIds, exercises, onPass, total])

    if (!exercises.length) {
        return (
            <Paper radius="xl" p="xl" withBorder>
                <Title order={4}>Задания с кодом скоро появятся</Title>
            </Paper>
        )
    }

    return (
        <Stack gap="lg">
            <Paper
                radius="xl"
                p="md"
                style={{
                    border: '2px solid var(--mantine-color-kidPink-3)',
                    background: 'linear-gradient(90deg, hsl(330 85% 98%) 0%, white 100%)',
                }}
            >
                <Title order={3}>{title}</Title>
                <Title order={5} c="dimmed" mt="xs" fw={600}>
                    Задачи: {completedCount} / {total}
                </Title>
            </Paper>
            {exercises.map(ex => (
                <CodeExercisePlayer key={ex.id} exercise={ex} onSuccess={() => markDone(ex.id)} />
            ))}
        </Stack>
    )
}
