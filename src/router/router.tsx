import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import Register from "../page/Register";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";



export const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    }



])