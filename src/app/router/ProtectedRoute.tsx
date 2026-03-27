import { Navigate, Outlet } from "react-router-dom";
import { Skeleton, Stack } from "@mantine/core";
import { AppRoutes } from "./AppRoutes";
import { useAppSelector } from "../store/hooks";

export const ProtectedRoute = () => {
    const { isAuthenticated, isInitialized } = useAppSelector(state => state.auth);

    if (!isInitialized) {
        return (
            <Stack p="lg">
                <Skeleton height={72} radius="xl" />
                <Skeleton height={120} radius="xl" />
            </Stack>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={AppRoutes.LOGIN} replace />;
    }

    return <Outlet />;
};
