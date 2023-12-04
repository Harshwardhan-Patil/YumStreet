import Footer from './Footer'
import { useSelector } from 'react-redux'
import SearchVendors from '../Search/SearchVendors';
import { route } from '@/constants';
import { Link, useResolvedPath } from 'react-router-dom';
import UserDropDown from '../common/UserDropDown';
import { ShoppingCart } from 'lucide-react';
import Logo from '../common/Logo';

const hideFrom = ['/checkout'];

function UserLayout({ children }) {
    const path = useResolvedPath();
    return (
        <div>
            <Navbar hide={hideFrom.includes(path.pathname)} />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}

function Navbar({ hide }) {
    const { isAuth, id } = useSelector(state => state.auth);
    return (
        <header>
            <nav className='relative flex justify-between items-center py-2 px-12 text-xl bg-transparent w-full'>
                <div>
                    <Link to={'/'} className='font-bold text-primary'><Logo /></Link>
                </div>
                <div>
                    {!hide && <SearchVendors className={'shadow-md py-1'} />}
                </div>
                <div>
                    <ul className='flex items-center font-medium  gap-4'>

                        {!isAuth &&
                            <>
                                <li className={navLink}><Link to={route.SIGNUP}>SignUp</Link></li>
                                <li className={navLink}><Link to={route.LOGIN}>LogIn</Link></li>
                            </>
                        }
                        {isAuth && <li>
                            <UserDropDown id={id} />
                        </li>}
                        {!hide && <li><Link to={route.USER_CART} className={'flex justify-between gap-2 cursor-pointer'}><ShoppingCart /> Cart</Link></li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

const navLink = `
cursor-pointer
text-primary-gray
text-lg
`

export default UserLayout