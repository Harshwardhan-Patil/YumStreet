import { route } from '@/constants'
import { getTime } from '@/lib/helpers/time';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid'
import { Clock } from 'lucide-react';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom'

const VendorsCard = forwardRef(({ vendor }, ref) => {
    const openingTime = getTime(vendor?.openingTime || '00:00');
    const closingTime = getTime(vendor?.closingTime || '00:00');
    return (
        <Link to={`/${vendor?.Address.city}/${vendor?.id}/menu`} ref={ref} className='bg-white max-w-[300px]  overflow-hidden rounded-sm shadow-md cursor-pointer z-0 transition duration-200 hover:scale-[.97]'>
            <div className='w-full relative'>
                <div className='w-full max-h-[200px]'>
                    <img className='w-full h-full aspect-video object-cover object-center rounded-xl' src={`${route.API}/${vendor?.vendorImages[0]}`} alt="vendor-card-image" />
                </div>
                <div className={`${vendor?.isOpen ? 'text-green-600   bg-green-100' : 'text-red-600 bg-red-100'} absolute top-1 left-1 text-xs font-bold px-2 py-1 rounded-sm`}>
                    {vendor?.isOpen ? "Open" : "Close"}
                </div>
            </div>
            <div className='px-2 pb-2'>
                <div className='flex flex-col gap-2'>
                    <h3 className='capitalize font-semibold my-1'>{vendor?.name}</h3>
                    <div className='flex items-center gap-0.5'>
                        <MapPinIcon className="w-5 flex-0.5 fill-neutral-500" />
                        <span className='flex-1 capitalize text-sm text-primary'>{vendor?.Address.address.slice(0, 20)}...</span>
                    </div>
                    <div className='flex items-center gap-0.5'>
                        <StarIcon className='w-5 fill-yellow-500' />
                        <span className='text-sm text-yellow-500'>{vendor?.averageRating}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <Clock size={'18px'} className='stroke-neutral-600' />
                        <span className='text-primary text-sm'>{`${openingTime} to ${closingTime}`}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
})


VendorsCard.displayName = 'VendorsCard'

export default VendorsCard