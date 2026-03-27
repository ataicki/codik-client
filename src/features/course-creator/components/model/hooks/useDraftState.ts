import { useCallback, useMemo, useState } from 'react'
import { produce } from 'immer'
import type { CourseDraft } from '../../../../../entities'

export const useDraftState = () => {
    const [draft, setDraft] = useState<CourseDraft>({
        id: '',
        title: '',
        description: '',
        coverUrl: '',
        modules: [],
    })

    const [activeModuleId, setActiveModuleId] = useState<string | null>(null)

    const updateDraftImmer = useCallback((updater: (state: CourseDraft) => void) => {
        setDraft(prev => produce(prev, updater))
    }, [])

    const activeModule = useMemo(
        () => draft.modules.find(module => module.id === activeModuleId) ?? null,
        [activeModuleId, draft.modules],
    )

    return {
        draft,
        setDraft,
        activeModule,
        setActiveModuleId,
        updateDraftImmer,
    }
}
