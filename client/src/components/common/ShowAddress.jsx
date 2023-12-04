import { Separator } from "@radix-ui/react-separator";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import * as Yup from 'yup';
import { useDeleteUserAddress, useUpdateUserAddress } from "@/lib/helpers/useUserQuery";
import { useRef } from "react";
import DrawerPanel from "../ui/DrawerPanel";
import { Form, Formik } from "formik";
import { Button } from "../ui/button";
import CustomInput from "../formik/CustomInput";
import SpinLoader from "@/styles/SpinLoader";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { cn } from "@/lib/utils";


function ShowAddress({ user, address, show = { header: true, footer: true }, className, title = 'Address' }) {
    return (
        <Card className={cn("max-w-xs mt-2", className)} >
            {show.header && <CardHeader>
                <CardTitle className='text-xl'>{user ? `${user.firstname} ${user.lastname}` : title}</CardTitle>
            </CardHeader>}
            <CardContent className='capitalize py-2'>
                <p>{address.address}</p>
                <p>{address.city}</p>
                <p>{address.county}</p>
                <p>{address.pincode}</p>
                {user && <p>Phone Number: {user.phoneNumber}</p>}
            </CardContent>
            {show.footer && <CardFooter>
                <EditAddress address={address} />
                <Separator orientation="vertical" className='mx-2 w-[1px] bg-gray-400 h-6' />
                <DeleteAddress addressId={address.id} />
            </CardFooter>}
        </Card>
    )
}

const updateAddressValues = {
    address: '',
    country: '',
    city: '',
    pincode: '',
    longitude: '',
    latitude: '',
}

const updateAddressValidationSchema = new Yup.ObjectSchema({
    address: Yup.string(),
    country: Yup.string(),
    city: Yup.string(),
    pincode: Yup.string().length(6, "Pincode should be 6 characters long"),
    longitude: Yup.number().min(-180, "Longitude should be greater than or equal to -180").max(180, "Longitude should be less than or equal to 180"),
    latitude: Yup.number().min(-90, "Latitude should be greater than or equal to -90").max(90, "Latitude should be less than or equal to 90"),
})

function EditAddress() {
    const closeRef = useRef(null);

    const { mutate: updateUserAddress, isLoading, isError, error } = useUpdateUserAddress();

    async function onSubmit(values, actions) {
        let data = {};
        for (let element in values) {
            if (values[element]) {
                data[element] = values[element];
            }
        }

        if (Object.keys(data).length === 0) return;
        updateUserAddress(data);
        actions.setSubmitting(false);
        actions.resetForm();
        setTimeout(() => closeRef.current.click(), 1000);
    }
    return (
        <DrawerPanel trigger={<Button>Edit</Button>} ref={closeRef}>
            <Formik
                initialValues={updateAddressValues}
                onSubmit={onSubmit}
                validationSchema={updateAddressValidationSchema}
            >
                <Form>
                    <div className="grid grid-cols-2 gap-2">
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
                            size={15} /> : "Update"}

                    </Button>
                    {isError ? <p className='text-destructive text-sm mt-1'>{error?.response.data.message}</p> : ''}
                </Form>
            </Formik>
        </DrawerPanel>
    )
}

function DeleteAddress({ addressId }) {
    const actionRef = useRef(null);
    const { mutate: deleteUserAddress, isLoading, } = useDeleteUserAddress();

    const handleAddressDelete = () => {
        deleteUserAddress(addressId,
            {
                onSuccess: () => actionRef.current.click()
            }
        )
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger><Button>Delete</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are You Sure You Want to Delete Address?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {"Are you sure you want to delete this address? This action is irreversible and will remove the address from your account. Please confirm your choice to proceed"}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={handleAddressDelete} disabled={isLoading}>
                        {isLoading
                            ? <SpinLoader
                                color={"#fff"}
                                loading={isLoading}
                                marginBlock={'auto'}
                                size={15} />
                            : "Confirm"
                        }
                    </Button>
                    <AlertDialogAction className='hidden' ref={actionRef} />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}


export default ShowAddress;