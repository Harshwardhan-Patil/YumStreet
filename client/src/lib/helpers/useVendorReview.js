import { axiosApi } from "@/config";
import { useQuery } from "react-query";

const VendorReviewQueryKey = 'user-review-query';

function getVendorReviews(id) {
    return axiosApi.get(`/vendors/review?vendorId=${id}`);
}

export function useVendorReviews({ id }) {
    return useQuery(
        [VendorReviewQueryKey],
        () => getVendorReviews(id),
        {
            select: (response) => response.data?.data
        }
    )
}