import UserLayout from '@/components/Layout/UserLayout';
import VendorsGrid from '@/components/StreetVendors/VendorsGrid';
import Sidebar from '@/components/common/Sidebar';
import { Button } from '@/components/ui/button';
import { tabs } from '@/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useScrollTop from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import { sidebarLink } from '@/styles/sidebar';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Drawer } from 'vaul';

function VendorExplorer() {
    const params = useParams();
    useScrollTop();
    return (
        <UserLayout>
            <div>
                {/* {params.city + '/' + params.params} */}
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
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-zinc-100 z-50 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
                        <div className="p-4 bg-white rounded-t-[10px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                            <div className="m-section">
                                <Drawer.Title className="font-medium mb-4 text-2xl">
                                    Filter
                                </Drawer.Title>
                                <FilterDrawer />
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
            <Button className={filterButton}>
                <span>Rating 4.0+</span>
            </Button>
        </section>
    )
}


function FilterDrawer() {

    return (
        <Tabs defaultValue="account" className="flex gap-3">
            <TabsList className='flex flex-col w-48 py-4 px-0 h-full'>
                {tabs.map(tab => {
                    return (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className={cn(tabsTrigger)}
                        >
                            {tab.name}
                        </TabsTrigger>
                    )
                })}
            </TabsList>
            // Todo add filter field while building backend
            <TabsContent value="account"></TabsContent>
            <TabsContent value="password"></TabsContent>
        </Tabs>


    )
}

const tabsTrigger = `
w-full 
py-2 
text-lg 
text-left 
px-4 
justify-start
data-[state=active]:border-l-2
data-[state=active]:border-red-500
ml-1
rounded-none
capitalize
`

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