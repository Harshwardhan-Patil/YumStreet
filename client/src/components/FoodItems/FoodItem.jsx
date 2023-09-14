import KachoriImg from '@/assets/Temp/Kachori.jpg'
import Counter from '../common/Counter'

function FoodItem({ name, img, price }) {
    return (
        <div className='flex justify-between items-center mt-3 pb-2'>
            <div className='flex gap-3 items-center'>
                <div className='w-24 rounded-sm'><img className='w-full h-full object-cover rounded-sm' src={KachoriImg} alt="" /></div>
                <h2 className='font-semibold'>{name}</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <div className='text-green-600 font-semibold'>Rs {price}</div>
                <Counter />
            </div>
        </div>
    )
}

export default FoodItem