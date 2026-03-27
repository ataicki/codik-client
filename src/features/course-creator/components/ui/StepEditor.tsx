import { ActionIcon, Badge, Button, Card, Group, Paper, Stack, TextInput, Textarea } from '@mantine/core'
import { ArrowDown, ArrowUp, CirclePlus, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { CourseStep } from '../../../../entities'
import { useCourseBuilderContext } from '../model/CourseBuilderContext'
import { outlinedInputStyles } from '../model/inputStyles'
import TestQuestionEditor from './TestQuestionEditor'

type Props = {
    moduleId: string
    step: CourseStep
    stepIndex: number
    stepsCount: number
}

const StepEditor = ({ moduleId, step, stepIndex, stepsCount }: Props) => {
    const { moveStep, removeStep, updateStep, addQuestion } = useCourseBuilderContext()

    return (
        <Card withBorder radius="md">
            <Stack>
                <Group justify="space-between">
                    <Badge>{step.type}</Badge>
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
                    <Group align="start" grow>
                        <Textarea
                            value={step.markdownContent ?? ''}
                            onChange={event => updateStep(moduleId, step.id, { markdownContent: event.currentTarget.value })}
                            minRows={8}
                            styles={outlinedInputStyles}
                        />
                        <Paper withBorder p="sm" style={{ minHeight: 190 }}>
                            <ReactMarkdown>{step.markdownContent ?? ''}</ReactMarkdown>
                        </Paper>
                    </Group>
                )}

                {step.type === 'test' && (
                    <Stack>
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
            </Stack>
        </Card>
    )
}

export default StepEditor
