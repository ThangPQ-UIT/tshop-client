import React from 'react'

import Banner from './Home_Components/Banner/banner'
import Jounal from './Home_Components/Jounal/jounal'
import Product from './Home_Components/Product/product'
// import Introduce from './Home_Components/Introduce/introduce'
import Category from './Home_Components/Categories/categories'

const Home = () => {

    return (
        <>
            <div className='main-content'>
                <Banner />
                {/* <Introduce /> */}
                <Category />
                <Product />
                <Jounal />
            </div>
        </>
    )
}

export default Home