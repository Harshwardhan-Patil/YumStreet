import { MagnifyingGlassIcon, MapPinIcon, ChevronDownIcon, GlobeAsiaAustraliaIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/solid'
import backgroundImage from '@/assets/Temp/Hero-bg.avif'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'


function Home() {

    const background = {
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.4) 0%, rgba(37,40,43,0.2) 100%),
        url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    return (
        <main>
            <div style={background} className="h-[60vh] relative flex flex-col justify-center items-center text-primary-foreground">
                <div className="w-full text-center absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center">
                    <h1 className='text-4xl mb-8'>Discover the best street food & drinks in Kolhapur</h1>
                    <SearchBar />
                </div>
            </div>
        </main>
    )
}

function SearchBar() {
    return (
        <div className='bg-white flex justify-center items-center box-border text-sm rounded-sm'>
            <PlaceAutoComplete />
            <div className='h-4 w-px bg-neutral-300'></div>
            <Popover>
                <PopoverTrigger></PopoverTrigger>
                <PopoverContent></PopoverContent>
            </Popover>
            <div className='w-96 flex bg-current px-2 py-3 gap-2 rounded-e-sm'>
                <MagnifyingGlassIcon className='w-7 fill-black' />
                <input className='w-full border-none bg-transparent focus-visible:outline-none text-black' placeholder='Search for street vendors, foods and dishes' />
            </div>
        </div>
    )
}

function PlaceAutoComplete() {
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries: ['places']
    // })

    return (
        <>
            <Popover>
                <PopoverTrigger className='w-max flex items-center px-2 py-2'>
                    <MapPinIcon className='w-5 fill-red-500 ' />
                    <input placeholder='Enter you location' className='text-black p-1 focus-visible:outline-none bg-transparent' />
                    <ChevronDownIcon className='w-4 fill-black' />
                </PopoverTrigger>
                <PopoverContent>
                    <div className='py-2'>
                        <div className='border-b border-neutral-300 p-2 pb-4 cursor-pointer flex gap-2 items-start'>
                            <GlobeAsiaAustraliaIcon className='w-6 fill-red-500 mt-1' />
                            <p className='text-red-500 flex flex-col text-lg'>
                                Detect Current Location
                                <span className='text-neutral-400 text-sm'>Using GPS</span>
                            </p>
                        </div>
                        <div className='border-b border-neutral-300 p-2 pb-4 cursor-pointer flex gap-2 items-start'>
                            <PlusCircleIcon className='w-6 fill-red-500 mt-1' />
                            <p className='text-red-500 flex flex-col text-lg'>
                                Add address
                            </p>
                        </div>
                        <div><p className='text-red-500 p-1'></p></div>
                        <div className='p-2 pb-4 cursor-pointer'>
                            <p className='text-lg text-neutral-400'>Recent Location</p>
                            <ul className='px-4'>
                                <li className='flex items-center gap-1 p-2'>
                                    <ClockIcon className='w-4 fill-neutral-400 mt-1' />
                                    Kolhapur,India
                                </li>
                                <li className='flex items-center gap-1 p-2'>
                                    <ClockIcon className='w-4 fill-neutral-400 mt-1' />
                                    Pune,India
                                </li>
                            </ul>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
export default Home