import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { route } from "@/constants";
import { useCartQuery } from "@/lib/helpers/useCartQuery";
import EmptyCartImage from '@/assets/illustration/empty_cart_plate.png'
import CartSkeleton from "@/components/Skeleton/CartSkeleton";
import CartBox from "@/components/common/CartBox";
import PriceDetailCard from "@/components/common/PriceDetailCard";

function Cart() {
    const { data: cartItems, isLoading } = useCartQuery({ isOptions: true });
    return (
        isLoading ? <CartSkeleton /> :
            !cartItems || cartItems.length === 0 ? <EmptyCart /> :
                <main className="m-section">
                    <h1 className="mt-2 font-semibold mb-4 text-2xl">Cart</h1>
                    <section>
                        <div className="flex gap-4">
                            <div className="flex-1 rounded max-w-2xl border border-neutral-200 p-2">
                                {cartItems?.map((item) => {
                                    return (
                                        <CartBox key={item.id} item={item} />
                                    )
                                })}
                                <div className="text-right">
                                    <Button className=""><Link to={route.CHECKOUT}> Proceed to Order </Link></Button>
                                </div>
                            </div>
                            <div className="flex-1 max-w-[250px]">
                                <PriceDetailCard cartItems={cartItems} />
                            </div>
                        </div>
                    </section>
                </main>

    )
}



function EmptyCart() {

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <div className="max-w-md flex text-center items-center flex-col gap-3">
                <img src={EmptyCartImage} className="w-[400px] h-[300px] object-cover rounded-xl overflow-hidden" alt="empty cart image" />
                <p>{`Empty plate, full potential! 🍽️ Time to add your favorites and savor the feast! Let's turn it into a food lover's dream.`}</p>
                <Button className='w-fit bg-red-500 hover:bg-red-600'>
                    <Link to={route.HOME} className='w-full flex justify-between gap-2 items-center  group'>
                        <span>Explore Foods items</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}



export default Cart