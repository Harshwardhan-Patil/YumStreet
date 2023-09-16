import ReviewBox from '@/components/common/ReviewBox'
import { fakeReviews } from '@/constants/constants'

function VendorReviews() {
    return (
        <div>
            {fakeReviews.map(review => {
                return (
                    <ReviewBox
                        key={review.id}
                        title={review.name}
                        subtitle={review.numOfReviews + 'reviews'}
                        rating={review.rating}
                        date={review.date}
                        description={review.description}
                    />
                )
            })}
        </div>
    )
}








export default VendorReviews