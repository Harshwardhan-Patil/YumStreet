import AddMenu from "@/components/common/AddMenu"
import MenuSkeleton from "@/components/Skeleton/MenuSkeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { route } from "@/constants";
import { CURRENCY_INR } from "@/constants/constants";
import { useHandleMenuStockQuery, useMenusQuery } from "@/lib/helpers/useMenuQuery";
import { useSelector } from "react-redux"
import VegIcon from '@/assets/icon/veg-icon.svg'
import NoNVegIcon from '@/assets/icon/non-veg-icon.svg'


function Menu() {
    return (
        <div>
            <MenuCards />
            <AddMenu />
        </div>
    )
}

function MenuCards() {
    const { id } = useSelector((state) => state.vendor);
    const { data: menus, isLoading } = useMenusQuery({ vendorId: id })
    const { mutate: updateStock } = useHandleMenuStockQuery();

    return (
        <div>
            <div>
                {isLoading
                    ? <MenuSkeleton row={4} column={4} />
                    : menus?.map((menu) => {
                        return (
                            <div key={menu?.id}>
                                <div className="bg-muted p-4">
                                    <h2 className="capitalize text-lg font-semibold">{menu?.name}</h2>
                                </div>
                                <div className="my-4 grid grid-cols-4 gap-4">
                                    {menu?.menuItems?.map((item) => {
                                        return (
                                            <Card key={item?.id} className='border-neutral-300 shadow'>
                                                <CardHeader className='p-4'>
                                                    <CardTitle>
                                                        <div className="w-full h-full max-h-[180px]">
                                                            <img className="w-full h-full max-h-[180px] object-cover rounded-md aspect-square" src={`${route.API}/${item?.image.localPath}`} alt="" />
                                                        </div>
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className='relative'>
                                                    <img className="w-4 h-6 absolute top-2 right-4" src={item.isVeg ? VegIcon : NoNVegIcon} alt="" />
                                                    <p className="capitalize font-semibold">{item.name}</p>
                                                    <p className="capitalize font-medium text-sm">price: {item?.price} {CURRENCY_INR} </p>
                                                </CardContent>
                                                <CardFooter>
                                                    <div className="flex items-center space-x-2 my-2">
                                                        <Switch
                                                            id="inStock"
                                                            checked={item.inStock}
                                                            onCheckedChange={(checked) => {
                                                                updateStock({ itemId: item.id, 'inStock': checked })
                                                            }}
                                                            className='data-[state=checked]:bg-sky-700 mt-0.5'
                                                        />
                                                        <label htmlFor="isOpen" className="mx-1 font-semibold">
                                                            {item.inStock ? "In Stock" : "Out of Stock"}
                                                        </label>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div >
    )
}



export default Menu
// const h = [
//     {
//         id: 'd0da9bcc-3ed3-4a32-b536-a2d919b06772',
//         name: 'misal pav',
//         description:
//             'A savory dish made from a spicy gravy of sprouts, potatoes, and spices served with bread.',
//         image: { localPath: 'public\images\misal_pav1698590416615847501.jpg' },
//         createdAt: '2023-10-29T14:40:17.385Z',
//         updatedAt: '2023-10-29T14:40:17.385Z',
//         menuItems: [
//             {
//                 id: 'b1a663ce-b46a-4824-be9b-b73f01e6e384',
//                 name: 'misal bread (kolhapuri misal)',
//                 description:
//                     'Kolhapuri misal pav is the spiciest version of misal pav. It\'s usually served with sliced bread instead of pav. The moth bean curry and red/green gravy are served separately.',
//                 isVeg: true,
//                 inStock: true,
//                 price: '80.00',
//                 image: {
//                     localPath: 'public\images\thombare-misal-31698653933562832643.jpg'
//                 },
//                 createdAt: '2023-10-30T08:18:54.049Z',
//                 updatedAt: '2023-10-30T08:18:54.049Z',
//                 vendorId: 'b7cb6f6d-0394-44b8-9fa9-765b77afcef1',
//                 categoryId: 'd0da9bcc-3ed3-4a32-b536-a2d919b06772'
//             }
//         ]
//     }
// ]