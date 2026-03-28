import {
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    Divider,
    FileButton,
    Grid,
    Group,
    Paper,
    Skeleton,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { Mail, Shield, Sparkles, Upload, User } from 'lucide-react'
import { useEffect } from 'react'
import { UserRole, type Profile, type UserResponseDto } from '../../../entities'
import {
    useGetMeQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUploadMyAvatarMutation,
} from '../../../shared/api'
import dayjs from 'dayjs'

const roleMeta = (role: UserRole): { label: string; color: string; description: string } => {
    switch (role) {
        case UserRole.STUDENT:
            return {
                label: 'Ученик',
                color: 'violet',
                description: 'Проходишь курсы, копишь опыт и открываешь новые темы.',
            }
        case UserRole.COURSE_CREATOR:
            return {
                label: 'Автор курсов',
                color: 'grape',
                description: 'Создаёшь модули, уроки и отправляешь курсы на модерацию.',
            }
        case UserRole.PARENT:
            return {
                label: 'Родитель',
                color: 'blue',
                description: 'Следишь за прогрессом детей на главной и в этом профиле.',
            }
        case UserRole.ADMIN:
            return {
                label: 'Администратор',
                color: 'red',
                description: 'Модерация пользователей и учебных материалов.',
            }
        default:
            return { label: String(role), color: 'gray', description: '' }
    }
}

const buildFormValues = (profile: Profile | undefined, me: UserResponseDto | undefined) => ({
    fullName: profile?.fullName ?? me?.fullName ?? '',
    bio: profile?.bio ?? '',
    phone: profile?.phone ?? '',
    city: profile?.city ?? '',
    birthDate: profile?.birthDate ?? '',
})

const UserProfileContent = () => {
    const meQuery = useGetMeQuery()
    const profileQuery = useGetProfileQuery()
    const [updateProfile, { isLoading: saving }] = useUpdateProfileMutation()
    const [uploadAvatar, { isLoading: uploading }] = useUploadMyAvatarMutation()

    const form = useForm({
        initialValues: buildFormValues(undefined, meQuery.data),
        validate: {
            fullName: (v: string) => (v.trim().length < 2 ? 'Минимум 2 символа' : null),
        },
    })

    useEffect(() => {
        if (!meQuery.data) return
        form.setValues(buildFormValues(profileQuery.data, meQuery.data))
    }, [profileQuery.data, meQuery.data])

    if (meQuery.isLoading) {
        return (
            <Stack gap="md">
                <Skeleton height={160} radius="xl" />
                <Skeleton height={220} radius="xl" />
            </Stack>
        )
    }

    if (meQuery.isError || !meQuery.data) {
        return <Alert color="red">Не удалось загрузить данные аккаунта.</Alert>
    }

    const user = meQuery.data
    const meta = roleMeta(user.role)

    const initials =
        user.fullName
            ?.split(/\s+/)
            .filter(Boolean)
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase() || 'Я'

    const onSaveProfile = form.onSubmit(async values => {
        if (profileQuery.isError) return
        await updateProfile({
            fullName: values.fullName.trim(),
            bio: values.bio.trim() || null,
            phone: values.phone.trim() || null,
            city: values.city.trim() || null,
            birthDate: values.birthDate.trim() || null,
        }).unwrap()
    })

    return (
        <Stack gap="lg">
            {profileQuery.isError && (
                <Alert color="yellow" title="Расширенный профиль">
                    Не удалось загрузить поля профиля с сервера. Имя и фото доступны из аккаунта; расширенные поля
                    заработают, когда будет доступен метод профиля.
                </Alert>
            )}

            <Paper
                radius="xl"
                p={{ base: 'md', sm: 'xl' }}
                style={{
                    background:
                        'linear-gradient(135deg, hsl(263 55% 97%) 0%, hsl(220 60% 96%) 45%, hsl(190 55% 96%) 100%)',
                    border: '2px solid hsl(263 40% 88%)',
                }}
            >
                <Grid gutter="lg" align="center">
                    <Grid.Col span={{ base: 12, sm: 'auto' }}>
                        <Stack gap="md" align="center">
                            <Avatar
                                src={user.avatarUrl ?? undefined}
                                size={100}
                                radius="xl"
                                color="violet"
                                variant={user.avatarUrl ? 'filled' : 'light'}
                                styles={{ placeholder: { fontSize: '2rem', fontWeight: 800 } }}
                            >
                                {initials}
                            </Avatar>
                            <FileButton onChange={file => file && uploadAvatar(file)} accept="image/png,image/jpeg,image/webp">
                                {props => (
                                    <Button
                                        {...props}
                                        variant="light"
                                        size="xs"
                                        radius="xl"
                                        leftSection={<Upload size={14} />}
                                        loading={uploading}
                                    >
                                        Сменить фото
                                    </Button>
                                )}
                            </FileButton>
                            <Text size="xs" c="dimmed" ta="center" maw={200}>
                                Фото сохраняется в сервисе авторизации и подтягивается везде, где показывается ваш аккаунт.
                            </Text>
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 'auto' }} style={{ flex: 1 }}>
                        <Stack gap="sm">
                            <Group gap="sm" wrap="wrap">
                                <Title order={2}>{user.fullName ?? 'Профиль'}</Title>
                                <Badge
                                    size="lg"
                                    variant="filled"
                                    color={meta.color}
                                    tt="none"
                                    leftSection={<Sparkles size={14} />}
                                >
                                    {meta.label}
                                </Badge>
                            </Group>
                            <Text c="dimmed" size="sm">
                                {meta.description}
                            </Text>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Paper>

            <Card
                withBorder
                radius="xl"
                padding="lg"
                shadow="sm"
                component="form"
                onSubmit={onSaveProfile}
                style={{ opacity: profileQuery.isError ? 0.65 : 1 }}
            >
                <Group mb="md" gap="sm">
                    <ThemeIcon variant="light" color="violet" radius="md" size="lg">
                        <User size={20} />
                    </ThemeIcon>
                    <Title order={4}>Данные профиля</Title>
                </Group>
                <Divider mb="md" />
                <Stack gap="md">
                    <TextInput label="Имя и фамилия" {...form.getInputProps('fullName')} />
                    <TextInput
                        label="Телефон"
                        placeholder="+7 …"
                        {...form.getInputProps('phone')}
                    />
                    <TextInput label="Город" {...form.getInputProps('city')} />
                    <TextInput
                        label="Дата рождения"
                        placeholder="ГГГГ-ММ-ДД"
                        {...form.getInputProps('birthDate')}
                    />
                    <TextInput
                        label="О себе"
                        placeholder="Несколько слов для всех ролей: интересы, цели обучения…"
                        {...form.getInputProps('bio')}
                    />
                    <Group justify="flex-end">
                        <Button
                            type="submit"
                            disabled={profileQuery.isError}
                            loading={saving || profileQuery.isFetching}
                            radius="xl"
                            color="violet"
                        >
                            Сохранить
                        </Button>
                    </Group>
                </Stack>
            </Card>

            <Card withBorder radius="xl" padding="lg" shadow="sm">
                <Group mb="md" gap="sm">
                    <ThemeIcon variant="light" color="gray" radius="md" size="lg">
                        <Mail size={20} />
                    </ThemeIcon>
                    <Title order={4}>Аккаунт</Title>
                </Group>
                <Divider mb="md" />
                <Stack gap="md">
                    <Group wrap="nowrap" gap="md">
                        <ThemeIcon variant="light" color="gray" radius="md">
                            <Mail size={18} />
                        </ThemeIcon>
                        <div>
                            <Text size="xs" c="dimmed" fw={600} tt="uppercase">
                                Email
                            </Text>
                            <Text fw={600}>{user.email}</Text>
                            <Text size="xs" c="dimmed" mt={4}>
                                Смена email обычно доступна только через поддержку или отдельный поток безопасности.
                            </Text>
                        </div>
                    </Group>
                    <Group wrap="nowrap" gap="md">
                        <ThemeIcon variant="light" color="gray" radius="md">
                            <Shield size={18} />
                        </ThemeIcon>
                        <div>
                            <Text size="xs" c="dimmed" fw={600} tt="uppercase">
                                Роль
                            </Text>
                            <Text fw={600}>{meta.label}</Text>
                        </div>
                    </Group>
                    {(user.createdAt || user.updatedAt) && (
                        <Text size="sm" c="dimmed">
                            {user.createdAt && `На платформе с ${dayjs(user.createdAt).format('D MMMM YYYY')}`}
                            {user.updatedAt && user.createdAt !== user.updatedAt && (
                                <span> · обновлено {dayjs(user.updatedAt).format('D.MM.YYYY')}</span>
                            )}
                        </Text>
                    )}
                </Stack>
            </Card>
        </Stack>
    )
}

export default UserProfileContent
