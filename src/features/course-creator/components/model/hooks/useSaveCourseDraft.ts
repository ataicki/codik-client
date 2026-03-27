import { showNotification } from '@mantine/notifications'
import type { CourseDraft } from '../../../../../entities'
import {useCreateCourseDraftMutation, useUpdateCourseDraftMutation} from '../../../../../shared/api'

export const useSaveCourseDraft = (draft: CourseDraft, setDraft: (value: CourseDraft) => void) => {
    const [createDraft, createState] = useCreateCourseDraftMutation()
    const [updateDraft, updateState] = useUpdateCourseDraftMutation()

    const onSave = async () => {
        try {
            if (!draft.title.trim() || !draft.description.trim() || !draft.coverUrl.trim()) {
                throw new Error('Заполните название, описание и обложку курса')
            }

            const payload = {
                title: draft.title,
                description: draft.description,
                coverUrl: draft.coverUrl,
                modules: draft.modules,
            }

            const result = draft.id
                ? await updateDraft({ id: draft.id, ...payload }).unwrap()
                : await createDraft(payload).unwrap()

            setDraft(result)
            showNotification({
                title: 'Успех',
                message: draft.id ? 'Изменения сохранены' : 'Черновик создан',
                color: 'green',
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка сохранения курса'
            showNotification({ title: 'Ошибка', message, color: 'red' })
        }
    }

    return {
        onSave,
        isSaving: createState.isLoading || updateState.isLoading,
    }
}
