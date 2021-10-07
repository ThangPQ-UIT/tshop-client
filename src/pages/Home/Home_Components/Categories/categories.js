import React from 'react'
import { Container, Row, Col } from 'reactstrap'

import CategoryComponent from './Category_Components/category'

import categoryData from './category_data'

import './style.css'

const LookingFor = () => {
    return (
        <div>
            <Container>
                <Row className='py-5 border' style={{
                    height: 'max-content'
                }}>
                    {
                        categoryData.map(category => {
                            return (
                                <Col key={category.id} md={{ size: 4 }} xs={{ size: 6 }} className='mx-auto mb-3s category-col'>
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