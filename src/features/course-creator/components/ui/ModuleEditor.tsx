import { memo } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Stack, TextInput } from '@mantine/core'
import { ArrowDown, ArrowUp, FileText, FlaskConical, Trash2 } from 'lucide-react'
import type { CourseModule } from '../../../../entities'
import { useCourseBuilderActions } from '../model/CourseBuilderContext'
import { outlinedInputStyles } from '../model/inputStyles'
import StepEditor from './StepEditor'

type Props = {
    module: CourseModule
    index: number
    modulesCount: number
}

const ModuleEditorComponent = ({ module, index, modulesCount }: Props) => {
    const { updateModuleTitle, moveModule, removeModule, addStep } = useCourseBuilderActions()

    return (
        <Card withBorder radius="lg">
            <Stack>
                <Group justify="space-between">
                    <Badge>Модуль {index + 1}</Badge>
                    <Group>
                        <ActionIcon onClick={() => moveModule(module.id, 'up')} disabled={index === 0}>
                            <ArrowUp size={16} />
                        </ActionIcon>
                        <ActionIcon onClick={() => moveModule(module.id, 'down')} disabled={index === modulesCount - 1}>
                            <ArrowDown size={16} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() => removeModule(module.id)}>
                            <Trash2 size={16} />
                        </ActionIcon>
                    </Group>
                </Group>

                <TextInput
                    value={module.title}
                    onChange={event => updateModuleTitle(module.id, event.currentTarget.value)}
                    placeholder="Название модуля"
                    styles={outlinedInputStyles}
                />

                <Group>
                    <Button variant="light" onClick={() => addStep(module.id, 'lesson')} leftSection={<FileText size={16} />}>
                        Добавить урок
                    </Button>
                    <Button variant="light" onClick={() => addStep(module.id, 'test')} leftSection={<FlaskConical size={16} />}>
                        Добавить тест
                    </Button>
                </Group>

                {module.steps.map((step, stepIndex) => (
                    <StepEditor
                        key={step.id}
                        moduleId={module.id}
                        step={step}
                        stepIndex={stepIndex}
                        stepsCount={module.steps.length}
                    />
                ))}
            </Stack>
        </Card>
    )
}

const ModuleEditor = memo(ModuleEditorComponent)

export default ModuleEditor
