import MenuSkeleton from "@/components/Skeleton/MenuSkeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { route } from "@/constants";
import { CURRENCY_INR, OrderStatusEnum } from "@/constants/constants";
import { formatDate } from "@/lib/helpers/formatDate";
import { useCancelVendorOrder, useUpdateVendorOrderStatuses, useVendorOrdersQuery } from "@/lib/helpers/useVendorOrdersQuery";
import SpinLoader from "@/styles/SpinLoader";
import { forwardRef } from "react";
import VegIcon from '@/assets/icon/veg-icon.svg'
import NoNVegIcon from '@/assets/icon/non-veg-icon.svg'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function PendingOrder() {
    const { query: { data, hasNextPage, isFetchingNextPage, isLoading, isSuccess }, observerRef } = useVendorOrdersQuery({ status: OrderStatusEnum.PENDING.id });
    return (
        <main>
            <div>
                {isLoading && <MenuSkeleton row={3} column={4} />}
                <div className="flex gap-4 flex-wrap">
                    {isSuccess && data.pages.map((pages) => {
                        return pages.data.data.orders.map((order, index) => {
                            return (<OrderCard key={order.id} order={order} index={index} ref={pages.data.data.orders.length - 1 === index ? observerRef : null} />)
                        })
                    })}
                </div>
                {isFetchingNextPage && hasNextPage &&
                    <SpinLoader
                        color={"rgb(239, 68, 68)"}
                        loading={isFetchingNextPage && hasNextPage}
                        marginBlock={'auto'}
                        size={20} />}

            </div>
        </main>
    )
}

const OrderCard = forwardRef(({ order }, ref) => {
    return (
        <Card ref={ref} className={"max-w-xs mt-2"} >
            <CardHeader>
                <CardTitle className='text-xl'>
                    <div className="flex justify-between">
                        <div>
                            <h3 className="capitalize font-semibold text-lg">{`${order?.User.firstname} ${order?.User.lastname}`}</h3>
                            <p className="capitalize font-medium text-primary-gray text-sm">{formatDate(order?.orderDate)}</p>
                        </div>
                        <div>
                            <img
                                src={order?.User.avatar.url || `${route.API}/${order?.User.avatar.localPath}` || `https://via.placeholder.com/40x40?text=${order?.User.firstname}`}
                                alt={order?.User.firstname}
                                className="w-16 h-16 rounded-2xl object-cover"
                            />
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className='capitalize py-2'>
                <ScrollArea className='h-[200px] overflow-auto'>
                    <div>
                        {order.OrderItems.map((item) => {
                            return (
                                <div
                                    key={item?.id}
                                    className="flex relative justify-between gap-2 items-start py-2"
                                >
                                    <div className="relative w-20 h-20 mr-2 border border-neutral-400 rounded">
                                        <img
                                            src={`${route.API}/${item?.MenuItem.image.localPath}` || `https://via.placeholder.com/40x40?text=${item.MenuItem.name}`}
                                            alt={item?.MenuItem.name}
                                            className="w-full h-full rounded object-cover"
                                        />
                                    </div>
                                    <img className="w-4 h-4 absolute top-0 right-0" src={item.MenuItem.isVeg ? VegIcon : NoNVegIcon} alt="" />
                                    <div className="flex-1 overflow-hidden text-ellipsis border-b border-gray-300 pb-3">
                                        <span className="capitalize font-medium text-sm">{item.MenuItem.name}</span>
                                        <div className="flex justify-between text-sm font-semibold">
                                            <p>{CURRENCY_INR} {item.price}</p>
                                            <p>Qty:{item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
                <span>{order.OrderItems.length > 2 ? `+${order.OrderItems.length - 1} items` : ''}</span>
            </CardContent>
            <CardFooter>
                <div className="w-full flex gap-3 justify-between items-center mt-4">
                    <span className="font-semibold">
                        Total: {CURRENCY_INR} {order.totalPrice}
                    </span>
                    <div className="flex gap-4">
                        <CancelOrder id={order?.id} />
                        <AcceptOrder id={order?.id} />
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
})
OrderCard.displayName = 'Vendor_Pending_Order_Card';

function CancelOrder({ id }) {
    const { mutate: cancelOrder, isLoading } = useCancelVendorOrder();
    const handleOrderCancelation = () => {
        cancelOrder(id);
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant='outline' className='border-red-600 bg-red-50 hover:bg-red-100'>
                    <XMarkIcon className="w-4 h-4 fill-red-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure You Want to Cancel Order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {"Order Cancellation Confirmation: Confirm if you want to cancel this order. Once confirmed, the order cannot be restored."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleOrderCancelation}>
                        {isLoading ? <SpinLoader
                            color={"#fff"}
                            loading={isLoading}
                            marginBlock={'auto'}
                            size={20} /> : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function AcceptOrder({ id }) {
    const { mutate: updateOrder, isLoading } = useUpdateVendorOrderStatuses();
    const handleOrderAcceptance = () => {
        updateOrder({ orderId: id, status: OrderStatusEnum.PREPARING.id })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant='outline' className='border-green-600 bg-green-50 hover:bg-green-100'>
                    <Check className="w-4 h-4 stroke-green-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure You Want to Accept the Order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {"Order Confirmation: Confirm your acceptance of this order. Once confirmed, the preparation process will begin. Ensure you're ready to fulfill the request"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleOrderAcceptance}>
                        {isLoading ? <SpinLoader
                            color={"#fff"}
                            loading={isLoading}
                            marginBlock={'auto'}
                            size={20} /> : "Confirm"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default PendingOrder