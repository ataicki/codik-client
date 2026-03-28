import { useCallback, useMemo } from 'react'
import type { Module } from '../../../../entities'
import {
    useCreateLessonMutation,
    useCreateModuleMutation,
    useCreateStepMutation,
    useDeleteModuleMutation,
    useDeleteStepMutation,
    useReorderModuleMutation,
    useReorderStepMutation,
    useUpdateLessonMutation,
    useUpdateModuleMutation,
} from '../../../../shared/api'

const sortByOrder = <T extends { order: number }>(items: T[]) => [...items].sort((a, b) => a.order - b.order)

export const useCourseEditorMutations = (courseId: string | undefined) => {
    const [createModule] = useCreateModuleMutation()
    const [updateModule] = useUpdateModuleMutation()
    const [deleteModule] = useDeleteModuleMutation()
    const [reorderModule] = useReorderModuleMutation()
    const [createLesson] = useCreateLessonMutation()
    const [updateLesson] = useUpdateLessonMutation()
    const [createStep] = useCreateStepMutation()
    const [deleteStep] = useDeleteStepMutation()
    const [reorderStep] = useReorderStepMutation()

    const addModule = useCallback(async () => {
        if (!courseId) return
        await createModule({ courseId, data: { title: 'Новый модуль' } }).unwrap()
    }, [courseId, createModule])

    const updateModuleTitle = useCallback(
        (moduleId: string, title: string) => {
            updateModule({ id: moduleId, data: { title } })
        },
        [updateModule],
    )

    const removeModule = useCallback(
        async (moduleId: string) => {
            await deleteModule(moduleId).unwrap()
        },
        [deleteModule],
    )

    const moveModule = useCallback(
        async (moduleId: string, direction: 'up' | 'down', modules: Module[]) => {
            const sorted = sortByOrder(modules)
            const index = sorted.findIndex(m => m.id === moduleId)
            if (index < 0) return
            const nextIndex = direction === 'up' ? index - 1 : index + 1
            if (nextIndex < 0 || nextIndex >= sorted.length) return
            const a = sorted[index]
            const b = sorted[nextIndex]
            await reorderModule({ id: a.id, data: { order: b.order } }).unwrap()
            await reorderModule({ id: b.id, data: { order: a.order } }).unwrap()
        },
        [reorderModule],
    )

    const addStep = useCallback(
        async (moduleId: string, kind: 'lesson' | 'test') => {
            if (kind === 'lesson') {
                const lesson = await createLesson({ title: 'Новый урок', content: '' }).unwrap()
                await createStep({
                    moduleId,
                    data: { type: 'LESSON', lessonId: lesson.id },
                }).unwrap()
            } else {
                await createStep({
                    moduleId,
                    data: { type: 'TEST', title: 'Новый тест' },
                }).unwrap()
            }
        },
        [createLesson, createStep],
    )

    const moveStep = useCallback(
        async (moduleId: string, stepId: string, direction: 'up' | 'down', modules: Module[]) => {
            const mod = modules.find(m => m.id === moduleId)
            if (!mod) return
            const sorted = sortByOrder(mod.steps)
            const index = sorted.findIndex(s => s.id === stepId)
            if (index < 0) return
            const nextIndex = direction === 'up' ? index - 1 : index + 1
            if (nextIndex < 0 || nextIndex >= sorted.length) return
            const a = sorted[index]
            const b = sorted[nextIndex]
            await reorderStep({ id: a.id, data: { order: b.order } }).unwrap()
            await reorderStep({ id: b.id, data: { order: a.order } }).unwrap()
        },
        [reorderStep],
    )

    const removeStep = useCallback(
        async (_moduleId: string, stepId: string) => {
            await deleteStep(stepId).unwrap()
        },
        [deleteStep],
    )

    const saveLessonPatch = useCallback(
        (lessonId: string, data: { title?: string; content?: string }) => {
            updateLesson({ id: lessonId, data })
        },
        [updateLesson],
    )

    return useMemo(
        () => ({
            addModule,
            updateModuleTitle,
            removeModule,
            moveModule,
            addStep,
            moveStep,
            removeStep,
            saveLessonPatch,
        }),
        [addModule, updateModuleTitle, removeModule, moveModule, addStep, moveStep, removeStep, saveLessonPatch],
    )
}
