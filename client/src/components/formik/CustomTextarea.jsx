import { cn } from '@/lib/utils'
import { ErrorMessage, Field } from 'formik'
import ErrorDisplay from './ErrorDisplay'

function CustomTextarea({ title, name, className }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className='font-medium'>{title}</label>
            <Field id={name} name={name} as='textarea' className={cn(`${textarea}`, className)} />
            <ErrorMessage name={name}>{(msg) => <p className="text-destructive text-sm">{msg}</p>}</ErrorMessage>
        </div>
    )
}

export function CustomTextBox({ formik, name, title, className }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className='font-medium'>{title}</label>
            <textarea id={name} name={name} onChange={formik.handleChange} value={formik.values[name]} type={'text'} className={cn(textarea, className)} />
            <ErrorDisplay formik={formik} name={name} />
        </div>
    )
}


const textarea = `
flex min-h-[80px] w-full
rounded-md border border-input bg-background 
px-3 py-2 text-sm 
ring-offset-background placeholder:text-muted-foreground 
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50
`
export default CustomTextarea