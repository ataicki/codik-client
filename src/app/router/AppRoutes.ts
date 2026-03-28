export const AppRoutes = {
    LOGIN: "/login",
    REGISTER: "/register",

    HOME: "/home",

    PROFILE: "/profile",
    PROFILE_PARENT: "/profile/parent",

    ADMIN: "/admin",
    COURSE_LIST: "/courses",
    COURSE_CREATOR: "/creator/courses",

    LEARN_COURSE: "/learn/:courseId",

    learnCourse: (courseId: string) => `/learn/${encodeURIComponent(courseId)}`,
    courseCreatorEdit: (courseId: string) => `/creator/courses/${encodeURIComponent(courseId)}`,
} as const
