import UserLayout from '@/components/Layout/UserLayout'
import VendorProfile from '@/components/StreetVendors/VendorProfile'
import { Outlet, useParams, Link, useLocation } from 'react-router-dom'
import useScrollTop from '@/hooks/useScrollTop';
import { sidebarLink } from '@/styles/sidebar';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/common/Sidebar';



function VendorProfileRoute() {
    const params = useParams();
    const location = useLocation().pathname.split('/')[3];
    useScrollTop();

    return (
        <UserLayout>
            <VendorProfile />
            <section className='m-section flex'>
                <Sidebar.Left>
                    <Link to={`/${params.city}/${params.vendorName}/menu`}
                        className={cn(sidebarLink, `${location === 'menu' ? 'bg-neutral-200' : null}`)}
                    >
                        Menu
                    </Link>
                    <Link to={`/${params.city}/${params.vendorName}/reviews`}
                        className={cn(sidebarLink, `${location === 'reviews' ? 'bg-neutral-200' : null}`)}
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