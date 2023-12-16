import { axiosApi } from "@/config";
import Cookies from "js-cookie";
import { login, logout, authenticationError } from '@/redux/user/slices/authSlice';
import { setVendorToDefault } from "@/redux/vendor/slices/vendorSlice";
import { setLocationToDefault } from "../slices/locationSlice";



export const userLogin = async (dispatch, user) => {
    try {
        const response = await axiosApi.post('/users/login', user);
        const { id, role, accessToken } = response.data.data;
        Cookies.set('token', accessToken);
        dispatch(login({ id, role, isAuth: true }));
        return response;
    } catch (error) {
        dispatch(authenticationError(error));
        return error;
    }
}

export const userLogout = async (dispatch) => {
    try {
        const response = await axiosApi.post('/users/logout');
        dispatch(logout());
        dispatch(setVendorToDefault());
        dispatch(setLocationToDefault());
        return response;
    } catch (error) {
        dispatch(authenticationError(error));
        return error;
    }
}