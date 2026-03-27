import { memo } from 'react'
import {ActionIcon, Badge, Button, Card, Group, Paper, Stack, TextInput, Textarea, Grid, Flex} from '@mantine/core'
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
                            style={{ flex: 1, overflow: 'auto' }}
                        >
                            <ReactMarkdown>
                                {step.markdownContent ?? ''}
                            </ReactMarkdown>
                        </Paper>
                    </Flex>
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
                {step.type === 'code' && (
                    <Stack>
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

const StepEditor = memo(StepEditorComponent)

export default StepEditor
