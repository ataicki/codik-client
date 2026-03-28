import { api } from './api'
import type { CourseDraft, StudentHomeResponse } from '../../entities'
import { getMockStudentCourse } from '../mock/studentCourses'

const MOCK_STUDENT_HOME: StudentHomeResponse = {
    level: 7,
    xp: 420,
    xpToNextLevel: 600,
    streakDays: 4,
    lastCompleted: {
        courseId: 'course-intro',
        title: 'Привет, код! Первая программа',
        completedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        coverUrl: '',
    },
    inProgress: [
        {
            courseId: 'course-loops',
            title: 'Циклы — крутимся без остановки!',
            description: 'Повторяй действия как робот-танцор: for, while и весёлые узоры.',
            coverUrl: '',
            progressPercent: 46,
            currentModuleTitle: 'Модуль 2: Пока хватит сил',
            completedStepsCount: 5,
            totalStepsCount: 11,
        },
        {
            courseId: 'course-logic',
            title: 'Условия и волшебные ветки',
            description: 'Если солнце — играем, иначе — читаем книжку. Учимся выбирать путь.',
            coverUrl: '',
            progressPercent: 12,
            currentModuleTitle: 'Модуль 1: Первые решения',
            completedStepsCount: 2,
            totalStepsCount: 9,
        },
    ],
    available: [
        {
            courseId: 'course-vars',
            title: 'Переменные — коробки с сокровищами',
            description: 'Складывай числа, строки и имена в коробочки и доставай, когда нужно.',
            coverUrl: '',
            progressPercent: 0,
            completedStepsCount: 0,
            totalStepsCount: 8,
        },
        {
            courseId: 'course-digital',
            title: 'Цифровая грамотность',
            description: 'Безопасность, пароли и умный интернет — как супергерой в сети.',
            coverUrl: '',
            progressPercent: 0,
            completedStepsCount: 0,
            totalStepsCount: 6,
        },
    ],
}

export const studentApi = api.injectEndpoints({
    endpoints: build => ({
        getStudentCourse: build.query<CourseDraft, string>({
            async queryFn(courseId, _api, _extraOptions, fetchWithBQ) {
                const result = await fetchWithBQ({
                    url: `/students/courses/${encodeURIComponent(courseId)}/content`,
                    method: 'GET',
                })
                if ('data' in result && result.data != null) {
                    return { data: result.data as CourseDraft }
                }
                const mock = getMockStudentCourse(courseId)
                if (mock) {
                    return { data: mock }
                }
                return {
                    error: {
                        status: 404,
                        message: 'Курс не найден',
                    },
                }
            },
            providesTags: (_result, _err, id) => [{ type: 'StudentCourse', id }],
        }),
        getStudentHome: build.query<StudentHomeResponse, void>({
            async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
                const result = await fetchWithBQ({ url: '/students/me/home', method: 'GET' })
                if ('error' in result && result.error) {
                    return { data: MOCK_STUDENT_HOME }
                }
                if ('data' in result && result.data != null) {
                    return { data: result.data as StudentHomeResponse }
                }
                return { data: MOCK_STUDENT_HOME }
            },
            providesTags: ['StudentHome'],
        }),
    }),
})

export const { useGetStudentHomeQuery, useGetStudentCourseQuery } = studentApi
