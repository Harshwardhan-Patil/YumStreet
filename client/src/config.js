import axios from "axios";
import Cookies from "js-cookie";

const axiosApi = axios.create({
    baseURL: '/api/v1'
})

axiosApi.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { axiosApi };