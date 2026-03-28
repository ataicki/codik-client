import type { CourseDraft } from '../../entities'

const opt = (id: string, text: string, isCorrect: boolean) => ({ id, text, isCorrect })

export const MOCK_STUDENT_COURSES: Record<string, CourseDraft> = {
    'course-intro': {
        id: 'course-intro',
        title: 'Привет, код! Первая программа',
        description: 'Узнаем, что такое программа и как попросить компьютер что-то показать.',
        coverUrl: '',
        modules: [
            {
                id: 'intro-m1',
                title: 'Старт',
                order: 1,
                steps: [
                    {
                        id: 'intro-m1-lesson',
                        title: 'Что такое программа?',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            '## Привет!\n\n**Программа** — это набор понятных для компьютера шагов.\n\nСкоро ты научишься писать маленькие программы на JavaScript и видеть результат сразу!\n\n> Подсказка: не бойся ошибок — они помогают учиться.',
                    },
                    {
                        id: 'intro-m1-test',
                        title: 'Мини-проверка',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'intro-q1',
                                question: 'Что делает программа?',
                                options: [
                                    opt('a1', 'Готовит бутерброды', false),
                                    opt('a2', 'Выполняет шаги, которые написал человек', true),
                                    opt('a3', 'Только рисует картинки', false),
                                ],
                            },
                        ],
                    },
                    {
                        id: 'intro-m1-code',
                        title: 'Первая команда',
                        type: 'code',
                        order: 3,
                        codeExercises: [
                            {
                                id: 'intro-ex1',
                                taskTitle: 'Поздоровайся с миром',
                                description: 'Напиши `console.log`, чтобы вывести слово **Привет**.',
                                expectedOutput: 'Привет',
                                starterCode: '// Напиши код ниже\n',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'course-loops': {
        id: 'course-loops',
        title: 'Циклы — крутимся без остановки!',
        description: 'Повторяй действия как робот-танцор: for, while и весёлые узоры.',
        coverUrl: '',
        modules: [
            {
                id: 'loops-m1',
                title: 'Модуль 1: Зачем цикл?',
                order: 1,
                steps: [
                    {
                        id: 'loops-m1-lesson',
                        title: 'Идея повторения',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                        '## Цикл\\n\\nИногда нужно сделать **одно и то же много раз** — например, вывести числа от 1 до 5.\\n\\nВместо копирования строк мы используем **цикл**.\n' +
                            '```(let i = 1; i <= 3; i++) {\\n  console.log(i);\\n}\\n```\n'
                    },
                    {
                        id: 'loops-m1-test',
                        title: 'Узнаём циклы',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'loops-q1',
                                question: 'Цикл помогает…',
                                options: [
                                    opt('l1', 'Один раз напечатать текст', false),
                                    opt('l2', 'Повторять действия много раз', true),
                                    opt('l3', 'Только удалять файлы', false),
                                ],
                            },
                            {
                                id: 'loops-q2',
                                question: 'Что выведет цикл `for (let i = 0; i < 2; i++)` по идее шагов?',
                                options: [
                                    opt('l4', 'Два раза выполнит тело цикла', true),
                                    opt('l5', 'Ноль раз', false),
                                    opt('l6', 'Бесконечно', false),
                                ],
                            },
                        ],
                    },
                    {
                        id: 'loops-m1-code',
                        title: 'Считаем до трёх',
                        type: 'code',
                        order: 3,
                        codeExercises: [
                            {
                                id: 'loops-ex1',
                                taskTitle: 'Три приветствия',
                                description: 'Используй цикл `for`, чтобы вывести слово **Йо** три раза (каждый раз с новой строки).',
                                expectedOutput: 'Йо\nЙо\nЙо',
                                starterCode:
                                    'for (let i = 0; i < 3; i++) {\n  console.log("Йо");\n}\n',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'loops-m2',
                title: 'Модуль 2: Пока хватит сил',
                order: 2,
                steps: [
                    {
                        id: 'loops-m2-lesson',
                        title: 'Пока условие правда',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            '## while\n\nЦикл **while** повторяет код, **пока** условие истинно.\n\nСледи, чтобы условие когда-нибудь стало ложным — иначе программа зависнет!',
                    },
                    {
                        id: 'loops-m2-test',
                        title: 'Про while',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'loops-q3',
                                question: 'Что нужно, чтобы while не крутился вечно?',
                                options: [
                                    opt('l7', 'Чтобы внутри что-то менялось и условие могло стать false', true),
                                    opt('l8', 'Ничего не нужно', false),
                                    opt('l9', 'Только красная кнопка', false),
                                ],
                            },
                        ],
                    },
                    {
                        id: 'loops-m2-code',
                        title: 'Счётчик',
                        type: 'code',
                        order: 3,
                        codeExercises: [
                            {
                                id: 'loops-ex2',
                                taskTitle: 'От 1 до 4',
                                description: 'Выведи числа **1**, **2**, **3**, **4** — каждое с новой строки (можно циклом `for`).',
                                expectedOutput: '1\n2\n3\n4',
                                starterCode: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'course-logic': {
        id: 'course-logic',
        title: 'Условия и волшебные ветки',
        description: 'Если солнце — играем, иначе — читаем книжку.',
        coverUrl: '',
        modules: [
            {
                id: 'logic-m1',
                title: 'Модуль 1: Первые решения',
                order: 1,
                steps: [
                    {
                        id: 'logic-m1-lesson',
                        title: 'if и else',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            '## Ветвление\n\n```js\nif (солнечно) {\n  console.log("Играем!");\n} else {\n  console.log("Читаем книгу");\n}\n```\n\nКомпьютер выбирает **одну** дорожку.',
                    },
                    {
                        id: 'logic-m1-test',
                        title: 'Проверка',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'logic-q1',
                                question: 'Сколько веток выполнится, если условие в if истинно?',
                                options: [
                                    opt('g1', 'Только блок if', true),
                                    opt('g2', 'И if, и else вместе', false),
                                    opt('g3', 'Ни одной', false),
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                id: 'logic-m2',
                title: 'Модуль 2: Сравниваем',
                order: 2,
                steps: [
                    {
                        id: 'logic-m2-lesson',
                        title: 'Операторы сравнения',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            'Можно сравнивать числа: `>`, `<`, `===`.\n\n`===` проверяет, **одинаковы ли** значения.',
                    },
                    {
                        id: 'logic-m2-code',
                        title: 'Чёт или нечёт',
                        type: 'code',
                        order: 2,
                        codeExercises: [
                            {
                                id: 'logic-ex1',
                                taskTitle: 'Пять или не пять',
                                description: 'Если число `n` равно **5**, выведи `Да`, иначе `Нет`. Используй `let n = 5` и `if`.',
                                expectedOutput: 'Да',
                                starterCode: 'let n = 5;\n',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'course-vars': {
        id: 'course-vars',
        title: 'Переменные — коробки с сокровищами',
        description: 'Складывай числа и строки в переменные.',
        coverUrl: '',
        modules: [
            {
                id: 'vars-m1',
                title: 'Коробочки let и const',
                order: 1,
                steps: [
                    {
                        id: 'vars-m1-lesson',
                        title: 'Что хранит переменная?',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            '## Переменная\n\n`let имя = значение;`\n\nИмя — как **наклейка на коробке**, внутри лежит число, строка или другое значение.',
                    },
                    {
                        id: 'vars-m1-test',
                        title: 'Быстрый тест',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'vars-q1',
                                question: 'Что лучше использовать, если значение не меняется?',
                                options: [
                                    opt('v1', 'const', true),
                                    opt('v2', 'let', false),
                                    opt('v3', 'var всегда', false),
                                ],
                            },
                        ],
                    },
                    {
                        id: 'vars-m1-code',
                        title: 'Сложи в уме',
                        type: 'code',
                        order: 3,
                        codeExercises: [
                            {
                                id: 'vars-ex1',
                                taskTitle: 'Сумма',
                                description: 'Создай переменные `a = 10` и `b = 7`, выведи их сумму через `console.log`.',
                                expectedOutput: '17',
                                starterCode: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },

    'course-digital': {
        id: 'course-digital',
        title: 'Цифровая грамотность',
        description: 'Безопасность и умный интернет.',
        coverUrl: '',
        modules: [
            {
                id: 'dig-m1',
                title: 'Безопасность в сети',
                order: 1,
                steps: [
                    {
                        id: 'dig-m1-lesson',
                        title: 'Пароль и секреты',
                        type: 'lesson',
                        order: 1,
                        markdownContent:
                            '## Секреты\n\n- Не говори пароль **никому**, кроме родителей.\n- Странные ссылки — **спрашивай взрослых**.\n- Личные данные не публикуй в открытом доступе.',
                    },
                    {
                        id: 'dig-m1-test',
                        title: 'Что безопасно?',
                        type: 'test',
                        order: 2,
                        questions: [
                            {
                                id: 'dig-q1',
                                question: 'Что делать, если незнакомец просит пароль в игре?',
                                options: [
                                    opt('d1', 'Сразу рассказать родителям или учителю', true),
                                    opt('d2', 'Отправить пароль, чтобы не обидеть', false),
                                    opt('d3', 'Ничего не делать', false),
                                ],
                            },
                        ],
                    },
                    {
                        id: 'dig-m1-code',
                        title: 'Мини-практика',
                        type: 'code',
                        order: 3,
                        codeExercises: [
                            {
                                id: 'dig-ex1',
                                taskTitle: 'Слова поддержки',
                                description: 'Выведи фразу **Я в сети осторожен!**',
                                expectedOutput: 'Я в сети осторожен!',
                                starterCode: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },
}

export const getMockStudentCourse = (courseId: string): CourseDraft | null =>
    MOCK_STUDENT_COURSES[courseId] ?? null
