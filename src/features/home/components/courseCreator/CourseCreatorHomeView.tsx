import {
    Badge,
    Button,
    Card,
    Group,
    Modal,
    Paper,
    ScrollArea,
    Skeleton,
    Stack,
    Table,
    Text,
    Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { BookOpen, PencilLine, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../../app/router/AppRoutes'
import type { CourseListItem, CourseStatus } from '../../../../entities'
import { useGetCoursesQuery } from '../../../../shared/api'
import CourseCreateBuilder from '../../../course-creator/components/CourseCreateBuilder'

const statusLabel = (s: CourseStatus) => {
    switch (s) {
        case 'PUBLISHED':
            return 'Опубликован'
        case 'PENDING_MODERATION':
            return 'На модерации'
        case 'REJECTED':
            return 'Отклонён'
        default:
            return s
    }
}

const statusColor = (s: CourseStatus): string => {
    switch (s) {
        case 'PUBLISHED':
            return 'kidGreen'
        case 'PENDING_MODERATION':
            return 'yellow'
        case 'REJECTED':
            return 'red'
        default:
            return 'gray'
    }
}

const CourseCreatorHomeView = () => {
    const navigate = useNavigate()
    const { data: courses, isLoading, isError, refetch } = useGetCoursesQuery()
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false)

    const rows = courses ?? []

    return (
        <Stack gap="lg">
            <Card
                withBorder
                radius="xl"
                padding="lg"
                style={{
                    background:
                        'linear-gradient(120deg, hsl(263 35% 97%) 0%, hsl(220 40% 97%) 50%, hsl(197 35% 96%) 100%)',
                }}
            >
                <Group justify="space-between" wrap="wrap" gap="md">
                    <Group gap="sm">
                        <BookOpen size={28} color="var(--mantine-color-violet-6)" />
                        <div>
                            <Title order={3}>Мои курсы</Title>
                            <Text c="dimmed" size="sm">
                                Список приходит с сервера. Создайте новый курс или откройте конструктор для
                                редактирования модулей и уроков.
                            </Text>
                        </div>
                    </Group>
                    <Button leftSection={<Plus size={18} />} onClick={openCreate} radius="xl" color="violet">
                        Новый курс
                    </Button>
                </Group>
            </Card>

            <Paper withBorder radius="xl" p={0} style={{ overflow: 'hidden' }}>
                {isLoading && (
                    <Stack p="lg" gap="sm">
                        <Skeleton height={36} radius="md" />
                        <Skeleton height={36} radius="md" />
                        <Skeleton height={36} radius="md" />
                    </Stack>
                )}
                {isError && (
                    <Text c="red" p="lg">
                        Не удалось загрузить курсы.
                        <Button variant="subtle" ml="sm" onClick={() => refetch()}>
                            Повторить
                        </Button>
                    </Text>
                )}
                {!isLoading && !isError && rows.length === 0 && (
                    <Text p="xl" ta="center" c="dimmed">
                        Пока нет курсов. Нажмите «Новый курс», чтобы начать.
                    </Text>
                )}
                {!isLoading && !isError && rows.length > 0 && (
                    <ScrollArea h={520} type="auto">
                        <Table striped highlightOnHover verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Название</Table.Th>
                                    <Table.Th>Статус</Table.Th>
                                    <Table.Th>Модули</Table.Th>
                                    <Table.Th style={{ width: 140 }} />
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows.map((c: CourseListItem) => (
                                    <Table.Tr key={c.id}>
                                        <Table.Td>
                                            <Stack gap={2}>
                                                <Text fw={700}>{c.title}</Text>
                                                <Text size="xs" c="dimmed" lineClamp={2}>
                                                    {c.description}
                                                </Text>
                                            </Stack>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color={statusColor(c.status)} variant="light" tt="none">
                                                {statusLabel(c.status)}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text fw={600}>{c._count.modules}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Button
                                                size="xs"
                                                variant="light"
                                                color="violet"
                                                leftSection={<PencilLine size={14} />}
                                                onClick={() => navigate(AppRoutes.courseCreatorEdit(c.id))}
                                            >
                                                Редактировать
                                            </Button>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                )}
            </Paper>

            <Modal opened={createOpened} onClose={closeCreate} title="Новый курс" radius="lg" size="lg">
                <CourseCreateBuilder
                    onCancel={closeCreate}
                    onCreated={id => {
                        closeCreate()
                        navigate(AppRoutes.courseCreatorEdit(id))
                    }}
                />
            </Modal>
        </Stack>
    )
}

export default CourseCreatorHomeView
