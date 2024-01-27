import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
export default function GuestLayout() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div
            className="page-wrapper"
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
            data-sidebar-position="fixed"
            data-header-position="fixed"
        >
            <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className="row justify-content-center w-100">
                        <div className="col-md-8 col-lg-6 col-xxl-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <Link
                                        to="./index.html"
                                        className="text-nowrap logo-img text-center d-block py-3 w-100"
                                    >
                                        <img
                                            src="../../public/images/logos/dark-logo.svg"
                                            width="180"
                                            alt=""
                                        />
                                    </Link>
                                    <p className="text-center">
                                        Your Social Campaigns
                                    </p>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
