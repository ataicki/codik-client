import { Box, Button, Card, Group, Image, Progress, Stack, Text, ThemeIcon } from '@mantine/core'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'
import type { StudentCourseListItem } from '../../../../entities'
import { AppRoutes } from '../../../../app/router/AppRoutes'

type Props = {
    course: StudentCourseListItem
    index: number
    variant: 'continue' | 'discover'
}

const accent = ['kidPink', 'kidBlue', 'kidYellow', 'kidGreen'] as const

const coverEmoji = ['🌀', '🧩', '📦', '🌐', '🚀', '✨'] as const

const coverGradients = [
    'linear-gradient(135deg, hsl(263 85% 58%) 0%, hsl(300 75% 65%) 100%)',
    'linear-gradient(135deg, hsl(197 90% 52%) 0%, hsl(220 85% 60%) 100%)',
    'linear-gradient(135deg, hsl(48 95% 55%) 0%, hsl(38 95% 58%) 100%)',
    'linear-gradient(135deg, hsl(140 80% 48%) 0%, hsl(170 75% 45%) 100%)',
] as const

export const StudentCourseCard = ({ course, index, variant }: Props) => {
    const color = accent[index % accent.length]
    const isNew = course.progressPercent === 0
    const hasCover = Boolean(course.coverUrl?.trim())

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ height: '100%' }}
        >
            <Card
                padding="lg"
                radius="xl"
                h="100%"
                style={{
                    border: '3px solid',
                    borderColor: `var(--mantine-color-${color}-3)`,
                    background: 'linear-gradient(155deg, var(--mantine-color-body) 0%, var(--mantine-color-gray-0) 100%)',
                    overflow: 'hidden',
                }}
            >
                <Card.Section>
                    <Box pos="relative">
                        {hasCover ? (
                        <Image
                            src={course.coverUrl}
                            alt=""
                            height={140}
                            fit="cover"
                        />
                        ) : (
                            <Box
                                h={140}
                                style={{
                                    background: coverGradients[index % coverGradients.length],
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                }}
                            >
                                {coverEmoji[index % coverEmoji.length]}
                            </Box>
                        )}
                        {!isNew && (
                            <Box
                                pos="absolute"
                                bottom={8}
                                left={8}
                                right={8}
                            >
                                <Progress
                                    value={course.progressPercent}
                                    size="lg"
                                    radius="xl"
                                    color={color}
                                    styles={{
                                        section: { transition: 'width 0.4s ease' },
                                    }}
                                />
                            </Box>
                        )}
                        {isNew && (
                            <ThemeIcon
                                size="lg"
                                radius="xl"
                                variant="filled"
                                color={color}
                                pos="absolute"
                                top={10}
                                right={10}
                            >
                                <Sparkles size={20} />
                            </ThemeIcon>
                        )}
                    </Box>
                </Card.Section>

                <Stack gap="sm" mt="md">
                    <Text fw={800} fz="lg" lineClamp={2} c="dark.8">
                        {course.title}
                    </Text>
                    <Text fz="sm" c="dimmed" lineClamp={2}>
                        {course.description}
                    </Text>
                    {!isNew && course.currentModuleTitle && (
                        <Text fz="xs" fw={700} c={`${color}.7`}>
                            Сейчас: {course.currentModuleTitle}
                        </Text>
                    )}
                    <Group justify="space-between" align="center" mt="xs">
                        <Text fz="xs" c="dimmed" fw={600}>
                            Шаги: {course.completedStepsCount}/{course.totalStepsCount}
                            {!isNew && ` · ${course.progressPercent}%`}
                        </Text>
                        <Button
                            component={Link}
                            to={AppRoutes.learnCourse(course.courseId)}
                            size="md"
                            radius="xl"
                            color={color}
                            leftSection={isNew ? <Sparkles size={18} /> : <Play size={18} fill="currentColor" />}
                        >
                            {variant === 'continue' ? 'Продолжить' : 'Открыть'}
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </motion.div>
    )
}
