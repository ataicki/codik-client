import {Button, Group, Paper, Stack, Text, Title} from '@mantine/core'
import {CirclePlus, Save} from 'lucide-react'
import { CourseBuilderProvider, useCourseBuilderActions, useCourseDraft } from './model/CourseBuilderContext'
import CourseMetaForm from './ui/CourseMetaForm'
import ModuleEditor from './ui/ModuleEditor'

const CourseBuilderContent = () => {
    const { draft } = useCourseDraft()
    const { isSaving, addModule, onSave } = useCourseBuilderActions()

    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <div>
                    <Title order={2}>Конструктор курсов</Title>
                    <Text c="dimmed">Создавайте курс, модули и шаги: уроки в Markdown, тесты с вариантами, кодовые задания.</Text>
                </div>
                <Group>
                    <Button leftSection={<Save size={16}/>} onClick={onSave} loading={isSaving}>
                        Сохранить черновик
                    </Button>
                    <Button leftSection={<Save size={16}/>} onClick={onSave} loading={isSaving}>
                        Сохранить и отправить на проверку
                    </Button>
                </Group>
            </Group>

            <CourseMetaForm/>

            <Group justify="space-between">
                <Title order={3}>Модули</Title>
                <Button variant="light" leftSection={<CirclePlus size={16}/>} onClick={addModule}>
                    Создать модуль
                </Button>
            </Group>

            {draft.modules.length === 0 && (
                <Paper withBorder p="md" radius="lg">
                    <Text c="dimmed">Добавьте первый модуль, чтобы начать создание курса.</Text>
                </Paper>
            )}

            {draft.modules.map((module, index) => (
                <ModuleEditor
                    key={module.id}
                    module={module}
                    index={index}
                    modulesCount={draft.modules.length}
                />
            ))}
        </Stack>
    )
}

const CourseBuilder = () => (
    <CourseBuilderProvider>
        <CourseBuilderContent/>
    </CourseBuilderProvider>
)

export default CourseBuilder
