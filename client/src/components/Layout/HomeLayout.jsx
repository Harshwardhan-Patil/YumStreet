import React from 'react'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import VendorIcon from '@/assets/icon/VendorIcon';
import { route, user } from '@/constants';
import { Link } from 'react-router-dom';

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
    const { isAuth, role } = useSelector(state => state.auth);
    return (
        <header>
            <nav className='flex justify-between  py-2 px-12 text-lg text-white bg-transparent w-full absolute top-0 h-28 z-50'>
                <div>
                    <h1 className='font-bold'><Link to={route.HOME}>YumStreet</Link></h1>
                </div>
                <div>
                    <ul className='flex items-center gap-8'>
                        {!isAuth &&
                            <li className={navLink}><Link to={route.PARTNER_WITH_US}>Add Vendor</Link></li>
                        }
                        {!isAuth &&
                            <>
                                <li className={navLink}><Link to={route.SIGNUP}>SignUp</Link></li>
                                <li className={navLink}><Link to={route.LOGIN}>LogIn</Link></li>
                            </>
                        }
                        {isAuth && role == user && <li>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer flex items-center gap-1'>
                                    <UserCircleIcon className='w-8' />
                                    Harsh
                                </PopoverTrigger>
                                <PopoverContent align='end' sideOffset={10} className='w-48'>
                                    <ul >
                                        <li className={popContent}>Profile</li>
                                        <li className={popContent}>Order</li>
                                        <li className={popContent + 'border-b border-neutral-400'}>Reviews</li>
                                        <li className={`${popContent} rounded-b-sm`}>Logout</li>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        </li>}
                        {isAuth && role == user && <li>
                            <Popover>
                                <PopoverTrigger className='cursor-pointer flex items-center gap-1'>
                                    <UserCircleIcon className='w-8' />
                                    Harsh
                                </PopoverTrigger>
                                <PopoverContent align='end' sideOffset={10} className='w-48'>
                                    <ul >
                                        <li className={popContent}>Profile</li>
                                        <li className={popContent}>Order</li>
                                        <li className={popContent + 'border-b border-neutral-400'}>Reviews</li>
                                        <li className={`${popContent} rounded-b-sm`}>Logout</li>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                        </li>}
                    </ul>
                </div>
            </nav>
        </header >
    )
}

const popContent = `
 py-3 
 px-3 
 cursor-pointer
 rounded-t-sm
 hover:bg-neutral-200
`
const navLink = `
    cursor-pointer
`

export default HomeLayout