import { useDispatch } from "react-redux";
import { useToast } from "../ui/use-toast";
import { useRemoveCartItemsQuery, useUpdateCartItemsQuery } from "@/lib/helpers/useCartQuery";
import { removeCartItem, updateCartItem } from "@/redux/user/slices/cartSlice";
import { Toaster, toastError } from "../ui/toaster";
import { CURRENCY_INR, route } from "@/constants";
import { BarLoader } from "react-spinners";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

function CartBox({ item }) {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { mutate: updateCartItemQuery, isLoading } = useUpdateCartItemsQuery();
    const { mutate: removeCartItemQuery, isLoading: isRemoving } = useRemoveCartItemsQuery();
    const price = item ? parseInt(item.quantity) * parseFloat(item.MenuItem.price) : 0;

    function handleDecrement() {
        const cartItem = item;
        if (cartItem.quantity <= 1) {
            removeCartItemQuery(cartItem.id, {
                onSuccess: () => {
                    dispatch(removeCartItem({ id: cartItem.id }))
                },
                onError: (error) => toastError(error, toast)
            });
            return;
        }

        const dataToUpdate = { menuItemId: item.id, quantity: cartItem.quantity - 1 };
        updateCartItemQuery({ itemId: cartItem.id, dataToUpdate }, {
            onSuccess: (response) => {
                dispatch(updateCartItem({
                    itemId: response.data.data.id,
                    updatedItem: {
                        quantity: response.data.data.quantity
                    }
                }))
            },
            onError: (error) => toastError(error, toast)
        })

    }

    function handleIncrement() {
        const cartItem = item;
        const dataToUpdate = { menuItemId: item.id, quantity: cartItem.quantity + 1 };
        updateCartItemQuery({ itemId: cartItem.id, dataToUpdate }, {
            onSuccess: (response) => {
                dispatch(updateCartItem({
                    itemId: response.data.data.id,
                    updatedItem: {
                        quantity: response.data.data.quantity
                    }
                }))
            },
            onError: (error) => toastError(error, toast)
        })
    }
    return (
        <>
            <Toaster />
            {!item?.MenuItem.inStock &&
                <div className="relative bg-red-100 text-sm border flex gap-2 items-start border-red-600 p-2 rounded">
                    <ExclamationCircleIcon className="w-6 fill-white stroke-red-600" />
                    <span className="font-medium text-red-500">Item out of stock. Explore our other options or check back later. Apologies for inconvenience.</span>
                    <div style={{ clipPath: "polygon(50% 100%, 0 50%, 100% 50%)" }} className=" absolute -bottom-3 left-4 bg-clip-border border-red-600 bg-red-100  w-5 h-7"></div>
                </div>}
            <div className="flex py-4 gap-5 items-start justify-between">
                <div className="flex gap-4">
                    <img className="w-full h-full max-w-[120px] max-h-[120px] object-cover rounded-md aspect-square" src={`${route.API}/${item?.MenuItem.image.localPath}`} alt="" />
                    <div>
                        <p title={item?.MenuItem.name} className="capitalize font-medium text-ellipsis whitespace-wrap overflow-hidden max-w-[250px]">{item?.MenuItem.name}</p>
                        <p className="font-medium text-sm">{`Price: ${CURRENCY_INR} ${item.MenuItem.price}`}</p>
                        <p className="font-medium text-sm">{`Quantity: ${CURRENCY_INR} ${item.quantity}`}</p>
                        <p className="font-bold">{`Item Total: ${CURRENCY_INR} ${price}`}</p>
                        <p></p>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col relative text-primary-gray rounded-md border border-green-500 px-3 py-1'>
                        <div className='flex items-center gap-4'>
                            <div
                                className={counterHandlers}
                                onClick={handleDecrement}
                            >-</div>
                            <h2 className='font-semibold '>
                                {item?.quantity || 0}
                            </h2>
                            <div
                                className={counterHandlers}
                                onClick={handleIncrement}
                            >+</div>
                        </div>
                        <div className='mb-[-5px] absolute bottom-1 left-1'>
                            <BarLoader
                                color={"rgb(34 197 94)"}
                                loading={isLoading || isRemoving}
                                height={3}
                                width={80}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const counterHandlers = `
cursor-pointer 
text-xl
hover:text-green-600
transition
`
export default CartBox;