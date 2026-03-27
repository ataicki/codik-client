import { Alert, Card, Group, Progress, Skeleton, Stack, Text, Title } from '@mantine/core'
import { UserRole } from '../../../entities'
import { useGetMeQuery, useGetParentProfileQuery } from '../../../shared/api'

const UserProfileContent = () => {
    const meQuery = useGetMeQuery()
    const profileQuery = useGetParentProfileQuery(undefined, {
        skip: meQuery.data?.role !== UserRole.Parent,
    })

    if (meQuery.isLoading) {
        return (
            <Stack gap="md">
                <Skeleton height={120} radius="xl" />
                <Skeleton height={110} radius="xl" />
            </Stack>
        )
    }

    if (meQuery.isError || !meQuery.data) {
        return <Alert color="red">Не удалось загрузить профиль пользователя.</Alert>
    }

    const user = meQuery.data

    return (
        <Stack gap="lg">
            <Card withBorder radius="xl" padding="lg">
                <Title order={2}>Профиль пользователя</Title>
                <Text mt="sm">{user.fullName}</Text>
                <Text c="dimmed">{user.email}</Text>
                <Text mt="xs">Роль: {user.role}</Text>
            </Card>

            {user.role === UserRole.Parent && (
                <>
                    {profileQuery.isLoading && (
                        <Stack gap="md">
                            <Skeleton height={100} radius="xl" />
                            <Skeleton height={100} radius="xl" />
                        </Stack>
                    )}

                    {profileQuery.isError && (
                        <Alert color="yellow">Детали профиля родителя временно недоступны.</Alert>
                    )}

                    {profileQuery.data?.children.map(child => {
                        const value = child.totalLessons > 0
                            ? Math.round((child.completedLessons / child.totalLessons) * 100)
                            : 0

                        return (
                            <Card key={child.kidId} withBorder radius="xl" padding="lg">
                                <Group justify="space-between">
                                    <Title order={4}>{child.kidName}</Title>
                                    <Text fw={600}>Уровень {child.level}</Text>
                                </Group>
                                <Text size="sm" c="dimmed" mt="xs">
                                    XP: {child.xp}
                                </Text>
                                <Text size="sm" mt="xs">
                                    Прогресс уроков: {child.completedLessons}/{child.totalLessons}
                                </Text>
                                <Progress value={value} mt="sm" />
                            </Card>
                        )
                    })}
                </>
            )}
        </Stack>
    )
}

export default UserProfileContent
