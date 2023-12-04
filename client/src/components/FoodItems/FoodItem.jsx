import { CURRENCY_INR } from '@/constants/constants'
import { route } from '@/constants'
import AddCartItem from '../common/AddCartItem'

function FoodItem({ item }) {
    return (
        item.inStock && <div className='flex justify-between items-center mt-3 pb-2'>
            <div className='flex gap-3 items-center'>
                <div className='w-24 rounded-sm'>
                    <img className='w-full h-full object-cover rounded-sm' src={`${route.API}/${item?.image.localPath}`} alt="" />
                </div>
                <h2 className='font-semibold capitalize'>{item?.name}</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <div className='text-green-600 font-semibold'> {item?.price} {CURRENCY_INR} </div>
                <AddCartItem item={item} />
            </div>
        </div>
    )
}

export default FoodItem