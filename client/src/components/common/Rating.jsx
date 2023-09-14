import { cn } from '@/lib/utils'
import { StarIcon } from 'lucide-react'

function Rating({ rating, className }) {
    return (
        <div className={cn('flex items-center w-fit gap-1 h-7 bg-yellow-500 px-2 rounded-sm', className)}>
            <StarIcon className='w-4 fill-primary-foreground stroke-primary-foreground' />
            <span className='text-sm font-semibold text-primary-foreground'>{rating}</span>
        </div>
    )
}

export default Rating