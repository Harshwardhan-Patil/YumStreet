import YumstreetImg from '@/assets/yumstreet.png';
import { cn } from '@/lib/utils';

function Logo({ className }) {
    return (
        <div className={cn(`w-[80px] max-sm:w-[50px]`, className)}>
            <img src={YumstreetImg} className='w-full h-full object-contain' alt="" />
        </div>
    )
}

export default Logo