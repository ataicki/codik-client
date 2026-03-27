import { Card, Group, Progress, Stack, Text, Title } from '@mantine/core'
import { useGetParentProfileQuery } from '../../shared/api'

const ParentProfilePage = () => {
    const { data, isLoading, isError } = useGetParentProfileQuery()

    if (isLoading) {
        return <div>Загружаем профиль родителя...</div>
    }

    if (isError || !data) {
        return <div>Не удалось загрузить профиль родителя.</div>
    }

    return (
        <Stack gap="lg">
            <Card withBorder padding="lg">
                <Title order={2}>Профиль родителя</Title>
                <Text mt="xs">{data.fullName}</Text>
                <Text c="dimmed">{data.email}</Text>
            </Card>

            <Stack gap="md">
                {data.children.map(kid => {
                    const progressValue =
                        kid.totalLessons > 0
                            ? Math.round((kid.completedLessons / kid.totalLessons) * 100)
                            : 0

                    return (
                        <Card key={kid.kidId} withBorder padding="lg">
                            <Group justify="space-between">
                                <Title order={4}>{kid.kidName}</Title>
                                <Text fw={600}>Уровень {kid.level}</Text>
                            </Group>
                            <Text size="sm" c="dimmed" mt="xs">
                                XP: {kid.xp}
                            </Text>
                            <Text size="sm" mt="sm">
                                Пройдено уроков: {kid.completedLessons}/{kid.totalLessons}
                            </Text>
                            <Progress value={progressValue} mt="sm" />
                        </Card>
                    )
                })}
            </Stack>
        </Stack>
    )
}

export default ParentProfilePage
