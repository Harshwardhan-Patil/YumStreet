import { axiosApi } from "@/config";
import { useQueryClient, useMutation, useQuery } from "react-query";

const userQueryKey = `userProfile`;
const userAddressQueryKey = 'userAddress';
const userAddressesQueryKey = 'userAddresses';

function getUserProfile() {
    return axiosApi.get('/users/profile');
}


function updateUserProfile(formData) {
    return axiosApi.put('/users/profile', formData);
}

function updateUserAvatar(formData) {
    return axiosApi.put('/users/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

export async function getUserAddress(user, addressId) {
    return await axiosApi.get(`/users/address?addressId=${addressId}&user=${user}`);
}

export async function getUserAddresses(user) {
    return await axiosApi.get(`/users/address/all?user=${user}`);
}

async function createUserAddress(address) {
    return await axiosApi.post(`/users/address`, address);
}

function updateUserAddress(address) {
    const { id, ...data } = address;
    return axiosApi.put(`/users/address/${id}`, data);
}

function deleteUserAddress(addressId) {
    return axiosApi.delete(`/users/address/${addressId}`);
}

export function useUserProfile() {

    return useQuery(
        userQueryKey,
        getUserProfile,
        {
            select: (data) => {
                return data.data?.data;
            }
        }
    )
}

export function useUpdateUserProfile() {
    const queryClient = useQueryClient();
    return useMutation(updateUserProfile, {
        onSuccess: (data) => {
            queryClient.setQueriesData(userQueryKey, (oldData) => {
                return {
                    ...oldData,
                    data: { data: { ...oldData.data.data, ...data.data.data } },
                }
            });

        }
    })
}



export function useUpdateUserAvatar() {
    return useMutation(updateUserAvatar)
}

export function useUserAddress({ user = false, addressId = '' }) {
    return useQuery(
        [userAddressQueryKey, user, addressId],
        () => getUserAddress(user, addressId),
        {
            select: (data) => data.data?.data,
            enabled: Boolean(addressId)
        }
    )
}

export function useUserAddresses({ user = false }) {
    return useQuery(
        [userAddressesQueryKey, user],
        () => getUserAddresses(user),
        {
            select: (data) => data.data?.data
        }
    )
}

export function useCreateUserAddress() {
    const queryClient = useQueryClient();
    return useMutation(createUserAddress, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [userAddressQueryKey, userAddressesQueryKey], exact: true });
        }
    })
}


export function useUpdateUserAddress() {
    const queryClient = useQueryClient();
    return useMutation(updateUserAddress, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [userAddressQueryKey, userAddressesQueryKey] });
        }
    })
}


export function useDeleteUserAddress() {
    const queryClient = useQueryClient();
    return useMutation(deleteUserAddress, {
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [userAddressQueryKey, userAddressesQueryKey] });
        }
    })
}