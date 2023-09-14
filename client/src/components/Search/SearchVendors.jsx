import React, { useState } from 'react'
import {
    MagnifyingGlassIcon,
    MapPinIcon,
    ChevronDownIcon,
    GlobeAsiaAustraliaIcon,
    PlusCircleIcon,
    ClockIcon,
} from '@heroicons/react/24/solid';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';


function SearchVendors({ className }) {
    const [isFocus, setIsFocus] = useState(false);
    return (
        <div className={cn("box-border flex items-center justify-center rounded-sm bg-white text-sm", className)}>
            <PlaceAutoComplete />
            <Separator orientation="vertical" className='my-4 h-4' />
            <div className="relative">
                <div className='flex w-96 gap-2 rounded-e-sm bg-current px-2 py-3 bg-white'>
                    <MagnifyingGlassIcon className="w-5 fill-black" />
                    <input
                        className="w-full border-none bg-transparent text-black  focus-visible:outline-none"
                        placeholder="Search for street vendors, foods and dishes"
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    />
                </div>
                <div className={`${isFocus ? 'visible opacity-100' : 'invisible opacity-0'}  transition-all lg:h-80 absolute z-10  top-14 left-0 right-0 bg-white overflow-x-hidden overflow-y-scroll rounded-sm`}>
                    <ul className="px-4">
                        <li className="flex cursor-pointer text-neutral-400 items-center  hover:bg-neutral-100 gap-1 p-2 border-b border-b-neutral-300">
                            <ClockIcon className="mt-1 w-4 fill-neutral-400" />
                            Kolhapur,India
                        </li>
                        <li className="flex cursor-pointer text-neutral-400 items-center hover:bg-neutral-100 gap-1 p-2 border-b border-b-neutral-300">
                            <ClockIcon className="mt-1 w-4 fill-neutral-400" />
                            Pune,India
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function PlaceAutoComplete() {
    const [isFocus, setFocus] = useState(false);

    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    //     libraries: ['places']
    // })

    return (
        <>
            <div className='relative'>
                <div className="flex w-max items-center px-2 py-2">
                    <MapPinIcon className={` w-5 fill-red-500 transition-all`} />
                    <input
                        placeholder="Enter you location"
                        className="bg-transparent p-1 text-black focus-visible:outline-none"
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                    />
                    <ChevronDownIcon className={`${isFocus ? 'rotate-180' : 'rotate-0'} duration-300 transition-all  w-4 fill-black`} />
                </div>
                <div className={` ${isFocus ? 'visible opacity-100' : 'invisible opacity-0'} z-10  transition-all w-max lg:h-80 absolute  top-14 left-0 bg-white overflow-x-hidden overflow-y-scroll rounded-sm`}>
                    <div className="flex cursor-pointer items-start text-left gap-2 border-b border-neutral-300 hover:bg-neutral-100 py-3 px-4 pb-4">
                        <GlobeAsiaAustraliaIcon className="mt-1 w-6 fill-red-500" />
                        <p className="flex flex-col text-lg text-red-500">
                            Detect Current Location
                            <span className="text-sm text-neutral-400">Using GPS</span>
                        </p>
                    </div>
                    <div className="flex cursor-pointer items-start gap-2 border-b border-neutral-300 hover:bg-neutral-100 py-3 px-4 pb-4">
                        <PlusCircleIcon className="mt-1 w-6 fill-red-500" />
                        <p className="flex flex-col text-lg text-red-500">Add address</p>
                    </div>
                    <div>
                        <p className="p-1 text-red-500"></p>
                    </div>
                    <div className="cursor-pointer py-3 px-4 pb-4">
                        <p className="text-lg text-neutral-400">Recent Location</p>
                        <ul className="px-4">
                            <li className="flex text-neutral-400 items-center  hover:bg-neutral-100 gap-1 p-2 border-b border-b-neutral-300">
                                <ClockIcon className="mt-1 w-4 fill-neutral-400" />
                                Kolhapur,India
                            </li>
                            <li className="flex text-neutral-400 items-center hover:bg-neutral-100 gap-1 p-2 border-b border-b-neutral-300">
                                <ClockIcon className="mt-1 w-4 fill-neutral-400" />
                                Pune,India
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SearchVendors