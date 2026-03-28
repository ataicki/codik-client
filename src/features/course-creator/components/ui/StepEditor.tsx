import { memo } from 'react'
import {
    ActionIcon,
    Badge,
    Card,
    Group,
    Paper,
    Stack,
    Text,
    Textarea,
    TextInput,
    Flex,
} from '@mantine/core'
import { ArrowDown, ArrowUp, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { Module, Step } from '../../../../entities'
import { outlinedInputStyles } from '../model/inputStyles'
import { useCourseEditorMutations } from '../model/useCourseEditorMutations'
import { useGetLessonQuery } from '../../../../shared/api'

type Props = {
    courseId: string
    moduleId: string
    modules: Module[]
    step: Step
    stepIndex: number
    stepsCount: number
}

const StepEditorComponent = ({ courseId, moduleId, modules, step, stepIndex, stepsCount }: Props) => {
    const { moveStep, removeStep, saveLessonPatch } = useCourseEditorMutations(courseId)

    const lessonId = step.type === 'LESSON' ? step.lesson?.id : undefined
    const { data: lesson } = useGetLessonQuery(lessonId ?? '', {
        skip: !lessonId,
    })

    const stepVariant = step.type === 'LESSON' ? 'lesson' : 'test'
    const style = stepStyles[stepVariant]

    const lessonTitle = lesson?.title ?? step.lesson?.title ?? ''
    const lessonContent = lesson?.content ?? ''

    return (
        <Card
            withBorder
            radius="md"
            style={{
                border: style.border,
                background: style.background,
            }}
        >
            <Stack>
                <Group justify="space-between">
                    <Badge color={style.color}>{style.label}</Badge>
                    <Group>
                        <ActionIcon onClick={() => moveStep(moduleId, step.id, 'up', modules)} disabled={stepIndex === 0}>
                            <ArrowUp size={16} />
                        </ActionIcon>
                        <ActionIcon
                            onClick={() => moveStep(moduleId, step.id, 'down', modules)}
                            disabled={stepIndex === stepsCount - 1}
                        >
                            <ArrowDown size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() => removeStep(moduleId, step.id)}>
                            <Trash2 size={16} />
                        </ActionIcon>
                    </Group>
                </Group>

                {step.type === 'LESSON' && lessonId && (
                    <>
                        <TextInput
                            value={lessonTitle}
                            onChange={event => saveLessonPatch(lessonId, { title: event.currentTarget.value })}
                            placeholder="Название урока"
                            styles={outlinedInputStyles}
                        />
                        <Flex
                            direction="row"
                            align="stretch"
                            gap="md"
                            style={{
                                minHeight: 320,
                                maxWidth: '100%',
                            }}
                        >
                            <Textarea
                                value={lessonContent}
                                onChange={event =>
                                    saveLessonPatch(lessonId, { content: event.currentTarget.value })
                                }
                                placeholder="Содержимое урока в формате Markdown..."
                                styles={outlinedInputStyles}
                                resize="vertical"
                                minRows={12}
                                style={{
                                    flex: '1 1 50%',
                                    maxWidth: '50%',
                                }}
                            />
                            <Paper
                                withBorder
                                p="sm"
                                style={{
                                    flex: '1 1 50%',
                                    maxWidth: '50%',
                                    background: 'white',
                                    border: '1px dashed var(--mantine-color-gray-4)',
                                    overflowY: 'auto',
                                    minHeight: '100%',
                                }}
                            >
                                <ReactMarkdown>{lessonContent}</ReactMarkdown>
                            </Paper>
                        </Flex>
                    </>
                )}

                {step.type === 'LESSON' && !lessonId && (
                    <Text c="dimmed" size="sm">
                        У урока нет привязанной записи на сервере. Удалите шаг и создайте урок заново.
                    </Text>
                )}

                {step.type === 'TEST' && (
                    <Stack
                        gap="sm"
                        style={{
                            background: 'white',
                            border: '1px dashed var(--mantine-color-yellow-3)',
                            borderRadius: 8,
                            padding: 12,
                        }}
                    >
                        <TextInput
                            value={step.test?.title ?? ''}
                            readOnly
                            label="Тест"
                            description="Заголовок приходит с сервера; редактор вопросов будет после подключения API тестов."
                            styles={outlinedInputStyles}
                        />
                    </Stack>
                )}
            </Stack>
        </Card>
    )
}

const stepStyles = {
    lesson: {
        color: 'blue',
        border: '1px solid var(--mantine-color-blue-4)',
        background: 'var(--mantine-color-blue-0)',
        label: 'Урок',
    },
    test: {
        color: 'yellow',
        border: '1px solid var(--mantine-color-yellow-4)',
        background: 'var(--mantine-color-yellow-0)',
        label: 'Тест',
    },
}

const StepEditor = memo(StepEditorComponent)

export default StepEditor
