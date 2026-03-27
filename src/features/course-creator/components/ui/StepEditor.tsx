import { memo } from 'react'
import {ActionIcon, Badge, Button, Card, Group, Paper, Stack, TextInput, Textarea, Flex} from '@mantine/core'
import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { CourseStep } from '../../../../entities'
import { useCourseBuilderActions } from '../model/CourseBuilderContext'
import { outlinedInputStyles } from '../model/inputStyles'
import CodeExerciseEditor from './CodeExerciseEditor'
import TestQuestionEditor from './TestQuestionEditor'

type Props = {
    moduleId: string
    step: CourseStep
    stepIndex: number
    stepsCount: number
}

const StepEditorComponent = ({ moduleId, step, stepIndex, stepsCount }: Props) => {
    const { moveStep, removeStep, updateStep, addQuestion } = useCourseBuilderActions()

    return (
        <Card withBorder radius="md" style={{
            border: stepStyles[step.type].border,
            background: stepStyles[step.type].background,
        }}>
            <Stack>
                <Group justify="space-between">
                    <Badge color={stepStyles[step.type].color}>
                        {stepStyles[step.type].label}
                    </Badge>
                    <Group>
                        <ActionIcon onClick={() => moveStep(moduleId, step.id, 'up')} disabled={stepIndex === 0}>
                            <ArrowUp size={16} />
                        </ActionIcon>
                        <ActionIcon
                            onClick={() => moveStep(moduleId, step.id, 'down')}
                            disabled={stepIndex === stepsCount - 1}
                        >
                            <ArrowDown size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() => removeStep(moduleId, step.id)}>
                            <Trash2 size={16} />
                        </ActionIcon>
                    </Group>
                </Group>

                <TextInput
                    value={step.title}
                    onChange={event => updateStep(moduleId, step.id, { title: event.currentTarget.value })}
                    placeholder="Название шага"
                    styles={outlinedInputStyles}
                />

                {step.type === 'lesson' && (
                    <Flex
                        direction="row"
                        align="stretch"
                        gap="md"
                        style={{ height: '100%' }}
                    >
                        <Textarea
                            style={{ flex: 1 }}
                            value={step.markdownContent ?? ''}
                            onChange={event =>
                                updateStep(moduleId, step.id, {
                                    markdownContent: event.currentTarget.value
                                })
                            }
                            styles={outlinedInputStyles}
                        />

                        <Paper
                            withBorder
                            p="sm"
                            style={{
                                flex: 1,
                                background: 'white',
                                border: '1px dashed var(--mantine-color-gray-4)',
                            }}
                        >
                            <ReactMarkdown>
                                {step.markdownContent ?? ''}
                            </ReactMarkdown>
                        </Paper>
                    </Flex>
                )}

                {step.type === 'test' && (
                    <Stack
                        style={{
                            background: 'white',
                            border: '1px dashed var(--mantine-color-yellow-3)',
                            borderRadius: 8,
                            padding: 12,
                        }}
                    >
                        {(step.questions ?? []).map(question => (
                            <TestQuestionEditor
                                key={question.id}
                                moduleId={moduleId}
                                stepId={step.id}
                                question={question}
                            />
                        ))}
                        <Button variant="light" leftSection={<CirclePlus size={14} />} onClick={() => addQuestion(moduleId, step.id)}>
                            Добавить вопрос
                        </Button>
                    </Stack>
                )}
                {step.type === 'code' && (
                    <Stack
                        style={{
                            background: 'white',
                            border: '1px dashed var(--mantine-color-green-3)',
                            borderRadius: 8,
                            padding: 12,
                        }}
                    >
                        {(step.codeExercises ?? []).map(exercise => (
                            <CodeExerciseEditor
                                key={exercise.id}
                                moduleId={moduleId}
                                stepId={step.id}
                                codeExercise={exercise}
                            />
                        ))}
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
    code: {
        color: 'green',
        border: '1px solid var(--mantine-color-green-4)',
        background: 'var(--mantine-color-green-0)',
        label: 'Код',
    },
}


const StepEditor = memo(StepEditorComponent)

export default StepEditor
