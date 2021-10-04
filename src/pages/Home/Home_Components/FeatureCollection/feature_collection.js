import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import CollectionBlock from 'components/collection_block/collection_block'

import CrewImg from 'assets/images/crew.svg'
import JacketImg from 'assets/images/jacket.svg'

const collection = [
    {
        name: 'coat & jackets',
        imgBackground: JacketImg,
        title: 'basic jackets',
        description: 'Simple alway is the best \n choice for your any style. \n fontCheck your lookbook',
        btn: {
            btnName: 'explore now',
            btnBackground: '#928656',
            color: '#fff',
            border: 'none'
        }
    },
    {
        name: 'accessories',
        imgBackground: CrewImg,
        title: 'althetic crew',
        description: 'Inspiration from Althetic \n Crew - College Division, \n A brown cap for youngs',
        btn: {
            btnName: 'shop now',
            btnBackground: '#fff',
            color: '#928656',
            border: '1px solid #928656'
        }
    },

]

const FeatureCollection = () => {
    return (
        <Container className='border'>
            <Row className='pt-5'>
                <Col lg={{ size: 10, offset: 1 }} className='border mb-4'>
                    <div>
                        <h3 style={{
                            fontSize: '2rem',
                            fontFamily: 'antic-didon'
                        }}>Featured Collections</h3>
                        <p style={{
                            fontSize: '0.8rem',
                            color: '#807755bf'
                        }}>
                            New arrivals, best selling or any discount programs, click on any collection that you are looking for
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                {
                    collection.map((item, index) => (
                        <Col key={index} className='mb-lg-0 mb-4 border-bottom'>
                            <CollectionBlock
                                name={item.name}
                                title={item.title}
                                btn={item.btn}
                                description={item.description}
                                imgBackground={item.imgBackground}
                            />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default FeatureCollection 