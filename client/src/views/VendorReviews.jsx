import ReviewSkeleton from '@/components/Skeleton/ReviewSkeleton';
import ReviewBox from '@/components/common/ReviewBox'
import { route } from '@/constants';
import { formatDate } from '@/lib/helpers/formatDate';
import { useVendorReviews } from '@/lib/helpers/useVendorReview';
import { useParams } from 'react-router-dom'

function VendorReviews() {
    const params = useParams();
    const { data: reviews, isLoading } = useVendorReviews({ id: params.vendorId });
    return (
        isLoading ? <ReviewSkeleton /> : <div>
            <h2 className="text-2xl text-primary font-semibold pb-4">Reviews</h2>
            {reviews?.map(review => {
                return (
                    <ReviewBox
                        key={review.id}
                        name={`${review?.User.firstname} ${review?.User.lastname}`}
                        address={''}
                        rating={review.rating}
                        date={formatDate(review?.updatedAt)}
                        comment={review?.comment}
                        image={`${route.API}/${review?.User.avatar.localPath}`}
                    />
                )
            })}
        </div>

    )
}








export default VendorReviews