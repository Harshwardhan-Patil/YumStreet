import { Skeleton } from "../ui/skeleton"

function VendorGridSkeleton({ length }) {
    return (
        <div className={`mx-12 mt-6`}>
            <Skeleton className={'w-[35%] h-[30px] bg-zinc-200 mb-5'} />
            <div className="grid grid-cols-5 gap-4">
                {Array(length).fill(0).map((value, index) => {
                    return (
                        <Skeleton key={index} className={'w-[200px] h-[250px] bg-zinc-200'} />
                    )
                })}
            </div>
        </div>
    )
}

export default VendorGridSkeleton