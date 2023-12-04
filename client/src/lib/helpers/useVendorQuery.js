import { axiosApi } from "@/config";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";

const NearByVendorsQueryKey = "NearByVendorQuery";
const TrendingVendorsQueryKey = "TrendingVendorsQuery";
const GetVendorProfileQueryKey = "GetVendorProfileQuery";

function getVendorProfile(vendorId) {
    return axiosApi.get(`/vendors/profile/${vendorId}?isAddress=true`)
}

function getNearByVendors(latitude, longitude) {
    const query = latitude && longitude
        ? `/vendors/nearby?latitude=${latitude}&longitude=${longitude}`
        : `/vendors/nearby`;
    return axiosApi.get(query);
}

function getTrendingVendors(city) {
    const query = city
        ? `/vendors/${city}/trending`
        : `/vendors/nearby`;
    return axiosApi.get(query);
}


export function useNearByVendorQuery({ latitude, longitude }) {
    return useQuery(
        [NearByVendorsQueryKey, latitude, longitude],
        () => getNearByVendors(latitude, longitude),
        {
            select: (response) => response.data.data,
            enabled: Boolean(latitude) || Boolean(longitude)
        }
    )
}


export function useTrendingVendorQuery({ city = '' }) {
    return useQuery(
        [TrendingVendorsQueryKey, city],
        () => getTrendingVendors(city),
        {
            select: (response) => response.data.data,
            enabled: city !== ''
        }
    )
}

export function useVendorProfileQuery({ vendorId }) {
    return useQuery(
        [GetVendorProfileQueryKey, vendorId],
        () => getVendorProfile(vendorId),
        {
            select: (response) => response.data.data,
            enabled: vendorId !== '' || vendorId !== undefined
        }
    )
}

export function useUpdateVendorProfileQuery() {
    const queryClient = useQueryClient();
    const { id } = useSelector(state => state.vendor);

    const updateVendorProfile = (formData) => {
        return axiosApi.put(
            `/vendors/profile/${id}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )
    }
    return useMutation(
        updateVendorProfile,
        {
            onSuccess: () => {
                queryClient.cancelQueries(GetVendorProfileQueryKey);
            }
        }
    );
}

export function useHandleVendorIsOpenQuery() {
    const queryClient = useQueryClient();
    const { id } = useSelector(state => state.vendor);
    const updateVendorProfile = (data) => {
        return axiosApi.put(`/vendors/profile/${id}`, data)
    }
    return useMutation(
        updateVendorProfile,
        {
            onMutate: async (vendor) => {
                await queryClient.cancelQueries(GetVendorProfileQueryKey);
                const previousVendor = queryClient.getQueriesData(GetVendorProfileQueryKey);
                queryClient.setQueriesData(GetVendorProfileQueryKey, (oldData) => {
                    return {
                        ...oldData,
                        data: { data: { isOpen: vendor.isOpen } },
                    }
                });
                return {
                    previousVendor
                }
            },
            onError: (_error, _vendor, ctx) => {
                queryClient.setQueriesData(GetVendorProfileQueryKey, ctx.previousVendor);
            },
            onSettled: () => {
                queryClient.invalidateQueries(GetVendorProfileQueryKey);
            },
        }
    );
}