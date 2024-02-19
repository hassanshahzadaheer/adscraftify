import React from "react";
import {Link} from "react-router-dom";
import Logo from "./logo";

export default function SideBar() {
    return (
        <aside className="left-sidebar">
            {/* Sidebar scroll*/}
            <div>
                <Logo/>
                {/* Sidebar navigation*/}
                <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                    <ul id="sidebarnav">
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Home</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/dashboard" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-layout-dashboard"></i>
                </span>
                                <span className="hide-menu">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-small-cap">
                            <i className="ti ti-dots nav-small-cap-icon fs-4"></i>
                            <span className="hide-menu">Customers</span>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/users" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-user"></i>
                </span>
                                <span className="hide-menu">Users</span>
                            </Link>
                            <Link to="/list-customers" className="sidebar-link" aria-expanded="false">
    <span>
        <i className="ti ti-user"></i>
    </span>
                                <span className="hide-menu">List Customers</span>
                            </Link>

                        </li>
                        <li className="sidebar-item">
                            <Link to="/websites" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-world"></i>
                </span>
                                <span className="hide-menu">Websites</span>
                            </Link>
                            <Link to="/list-websites" className="sidebar-link" aria-expanded="false">
    <span>
        <i className="ti ti-user"></i>
    </span>
                                <span className="hide-menu">List Websites</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/reports" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-pie-chart"></i>
                </span>
                                <span className="hide-menu">Reports</span>
                            </Link>
                            <Link to="/list-reports" className="sidebar-link" aria-expanded="false">
    <span>
        <i className="ti ti-user"></i>
    </span>
                                <span className="hide-menu">List Reports</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/invoice" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-file"></i>
                </span>
                                <span className="hide-menu">Invoices</span>
                            </Link>
                        </li>
                        <li className="sidebar-item">
                            <Link to="/account-info" className="sidebar-link" aria-expanded="false">
                <span>
                  <i className="ti ti-settings"></i>
                </span>
                                <span className="hide-menu">Account Info</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* End Sidebar navigation */}
            </div>
            {/* End Sidebar scroll*/}
        </aside>
    );
}
