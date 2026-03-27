import {useMemo, useState} from 'react'
import type {CourseDraft} from '../../../../../entities'
import {produce} from "immer";

const normalizeOrders = (draft: CourseDraft) => {
    draft.modules?.forEach((module, moduleIndex) => {
        module.order = moduleIndex + 1
        module.steps.forEach((step, stepIndex) => {
            step.order = stepIndex + 1
        })
    })
}

export const useDraftState = () => {
    const [draft, setDraft] = useState<CourseDraft>({
        id: '',
        title: '',
        description: '',
        coverUrl: '',
        modules: [],
    })

    const [activeModuleId, setActiveModuleId] = useState<string | null>(null)

    const updateDraftImmer = (updater: (state: CourseDraft) => void) => {
        setDraft(prev =>
            produce(prev, state => {
                updater(state)
                normalizeOrders(state)
            }),
        )
    }

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
