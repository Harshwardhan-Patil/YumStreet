import CustomInput from "@/components/formik/CustomInput"
import DrawerPanel from "@/components/ui/DrawerPanel"
import { Button } from "@/components/ui/button"
import SpinLoader from "@/styles/SpinLoader"
import { Formik, Form, ErrorMessage } from "formik"
import { Salad } from "lucide-react"
import { useRef, useState } from "react"
import * as Yup from 'yup';
import FileUpload from "./FileUpload"
import CustomTextarea from "../formik/CustomTextarea"
import ErrorDisplay from "../formik/ErrorDisplay"
import CustomCheckbox from "../formik/CustomCheckbox"
import { Toaster, toastSuccess } from "../ui/toaster"
import { ChevronUpDownIcon } from "@heroicons/react/24/solid"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useSearchCategoryQuery } from "@/lib/helpers/useMenuQuery"
import { axiosApi } from "@/config"
import { useToast } from "../ui/use-toast"
import { useSelector } from "react-redux"
import { useQueryClient } from "react-query"


const initialValues = {
    name: '',
    description: '',
    isVeg: false,
    inStock: false,
    price: 0,
    categoryId: '',
    image: []
}

const addMenuValidationSchema = new Yup.ObjectSchema({
    name: Yup.string().required("Please provide a menu item name"),
    description: Yup.string().required("Please provide a menu item description"),
    isVeg: Yup.boolean().required("Please provide a menu item veg category"),
    inStock: Yup.boolean().required("Please provide a menu item veg category"),
    price: Yup.number().required("Please provide a menu item price").min(1, "please provide a reasonable price"),
    image: Yup.array().required("Please provide a menu item image").length(1, 'Please upload a menu item image. You can upload a maximum of 1 image.'),
})
function AddMenu() {
    const closeRef = useRef(null);
    const { toast } = useToast();
    const { id } = useSelector(state => state.vendor);
    const client = useQueryClient(); //* for temporary purposes only

    async function onSubmit(values, actions) {
        const formData = new FormData();
        formData.append('image', values['image'][0]);
        formData.append('vendorId', id)
        for (let key in values) {
            key !== 'image' && formData.append(key, values[key]);
        }
        try {
            const response = await axiosApi.post(
                '/vendors/menu/items',
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.data.statusCode === 201) {
                toastSuccess(toast, response?.data.message || 'Menu item added successfully');
                client.refetchQueries('menuItemQueryKey');
                actions.setSubmitting(false);
                actions.resetForm();
                setTimeout(() => closeRef.current.click(), 1000);
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
            <DrawerPanel
                trigger={
                    <Button className='fixed rounded-md z-40 bottom-4 left-1/2 bg-blue-500 hover:bg-blue-600' >
                        <Salad />
                        <span className='ml-1'>Add menu</span>
                    </Button>
                }
                ref={closeRef}
                full
            >
                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={addMenuValidationSchema}
                >
                    {formik => {
                        return (
                            <Form autoComplete="off" className="z-[100] gap-10 flex justify-between">
                                <div className='flex-1'>

                                    <CustomInput name={'name'} title={'Name'} type={'text'} />
                                    <CustomTextarea name={'description'} title={'Description'} />
                                    <div className="flex justify-between gap-2 my-2">
                                        <div className="flex items-center space-x-2">
                                            <CustomCheckbox name={'isVeg'} title={'Is this item vegetarian?'} />
                                            <ErrorMessage name={'isVeg'} />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CustomCheckbox name={'inStock'} title={'is it currently in stock?'} />
                                            <ErrorMessage name={'inStock'} />
                                        </div>
                                    </div>
                                    <CustomInput name={'price'} title={'Price'} type={'number'} />
                                    <Button type='submit' disabled={formik.isSubmitting}>
                                        {formik.isSubmitting ? <SpinLoader
                                            color={"#fff"}
                                            loading={formik.isSubmitting}
                                            marginBlock={'auto'}
                                            size={15} /> : "Add"}

                                    </Button>
                                </div>
                                <div className="flex-1">
                                    <SelectCategory formik={formik} name={'categoryId'} />
                                    <MenuImageFileUpload formik={formik} name={'image'} size={1} />
                                </div>
                            </Form>
                        )
                    }}

                </Formik>
            </DrawerPanel>
        </>
    )
}

function SelectCategory({ formik, name }) {
    const [category, setCategory] = useState('');

    const { data: menus, isLoading } = useSearchCategoryQuery({ query: category })
    return (
        <div className="my-2">
            <Popover >
                <PopoverTrigger className="w-full text-left">
                    <label htmlFor='select-category' className="font-medium">Select Food Category</label>
                    <div className="relative flex h-10 w-full rounded-md border border-input bg-background text-sm my-1">
                        <input
                            id="select-category"
                            className="h-10 w-full px-3 capitalize"
                            name={name}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <ChevronUpDownIcon width={'30px'} className="absolute top-1 right-0" />
                    </div>
                    <ErrorDisplay formik={formik} name={name} />
                </PopoverTrigger>
                {menus && <PopoverContent align="start" sideOffset={8} className="w-full">
                    <div className='grid grid-cols-4 gap-2'>
                        {isLoading
                            ? <SpinLoader
                                color={"#fff"}
                                loading={isLoading}
                                marginBlock={'auto'}
                                size={15} />
                            : menus?.map(menu => {
                                return (
                                    <p
                                        key={menu.id}
                                        onClick={() => {
                                            setCategory(menu.name);
                                            formik.setFieldValue('categoryId', menu.id);
                                        }}
                                        className='flex capitalize cursor-pointer justify-between px-3 py-2 hover:bg-neutral-200'
                                    >
                                        {menu.name}
                                    </p>
                                )
                            })}
                    </div>
                </PopoverContent>}
            </Popover>
        </div>
    )
}


function MenuImageFileUpload({ formik, name, size = 1 }) {
    const [files, setFiles] = useState([]);


    const handleDrop = (event) => {
        event.preventDefault();
        let droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > size) {
            droppedFiles = droppedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
        formik.setFieldValue('image', [...droppedFiles])
    };

    const handleChange = (event) => {
        let openedFiles = Object.values(event.target.files);
        if (openedFiles.length > size) {
            openedFiles = openedFiles.slice(0, size);
        }
        setFiles((prevFiles) => [...prevFiles, ...openedFiles]);
        formik.setFieldValue('image', [...openedFiles])
    }

    const handleFileRemove = (fileName) => {
        const otherFiles = files.filter(file => !(file.name === fileName));
        setFiles(otherFiles);
        formik.setFieldValue('image', otherFiles)
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
            />
            <ErrorDisplay formik={formik} name={name} />
        </>
    );
}


export default AddMenu;