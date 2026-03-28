import { api } from './api'
import type { CreateLessonRequest, Lesson, UpdateLessonRequest } from '../../entities'

export const lessonsApi = api.injectEndpoints({
    endpoints: build => ({
        getLesson: build.query<Lesson, string>({
            query: id => ({
                url: `/lessons/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _err, id) => [{ type: 'Lesson', id }],
        }),

        createLesson: build.mutation<Lesson, CreateLessonRequest>({
            query: body => ({
                url: '/lessons',
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['Course'],
        }),

        updateLesson: build.mutation<Lesson, { id: string; data: UpdateLessonRequest }>({
            query: ({ id, data }) => ({
                url: `/lessons/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: (_result, _err, { id }) => [{ type: 'Lesson', id }, 'Course'],
        }),

        deleteLesson: build.mutation<void, string>({
            query: id => ({
                url: `/lessons/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),
    }),
})

export const {
    useGetLessonQuery,
    useLazyGetLessonQuery,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonsApi
