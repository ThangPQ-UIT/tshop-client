import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

// import Blog from 'components/blog/blog'
import Blog from './Jounal_Components/blog_item'
import Loading from 'components/loading/loading'

import { addToast } from 'redux/reducers/toasts/toast.actions'

import axiosInstance from 'api'
import greaterIcon from 'assets/icons/greater.png'

import './style.css'

const Jounal = () => {
    const dispatch = useDispatch()

    const [blogList, setBlogList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setBlogData()
    }, [])

    const getBlogData = async () => {
        try {
            const response = await axiosInstance.get('/blogs')
            const { result } = response.data
            return result
        } catch (error) {
            const action = {
                type: 'error',
                message: error,
            }
            dispatch(addToast(action))
        }
    }

    const setBlogData = async () => {
        try {
            const data = await getBlogData()
            setBlogList(data)
        } catch (error) {
            console.log('error: ', error)
            const action = {
                type: 'error',
                message: error,
            }

            dispatch(addToast(action))
        } finally {
            setIsLoaded(true)
        }
    }

    return (
        <div>
            <Container className='mb-3'>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }} md={{ size: 12 }} className='border-top py-4 py-lg-5'>
                        <h3 className='mb-3' style={{
                            fontSize: '2rem',
                            fontFamily: 'antic-didon'
                        }}>
                            Our Jounal
                        </h3>
                        <div className='d-flex justify-content-between'>
                            <div className='home__jounal-description'>
                                <p className='m-0' style={{
                                    color: 'var(--main-color)'
                                }}>
                                    Alway catch up the fashion trending, discover lookbook & more
                                </p>
                            </div>
                            <div className='d-flex home__jounal-link-container'>
                                <Link
                                    to='/blog'
                                    className='text-decoration-none text-capitalize home__jounal-link'
                                >
                                    all articles
                                    <img src={greaterIcon} alt='greater' height='20px' width='20px' />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }} className='pb-5'>
                        <Row>
                            {isLoaded ? (
                                blogList.map((blog) => {
                                    return (
                                        <Col key={blog._id} lg='4' sm='6' md='4' xs='6' className='home__jounal'>
                                            <Blog data={blog} />
                                        </Col>
                                    )
                                })
                            ) : (<Loading />)
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Jounal