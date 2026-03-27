import { AppShell, Skeleton } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../app/store/hooks'
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'

const AppShellLayout = () => {
    const { isInitialized } = useAppSelector(state => state.auth)

    return (
        <AppShell
            header={{ height: 72 }}
            navbar={{ width: 280, breakpoint: 'sm' }}
            padding="lg"
        >
            <AppShell.Header>
                <AppHeader />
            </AppShell.Header>

            <AppShell.Navbar>
                <AppSidebar />
            </AppShell.Navbar>

            <AppShell.Main>
                {!isInitialized ? (
                    <>
                        <Skeleton height={110} radius="xl" mb="md" />
                        <Skeleton height={130} radius="xl" />
                    </>
                ) : (
                    <Outlet />
                )}
            </AppShell.Main>
        </AppShell>
    )
}

export default AppShellLayout
