import { useCallback, useEffect, useMemo, useRef } from 'react'
import { showNotification } from '@mantine/notifications'
import type { CourseDraft } from '../../../../../entities'
import { useCreateCourseDraftMutation, useUpdateCourseDraftMutation } from '../../../../../shared/api'
import { normalizeDraftOrders } from '../normalizeDraftOrders'

export const useSaveCourseDraft = (draft: CourseDraft, setDraft: (value: CourseDraft) => void) => {
    const [createDraft, createState] = useCreateCourseDraftMutation()
    const [updateDraft, updateState] = useUpdateCourseDraftMutation()

    const draftRef = useRef(draft)
    useEffect(() => {
        draftRef.current = draft
    }, [draft])

    const onSave = useCallback(async () => {
        const current = draftRef.current
        try {
            if (!current.title.trim() || !current.description.trim() || !current.coverUrl.trim()) {
                throw new Error('Заполните название, описание и обложку курса')
            }

            const withOrders = normalizeDraftOrders(current)
            const payload = {
                title: withOrders.title,
                description: withOrders.description,
                coverUrl: withOrders.coverUrl,
                modules: withOrders.modules,
            }

            const result = current.id
                ? await updateDraft({ id: current.id, ...payload }).unwrap()
                : await createDraft(payload).unwrap()

            setDraft(result)
            showNotification({
                title: 'Успех',
                message: current.id ? 'Изменения сохранены' : 'Черновик создан',
                color: 'green',
            })
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка сохранения курса'
            showNotification({ title: 'Ошибка', message, color: 'red' })
        }
    }, [createDraft, updateDraft, setDraft])

    return useMemo(
        () => ({
            onSave,
            isSaving: createState.isLoading || updateState.isLoading,
        }),
        [onSave, createState.isLoading, updateState.isLoading],
    )
}
