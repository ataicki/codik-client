import type { UserRole } from '../enums/UserRole'

export type Profile = {
    id: string
    userId: string
    email: string
    fullName: string
    role: UserRole
    bio: string | null
    phone: string | null
    city: string | null
    birthDate: string | null
}

export type UpdateProfileRequest = Partial<
    Pick<Profile, 'fullName' | 'bio' | 'phone' | 'city' | 'birthDate'>
>
