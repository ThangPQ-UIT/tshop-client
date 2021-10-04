import React from 'react'
import * as Yup from 'yup'
import { Container } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import axiosInstance from 'api'
import { addToast } from 'redux/reducers/toasts/toast.actions'

import './style.css'

const Signup = () => {

    console.log('signup')
    const history = useHistory()
    const dispatch = useDispatch()

    const validate = Yup.object({
        name: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Must be 6 characters or more')
            .required('Required')
    })

    const handleSignup = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true)
            const { name, email, password } = values
            const bodyPost = {
                name,
                email,
                password
            }
            await axiosInstance.post('/user/authenticate/signup', bodyPost)

            history.push('/login')
        } catch (err) {
            const { errorMessage } = err.response.data
            const action = {
                type: 'error',
                message: errorMessage,
            }

            dispatch(addToast(action))
        }
    }

    return (
        <Container id='signup' fluid='true' className='vh-100 d-flex justify-content-center align-items-center'>
            <div className='signup__container px-5 py-5'>
                <h3 className='text-center mb-4 fw-bolder'>Sign up</h3>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '' }}
                    validationSchema={validate}
                    onSubmit={handleSignup}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <label htmlFor='name' className='d-block label-field mt-3'>Name</label>
                                <Field name='name' type='text' className='input-field w-100 py-2 rounded small border-0 border-bottom' />
                                <ErrorMessage name='name' className='text-warning' />

                                <label htmlFor='email' className='d-block label-field mt-3'>Email</label>
                                <Field name='email' type='email' className='input-field w-100 py-2 rounded small border-0 border-bottom' />
                                <ErrorMessage name='email' className='text-warning' />

                                <label htmlFor='password' className='d-block label-field mt-3'>Password</label>
                                <Field name='password' type='password' autoComplete='on' className='input-field w-100 py-2 rounded small border-0 border-bottom' />
                                <ErrorMessage name='password' className='text-danger' />

                                <button
                                    type='submit'
                                    className='login__button w-100 py-2 mt-4 rounded fw-bolder border-0'
                                    disabled={((!(formik.isValid && formik.dirty)) || formik.isSubmitting)}
                                >
                                    Sign up
                                </button>
                                <p className='text-center pt-4 pb-0'>
                                    <span>Already have an account </span>
                                    <Link className='d-inline-block' to='/login'> Login</Link>
                                </p>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </Container>
    )
}

export default Signup