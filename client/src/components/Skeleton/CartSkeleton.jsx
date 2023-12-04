import { Skeleton } from "../ui/skeleton"

function CartSkeleton() {
    return (
        <div className="m-section">
            <Skeleton className="h-8 w-[275px] bg-zinc-200 my-2" />
            <div className="mx-4 my-4 flex gap-4 items-start">
                <div className={'flex-1 flex flex-col gap-4 rounded max-w-2xl border border-neutral-200 p-2border w-[20rem] p-4'}>
                    <Skeleton className={'w-full h-[20vh] bg-zinc-200'} />
                    <Skeleton className={'w-full h-[20vh] bg-zinc-200'} />
                    <Skeleton className={'w-full h-[20vh] bg-zinc-200'} />
                    <div className="flex justify-end">
                        <Skeleton className="h-[40px] w-[100px] bg-zinc-200 my-2" />
                    </div>
                </div>
                <div className='flex gap-4 items-center'>
                    <Skeleton className="h-[50vh] w-[250px] bg-zinc-200 my-2" />
                </div>
            </div>
        </div>
    )
}

export default CartSkeleton