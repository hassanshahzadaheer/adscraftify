import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Login from './views/Login'
import SignUp from "./views/SignUp";
import NotFound from "./views/NotFound";
import Users from "./views/customers/Users.jsx";
import ListCustomers from "./views/customers/ListCustomers.jsx";
import Website from './views/Website';
import Reports from './views/Reports';
import Invoice from './views/Invoice';
import AccountInfo from './views/AccountInfo';
import DefaultLayout from "./components/DefaultLayout"
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },

            {
                path:'/list-customers',
                element: <ListCustomers />,

            },
            {
                path: '/websites',
                element: <Website />,
            },
            {
                path: '/reports',
                element: <Reports />,
            },
            {
                path: '/invoice',
                element: <Invoice />,
            },
            {
                path: '/account-info',
                element: <AccountInfo />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
];


const router = createBrowserRouter(routes);
export default router;
