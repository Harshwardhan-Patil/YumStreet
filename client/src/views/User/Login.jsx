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
import { userLogin } from "@/redux/user/api/authApi";
import { Toaster, toastError } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";



const initialValues = {
  email: '',
  password: '',
}

const LoginValidationSchema = new Yup.ObjectSchema({
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
      const user = await userLogin(dispatch, {
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
      toastError(error, toast, null);
    }
  }
  return (
    <>
      <Toaster />
      <AuthLayout
        title={'Welcome Back! Login to Your Account'}
        message={'Enter your email and password below to login to your account'}
        callToAction={{ title: "Register", link: route.REGISTER }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={LoginValidationSchema}
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