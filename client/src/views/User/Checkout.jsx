import * as Yup from "yup";
import { Toaster, toastError } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { FormikStep, FormikStepper, useFormikContext } from '@/components/formik/FormikStepper';
import AddressSkeleton from "@/components/Skeleton/AddressSkeleton";
import ShowAddress from "@/components/common/ShowAddress";
import { AddUserAddress } from "@/components/common/AddAddress";
import { useUserAddress, useUserAddresses } from "@/lib/helpers/useUserQuery";
import { cartQueryKey, useCartQuery } from "@/lib/helpers/useCartQuery";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ErrorDisplay from "@/components/formik/ErrorDisplay";
import CartBox from "@/components/common/CartBox";
import PriceDetailCard from "@/components/common/PriceDetailCard";
import { useVendorProfileQuery } from "@/lib/helpers/useVendorQuery";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { route } from "@/constants";
import { axiosApi } from "@/config";
import { useQueryClient } from "react-query";
import { AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { forwardRef, useRef } from "react";
import Celebration from '@/assets/celebrationOver.gif';


const initialValues = {
    addressId: '',
}

const addressValidationSchema = new Yup.ObjectSchema({
    addressId: Yup.string().required('Please select an existing address or add a new one for delivery')
})

function Checkout() {
    const orderCompleteRef = useRef(null);
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: cartItems, isCartItemsLoading } = useCartQuery({ isOptions: true });
    const userAndAddress = useUserAddresses({ user: true });
    const { data: vendor, isLoading: isVendorLoading } = useVendorProfileQuery({ vendorId: cartItems && cartItems[0]?.Cart?.vendorId });

    const initPayment = (data) => {
        const description = `Payment to vendor:${vendor?.name} from user:${userAndAddress.data.firstName}_${userAndAddress.data.lastName}`
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            description,
            order_id: data.id,
            handler: async (response) => {
                try {
                    const { data } = await axiosApi.post(`/users/order/verify`, response);
                    if (data.statusCode === 200) {
                        queryClient.invalidateQueries({ queryKey: [cartQueryKey] })
                        orderCompleteRef.current.click();
                    }
                } catch (error) {
                    toastError(error, toast, null);
                }
            },
            theme: '#3399cc'
        }

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }
    const onSubmit = async (values, actions) => {
        if (!userAndAddress.data.phoneNumber) {
            toastError(null, toast, `Please update your profile with a phone number before placing the order.`)
            return;
        }
        if (!vendor.isOpen) {
            toastError(null, toast, `${vendor?.name} is closed right now. Please check back later for their delightful offerings!`);
        }
        try {
            const data = { addressId: values.addressId, vendorId: vendor?.id };
            const response = await axiosApi.post(`/users/order`, data);
            if (response.data.statusCode === 201) {
                initPayment(response.data.data);
                actions.setSubmitting(false);
            }
        } catch (error) {
            toastError(error, toast, null);
        }

    }
    if (!cartItems && !isCartItemsLoading) {
        return navigate('/');
    }
    return (
        <>
            <Toaster />
            {!vendor?.isOpen && !isVendorLoading && <VendorClosedError vendor={vendor} />}
            <main className="m-section">
                <section>
                    <div className="flex gap-4">
                        <div className="flex-1 rounded max-w-2xl border border-neutral-200 p-2">
                            <FormikStepper
                                onSubmit={onSubmit}
                                initialValues={initialValues}
                                buttonText={{ next: 'Next', final: 'Place Order' }}
                                customDisabled={vendor?.isOpen}
                            >
                                <FormikStep validationSchema={addressValidationSchema}>
                                    <Address userAndAddress={userAndAddress} />
                                </FormikStep>

                                <FormikStep>
                                    <OrderSummary cartItems={cartItems} />
                                </FormikStep>
                            </FormikStepper>
                        </div>
                        <div className="flex-1 max-w-[250px]">
                            <PriceDetailCard cartItems={cartItems} />
                        </div>
                    </div>
                </section>
            </main >
            <OrderCompleted url={`/user/${userAndAddress.data?.id}/${route.USER_ORDERS}`} ref={orderCompleteRef} />
        </>
    )
}


function Address({ userAndAddress }) {
    const formik = useFormikContext();
    const handleAddressSelection = (id) => {
        formik.setFieldValue('addressId', id);
    }
    return (
        userAndAddress.isLoading || !userAndAddress.data ? <AddressSkeleton /> :
            <div>
                <div className="flex flex-wrap gap-4">
                    {userAndAddress.data && userAndAddress.data?.address.map(address => {
                        return (
                            <div
                                key={address.id} onClick={() => handleAddressSelection(address.id)}
                                className="relative flex gap-4 flex-wrap"
                            >
                                <div
                                    className={`${address.id === formik.values.addressId ? 'block z-50' : 'hidden z-10'} absolute top-0 right-[-10px]`}>
                                    <CheckCircleIcon className="w-8 fill-green-600" />
                                </div>
                                <ShowAddress
                                    user={userAndAddress.data}
                                    address={address}
                                    show={{ header: false, footer: false }}
                                    className={`${address.id === formik.values.addressId ? 'border-green-600' : 'border-muted'} hover:border-green-300 relative z-10 cursor-pointer`}
                                />
                            </div>
                        )
                    })}
                    <AddUserAddress />
                </div>
                <ErrorDisplay formik={formik} name={'addressId'} />
            </div>

    )
}

function OrderSummary({ cartItems }) {
    const formik = useFormikContext();
    const { data: userAndAddress, isLoading } = useUserAddress({ user: true, addressId: formik.values.addressId });

    return (
        isLoading ? <AddressSkeleton /> :
            <div className="flex flex-col gap-4">
                <ShowAddress
                    address={userAndAddress}
                    show={{ header: true, footer: false }}
                    title={'Delivery Address'}
                    className={'max-w-full'}
                />
                <div className="flex-1 rounded max-w-2xl border shadow-sm border-neutral-200 p-4">
                    <h2 className="font-semibold text-xl mb-4">Delivery Items</h2>
                    {cartItems?.map((item) => {
                        return (
                            <CartBox key={item.id} item={item} />
                        )
                    })}
                </div>
            </div>
    )
}

const OrderCompleted = forwardRef(({ url }, ref) => {
    const navigate = useNavigate();
    return (
        <AlertDialog>
            <AlertDialogTrigger ref={ref} className='hidden'></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex justify-center'>
                        <div className="max-w-[300px]">
                            <img src={Celebration} className="w-full h-full" alt="" />
                        </div>
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="text-center">
                            <h2 className="font-bold text-2xl text-neutral-800">Your Order is Complete</h2>
                            <p>Thank you for your order! Enjoy your meal! 😊</p>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='my-6 !justify-center'>
                    <AlertDialogAction
                        onClick={() => navigate(url)}
                        className='bg-transparent font-semibold px-8 text-base text-green-600 border border-green-600 hover:bg-transparent'
                    >
                        View Order
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
});

OrderCompleted.displayName = 'OrderCompleted';

function VendorClosedError({ vendor }) {
    return (
        <div className="mx-section max-w-2xl p-4 border border-neutral-300 rounded my-2">
            <h1 className="font-semibold text-red-500 text-xl py-2 capitalize">{vendor?.name} - Currently Closed</h1>
            <div className="flex gap-2 items-start">
                <ExclamationCircleIcon className="w-6 fill-white stroke-red-600" />
                <p className="font-medium text-neutral-600">Oops! It seems the <span className="capitalize">{vendor?.name}</span> is closed right now. Please check back later for their delightful offerings!</p>
            </div>
            <Button className='w-fit mt-4 bg-red-500 hover:bg-red-600'>
                <Link to={route.HOME} className='w-full flex justify-between gap-2 items-center  group'>
                    <span>Explore Foods items</span>
                </Link>
            </Button>
        </div>
    )
}
export default Checkout;
