import { memo } from 'react'
import { ActionIcon, Badge, Button, Card, Group, Stack, TextInput } from '@mantine/core'
import { ArrowDown, ArrowUp, FileText, FlaskConical, Trash2 } from 'lucide-react'
import type { Module } from '../../../../entities'
import { outlinedInputStyles } from '../model/inputStyles'
import StepEditor from './StepEditor'
import { useCourseEditorMutations } from '../model/useCourseEditorMutations'

type Props = {
    courseId: string
    module: Module
    modules: Module[]
    index: number
    modulesCount: number
}

const ModuleEditorComponent = ({ courseId, module, modules, index, modulesCount }: Props) => {
    const { updateModuleTitle, moveModule, removeModule, addStep } = useCourseEditorMutations(courseId)

    return (
        <Card
            withBorder
            radius="lg"
            style={{
                border: '2px solid var(--mantine-color-gray-3)',
                background: 'var(--mantine-color-gray-0)',
            }}
        >
            <Stack gap="md">
                <Group justify="space-between">
                    <Badge>Модуль {index + 1}</Badge>
                    <Group>
                        <ActionIcon onClick={() => moveModule(module.id, 'up', modules)} disabled={index === 0}>
                            <ArrowUp size={16} />
                        </ActionIcon>
                        <ActionIcon
                            onClick={() => moveModule(module.id, 'down', modules)}
                            disabled={index === modulesCount - 1}
                        >
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
                    <Button
                        variant="light"
                        onClick={() => addStep(module.id, 'test')}
                        leftSection={<FlaskConical size={16} />}
                    >
                        Добавить тест
                    </Button>
                </Group>

                {[...module.steps]
                    .sort((a, b) => a.order - b.order)
                    .map((step, stepIndex, arr) => (
                        <StepEditor
                            key={step.id}
                            courseId={courseId}
                            moduleId={module.id}
                            modules={modules}
                            step={step}
                            stepIndex={stepIndex}
                            stepsCount={arr.length}
                        />
                    ))}
            </Stack>
        </Card>
    )
}

const ModuleEditor = memo(ModuleEditorComponent)

export default ModuleEditor
