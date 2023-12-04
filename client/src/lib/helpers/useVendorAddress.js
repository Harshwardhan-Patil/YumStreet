import { axiosApi } from "@/config";
import { useMutation, useQuery } from "react-query";

const VendorAddressQueryKey = 'vendor-address-query';

const getVendorAddress = (addressId) => {
    return axiosApi.get(`/vendors/address/${addressId}`);
}

const updateVendorAddress = (data) => {
    const { addressId, dataToUpdate } = data;
    return axiosApi.put(`vendors/address/${addressId}`, dataToUpdate);
}

export function useVendorAddress(addressId) {
    return useQuery(
        VendorAddressQueryKey,
        () => getVendorAddress(addressId),
        {
            select: (response) => response.data?.data
        }
    )
}


export function useUpdateVendorAddress() {
    return useMutation(updateVendorAddress);
}
