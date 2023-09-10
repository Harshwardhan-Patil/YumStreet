import { YumStreet, route } from '@/constants'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className='bg-zinc-100 pt-4'>
                <div className='m-section flex gap-20 justify-center '>
                    <div className='mr-16'>
                        <h1 className='font-bold'>YumStreet</h1>
                    </div>
                    <div>
                        <h3 className={footerTitles}>Quick Links</h3>
                        <div className='flex flex-col '>
                            <Link to={route.ABOUT_US} className={footerPoints}>About Us</Link>

                        </div>
                    </div>
                    <div>
                        <h3 className={footerTitles}>Help Center</h3>
                        <div>
                            <Link to={route.CONTACT_US} className={footerPoints}>Contact Us</Link>
                        </div>
                    </div>
                    <div>
                        <h3 className={footerTitles}>Payment Methods</h3>
                        {/* //Todo add payment methods  */}
                    </div>
                    <div>
                        <h3 className={footerTitles}>Contact Info</h3>
                        <div>
                            <p className={footerPoints}><a href={`tel:${YumStreet.PHONE}`} className='flex gap-1'><PhoneIcon className='w-4' /> <span>{YumStreet.PHONE}</span> </a></p>
                            <p className={footerPoints}><a href={`mailto:${YumStreet.EMAIL}`} className='flex gap-1'> <EnvelopeIcon className='w-4' /> <span>{YumStreet.EMAIL}</span></a></p>
                        </div>
                    </div>
                </div>
                <div className='text-center py-2 border-t border-neutral-300'>
                    <span className='text-sm font-semibold'>© 2023,YumStreet</span>
                </div>
            </div>
        </footer>
    )
}


const footerTitles = `
text-black 
font-semibold 
mb-4
`

const footerPoints = `
text-sm 
text-primary
mb-1
`

export default Footer