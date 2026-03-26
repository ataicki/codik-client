import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {RoleRoute} from "./RoleRoute";

import {AppRoutes} from "./AppRoutes";
import AppLayout from "../../widgets/layouts/AppLayout";

import {LoginPage} from "../../pages/login";
import {RegisterPage} from "../../pages/register";
import {HomePage} from "../../pages/home";
import {AdminPage} from "../../pages/admin";
import {UserRole} from "../../entities";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={AppRoutes.LOGIN} element={<LoginPage/>}/>
                <Route path={AppRoutes.REGISTER} element={<RegisterPage/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route element={<AppLayout/>}>

                        <Route path={AppRoutes.HOME} element={<HomePage/>}/>

                        <Route element={<RoleRoute role={UserRole.Admin}/>}>
                            <Route path={AppRoutes.ADMIN} element={<AdminPage/>}/>
                        </Route>

                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={AppRoutes.HOME} replace/>}/>

            </Routes>
        </BrowserRouter>
    );
};
