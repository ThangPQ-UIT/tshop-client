import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import GoogleMap from 'components/google_map/google_map'
import ContactInformation from './Contact_Components/Contact_Information/contact_information'

import ContactData from './contact.data'

const Contact = () => {
    return (
        <div className='main-content py-5' style={{
            backgroundColor: '#fff'
        }}>
            <Container>
                <h3 className='text-center mb-5 font-weight-bold'>Contact</h3>
                <Row className='border rounded mb-5'>
                    <Col lg='6 border-right'>
                        <div className='w-75 m-auto py-4 px-3'>
                            <p className='text-center'>Send Us A Message</p>
                            <input type='text' placeholder='Your Email Address' className='w-100 mb-3 pl-2' />
                            <textarea rows="8" placeholder='How Can We Help?' className='w-100 pl-2 pt-2' />
                            <button className='w-100 border-0 mt-3 rounded py-1'>SUBMIT</button>
                        </div>
                    </Col>
                    <Col lg='6'>
                        <div className='w-75 m-auto pt-5'>
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