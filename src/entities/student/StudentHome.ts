export type StudentCourseListItem = {
    courseId: string
    title: string
    description: string
    coverUrl: string
    progressPercent: number
    currentModuleTitle?: string
    completedStepsCount: number
    totalStepsCount: number
}

export type StudentLastCompleted = {
    courseId: string
    title: string
    completedAt: string
    coverUrl: string
}

export type StudentHomeResponse = {
    level: number
    xp: number
    xpToNextLevel: number
    streakDays: number
    lastCompleted: StudentLastCompleted | null
    inProgress: StudentCourseListItem[]
    available: StudentCourseListItem[]
}
