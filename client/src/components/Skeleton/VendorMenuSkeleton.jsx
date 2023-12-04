import { Skeleton } from "../ui/skeleton"

function VendorMenuSkeleton({ box = 4, container = 2 }) {
    return (
        <div className="m-">
            {Array(container).fill(0).map((value, index) => {
                return (
                    <div className="my-8" key={index + 'vendorMenu'}>
                        <Skeleton className={'w-full h-[40px] bg-zinc-200'} />
                        {Array(box).fill(0).map((value, index) => {
                            return (
                                <VendorMenuCardSkeleton key={index} />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

function VendorMenuCardSkeleton() {
    return (
        <div className="flex justify-between items-center my-2">
            <div className="mt-2 flex items-start gap-2">
                <Skeleton className={'w-[80px] h-[80px] bg-zinc-200'} />
                <div className="flex flex-col gap-2">
                    <Skeleton className={'w-[200px] h-[20px] bg-zinc-200'} />
                    <Skeleton className={'w-[150px] h-[10px] bg-zinc-200'} />
                    <Skeleton className={'w-[150px] h-[10px] bg-zinc-200'} />
                </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
                <Skeleton className={'w-[50px] h-[25px] bg-zinc-200'} />
                <Skeleton className={'w-[80px] h-[30px] rounded bg-zinc-200'} />
            </div>
        </div>
    )
}

export default VendorMenuSkeleton