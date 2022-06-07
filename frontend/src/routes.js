import React from "react";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import Signup from "./containers/SignUp";
import Reklam from "./containers/Reklam";
import CompanyProfile from "./containers/CompanyProfile";
import ClientProfile from "./containers/ClientProfile";
import Cart from "./containers/Cart";
import Pay from "./containers/Pay";

export const mainRoutes = [
    {
        path: "/reset-password",
        exact: true,
        comp: <ResetPassword />,
    },
    {
        path: "/reklam",
        exact: true,
        comp: <Reklam />,
    },

    {
        path: "/",
        exact: true,
        comp: <Home />,
    },
];

export const authRoutes = [
    {
        path: "/signup",
        comp: <Signup />,
    },
    {
        path: "/login",
        comp: <Login />,
    },
];

export const companyRoutes = [
    {
        path: "/company-profile",
        comp: <CompanyProfile />,
    },
];
export const clientRoutes = [
    {
        path: "/cart",
        exact: true,
        comp: <Cart />,
    },
    {
        path: "/client-profile",
        comp: <ClientProfile />,
    },
];

export const noLayout = [
    {
        path: "/pay/:feature_id/",
        comp: <Pay />,
    },
];
