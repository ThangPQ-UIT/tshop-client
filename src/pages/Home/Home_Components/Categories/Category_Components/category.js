import React from 'react'
import { Col } from 'reactstrap'
import { Link } from 'react-router-dom'

import shoppingCartIcon from 'assets/icons/shopping-cart.svg'

import './style.css'

const Category = ({ bgImg, name, linkTo, description }) => {
    return (
        <div className='border rounded product__item position-relative h-100'>
            <div className='product-overlay'>
                <Link to={linkTo}>
                    <img src={shoppingCartIcon} width='45px' height='45px' className='shopping-cart' />
                </Link>
            </div>
            <img src={bgImg} alt='men image' height='100%' width='100%' style={{
                position: 'absolute'
            }} />
            <div className='position-absolute' style={{
                left: '30px',
                top: '20px',
            }}>
                <p className='text-capitalize' style={{
                    fontFamily: 'antic- didon',
                    fontSize: '2.5rem',
                    margin: '0px'
                }}>{name}</p>
                <p className='text-capitalize'>{description}</p>
            </div>
        </div>
    )
}

export default Category