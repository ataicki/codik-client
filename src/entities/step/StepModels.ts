export type CreateStepRequest = {
    type: 'LESSON' | 'TEST'
    title?: string
    lessonId?: string
}

export type ReorderStepRequest = {
    order: number
}
