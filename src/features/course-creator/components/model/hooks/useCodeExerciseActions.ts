import { useCallback, useMemo } from 'react'
import type { UpdateDraftImmer } from '../../types/UpdateDraftImmer'
import { createEmptyCodeExercise } from '../factories'
import type { CourseCodeExercise } from '../../../../../entities'

export const useCodeExerciseActions = (updateDraftImmer: UpdateDraftImmer) => {
    const addCodeExercise = useCallback(
        (moduleId: string, stepId: string) => {
            updateDraftImmer(state => {
                const step = state.modules
                    .find(m => m.id === moduleId)
                    ?.steps.find(s => s.id === stepId)

                if (step?.type !== 'code') return

                step.codeExercises = step.codeExercises ?? []
                step.codeExercises.push(createEmptyCodeExercise())
            })
        },
        [updateDraftImmer],
    )

    const updateCodeExercise = useCallback(
        (moduleId: string, stepId: string, codeExerciseId: string, patch: Partial<CourseCodeExercise>) => {
            updateDraftImmer(state => {
                const step = state.modules
                    .find(m => m.id === moduleId)
                    ?.steps.find(s => s.id === stepId)

                const exercise = step?.codeExercises?.find(e => e.id === codeExerciseId)
                if (!exercise) return

                Object.assign(exercise, patch)
            })
        },
        [updateDraftImmer],
    )

    const removeCodeExercise = useCallback(
        (moduleId: string, stepId: string, codeExerciseId: string) => {
            updateDraftImmer(state => {
                const step = state.modules
                    .find(m => m.id === moduleId)
                    ?.steps.find(s => s.id === stepId)

                if (!step?.codeExercises) return

                step.codeExercises = step.codeExercises.filter(e => e.id !== codeExerciseId)
            })
        },
        [updateDraftImmer],
    )

    return useMemo(
        () => ({
            addCodeExercise,
            updateCodeExercise,
            removeCodeExercise,
        }),
        [addCodeExercise, updateCodeExercise, removeCodeExercise],
    )
}
