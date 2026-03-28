import { Badge, Card, Grid, Group, Skeleton, Stack, Text, Title } from '@mantine/core'
import { useAppSelector } from '../../../app/store/hooks'
import { UserRole } from '../../../entities'
import { StudentHomeView } from './student/StudentHomeView'
import CourseCreatorHomeView from './courseCreator/CourseCreatorHomeView.tsx'
import { ParentHomeView } from './parent/ParentHomeView'

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

    if (user.role === UserRole.STUDENT) {
        return <StudentHomeView />
    }

    if (user.role === UserRole.COURSE_CREATOR) {
        return <CourseCreatorHomeView />
    }

    if (user.role === UserRole.PARENT) {
        return <ParentHomeView />
    }

    const cards =
        user.role === UserRole.ADMIN
            ? [
                  {
                      title: 'Модерация курсов',
                      description: 'В разделе «Админ панель» проверяйте курсы на модерации и принимайте решения.',
                  },
                  {
                      title: 'Пользователи',
                      description: 'Роли и активность участников — в будущих инструментах администрирования.',
                  },
                  {
                      title: 'Качество контента',
                      description: 'Следите за структурой и полнотой материалов перед публикацией.',
                  },
              ]
            : [
                  { title: 'Главная', description: 'Здесь появятся действия для вашей роли, когда мы их подключим.' },
                  { title: 'Профиль', description: 'Обновите данные и аватар в разделе «Профиль».' },
                  { title: 'Поддержка', description: 'По вопросам доступа обратитесь к администратору платформы.' },
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
                        {user.role === UserRole.ADMIN ? 'Администратор' : user.role}
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
