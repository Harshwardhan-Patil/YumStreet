import { cn } from '@/lib/utils'
import ErrorDisplay from './ErrorDisplay'
import { Input } from '../ui/input'

function CustomText({ formik, name, title, className }) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className='font-medium'>{title}</label>
            <Input id={name} name={name} onChange={formik.handleChange} value={formik.values[name]} type={'text'} className={cn(className)} />
            <ErrorDisplay formik={formik} name={name} />
        </div>
    )
}

export default CustomText