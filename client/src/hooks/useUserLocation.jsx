import { getLocationFromCity, getLocationFromIpAddress } from "@/lib/helpers/location";
import { getUserAddress } from "@/lib/helpers/useUserQuery";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useUserLocation() {
    const [location, setLocation] = useState({ latitude: null, longitude: null })
    const { addressId, city } = useSelector(state => state.location);

    const setLatLong = useCallback(async () => {
        if (addressId) {
            const response = await getUserAddress(false, addressId);
            setLocation({ latitude: response.data.data.latitude, longitude: response.data.data.longitude });
        } else if (city) {
            const data = await getLocationFromCity(city);
            const { lat, lng } = data.data.results[0].geometry;
            setLocation({ latitude: lat, longitude: lng })
        } else {
            const data = await getLocationFromIpAddress();
            setLocation({ latitude: data.latitude, longitude: data.longitude })
        }
    }, [addressId, city])
    useEffect(() => {
        setLatLong();
    }, [setLatLong])

    return { location }
}

export default useUserLocation;