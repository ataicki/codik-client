export type StepType = 'lesson' | 'test' | 'code'

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

export type CourseStep = {
    id: string
    title: string
    type: StepType
    order: number
    markdownContent?: string
    questions?: CourseTestQuestion[]
    codeExercises?: CourseCodeExercise[]
}

export type CourseModule = {
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
    modules: CourseModule[]
    updatedAt?: string
}

export type CreateCourseDraftRequest = Pick<CourseDraft, 'title' | 'description' | 'coverUrl'> & {
    modules?: CourseModule[]
}

export type UpdateCourseDraftRequest = Partial<CreateCourseDraftRequest> & {
    id: string
}
