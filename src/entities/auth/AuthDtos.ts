import { UserRole } from '../enums/UserRole'
import type { UserDto } from '../user/User'

export type LoginRequestDto = {
    email: string
    password: string
}

export type RegisterRequestDto = {
    email: string
    password: string
    fullName: string
}

export type RegisterParentRequestDto = RegisterRequestDto & {
    role: UserRole.Parent
}

export type RegisterCourseCreatorRequestDto = RegisterRequestDto & {
    role: UserRole.CourseCreator
}

export type RegisterKidRequestDto = RegisterRequestDto & {
    role: UserRole.Kid
    age: number
}

export type AuthResponseDto = {
    user: UserDto
}

export type LogoutResponseDto = {
    success: boolean
}
