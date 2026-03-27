import { UserRole } from '../enums/UserRole'

export type UserDto = {
    id: string
    email: string
    fullName: string
    role: UserRole
    createdAt?: string
    updatedAt?: string
}
