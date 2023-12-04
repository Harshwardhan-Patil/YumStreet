import Footer from './Footer'
import { useSelector } from 'react-redux'
import { route, vendor } from '@/constants';
import { Link } from 'react-router-dom';
import UserDropDown from '../common/UserDropDown';
import Logo from '../common/Logo';

function HomeLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

function Navbar() {
    const { isAuth, role, id } = useSelector(state => state.auth);
    const { id: vendorId } = useSelector(state => state.vendor);

    return (
        <header>
            <nav className='flex justify-between  py-2 px-12 text-lg text-white bg-transparent w-full absolute top-0 h-28 z-50'>
                <div>
                    <Link to={route.HOME}><Logo /></Link>
                </div>
                <div>
                    <ul className='flex items-center gap-8'>
                        {!vendorId &&
                            <li className={navLink}><Link to={route.PARTNER_WITH_US}>Add Vendor</Link></li>
                        }
                        {
                            role === vendor && vendorId &&
                            <li className={navLink}><Link to={`${route.VENDOR_DASHBOARD}/${route.VENDOR_ORDER}`}>Dashboard</Link></li>
                        }
                        {!isAuth &&
                            <>
                                <li className={navLink}><Link to={route.REGISTER}>Register</Link></li>
                                <li className={navLink}><Link to={route.LOGIN}>Login</Link></li>
                            </>
                        }
                        {isAuth && <li>
                            <UserDropDown id={id} />
                        </li>}
                    </ul>
                </div>
            </nav>
        </header >
    )
}

const navLink = `
cursor-pointer
text-white
text-lg
`

export default HomeLayout