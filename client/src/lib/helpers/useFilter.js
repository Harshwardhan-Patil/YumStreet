import { axiosApi } from "@/config";
import useInfiniteFetch from "@/hooks/useInfinityFetch";

export const UserFilterQueryKey = 'user-filter-query';
const limit = 25;

export function useFilterVendorQuery({ url }) {
    const fetchData = (page, query) => {
        const filterUrl = query.includes('?')
            ? `${query}&page=${page}&limit=${limit}`
            : `${query}?page=${page}&limit=${limit}`
        return axiosApi.get(filterUrl)
    }

    const getNextPageParam = (pages) => {
        return pages?.data.data?.pagination.has_next_page;
    }
    return useInfiniteFetch(UserFilterQueryKey, url, fetchData, getNextPageParam)
}