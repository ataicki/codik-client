import { api } from './api'
import { Profile, UpdateProfileRequest } from '../../entities'

const PROFILE_URL = '/profile'

export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<Profile, void>({
            query: () => ({
                url: PROFILE_URL,
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),

        updateProfile: build.mutation<Profile, UpdateProfileRequest>({
            query: data => ({
                url: PROFILE_URL,
                method: 'PUT',
                data,
            }),
            invalidatesTags: ['Profile', 'User'],
        }),
    }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
