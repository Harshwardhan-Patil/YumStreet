import { cn } from "@/lib/utils";

function RightLayout({ children }) {
    return (
        <div className='border rounded-r-md border-l-0 border-primary-gray w-full p-4'>
            {children}
        </div>
    )
}


function LeftLayout({ children, className }) {

    return (
        <div className={cn("border bg-neutral-100 rounded-l-md border-primary-gray  w-48", className)}>
            <div className="flex flex-col gap-1 w-full">
                {children}
            </div>
        </div>
    )
}

const Sidebar = {
    Right: RightLayout,
    Left: LeftLayout
}

export default Sidebar;