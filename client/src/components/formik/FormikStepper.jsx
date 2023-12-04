import React, { createContext, useState, useContext } from 'react'
import { Form, Formik } from "formik"
import { Button } from "@/components/ui/button"
import SpinLoader from "@/styles/SpinLoader"


const FormikContext = createContext();

export const useFormikContext = () => {
    return useContext(FormikContext);
};

export const FormikProvider = ({ children, formik }) => {
    return (
        <FormikContext.Provider value={formik}>
            {children}
        </FormikContext.Provider>
    );
};


export function FormikStep({ children }) {
    return <>{children}</>
}


export function FormikStepper({ children, buttonText = { next: 'Next', final: 'Submit' }, customDisabled = true, ...props }) {
    const [step, setStep] = useState(0);
    const childrenArray = React.Children.toArray(children);
    const currentChild = childrenArray[step];

    const isLastStep = () => {
        return step === childrenArray.length - 1;
    }
    const onSubmit = async (values, actions) => {
        if (isLastStep()) {
            await props.onSubmit(values, actions)
        } else {
            setStep(s => s + 1)
        }
    }
    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (
                    <FormikProvider formik={formik}>
                        <Form>
                            {currentChild}
                            <div className="flex justify-between  gap-4 mt-4">
                                {step > 0 && <Button onClick={() => setStep(step - 1)}>Back</Button>}
                                <Button type='submit' disabled={!customDisabled}>
                                    {
                                        formik.isSubmitting ?
                                            <SpinLoader
                                                color={"#fff"}
                                                loading={formik.isSubmitting}
                                                marginBlock={'auto'}
                                                size={20} />
                                            : isLastStep() ? buttonText.final : buttonText.next
                                    }
                                </Button>
                            </div>
                        </Form>
                    </FormikProvider>
                )
            }}
        </Formik>
    )
}
