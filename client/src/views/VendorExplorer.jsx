import UserLayout from '@/components/Layout/UserLayout';
import VendorsGrid from '@/components/StreetVendors/VendorsGrid';
import { Button } from '@/components/ui/button';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Drawer } from 'vaul';

function VendorExplorer() {
    const params = useParams();
    return (
        <UserLayout>
            <div>
                {/* {params.city + '/' + params.params} */}
                {/* filter section  */}
                <FilterSection />
                <section className='m-section'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold'>Top Street Vendors</h2>
                    </div>
                    <VendorsGrid />
                </section>
            </div>
        </UserLayout>
    )
}

function FilterSection() {
    return (
        <section className='m-section flex items-center gap-3'>
            <Drawer.Root shouldScaleBackground>
                <Drawer.Trigger asChild>
                    <Button className={filterButton}>
                        <AdjustmentsHorizontalIcon className='w-5' />
                        <span>Filters</span>
                    </Button>
                </Drawer.Trigger>
                <FilterDrawer />
            </Drawer.Root>
            <Button className={filterButton}>
                <span>Rating 4.0+</span>
            </Button>
        </section>
    )
}

function FilterDrawer() {
    return (
        <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 z-50 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                <div className="p-4 bg-white rounded-t-[10px] flex-1">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                    <div className="m-section">
                        <Drawer.Title className="font-medium mb-4 text-2xl">
                            Filter
                        </Drawer.Title>
                    </div>
                </div>
            </Drawer.Content>
        </Drawer.Portal>
    )
}

const filterButton = `
bg-white 
h-9 
flex 
items-center 
gap-2 
text-primary-gray 
py-0 
px-2 
rounded-sm 
border 
border-primary-gray
hover:bg-white
hover:border-primary
hover:text-primary
transition
duration-200
`

export default VendorExplorer