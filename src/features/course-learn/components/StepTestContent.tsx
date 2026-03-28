import { useRef, useState } from 'react'
import { Alert, Button, Paper, Radio, Stack, Text, Title } from '@mantine/core'
import type { CourseTestQuestion } from '../../../entities'

type Props = {
    title: string
    questions: CourseTestQuestion[]
    onPass: () => void
}

export const StepTestContent = ({ title, questions, onPass }: Props) => {
    const [choices, setChoices] = useState<Record<string, string>>({})
    const [feedback, setFeedback] = useState<'ok' | 'bad' | null>(null)
    const reported = useRef(false)

    const handleCheck = () => {
        let allAnswered = true
        for (const q of questions) {
            if (!choices[q.id]) {
                allAnswered = false
                break
            }
        }
        if (!allAnswered) {
            setFeedback('bad')
            return
        }

        let allCorrect = true
        for (const q of questions) {
            const selected = choices[q.id]
            const correct = q.options.find(o => o.isCorrect)?.id
            if (selected !== correct) {
                allCorrect = false
                break
            }
        }

        if (allCorrect) {
            setFeedback('ok')
            if (!reported.current) {
                reported.current = true
                onPass()
            }
        } else {
            setFeedback('bad')
        }
    }

    return (
        <Paper
            radius="xl"
            p={{ base: 'md', sm: 'xl' }}
            style={{
                border: '2px solid var(--mantine-color-kidYellow-4)',
                background: 'linear-gradient(180deg, white 0%, hsl(48 95% 97%) 100%)',
            }}
        >
            <Stack gap="lg">
                <Title order={3}>{title}</Title>
                {questions.map((q, qi) => (
                    <Stack key={q.id} gap="sm">
                        <Text fw={700} fz="md">
                            {qi + 1}. {q.question}
                        </Text>
                        <Radio.Group
                            value={choices[q.id] ?? ''}
                            onChange={value => setChoices(prev => ({ ...prev, [q.id]: value }))}
                        >
                            <Stack gap={8}>
                                {q.options.map(o => (
                                    <Radio
                                        key={o.id}
                                        value={o.id}
                                        label={o.text}
                                        styles={{ label: { fontWeight: 600 } }}
                                    />
                                ))}
                            </Stack>
                        </Radio.Group>
                    </Stack>
                ))}
                <Button size="lg" radius="xl" color="kidYellow" onClick={handleCheck}>
                    Проверить ответы
                </Button>
                {feedback === 'bad' && (
                    <Alert color="orange" title="Почти!">
                        Ответь на все вопросы или попробуй другие варианты.
                    </Alert>
                )}
                {feedback === 'ok' && (
                    <Alert color="kidGreen" title="Супер!">
                        Все верно — можешь идти дальше!
                    </Alert>
                )}
            </Stack>
        </Paper>
    )
}
