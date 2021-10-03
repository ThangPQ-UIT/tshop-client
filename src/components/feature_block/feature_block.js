import React from 'react'

import { Row, Col } from 'reactstrap'

const FeatureBlock = ({ iconImg, name, description }) => {
    return (
        <Row className='mb-5'>
            <Col lg='2'>
                <div className='d-flex justify-content-center d-lg-block w-100'>
                    <img src={iconImg} alt='shirt icon' width='50px' height='60px' />
                </div>
            </Col>
            <Col lg='10'>
                <div>
                    <p className='text-lg-left text-center'>{name}</p>
                    <p className='text-lg-left text-center' style={{
                        color: '#A2A2A2',
                        fontSize: '0.9rem'
                    }}>{description}</p>
                </div>
            </Col>
        </Row>
    )
}

export default FeatureBlock 