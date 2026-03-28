export type Lesson = {
    id: string
    title: string
    content: string
}

export type CreateLessonRequest = {
    title: string
    content?: string
}

export type UpdateLessonRequest = Partial<Pick<Lesson, 'title' | 'content'>>
