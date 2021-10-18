import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

const WishList = () => {

    const [height, setHeight] = useState()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {

        // Set height for component
        const header = document.getElementById('header')
        const footer = document.getElementById('footer')

        const headerHeight = header.offsetHeight
        const footerHeight = footer.offsetHeight
        const screenHeight = window.innerHeight

        const cartHeight = screenHeight - headerHeight - footerHeight

        setHeight(cartHeight)
        setIsMounted(true)
    }, [])

    return (
        <>
            {isMounted && (
                <div className='main-content' style={{
                    minHeight: `${height}px`
                }}>
                    <Container>
                        <h3 className='text-center py-5 font-weight-bold' style={{
                            color: 'var(--main-color)'
                        }}>Wishlist</h3>
                    </Container>
                </div>
            )}

        </>
    )
}

export default WishList