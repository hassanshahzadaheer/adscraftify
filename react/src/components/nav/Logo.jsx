import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Logo() {
    return (
        <div className="brand-logo d-flex align-items-center justify-content-between">
            <Link to="/" className="text-nowrap logo-img">
                {/* Adjust the link destination as needed */}
                <img
                    src="/images/logos/dark-logo.svg"
                    width="180"
                    alt=""
                />
            </Link>
            <div
                className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
                id="sidebarCollapse"
            >
                <i className="ti ti-x fs-8"></i>
            </div>
        </div>
    );
}
