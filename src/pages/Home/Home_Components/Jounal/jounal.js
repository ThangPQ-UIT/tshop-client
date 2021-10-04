import React from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Blog from 'components/blog/blog'

import greaterIcon from 'assets/icons/greater.png'

const Jounal = ({ blogList }) => {

    return (
        <div style={{
            backgroundColor: '#fff'
        }}>
            <Container className='border-bottom mb-3'>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }} md={{ size: 12 }} className='border-top py-5'>
                        <h3 className='mb-3' style={{
                            fontSize: '2rem',
                            fontFamily: 'antic-didon'
                        }}>
                            Our Jounal
                        </h3>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <p className='m-0' style={{
                                    color: 'var(--main-color)'
                                }}>
                                    Alway catch up the fashion trending, discover lookbook & more
                                </p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <NavLink
                                    exact
                                    to='/blog'
                                    className='header__nav-link  text-decoration-none text-uppercase'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                    style={{
                                        fontSize: '0.8rem',
                                        marginRight: '40px'
                                    }}

                                >
                                    all articles
                                    <img src={greaterIcon} alt='greater' height='20px' width='20px' />
                                </NavLink>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ size: 10, offset: 1 }} md={{ size: 12 }} className='pb-5'>
                        <Row>
                            {blogList.map((blog) => {
                                return (
                                    <Col key={blog._id} lg='4' sm='6' md='4' xs='6'>
                                        <Blog data={blog} />
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Jounal