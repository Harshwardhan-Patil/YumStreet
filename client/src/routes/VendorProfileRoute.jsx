import UserLayout from '@/components/Layout/UserLayout'
import VendorProfile from '@/components/StreetVendors/VendorProfile'
import { Outlet, useParams, Link, useLocation } from 'react-router-dom'
import useScrollTop from '@/hooks/useScrollTop';
import { sidebarLink } from '@/styles/sidebar';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/common/Sidebar';
import { route } from '@/constants';



function VendorProfileRoute() {
    const params = useParams();
    const location = useLocation().pathname.split('/')[3];
    useScrollTop();

    return (
        <UserLayout>
            <VendorProfile />
            <section className='m-section flex'>
                <Sidebar.Left>
                    <Link to={`/${params.city}/${params.vendorId}/${route.VIEW_VENDOR_MENU}`}
                        className={cn(sidebarLink.common, sidebarLink.first, `${location === route.VIEW_VENDOR_MENU ? sidebarLink.active : null}`)}
                    >
                        Menu
                    </Link>
                    <Link to={`/${params.city}/${params.vendorId}/${route.VIEW_VENDOR_REVIEWS}`}
                        className={cn(sidebarLink.common, `${location === route.VIEW_VENDOR_REVIEWS ? sidebarLink.active : null}`)}
                    >
                        Reviews
                    </Link>
                </Sidebar.Left>
                <Sidebar.Right>
                    <Outlet />
                </Sidebar.Right>
            </section>
        </UserLayout>
    )
}







export default VendorProfileRoute