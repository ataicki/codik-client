import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";

export const ProtectedRoute = () => {
    const hasAuthData = false; //проверка на наличие данных авторизации

    if (!hasAuthData) {
        return <Navigate to={AppRoutes.LOGIN} replace />;
    }

    return <Outlet />;
};
