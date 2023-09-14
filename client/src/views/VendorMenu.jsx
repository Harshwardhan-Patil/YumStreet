import FoodItem from '@/components/FoodItems/FoodItem';
import VendorsGrid from '@/components/StreetVendors/VendorsGrid';
import { Button } from '@/components/ui/button';
import { Drawer } from "vaul";
import { ScrollArea } from "@/components/ui/scroll-area"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Salad } from 'lucide-react';
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator';

//temp list
const list = [
    {
        id: 1,
        name: 'Dahi Kachori',
        price: 40,
    },
    {
        id: 2,
        name: 'Dahi Kachori',
        price: 40,
    },
    {
        id: 3,
        name: 'Dahi Kachori',
        price: 40,
    },
    {
        id: 4,
        name: 'Dahi Kachori',
        price: 40,
    },
]

const menus = [
    {
        id: 1,
        name: 'Kachori',
        count: 40,
    },
    {
        id: 2,
        name: 'PaniPuri',
        count: 40,
    },
    {
        id: 3,
        name: 'Kachori',
        count: 40,
    },
    {
        id: 4,
        name: 'Dahi Kachori',
        count: 40,
    },
    {
        id: 5,
        name: 'Dahi Kachori',
        count: 40,
    },
    {
        id: 6,
        name: 'Dahi Kachori',
        count: 40,
    },

]

function VendorMenu({ title }) {
    const [searchVal, setSearchVal] = useState('');
    const params = useParams();
    return (
        <div className='w-full relative'>
            <div className='sticky top-1 flex mb-4 border border-primary-gray rounded-md gap-2 rounded-e-sm bg-current px-2 py-3 bg-white'>
                <MagnifyingGlassIcon className="w-5 fill-black" />
                <input
                    className="w-full border-none bg-transparent text-black  focus-visible:outline-none"
                    placeholder="Search foods and dishes"
                    onChange={(e) => setSearchVal(e.target.value)}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={searchVal}
                />
            </div>
            <div>
                <FoodItemList itemName={"Kachori"} list={list} />
                <FoodItemList id={"kachori"} itemName={"Kachori"} list={list} />
            </div>
            <BrowseMenu />
        </div>
    )
}


function FoodItemList({ id, itemName, list }) {
    return (
        <div id={id} className='my-8'>
            <h2 className='mb-4 p-2 bg-neutral-100 text-xl font-semibold'>{itemName}</h2>
            <div className='px-2'>
                {list.map(item => {
                    return (
                        <>
                            <FoodItem key={item.id} name={item.name} price={item.price} />
                            <Separator />
                        </>
                    )
                })}
            </div>
        </div>
    )
}


function BrowseMenu() {
    return (
        <Drawer.Root shouldScaleBackground>
            <Drawer.Trigger asChild>
                <Button className='fixed rounded-md z-40 bottom-4 left-1/2 bg-blue-500 hover:bg-blue-600' >
                    <Salad />
                    <span className='ml-1'>Browse Menu</span>
                </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className="bg-zinc-100 z-50 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                        <div className="mx-12">
                            <Drawer.Title className="font-medium mb-4 text-2xl">
                                Browse Menu
                            </Drawer.Title>
                            <ScrollArea className='h-[200px] w-full'>
                                <div className='grid grid-cols-3 gap-2'>
                                    {menus.map(menu => {
                                        return (
                                            <Drawer.Close>
                                                <p onClick={() => {
                                                    const anchor = document.querySelector(`#kachori`)
                                                    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                }} key={menu.id} className='flex justify-between px-3 py-2 hover:bg-neutral-200'>
                                                    <p>{menu.name}</p>
                                                    <p>{menu.count}</p>
                                                </p>
                                            </Drawer.Close>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}


export default VendorMenu