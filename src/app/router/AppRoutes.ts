export const AppRoutes = {
    LOGIN: "/login",
    REGISTER: "/register",

    HOME: "/home",

    PROFILE: "/profile",
    PROFILE_PARENT: "/profile/parent",

    ADMIN: "/admin",
    COURSE_CREATOR: "/creator/courses",

    LEARN_COURSE: "/learn/:courseId",

    learnCourse: (courseId: string) => `/learn/${encodeURIComponent(courseId)}`,
} as const
