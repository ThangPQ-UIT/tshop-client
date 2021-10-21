import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import setHeightMainContent from 'utilities/setHeightMainContent'

const WishList = () => {

    const [height, setHeight] = useState()

    useEffect(() => {
        setHeightMainContent(setHeight)
    }, [])

    return (
        <div className='main-content' style={{
            minHeight: `${height}px`
        }}>
            <Container>
                <h3 className='text-center font-weight-bold pt-4 pb-4 pb-lg-5' style={{
                    color: 'var(--main-color)'
                }}>
                    <u>Wishlist</u>
                </h3>
            </Container>
        </div>
    )
}

export default WishList