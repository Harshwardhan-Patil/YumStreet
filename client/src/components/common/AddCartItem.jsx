import { useCartQuery, useCreateCartQuery, useRemoveCartItemsQuery, useUpdateCartItemsQuery } from '@/lib/helpers/useCartQuery';
import { cn } from '@/lib/utils';
import { addCart, addCartItem, clearCart, removeCartItem, updateCartItem } from '@/redux/user/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Toaster, toastError } from '../ui/toaster';
import { useToast } from '../ui/use-toast';
import BarLoader from '@/styles/BarLoader';

function AddCartItem({ item }) {
    const dispatch = useDispatch();
    const { toast } = useToast();

    const { data: cartItems } = useCartQuery({ isOptions: false });
    const { mutate: updateCartItemQuery, isLoading } = useUpdateCartItemsQuery();
    const { mutate: removeCartItemQuery, isLoading: isRemoving } = useRemoveCartItemsQuery();
    const index = cartItems ? cartItems?.findIndex((cartItem) => cartItem?.menuItemId === item.id) : -1;

    function handleDecrement() {
        const cartItem = cartItems[index];
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
        const cartItem = cartItems[index];
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
    if (!cartItems || cartItems.length === 0 || index === -1) {
        return <AddCartItemToCart item={item} />
    }
    return (
        <>
            <Toaster />
            <div className='flex  flex-col relative text-primary-gray rounded-md border border-green-500 px-3 py-1'>
                <div className='flex items-center gap-4'>
                    <div
                        className={counterHandlers}
                        onClick={handleDecrement}
                    >-</div>
                    <h2 className='font-semibold '>
                        {cartItems[index]?.quantity || 0}
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
        </>
    )
}

function AddCartItemToCart({ item }) {
    const { id } = useSelector(state => state.cart);
    const { toast } = useToast();
    const { vendorId } = useParams();
    const dispatch = useDispatch();
    const { mutate: addToCart, isLoading } = useCreateCartQuery();

    const handleCart = () => {
        if (!id) {
            dispatch(clearCart())
            addToCart({ vendorId, menuItemId: item.id, quantity: 1 }, {
                onSuccess: (response) => {
                    dispatch(addCart({
                        id: response.data.data.cartId,
                        vendorId,
                        cartItems: {
                            id: response.data.data.id,
                            quantity: response.data.data.quantity,
                            menuItemId: response.data.data.menuItemId
                        },
                    }))
                },
                onError: (error) => toastError(error, toast)
            })
            return;
        }

        addToCart({ vendorId, menuItemId: item.id, quantity: 1 }, {
            onSuccess: (response) => {
                dispatch(addCartItem({
                    id: response.data.data.id,
                    quantity: response.data.data.quantity,
                    menuItemId: response.data.data.menuItemId
                }))
            },
            onError: (error) => toastError(error, toast)
        })
    }
    return (
        <>
            <Toaster />
            <div className='flex flex-col'>
                <div
                    className='flex relative items-center gap-4 text-primary-gray rounded-md border border-green-500 px-3 py-1'
                    onClick={handleCart}
                >

                    <p className={cn(counterHandlers + 'px-4 text-green-500 font-semibold text-sm')}>ADD</p>
                    <div className='mb-[-5px] absolute bottom-1 left-1'>
                        <BarLoader
                            color={"rgb(34 197 94)"}
                            loading={isLoading}
                            height={3}
                            width={80}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

const counterHandlers = `
cursor-pointer 
text-xl
hover:text-green-500
transition
`

export default AddCartItem