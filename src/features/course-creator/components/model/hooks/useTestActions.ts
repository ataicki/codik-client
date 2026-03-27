import { useCallback, useMemo } from 'react'
import type { UpdateDraftImmer } from '../../types/UpdateDraftImmer'

const createOptionId = () => `${Date.now()}-${Math.random()}`

export const useTestActions = (updateDraftImmer: UpdateDraftImmer) => {
    const addQuestion = useCallback(
        (moduleId: string, stepId: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                if (step?.type !== 'test') return
                step.questions = step.questions ?? []
                step.questions.push({
                    id: createOptionId(),
                    question: '',
                    options: [
                        { id: createOptionId(), text: '', isCorrect: true },
                        { id: createOptionId(), text: '', isCorrect: false },
                    ],
                })
            })
        },
        [updateDraftImmer],
    )

    const removeQuestion = useCallback(
        (moduleId: string, stepId: string, questionId: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                if (step?.type !== 'test') return
                step.questions = (step.questions ?? []).filter(question => question.id !== questionId)
            })
        },
        [updateDraftImmer],
    )

    const updateQuestionTitle = useCallback(
        (moduleId: string, stepId: string, questionId: string, value: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                const question = step?.questions?.find(item => item.id === questionId)
                if (question) question.question = value
            })
        },
        [updateDraftImmer],
    )

    const addOption = useCallback(
        (moduleId: string, stepId: string, questionId: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                const question = step?.questions?.find(item => item.id === questionId)
                if (!question) return
                question.options.push({ id: createOptionId(), text: '', isCorrect: false })
            })
        },
        [updateDraftImmer],
    )

    const removeOption = useCallback(
        (moduleId: string, stepId: string, questionId: string, optionId: string) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                const question = step?.questions?.find(item => item.id === questionId)
                if (!question) return
                question.options = question.options.filter(option => option.id !== optionId)
                if (!question.options.some(option => option.isCorrect) && question.options.length > 0) {
                    question.options[0].isCorrect = true
                }
            })
        },
        [updateDraftImmer],
    )

    const updateOption = useCallback(
        (
            moduleId: string,
            stepId: string,
            questionId: string,
            optionId: string,
            patch: Partial<{ text: string; isCorrect: boolean }>,
        ) => {
            updateDraftImmer(state => {
                const module = state.modules.find(item => item.id === moduleId)
                const step = module?.steps.find(item => item.id === stepId)
                const question = step?.questions?.find(item => item.id === questionId)
                const option = question?.options.find(item => item.id === optionId)
                if (!question || !option) return
                Object.assign(option, patch)
                if (!question.options.some(item => item.isCorrect)) {
                    question.options[0].isCorrect = true
                }
            })
        },
        [updateDraftImmer],
    )

    return useMemo(
        () => ({
            addQuestion,
            removeQuestion,
            updateQuestionTitle,
            addOption,
            removeOption,
            updateOption,
        }),
        [addQuestion, removeQuestion, updateQuestionTitle, addOption, removeOption, updateOption],
    )
}
