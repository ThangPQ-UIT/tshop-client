import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import GoogleMap from 'components/google_map/google_map'
import ContactInformation from './Contact_Components/Contact_Information/contact_information'

import ContactData from './contact.data'
import './style.css'

const Contact = () => {
    return (
        <div className='main-content'>
            <Container>
                <h3 className='text-center font-weight-bold pt-4 pb-4 pb-lg-5' style={{
                    color: 'var(--main-color)'
                }}>
                    <u>Contact</u>
                </h3>
                <Row className='mb-5 rounded border border-2'>
                    <Col lg='6' className='border-right border-2 py-4 py-lg-5'>
                        <div className='m-auto px-3 contact__message-form'>
                            <h4 className='text-center mb-4'>Send Us A Message</h4>
                            <input type='text' placeholder='Your Email Address' className='w-100 mb-3 pl-2' />
                            <textarea rows="8" placeholder='How Can We Help?' className='w-100 pl-2 pt-2' />
                            <button className='w-100 border-0 mt-3 rounded py-2 text-white' style={{
                                backgroundColor: 'var(--main-color)'
                            }}>SUBMIT</button>
                        </div>
                    </Col>
                    <Col lg='6' className='py-4 py-lg-5'>
                        <div className='m-auto px-3 contact__brands'>
                            {
                                ContactData.map(contact => {
                                    return (
                                        <ContactInformation
                                            key={contact.id}
                                            icon={contact.icon}
                                            name={contact.name}
                                            information={contact.information}
                                        />
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div className='p-0' style={{
                        height: '300px',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <GoogleMap />
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Contact