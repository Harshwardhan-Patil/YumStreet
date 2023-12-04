import { axiosApi } from "@/config";
import { useQuery } from "react-query";

const UserReviewQueryKey = 'user-review-query';

function getUserReviews(id) {
    return axiosApi.get(`/users/review?userId=${id}`);
}

export function useUserReviews({ id }) {
    return useQuery(
        [UserReviewQueryKey],
        () => getUserReviews(id),
        {
            select: (response) => response.data?.data
        }
    )
}