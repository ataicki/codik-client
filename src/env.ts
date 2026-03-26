import { Env } from './vite-env';

export const env: Env = {
    VITE_API_BASE_URL: 'http://localhost:5000',

    AUTH_URL: '/authenticate',
    AUTH_SIGN_IN_URL: '/sign-in',
    AUTH_SIGN_UP_URL: '/sign-up',
    AUTH_SIGN_OUT_URL: '/sign-out',
    AUTH_REFRESH_URL: '/refresh',
    AUTH_ME_URL: '/me',
};
//{{url}}/authentication/sign-in LoginRequest => TokenResponse({accessToken: string, refreshToken})
// {{url}}/authentication/sign-up RegisterRequest => TokenResponse({accessToken: string, refreshToken})
// {{url}}/authentication/refresh RefreshRequest({refreshToken: string}) => TokenResponse({accessToken: string, refreshToken})
// {{url}}/authentication/sign-out void => boolean
// {{url}}/authentication/me void => UserResponse
