import { Badge, Card, Grid, Group, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useAppSelector } from '../../../app/store/hooks'
import { UserRole } from '../../../entities'

const HomeContent = () => {
    const { user, isInitialized } = useAppSelector(state => state.auth)
    console.log(isInitialized)
    console.log(user)
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

    const cards = user.role === UserRole.PARENT
        ? [
            { title: 'Контроль прогресса', description: 'Отслеживайте уровни, XP и активность ребенка каждый день.' },
            { title: 'Домашняя поддержка', description: 'Понимайте, где ребенку нужна помощь по теме.' },
            { title: 'Достижения', description: 'Отмечайте награды и мотивируйте продолжать занятия.' },
        ]
        : user.role === UserRole.ADMIN
            ? [
                { title: 'Модерация пользователей', description: 'Проверяйте роли, активность и спорные действия в системе.' },
                { title: 'Проверка заявок', description: 'Рассматривайте заявки на добавление и обновление курсов.' },
                { title: 'Контроль качества', description: 'Следите за структурой и содержанием учебных материалов.' },
            ]
            : user.role === UserRole.COURSE_CREATOR
                ? [
                    { title: 'Создание курсов', description: 'Собирайте курс из модулей и шагов с уроками, тестами и кодовыми заданиями.' },
                    { title: 'Редактирование модулей', description: 'Меняйте порядок и содержание шагов в каждом модуле.' },
                    { title: 'Черновики и публикация', description: 'Готовьте изменения перед отправкой на модерацию.' },
                ]
                : [
                    { title: 'Изучение модулей', description: 'Проходите темы по шагам в удобном темпе.' },
                    { title: 'Практика и тесты', description: 'Закрепляйте материал через задачи и квизы.' },
                    { title: 'Награды и прогресс', description: 'Получайте XP и открывайте достижения за активность.' },
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
                        {user.role === UserRole.PARENT ? 'Родитель' : user.role}
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
