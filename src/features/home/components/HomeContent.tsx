import { Badge, Card, Grid, Group, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useAppSelector } from '../../../app/store/hooks'
import { UserRole } from '../../../entities'

const HomeContent = () => {
    const { user, isInitialized } = useAppSelector(state => state.auth)

    if (!isInitialized || !user) {
        return (
            <Stack gap="md">
                <Skeleton height={120} radius="xl" />
                <Grid>
                    <Grid.Col span={{ base: 12, md: 4 }}><Skeleton height={130} radius="xl" /></Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}><Skeleton height={130} radius="xl" /></Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}><Skeleton height={130} radius="xl" /></Grid.Col>
                </Grid>
            </Stack>
        )
    }

    const cards = user.role === UserRole.Parent
        ? [
            { title: 'Контроль прогресса', description: 'Отслеживайте уровни, XP и активность ребенка каждый день.' },
            { title: 'Домашняя поддержка', description: 'Понимайте, где ребенку нужна помощь по теме.' },
            { title: 'Достижения', description: 'Отмечайте награды и мотивируйте продолжать занятия.' },
        ]
        : [
            { title: 'Управление курсами', description: 'Быстро создавайте и редактируйте модули обучения.' },
            { title: 'Практика и тесты', description: 'Добавляйте задачи, мини-игры и квизы к каждому уроку.' },
            { title: 'Аналитика класса', description: 'Смотрите результаты и прогресс детей по модулям.' },
        ]

    return (
        <Stack gap="lg">
            <Card withBorder radius="xl" padding="lg">
                <Group justify="space-between" align="start">
                    <div>
                        <Title order={2}>Добро пожаловать, {user.fullName}</Title>
                        <Text c="dimmed" mt={6}>
                            Здесь собраны основные действия для вашей роли в платформе.
                        </Text>
                    </div>
                    <Badge size="lg" color="violet">
                        {user.role === UserRole.Parent ? 'Родитель' : user.role}
                    </Badge>
                </Group>
            </Card>

            <Grid>
                {cards.map(card => (
                    <Grid.Col key={card.title} span={{ base: 12, md: 4 }}>
                        <Card withBorder radius="xl" padding="lg" h="100%">
                            <Title order={4}>{card.title}</Title>
                            <Text c="dimmed" mt="xs">{card.description}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Stack>
    )
}

export default HomeContent
