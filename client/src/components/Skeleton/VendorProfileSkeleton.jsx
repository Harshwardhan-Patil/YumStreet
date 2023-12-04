import { Skeleton } from '../ui/skeleton'

function VendorProfileSkeleton() {
    return (
        <div className="mx-12">
            <Skeleton className={'w-[90vw] h-[50vh] bg-zinc-200'} />
            <div className='flex justify-between my-2'>
                <Skeleton className="h-5 w-[275px] bg-zinc-200" />
                <Skeleton className="h-5 w-[40px] bg-zinc-200 mr-4" />
            </div>
            <Skeleton className="h-2 w-[200px] bg-zinc-200 my-2" />
            <Skeleton className="h-2 w-[200px] bg-zinc-200 my-2" />
            <Skeleton className="h-2 w-[200px] bg-zinc-200 my-2" />
            <div className='flex gap-4'>
                <Skeleton className="h-[40px] w-[70px] bg-zinc-200 my-2" />
                <Skeleton className="h-[40px] w-[70px] bg-zinc-200 my-2" />
            </div>

        </div>
    )
}

export default VendorProfileSkeleton