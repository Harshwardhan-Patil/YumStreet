import { axiosApi } from "@/config";
import useInfiniteFetch from "@/hooks/useInfinityFetch";
import { useMutation, useQuery, useQueryClient } from "react-query";

const menuItemQueryKey = "menu-item-query";
const searchMenuItemQueryKey = "search-menu-item-query";
const CategoryQueryKey = "category-query";
const searchCategoryQueryKey = "search-category-query";
const limit = 25;

function getMenus(vendorId) {
    return axiosApi.get(`/vendors/menu?vendorId=${vendorId}`);
}

function searchCategory(query) {
    return axiosApi.get(`/category/search?query=${query}`);
}

function searchMenus(query) {
    return axiosApi.get(`/vendors/menu/items/search?query=${query}`);
}

export function useCategoryQuery() {
    const url = '/category'
    const fetchData = (page, query) => {
        return axiosApi.get(`${query}?page=${page}&limit=${limit}`)
    }

    const getNextPageParam = (pages) => {
        return pages?.data.data?.pagination.has_next_page;
    }
    return useInfiniteFetch(
        CategoryQueryKey,
        url,
        fetchData,
        getNextPageParam
    )
}

export function useSearchCategoryQuery({ query }) {
    return useQuery(
        searchCategoryQueryKey,
        () => searchCategory(query),
        {
            select: (response) => response.data.data,
            enabled: Boolean(query)
        }
    )
}


export function useSearchMenusQuery({ query }) {
    return useQuery(
        searchMenuItemQueryKey,
        () => searchMenus(query),
        {
            select: (response) => response.data.data,
            enabled: query !== ''
        }
    )
}


export function useMenusQuery({ vendorId }) {
    return useQuery(
        menuItemQueryKey,
        () => getMenus(vendorId),
        {
            select: (response) => response.data.data,
            enabled: vendorId !== null
        }
    )
}

export function useHandleMenuStockQuery() {
    const queryClient = useQueryClient();

    const updateMenu = (data) => {
        const { itemId, ...dataToUpdate } = data;
        return axiosApi.put(`/vendors/menu/items/${itemId}`, dataToUpdate)
    }
    return useMutation(
        updateMenu,
        {
            onMutate: async (menu) => {
                await queryClient.cancelQueries(menuItemQueryKey);
                const previousMenu = queryClient.getQueriesData(menuItemQueryKey);
                queryClient.setQueriesData(menuItemQueryKey, (oldData) => {
                    const menuData = oldData.data.data.filter((menuData) => {
                        if (menuData.menuItems.id === menu.itemId) {
                            return { ...menuData, menuItems: { inStock: menu.inStock } }
                        }
                    });
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            data: menuData
                        },
                    }
                });
                return {
                    previousMenu
                }
            },
            onError: (_error, _vendor, ctx) => {
                queryClient.setQueriesData(menuItemQueryKey, ctx.previousMenu);
            },
            onSettled: () => {
                queryClient.invalidateQueries([menuItemQueryKey]);
            },
        }
    );
}