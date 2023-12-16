import { axiosApi } from "@/config";
import useInfiniteFetch from "@/hooks/useInfinityFetch";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

const VendorOrderQueryKey = 'vendor-order-query';
const limit = 25;

async function updateVendorOrderStatuses(data) {
    const { orderId, status } = data;
    return await axiosApi.put(`/vendors/order/${orderId}`, { status })
}

async function cancelVendorOrder(orderId) {
    return await axiosApi.put(`/vendors/order/${orderId}/cancel`)
}

export function useVendorOrdersQuery({ status = '' }) {
    const { id } = useSelector(state => state.vendor);
    const fetchData = (page, query) => {
        return axiosApi.get(`${query}&page=${page}&limit=${limit}`)
    }

    const getNextPageParam = (pages) => {
        return pages?.data.data?.pagination.has_next_page;
    }
    return useInfiniteFetch(VendorOrderQueryKey, `/vendors/order?vendorId=${id}&status=${status}`, fetchData, getNextPageParam)
}

export function useUpdateVendorOrderStatuses() {
    const queryClient = useQueryClient()
    return useMutation(updateVendorOrderStatuses, {
        onSettled: () => {
            // queryClient.refetchQueries(VendorOrderQueryKey);
            queryClient.invalidateQueries([VendorOrderQueryKey]);
        }
    })
}

export function useCancelVendorOrder() {
    const queryClient = useQueryClient()
    return useMutation(cancelVendorOrder, {
        onSettled: () => {
            // queryClient.refetchQueries(VendorOrderQueryKey);
            queryClient.invalidateQueries([VendorOrderQueryKey]);
        }
    })
}

