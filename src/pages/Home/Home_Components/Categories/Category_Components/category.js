import React from 'react'
import { Link } from 'react-router-dom'

import shoppingCartIcon from 'assets/icons/shopping-cart.svg'

import './style.css'

const Category = ({ bgImg, name, description }) => {
    return (
        <div className='border rounded product__item position-relative h-100'>
            <Link to={`/shop?category=${name}`}>
                <div className='product-overlay'>
                    <img src={shoppingCartIcon} width='45px' height='45px' className='shopping-cart' />
                </div>
                <img src={bgImg} alt='men image' height='100%' width='100%' style={{
                    position: 'absolute'
                }} />
                <div className='position-absolute' style={{
                    left: '30px',
                    top: '20px',
                }}>
                    <p className='text-capitalize home__category-name' style={{

                    }}>{name}</p>
                    <p className='text-capitalize home__category-description'>{description}</p>
                </div>
            </Link>
        </div>
    )
}

export default Category