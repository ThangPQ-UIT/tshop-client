import React from 'react'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import youtubeIcon from 'assets/icons/youtube.svg'
import twitterIcon from 'assets/icons/twitter.svg'
import facebookIcon from 'assets/icons/facebook.svg'
import pinterestIcon from 'assets/icons/pinterest.svg'
import instagramIcon from 'assets/icons/instagram.svg'

import './style.css'

const Footer = () => {

    console.log('footer')
    // Hide footer on the login page
    const location = useLocation()
    if (location.pathname.includes('login') || location.pathname.includes('signup')) {
        return null
    }

    return (
        <div id='footer'>
            <Container className='pt-3'>
                <Row className='pb-3'>
                    <Col lg='3' md='6' sm='6' xs='12' className='px-lg-0 pb-4'>
                        <p className=' fw-bolder'>Durotan</p>
                        <p>268, Hoang Van Thu street, ward 2, Tan Binh district, Ho Chi Minh city</p>
                        <p>+84 00000 0000</p>
                        <p>support_durotan@gmail.com</p>
                        <Row>
                            <Col lg={{ size: '2' }} md={{ size: '2' }} sm={{ size: '1' }} xs={{ size: '1' }}>
                                <img src={facebookIcon} alt='fb icon' width='24px' height='24px' />
                            </Col>
                            <Col lg={{ size: '2' }} md={{ size: '2' }} sm={{ size: '1' }} xs={{ size: '1' }}>
                                <img src={twitterIcon} alt='twitter icon' width='24px' height='24px' />
                            </Col>
                            <Col lg={{ size: '2' }} md={{ size: '2' }} sm={{ size: '1' }} xs={{ size: '1' }}>
                                <img src={instagramIcon} alt='instagram icon' width='24px' height='24px' />
                            </Col>
                            <Col lg={{ size: '2' }} md={{ size: '2' }} sm={{ size: '1' }} xs={{ size: '1' }}>
                                <img src={youtubeIcon} alt='youtube icon' width='24px' height='24px' />
                            </Col>
                            <Col lg={{ size: '2' }} md={{ size: '2' }} sm={{ size: '1' }} xs={{ size: '1' }}>
                                <img src={pinterestIcon} alt='printest icon' width='24px' height='24px' />
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={{ size: '2', offset: '1' }} md='6' sm='6' xs='6' className='px-lg-0 pb-3'>
                        <p className='fw-bolder'>Shopping</p>
                        <p>short</p>
                        <p>sandal</p>
                        <p>hight top</p>
                    </Col>
                    <Col lg={{ size: '2', offset: '1' }} md='6' sm='6' xs='6' className='pb-3'>
                        <p className='fw-bolder'>Contact</p>
                        <p>Contact us</p>
                        <p>0983162152</p>
                    </Col>
                    <Col lg='3' md='6' sm='6' xs='6' className='px-lg-0'>
                        <p className='fw-bolder'>New letters</p>
                        <p className='small'>Be the first to get the latest news about trend, promotions and much more</p>
                        <input className='w-100 py-2 small' placeholder='Enter your email address' /><br></br>
                        <p className='small'>
                            By subscribing, you accept the
                            <a>Privacy Policy</a>
                        </p>
                        <button style={{
                            backgroundColor: '#928656',
                            padding: '8px 18px',
                            fontSize: '1rem',
                            fontWeight: 'bolder',
                            textTransform: 'uppercase',
                            border: 'none',
                            color: '#fff'
                        }}>subcribe</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer