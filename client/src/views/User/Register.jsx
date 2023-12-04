import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom'
import AuthLayout from "@/components/Layout/AuthLayout"
import { axiosApi } from '@/config';
import { route } from "@/constants";
import { cn } from '@/lib/utils';
import CustomInput from '@/components/formik/CustomInput';
import { buttonVariants } from '@/components/ui/button';
import SpinLoader from '@/styles/SpinLoader';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
}

const RegisterValidationSchema = new Yup.ObjectSchema({
  firstname: Yup.string().required("Please enter first name"),
  lastname: Yup.string().required("Please enter last name"),
  email: Yup.string().email('Please enter a valid email address').required("Please enter email address"),
  password: Yup
    .string()
    .min(8, 'Password should be at least 8 characters long')
    .max(20, 'Password should be less than 20 characters long')
    .required("Please enter a password"),
})

function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await axiosApi.post('/users/register', {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        role: 'USER',
      });
      setSubmitting(false);
      resetForm();
      navigate(route.LOGIN);
    } catch (error) {
      if (error instanceof AxiosError)
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
        title={'Create an account'}
        message={'Enter your email below to create your account'}
        callToAction={{ title: "Login", link: route.LOGIN }}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={RegisterValidationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <CustomInput name={"firstname"} title={"First Name"} type={"text"} />
                <CustomInput name={"lastname"} title={"Last Name"} type={"text"} />
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
                    : "Register"}
                </button>
              </Form>
            )
          }}
        </Formik>
      </AuthLayout>
    </>
  )
}

export default Register

