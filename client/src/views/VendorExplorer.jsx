import UserLayout from '@/components/Layout/UserLayout';
import { Button } from '@/components/ui/button';
import { tabs } from '@/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useScrollTop from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Drawer } from 'vaul';
import DrawerPanel from '@/components/ui/DrawerPanel';
import { SortByCategoriesKeys, SortByCategoriesValues, SortByEnum, costsPerPerson, ratings } from '@/constants/constants';
import { removeCuisines, resetFilters, setCostPerPerson, setCuisines, setRating, setSortBy } from '@/redux/vendor/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useCategoryQuery, useSearchCategoryQuery } from '@/lib/helpers/useMenuQuery';
import { Checkbox } from '@/components/ui/checkbox';
import SpinLoader from '@/styles/SpinLoader';
import { useFilterVendorQuery } from '@/lib/helpers/useFilter';
import useUserLocation from '@/hooks/useUserLocation';
import VendorGridSkeleton from '@/components/Skeleton/VendorGridSkeleton';
import VendorsCard from '@/components/StreetVendors/VendorsCard';


function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}

function VendorExplorer() {
    useScrollTop();
    const { url, handleFilter } = useFilterQuery();
    const { query: { data, hasNextPage, isFetchingNextPage, isLoading, isSuccess }, observerRef } = useFilterVendorQuery({ url });
    return (
        <UserLayout>
            <div>
                <FilterSection handleFilter={handleFilter} />
                <section className='m-section'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-bold'>Street Vendors</h2>
                    </div>
                    {isLoading && <VendorGridSkeleton length={5} />}
                    <div className='inline-grid grid-cols-5 justify-center items-center gap-4'>
                        {isSuccess && data?.pages.map((pages) => {
                            return pages?.data.data.vendors.map((vendor, index) => {
                                return (<VendorsCard key={vendor.id} vendor={vendor} ref={pages.data.data.vendors.length - 1 === index ? observerRef : null} />)
                            })
                        })}
                    </div>
                    {isFetchingNextPage && hasNextPage &&
                        <SpinLoader
                            color={"rgb(239, 68, 68)"}
                            loading={isFetchingNextPage && hasNextPage}
                            marginBlock={'auto'}
                            size={20} />
                    }
                </section>
            </div>
        </UserLayout>
    )
}

function useFilterQuery() {
    const [filterQuery, setFilterQuery] = useState('');
    const filterSlices = useSelector(state => state.filter);
    const { city } = useSelector(state => state.location);
    const { location } = useUserLocation();
    const handleFilter = () => {
        let query = '';
        for (let filter in filterSlices) {
            switch (filter) {
                case 'cuisines': {
                    if (filterSlices[filter].length > 0) {
                        query = query + `&cuisines=${filterSlices[filter].join(',')}`;
                    }
                    break;
                }
                case 'rating': {
                    query = query + `&minRating=${filterSlices[filter].min}`;
                    break;
                }
                case 'costPerPerson': {
                    if (filterSlices[filter].min !== 0 && filterSlices[filter].max !== 0) {
                        query = query + `&minCostPerPerson=${filterSlices[filter].min}&maxCostPerPerson=${filterSlices[filter].max}`;
                    }
                    break;
                }
                case 'sortBy': {
                    if (filterSlices[filter] === 'nearBy') {
                        query = query + `&sortBy=${filterSlices[filter]}&latitude=${location.latitude}&longitude=${location.longitude}`
                    } else {
                        query = query + `&sortBy=${filterSlices[filter]}`;
                    }
                    break;
                }

            }
        }
        setFilterQuery(`/filter?${query.slice(1)}&city=${city}`);
    }
    const handleApply = () => {
        handleFilter();
    }
    useEffect(() => {
        handleFilter();
    }, [])

    return { url: filterQuery.slice(1), handleFilter, handleApply };
}

function FilterSection({ handleFilter }) {
    const ref = useRef();
    const query = useQuery();
    const dispatch = useDispatch();
    const filterSlices = useSelector(state => state.filter)


    useEffect(() => {
        if (SortByCategoriesKeys.includes(query.get('sort-by'))) {
            dispatch(setSortBy(query.get('sort-by')));
        }
    }, [query]);
    return (
        <section className='m-section flex items-center gap-3'>
            <DrawerPanel
                trigger={
                    <Button className={filterButton}>
                        <AdjustmentsHorizontalIcon className='w-5' />
                        <span>Filters</span>
                    </Button>
                }
                ref={ref}
            >
                <div className='flex flex-col items-center'>
                    <Drawer.Title className="font-medium w-3/4 mb-4 text-2xl">
                        Filter
                    </Drawer.Title>
                    <FilterDrawer handleFilter={handleFilter} ref={ref} />
                </div>
            </DrawerPanel>
            <div>
                <Button key={filterSlices.sortBy} className={filterButton}><span>{SortByEnum[filterSlices.sortBy].format}</span></Button>
            </div>
        </section>
    )
}


const FilterDrawer = forwardRef(({ handleFilter }, ref) => {
    const { cuisines, sortBy } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    return (
        <div className='w-3/4 py-4'>
            <Tabs defaultValue="sort-by" className="flex gap-3">
                <TabsList className='flex flex-col justify-start w-48 py-4 px-0 h-[40vh]'>
                    {tabs.map(tab => {
                        return (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className={cn(tabsTrigger, 'flex flex-col items-start')}
                            >
                                {tab.name}
                                {tab.id == 'cuisines' && cuisines.length > 0 && <p className='text-red-600 text-sm'>{cuisines?.length} selected</p>}
                                {tab.id == 'sort-by' && <p className='text-red-600 text-sm'>{sortBy}</p>}
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
                <TabsContent value="sort-by"><SortBy /></TabsContent>
                <TabsContent value="cuisines" className='w-full'><Cuisines /></TabsContent>
                <TabsContent value="ratings"><Ratings /></TabsContent>
                <TabsContent value="cost-per-person"><CostPerPerson /></TabsContent>
            </Tabs>
            <div className='flex justify-center gap-2 pt-4'>
                <Button className='bg-neutral-50 text-primary-gray hover:bg-neutral-100' onClick={() => dispatch(resetFilters())}>Clear all</Button>
                <Button className='bg-red-500 hover:bg-red-600' onClick={() => { handleFilter(); ref.current.click() }}>Apply</Button>
            </div>
        </div>
    )
})

FilterDrawer.displayName = 'FilterDrawer';



function SortBy() {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { sortBy: selectedSortBy } = useSelector((state) => state.filter);
    function handleSortBy(e) {
        dispatch(setSortBy(e.target.id));
        setSearchParams({ 'sortBy': e.target.id })
    }
    return (
        <section className='p-4'>
            {SortByCategoriesValues.map(sortBy => {
                return (
                    <div key={sortBy.key} className='flex gap-1 text-lg'>
                        <input type="radio" id={sortBy.key} checked={selectedSortBy === sortBy.key} name='sort-by' onChange={handleSortBy} className='accent-red-500 ' />
                        <label htmlFor={sortBy.key}>{sortBy.format}</label>
                    </div>
                )
            })}

        </section>
    )
}

function Cuisines() {
    const [searchVal, setSearchVal] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const dispatch = useDispatch();
    const { cuisines } = useSelector(state => state.filter);

    const { data: searchedCategories, isLoading } = useSearchCategoryQuery({ query: searchVal });
    const { query: { data: categories, isSuccess }, observerRef } = useCategoryQuery();

    const handleCategories = (id) => {
        if (cuisines.includes(id)) {
            dispatch(removeCuisines(id));
            return;
        }
        dispatch(setCuisines(id));
    }



    return (
        <div className='w-full px-4'>
            <div className='w-[100%]'>
                <div className='sticky w-full top-1 flex mb-4 border border-primary-gray rounded-md gap-2 rounded-e-sm bg-current px-2 py-3 bg-white'>
                    <MagnifyingGlassIcon className="w-5 fill-black" />
                    <input
                        className="w-full border-none bg-transparent text-black  focus-visible:outline-none"
                        placeholder="Search here"
                        onChange={(e) => {
                            setSearchVal(e.target.value);
                            setIsSearching(e.target.value.trim() !== '')
                        }}
                        value={searchVal}
                    />
                </div>
            </div>
            <div>
                <div className='flex gap-2'>
                    {!isSearching &&
                        isSuccess && categories.pages.map((pages) => {
                            return pages?.data.data.rows.map((category, index) => {
                                return (
                                    <CustomCheckbox
                                        key={category.id}
                                        id={category?.id}
                                        title={category?.name}
                                        checked={cuisines.includes(category?.id)}
                                        handleOnClick={handleCategories}
                                        ref={pages?.data.data.rows.length - 1 === index ? observerRef : null}
                                    />

                                )
                            })
                        })
                    }
                    {isSearching && (isLoading
                        ? <SpinLoader
                            color={"#ef4444"}
                            loading={isLoading}
                            marginBlock={'auto'}
                            size={20} />
                        : searchedCategories?.map((category) => {
                            return (
                                <div key={category?.id}>
                                    <CustomCheckbox
                                        key={category?.id}
                                        id={category?.id}
                                        title={category?.name}
                                        checked={cuisines.includes(category?.id)}
                                        handleOnClick={handleCategories}
                                    />
                                </div>
                            )
                        }))
                    }
                </div>
            </div>
        </div>
    )
}

function Ratings() {
    const { rating: selectedRating } = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const handleRatings = (rating) => {
        dispatch(setRating(rating));
    }

    const formatRating = (rating) => {
        if (rating === 0) return 'any';
        return `${Number.isInteger(rating) ? `${rating}.0` : rating}+`
    }

    return (
        <div className='px-4'>
            <div className='pb-5'>
                <p className='text-sm text-primary-gray'>Rating</p>
                <span className='text-xl font-semibold capitalize'>{formatRating(selectedRating.min)}</span>
            </div>
            <div>
                {ratings.map((rating) => {
                    return (
                        <label
                            key={rating}
                            htmlFor={'ratings'}
                            style={{ gridTemplateColumns: '1em auto' }}
                            className='grid gap-1 '
                            onClick={() => handleRatings(rating)}
                        >
                            <input checked={selectedRating.min === rating} className='accent-red-500' name='ratings' type="radio" value={rating} />
                            Ratings {formatRating(rating)}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

function CostPerPerson() {
    const dispatch = useDispatch();
    const { costPerPerson } = useSelector(state => state.filter);
    const handleCostPerPerson = (cost) => {
        dispatch(setCostPerPerson({ min: cost.min, max: cost.max }))
    }
    return (
        <div className='px-4'>
            <div className='pb-5'>
                <p className='text-xl text-primary-gray'>Cost per Person</p>
            </div>
            <div>
                {costsPerPerson.map((cost) => {
                    return (
                        <label
                            key={cost.name}
                            htmlFor={'ratings'}
                            style={{ gridTemplateColumns: '1em auto' }}
                            className='grid gap-1 '
                            onClick={() => handleCostPerPerson(cost)}
                        >
                            <input checked={costPerPerson.max === cost.max} className='accent-red-500' name='ratings' type="radio" value={`${cost.min} ${cost.max}`} />
                            {cost.name}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}


const CustomCheckbox = forwardRef(({ id, title, checked, handleOnClick }, ref) => {

    return (
        <div
            className='flex gap-2 cursor-pointer'
            ref={ref}
            onClick={() => handleOnClick(id)}
        >
            <Checkbox id={id} checked={checked} className={`hover:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600`} />
            <label
                htmlFor={id}
                className="text-sm capitalize font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {title}
            </label>
        </div>
    )
})
CustomCheckbox.displayName = "Checkbox";
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