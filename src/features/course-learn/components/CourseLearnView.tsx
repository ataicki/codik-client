import { useCallback, useEffect, useMemo, useState } from 'react'
import {
    Box,
    Burger,
    Button,
    Container,
    Drawer,
    Group,
    Paper,
    Progress,
    Skeleton,
    Stack,
    Text,
    Title,
} from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppRoutes } from '../../../app/router/AppRoutes'
import { useGetStudentCourseQuery } from '../../../shared/api'
import { flattenCourse } from '../model/flattenCourse'
import { CourseLearnSidebar } from './CourseLearnSidebar'
import { StepCodeContent } from './StepCodeContent'
import { StepLessonContent } from './StepLessonContent'
import { StepTestContent } from './StepTestContent'

export const CourseLearnView = () => {
    const { courseId = '' } = useParams<{ courseId: string }>()
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)
    const isNarrow = useMediaQuery('(max-width: 62em)')

    const { data: course, isLoading, isError } = useGetStudentCourseQuery(courseId, {
        skip: !courseId,
    })

    const flat = useMemo(() => (course ? flattenCourse(course) : []), [course])

    const stepIdFromUrl = searchParams.get('step')
    const effectiveStepId = stepIdFromUrl ?? flat[0]?.step.id ?? ''
    const currentIndex = useMemo(
        () => flat.findIndex(f => f.step.id === effectiveStepId),
        [flat, effectiveStepId],
    )
    const currentItem = currentIndex >= 0 ? flat[currentIndex] : undefined
    const stepForMemo = currentItem?.step
    const testQuestions = useMemo(() => stepForMemo?.questions ?? [], [stepForMemo?.questions])
    const codeExercises = useMemo(() => stepForMemo?.codeExercises ?? [], [stepForMemo?.codeExercises])

    const [stepPassed, setStepPassed] = useState<Record<string, boolean>>({})
    const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({})

    useEffect(() => {
        if (!flat.length) return
        const param = searchParams.get('step')
        if (!param || !flat.some(f => f.step.id === param)) {
            setSearchParams({ step: flat[0].step.id }, { replace: true })
        }
    }, [flat, searchParams, setSearchParams])

    const canGoNext = useMemo(() => {
        if (!currentItem) return false
        const s = currentItem.step
        if (s.type === 'lesson') return true
        return Boolean(stepPassed[s.id])
    }, [currentItem, stepPassed])

    const handlePassStep = useCallback(() => {
        if (!currentItem) return
        setStepPassed(prev => ({ ...prev, [currentItem.step.id]: true }))
    }, [currentItem])

    const handleNext = useCallback(() => {
        if (!currentItem || !canGoNext) return
        setCompletedSteps(prev => ({ ...prev, [currentItem.step.id]: true }))
        const next = flat[currentIndex + 1]
        if (next) {
            setSearchParams({ step: next.step.id })
        } else {
            navigate(AppRoutes.HOME)
        }
        closeDrawer()
    }, [canGoNext, closeDrawer, currentIndex, currentItem, flat, navigate, setSearchParams])

    const handlePrev = useCallback(() => {
        const prev = flat[currentIndex - 1]
        if (prev) {
            setSearchParams({ step: prev.step.id })
        }
        closeDrawer()
    }, [closeDrawer, currentIndex, flat, setSearchParams])

    const selectStep = useCallback(
        (id: string) => {
            setSearchParams({ step: id })
            closeDrawer()
        },
        [closeDrawer, setSearchParams],
    )

    const progress = flat.length ? Math.round(((currentIndex + 1) / flat.length) * 100) : 0
    const isLast = currentIndex === flat.length - 1 && flat.length > 0

    if (isLoading) {
        return (
            <Container size="lg" py="xl">
                <Skeleton height={56} radius="xl" mb="md" />
                <Skeleton height={420} radius="xl" />
            </Container>
        )
    }

    if (isError || !course || !flat.length) {
        return (
            <Container size="sm" py="xl">
                <Paper radius="xl" p="xl" withBorder>
                    <Title order={3} mb="md">
                        Курс не найден
                    </Title>
                    <Text c="dimmed" mb="lg">
                        Проверь ссылку или вернись на главную.
                    </Text>
                    <Button component={Link} to={AppRoutes.HOME} radius="xl" color="violet">
                        На главную
                    </Button>
                </Paper>
            </Container>
        )
    }

    if (!currentItem && flat.length) {
        return (
            <Container size="lg" py="xl">
                <Skeleton height={56} radius="xl" mb="md" />
                <Skeleton height={420} radius="xl" />
            </Container>
        )
    }

    if (!currentItem) {
        return null
    }

    const step = currentItem.step

    const stepBody =
        step.type === 'lesson' ? (
            <StepLessonContent title={step.title} markdown={step.markdownContent} />
        ) : step.type === 'test' ? (
            <StepTestContent
                key={step.id}
                title={step.title}
                questions={testQuestions}
                onPass={handlePassStep}
            />
        ) : (
            <StepCodeContent
                key={step.id}
                title={step.title}
                exercises={codeExercises}
                onPass={handlePassStep}
            />
        )

    const sidebar = (
        <CourseLearnSidebar
            flat={flat}
            currentStepId={step.id}
            completedSteps={completedSteps}
            onSelectStep={selectStep}
        />
    )

    return (
        <Box
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(165deg, hsl(210 40% 98%) 0%, hsl(263 40% 97%) 50%, hsl(197 50% 96%) 100%)',
            }}
        >
            <Paper
                shadow="sm"
                p="md"
                radius={0}
                style={{ borderBottom: '2px solid var(--mantine-color-violet-2)' }}
            >
                <Container size="xl">
                    <Group justify="space-between" wrap="nowrap" gap="sm">
                        <Group gap="sm" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
                            {isNarrow && (
                                <Burger opened={drawerOpened} onClick={openDrawer} aria-label="Шаги" />
                            )}
                            <Button
                                component={Link}
                                to={AppRoutes.HOME}
                                variant="light"
                                color="violet"
                                radius="xl"
                                leftSection={<ArrowLeft size={18} />}
                                size="md"
                            >
                                Главная
                            </Button>
                            <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
                                <Title order={4} lineClamp={2}>
                                    {course.title}
                                </Title>
                                <Text fz="xs" c="dimmed" fw={600}>
                                    Шаг {currentIndex + 1} из {flat.length}
                                </Text>
                            </Stack>
                        </Group>
                    </Group>
                    <Progress value={progress} mt="md" radius="xl" size="sm" color="violet" />
                </Container>
            </Paper>

            <Container size="xl" py="lg">
                <Group align="flex-start" gap="lg" wrap="nowrap">
                    {!isNarrow && (
                        <Box w={300} style={{ flexShrink: 0 }}>
                            {sidebar}
                        </Box>
                    )}
                    <Stack gap="lg" style={{ flex: 1, minWidth: 0 }}>
                        {stepBody}
                        <Group justify="space-between" wrap="wrap" gap="sm">
                            <Button
                                variant="light"
                                color="violet"
                                radius="xl"
                                leftSection={<ArrowLeft size={18} />}
                                onClick={handlePrev}
                                disabled={currentIndex <= 0}
                            >
                                Назад
                            </Button>
                            <Button
                                radius="xl"
                                color="kidGreen"
                                size="lg"
                                rightSection={<ArrowRight size={20} />}
                                onClick={handleNext}
                                disabled={!canGoNext}
                            >
                                {isLast ? 'Завершить' : 'Дальше'}
                            </Button>
                        </Group>
                    </Stack>
                </Group>
            </Container>

            <Drawer opened={drawerOpened} onClose={closeDrawer} title="Шаги курса" position="left" size="md">
                {sidebar}
            </Drawer>
        </Box>
    )
}
