import { Form, Formik } from "formik"
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AuthLayout from "@/components/Layout/AuthLayout"
import CustomInput from "@/components/formik/CustomInput"
import { buttonVariants } from "@/components/ui/button"
import { route } from "@/constants"
import { cn } from "@/lib/utils"
import SpinLoader from "@/styles/SpinLoader"
import { vendorLogin } from "@/redux/vendor/api/vendorAuthApi";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";



const initialValues = {
    email: '',
    password: '',
}

const RegisterValidationSchema = new Yup.ObjectSchema({
    email: Yup.string().email('Provide valid email address').required("Required"),
    password: Yup
        .string()
        .min(8, 'Password should be at least 8 characters long')
        .max(20, 'Password should be less than 20 characters long')
        .required("Required"),
})


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const onSubmit = async (values, { setErrors, setSubmitting }) => {
        try {
            const user = await vendorLogin(dispatch, {
                email: values.email,
                password: values.password,
            });
            setSubmitting(false);
            if (user?.status === 200) {
                return navigate(route.HOME);
            }
            if (!user.response) return;
            if (user?.response.status === 404)
                setErrors({ 'email': user.response.data.message })
            else if (user?.response.status === 401) {
                setErrors({ 'password': user.response.data.message })
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
                title={'Welcome Back! Login to Your vendor Account'}
                message={'Enter your email and password below to login to your vendor account'}
                callToAction={{ title: "Register Vendor", link: route.VENDOR_REGISTER }}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={RegisterValidationSchema}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <CustomInput name={"email"} title={"Email"} type={"email"} />
                                <CustomInput name={"password"} title={"Password"} type={"password"} />
                                <button
                                    type='submit'
                                    className={cn(buttonVariants({ variant: "default" }), 'w-full')}
                                    disabled={!(formik.isValid) || formik.isSubmitting}
                                >
                                    {formik.isSubmitting
                                        ? <SpinLoader
                                            color={"#fff"}
                                            loading={formik.isSubmitting}
                                            marginBlock={'auto'}
                                            size={20} />
                                        : "Login"}
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
            </AuthLayout>
        </>
    )
}

export default Login