import { Container, Row, Col } from 'reactstrap'

import './style.css'

const Banner = ({ index, url, title, length, description, collectionName }) => {
    return (
        <div id='banner'>
            <img src={url} alt='banner img' className='img-banner border' />
            <Container className='h-100'>
                <Row className='h-100' style={{
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <Col xs='9' sm='10' md='9' style={{
                        zIndex: '1',
                    }}>
                        <div className='h-100 banner__content'>
                            <p className='text-capitalize banner__title'>{title}</p>
                            <p className='text-capitalize banner__collection-name'>{collectionName}</p>
                            <p className='font-weight-bold banner__description'>
                                {description}
                            </p>
                            <button className='mt-3 banner__button'>SHOP NOW</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Banner