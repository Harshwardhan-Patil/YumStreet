import SpinLoader from "@/styles/SpinLoader";
import { Button } from "../ui/button";
import CustomInput from "../formik/CustomInput";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { useCreateUserAddress } from "@/lib/helpers/useUserQuery";
import DrawerPanel from "../ui/DrawerPanel";
import { Card, CardContent } from "../ui/card";
import { PlusCircle } from "lucide-react";
import { forwardRef, useRef } from "react";
import { useToast } from "../ui/use-toast";
import { Toaster, toastError, toastSuccess } from "../ui/toaster";

const addressValues = {
    address: '',
    country: '',
    city: '',
    pincode: '',
    longitude: '',
    latitude: '',
}

export const addressValidationSchema = new Yup.ObjectSchema({
    address: Yup.string().required("Please provide a address"),
    country: Yup.string().required("Please provide a country"),
    city: Yup.string().required("Please provide a city"),
    pincode: Yup.string().required("Please provide a pincode").length(6, "Pincode should be 6 characters long"),
    longitude: Yup.number().required("Please provide a longitude").min(-180, "Longitude should be greater than or equal to -180").max(180, "Longitude should be less than or equal to 180"),
    latitude: Yup.number().required("Please provide a latitude").min(-90, "Latitude should be greater than or equal to -90").max(90, "Latitude should be less than or equal to 90"),
})

const AddAddress = forwardRef((props, ref) => {
    const { mutate: createUserAddress, isLoading, isError, error } = useCreateUserAddress();
    const { toast } = useToast();
    function onSubmit(values, actions) {
        createUserAddress(values, {
            onSuccess: () => {
                ref.current.click();
                actions.setSubmitting(false);
                actions.resetForm();
                toastSuccess(toast, "Successfully created address");
            },
            onError: (error) => {
                toastError(error, toast)
            }
        });

    }
    return (
        <>
            <Toaster />
            <Formik
                initialValues={addressValues}
                onSubmit={onSubmit}
                validationSchema={addressValidationSchema}
            >
                <Form className="mt-4" autoComplete="off">
                    <h2 className="font-semibold text-xl mb-4">Create your address</h2>
                    <div className="grid grid-cols-2 gap-2 p-2">
                        <CustomInput name={'address'} title={'Address'} type={'text'} className='max-w-md' />
                        <CustomInput name={'country'} title={'Country'} type={'text'} className='max-w-md' />
                        <CustomInput name={'city'} title={'City'} type={'text'} className='max-w-md' />
                        <CustomInput name={'pincode'} title={'Pincode'} type={'text'} className='max-w-md' />
                        <CustomInput name={'longitude'} title={'Longitude'} type={'number'} className='max-w-md' />
                        <CustomInput name={'latitude'} title={'Latitude'} type={'number'} className='max-w-md' />

                    </div>
                    <Button type='submit' disabled={isLoading}>
                        {isLoading ? <SpinLoader
                            color={"#fff"}
                            loading={isLoading}
                            marginBlock={'auto'}
                            size={15} /> : "Create"}

                    </Button>
                    {isError ? <p className='text-destructive text-sm mt-1'>{error?.response.data.message}</p> : ''}
                </Form>
            </Formik>
        </>
    )

})

export function AddUserAddress() {
    const closeRef = useRef();
    return (
        <div className="flex-1">
            <DrawerPanel
                trigger={AddAddressCard()}
                ref={closeRef}
                full
            >
                <AddAddress ref={closeRef} />
            </DrawerPanel>
        </div>
    )

}

export function AddAddressCard() {
    return (
        <Card className='max-w-[200px] h-[98%] mt-2 cursor-pointer flex flex-col justify-center items-center'>
            <CardContent >
                <div className="w-full px-4 flex flex-col gap-2 items-center">
                    <PlusCircle size={'30px'} />
                    <p className="font-medium">Add Address</p>
                </div>
            </CardContent>
        </Card>
    )
}

AddAddress.displayName = "AddAddress";

export default AddAddress;