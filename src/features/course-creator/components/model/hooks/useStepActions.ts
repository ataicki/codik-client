import type { CourseStep, StepType } from '../../../../../entities'
import { createEmptyStep } from '../factories'
import {UpdateDraftImmer} from "../../types/UpdateDraftImmer.ts";

export const useStepActions = (updateDraftImmer: UpdateDraftImmer) => {
    const addStep = (moduleId: string, type: StepType) => {
        const step = createEmptyStep(type)
        updateDraftImmer(state => {
            const module = state.modules.find(item => item.id === moduleId)
            if (module) {
                module.steps.push(step)
            }
        })
    }

    const moveStep = (moduleId: string, stepId: string, direction: 'up' | 'down') => {
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
    }

    const updateStep = (moduleId: string, stepId: string, patch: Partial<CourseStep>) => {
        updateDraftImmer(state => {
            const module = state.modules.find(item => item.id === moduleId)
            const step = module?.steps.find(item => item.id === stepId)
            if (step) Object.assign(step, patch)
        })
    }

    const removeStep = (moduleId: string, stepId: string) => {
        updateDraftImmer(state => {
            const module = state.modules.find(item => item.id === moduleId)
            if (!module) return
            module.steps = module.steps.filter(step => step.id !== stepId)
        })
    }

    return {
        addStep,
        moveStep,
        updateStep,
        removeStep,
    }
}
