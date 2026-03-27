import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../../shared/api'
import {UserResponseDto} from "../../entities";

type AuthState = {
    user: UserResponseDto | null
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
        setAuth: (state, action: PayloadAction<UserResponseDto>) => {
            console.log('setAuth', action.payload)
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
                authApi.endpoints.signIn.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload.user
                    state.isAuthenticated = true
                    state.isInitialized = true
                },
            )
            .addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, { payload }) => {
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
            .addMatcher(authApi.endpoints.signOut.matchFulfilled, state => {
                state.user = null
                state.isAuthenticated = false
                state.isInitialized = true
            })
    },
})

export const { logout, setAuth } = authSlice.actions
export default authSlice.reducer
