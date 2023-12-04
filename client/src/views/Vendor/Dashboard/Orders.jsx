import MenuSkeleton from "@/components/Skeleton/MenuSkeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CURRENCY_INR, route } from "@/constants";
import { OrderStatusEnum } from "@/constants/constants";
import { formatDate } from "@/lib/helpers/formatDate";
import { useUpdateVendorOrderStatuses, useVendorOrdersQuery } from "@/lib/helpers/useVendorOrdersQuery";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SpinLoader from "@/styles/SpinLoader";
import { forwardRef } from "react";
import VegIcon from '@/assets/icon/veg-icon.svg'
import NoNVegIcon from '@/assets/icon/non-veg-icon.svg'
import { Button } from "@/components/ui/button";

const tabs = [
    {
        id: 'PREPARING',
        name: 'Preparing',
        component: <Preparing />
    },
    {
        id: 'READY',
        name: 'Ready',
        component: <Ready />
    },
    {
        id: 'PICKED_UP',
        name: 'Picked Up',
        component: <PickedUp />
    },
    {
        id: 'CANCELED',
        name: 'Cancelled',
        component: <Canceled />
    },
]

function Orders() {
    return (
        <div className="">
            <h1 className="mt-2 font-semibold mb-4 text-2xl">Orders</h1>
            <Tabs defaultValue={tabs[0].id}>
                <TabsList>
                    {tabs.map((tab) => {
                        return (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className='w-[150px]'
                            >
                                {tab.name}
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
                {tabs.map((tab, index) =>
                    <TabsContent key={tab.id + index} value={tab.id}>{tab.component}</TabsContent>
                )}

            </Tabs>
        </div>
    )
}

function Preparing() {
    return (
        <div className="mx-4">
            <OrdersContainer
                status={OrderStatusEnum.PREPARING.id}
                updateStatus={OrderStatusEnum.READY.id}
                btn={<Button variant='outline' style={{ borderColor: 'rgb(0, 189, 0)', color: 'rgb(0, 189, 0)' }}>Order Ready</Button>}
                title={'Are You Sure You Want to Mark It As Ready?'}
                description={`Once confirmed, the order will be prepared for pickup or delivery`}
            />
        </div>
    )
}

function Ready() {
    return (
        <div className="mx-4">
            <OrdersContainer
                status={OrderStatusEnum.READY.id}
                updateStatus={OrderStatusEnum.PICKED_UP.id}
                btn={<Button variant='outline' style={{ borderColor: '#4169E1', color: '#4169E1' }}>Order Picked Up</Button>}
                title={'Are You Sure You Want to Mark It As Picked Up?'}
                description={`Once confirmed, the order will be handed over to the customer or delivery service`}
            />
        </div>
    )
}

function PickedUp() {
    return (
        <div className="mx-4">
            <OrdersContainer
                status={OrderStatusEnum.PICKED_UP.id}
                btn={null}
            />
        </div>
    )
}

function Canceled() {
    return (
        <div className="mx-4">
            <OrdersContainer
                status={OrderStatusEnum.CANCELLED.id}
                btn={null}
            />
        </div>
    )
}

function OrdersContainer({ status, updateStatus, btn, title, description }) {
    const { query: { data, hasNextPage, isFetchingNextPage, isLoading, isSuccess }, observerRef } = useVendorOrdersQuery({ status });
    return (
        <main>
            <div>
                {isLoading && <MenuSkeleton row={3} column={4} />}
                <div className="flex gap-4 flex-wrap">
                    {isSuccess && data.pages.map((pages) => {
                        return pages.data.data.orders.map((order, index) => {
                            return (<OrderCard
                                key={order.id}
                                order={order}
                                ref={pages.data.data.orders.length - 1 === index ? observerRef : null}
                                status={updateStatus}
                                btn={btn}
                                title={title}
                                description={description}
                            />)
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

const OrderCard = forwardRef(({ order, status, btn, title, description }, ref) => {
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
                <div className="w-full flex justify-between items-center mt-4">
                    <span className="font-semibold">
                        Total: {CURRENCY_INR} {order.totalPrice}
                    </span>
                    <ChangeOrderStatus
                        id={order.id}
                        status={status}
                        btn={btn}
                        title={title}
                        description={description}
                    />
                </div>
            </CardFooter>
        </Card>
    )
})
OrderCard.displayName = 'Vendor_Pending_Order_Card';

function ChangeOrderStatus({ id, status, btn, title, description }) {
    const { mutate: updateOrder, isLoading } = useUpdateVendorOrderStatuses();
    const handleOrderAcceptance = () => {
        updateOrder({ orderId: id, status })
    }
    return (
        btn && <AlertDialog>
            <AlertDialogTrigger>
                {btn}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
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

export default Orders