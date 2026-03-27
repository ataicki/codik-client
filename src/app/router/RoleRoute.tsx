import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import {UserRole} from "../../entities";
import { useAppSelector } from "../store/hooks";

export const RoleRoute = ({ role }: { role: UserRole }) => {
    const userRole = useAppSelector(state => state.auth.user?.role);

    if (userRole !== role) {
        return <Navigate to={AppRoutes.HOME} replace />;
    }

    return <Outlet />;
};
