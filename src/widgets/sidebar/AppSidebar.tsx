import { NavLink, ScrollArea, Stack, Text } from '@mantine/core'
import { Home, Shield, UserCircle2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {useAppSelector} from "../../app/store/hooks.ts";
import {AppRoutes} from "../../app/router/AppRoutes.ts";
import {UserRole} from "../../entities";

const AppSidebar = () => {
    const location = useLocation()
    const role = useAppSelector(state => state.auth.user?.role)

    return (
        <ScrollArea h="100%" px="sm" py="md">
            <Text fw={700} mb="sm" px="sm">Меню</Text>
            <Stack gap={6}>
                <NavLink
                    label="Главная"
                    leftSection={<Home size={16} />}
                    component={Link}
                    to={AppRoutes.HOME}
                    active={location.pathname === AppRoutes.HOME}
                />
                <NavLink
                    label="Профиль"
                    leftSection={<UserCircle2 size={16} />}
                    component={Link}
                    to={AppRoutes.PROFILE}
                    active={location.pathname === AppRoutes.PROFILE}
                />
                {role === UserRole.ADMIN && (
                    <NavLink
                        label="Админ панель"
                        leftSection={<Shield size={16} />}
                        component={Link}
                        to={AppRoutes.ADMIN}
                        active={location.pathname === AppRoutes.ADMIN}
                    />
                )}
            </Stack>
        </ScrollArea>
    )
}

export default AppSidebar
