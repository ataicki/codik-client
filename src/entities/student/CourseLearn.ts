export type CourseTestOption = {
    id: string
    text: string
    isCorrect: boolean
}

export type CourseTestQuestion = {
    id: string
    question: string
    options: CourseTestOption[]
}

export type CourseCodeExercise = {
    id: string
    taskTitle: string
    description: string
    expectedOutput: string
    starterCode: string
}

export type CourseStepType = 'lesson' | 'test' | 'code'

export type CourseStep = {
    id: string
    title: string
    order: number
    type: CourseStepType
    markdownContent?: string
    questions?: CourseTestQuestion[]
    codeExercises?: CourseCodeExercise[]
}

export type CourseLearnModule = {
    id: string
    title: string
    order: number
    steps: CourseStep[]
}

export type CourseDraft = {
    id: string
    title: string
    description: string
    coverUrl: string
    modules: CourseLearnModule[]
}
