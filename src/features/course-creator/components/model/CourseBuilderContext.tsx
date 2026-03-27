import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useCourseBuilder } from './useCourseBuilder'
import type { CourseDraft } from '../../../../entities'

type CourseDraftContextValue = {
    draft: CourseDraft
}

const CourseDraftContext = createContext<CourseDraftContextValue | null>(null)

const CourseBuilderActionsContext = createContext<ReturnType<typeof useCourseBuilder>['actions'] | null>(null)

export const CourseBuilderProvider = ({ children }: { children: ReactNode }) => {
    const { draft, actions } = useCourseBuilder()

    const draftValue = useMemo(() => ({ draft }), [draft])

    return (
        <CourseDraftContext.Provider value={draftValue}>
            <CourseBuilderActionsContext.Provider value={actions}>{children}</CourseBuilderActionsContext.Provider>
        </CourseDraftContext.Provider>
    )
}

export const useCourseDraft = () => {
    const context = useContext(CourseDraftContext)
    if (!context) {
        throw new Error('useCourseDraft must be used within CourseBuilderProvider')
    }
    return context
}

export const useCourseBuilderActions = () => {
    const context = useContext(CourseBuilderActionsContext)
    if (!context) {
        throw new Error('useCourseBuilderActions must be used within CourseBuilderProvider')
    }
    return context
}
