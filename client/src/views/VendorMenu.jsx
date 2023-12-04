import FoodItem from '@/components/FoodItems/FoodItem';
import { Button } from '@/components/ui/button';
import { Drawer } from "vaul";
import { ScrollArea } from "@/components/ui/scroll-area"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Salad } from 'lucide-react';
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Separator } from '@/components/ui/separator';
import DrawerPanel from '@/components/ui/DrawerPanel';
import { useMenusQuery, useSearchMenusQuery } from '@/lib/helpers/useMenuQuery';
import VendorMenuSkeleton from '@/components/Skeleton/VendorMenuSkeleton';


function VendorMenu() {
    const [searchVal, setSearchVal] = useState('');
    const [isSearching, setSearching] = useState(false);
    const params = useParams();
    const { data: menus, isLoading } = useMenusQuery({ vendorId: params.vendorId });
    const { data: searchedMenus, isLoading: isSearchLoading } = useSearchMenusQuery({ query: searchVal })
    return (
        <div className='w-full relative'>
            <div className='sticky top-1 flex mb-4 border border-primary-gray rounded-md gap-2 rounded-e-sm bg-current px-2 py-3 bg-white'>
                <MagnifyingGlassIcon className="w-5 fill-black" />
                <input
                    className="w-full border-none bg-transparent text-black  focus-visible:outline-none"
                    placeholder="Search foods and dishes"
                    onChange={(e) => {
                        setSearchVal(e.target.value);
                        setSearching(e.target.value.trim() !== '')
                    }}
                    value={searchVal}
                />
            </div>
            <div>
                {isSearching &&
                    (isSearchLoading
                        ? <VendorMenuSkeleton />
                        : searchedMenus?.map((menu) => {
                            return (
                                <FoodItemList key={menu.id} list={menu} />
                            )
                        }))
                }
                {!isSearching && (isLoading
                    ? <VendorMenuSkeleton />
                    : menus?.map((menu) => {
                        return (
                            <FoodItemList key={menu.id} list={menu} />
                        )
                    }))
                }
            </div>
            <BrowseMenu menus={isSearching ? searchedMenus : menus} />
        </div>
    )
}


function FoodItemList({ list }) {
    return (
        <div id={list.id} className='my-8'>
            <h2 className='mb-4 capitalize p-2 bg-neutral-100 text-xl font-semibold'>{list.name}</h2>
            <div className='px-2'>
                {list?.menuItems?.map(item => {
                    return (
                        <div key={item.id}>
                            <FoodItem item={item} />
                            <Separator />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


function BrowseMenu({ menus }) {
    return (
        <DrawerPanel
            trigger={
                <Button className='fixed rounded-md z-40 bottom-4 left-1/2 bg-blue-500 hover:bg-blue-600' >
                    <Salad />
                    <span className='ml-1'>Browse Menu</span>
                </Button>
            }
        >
            <ScrollArea className='h-[200px] w-full'>
                <div className='grid grid-cols-5 gap-2'>
                    {menus?.map(menu => {
                        return (
                            <Drawer.Close key={menu.id}>
                                <Button
                                    onClick={() => {
                                        const anchor = document.getElementById(menu.id);
                                        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }}
                                    className='flex capitalize text-center justify-center w-full px-3 py-2 hover:bg-muted border border-muted-foreground rounded'
                                    variant='outline'
                                >
                                    {menu.name}
                                </Button>
                            </Drawer.Close>
                        )
                    })}
                </div>
            </ScrollArea>
        </DrawerPanel>
    )
}


export default VendorMenu