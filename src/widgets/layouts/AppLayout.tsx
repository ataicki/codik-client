import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar.tsx";
import Header from "../header/Header.tsx";

const AppLayout = () => {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Header />

                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AppLayout;
