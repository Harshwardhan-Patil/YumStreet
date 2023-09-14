import Rating from '@/components/common/Rating'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { User2, UserCircle2 } from 'lucide-react'

function VendorReviews() {
    return (
        <div>
            {fakeReviews.map(review => {
                return (
                    <ReviewBox
                        key={review.id}
                        name={review.name}
                        numOfReviews={review.numOfReviews}
                        rating={review.rating}
                        date={review.date}
                        description={review.description}
                    />
                )
            })}
        </div>
    )
}

function ReviewBox({ name, profileImg, numOfReviews, rating, date, description }) {
    return (
        <div className='mb-4'>
            <div className='flex gap-2 py-2'>
                <div className='flex items-start gap-2 w-40'>
                    <Avatar className='w-12 h-12 '>
                        <AvatarImage src={profileImg} />
                        <AvatarFallback><UserCircle2 /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className='text-primary font-semibold'>{name}</h2>
                        <span className='text-primary-gray text-sm'>{numOfReviews} reviews</span>
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 mb-2'>
                        <Rating rating={rating} />
                        <p className='text-sm text-primary-gray'>{date}</p>
                    </div>
                    <div><p className='text-primary-gray'>{description}</p></div>
                </div>
            </div>
            <Separator />
        </div>
    )
}

const fakeReviews = [
    {
        id: 1,
        name: "Alice",
        numOfReviews: 15,
        rating: 4.5,
        date: "2023-08-12",
        description: "Delicious food, especially the pizza! Highly recommended."
    },
    {
        id: 2,
        name: "Bob",
        numOfReviews: 22,
        rating: 3.8,
        date: "2023-08-05",
        description: "Decent place, good service, but the desserts could be better."
    },
    {
        id: 3,
        name: "Charlie",
        numOfReviews: 10,
        rating: 4.2,
        date: "2023-07-25",
        description: "Great ambiance and friendly staff. Loved the pasta."
    },
    {
        id: 4,
        name: "David",
        numOfReviews: 5,
        rating: 4.0,
        date: "2023-07-18",
        description: "Solid menu, good options for vegetarians. Would visit again."
    },
    {
        id: 5,
        name: "Eve",
        numOfReviews: 8,
        rating: 3.5,
        date: "2023-07-10",
        description: "The service was slow, but the seafood was fresh and tasty."
    },
    {
        id: 6,
        name: "Frank",
        numOfReviews: 12,
        rating: 4.7,
        date: "2023-06-30",
        description: "Excellent steakhouse! Perfectly cooked steaks every time."
    },
    {
        id: 7,
        name: "Grace",
        numOfReviews: 18,
        rating: 4.2,
        date: "2023-06-22",
        description: "The sushi was divine, and the presentation was beautiful."
    },
    {
        id: 8,
        name: "Hannah",
        numOfReviews: 25,
        rating: 3.9,
        date: "2023-06-15",
        description: "Good value for money, but the drinks menu could be improved."
    },
    {
        id: 9,
        name: "Ian",
        numOfReviews: 9,
        rating: 4.6,
        date: "2023-06-08",
        description: "Cozy atmosphere and a lovely selection of desserts."
    },
    {
        id: 10,
        name: "Jessica",
        numOfReviews: 14,
        rating: 3.7,
        date: "2023-06-01",
        description: "Average experience, nothing extraordinary. Expected more."
    }
];

// You can access individual reviews like this:
console.log(fakeReviews[0]);



export default VendorReviews