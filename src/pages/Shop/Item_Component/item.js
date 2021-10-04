import React from 'react'

import heartIcon from 'assets/icons/heart.svg'

import './style.css'
import { Link } from 'react-router-dom'

const Item = ({ id, name, price, category, discount, url }) => {

    return (
        <div className='h-100 w-100 d-flex flex-column item-container pb-3 border-bottom'>
            <div className='h-75 item__image' style={{
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 2px 2px rgba(153, 160, 155, 0.15)'
            }}>
                <img src={url} alt='product image' height='100%' width='100%' />
                <div className='item__quickview w-100 h-25'>
                    <Link to={`/shop/${category}/${id}`} className='text-center m-0 font-weight-bold'>Quick View</Link>
                </div>
            </div>
            <div className='d-flex flex-column' style={{
                flexGrow: '1'
            }}>
                <div className='position-relative mt-2 d-flex justify-content-between'>
                    <p className='small'>{name}</p>
                    <span className='item__heart-icon'>
                        <img src={heartIcon} alt='heart icon' height='20px' width='20px' />
                    </span>
                </div>
                <div className='d-flex justify-content-between' style={{
                    marginTop: 'auto'
                }}>
                    <span className='fw-bolder'>$ {price}</span>
                    {
                        discount && <span className='font-italic font-weight-light fs-6' style={{ color: 'red' }}>-{discount}%</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Item