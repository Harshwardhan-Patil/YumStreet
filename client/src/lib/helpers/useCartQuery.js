import { axiosApi } from "@/config"
import { useMutation, useQuery, useQueryClient } from "react-query";

export const cartQueryKey = 'cart-query-key';

// Todo: add  code for vendor also
function createCart(data) {
    return axiosApi.post('/users/cart/items', data);
}

function getCart(isOptions) {
    return axiosApi.get(`/users/cart/items?isOptions=${isOptions}`);
}

function updateCartItem(data) {
    const { itemId, dataToUpdate } = data;
    return axiosApi.put(`/users/cart/items/${itemId}`, dataToUpdate);
}

function deleteCartItem(itemId) {
    return axiosApi.delete(`/users/cart/items/${itemId}`);
}

function clearCart(cartId) {
    return axiosApi.delete(`/users/cart/items/clear`, cartId);
}

export function useCreateCartQuery() {
    const queryClient = useQueryClient();

    return useMutation(createCart, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [cartQueryKey] });
        }
    });
}
export function useCartQuery({ isOptions = false }) {
    return useQuery(cartQueryKey, () => getCart(isOptions), {
        select: (response) => response.data.data
    });
}

export function useUpdateCartItemsQuery() {
    const queryClient = useQueryClient();
    return useMutation(updateCartItem, {
        onMutate: async (cartItems) => {
            await queryClient.cancelQueries(cartQueryKey);
            const previousCartItems = queryClient.getQueriesData(cartQueryKey);

            queryClient.setQueriesData(cartQueryKey, (oldCartItems) => {
                const cartItemsData = oldCartItems.data.data;
                const updatedCartItems = cartItemsData.map((cartItemData) => {
                    if (cartItemData.id === cartItems.itemId) {
                        return { ...cartItemData, quantity: cartItems.dataToUpdate.quantity };
                    }
                    return { ...cartItemData };
                });

                return {
                    ...oldCartItems,
                    data: {
                        ...oldCartItems.data,
                        data: updatedCartItems,
                    },
                };
            });

            return { previousCartItems };
        },
        onError: (_error, _vendor, ctx) => {
            queryClient.setQueriesData(cartQueryKey, ctx.previousCartItems);
        },
        onSettled: () => {
            queryClient.invalidateQueries(cartQueryKey);
        },
    });
}

export function useRemoveCartItemsQuery() {
    const queryClient = useQueryClient();
    return useMutation(deleteCartItem, {
        onMutate: async (cartItems) => {
            await queryClient.cancelQueries(cartQueryKey);
            const previousCartItems = queryClient.getQueriesData(cartQueryKey);

            queryClient.setQueriesData(cartQueryKey, (oldCartItems) => {
                const cartItemsData = oldCartItems.data.data;
                const updatedCartItems = cartItemsData.filter((cartItemData) => cartItemData.id !== cartItems.itemId);

                return {
                    ...oldCartItems,
                    data: {
                        ...oldCartItems.data,
                        data: updatedCartItems,
                    },
                };
            });

            return { previousCartItems };
        },
        onError: (_error, _vendor, ctx) => {
            queryClient.setQueriesData(cartQueryKey, ctx.previousCartItems);
        },
        onSettled: () => {
            queryClient.invalidateQueries(cartQueryKey);
        },
    });
}

export function useClearCartQuery() {
    return useMutation(clearCart);
}