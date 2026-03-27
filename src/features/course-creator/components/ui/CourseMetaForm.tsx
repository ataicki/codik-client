import { Card, Stack, TextInput, Textarea } from '@mantine/core'
import { useCourseBuilderActions, useCourseDraft } from '../model/CourseBuilderContext'
import { outlinedInputStyles } from '../model/inputStyles'

const CourseMetaForm = () => {
    const { draft } = useCourseDraft()
    const { updateDraftImmer } = useCourseBuilderActions()

    return (
        <Card withBorder radius="xl">
            <Stack>
                <TextInput
                    label="Название курса"
                    value={draft.title}
                    onChange={(event) => {
                        const value = event.currentTarget.value

                        updateDraftImmer(state => {
                            state.title = value
                        })
                    }}
                    styles={outlinedInputStyles}
                />
                <TextInput
                    label="Ссылка на обложку"
                    value={draft.coverUrl}
                    onChange={event => {
                        const value = event.currentTarget.value

                        updateDraftImmer(state => {
                            state.coverUrl = value
                        })
                    }}
                    styles={outlinedInputStyles}
                />
                <Textarea
                    label="Описание курса"
                    value={draft.description}
                    onChange={event => {
                        const value = event.currentTarget.value

                        updateDraftImmer(state => {
                            state.description = value
                        })
                    }}
                    minRows={4}
                    styles={outlinedInputStyles}
                />
            </Stack>
        </Card>
    )
}

export default CourseMetaForm
