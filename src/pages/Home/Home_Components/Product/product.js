import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Slider from 'components/slider/slider'

import greaterIcon from 'assets/icons/greater.png'
import axiosInstance from 'api'

const Product = () => {

    const [productList, setProductList] = useState()

    useEffect(() => {
        setData()
    }, [])

    const getData = async () => {
        try {
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
        }
    }

    return (
        <div>
            <Container className='border pt-5 pb-3'>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }} className='border'>
                        <h3 style={{
                            fontSize: '2rem',
                            fontFamily: 'antic-didon'
                        }}>
                            Our Products
                        </h3>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <ul className='d-flex m-0 p-0'>
                                    <li className='list-unstyled'>
                                        <NavLink
                                            exact
                                            to='/'
                                            className='header__nav-link  text-decoration-none'
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'var(--main-color)'
                                            }}
                                            style={{
                                                textTransform: 'uppercase',
                                                fontSize: '0.8rem',
                                                marginRight: '40px'
                                            }}

                                        >
                                            best selling
                                        </NavLink>
                                    </li>
                                    <li className='list-unstyled'>
                                        <NavLink
                                            exact
                                            to='/'
                                            className='header__nav-link  text-decoration-none text-uppercase'
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'var(--main-color)'
                                            }}
                                            style={{
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            new arrivals
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className='d-flex align-items-center'>
                                <NavLink
                                    exact
                                    to='/'
                                    className='header__nav-link  text-decoration-none'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                    style={{
                                        textTransform: 'uppercase',
                                        fontSize: '0.8rem',
                                        marginRight: '40px'
                                    }}

                                >
                                    view all products
                                    <img src={greaterIcon} alt='greater' height='20px' width='20px' />
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                </Row>
                {
                    productList ? (
                        <div className='pb-5 pt-5'>
                            <Slider data={productList} itemWidth='one-fourth' />
                        </div>
                    ) : (
                        <p>loading...</p>
                    )
                }
            </Container>
        </div>
    )
}

export default Product