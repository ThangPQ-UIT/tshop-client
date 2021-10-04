import React from 'react'
import { useField } from 'formik'

import './style.css'

const FormField = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <>
            <label htmlFor={props.id || props.name} className='d-block label-field mt-3'>{label}</label>
            <input className="text-inputs input-field w-100 py-2 rounded small border-0'" {...field} {...props} />
            {meta.touched && meta.error ? (
                <span>{meta.error}</span>
            ) : null}
        </>
    )
}

export default FormField