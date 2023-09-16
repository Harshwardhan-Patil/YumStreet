import UserProfileLayout from "@/components/Layout/UserProfileLayout";
import ReviewBox from "@/components/common/ReviewBox";
import { fakeReviewsForProfile } from "@/constants/constants";

function Reviews() {
    return (
        <main>
            <UserProfileLayout>
                <div>
                    <h2 className="text-2xl text-primary font-semibold pb-4">Reviews</h2>
                    {fakeReviewsForProfile.map(review => {
                        return (
                            <ReviewBox
                                key={review.id}
                                title={review.vendorName}
                                subtitle={review.vendorAddress}
                                rating={review.rating}
                                date={review.date}
                                description={review.description}
                            />
                        )
                    })}
                </div>
            </UserProfileLayout>
        </main>
    )
}

export default Reviews