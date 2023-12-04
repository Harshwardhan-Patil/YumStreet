import UserLayout from '@/components/Layout/UserLayout';
import { user, vendor } from '@/constants';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function UserPrivateRoutes() {
    const { isAuth, role: userRole } = useSelector((state) => state.auth);
    return isAuth && (userRole === vendor || userRole === user)
        ? <UserLayout><Outlet /></UserLayout>
        : <Navigate to='/login' />;
}

export default UserPrivateRoutes;