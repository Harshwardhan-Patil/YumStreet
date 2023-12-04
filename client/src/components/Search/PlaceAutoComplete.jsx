import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FocusOutside from "../common/FocusOutside";
import SpinLoader from "@/styles/SpinLoader";
import { ChevronDownIcon, ClockIcon, GlobeAsiaAustraliaIcon, MapPinIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { setLocation } from "@/redux/user/slices/locationSlice";
import { useToast } from "../ui/use-toast";
import { getLocationFromCity, getLocationFromIpAddress, getLocationFromLatLng } from "@/lib/helpers/location";
import { toastError } from "../ui/toaster";
import debounce from "@/lib/helpers/debounce";
import DrawerPanel from "../ui/DrawerPanel";
import { useUserAddress, useUserAddresses } from "@/lib/helpers/useUserQuery";
import AddAddress from "../common/AddAddress";
import { HomeIcon } from "lucide-react";

function PlaceAutoComplete() {
    const [isFocus, setIsFocus] = useState(false);
    const [input, setInput] = useState('');
    const { city, addressId } = useSelector(state => state.location);
    const { data: userAddress } = useUserAddress({ user: false, addressId });
    const dispatch = useDispatch();
    const { isAuth } = useSelector(state => state.auth);

    const getLocation = useCallback(async () => {
        if (!city) {
            try {
                const response = await getLocationFromIpAddress();
                dispatch(setLocation({ city: response.city }));
            } catch (error) {
                console.error("Error getting location:", error);
            }
        }
    }, [city]);

    useEffect(() => {
        getLocation();
    }, [getLocation])


    const { handleDetectLocation, isLoading } = useDetectLocation();
    const { handleSearchInput, searchedCities, isLoading: isSearching } = useSearchLocation({ setInput });

    return (
        <>
            <div className='relative'>
                <FocusOutside onClickOutside={() => setIsFocus(false)}>
                    <div className="flex w-max items-center px-2 py-2">
                        {isLoading ?
                            <SpinLoader
                                color={"#ef4444"}
                                loading={isLoading}
                                marginBlock={'auto'}
                                size={15} /> :
                            <MapPinIcon className={` w-5 fill-red-500 transition-all`} />
                        }
                        <input
                            placeholder={userAddress?.address || city || "Enter you location"}
                            className="bg-transparent p-1 text-black focus-visible:outline-none"
                            onFocus={() => setIsFocus(true)}
                            onChange={handleSearchInput}
                            value={input}
                        />
                        <ChevronDownIcon onClick={() => setIsFocus(focus => !focus)} className={`${isFocus ? 'rotate-180' : 'rotate-0'} duration-300 transition-all cursor-pointer  w-4 fill-black`} />
                    </div>

                    <div style={{ visibility: `${isFocus ? 'visible' : 'hidden'}` }} className={`z-10 transition-all w-80  lg:h-80 absolute  top-14 left-0 bg-white overflow-x-hidden overflow-y-scroll rounded-sm`}>
                        {!isSearching && !input && <div
                            className="flex cursor-pointer items-start text-left gap-2 border-b border-neutral-300 hover:bg-neutral-100 py-3 px-4 pb-4"
                            onClick={() => { handleDetectLocation(); setIsFocus(false); setInput('') }}
                        >
                            <GlobeAsiaAustraliaIcon className="mt-1 w-6 fill-red-500" />
                            <p className="flex flex-col text-lg text-red-500">
                                Detect Current Location
                                <span className="text-sm text-neutral-400">Using GPS</span>
                            </p>
                        </div>}
                        {!isSearching && !input && isAuth && <AddAddressBtn />}
                        <div>
                            <p className="p-1 text-red-500"></p>
                        </div>
                        <div className="cursor-pointer py-3 max-w-sm w-full px-4 pb-4">
                            {searchedCities.length > 0 && input && <p className="text-lg text-neutral-400">Locations</p>}
                            <ul className="px-4">
                                {isSearching
                                    ? <div className='mt-4'>
                                        <SpinLoader
                                            color={"#ef4444"}
                                            loading={isSearching}
                                            marginBlock={'auto'}
                                            size={20} />
                                    </div>
                                    : searchedCities.length > 0 && input !== '' && searchedCities.map((city) => {
                                        return (
                                            <li key={city}
                                                onClick={() => { dispatch(setLocation({ city: city.split(',')[0] })); setIsFocus(false); setInput('') }}
                                                className="flex text-neutral-400 items-center  hover:bg-neutral-100 gap-1 p-2 border-b border-b-neutral-300">
                                                <ClockIcon className="mt-1 w-4 fill-neutral-400" />
                                                {city}
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    </div>
                </FocusOutside>
            </div>
        </>
    );
}

function AddAddressBtn() {
    const closeRef = useRef();
    const dispatch = useDispatch();
    const { data: userAddress } = useUserAddresses({ user: false });

    return (
        <div className='text-primary-gray px-4'>
            <DrawerPanel
                trigger={
                    <div className="flex cursor-pointer items-start gap-2 border-b border-neutral-300 hover:bg-neutral-100 py-3 pb-4">
                        <PlusCircleIcon className="mt-1 w-6 fill-red-500" />
                        <p className="flex flex-col text-lg text-red-500">Add address</p>
                    </div>
                }
                ref={closeRef}
            >
                <AddAddress ref={closeRef} />
            </DrawerPanel>

            {userAddress && userAddress.length > 0 &&
                <div className='p-3'>
                    <p className='text-lg'>Saved Address</p>
                    {userAddress?.map((address) => {
                        return (
                            <div
                                key={address?.id}
                                className={'flex gap-2 p-1 py-2 cursor-pointer hover:bg-muted'}
                                onClick={() => dispatch(setLocation({ addressId: address?.id, city: address?.city }))}
                            >
                                <div><HomeIcon size={'20px'} /></div>
                                <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{address?.address}</p>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}


function useDetectLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();

    const handleDetectLocation = () => {
        if ('geolocation' in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                const response = await getLocationFromLatLng(position.coords.latitude, position.coords.longitude);
                dispatch(setLocation({ city: response.data.results[0].components.state_district }));
                setIsLoading(false);
            },
                () => {
                    setIsLoading(false);
                    toastError(null, toast, "Please enable location permission from settings and try again!");
                });
        } else {
            toastError(null, toast, "Geolocation not supported");
        }
    }

    return { handleDetectLocation, isLoading };
}

function useSearchLocation({ setInput }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const { toast } = useToast();

    const fetchCities = useCallback(debounce(async (city) => {
        try {
            const response = await getLocationFromCity(city);
            const cities = response.data.results.filter((data) => data.components._type === 'city').map(data => {
                if (data.components.city) return `${data.components.city},${data.components.country}`;
                else return `${data.components.state_district},${data.components.country}`;
            })
            setSearchedCities(cities);
        } catch (error) {
            toastError(null, toast, "Something went wrong");
        } finally {
            setIsLoading(false);
        }

    }, 800), []);

    const handleSearchInput = async (e) => {
        if (!e.target.value) {
            setIsLoading(false);
            setInput('');
            return;
        }
        setInput(e.target.value);
        setIsLoading(true);
        fetchCities(e.target.value);

    }

    return { handleSearchInput, searchedCities, isLoading }
}

export default PlaceAutoComplete;