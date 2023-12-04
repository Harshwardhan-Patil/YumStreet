import VendorLayout from '@/components/Layout/VendorLayout';
import { route, vendor } from '@/constants';
import { SocketProvider } from '@/context/socketContext';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function VendorPrivateRoutes() {
    const { isAuth, role: userRole } = useSelector((state) => state.auth);
    const { id } = useSelector((state) => state.vendor);
    return isAuth && userRole === vendor && id
        ? <SocketProvider>
            <VendorLayout>
                <Outlet />
            </VendorLayout>
        </SocketProvider>
        : <Navigate to={route.VENDOR_LOGIN} />;
}

export default VendorPrivateRoutes;