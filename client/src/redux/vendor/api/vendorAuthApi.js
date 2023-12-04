import { axiosApi } from "@/config";
import Cookies from "js-cookie";
import { login, logout, authenticationError } from '@/redux/user/slices/authSlice';
import { setVendor } from "../slices/vendorSlice";



export const vendorLogin = async (dispatch, user) => {
    try {
        const response = await axiosApi.post('/vendors/login', user);
        const { id, role, accessToken, vendor } = response.data.data;
        Cookies.set('token', accessToken);
        dispatch(login({ id, role, isAuth: true }));
        dispatch(setVendor({ id: vendor.id, name: vendor.name }))
        return response;
    } catch (error) {
        dispatch(authenticationError(error));
        return error;
    }
}

export const vendorLogout = async (dispatch) => {
    try {
        const response = await axiosApi.post('/users/logout');
        dispatch(logout());
        return response;
    } catch (error) {
        dispatch(authenticationError(error));
        return error;
    }
}