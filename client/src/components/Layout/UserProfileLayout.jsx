import { Link, useLocation, useParams } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { cn } from "@/lib/utils";
import UserProfile from "../common/UserProfile";
import { sidebarLink } from "@/styles/sidebar";
import { route } from "@/constants";

function UserProfileLayout({ children }) {
    const params = useParams();
    const location = useLocation().pathname.split('/')[3];

    return (
        <>
            <UserProfile />
            <section className='m-section flex'>
                <Sidebar.Left>
                    <Link to={`/user/${params.username}/${route.USER_REVIEWS}`}
                        className={cn(sidebarLink.common, sidebarLink.first, `${location === route.USER_REVIEWS ? sidebarLink.active : null}`)}
                    >
                        Reviews
                    </Link>
                    <Link to={`/user/${params.username}/${route.USER_ORDER_HISTORY}`}
                        className={cn(sidebarLink.common, `${location === route.USER_ORDER_HISTORY ? sidebarLink.active : null}`)}
                    >
                        Order History
                    </Link>
                    <Link to={`/user/${params.username}/${route.USER_ADDRESS}`}
                        className={cn(sidebarLink.common, sidebarLink.last, `${location === route.USER_ADDRESS ? sidebarLink.active : null}`)}
                    >
                        Address
                    </Link>
                </Sidebar.Left>
                <Sidebar.Right>
                    {children}
                </Sidebar.Right>
            </section>
        </>
    )
}

export default UserProfileLayout