import { useCallback, useMemo } from 'react'
import type { CourseModule } from '../../../../../entities'
import { createEmptyModule } from '../factories'
import type { UpdateDraftImmer } from '../../types/UpdateDraftImmer'

export const useModuleActions = (
    updateDraftImmer: UpdateDraftImmer,
    activeModule: CourseModule | null,
    setActiveModuleId: (value: string | null) => void,
) => {
    const addModule = useCallback(() => {
        const module = createEmptyModule()
        updateDraftImmer(state => {
            state.modules.push(module)
        })
        setActiveModuleId(module.id)
    }, [updateDraftImmer, setActiveModuleId])

    const updateModuleTitle = useCallback(
        (moduleId: string, title: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                if (module) module.title = title
            })
        },
        [updateDraftImmer],
    )

    const removeModule = useCallback(
        (moduleId: string) => {
            updateDraftImmer(state => {
                state.modules = state.modules.filter(module => module.id !== moduleId)
            })
            if (activeModule?.id === moduleId) setActiveModuleId(null)
        },
        [updateDraftImmer, activeModule?.id, setActiveModuleId],
    )

    const moveModule = useCallback(
        (moduleId: string, direction: 'up' | 'down') => {
            updateDraftImmer(state => {
                const index = state.modules.findIndex(module => module.id === moduleId)
                if (index < 0) return
                const nextIndex = direction === 'up' ? index - 1 : index + 1
                if (nextIndex < 0 || nextIndex >= state.modules.length) return
                const [item] = state.modules.splice(index, 1)
                state.modules.splice(nextIndex, 0, item)
            })
        },
        [updateDraftImmer],
    )

    return useMemo(
        () => ({
            addModule,
            updateModuleTitle,
            removeModule,
            moveModule,
        }),
        [addModule, updateModuleTitle, removeModule, moveModule],
    )
}
