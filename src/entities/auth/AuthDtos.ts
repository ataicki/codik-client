import { UserRole } from '../enums/UserRole'

export type LoginRequestDto = {
    email: string
    password: string
}

export type RegisterRequestDto = {
    email: string
    fullName: string
    password: string
    role: UserRole
    age?: number
}

export type UserResponseDto = {
    id: string
    email: string
    fullName?: string
    role: UserRole
    createdAt?: string
    updatedAt?: string
}

export type LogoutResponseDto = {
    success: boolean
}
