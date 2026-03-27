import { api } from './api'
import { env } from '../../env'
import type {
    AuthResponseDto,
    LoginRequestDto,
    LogoutResponseDto,
    ParentProfileDto,
    RegisterCourseCreatorRequestDto, RegisterKidRequestDto,
    RegisterParentRequestDto,
    UserDto,
} from '../../entities'

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<AuthResponseDto, LoginRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_IN_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        registerParent: build.mutation<AuthResponseDto, RegisterParentRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_UP_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        registerCourseCreator: build.mutation<AuthResponseDto, RegisterCourseCreatorRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_UP_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        registerKid: build.mutation<AuthResponseDto, RegisterKidRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_UP_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        getMe: build.query<UserDto, void>({
            query: () => ({
                url: `${env.AUTH_URL}${env.AUTH_ME_URL}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        logout: build.mutation<LogoutResponseDto, void>({
            query: () => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_OUT_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),

        getParentProfile: build.query<ParentProfileDto, void>({
            query: () => ({
                url: `${env.AUTH_PROFILE_URL}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterParentMutation,
    useRegisterCourseCreatorMutation,
    useRegisterKidMutation,
    useGetMeQuery,
    useLogoutMutation,
    useGetParentProfileQuery,
} = authApi
