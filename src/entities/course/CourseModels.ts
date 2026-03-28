export type CourseStatus =
    | 'PENDING_MODERATION'
    | 'PUBLISHED'
    | 'REJECTED'

export type CourseImage = {
    url: string
}

export type CourseCreator = {
    fullName: string
}

export type LessonRef = {
    id: string
    title: string
}

export type TestRef = {
    id: string
    title: string
}

export type Step = {
    id: string
    order: number
    type: 'LESSON' | 'TEST'
    lesson: LessonRef | null
    test: TestRef | null
}

export type Module = {
    id: string
    title: string
    order: number
    steps: Step[]
}

export type CourseListItem = {
    id: string
    title: string
    description: string
    isAvailable: boolean
    status: CourseStatus
    image: CourseImage | null
    courseCreator: CourseCreator | null
    _count: {
        modules: number
    }
}

export type CourseDetail = CourseListItem & {
    modules: Module[]
    createdAt: string
    updatedAt: string
}

export type Enrollment = {
    id: string
    courseId: string
    userId: string
    enrolledAt: string
    completedAt: string | null
}

export type Progress = {
    totalSteps: number
    completedSteps: number
    percent: number
    completedAt: string | null
}

export type UploadImageResponse = {
    id: string
    imageId: string
    image: CourseImage
}

// DTO
export type CreateCourseRequest = {
    title: string
    description: string
}

export type UpdateCourseRequest = Partial<CreateCourseRequest>
