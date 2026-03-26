import { api } from './api'

export const extendedApi = api.injectEndpoints({
    endpoints: build => ({
        getUser: build.query<any, void>({
            query: () => ({ url: '/user' }),
            providesTags: ['User'],
        }),

        updateUser: build.mutation<any, any>({
            query: body => ({
                url: '/user',
                method: 'PUT',
                data: body,
            }),
            invalidatesTags: ['User'],
        }),

        uploadAvatar: build.mutation<any, FormData>({
            query: formData => ({
                url: '/user/avatar',
                method: 'POST',
                data: formData,
                isFormData: true,
            }),
        }),

        publicData: build.query<any, void>({
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
