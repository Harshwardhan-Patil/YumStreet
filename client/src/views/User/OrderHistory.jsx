import UserProfileLayout from "@/components/Layout/UserProfileLayout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { route } from "@/constants";
import { CURRENCY_INR, OrderStatusEnum } from "@/constants/constants";
import { useUserOrdersQuery } from "@/lib/helpers/useUserOrders";
import { cn } from "@/lib/utils";
import SpinLoader from "@/styles/SpinLoader";
import { forwardRef } from "react";
import VegIcon from '@/assets/icon/veg-icon.svg'
import NoNVegIcon from '@/assets/icon/non-veg-icon.svg'
import { formatDate } from "@/lib/helpers/formatDate";
import MenuSkeleton from "@/components/Skeleton/MenuSkeleton";
import FoodReview from "@/components/common/FoodReview";

function OrderHistory() {
  const { query: { data, hasNextPage, isFetchingNextPage, isLoading, isSuccess }, observerRef } = useUserOrdersQuery();
  return (
    <main>
      <UserProfileLayout>
        <div>
          <h2 className="text-2xl text-primary font-semibold text-red">Order History</h2>
          {isLoading && <MenuSkeleton row={3} column={4} />}
          <div className="grid grid-cols-3 gap-2">
            {isSuccess && data.pages.map((pages) => {
              return pages.data.data.orders.map((order, index) => {
                return (<OrderCard key={order.id} order={order} ref={pages.data.data.orders.length - 1 === index ? observerRef : null} />)
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
      </UserProfileLayout>
    </main>
  );
}

export default OrderHistory;

const OrderCard = forwardRef(({ order }, ref) => {
  const statusColor = OrderStatusEnum[order?.status].color;
  return (
    <Card ref={ref} className={cn("max-w-xs mt-2 h-fit")} >
      <CardHeader>
        <CardTitle className='text-xl'>
          <div className="flex justify-between">
            <div>
              <h3 className="capitalize font-semibold text-lg">{order?.Vendor.name}</h3>
              <p className="capitalize font-medium text-primary-gray text-sm">{formatDate(order?.orderDate)}</p>
            </div>
            <div>
              <img
                src={`${route.API}/${order?.Vendor.vendorImages[0]}` || `https://via.placeholder.com/40x40?text=${order?.Vendor.name}`}
                alt={order?.Vendor.name}
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
        <div className="flex w-full gap-4 flex-col">
          <div className="w-full flex justify-between items-center mt-4">
            <span className="font-semibold">
              Total: {CURRENCY_INR} {order.totalPrice}
            </span>
            <span
              style={{ borderColor: statusColor, color: statusColor }}
              className={`py-2 px-4 rounded border border-solid font-semibold  capitalize`}
            >
              {OrderStatusEnum[order?.status].text}
            </span>
          </div>
          {order?.status === OrderStatusEnum.DELIVERED.id && !order.Review &&
            <FoodReview
              orderId={order?.id}
              vendorId={order?.Vendor.id}
            />
          }
        </div>
      </CardFooter>
    </Card>
  );
});



OrderCard.displayName = 'OrderCard';

