import { Button, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../app/router/AppRoutes'
import { logout as clearAuth } from '../../app/slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { useLogoutMutation } from '../../shared/api'

const Header = () => {
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
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <Text fw={600}>Codik Hackathon MVP</Text>
            <Group gap="md">
                <Text size="sm" c="dimmed">
                    {user?.fullName ?? 'Гость'}
                </Text>
                <Button variant="light" color="red" onClick={onLogout} loading={isLoading}>
                    Выйти
                </Button>
            </Group>
        </header>
    )
}

export default Header
