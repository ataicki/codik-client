import { useCreateCourseMutation } from '../../../shared/api'
import { Button, Group, Stack, Textarea, TextInput } from '@mantine/core'
import { Save } from 'lucide-react'
import { outlinedInputStyles } from './model/inputStyles.ts'
import type { CreateCourseRequest } from '../../../entities'
import { useState } from 'react'

type Props = {
    onCreated?: (courseId: string) => void
    onCancel?: () => void
}

const CourseCreateBuilder = ({ onCreated, onCancel }: Props) => {
    const [createCourse, { isLoading }] = useCreateCourseMutation()
    const [course, setCourse] = useState<CreateCourseRequest>({ title: '', description: '' })

    const canSave = course.title.trim().length >= 3 && course.description.trim().length >= 20

    const onSave = async () => {
        if (!canSave) return
        const created = await createCourse(course).unwrap()
        onCreated?.(created.id)
    }

    return (
        <Stack gap="md">
            <Stack>
                <TextInput
                    label="Название курса"
                    value={course.title}
                    onChange={event => {
                        const value = event.currentTarget.value
                        setCourse({ ...course, title: value })
                    }}
                    styles={outlinedInputStyles}
                />
                <Textarea
                    label="Описание курса"
                    value={course.description}
                    onChange={event => {
                        const value = event.currentTarget.value
                        setCourse({ ...course, description: value })
                    }}
                    minLength={20}
                    minRows={4}
                    styles={outlinedInputStyles}
                />
            </Stack>
            <Group justify="flex-end">
                {onCancel && (
                    <Button variant="default" onClick={onCancel}>
                        Отмена
                    </Button>
                )}
                <Button leftSection={<Save size={16} />} disabled={!canSave} onClick={onSave} loading={isLoading}>
                    Создать
                </Button>
            </Group>
        </Stack>
    )
}

export default CourseCreateBuilder
