import { Separator } from "@radix-ui/react-separator"
import { Skeleton } from "../ui/skeleton"

function AddressSkeleton() {
    return (
        <div className="mx-4 my-4">
            <div className={'border rounded-sm w-[20rem] border-zinc-400 p-4'}>
                <Skeleton className="h-6 w-[275px] bg-zinc-200 my-2" />
                <Skeleton className="h-2 w-[250px] bg-zinc-200 my-2" />
                <Skeleton className="h-2 w-[250px] bg-zinc-200 my-2" />
                <Skeleton className="h-2 w-[250px] bg-zinc-200 my-2" />
                <div className='flex gap-4 items-center'>
                    <Skeleton className="h-[40px] w-[70px] bg-zinc-200 my-2" />
                    <Separator orientation="vertical" className='mx-2 w-[1px] bg-gray-400 h-6' />
                    <Skeleton className="h-[40px] w-[70px] bg-zinc-200 my-2" />
                </div>
            </div>
        </div>
    )
}

export default AddressSkeleton