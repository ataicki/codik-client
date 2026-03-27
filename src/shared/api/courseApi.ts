import { api } from "./api"
import {CourseDraft, CreateCourseDraftRequest, UpdateCourseDraftRequest} from "../../entities";

const COURSE_DRAFTS_URL = '/courses/drafts'

export const courseApi = api.injectEndpoints({
    endpoints: build => ({
        getCourseDraftFromId: build.query<CourseDraft, string>({
            query: (id) => ({
                url: `${COURSE_DRAFTS_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: ['CourseDraft'],
        }),
        getMyCourseDrafts: build.query<CourseDraft[], void>({
            query: () => ({
                url: COURSE_DRAFTS_URL,
                method: 'GET',
            }),
            providesTags: ['CourseDraft'],
        }),
        createCourseDraft: build.mutation<CourseDraft, CreateCourseDraftRequest>({
            query: body => ({
                url: COURSE_DRAFTS_URL,
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['CourseDraft'],
        }),
        updateCourseDraft: build.mutation<CourseDraft, UpdateCourseDraftRequest>({
            query: ({ id, ...body }) => ({
                url: `${COURSE_DRAFTS_URL}/${id}`,
                method: 'PATCH',
                data: body,
            }),
            invalidatesTags: ['CourseDraft'],
        }),
    }),
})

export const {
    useGetCourseDraftFromIdQuery,
    useGetMyCourseDraftsQuery,
    useCreateCourseDraftMutation,
    useUpdateCourseDraftMutation,
} = courseApi
