import React from 'react';
import { Container, Row, Col } from 'reactstrap'

import SideBar from './sidebar'

const Main = () => {
    return (
        <Container>
            <Row>
                <Col xs='3'>
                    <SideBar />
                </Col>
                <Col xs='9'>
                    <p>Content</p>
                </Col>
            </Row>
        </Container>
    );
};

export default Main;