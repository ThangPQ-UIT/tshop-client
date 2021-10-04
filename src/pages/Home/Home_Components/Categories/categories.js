import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import CategoryComponent from './Category_Components/category'

import categoryData from './category_data'

import './style.css'

const LookingFor = () => {
    return (
        <div style={{
            backgroundColor: '#f9f9f6fa',
        }}>
            <Container>
                <Row className='py-5 border' style={{
                    height: '390px'
                }}>
                    {
                        categoryData.map(category => {
                            return (
                                <Col key={category.id}>
                                    <CategoryComponent
                                        bgImg={category.img}
                                        name={category.name}
                                        linkTo={category.linkTo}
                                        description={category.description}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default LookingFor