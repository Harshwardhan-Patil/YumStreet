import UserProfileLayout from "@/components/Layout/UserProfileLayout";
import ReviewSkeleton from "@/components/Skeleton/ReviewSkeleton";
import ReviewBox from "@/components/common/ReviewBox";
import { route } from "@/constants";
import { formatDate } from "@/lib/helpers/formatDate";
import { useUserReviews } from "@/lib/helpers/useUserReview";
import { useSelector } from "react-redux";

function Reviews() {
    const { id } = useSelector((state) => state.auth);
    const { city } = useSelector(state => state.location);
    const { data: reviews, isLoading } = useUserReviews({ id });
    return (
        <main>
            <UserProfileLayout>
                {isLoading ? <ReviewSkeleton /> : <div>
                    <h2 className="text-2xl text-primary font-semibold pb-4">Reviews</h2>
                    {reviews?.map(review => {
                        return (
                            <ReviewBox
                                key={review.id}
                                url={`/${review.Vendor?.Address.city || city}/${review.Vendor?.id}/menu`}
                                name={review?.Vendor.name}
                                address={review?.Vendor.Address.address}
                                rating={review.rating}
                                date={formatDate(review?.updatedAt)}
                                comment={review?.comment}
                                image={`${route.API}/${review?.Vendor.vendorImages[0]}`}
                            />
                        )
                    })}
                </div>}
            </UserProfileLayout>
        </main>
    )
}

export default Reviews