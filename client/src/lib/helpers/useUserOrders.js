import { axiosApi } from "@/config";
import useInfiniteFetch from "@/hooks/useInfinityFetch";

export const UserOrderQueryKey = 'user-order-query';
const limit = 25;

export function useUserOrdersQuery() {

    const fetchData = (page, query) => {
        return axiosApi.get(`${query}?page=${page}&limit=${limit}`)
    }

    const getNextPageParam = (pages) => {
        return pages?.data.data?.pagination.has_next_page;
    }
    return useInfiniteFetch(UserOrderQueryKey, `/users/order`, fetchData, getNextPageParam)
}