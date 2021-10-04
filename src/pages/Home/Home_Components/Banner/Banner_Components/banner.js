import { Container, Row, Col } from 'reactstrap'

import './style.css'

const Banner = ({ index, url, title, length, description, collectionName }) => {
    return (
        <Container fluid='true'>
            <Row className='h-100 banner-row-test' style={{
                position: 'relative',
                overflow: 'hidden'
            }}>
                <img src={url} alt='banner img' className='img-banner' style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                }} />
                <Col lg='1'>
                    <div className='d-flex justify-content-center pt-5'>
                        <span style={{
                            width: '20px',
                            textAlign: 'center',
                            borderBottom: '2px solid',
                        }}>{index}</span>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <span>{length}</span>
                    </div>
                </Col>
                <Col lg='5' md='10' style={{
                    zIndex: '1',
                    // border: '1px solid red'
                }}>
                    <div className='py-5'>
                        <p className='text-capitalize' style={{
                            color: '#918A60',

                        }}>{title}</p>
                        <p className='mt-5 text-capitalize' style={{
                            fontFamily: 'antic-didon',
                            fontSize: '6rem',
                            lineHeight: '6.5rem',
                        }}>{collectionName}</p>
                        <p className='mt-3 font-weight-bold banner__description' style={{
                            color: '#64646485'
                        }}>
                            {description}
                        </p>
                        <button className='mt-3 banner__button' style={{
                            backgroundColor: 'var(--main-color)',
                            border: 'none',
                            color: '#fff',
                            padding: '15px 30px'
                        }}>SHOP NOW</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Banner