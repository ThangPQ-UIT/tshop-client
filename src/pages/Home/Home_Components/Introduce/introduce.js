import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import './style.css'

import FeatureBlock from 'components/feature_block/feature_block'

import tshirtIcon from 'assets/icons/tshirt.svg'
import shipIcon from 'assets/icons/ship.svg'
import paymentIcon from 'assets/icons/payment.svg'
// import leatherImg from 'assets/images/leather.png'


const Introduce = () => {
    return (
        <div>
            <div className='intro-container'>
                <div className='intro-wrap'>
                    <div className='sub-intro'>
                        <Container className='border' fluid='true'>
                            <Row className='border'>
                                <div className='intro-first-row' style={{
                                    border: '1px solid green',
                                    height: '120px'
                                }}>
                                    <ul className='p-0 m-0'>
                                        <Col lg='9' className='border p-0'>
                                            <Row>
                                                <Col className='p-0'>
                                                    <li className='list-unstyled'>
                                                        BRAND NAME
                                                    </li>
                                                </Col>
                                                <Col lg=''>
                                                    <li className='list-unstyled'>
                                                        CLothing
                                                    </li>
                                                </Col>
                                                <Col lg=''>
                                                    <li className='list-unstyled'>
                                                        Gap
                                                    </li>
                                                </Col>
                                                <Col lg=''>
                                                    <li className='list-unstyled'>
                                                        Masore
                                                    </li>
                                                </Col>
                                                <Col lg=''>
                                                    <li className='list-unstyled'>
                                                        Supra Unero
                                                    </li>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </ul>
                                </div>
                            </Row>
                            <Row>
                                <h2 style={{
                                    fontSize: '2rem',
                                    fontFamily: 'antic-didon'
                                }}>About Durotan</h2>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#767676'
                                }}>
                                    Established in 1991, Durotan and Logan, 2 fashions artists work together in UK,
                                    start from design the casual for people around their location.
                                    The inspiration got from natural, color pastel & activities the daily. Durotan&apos s item
                                    alway look very basic but never out trend, easy to mixed with any style. Then, they
                                    developed with series 5 stores cover all United Kingdom.
                                </p>
                            </Row>
                            <Row className='border'>
                                <Col lg='5' md='12' sm='12' className='border'>
                                    <FeatureBlock
                                        iconImg={tshirtIcon}
                                        name='QUALITY MATERIALS'
                                        description='100% polyurethene & 100% polyester, product of Durotan alway choose 
                                        detail and safety with customer.You satisfication is our reputation'
                                    />
                                    <FeatureBlock
                                        iconImg={shipIcon}
                                        name='FREE SHIPPING'
                                        description='Durotan free shipping for all orders over $199 in domestic & over 
                                        $399 for worldwide Durotan free shipping for all orders over $199 in domestic & over '
                                    />
                                    <FeatureBlock
                                        iconImg={paymentIcon}
                                        name='SECURE PAYMENT'
                                        description='We guarantee 100% secure with online payment on our site.
                                        In case if you have any problems with our product, you can return it back in 30 days'
                                    />
                                </Col>
                                {/* <Col lg='7' md='0' className='border d-lg-block d-none'>
                                    <img src={leatherImg} style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'fill'
                                    }} />
                                </Col> */}
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Introduce