/* eslint-disable no-undef */
import React from 'react'
import * as Yup from 'yup'
import { Container } from 'reactstrap'
import GoogleLogin from 'react-google-login'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import ggIcon from 'assets/icons/google-brands.svg'
import twIcon from 'assets/icons/twitter-brands.svg'
import fbIcon from 'assets/icons/facebook-brands.svg'

import actionTypes from 'redux/reducers/user/user.types'
import { login as loginAction, loginByFacebook, loginByGoogle } from 'redux/reducers/user/user.actions'
import { addToast } from 'redux/reducers/toasts/toast.actions'

import './style.css'

const googleAppId = process.env.REACT_APP_GOOGLE_APP_ID
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID

const validate = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .required('Required')
})

const Login = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const isLoading = user?.isLoading
    const isAuthenticated = user?.isAuthenticated

    const handleResponseFacebook = async (response) => {
        dispatch(loginByFacebook(response))
    }

    const handleLogin = (values, { setSubmitting }) => {
        setSubmitting(true)
        dispatch(loginAction(values))
    }

    const handleSuccessResponseGoogle = (res) => {
        const { tokenId } = res
        dispatch(loginByGoogle(tokenId))
    }

    const handleFailureResponseGoogle = (res) => {
        dispatch({
            type: actionTypes.LOG_IN_FAILURE,
        })

        const action = {
            type: 'error',
            message: 'Login is cancelled',
        }
        dispatch(addToast(action))
    }

    return (
        <>
            {
                isAuthenticated ? <Redirect to='/' /> : (
                    <Container id='login' fluid='true' className='vh-100 d-flex justify-content-center align-items-center'>
                        <div className='login__container px-5 py-4'>
                            <h3 className='text-center mb-4 fw-bolder'>Login</h3>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validate}
                                onSubmit={handleLogin}
                            >
                                {(formik) => (

                                    <Form>
                                        <label htmlFor='email' className='d-block label-field mt-3'>Email</label>
                                        <Field name='email' type='email' className='input-field w-100 py-2 rounded small border-0' />
                                        <ErrorMessage name='email' className='text-warning'>{msg => <div className='text-danger small'>{msg}</div>}</ErrorMessage>

                                        <label htmlFor='password' className='d-block label-field mt-3'>Password</label>
                                        <Field name='password' type='password' className='input-field w-100 py-2 rounded small border-0' />
                                        <ErrorMessage name='password' >{msg => <div className='text-danger small'>{msg}</div>}</ErrorMessage>
                                        {isLoading &&
                                            <div className='d-flex justify-content-center mt-2'>
                                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                            </div>
                                        }
                                        <button
                                            type='submit'
                                            className='login__button w-100 py-2 mt-4 rounded fw-bolder border-0'
                                            disabled={(!(formik.isValid && formik.dirty)) || isLoading}
                                        >
                                            Login
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <p className='text-center mt-5 small'>Or Sign Up Using</p>
                            <div className='d-flex justify-content-center'>
                                <FacebookLogin
                                    appId={facebookAppId}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    scope="public_profile,user_friends"
                                    callback={handleResponseFacebook}
                                    render={renderProps => (
                                        <button
                                            className='border-0 bg-transparent mr-3'
                                            onClick={renderProps.onClick}
                                        >
                                            <img src={fbIcon} alt='fb icon' height='30px' width='30px' />
                                        </button>
                                    )}
                                />
                                <button className='border-0 bg-transparent mr-3'>
                                    <img src={twIcon} alt='tw icon' height='30px' width='30px' />
                                </button>
                                <GoogleLogin
                                    clientId={googleAppId}
                                    render={renderProps => (
                                        <button className='border-0 bg-transparent' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <img src={ggIcon} alt='gg icon' height='30px' width='30px' />
                                        </button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={handleSuccessResponseGoogle}
                                    onFailure={handleFailureResponseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <p className='text-center mt-5 small'>Or Sign Up Using</p>
                            <Link className='d-block text-center' to='/signup'>Sign up</Link>
                        </div>
                    </Container>
                )
            }
        </>
    )
}

export default Login