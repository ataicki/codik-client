export type ParentKidCourseSummaryDto = {
    courseId: string
    title: string
    coverUrl?: string
    progressPercent: number
    completedStepsCount: number
    totalStepsCount: number
    currentModuleTitle?: string
}

export type ParentKidCompletedCourseDto = {
    courseId: string
    title: string
    completedAt: string
    coverUrl?: string
}

export type ParentKidProgressDto = {
    kidId: string
    kidName: string
    level: number
    xp: number
    completedLessons: number
    totalLessons: number
    coursesInProgress?: ParentKidCourseSummaryDto[]
    completedCourses?: ParentKidCompletedCourseDto[]
}

export type ParentProfileDto = {
    id: string
    fullName: string
    email: string
    children: ParentKidProgressDto[]
}
