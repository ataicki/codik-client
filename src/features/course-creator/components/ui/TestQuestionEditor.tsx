import { ActionIcon, Button, Card, Checkbox, Group, Stack, TextInput } from '@mantine/core'
import { CirclePlus, Trash2 } from 'lucide-react'
import type { CourseTestQuestion } from '../../../../entities'
import { useCourseBuilderContext } from '../model/CourseBuilderContext'
import { outlinedInputStyles } from '../model/inputStyles'

type Props = {
    moduleId: string
    stepId: string
    question: CourseTestQuestion
}

const TestQuestionEditor = ({ moduleId, stepId, question }: Props) => {
    const { updateQuestionTitle, removeQuestion, addOption, updateOption, removeOption } = useCourseBuilderContext()

    return (
        <Card withBorder radius="md">
            <Stack>
                <Group justify="space-between">
                    <TextInput
                        value={question.question}
                        onChange={event => updateQuestionTitle(moduleId, stepId, question.id, event.currentTarget.value)}
                        placeholder="Вопрос"
                        styles={outlinedInputStyles}
                        style={{ flex: 1 }}
                    />
                    <ActionIcon color="red" variant="light" onClick={() => removeQuestion(moduleId, stepId, question.id)}>
                        <Trash2 size={16} />
                    </ActionIcon>
                </Group>

                {question.options.map(option => (
                    <Group key={option.id} align="center" grow>
                        <TextInput
                            value={option.text}
                            onChange={event =>
                                updateOption(moduleId, stepId, question.id, option.id, { text: event.currentTarget.value })
                            }
                            placeholder="Вариант ответа"
                            styles={outlinedInputStyles}
                        />
                        <Checkbox
                            label="isCorrect"
                            checked={option.isCorrect}
                            onChange={event =>
                                updateOption(moduleId, stepId, question.id, option.id, {
                                    isCorrect: event.currentTarget.checked,
                                })
                            }
                        />
                        <ActionIcon color="red" variant="light" onClick={() => removeOption(moduleId, stepId, question.id, option.id)}>
                            <Trash2 size={16} />
                        </ActionIcon>
                    </Group>
                ))}

                <Button
                    variant="light"
                    leftSection={<CirclePlus size={14} />}
                    onClick={() => addOption(moduleId, stepId, question.id)}
                >
                    Добавить вариант
                </Button>
            </Stack>
        </Card>
    )
}

export default TestQuestionEditor
