import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { route } from "@/constants";
import { MenuSquare, Settings } from "lucide-react";
import { Switch } from "../ui/switch";
import { useHandleVendorIsOpenQuery, useVendorProfileQuery } from "@/lib/helpers/useVendorQuery";
import FoodOrderIcon from "@/assets/icon/FoodOrderIcon";
import OrderNotifications from "../common/OrderNotifications";
import { useEffect } from "react";
import { setVendorName } from "@/redux/vendor/slices/vendorSlice";


const items = [
    {
        href: `${route.VENDOR_DASHBOARD}/${route.VENDOR_ORDER}`,
        title: 'Order',
        icon: <FoodOrderIcon className='w-[25px] fill-inherit' />,
    },
    {
        href: `${route.VENDOR_DASHBOARD}/${route.VENDOR_MENU}`,
        title: 'Menu',
        icon: <MenuSquare />,
    },
    {
        href: `${route.VENDOR_DASHBOARD}/${route.VENDOR_SETTINGS}`,
        title: 'Settings',
        icon: <Settings />,
    },
]

function VendorLayout({ children }) {
    const { id, name } = useSelector((state) => state.vendor);
    const { pathname } = useLocation();

    return (
        <main className="flex">
            <nav
                className={cn(
                    "flex border-r w-[225px] border-neutral-200 sticky h-[100vh] top-0 flex-col space-x-0 space-y-1",
                )}
            >
                <div className="p-4 border-b border-neutral-200">
                    <h1 className="capitalize font-bold text-lg">{name || "Vendor Name"}</h1>
                    <VendorOpenSwitch id={id} />
                </div>
                <div className="px-3">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                pathname === item.href
                                    ? "bg-neutral-200 hover:bg-neutral-200"
                                    : "hover:bg-muted text-neutral-600",
                                "justify-start py-4 gap-6 w-full"
                            )}
                        >
                            {item.icon} {item.title}
                        </Link>
                    ))}
                </div>
            </nav>
            <section className="w-full">
                {pathname !== `${route.VENDOR_DASHBOARD}/${route.VENDOR_ORDER_PENDING}` &&
                    <nav>
                        <div className="p-4 flex justify-end">
                            <OrderNotifications />
                        </div>
                    </nav>}
                <div className="pl-12 py-6 w-full">{children}</div>
            </section>
        </main>
    )
}


function VendorOpenSwitch({ id }) {
    const dispatch = useDispatch();
    const { data: vendor } = useVendorProfileQuery({ vendorId: id });
    const { mutate } = useHandleVendorIsOpenQuery();

    useEffect(() => {
        vendor?.name && dispatch(setVendorName(vendor.name))
    }, [vendor])

    return (
        <div className="flex items-center space-x-2 my-2">
            <label htmlFor="isOpen" className="mx-1 font-semibold">
                {vendor?.isOpen ? 'Open' : 'Closed'}
            </label>
            <Switch
                id="isOpen"
                checked={vendor?.isOpen}
                onCheckedChange={(checked) => {
                    mutate({ 'isOpen': checked })
                }}
                className='data-[state=checked]:bg-green-500'
            />
        </div>
    )
}


export default VendorLayout