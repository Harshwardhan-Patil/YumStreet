import { route, user, vendor } from '@/constants';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';


function PublicRoutes({ role }) {
    const { isAuth } = useSelector((state) => state.auth);
    if (isAuth && role === user) {
        return isAuth ? <Navigate to={route.HOME} /> : <Navigate to={route.LOGIN} />;
    }

    // Todo: Add vendor dashboard here instead of HOME
    if (isAuth && role === vendor) {
        return isAuth ? <Navigate to={route.HOME} /> : <Navigate to={route.PARTNER_WITH_US} />;
    }

    return <Outlet />;
}

export default PublicRoutes;