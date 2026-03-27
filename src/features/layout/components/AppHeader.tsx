import { Avatar, Button, Group, Paper, Text } from '@mantine/core'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../app/router/AppRoutes'
import { logout as clearAuth } from '../../../app/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks'
import { useLogoutMutation } from '../../../shared/api'

const AppHeader = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.auth.user)
    const [logout, { isLoading }] = useLogoutMutation()

    const onLogout = async () => {
        try {
            await logout().unwrap()
        } finally {
            dispatch(clearAuth())
            navigate(AppRoutes.LOGIN)
        }
    }

    return (
        <Paper h="100%" px="md" withBorder shadow="xs" radius={0}>
            <Group h="100%" justify="space-between">
                <Text fw={700}>Codik Platform</Text>
                <Group gap="sm">
                    <Avatar radius="xl" color="violet">
                        {(user?.fullName ?? 'U').charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                        <Text size="sm" fw={600}>{user?.fullName ?? 'Пользователь'}</Text>
                        <Text size="xs" c="dimmed">{user?.email ?? ''}</Text>
                    </div>
                    <Button
                        variant="light"
                        color="red"
                        leftSection={<LogOut size={16} />}
                        onClick={onLogout}
                        loading={isLoading}
                    >
                        Выйти
                    </Button>
                </Group>
            </Group>
        </Paper>
    )
}

export default AppHeader
