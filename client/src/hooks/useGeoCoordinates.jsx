import { toastError } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react"

function useGeoCoordinates() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [isGPS, setGPS] = useState(false);
    const { toast } = useToast();

    const success = (position) => {
        setGPS(true);
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    const error = (err) => {
        if (err.code) setGPS(false);
        setLatitude(null)
        setLongitude(null)
    }

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            toastError(null, toast, "Geolocation not supported");
        }
    }, [])

    return { isGPS, latitude, longitude }
}

export default useGeoCoordinates