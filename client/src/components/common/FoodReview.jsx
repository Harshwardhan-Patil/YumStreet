import { Button } from "@/components/ui/button";
import DrawerPanel from "@/components/ui/DrawerPanel";
import { Drawer } from "vaul";
import { Form, Formik } from "formik";
import CustomTextarea from "@/components/formik/CustomTextarea";
import SpinLoader from "@/styles/SpinLoader";
import { Star, X } from "lucide-react";
import { useRef, useState } from "react";
import * as Yup from 'yup';
import { Toaster, toastError, toastSuccess } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
import { axiosApi } from "@/config";
import { useQueryClient } from "react-query";
import { UserOrderQueryKey } from "@/lib/helpers/useUserOrders";


const initialValues = {
    rating: 0,
    comment: '',
}

const profileValidationSchema = new Yup.ObjectSchema({
    rating: Yup.number().required('Please provide a rating'),
    comment: Yup.string().required("Please provide a comment").max(150, "150 characters max. Please shorten your review."),
})

function FoodReview({ vendorId, orderId }) {
    const { toast } = useToast();
    const closeRef = useRef(null);
    const queryClient = useQueryClient();
    const onSubmit = async (values, actions) => {
        const data = {
            ...values,
            vendorId,
            orderId,
        }
        try {
            const response = await axiosApi.post('/users/review', data);
            if (response.data.success) {
                queryClient.invalidateQueries({ queryKey: [UserOrderQueryKey] })
                toastSuccess(toast, "Thanks for your review! We value your feedback.");
                closeRef.current.click();
                actions.setSubmitting(false);
                actions.resetForm();
            }
        } catch (error) {
            toastError(error, toast);
        }
    }
    return (
        <>
            <Toaster />
            <DrawerPanel
                trigger={<Button className='bg-[#365c7d] hover:bg-[#365c8e]'>Review Your Meal</Button>}
                ref={closeRef}
            >
                <div className="max-w-md mx-auto">
                    <Drawer.Title className="font-medium mb-4 text-2xl">
                        Create Review
                    </Drawer.Title>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={profileValidationSchema}
                    >
                        {formik => {
                            return (
                                <Form autoComplete='off'>
                                    <RatingStars formik={formik} />
                                    <CustomTextarea
                                        name={'comment'}
                                        title={'Tell Us More About Your Meal'}
                                    />
                                    <Button type='submit' disabled={false}>
                                        {formik.isSubmitting ? <SpinLoader
                                            color={"#fff"}
                                            loading={formik.isSubmittings}
                                            marginBlock={'auto'}
                                            size={15} /> : "Submit"}

                                    </Button>
                                </Form>
                            )
                        }}

                    </Formik>
                </div>
            </DrawerPanel>
        </>
    )
}

function RatingStars({ formik }) {
    const [rating, setRating] = useState(0);
    const handleRating = (rate) => {
        setRating(rate);
        formik.setFieldValue('rating', rate);
    }

    const handleCancelRating = () => {
        setRating(0);
        formik.setFieldValue('rating', 0);
    }
    return (
        <div className="relative mb-6">
            <h2 className="font-semibold">Overall Rating</h2>
            <div className="flex gap-2 my-4">
                {Array(5).fill(0).map((value, index) => {
                    return (
                        <Star
                            style={{
                                fill: `${index + 1 <= rating ? '#facc15' : 'transparent'}`,
                                stroke: `${index + 1 <= rating ? '#facc15' : '#bfbfbf'}`
                            }}
                            key={index}
                            size={'40px'}
                            className="cursor-pointer fill-yellow-400 stroke-yellow-400"
                            onClick={() => handleRating(index + 1)}
                            onMouseOver={() => handleRating(index + 1)}
                        />)
                })}
            </div>
            {rating > 0 &&
                <div title="set to default"
                    className="absolute top-2 right-0 cursor-pointer"
                    onClick={handleCancelRating}
                >
                    <X size={'20px'} />
                </div>
            }
        </div>
    )
}

export default FoodReview;