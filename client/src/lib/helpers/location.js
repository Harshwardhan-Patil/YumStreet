import axios from "axios";

export const getLocationFromLatLng = async (lat, lng) => {
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY}`
        )
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getLocationFromCity = async (city) => {
    if (city === '' && !city) return;
    try {
        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${import.meta.env.VITE_OPEN_CAGE_DATA_API_KEY}`
        )
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getLocationFromIpAddress = async () => {
    try {
        const { data } = await axios.get(`https://api.ipify.org/?format=json`);
        const location = await axios.get(`https://ipapi.co/${data.ip}/json`);
        return location?.data;
    } catch (error) {
        console.log(error);
    }
}