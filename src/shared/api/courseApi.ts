import { api } from './api'
import {
    CourseListItem,
    CourseDetail,
    CreateCourseRequest,
    UpdateCourseRequest,
    Enrollment,
    Progress,
    UploadImageResponse,
} from '../../entities'

const COURSES_URL = '/courses'

export const coursesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCourses: build.query<CourseListItem[], void>({
            query: () => ({
                url: COURSES_URL,
                method: 'GET',
            }),
            providesTags: ['Courses'],
        }),

        getCourseById: build.query<CourseDetail, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: (_result, _err, id) => [{ type: 'Course', id }],
        }),

        createCourse: build.mutation<CourseListItem, CreateCourseRequest>({
            query: (body) => ({
                url: COURSES_URL,
                method: 'POST',
                data: body,
            }),
            invalidatesTags: ['Courses'],
        }),

        updateCourse: build.mutation<
            CourseDetail,
            { id: string; data: UpdateCourseRequest }
        >({
            query: ({ id, data }) => ({
                url: `${COURSES_URL}/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: (_result, _err, { id }) => [
                { type: 'Course', id },
                'Courses',
            ],
        }),

        uploadCourseImage: build.mutation<
            UploadImageResponse,
            { id: string; file: File }
        >({
            query: ({ id, file }) => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    url: `${COURSES_URL}/${id}/image`,
                    method: 'PATCH',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            },
            invalidatesTags: (_result, _err, { id }) => [{ type: 'Course', id }, 'Courses'],
        }),

        publishCourse: build.mutation<CourseListItem, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}/publish`,
                method: 'PATCH',
            }),
            invalidatesTags: (_result, _err, id) => [{ type: 'Course', id }, 'Courses'],
        }),

        enrollToCourse: build.mutation<Enrollment, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}/enroll`,
                method: 'POST',
            }),
        }),

        getCourseProgress: build.query<Progress, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}/progress`,
                method: 'GET',
            }),
        }),

        getPendingCourses: build.query<CourseListItem[], void>({
            query: () => ({
                url: `${COURSES_URL}/moderation/pending`,
                method: 'GET',
            }),
            providesTags: ['Courses'],
        }),

        approveCourse: build.mutation<CourseListItem, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}/approve`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Courses'],
        }),

        rejectCourse: build.mutation<CourseListItem, string>({
            query: (id) => ({
                url: `${COURSES_URL}/${id}/reject`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Courses'],
        }),
    }),
})

export const {
    useGetCoursesQuery,
    useGetCourseByIdQuery,

    useCreateCourseMutation,
    useUpdateCourseMutation,
    useUploadCourseImageMutation,
    usePublishCourseMutation,

    useEnrollToCourseMutation,
    useGetCourseProgressQuery,

    useGetPendingCoursesQuery,
    useApproveCourseMutation,
    useRejectCourseMutation,
} = coursesApi
