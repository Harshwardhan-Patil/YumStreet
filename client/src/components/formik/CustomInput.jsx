import { cn } from "@/lib/utils"
import { Field, ErrorMessage } from "formik"
import { useRef } from "react"

function CustomInput({ title, name, type, className }) {
    const ref = useRef(null);
    return (
        <div className="mb-4">
            <label htmlFor={name} className='font-medium'>{title}</label>
            <Field ref={ref} onFocus={() => ref.current.click()} id={name} name={name} type={type} className={cn(`${input}`, className)} />
            <ErrorMessage name={name}>{(msg) => <p className="text-destructive text-sm">{msg}</p>}</ErrorMessage>
        </div>
    )
}

const input = `
flex h-10 w-full 
rounded-md border border-input bg-background 
px-3 py-2 text-sm my-1
ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
disabled:cursor-not-allowed disabled:opacity-50
`

export default CustomInput