/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import Layout from "components/Layout";

const Login = lazy(() => import('./screens/login'));
const Register = lazy(() => import('./screens/register'));
const Home = lazy(() => import('./screens/home'));
const NotFound404 = lazy(() => import('./screens/NotFound404'));

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = localStorage.getItem('token') || false

    if (!isAuth) {
        return <Navigate to={'/auth/login'} />;
    } else {
        return <>{children} </>;
    }
};

const ProtectedRouteAuth: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = localStorage.getItem('token') || false
    if (isAuth) {
        return <Navigate to={'/'} />;
    }
    return <>{children} </>;
};


const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute>
            <Layout />
        </ProtectedRoute>,
        errorElement: <NotFound404 />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
        ],
    },
    {
        path: "/auth",
        element: <ProtectedRouteAuth> <Outlet /> </ProtectedRouteAuth>,
        errorElement: <NotFound404 />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

export default router;
