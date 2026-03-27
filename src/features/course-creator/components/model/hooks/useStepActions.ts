import { useCallback, useMemo } from 'react'
import type { CourseStep, StepType } from '../../../../../entities'
import { createEmptyStep } from '../factories'
import type { UpdateDraftImmer } from '../../types/UpdateDraftImmer'

export const useStepActions = (updateDraftImmer: UpdateDraftImmer) => {
    const addStep = useCallback(
        (moduleId: string, type: StepType) => {
            const step = createEmptyStep(type)
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                if (module) module.steps.push(step)
            })
        },
        [updateDraftImmer],
    )

    const moveStep = useCallback(
        (moduleId: string, stepId: string, direction: 'up' | 'down') => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                if (!module) return
                const index = module.steps.findIndex(step => step.id === stepId)
                if (index < 0) return
                const nextIndex = direction === 'up' ? index - 1 : index + 1
                if (nextIndex < 0 || nextIndex >= module.steps.length) return
                const [item] = module.steps.splice(index, 1)
                module.steps.splice(nextIndex, 0, item)
            })
        },
        [updateDraftImmer],
    )

    const updateStep = useCallback(
        (moduleId: string, stepId: string, patch: Partial<CourseStep>) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                if (step) Object.assign(step, patch)
            })
        },
        [updateDraftImmer],
    )

    const removeStep = useCallback(
        (moduleId: string, stepId: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                if (!module) return
                module.steps = module.steps.filter(step => step.id !== stepId)
            })
        },
        [updateDraftImmer],
    )

    return useMemo(
        () => ({
            addStep,
            moveStep,
            updateStep,
            removeStep,
        }),
        [addStep, moveStep, updateStep, removeStep],
    )
}
