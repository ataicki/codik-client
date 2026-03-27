import { api } from './api'

export const extendedApi = api.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<unknown, void>({
            query: () => ({ url: '/user' }),
            providesTags: ['User'],
        }),

        updateUser: build.mutation<unknown, Record<string, unknown>>({
            query: body => ({
                url: '/user',
                method: 'PUT',
                data: body,
            }),
            invalidatesTags: ['User'],
        }),

        uploadAvatar: build.mutation<unknown, FormData>({
            query: formData => ({
                url: '/user/avatar',
                method: 'POST',
                data: formData,
                isFormData: true,
            }),
        }),

        publicData: build.query<unknown, void>({
            query: () => ({
                url: '/public',
                skipAuth: true,
            }),
        }),
    }),
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useUploadAvatarMutation,
    usePublicDataQuery,
} = extendedApi
