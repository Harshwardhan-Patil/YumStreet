import { route, user, vendor } from '@/constants';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PublicRoutes({ role }) {
    const { isAuth, role: userRole } = useSelector((state) => state.auth);
    if (isAuth && role === user) {
        return isAuth ? <Navigate to={route.HOME} /> : <Navigate to={route.LOGIN} />;
    }

    if (isAuth && role === vendor) {
        return isAuth ? <Navigate to={route.HOME} /> : <Navigate to={route.LOGIN} />;
    }

    return <Outlet />;
}

export default PublicRoutes;