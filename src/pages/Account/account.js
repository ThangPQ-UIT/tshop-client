/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Col, Container, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import axiosInstance from 'api'
import { update } from 'redux/reducers/user/user.actions'
import { addToast } from 'redux/reducers/toasts/toast.actions'
import { logout as logOutAction } from 'redux/reducers/user/user.actions'

import setHeightMainContent from 'utilities/setHeightMainContent'

const locationAPI = process.env.REACT_APP_LOCATION_API
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Account = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const isAuthenticated = user?.isAuthenticated

    const [height, setHeight] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [locationData, setLocationData] = useState()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: ''

    })
    const [wardList, setWardList] = useState()
    const [districtList, setDistrictList] = useState()

    useEffect(() => {
        setHeightMainContent(setHeight)
    }, [])

    useEffect(() => {
        setData()
        handleLocationData()
    }, [])

    const getData = async () => {
        try {
            const response = await axiosInstance.get('/user')
            const { data } = response

            return data
        } catch (error) {
            const { status } = error.response
            if (status === 403) {
                dispatch(logOutAction())
                history.push('/login')
            }
        }
    }

    const setData = async () => {
        try {
            const data = await Promise.all([getData(), axios.get(locationAPI)])
            const userData = data[0]
            const locations = data[1]

            const name = userData?.name
            const email = userData?.email
            const address = userData?.address
            const phoneNumber = userData?.phoneNumber

            const city = address?.city
            const ward = address?.ward
            const street = address?.street
            const district = address?.district

            // update values to location options, based on data from the server
            if (city) {
                const cityData = locations.data.find(location => location.name === city)
                const { districts } = cityData
                setDistrictList(districts)
                if (district) {
                    const districtData = districts.find(dtr => dtr.name === district)
                    const { wards } = districtData
                    setWardList(wards)
                }
            }

            setFormData({
                ...formData,
                name,
                email,
                phoneNumber,
                city,
                district,
                ward,
                street
            })
        } catch (error) {
            console.log('error: ', error)
        } finally {
            setIsLoaded(true)
        }
    }

    const handleLocationData = async () => {
        try {
            const response = await axios.get(locationAPI)
            const { data } = response
            setLocationData(data)

        } catch (error) {
            console.log('error: ', error)
        }
    }

    const customHandleChange = (event) => {
        const { value, name } = event.target

        if (name === 'city') {
            const city = locationData.find(location => location.name === value)
            const { districts } = city

            setDistrictList(districts)
        } else if (name === 'district') {
            const district = districtList.find(district => district.name === value)
            const { wards } = district

            setWardList(wards)
        }
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true)
            const response = await axiosInstance.patch('/user', values)
            const { success, name } = response.data
            if (success) {
                dispatch(addToast({
                    type: 'success',
                    message: 'Update successfully'
                }))
                dispatch(update(name))
                window.scrollTo(0, 0)
            }
        } catch (error) {
            console.log('error: ', error)
        }
    }

    return (
        <>
            {isAuthenticated ? (
                <div className='main-content' style={{
                    minHeight: `${height}px`,
                }}>
                    <Container>
                        <Row>
                            <Col lg={{ size: '6', offset: '3' }}>
                                {isLoaded && <div className='my-4 border px-5 py-3'>
                                    <h3 className='text-center font-weight-bold mb-4' style={{
                                        color: 'var(--main-color)'
                                    }}>
                                        <u>Account information</u>
                                    </h3>
                                    <Formik
                                        initialValues={{
                                            name: formData.name,
                                            email: formData.email,
                                            phoneNumber: formData.phoneNumber,
                                            city: formData.city,
                                            district: formData.district,
                                            ward: formData.ward,
                                            street: formData.street
                                        }}
                                        validationSchema={Yup.object({
                                            email: Yup.string().email('Invalid email').required('Required'),
                                            phoneNumber: Yup.string().matches(phoneRegExp, 'Invalid phone number').required('Required')
                                        })}
                                        onSubmit={handleSubmit}
                                    >
                                        {({
                                            values,
                                            isSubmitting,
                                            handleChange
                                        }) => {

                                            return (
                                                <Form>
                                                    <label className='d-block mt-3 small' htmlFor='email'>Email</label>
                                                    <Field
                                                        id='email'
                                                        type='email'
                                                        name='email'
                                                        disabled={true}
                                                        className='w-100 rounded py-2 px-2 border'
                                                        style={{
                                                            backgroundColor: 'var(--main-lighter-color)'
                                                        }}
                                                        value={values.email}
                                                        onChange={handleChange} />

                                                    <label className='d-block small' htmlFor='name'>Name</label>
                                                    <Field
                                                        id='name'
                                                        type='text' name='name'
                                                        className='w-100 rounded py-2 px-2 border bg-white'
                                                        value={values.name}
                                                        onChange={handleChange}
                                                    />
                                                    <ErrorMessage name='name' />

                                                    <ErrorMessage name='email' />

                                                    <label className='d-block mt-3 small' htmlFor='phoneNumber'>Phone number</label>
                                                    <Field
                                                        id='phoneNumber'
                                                        type='tel'
                                                        name='phoneNumber' min='9'
                                                        className='w-100 rounded py-2 px-2 border'
                                                        value={values.phoneNumber}
                                                        onChange={handleChange} />
                                                    <ErrorMessage name='phoneNumber' />

                                                    <label className='d-block mt-3 small' htmlFor='city'>City</label>
                                                    <Field
                                                        name='city'
                                                        as='select'
                                                        className='w-100 rounded p-2 border'
                                                        value={values.city}
                                                        onChange={(event) => {
                                                            customHandleChange(event)
                                                            handleChange(event)
                                                        }}
                                                    >
                                                        <option>Select city</option>
                                                        {locationData && locationData.map(location => {
                                                            return (
                                                                <option key={location.code}>{location.name}</option>
                                                            )
                                                        })}
                                                    </Field>

                                                    <label className='d-block mt-3 small' htmlFor='district'>District</label>
                                                    <Field
                                                        name='district'
                                                        as='select'
                                                        className='w-100 rounded p-2 border'
                                                        value={values.district}
                                                        onChange={(event) => {
                                                            customHandleChange(event)
                                                            handleChange(event)
                                                        }}
                                                    >
                                                        <option>Select district</option>
                                                        {districtList && districtList.map(district => {
                                                            return (
                                                                <option key={district.code}>{district.name}</option>
                                                            )
                                                        })}
                                                    </Field>

                                                    <label className='d-block mt-3 small' htmlFor='ward'>Ward</label>
                                                    <Field
                                                        name='ward'
                                                        as='select'
                                                        className='w-100 rounded p-2 border'
                                                        value={values.ward}
                                                        onChange={handleChange}
                                                    >
                                                        <option>Select ward</option>
                                                        {wardList && wardList.map(ward => {
                                                            return <option key={ward.code}> {ward.name}</option>
                                                        })}
                                                    </Field>

                                                    <label className='d-block mt-3 small' htmlFor='street'>Street</label>
                                                    <Field
                                                        id='street'
                                                        type='text'
                                                        name='street'
                                                        className='w-100 rounded p-2 border'
                                                        value={values.street}
                                                        onChange={handleChange} />

                                                    <button
                                                        type='submit'
                                                        className='mt-3 rounded py-2 px-4 mt-4 border-0 text-light text-uppercase'
                                                        disabled={isSubmitting}
                                                        style={{
                                                            backgroundColor: 'var(--main-color)',
                                                        }}>
                                                        Update
                                                    </button>
                                                </Form>
                                            )
                                        }}
                                    </Formik>
                                </div>}
                            </Col>
                        </Row>
                    </Container>
                </div>) : <Redirect to='/login' />}
        </>
    )
}

export default Account