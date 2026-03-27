import type { CourseModule, CourseStep, CourseTestQuestion, StepType } from '../../../../entities'

const createId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`

export const createEmptyQuestion = (): CourseTestQuestion => ({
    id: createId(),
    question: '',
    options: [
        { id: createId(), text: '', isCorrect: true },
        { id: createId(), text: '', isCorrect: false },
    ],
})

export const createEmptyStep = (type: StepType): CourseStep => ({
    id: createId(),
    title: '',
    type,
    order: 0,
    markdownContent: type === 'lesson' ? '' : undefined,
    questions: type === 'test' ? [createEmptyQuestion()] : undefined,
})

export const createEmptyModule = (): CourseModule => ({
    id: createId(),
    title: '',
    order: 0,
    steps: [],
})
