import { createContext, ReactNode, useContext } from 'react'
import { useCourseBuilder } from './useCourseBuilder'

type CourseBuilderContextValue = ReturnType<typeof useCourseBuilder>

const CourseBuilderContext = createContext<CourseBuilderContextValue | null>(null)

export const CourseBuilderProvider = ({ children }: { children: ReactNode }) => {
    const value = useCourseBuilder()
    return <CourseBuilderContext.Provider value={value}>{children}</CourseBuilderContext.Provider>
}

export const useCourseBuilderContext = () => {
    const context = useContext(CourseBuilderContext)
    if (!context) {
        throw new Error('useCourseBuilderContext must be used within CourseBuilderProvider')
    }
    return context
}
