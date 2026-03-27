import { useDraftState } from './hooks/useDraftState'
import { useModuleActions } from './hooks/useModuleActions'
import { useSaveCourseDraft } from './hooks/useSaveCourseDraft'
import { useStepActions } from './hooks/useStepActions'
import { useTestActions } from './hooks/useTestActions'

export const useCourseBuilder = () => {
    const draftState = useDraftState()
    const moduleActions = useModuleActions(
        draftState.updateDraftImmer,
        draftState.activeModule,
        draftState.setActiveModuleId,
    )
    const stepActions = useStepActions(draftState.updateDraftImmer)
    const testActions = useTestActions(draftState.updateDraftImmer)
    const saveActions = useSaveCourseDraft(draftState.draft, draftState.setDraft)

    return {
        ...draftState,
        ...moduleActions,
        ...stepActions,
        ...testActions,
        ...saveActions,
    }
}
