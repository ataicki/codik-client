import type { CourseDraft, CourseStep } from '../../../entities'

export type FlatStepItem = {
    moduleId: string
    moduleTitle: string
    moduleOrder: number
    step: CourseStep
    flatIndex: number
}

const sortByOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order)

export const flattenCourse = (course: CourseDraft): FlatStepItem[] => {
    const modules = sortByOrder(course.modules)
    const out: FlatStepItem[] = []
    let flatIndex = 0
    for (const mod of modules) {
        const steps = sortByOrder(mod.steps)
        for (const step of steps) {
            out.push({
                moduleId: mod.id,
                moduleTitle: mod.title,
                moduleOrder: mod.order,
                step,
                flatIndex,
            })
            flatIndex += 1
        }
    }
    return out
}

export const countSteps = (course: CourseDraft) => flattenCourse(course).length
