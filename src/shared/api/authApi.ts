import { api } from './api'
import { env } from '../../env'
import type {
    UserResponseDto,
    LoginRequestDto,
    LogoutResponseDto,
    RegisterRequestDto,
} from '../../entities'

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        signIn: build.mutation<{user: UserResponseDto}, LoginRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_IN_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        signUp: build.mutation<{user: UserResponseDto}, RegisterRequestDto>({
            query: body => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_UP_URL}`,
                method: 'POST',
                data: body,
                skipAuth: true,
            }),
        }),

        getMe: build.query<UserResponseDto, void>({
            query: () => ({
                url: `${env.AUTH_URL}${env.AUTH_ME_URL}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        uploadMyAvatar: build.mutation<UserResponseDto, File>({
            query: file => {
                const formData = new FormData()
                formData.append('file', file)
                return {
                    url: `${env.AUTH_URL}${env.AUTH_ME_URL}/avatar`,
                    method: 'PATCH',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            },
            invalidatesTags: ['User'],
        }),

        signOut: build.mutation<LogoutResponseDto, void>({
            query: () => ({
                url: `${env.AUTH_URL}${env.AUTH_SIGN_OUT_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        })
    }),
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useGetMeQuery,
    useUploadMyAvatarMutation,
} = authApi
