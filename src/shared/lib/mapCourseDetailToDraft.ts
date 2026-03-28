import type { CourseDetail, Lesson, Module, Step } from '../../entities'
import type { CourseDraft } from '../../entities'

const sortByOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order)

const mapApiStepToLearnStep = (step: Step, lessonContent: Record<string, Lesson>) => {
    if (step.type === 'LESSON' && step.lesson) {
        const body = lessonContent[step.lesson.id]
        return {
            id: step.id,
            order: step.order,
            type: 'lesson' as const,
            title: body?.title ?? step.lesson.title,
            markdownContent: body?.content ?? '',
        }
    }
    if (step.type === 'TEST') {
        return {
            id: step.id,
            order: step.order,
            type: 'test' as const,
            title: step.test?.title ?? 'Тест',
            questions: [],
        }
    }
    return {
        id: step.id,
        order: step.order,
        type: 'lesson' as const,
        title: 'Шаг',
        markdownContent: '',
    }
}

export const mapCourseDetailToDraft = (
    course: CourseDetail,
    lessonContent: Record<string, Lesson>,
): CourseDraft => ({
    id: course.id,
    title: course.title,
    description: course.description,
    coverUrl: course.image?.url ?? '',
    modules: sortByOrder(course.modules).map((mod: Module) => ({
        id: mod.id,
        title: mod.title,
        order: mod.order,
        steps: sortByOrder(mod.steps).map(s => mapApiStepToLearnStep(s, lessonContent)),
    })),
})
