import { useMemo } from 'react'
import { useDraftState } from './hooks/useDraftState'
import { useModuleActions } from './hooks/useModuleActions'
import { useSaveCourseDraft } from './hooks/useSaveCourseDraft'
import { useStepActions } from './hooks/useStepActions'
import { useTestActions } from './hooks/useTestActions'
import {useCodeExerciseActions} from "./hooks/useCodeExerciseActions.ts";

export const useCourseBuilder = () => {
    const draftState = useDraftState()
    const moduleActions = useModuleActions(
        draftState.updateDraftImmer,
        draftState.activeModule,
        draftState.setActiveModuleId,
    )
    const stepActions = useStepActions(draftState.updateDraftImmer)
    const testActions = useTestActions(draftState.updateDraftImmer)
    const codeExerciseActions = useCodeExerciseActions(draftState.updateDraftImmer)
    const saveActions = useSaveCourseDraft(draftState.draft, draftState.setDraft)

    const actions = useMemo(
        () => ({
            ...moduleActions,
            ...stepActions,
            ...testActions,
            ...codeExerciseActions,
            ...saveActions,
            updateDraftImmer: draftState.updateDraftImmer,
            setDraft: draftState.setDraft,
            setActiveModuleId: draftState.setActiveModuleId,
        }),
        [
            moduleActions,
            stepActions,
            testActions,
            codeExerciseActions,
            saveActions,
            draftState.updateDraftImmer,
            draftState.setDraft,
            draftState.setActiveModuleId,
        ],
    )

    return {
        draft: draftState.draft,
        activeModule: draftState.activeModule,
        actions,
    }
}

export type CourseBuilderActions = ReturnType<typeof useCourseBuilder>['actions']
