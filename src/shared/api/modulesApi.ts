import { api } from './api'
import {
    CourseModule,
    CreateModuleRequest,
    UpdateModuleRequest,
    ReorderModuleRequest,
} from '../../entities'

export const modulesApi = api.injectEndpoints({
    endpoints: (build) => ({
        createModule: build.mutation<
            CourseModule,
            { courseId: string; data: CreateModuleRequest }
        >({
            query: ({ courseId, data }) => ({
                url: `/courses/${courseId}/modules`,
                method: 'POST',
                data,
            }),
            invalidatesTags: (_result, _err, arg) => [{ type: 'Course', id: arg.courseId }, 'Courses'],
        }),

        updateModule: build.mutation<
            CourseModule,
            { id: string; data: UpdateModuleRequest }
        >({
            query: ({ id, data }) => ({
                url: `/modules/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Course', 'Courses'],
        }),

        deleteModule: build.mutation<void, string>({
            query: (id) => ({
                url: `/modules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course', 'Courses'],
        }),

        reorderModule: build.mutation<
            CourseModule,
            { id: string; data: ReorderModuleRequest }
        >({
            query: ({ id, data }) => ({
                url: `/modules/${id}/reorder`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Course', 'Courses'],
        }),
    }),
})

export const {
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useReorderModuleMutation,
} = modulesApi
