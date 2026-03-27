export type ParentKidProgressDto = {
    kidId: string
    kidName: string
    level: number
    xp: number
    completedLessons: number
    totalLessons: number
}

export type ParentProfileDto = {
    id: string
    fullName: string
    email: string
    children: ParentKidProgressDto[]
}
