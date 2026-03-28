import { useMemo, useState } from 'react'
import {
    Accordion,
    Alert,
    Badge,
    Button,
    Drawer,
    Group,
    Image,
    Paper,
    ScrollArea,
    Skeleton,
    Stack,
    Table,
    Text,
    Title,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Check, Eye, Shield, X } from 'lucide-react'
import type { CourseDetail, CourseListItem, CourseStatus } from '../../../entities'
import {
    useApproveCourseMutation,
    useGetCourseByIdQuery,
    useGetPendingCoursesQuery,
    useRejectCourseMutation,
} from '../../../shared/api'

const statusLabel = (s: CourseStatus) =>
    s === 'PENDING_MODERATION' ? 'На модерации' : s === 'PUBLISHED' ? 'Опубликован' : s === 'REJECTED' ? 'Отклонён' : s

const AdminModerationContent = () => {
    const { data: pending, isLoading, isError, refetch } = useGetPendingCoursesQuery()
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false)

    const { data: courseDetail, isFetching: isLoadingCourse } = useGetCourseByIdQuery(selectedId ?? '', {
        skip: !selectedId,
    })

    const [approve, { isLoading: approving }] = useApproveCourseMutation()
    const [reject, { isLoading: rejecting }] = useRejectCourseMutation()

    const rows = pending ?? []

    const openCourse = (id: string) => {
        setSelectedId(id)
        openDrawer()
    }

    const handleApprove = async (id: string) => {
        await approve(id).unwrap()
        refetch()
        if (selectedId === id) closeDrawer()
    }

    const handleReject = async (id: string) => {
        await reject(id).unwrap()
        refetch()
        if (selectedId === id) closeDrawer()
    }

    const sortedModules = useMemo(() => {
        if (!courseDetail) return []
        return [...courseDetail.modules].sort((a, b) => a.order - b.order)
    }, [courseDetail])

    return (
        <Stack gap="lg">
            <Paper
                radius="xl"
                p={{ base: 'md', sm: 'lg' }}
                style={{
                    background:
                        'linear-gradient(125deg, hsl(0 70% 98%) 0%, hsl(280 40% 97%) 50%, hsl(220 50% 97%) 100%)',
                    border: '2px solid hsl(0 50% 88%)',
                }}
            >
                <Group gap="md">
                    <Shield size={32} color="var(--mantine-color-red-6)" />
                    <div>
                        <Title order={3}>Модерация курсов</Title>
                        <Text c="dimmed" size="sm">
                            Курсы со статусом «На модерации». Откройте карточку, проверьте структуру и примите решение.
                        </Text>
                    </div>
                </Group>
            </Paper>

            {isLoading && (
                <Stack gap="sm">
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                </Stack>
            )}

            {isError && (
                <Alert color="red" title="Ошибка загрузки">
                    Не удалось получить список курсов.
                    <Button variant="light" mt="sm" onClick={() => refetch()}>
                        Повторить
                    </Button>
                </Alert>
            )}

            {!isLoading && !isError && rows.length === 0 && (
                <Paper p="xl" radius="xl" withBorder>
                    <Text ta="center" c="dimmed" fw={600}>
                        Нет курсов, ожидающих модерации.
                    </Text>
                </Paper>
            )}

            {!isLoading && !isError && rows.length > 0 && (
                <Paper withBorder radius="xl" p={0} style={{ overflow: 'hidden' }}>
                    <ScrollArea>
                        <Table striped highlightOnHover verticalSpacing="sm">
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Курс</Table.Th>
                                    <Table.Th>Автор</Table.Th>
                                    <Table.Th>Статус</Table.Th>
                                    <Table.Th>Модули</Table.Th>
                                    <Table.Th style={{ width: 280 }} />
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows.map((c: CourseListItem) => (
                                    <Table.Tr key={c.id}>
                                        <Table.Td>
                                            <Group gap="sm" wrap="nowrap">
                                                {c.image?.url ? (
                                                    <Image src={c.image.url} w={48} h={36} radius="sm" fit="cover" />
                                                ) : (
                                                    <Paper w={48} h={36} radius="sm" bg="gray.2" />
                                                )}
                                                <Stack gap={2}>
                                                    <Text fw={700} size="sm">
                                                        {c.title}
                                                    </Text>
                                                    <Text size="xs" c="dimmed" lineClamp={2}>
                                                        {c.description}
                                                    </Text>
                                                </Stack>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td>
                                            <Text size="sm">{c.courseCreator?.fullName ?? '—'}</Text>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color="yellow" variant="light" tt="none">
                                                {statusLabel(c.status)}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td>{c._count.modules}</Table.Td>
                                        <Table.Td>
                                            <Group gap="xs" wrap="nowrap">
                                                <Button
                                                    size="xs"
                                                    variant="light"
                                                    leftSection={<Eye size={14} />}
                                                    onClick={() => openCourse(c.id)}
                                                >
                                                    Просмотр
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    color="green"
                                                    variant="light"
                                                    leftSection={<Check size={14} />}
                                                    loading={approving}
                                                    onClick={() => handleApprove(c.id)}
                                                >
                                                    Одобрить
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    color="red"
                                                    variant="light"
                                                    leftSection={<X size={14} />}
                                                    loading={rejecting}
                                                    onClick={() => handleReject(c.id)}
                                                >
                                                    Отклонить
                                                </Button>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Paper>
            )}

            <Drawer
                opened={drawerOpened}
                onClose={() => {
                    closeDrawer()
                    setSelectedId(null)
                }}
                title={courseDetail?.title ?? 'Курс'}
                position="right"
                size="xl"
            >
                <ScrollArea h="calc(100vh - 120px)" type="auto">
                    {isLoadingCourse && <Skeleton height={200} />}
                    {!isLoadingCourse && courseDetail && (
                        <CoursePreview course={courseDetail} modules={sortedModules} />
                    )}
                </ScrollArea>
                {selectedId && courseDetail && (
                    <Group mt="xl" justify="flex-end">
                        <Button
                            color="green"
                            leftSection={<Check size={18} />}
                            loading={approving}
                            onClick={() => handleApprove(selectedId)}
                        >
                            Одобрить
                        </Button>
                        <Button
                            color="red"
                            variant="light"
                            leftSection={<X size={18} />}
                            loading={rejecting}
                            onClick={() => handleReject(selectedId)}
                        >
                            Отклонить
                        </Button>
                    </Group>
                )}
            </Drawer>
        </Stack>
    )
}

const CoursePreview = ({ course, modules }: { course: CourseDetail; modules: CourseDetail['modules'] }) => (
    <Stack gap="md">
        <Text c="dimmed" size="sm">
            {course.description}
        </Text>
        <Badge w="fit-content" variant="outline" tt="none">
            Модулей: {modules.length}
        </Badge>
        <Accordion variant="separated" radius="md">
            {modules.map(mod => (
                <Accordion.Item key={mod.id} value={mod.id}>
                    <Accordion.Control>
                        <Text fw={700}>
                            {mod.title}{' '}
                            <Text span c="dimmed" size="xs" fw={500}>
                                ({mod.steps.length} шаг.)
                            </Text>
                        </Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Stack gap={6}>
                            {[...mod.steps]
                                .sort((a, b) => a.order - b.order)
                                .map(step => (
                                    <Paper key={step.id} withBorder p="xs" radius="md">
                                        <Group justify="space-between">
                                            <Text size="sm" fw={600}>
                                                {step.type === 'LESSON' && step.lesson?.title
                                                    ? step.lesson.title
                                                    : step.type === 'TEST' && step.test?.title
                                                      ? step.test.title
                                                      : `Шаг (${step.type})`}
                                            </Text>
                                            <Badge size="sm" variant="dot" tt="none">
                                                {step.type}
                                            </Badge>
                                        </Group>
                                    </Paper>
                                ))}
                        </Stack>
                    </Accordion.Panel>
                </Accordion.Item>
            ))}
        </Accordion>
    </Stack>
)

export default AdminModerationContent
