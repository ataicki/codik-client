import { api } from './api'
import type { ParentProfileDto } from '../../entities'

export const parentProfileApi = api.injectEndpoints({
    endpoints: build => ({
        getParentProfile: build.query<ParentProfileDto, void>({
            query: () => ({
                url: '/parent/profile',
                method: 'GET',
            }),
            providesTags: ['ParentProfile'],
        }),
    }),
})

export const { useGetParentProfileQuery } = parentProfileApi
