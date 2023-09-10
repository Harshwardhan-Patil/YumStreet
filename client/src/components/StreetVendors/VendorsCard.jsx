import React from 'react'
import VendorCardImage from '@/assets/Temp/vendorCard.jpg'
import DeliveryManIcon from '@/assets/icon/DeliveryManIcon'
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function VendorsCard({ index }) {
    return (
        <Link to={`/kolhapur/khasta-kachori/menu`} className='bg-white rounded-sm shadow-md cursor-pointer z-0 transition duration-200 hover:scale-[.97]'>
            <div className='w-full relative'>
                <div className='w-full'>
                    <img className='w-full object-cover rounded-lg' src={VendorCardImage} alt="vendor-card-image" />
                </div>
                <div className={`${index % 2 == 0 ? 'text-green-600   bg-green-100' : 'text-red-600 bg-red-100'} absolute top-1 left-1 text-xs font-bold px-2 py-1 rounded-sm`}>
                    {index % 2 == 0 ? "Open" : "Close"}
                </div>
            </div>
            <div className='px-2 pb-2'>
                <div className='flex flex-col gap-2'>
                    <h3 className='capitalize font-semibold my-1'>Khasta Kachori</h3>
                    <div className='flex items-center gap-0.5'>
                        <MapPinIcon className="w-5 fill-neutral-500" />
                        <span className='capitalize text-sm text-primary'>Shahupuri, Kolhapur</span>
                    </div>
                    <div className='flex items-center gap-0.5'>
                        <StarIcon className='w-5 fill-yellow-500' />
                        <span className='text-sm text-yellow-500'>4.4</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <DeliveryManIcon className='w-5 fill-neutral-500' />
                        <span className='capitalize text-sm text-primary'>delivery</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VendorsCard