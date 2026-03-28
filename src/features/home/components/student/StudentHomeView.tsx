import {
    Badge,
    Box,
    Grid,
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
import { Flame, Gamepad2, Star, Trophy } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ru'
import { useAppSelector } from '../../../../app/store/hooks'
import { useGetStudentHomeQuery } from '../../../../shared/api'
import { KidMascot } from './KidMascot'
import { StudentCourseCard } from './StudentCourseCard'

dayjs.extend(relativeTime)
dayjs.locale('ru')

export const StudentHomeView = () => {
    const user = useAppSelector(s => s.auth.user)
    const { data, isLoading } = useGetStudentHomeQuery()

    if (isLoading || !data) {
        return (
            <Stack gap="lg">
                <Skeleton height={220} radius="xl" />
                <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                    <Skeleton height={100} radius="xl" />
                    <Skeleton height={100} radius="xl" />
                    <Skeleton height={100} radius="xl" />
                </SimpleGrid>
                <Skeleton height={180} radius="xl" />
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <Skeleton height={360} radius="xl" />
                    <Skeleton height={360} radius="xl" />
                </SimpleGrid>
            </Stack>
        )
    }

    const firstName = user?.fullName?.split(/\s+/)[0] ?? 'крутой исследователь'
    const xpRatio = Math.min(100, Math.round((data.xp / data.xpToNextLevel) * 100))

    const mascotLine = data.lastCompleted
        ? `Ура, ${firstName}! Ты недавно прошёл «${data.lastCompleted.title}» — держи пять! Хочешь новое приключение?`
        : `Привет, ${firstName}! Я Кодик — покажу, что уже сделано, и куда можно отправиться дальше!`

    return (
        <Stack gap="xl">
            <Paper
                radius="xl"
                p={{ base: 'md', sm: 'xl' }}
                style={{
                    background: 'linear-gradient(125deg, hsl(263 85% 96%) 0%, hsl(197 90% 94%) 45%, hsl(48 95% 92%) 100%)',
                    border: '3px solid hsl(263 70% 85%)',
                    overflow: 'hidden',
                }}
            >
                <Grid gutter={{ base: 'md', lg: 'xl' }} align="center">
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <KidMascot />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Stack gap="md">
                            <Group gap="xs">
                                <ThemeIcon size="lg" radius="xl" color="kidYellow" variant="filled">
                                    <Gamepad2 size={22} />
                                </ThemeIcon>
                                <Badge size="lg" variant="filled" color="violet" tt="none" fz="sm" fw={800}>
                                    Твоя база
                                </Badge>
                            </Group>
                            <Title order={2} fz={{ base: '1.5rem', sm: '2rem' }} lh={1.25}>
                                {mascotLine}
                            </Title>
                            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                                <Paper p="sm" radius="lg" withBorder bg="white/80">
                                    <Group gap="xs" wrap="nowrap">
                                        <ThemeIcon color="kidYellow" variant="light" radius="md">
                                            <Star size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text fz="xs" c="dimmed" fw={600}>
                                                Уровень
                                            </Text>
                                            <Text fw={900} fz="lg">
                                                {data.level}
                                            </Text>
                                        </div>
                                    </Group>
                                </Paper>
                                <Paper p="sm" radius="lg" withBorder bg="white/80">
                                    <Group gap="xs" wrap="nowrap">
                                        <ThemeIcon color="kidPink" variant="light" radius="md">
                                            <Trophy size={18} />
                                        </ThemeIcon>
                                        <div style={{ flex: 1 }}>
                                            <Text fz="xs" c="dimmed" fw={600}>
                                                Опыт
                                            </Text>
                                            <Text fw={800} fz="sm">
                                                {data.xp} / {data.xpToNextLevel} XP
                                            </Text>
                                            <Progress value={xpRatio} size="sm" mt={6} radius="xl" color="kidPink" />
                                        </div>
                                    </Group>
                                </Paper>
                                <Paper p="sm" radius="lg" withBorder bg="white/80">
                                    <Group gap="xs" wrap="nowrap">
                                        <ThemeIcon color="orange" variant="light" radius="md">
                                            <Flame size={18} />
                                        </ThemeIcon>
                                        <div>
                                            <Text fz="xs" c="dimmed" fw={600}>
                                                Серия дней
                                            </Text>
                                            <Text fw={900} fz="lg">
                                                {data.streakDays} 🔥
                                            </Text>
                                        </div>
                                    </Group>
                                </Paper>
                            </SimpleGrid>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>

            {data.lastCompleted && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    <Paper
                        radius="xl"
                        p="lg"
                        withBorder
                        style={{
                            borderColor: 'var(--mantine-color-kidGreen-3)',
                            background: 'linear-gradient(90deg, hsl(140 80% 96%) 0%, white 100%)',
                        }}
                    >
                        <Group align="flex-start" wrap="nowrap" gap="md">
                            {data.lastCompleted.coverUrl?.trim() ? (
                                <Image
                                    src={data.lastCompleted.coverUrl}
                                    alt=""
                                    w={{ base: 100, sm: 140 }}
                                    h={{ base: 70, sm: 90 }}
                                    radius="md"
                                    fit="cover"
                                />
                            ) : (
                                <Box
                                    w={{ base: 100, sm: 140 }}
                                    h={{ base: 70, sm: 90 }}
                                    style={{
                                        borderRadius: 'var(--mantine-radius-md)',
                                        background:
                                            'linear-gradient(135deg, hsl(140 80% 52%) 0%, hsl(170 75% 48%) 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                    }}
                                >
                                    🎉
                                </Box>
                            )}
                            <Stack gap={4} style={{ flex: 1 }}>
                                <Group gap="xs">
                                    <Badge color="kidGreen" variant="filled" tt="none" fz="sm">
                                        Последний пройденный курс
                                    </Badge>
                                    <Text fz="xs" c="dimmed" fw={600}>
                                        {dayjs(data.lastCompleted.completedAt).fromNow()}
                                    </Text>
                                </Group>
                                <Title order={4}>{data.lastCompleted.title}</Title>
                                <Text fz="sm" c="dimmed">
                                    Можно повторить шаги или выбрать что-то новое ниже — как захочешь!
                                </Text>
                            </Stack>
                        </Group>
                    </Paper>
                </motion.div>
            )}

            <div>
                <Group mb="md" gap="sm">
                    <ThemeIcon radius="md" color="kidBlue" variant="filled">
                        <Star size={20} />
                    </ThemeIcon>
                    <Title order={3}>Продолжаем играть</Title>
                </Group>
                {data.inProgress.length === 0 ? (
                    <Paper p="xl" radius="xl" withBorder>
                        <Text ta="center" c="dimmed" fw={600}>
                            Здесь появятся курсы, которые ты уже начал. Выбери новый курс ниже!
                        </Text>
                    </Paper>
                ) : (
                    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                        {data.inProgress.map((c, i) => (
                            <StudentCourseCard key={c.courseId} course={c} index={i} variant="continue" />
                        ))}
                    </SimpleGrid>
                )}
            </div>

            <div>
                <Group mb="md" gap="sm">
                    <ThemeIcon radius="md" color="kidPink" variant="filled">
                        <Gamepad2 size={20} />
                    </ThemeIcon>
                    <Title order={3}>Новые приключения</Title>
                </Group>
                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    {data.available.map((c, i) => (
                        <StudentCourseCard key={c.courseId} course={c} index={i + 2} variant="discover" />
                    ))}
                </SimpleGrid>
            </div>

            <Box
                py="sm"
                style={{
                    borderRadius: 'var(--mantine-radius-xl)',
                    background: 'linear-gradient(90deg, hsl(263 90% 97%) 0%, hsl(197 90% 97%) 100%)',
                }}
            >
                <Text ta="center" fz="sm" fw={600} c="dimmed" px="md">
                    Нажимай на карточки — откроется страница курса. За тесты и код будут очки и награды!
                </Text>
            </Box>
        </Stack>
    )
}
