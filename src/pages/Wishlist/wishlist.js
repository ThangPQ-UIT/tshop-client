import React, { useEffect, useState } from 'react'

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
                <div style={{
                    height: height
                }}>
                    <p>Wishlist</p>
                </div>
            )}

        </>
    )
}

export default WishList