import { useState } from 'react'
import * as Yup from "yup";
import AuthLayout from "@/components/Layout/AuthLayout"
import CustomInput from "@/components/formik/CustomInput"
import CustomSelect from "@/components/formik/CustomSelect"
import CustomTextarea from "@/components/formik/CustomTextarea"
import { route } from "@/constants"
import { TimeSlots, vendor } from "@/constants/constants";
import { axiosApi } from "@/config"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { setRole } from "@/redux/user/slices/authSlice"
import { setVendor } from '@/redux/vendor/slices/vendorSlice';
import FileUpload from '@/components/common/FileUpload';
import { FormikStep, FormikStepper, useFormikContext } from '@/components/formik/FormikStepper';
import { addressValidationSchema } from '@/components/common/AddAddress';
import { useNavigate } from 'react-router-dom';


const initialValues = {
    name: '',
    description: '',
    openingTime: '',
    closingTime: '',
    address: '',
    country: '',
    city: '',
    pincode: '',
    longitude: '',
    latitude: '',
    images: [],
    license: '',
}

const informationValidationSchema = new Yup.ObjectSchema({
    name: Yup.string().required('Please provide a name of the vendor'),
    description: Yup.string().required('Please provide a description of the vendor'),
    openingTime: Yup.string().required('Please provide a opening time of the vendor'),
    closingTime: Yup.string().required('Please provide a closing time of the vendor'),

})

const uploadImageValidationSchema = new Yup.ObjectSchema({
    images: Yup.array().required("Please provide a images").length(5, 'Please provide 5 images'),
    license: Yup.array().required('Please provide a license').length(1, 'Please provide 1  license image')
})

function Register() {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (values, actions) => {
        const formData = new FormData();
        values.images.map(image => formData.append('images', image));
        formData.append('license', values['license'][0]);
        for (let key in values) {
            if (key !== 'images' || key !== 'license') formData.append(key, values[key]);
        }
        try {
            const response = await axiosApi.post('/vendors/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                actions.setSubmitting(false);
                actions.resetForm();
                dispatch(setRole(vendor))
                dispatch(setVendor({
                    id: response.data.data.id,
                    name: response.data.data.name
                }))
                navigate(route.HOME);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: error?.response.data.message || "Something went wrong",
            })
        }
    }
    return (
        <>
            <Toaster />
            <AuthLayout
                callToAction={{ link: route.VENDOR_LOGIN, title: 'Vendor Login' }}
                title={"Create a Vendor Page"}
                message={''}
            >
                <FormikStepper
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    <FormikStep validationSchema={informationValidationSchema}>
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
                    </FormikStep>

                    <FormikStep validationSchema={addressValidationSchema}>
                        <CustomInput name={'address'} title={'Address'} type={'text'} />
                        <CustomInput name={'country'} title={'Country'} type={'text'} />
                        <CustomInput name={'city'} title={'City'} type={'text'} />
                        <CustomInput name={'pincode'} title={'Pincode'} type={'text'} />
                        <CustomInput name={'longitude'} title={'Longitude'} type={'number'} />
                        <CustomInput name={'latitude'} title={'Latitude'} type={'number'} />
                    </FormikStep>

                    <FormikStep validationSchema={uploadImageValidationSchema}>
                        <h2 className="font-medium mb-2">Upload dishes and vendor images</h2>
                        <VendorFileUpload size={5} name={'images'} />
                        <h2 className="font-medium mt-4">Upload license</h2>
                        <VendorFileUpload size={1} name={'license'} />
                    </FormikStep>
                </FormikStepper>
            </AuthLayout>
        </>
    )
}



function VendorFileUpload({ name, size = 1 }) {
    const [files, setFiles] = useState([]);
    const formik = useFormikContext();

    const handleDrop = (event) => {
        event.preventDefault();
        let droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > size) {
            droppedFiles = droppedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        formik.setFieldValue(name, [...files, ...droppedFiles])
    };

    const handleChange = (event) => {
        let openedFiles = Object.values(event.target.files);
        if (openedFiles.length > size) {
            openedFiles = openedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...openedFiles]);
        formik.setFieldValue(name, [...files, ...openedFiles])
    }

    const handleFileRemove = (fileName) => {
        const otherFiles = files.filter(file => !(file.name === fileName));
        setFiles(otherFiles);
        formik.setFieldValue(name, otherFiles)
    }

    return (
        <>
            <FileUpload
                name={name}
                size={size}
                files={files}
                handleChange={handleChange}
                handleDrop={handleDrop}
                handleFileRemove={handleFileRemove}
            />
            {formik.errors[name] && formik.touched[name] && <p className="text-destructive text-sm">{formik.errors[name]}</p>}
        </>
    );
}

export default Register