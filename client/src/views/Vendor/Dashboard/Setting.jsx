import * as Yup from 'yup';
import FileUpload from "@/components/common/FileUpload";
import CustomInput from "@/components/formik/CustomInput";
import CustomSelect from "@/components/formik/CustomSelect";
import CustomTextarea from "@/components/formik/CustomTextarea";
import ErrorDisplay from "@/components/formik/ErrorDisplay";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimeSlots } from "@/constants/constants";
import SpinLoader from "@/styles/SpinLoader";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useUpdateVendorProfileQuery, useVendorProfileQuery } from '@/lib/helpers/useVendorQuery';
import { useSelector } from 'react-redux';
import { useUpdateVendorAddress } from '@/lib/helpers/useVendorAddress';
import { Toaster, toastError, toastSuccess } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const tabs = [
    {
        id: 'PROFILE',
        name: 'Profile',
        component: <Profile />
    },
    {
        id: 'ADDRESS',
        name: 'Address',
        component: <Address />
    },
]


function Setting() {
    return (
        <div>
            <Toaster />
            <div className="mb-6">
                <h1 className="mt-2 font-semibold mb-4 text-2xl">Settings</h1>
                <p> Manage your account settings and set e-mail preferences.</p>
            </div>
            <Tabs defaultValue={tabs[0].id}>
                <TabsList>
                    {tabs.map(tab => {
                        return (
                            <TabsTrigger
                                key={tab.id}
                                value={tab.id}
                                className='w-[200px]'
                            >
                                {tab.name}
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
                <div className="border-t  border-neutral-300 py-4 mt-4">
                    {tabs.map((tab, index) =>
                        <TabsContent key={tab.id + index} value={tab.id}>{tab.component}</TabsContent>
                    )}
                </div>
            </Tabs>
        </div>
    )
}

const VendorProfile = {
    name: '',
    description: '',
    openingTime: '',
    closingTime: '',
    images: [],
}


function Profile() {
    const { toast } = useToast()
    const { mutate: updateVendorProfile } = useUpdateVendorProfileQuery();

    const onSubmit = (values, actions) => {
        const formData = new FormData();
        values.images.length > 0 && values.images.map(image => formData.append('images', image));
        for (let key in values) {
            if (values[key] && key !== 'images') {
                formData.append(key, values[key]);
            }
        }
        updateVendorProfile(formData, {
            onSuccess: () => {
                toastSuccess(toast, "Vendor Profile updated successfully");
            },
            onError: (error) => {
                toastError(error, toast)
            },
            onSettled: () => {
                actions.setSubmitting(false);
                actions.resetForm();
            }
        })

    }
    return (
        <div className="px-4">
            <Formik
                initialValues={VendorProfile}
                onSubmit={onSubmit}
            >
                {formik => {
                    return (
                        <Form>
                            <div className="flex gap-10 items-start">
                                <div>
                                    <CustomInput name={'name'} title={'Vendor Name'} type={'text'} />
                                    <CustomTextarea name={'description'} title={'Vendor Description'} />
                                    <div className="flex justify-between gap-4 w-full">
                                        <CustomSelect name={'openingTime'} title={'Opening time'}>
                                            {TimeSlots.map(option => <option key={option.id} value={option.value}>{option.value}</option>)}
                                        </CustomSelect>
                                        <CustomSelect name={'closingTime'} title={'Closing time'} >
                                            {TimeSlots.map(option => <option key={option.id} value={option.value}>{option.value}</option>)}
                                        </CustomSelect>
                                    </div>
                                </div>
                                <div>
                                    <MenuImageFileUpload
                                        className='w-96'
                                        formik={formik}
                                        name={'images'}
                                        size={1}
                                    />
                                </div>
                            </div>
                            <Button type='submit' className='w-[150px]'>
                                {
                                    formik.isSubmitting ?
                                        <SpinLoader
                                            color={"#fff"}
                                            loading={formik.isSubmitting}
                                            marginBlock={'auto'}
                                            size={20} />
                                        : "Update"
                                }
                            </Button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

function MenuImageFileUpload({ className, formik, name, size = 1 }) {
    const [files, setFiles] = useState([]);


    const handleDrop = (event) => {
        event.preventDefault();
        let droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > size) {
            droppedFiles = droppedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        formik.setFieldValue(name, droppedFiles);
    };

    const handleChange = (event) => {
        let openedFiles = Object.values(event.target.files);
        if (openedFiles.length > size) {
            openedFiles = openedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...openedFiles]);
        formik.setFieldValue(name, [...openedFiles]);
    }

    const handleFileRemove = (fileName) => {
        const otherFiles = files.filter(file => !(file.name === fileName));
        setFiles(otherFiles);
        formik.setFieldValue(name, otherFiles)
    }

    return (
        <>
            <label htmlFor={name} className="font-medium">Upload menu item image</label>
            <FileUpload
                name={name}
                size={size}
                files={files}
                handleChange={handleChange}
                handleDrop={handleDrop}
                handleFileRemove={handleFileRemove}
                className={className}
            />
            <ErrorDisplay formik={formik} name={name} />
        </>
    );
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

function Address() {
    const { id } = useSelector(state => state.vendor);
    const { toast } = useToast();
    const { data: vendor } = useVendorProfileQuery({ vendorId: id });
    const { mutate: updateAddress } = useUpdateVendorAddress();

    const onSubmit = (values, actions) => {
        let dataToUpdate = {}
        for (let key in values) {
            if (values[key]) {
                dataToUpdate[key] = values[key]
            }
        }
        updateAddress({ addressId: vendor.AddressId, dataToUpdate }, {
            onSuccess: () => {
                toastSuccess(toast, "Address updated successfully");
            },
            onError: (error) => {
                toastError(error, toast)
            },
            onSettled: () => {
                actions.setSubmitting(false);
                actions.resetForm();
            }
        });

    }
    return (
        <div className="px-4">
            <Formik
                initialValues={updateAddressValues}
                validationSchema={updateAddressValidationSchema}
                onSubmit={onSubmit}
            >
                {formik => {
                    return (
                        <Form className="grid grid-cols-2 gap-4">
                            <CustomInput name={'address'} title={'Address'} type={'text'} />
                            <CustomInput name={'country'} title={'Country'} type={'text'} />
                            <CustomInput name={'city'} title={'City'} type={'text'} />
                            <CustomInput name={'pincode'} title={'Pincode'} type={'text'} />
                            <CustomInput name={'longitude'} title={'Longitude'} type={'number'} />
                            <CustomInput name={'latitude'} title={'Latitude'} type={'number'} />
                            <Button type='submit' className='max-w-[150px]'>
                                {
                                    formik.isSubmitting ?
                                        <SpinLoader
                                            color={"#fff"}
                                            loading={formik.isSubmitting}
                                            marginBlock={'auto'}
                                            size={20} />
                                        : "Update"
                                }
                            </Button>

                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Setting;