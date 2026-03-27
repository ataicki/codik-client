import { NavLink, Stack, Text } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { AppRoutes } from '../../app/router/AppRoutes'
import { useAppSelector } from '../../app/store/hooks'
import { UserRole } from '../../entities'

const Sidebar = () => {
    const location = useLocation()
    const role = useAppSelector(state => state.auth.user?.role)

    return (
        <aside className="border-r border-border bg-card p-4">
            <Text fw={700} mb="md">Навигация</Text>

            <Stack gap={6}>
                <NavLink
                    label="Главная"
                    component={Link}
                    to={AppRoutes.HOME}
                    active={location.pathname === AppRoutes.HOME}
                />

                {role === UserRole.Parent && (
                    <NavLink
                        label="Профиль родителя"
                        component={Link}
                        to={AppRoutes.PROFILE_PARENT}
                        active={location.pathname === AppRoutes.PROFILE_PARENT}
                    />
                )}

                {role === UserRole.Admin && (
                    <NavLink
                        label="Админ панель"
                        component={Link}
                        to={AppRoutes.ADMIN}
                        active={location.pathname === AppRoutes.ADMIN}
                    />
                )}
            </Stack>
        </aside>
    )
}

export default Sidebar
