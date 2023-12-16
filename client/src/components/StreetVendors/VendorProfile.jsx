import { Button } from '../ui/button'
// import { Clock, Forward, Grid, Map } from 'lucide-react'
import { Clock, Grid, } from 'lucide-react'
import { MapPinIcon } from '@heroicons/react/24/solid'
import Rating from '../common/Rating'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useParams } from 'react-router-dom'
import { useVendorProfileQuery } from '@/lib/helpers/useVendorQuery'
import VendorProfileSkeleton from '../Skeleton/VendorProfileSkeleton'
import { route } from '@/constants'
import DrawerPanel from '../ui/DrawerPanel'
import { ScrollArea } from '../ui/scroll-area'
import { getTime } from '@/lib/helpers/time'


function VendorProfile() {
    const params = useParams();
    const { data: vendor, isLoading } = useVendorProfileQuery({ vendorId: params.vendorId })
    const openingTime = getTime(vendor?.openingTime || '00:00');
    const closingTime = getTime(vendor?.closingTime || '00:00');
    useDocumentTitle(vendor?.name?.toLocaleUpperCase());
    return (
        isLoading
            ? <VendorProfileSkeleton />
            : <section className='m-section'>
                <div>
                    <ImageGridLayout images={vendor?.vendorImages} />
                    <div>
                        <div className='flex justify-between items-start mb-4'>
                            <div>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='text-4xl capitalize font-semibold mb-3'>{vendor?.name.toLowerCase()}</h1>
                                    <div className={`${vendor?.isOpen ? 'text-green-600   bg-green-100' : 'text-red-600 bg-red-100'} w-fit  text-xs font-bold px-2 py-1 rounded-sm`}>
                                        {vendor?.isOpen ? "Open" : "Close"}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex items-center gap-0.5'>
                                        <MapPinIcon className="w-5 fill-neutral-500" />
                                        <span className='text-primary'>{vendor?.Address.address}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <Clock className='w-5 stroke-neutral-500' />
                                        <span className='text-primary'>{`${openingTime} to ${closingTime}`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <Rating rating={vendor?.averageRating} className='h-8' />
                                <div className='text-sm font-semibold'>
                                    <p>{vendor?.reviewCount == 0 ? 'No' : vendor?.reviewCount}</p>
                                    <p className='border-b border-primary-gray'>Reviews</p>
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex items-center gap-4'>
                            <Button className={otherButtons}>
                                <Map className='w-5 stroke-red-500' />
                                Location
                            </Button>
                            <Button className={otherButtons}>
                                <Forward className='w-5 stroke-red-500' />
                                Share
                            </Button>
                        </div> */}
                    </div>
                </div>
            </section>
    )
}

function ImageGridLayout({ images }) {
    return (
        <div className={`grid auto-rows-[150px] box-border grid-cols-4 gap-1 mb-4`}>
            <div className={gridBox + `row-span-2 col-span-2 rounded-l-lg`}>
                <img className={gridImage} src={`${route.API}/${images[0]}`} alt="" />
            </div>
            <div className={gridBox}>
                <img className={gridImage} src={`${route.API}/${images[1]}`} alt="" />
            </div>
            <div className={gridBox + 'rounded-tr-lg'}>
                <img className={gridImage} src={`${route.API}/${images[2]}`} alt="" />
            </div>
            <div className={gridBox}>
                <img className={gridImage} src={`${route.API}/${images[3]}`} alt="" />
            </div>
            <div className={gridBox + 'rounded-br-lg relative'}>
                <img className={gridImage} src={`${route.API}/${images[4]}`} alt="" />
                <ShowAllPhotos images={images} />
            </div>
        </div>
    )
}

function ShowAllPhotos({ images }) {
    return (
        <DrawerPanel
            trigger={
                <Button className='absolute bottom-1 right-1 flex gap-1'>
                    <Grid />Show all Photos
                </Button>
            }
            full
        >
            <ScrollArea className='max-w-[80vw] mx-12 h-[100vh] box-border`'>
                {images.map((image, index) => {
                    return (
                        <div key={image} className={`w-[80vw] h-[60vh] my-5 ${index === images.length - 1 ? 'mb-32' : ''}`}>
                            <img src={`${route.API}/${image}`} className='w-full object-contain h-full' alt="" />
                        </div>
                    )
                })}
            </ScrollArea>
        </DrawerPanel>
    )
}

const gridImage = `
max-w-full 
w-full
object-cover 
object-center
hover:scale-105
transition
duration-300
`
const gridBox = `
w-full 
h-full 
overflow-hidden

`

// const otherButtons = `
// flex 
// gap-2 
// bg-transparent 
// text-primary
// border
// border-primary 
// hover:bg-transparent
// px-2
// py-1
// `
export default VendorProfile