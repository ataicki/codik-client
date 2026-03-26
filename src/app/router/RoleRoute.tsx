import { Navigate, Outlet } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import {UserRole} from "../../entities";

export const RoleRoute = ({ role }: { role: UserRole }) => {
    const userRole = 'admin'; //брать из инфы о юзере

    if (userRole !== role) {
        return <Navigate to={AppRoutes.HOME} replace />;
    }

    return <Outlet />;
};
