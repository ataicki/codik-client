import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

let isRefreshing = false
let pendingQueue: Array<{
    resolve: (value: unknown) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    pendingQueue.forEach(p => {
        if (error) {
            p.reject(error)
        } else {
            p.resolve(token)
        }
    })
    pendingQueue = []
}

export const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method?: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
            headers?: AxiosRequestConfig['headers']
            isFormData?: boolean
            skipAuth?: boolean
        },
        unknown,
        {
            status?: number
            data?: unknown
            message?: string
        }
    > =>
        async (args, api) => {
            try {
                const config: AxiosRequestConfig = {
                    url: args.url,
                    method: args.method || 'GET',
                    data: args.data,
                    params: args.params,
                    headers: {
                        ...(args.headers || {}),
                    },
                    signal: api.signal,
                }

                if (args.isFormData) {
                    config.headers!['Content-Type'] = 'multipart/form-data'
                }

                const result = await axiosInstance(config)
                return { data: result.data }
            } catch (error) {
                const err = error as AxiosError
                const originalRequest = err.config as AxiosRequestConfig & { _retry?: boolean }

                if (err.response?.status === 401 && !originalRequest?._retry && !args.skipAuth) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            pendingQueue.push({ resolve, reject })
                        })
                            .then(async () => {
                                const retryResult = await axiosInstance(originalRequest)
                                return { data: retryResult.data }
                            })
                            .catch(e => ({
                                error: {
                                    status: 401,
                                    message: 'Unauthorized',
                                    data: e,
                                },
                            }))
                    }

                    originalRequest._retry = true
                    isRefreshing = true

                    try {
                        await axiosInstance.post('/auth/refresh')

                        processQueue(null)
                        isRefreshing = false

                        const retryResult = await axiosInstance(originalRequest)
                        return { data: retryResult.data }
                    } catch (refreshError) {
                        processQueue(refreshError, null)
                        isRefreshing = false

                        api.dispatch({ type: 'auth/logout' })

                        return {
                            error: {
                                status: 401,
                                message: 'Session expired',
                                data: refreshError,
                            },
                        }
                    }
                }

                return {
                    error: {
                        status: err.response?.status,
                        message: (err.response?.data as any)?.message || err.message,
                        data: err.response?.data,
                    },
                }
            }
        }
