import { Alert, Button, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { CirclePlus, Save } from 'lucide-react'
import CourseMetaForm from './ui/CourseMetaForm'
import ModuleEditor from './ui/ModuleEditor'
import {
    useGetCourseByIdQuery,
    usePublishCourseMutation,
    useUpdateCourseMutation,
} from '../../../shared/api'
import { useParams } from 'react-router-dom'
import { useMemo } from 'react'
import type { Module, UpdateCourseRequest } from '../../../entities'
import { useCourseEditorMutations } from './model/useCourseEditorMutations'

const sortModules = (modules: Module[]) => [...modules].sort((a, b) => a.order - b.order)

const CourseBuilder = () => {
    const { courseId } = useParams<{ courseId: string }>()
    const { data: course, isLoading, isError } = useGetCourseByIdQuery(courseId ?? '', {
        skip: !courseId,
    })

    const [updateCourseInfo] = useUpdateCourseMutation()
    const [publishCourse, { isLoading: isPublishing }] = usePublishCourseMutation()
    const { addModule } = useCourseEditorMutations(courseId)

    const sortedModules = useMemo(() => (course ? sortModules(course.modules) : []), [course])

    const onPublishCourse = async () => {
        if (!courseId) return
        await publishCourse(courseId).unwrap()
    }

    const onUpdateCourse = (newValue: UpdateCourseRequest) => {
        if (!courseId) return
        updateCourseInfo({ id: courseId, data: newValue })
    }

    if (!courseId) {
        return (
            <Alert color="yellow" title="Курс не выбран">
                Откройте курс из списка на главной.
            </Alert>
        )
    }

    if (isLoading) {
        return <Loader />
    }

    if (isError || !course) {
        return (
            <Alert color="red" title="Не удалось загрузить курс">
                Проверьте ссылку или вернитесь к списку курсов.
            </Alert>
        )
    }

    return (
        <Stack gap="lg">
            <Group justify="space-between">
                <div>
                    <Title order={2}>Редактирование курса</Title>
                    <Text c="dimmed">
                        Метаданные, модули и шаги синхронизируются с сервером. Текст уроков — в Markdown через API
                        уроков; содержимое тестов на бэкенде подключается отдельно.
                    </Text>
                </div>
                <Group>
                    <Button leftSection={<Save size={16} />} onClick={onPublishCourse} loading={isPublishing}>
                        Отправить на проверку
                    </Button>
                </Group>
            </Group>

            <CourseMetaForm onUpdate={onUpdateCourse} course={course} />

            <Group justify="space-between">
                <Title order={3}>Модули</Title>
                <Button variant="light" leftSection={<CirclePlus size={16} />} onClick={() => addModule()}>
                    Создать модуль
                </Button>
            </Group>

            {sortedModules.length === 0 && (
                <Paper withBorder p="md" radius="lg">
                    <Text c="dimmed">Добавьте первый модуль, чтобы начать создание курса.</Text>
                </Paper>
            )}

            {sortedModules.map((module, index) => (
                <ModuleEditor
                    key={module.id}
                    courseId={courseId}
                    module={module}
                    modules={sortedModules}
                    index={index}
                    modulesCount={sortedModules.length}
                />
            ))}
        </Stack>
    )
}

export default CourseBuilder
