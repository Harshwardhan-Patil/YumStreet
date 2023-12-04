import { CURRENCY_INR } from '@/constants'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

function PriceDetailCard({ cartItems }) {
    const itemsTotal = cartItems ? cartItems.reduce((total, item) => {
        const itemTotal = parseInt(item.quantity) * parseFloat(item.MenuItem.price);
        return total + itemTotal;
    }, 0) : 0;
    return (
        <Card className='border-neutral-300 shadow rounded sticky top-2 '>
            <CardHeader className='p-4'>
                <CardTitle className='text-xl'>Price Details</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="flex justify-between text-sm py-1">
                    <span>Item Total</span>
                    <span>{CURRENCY_INR} {itemsTotal}</span>
                </p>
                <p className="flex justify-between text-sm py-1">
                    <span>Delivery Fee</span>
                    <span>Free</span>
                </p>
            </CardContent>
            <CardFooter className='border-t border-neutral-300 py-2'>
                <p className="flex w-full justify-between capitalize font-semibold">
                    <span>To pay</span>
                    <span>{CURRENCY_INR} {itemsTotal}</span>
                </p>
            </CardFooter>
        </Card>
    )
}

export default PriceDetailCard