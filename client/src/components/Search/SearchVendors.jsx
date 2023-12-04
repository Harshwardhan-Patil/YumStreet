import { useCallback, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import SpinLoader from '@/styles/SpinLoader';
import { useToast } from '../ui/use-toast';
import { toastError } from '../ui/toaster';
import debounce from '@/lib/helpers/debounce';
import FocusOutside from '../common/FocusOutside';
import { axiosApi } from '@/config';
import { route } from '@/constants';
import Rating from '../common/Rating';
import { Link } from 'react-router-dom';
import PlaceAutoComplete from './PlaceAutoComplete';
import { ScrollArea } from '../ui/scroll-area';
import { setCuisines, setSortBy } from '@/redux/vendor/slices/filterSlice';
import { SortByEnum } from '@/constants/constants';


function SearchVendors({ className }) {
    const [isFocus, setIsFocus] = useState(false);
    const { input, vendorsAndCategories, handleVendorSearch, isLoading } = useSearch();

    return (
        <div className={cn("box-border flex items-center justify-start rounded-sm bg-white text-sm", className)}>
            <PlaceAutoComplete />
            <Separator orientation="vertical" className='my-4 h-4' />
            <div className="relative flex-1">
                <FocusOutside onClickOutside={() => setIsFocus(false)}>
                    <div className='flex w-96 gap-2 rounded-e-sm bg-current px-2 py-3 bg-white'>
                        <MagnifyingGlassIcon className="w-5 fill-black" />
                        <input
                            className="w-full border-none bg-transparent text-black  focus-visible:outline-none"
                            placeholder="Search for street vendors, foods and dishes"
                            onFocus={() => setIsFocus(true)}
                            onChange={handleVendorSearch}
                            value={input}
                        />
                    </div>
                    <div className={`${isFocus && input ? 'visible opacity-100' : 'invisible opacity-0'} transition-all lg:h-80 absolute z-10  top-14 left-0 right-0 bg-white rounded-sm`}>
                        <ScrollArea className='h-full overflow-auto'>
                            <div className="px-2">
                                {isLoading
                                    ? <div className='py-4'>
                                        <SpinLoader
                                            color={"#ef4444"}
                                            loading={isLoading}
                                            marginBlock={'auto'}
                                            size={25} />
                                    </div>
                                    : vendorsAndCategories?.vendor?.length === 0 && vendorsAndCategories?.category?.length === 0 && input !== ''
                                        ? <p className='font-semibold text-primary-gray p-2 text-center'>No result found</p>
                                        : <>
                                            <div>{
                                                vendorsAndCategories?.vendor?.map((vendor) => {
                                                    return (
                                                        <ShowSearchedVendors key={vendor?.id} vendor={vendor} />
                                                    )
                                                })
                                            }
                                            </div>
                                            {vendorsAndCategories?.category?.map((category) => {
                                                return (
                                                    <ShowSearchedCategories key={category?.id} category={category} />
                                                )
                                            })}
                                        </>
                                }
                            </div>
                        </ScrollArea>
                    </div>
                </FocusOutside>
            </div>
        </div>
    );
}

function ShowSearchedVendors({ vendor }) {
    return (
        <Link to={`/${vendor?.Address.city}/${vendor?.id}/menu`} className='flex p-2 rounded-sm  cursor-pointer hover:bg-muted justify-between items-center mt-3 pb-2'>
            <div className='flex gap-3'>
                <div className='w-24 rounded-sm'>
                    <img className='w-full aspect-square h-full object-cover rounded-sm' src={`${route.API}/${vendor?.vendorImages[0]}`} alt="" />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='font-semibold capitalize mb-2 text-primary-gray'>{vendor?.name}</h2>
                    <div className='flex gap-2'>
                        <Rating className={'w-10 py-0'} rating={vendor?.averageRating} />
                        <div className={`${vendor?.isOpen ? 'text-green-600   bg-green-100' : 'text-red-600 bg-red-100'} w-fit  text-xs font-bold px-2 py-1 rounded-sm`}>
                            {vendor?.isOpen ? "Open" : "Close"}
                        </div>
                    </div>
                    <p className='text-primary-gray max-w-[200px]'>{vendor?.Address.address}</p>
                </div>
            </div>
        </Link>
    )
}

function ShowSearchedCategories({ category }) {
    const dispatch = useDispatch();
    const { city } = useSelector(state => state.location);
    const handleCategories = () => {
        dispatch(setCuisines(category?.id))
        dispatch(setSortBy(SortByEnum.popularity.key))
    }
    return (
        <Link to={`/${city}?sortBy=${SortByEnum.popularity.key}`} onClick={handleCategories} className='flex p-2 rounded-sm  cursor-pointer hover:bg-muted justify-between items-center mt-3 pb-2'>
            <div className='flex gap-3'>
                <div className='w-24 rounded-sm'>
                    <img className='w-full aspect-square h-full object-cover rounded-sm' src={`${route.API}/${category?.image?.localPath}`} alt="" />
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='font-semibold capitalize mb-2 text-primary-gray'>{category?.name}</h2>
                    <p className='text-primary-gray max-w-[200px]'>{category?.description}</p>
                </div>
            </div>
        </Link>
    )
}

function useSearch() {
    const [vendorsAndCategories, setVendorAndCategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { city } = useSelector(state => state.location);
    const { toast } = useToast();
    const [input, setInput] = useState('');

    const fetchVendors = useCallback(debounce(async (input) => {
        try {
            const response = await axiosApi.get('/search/vendor-category', {
                params: {
                    query: input,
                    city,
                }
            })
            setVendorAndCategory(response.data.data);
        } catch (error) {
            toastError(error, toast, null);
        } finally {
            setIsLoading(false);
        }

    }, 800), [city]);
    const handleVendorSearch = async (e) => {
        setInput(e.target.value);
        setIsLoading(true);
        if (e.target.value === '') {
            setIsLoading(false);
            setVendorAndCategory({});
            return;
        }
        fetchVendors(e.target.value);
    }
    return { input, vendorsAndCategories, handleVendorSearch, isLoading }
}


export default SearchVendors