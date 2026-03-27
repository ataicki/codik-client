import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserDto } from '../../entities'
import { authApi } from '../../shared/api/authApi'

type AuthState = {
    user: UserDto | null
    isAuthenticated: boolean
    isInitialized: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<UserDto>) => {
            state.user = action.payload
            state.isAuthenticated = true
            state.isInitialized = true
        },
        logout: state => {
            state.user = null
            state.isAuthenticated = false
            state.isInitialized = true
        },
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user
                    state.isAuthenticated = true
                    state.isInitialized = true
                },
            )
            .addMatcher(
                authApi.endpoints.registerParent.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user
                    state.isAuthenticated = true
                    state.isInitialized = true
                },
            )
            .addMatcher(
                authApi.endpoints.registerCourseCreator.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user
                    state.isAuthenticated = true
                    state.isInitialized = true
                },
            )
            .addMatcher(authApi.endpoints.registerKid.matchFulfilled, (state, { payload }) => {
                state.user = payload.user
                state.isAuthenticated = true
                state.isInitialized = true
            })
            .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, { payload }) => {
                state.user = payload
                state.isAuthenticated = true
                state.isInitialized = true
            })
            .addMatcher(authApi.endpoints.getMe.matchRejected, state => {
                state.user = null
                state.isAuthenticated = false
                state.isInitialized = true
            })
            .addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
                state.user = null
                state.isAuthenticated = false
                state.isInitialized = true
            })
    },
})

export const { logout, setAuth } = authSlice.actions
export default authSlice.reducer
