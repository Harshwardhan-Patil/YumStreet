import UserLayout from '@/components/Layout/UserLayout';
import VendorLayout from '@/components/Layout/VendorLayout';
import { user, vendor } from '@/constants';
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes({ role }) {
    const { isAuth, role: userRole } = useSelector((state) => state.auth);

    if (isAuth && userRole === user) {
        return isAuth && userRole === user ? <UserLayout><Outlet /></UserLayout> : <Navigate to='/login' />;
    }

    if (isAuth && userRole === vendor) {
        return isAuth && userRole === user ? <VendorLayout><Outlet /></VendorLayout> : <Navigate to='/login' />;
    }
    return <Navigate to='/login' />;
}

export default PrivateRoutes;