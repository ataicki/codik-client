import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {RoleRoute} from "./RoleRoute";

import {AppRoutes} from "./AppRoutes";
import {LoginPage} from "../../pages/login";
import {RegisterPage} from "../../pages/register";
import {HomePage} from "../../pages/home";
import {AdminPage} from "../../pages/admin";
import {ProfilePage} from "../../pages/profile";
import {UserRole} from "../../entities";
import {AppShellLayout} from "../../widgets";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={AppRoutes.LOGIN} element={<LoginPage/>}/>
                <Route path={AppRoutes.REGISTER} element={<RegisterPage/>}/>

                <Route element={<ProtectedRoute/>}>
                    <Route element={<AppShellLayout/>}>

                        <Route path={AppRoutes.HOME} element={<HomePage/>}/>
                        <Route path={AppRoutes.PROFILE} element={<ProfilePage/>}/>

                        <Route element={<RoleRoute role={UserRole.PARENT}/>}>
                            <Route path={AppRoutes.PROFILE_PARENT} element={<ProfilePage/>}/>
                        </Route>

                        <Route element={<RoleRoute role={UserRole.ADMIN}/>}>
                            <Route path={AppRoutes.ADMIN} element={<AdminPage/>}/>
                        </Route>

                    </Route>
                </Route>

                <Route path="*" element={<Navigate to={AppRoutes.HOME} replace/>}/>
            </Routes>
        </BrowserRouter>
    );
};
