import React from 'react'
import GridImage1 from '@/assets/Temp/vendor_profile_grid_main.avif'
import GridImage2 from '@/assets/Temp/vendor_profile_grid_2.avif'
import GridImage3 from '@/assets/Temp/vendor_profile_grid_3.avif'
import { Button } from '../ui/button'
import { Clock, Forward, Grid, Map, StarIcon, Table, Timer, TimerIcon } from 'lucide-react'
import DeliveryManIcon from '@/assets/icon/DeliveryManIcon'
import { MapPinIcon } from '@heroicons/react/24/solid'
import Rating from '../common/Rating'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useParams } from 'react-router-dom'

function VendorProfile() {
    const params = useParams();
    useDocumentTitle(params.vendorName.toLocaleUpperCase());
    return (
        <section className='m-section'>
            <div>
                <ImageGridLayout />
                <div>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <div className='flex gap-2 items-center'>
                                <h1 className='text-4xl font-semibold mb-3'>Khasta Kachori</h1>
                                <div className={`text-green-600 bg-green-100 w-fit text-xs font-bold px-2 py-1 rounded-sm`}>
                                    Open
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex items-center gap-0.5'>
                                    <MapPinIcon className="w-5 fill-neutral-500" />
                                    <span className='capitalize text-primary'>Shahupuri, Kolhapur</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <DeliveryManIcon className='w-5 fill-neutral-500' />
                                    <span className='capitalize text-primary'>delivery,pickup</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <Clock className='w-5 stroke-neutral-500' />
                                    <span className='capitalize text-primary'>7.00 am to 9.00 pm</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4 items-center'>
                            <Rating rating={4.4} className='h-8' />
                            <div className='text-sm font-semibold'>
                                <p>329</p>
                                <p className='border-b border-primary-gray'>Reviews</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button className={otherButtons}>
                            <Map className='w-5 stroke-red-500' />
                            Location
                        </Button>
                        <Button className={otherButtons}>
                            <Forward className='w-5 stroke-red-500' />
                            Share
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function ImageGridLayout() {
    return (
        <div className={`grid auto-rows-[150px] box-border grid-cols-4 gap-1 mb-4`}>
            <div className={gridBox + `row-span-2 col-span-2 rounded-l-lg`}>
                <img className={gridImage} src={GridImage1} alt="" />
            </div>
            <div className={gridBox}>
                <img className={gridImage} src={GridImage2} alt="" />
            </div>
            <div className={gridBox + 'rounded-tr-lg'}>
                <img className={gridImage} src={GridImage3} alt="" />
            </div>
            <div className={gridBox}>
                <img className={gridImage} src={GridImage1} alt="" />
            </div>
            <div className={gridBox + 'rounded-br-lg relative'}>
                <img className={gridImage} src={GridImage2} alt="" />
                <Button className='absolute bottom-1 right-1 flex gap-1'><Grid />Show all Photos</Button>
            </div>
        </div>
    )
}

const gridImage = `
max-w-full 
w-auto
object-cover 
object-center
hover:scale-105
cursor-pointer
transition
duration-300
`
const gridBox = `
w-full 
h-full 
overflow-hidden

`

const otherButtons = `
flex 
gap-2 
bg-transparent 
text-primary
border
border-primary 
hover:bg-transparent
px-2
py-1
`
export default VendorProfile