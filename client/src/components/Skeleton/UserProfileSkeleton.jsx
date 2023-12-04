import { Skeleton } from "@/components/ui/skeleton"

function UserProfileSkeleton() {
    return (
        <div className="mx-12">
            <Skeleton className={'w-[90vw] h-[50vh] bg-zinc-200'} />

        </div>
    )
}

export default UserProfileSkeleton