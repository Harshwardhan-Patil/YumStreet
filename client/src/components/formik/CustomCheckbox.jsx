import { cn } from '@/lib/utils'
import { ErrorMessage, Field } from 'formik'

function CustomCheckbox({ title, name, className }) {
    return (
        <div className="mb-4">
            <Field id={name} name={name} type={'checkbox'} className={cn(checkbox, className)} />
            <label htmlFor={name} className='font-medium'>{title}</label>
            <ErrorMessage name={name}>{(msg) => <p className="text-destructive text-sm">{msg}</p>}</ErrorMessage>
        </div>
    )
}
const checkbox = `
peer mr-2 h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background 
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50 
data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground

`
export default CustomCheckbox