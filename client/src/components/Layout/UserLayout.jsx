import React from 'react'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import VendorIcon from '@/assets/icon/VendorIcon';
import { ChevronDownIcon, UserCircle2 } from 'lucide-react';
import SearchVendors from '../Search/SearchVendors';
import { route } from '@/constants';
import { Link, NavLink } from 'react-router-dom';

function UserLayout({ children }) {
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
    // const { isAuth, role } = useSelector(state => state.auth);
    const isAuth = true;
    return (
        <header>
            <nav className='relative flex justify-between items-center py-2 px-12 text-xl bg-transparent w-full'>
                <div>
                    <Link to={'/'} className='font-bold text-primary'>YumStreet</Link>
                </div>
                <div>
                    <SearchVendors className={'shadow-md py-1'} />
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
                            <Popover>
                                <PopoverTrigger className={popoverTrigger}>
                                    <UserCircle2 style={{ width: '35px', height: '30px' }} />
                                    Harsh
                                    <ChevronDownIcon className={`duration-300 transition-all  w-6 fill-black`} />
                                </PopoverTrigger>
                                <PopoverContent align='end' sideOffset={10} className='w-48 py-2'>
                                    <ul >
                                        <NavLink to={'/user/harshpatil/reviews'} className={popContent}>Profile</NavLink>
                                        <NavLink to={'/user/harshpatil/order-history'} className={popContent}>Orders</NavLink>
                                        <NavLink to={'/user/harshpatil/reviews'} className={popContent + 'border-b border-neutral-400'}>Reviews</NavLink>
                                        <li className={`${popContent} rounded-b-sm`}>Logout</li>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        </li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

const popContent = `
 py-3 
 px-3 
 cursor-pointer
 rounded-t-sm
 hover:bg-neutral-200
 block
`

const popoverTrigger = `
cursor-pointer 
border 
border-neutral-50 
p-2 
rounded-lg 
flex  
items-center 
gap-1
`

const navLink = `
cursor-pointer
text-primary-gray
text-lg
`

export default UserLayout