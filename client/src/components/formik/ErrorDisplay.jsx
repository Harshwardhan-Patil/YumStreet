
function ErrorDisplay({ formik, name }) {
    return (
        formik.errors[name] && formik.touched[name] ? (<p className='text-destructive my-1 text-sm'>{formik.errors[name]}</p>) : null
    )
}

export default ErrorDisplay