import { useEffect, useState } from "react";
import { useSocket } from "@/context/socketContext";
import { EventEnum, OrderStatusEnum } from "@/constants/constants";
import { useVendorOrdersQuery } from "@/lib/helpers/useVendorOrdersQuery";
import { route } from "@/constants";
import { Link } from "react-router-dom";
import { BellRing } from "lucide-react";

function OrderNotifications() {
    const [isConnect, setIsConnected] = useState(false);
    const [isDisconnect, setIsDisconnected] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const { socket } = useSocket();
    const { query: { data } } = useVendorOrdersQuery({ status: OrderStatusEnum.PENDING.id });
    const ordersLen = data?.pages[0]?.data.data.orders.length;

    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsDisconnected(true);
    const onOrderPlaced = () => {
        if (!isConnect || isDisconnect) return;
        setIsOrderPlaced(true);
    }

    useEffect(() => {
        if (ordersLen === 0) {
            setIsOrderPlaced(false);
        }
    }, [ordersLen])

    useEffect(() => {
        if (!socket) return;

        socket.on(EventEnum.CONNECTED_EVENT, onConnect);
        socket.on(EventEnum.DISCONNECT_EVENT, onDisconnect);
        socket.on(EventEnum.ORDER_PLACED_EVENT, onOrderPlaced);

        return () => {
            socket.off(EventEnum.CONNECTED_EVENT, onConnect);
            socket.off(EventEnum.DISCONNECT_EVENT, onDisconnect);
            socket.off(EventEnum.ORDER_PLACED_EVENT, onOrderPlaced);
        }
    }, [socket])
    return (
        <div className='relative'>
            {isOrderPlaced || ordersLen > 0 && <Pulse />}
            <Link to={`${route.VENDOR_DASHBOARD}/${route.VENDOR_ORDER_PENDING}`}><BellRing size={'28px'} /></Link>
        </div>
    )
}

function Pulse() {
    return (
        <span className="absolute top-[-5px] right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
    )
}

export default OrderNotifications;