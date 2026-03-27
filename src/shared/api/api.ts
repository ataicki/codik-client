import { createApi } from '@reduxjs/toolkit/query/react'
import {axiosBaseQuery} from "./baseApi.ts";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['User', 'Post', 'CourseDraft'],
    endpoints: () => ({}),
})
