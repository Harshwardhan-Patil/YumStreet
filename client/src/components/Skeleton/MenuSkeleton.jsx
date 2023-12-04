import { Skeleton } from "../ui/skeleton"

function MenuSkeleton({ row, column }) {
    return (
        <div className="grid grid-cols-4 gap-4">
            {Array(column).fill(1).map((value, index) => {
                return (
                    <MenuCardSkeleton key={index + '' + value} length={row} />
                )
            })}
        </div>
    )
}


function MenuCardSkeleton({ length }) {
    return (
        <div className="mx-4 my-4">
            {Array(length).fill(0).map((value, index) => {
                return (
                    <div key={index} className={'border my-2 rounded-sm w-56 border-zinc-400 p-4'}>
                        <Skeleton className="h-[180px] w-full bg-zinc-200 my-2" />
                        <Skeleton className="h-4 w-[100px] bg-zinc-200 my-2" />
                        <Skeleton className="h-2 w-[80px] bg-zinc-200 my-2" />
                        <Skeleton className="h-2 w-[80px] bg-zinc-200 my-2" />
                        <div className='flex gap-4 items-center'>
                            <Skeleton className="h-[40px] w-[70px] bg-zinc-200 my-2 rounded-sm" />
                        </div>
                    </div>
                )
            })}


        </div>
    )
}
export default MenuSkeleton