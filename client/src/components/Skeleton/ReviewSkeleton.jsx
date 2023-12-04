import { Skeleton } from "../ui/skeleton"

function ReviewSkeleton({ box = 4 }) {
    return (
        <div className="m-">
            {Array(box).fill(0).map((value, index) => {
                return (
                    <VendorReviewCardSkeleton key={index} />
                )
            })}

        </div>
    )
}

function VendorReviewCardSkeleton() {
    return (
        <div className="flex gap-4 my-2">
            <div className="mt-2 flex items-start gap-2">
                <Skeleton className={'w-[80px] h-[80px] bg-zinc-200'} />
                <div className="flex flex-col gap-2">
                    <Skeleton className={'w-[150px] h-[20px] bg-zinc-200'} />
                    <Skeleton className={'w-[100px] h-[10px] bg-zinc-200'} />
                    <Skeleton className={'w-[100px] h-[10px] bg-zinc-200'} />
                </div>
            </div>
            <div className="mt-2 flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Skeleton className={'w-[40px] h-[30px] bg-zinc-200'} />
                    <Skeleton className={'w-[50px] h-[10px] bg-zinc-200'} />
                </div>
                <Skeleton className={'w-full h-[40px] bg-zinc-200'} />
            </div>
        </div>
    )
}

export default ReviewSkeleton