// DefaultLayout.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "./nav/SideBar";
import Header from "./nav/Header";

const DefaultLayout = () => {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
            <aside>
                <SideBar />
            </aside>
            <div className="body-wrapper">
                <Header />
                <main className="container-fluid">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
