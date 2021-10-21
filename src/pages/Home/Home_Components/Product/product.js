import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Slider from 'components/slider/slider'

import greaterIcon from 'assets/icons/greater.png'
import axiosInstance from 'api'

import './style.css'
import Loading from 'components/loading/loading'

const Product = () => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [productList, setProductList] = useState()

    useEffect(() => {
        setData()
    }, [])

    const getData = async () => {
        try {
            setIsLoaded(false)
            const response = await axiosInstance.get('/products?limit=8')
            const { productList } = response.data

            return productList
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const setData = async () => {
        try {
            const data = await getData()
            setProductList(data)
        } catch (error) {
            console.log('error: ', error)
        } finally {
            setIsLoaded(true)
        }
    }

    return (
        <div>
            <Container className='border-top pt-4 pt-lg-5 pb-1 pb-lg-3'>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <p style={{
                            fontSize: '2rem',
                            fontFamily: 'antic-didon'
                        }}>
                            Our Products
                        </p>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <ul className='d-flex m-0 p-0'>
                                    <li className='list-unstyled'>
                                        <Link to='/shop' className='text-decoration-none text-capitalize mr-5 home__product-nav'>
                                            best selling
                                        </Link>
                                    </li>
                                    <li className='list-unstyled'>
                                        <Link to='/shop' className='text-decoration-none text-capitalize home__product-nav'>
                                            new arrivals
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='d-flex align-items-center mr-4'>
                                <Link to='/shop' className='text-decoration-none text-capitalize home__product-nav'>
                                    view all products
                                    <img src={greaterIcon} alt='greater' height='20px' width='20px' />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='py-5 home__product-slider'>
                        {
                            isLoaded ? (
                                <Slider data={productList} itemWidth='one-fourth' />
                            ) : (<Loading />)
                        }
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Product