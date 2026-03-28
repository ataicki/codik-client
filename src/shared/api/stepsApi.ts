import { api } from './api'
import type { CreateStepRequest, ReorderStepRequest, Step } from '../../entities'

export const stepsApi = api.injectEndpoints({
    endpoints: build => ({
        createStep: build.mutation<Step, { moduleId: string; data: CreateStepRequest }>({
            query: ({ moduleId, data }) => ({
                url: `/modules/${moduleId}/steps`,
                method: 'POST',
                data,
            }),
            invalidatesTags: ['Course'],
        }),

        deleteStep: build.mutation<void, string>({
            query: id => ({
                url: `/steps/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),

        reorderStep: build.mutation<Step, { id: string; data: ReorderStepRequest }>({
            query: ({ id, data }) => ({
                url: `/steps/${id}/reorder`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['Course'],
        }),

        completeStep: build.mutation<void, string>({
            query: id => ({
                url: `/steps/${id}/complete`,
                method: 'POST',
            }),
            invalidatesTags: ['StudentCourse', 'StudentHome'],
        }),
    }),
})

export const {
    useCreateStepMutation,
    useDeleteStepMutation,
    useReorderStepMutation,
    useCompleteStepMutation,
} = stepsApi
