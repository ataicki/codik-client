import {
    Badge,
    Card,
    Group,
    Image,
    Paper,
    Progress,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, Heart, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../../app/store/hooks'
import { AppRoutes } from '../../../../app/router/AppRoutes'
import type { ParentKidProgressDto } from '../../../../entities'
import { useGetParentProfileQuery } from '../../../../shared/api'

const accent = ['kidBlue', 'kidPink', 'kidYellow', 'kidGreen'] as const

export const ParentHomeView = () => {
    const user = useAppSelector(s => s.auth.user)
    const { data, isLoading, isError } = useGetParentProfileQuery()

    if (isLoading) {
        return (
            <Stack gap="lg">
                <Skeleton height={140} radius="xl" />
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <Skeleton height={320} radius="xl" />
                    <Skeleton height={320} radius="xl" />
                </SimpleGrid>
            </Stack>
        )
    }

    if (isError || !data) {
        return (
            <Paper p="xl" radius="xl" withBorder>
                <Stack gap="sm">
                    <Text c="red" fw={600}>
                        Не удалось загрузить данные о детях.
                    </Text>
                    <Text c="dimmed" size="sm">
                        Проверьте привязку аккаунтов или попробуйте позже.
                    </Text>
                </Stack>
            </Paper>
        )
    }

    const firstName = user?.fullName?.split(/\s+/)[0] ?? 'родитель'

    return (
        <Stack gap="xl">
            <Paper
                radius="xl"
                p={{ base: 'md', sm: 'xl' }}
                style={{
                    background:
                        'linear-gradient(125deg, hsl(210 80% 97%) 0%, hsl(240 60% 97%) 50%, hsl(280 50% 97%) 100%)',
                    border: '3px solid hsl(220 60% 85%)',
                }}
            >
                <Group gap="md" wrap="wrap">
                    <ThemeIcon size={54} radius="xl" color="blue" variant="light">
                        <Heart size={28} />
                    </ThemeIcon>
                    <div style={{ flex: 1, minWidth: 220 }}>
                        <Title order={2}>Семейный центр</Title>
                        <Text c="dimmed" mt={6}>
                            Привет, {firstName}! Здесь прогресс каждого ребёнка и курсы, которые он проходит сейчас.
                        </Text>
                    </div>
                    <Badge size="lg" variant="filled" color="blue" tt="none">
                        Детей в аккаунте: {data.children.length}
                    </Badge>
                </Group>
            </Paper>

            {data.children.length === 0 ? (
                <Paper p="xl" radius="xl" withBorder>
                    <Text ta="center" c="dimmed" fw={600}>
                        Пока нет привязанных детских профилей. Как только они появятся, карточки отобразятся здесь.
                    </Text>
                </Paper>
            ) : (
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    {data.children.map((child, index) => (
                        <ChildCard key={child.kidId} child={child} index={index} />
                    ))}
                </SimpleGrid>
            )}
        </Stack>
    )
}

const ChildCard = ({ child, index }: { child: ParentKidProgressDto; index: number }) => {
    const color = accent[index % accent.length]
    const lessonProgress =
        child.totalLessons > 0 ? Math.round((child.completedLessons / child.totalLessons) * 100) : 0
    const inProgress = child.coursesInProgress ?? []
    const done = child.completedCourses ?? []

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 24 }}
        >
            <Card
                padding="lg"
                radius="xl"
                h="100%"
                style={{
                    border: '3px solid',
                    borderColor: `var(--mantine-color-${color}-3)`,
                    background: 'linear-gradient(165deg, var(--mantine-color-body) 0%, var(--mantine-color-gray-0) 100%)',
                }}
            >
                <Stack gap="md">
                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Group gap="md" wrap="nowrap">
                            <ThemeIcon size={48} radius="xl" color={color} variant="light">
                                <GraduationCap size={26} />
                            </ThemeIcon>
                            <div>
                                <Title order={4}>{child.kidName}</Title>
                                <Text size="sm" c="dimmed" fw={600}>
                                    Уровень {child.level} · {child.xp} XP
                                </Text>
                            </div>
                        </Group>
                        <Badge color={color} variant="light">
                            <Trophy size={14} style={{ marginRight: 6 }} />
                            Прогресс уроков
                        </Badge>
                    </Group>

                    <div>
                        <Group justify="space-between" mb={6}>
                            <Text size="xs" c="dimmed" fw={700}>
                                Уроки в сумме
                            </Text>
                            <Text size="xs" fw={800}>
                                {child.completedLessons}/{child.totalLessons}
                            </Text>
                        </Group>
                        <Progress value={lessonProgress} radius="xl" size="md" color={color} />
                    </div>

                    <div>
                        <Group gap="xs" mb="sm">
                            <BookOpen size={18} />
                            <Text fw={800}>Курсы сейчас</Text>
                        </Group>
                        {inProgress.length === 0 ? (
                            <Text size="sm" c="dimmed">
                                Нет активных курсов.
                            </Text>
                        ) : (
                            <Stack gap="sm">
                                {inProgress.map(c => (
                                    <Paper
                                        key={c.courseId}
                                        p="sm"
                                        radius="lg"
                                        withBorder
                                        bg="white/90"
                                        component={Link}
                                        to={AppRoutes.learnCourse(c.courseId)}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Group wrap="nowrap" gap="sm" align="flex-start">
                                            {c.coverUrl?.trim() ? (
                                                <Image src={c.coverUrl} w={56} h={40} radius="sm" fit="cover" />
                                            ) : (
                                                <Paper w={56} h={40} radius="sm" bg={`var(--mantine-color-${color}-1)`} />
                                            )}
                                            <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                                                <Text fw={700} size="sm" lineClamp={2}>
                                                    {c.title}
                                                </Text>
                                                {c.currentModuleTitle && (
                                                    <Text size="xs" c="dimmed">
                                                        Сейчас: {c.currentModuleTitle}
                                                    </Text>
                                                )}
                                                <Group gap="xs">
                                                    <Text size="xs" c="dimmed" fw={600}>
                                                        Шаги: {c.completedStepsCount}/{c.totalStepsCount}
                                                    </Text>
                                                    <Text size="xs" fw={800} c={`${color}.7`}>
                                                        {c.progressPercent}%
                                                    </Text>
                                                </Group>
                                                <Progress value={c.progressPercent} size="sm" radius="xl" color={color} />
                                            </Stack>
                                        </Group>
                                    </Paper>
                                ))}
                            </Stack>
                        )}
                    </div>

                    {done.length > 0 && (
                        <div>
                            <Text fw={800} mb="xs" size="sm">
                                Завершённые курсы
                            </Text>
                            <Stack gap={6}>
                                {done.map(c => (
                                    <Group key={c.courseId} gap="xs" wrap="nowrap">
                                        <Badge size="sm" variant="outline" color="gray" tt="none">
                                            ✓
                                        </Badge>
                                        <Text size="sm" lineClamp={1} style={{ flex: 1 }}>
                                            {c.title}
                                        </Text>
                                    </Group>
                                ))}
                            </Stack>
                        </div>
                    )}
                </Stack>
            </Card>
        </motion.div>
    )
}
