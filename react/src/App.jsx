// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/nav/SideBar.jsx";
import Header from "./components/nav/Header.jsx";
import Dashboard from "./views/Dashboard";
import Users from "./views/customers/Users.jsx";
import ListCustomers from "./views/customers/ListCustomers.jsx";
import {Outlet} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <div className="page-wrapper">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="users" element={<Users />}>
                            <Route index element={<Outlet />}> {/* Render Users component */}
                                <Route path="list-customers" element={<ListCustomers />} />
                            </Route>
                        </Route>

                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
