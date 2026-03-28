export type StepRef = {
    id: string
    order: number
    type: 'LESSON' | 'TEST'
    lesson: {
        id: string
        title: string
    } | null
    test: {
        id: string
        title: string
    } | null
}

export type CourseModule = {
    id: string
    title: string
    order: number
    courseId: string
    steps: StepRef[]
    createdAt: string
    updatedAt: string
}

export type CreateModuleRequest = {
    title: string
}

export type UpdateModuleRequest = Partial<CreateModuleRequest>

export type ReorderModuleRequest = {
    order: number
}
