import {Card, Stack, TextInput, Textarea} from '@mantine/core'
import {outlinedInputStyles} from '../model/inputStyles'
import {CourseDetail, UpdateCourseRequest} from "../../../../entities";
import { FC } from 'react';

interface CourseMetaFormProps {
    course: CourseDetail,
    onUpdate: (newValue: UpdateCourseRequest) => void
}

const CourseMetaForm: FC<CourseMetaFormProps> = ({course, onUpdate}) => {
    return (
        <Card withBorder radius="xl" style={{
            border: '2px solid var(--mantine-color-gray-3)',
            background: 'var(--mantine-color-gray-0)',
        }}>
            <Stack>
                <TextInput
                    label="Название курса"
                    value={course.title}
                    onChange={(event) => {
                        const value = event.currentTarget.value
                        onUpdate({title: value})
                    }}
                    styles={outlinedInputStyles}
                />
                <Textarea
                    label="Описание курса"
                    value={course.description}
                    onChange={event => {
                        const value = event.currentTarget.value
                        onUpdate({description: value})
                    }}
                    minLength={20}
                    minRows={4}
                    styles={outlinedInputStyles}
                />
            </Stack>
        </Card>
    )
}

export default CourseMetaForm
