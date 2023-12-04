import { cn } from "@/lib/utils"
import { ErrorMessage, Field } from "formik"



function CustomSelect({ title, name, className, children }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className='font-medium'>{title}</label>
            <Field as="select" id={name} name={name} className={cn(select, className)} >
                {children}
            </Field>
            <ErrorMessage name={name}>{(msg) => <p className="text-destructive text-sm">{msg}</p>}</ErrorMessage>
        </div>
    )
}

const select = `
flex h-10 my-2 w-[160px] items-center justify-between
rounded-md border border-input bg-background px-3 py-2 text-sm
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50
`
export default CustomSelect