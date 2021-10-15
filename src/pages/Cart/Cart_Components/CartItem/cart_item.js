import React from 'react'
import { Link } from 'react-router-dom'

import cartAction from 'redux/reducers/cart/cart.actions'

import removeIcon from 'assets/icons/remove.svg'
import { useDispatch } from 'react-redux'

const CartItem = ({ id, name, size, color, price, imgSrc, quantity }) => {

    const dispatch = useDispatch()

    const handleRemoveItem = () => {
        dispatch(cartAction.removeToCart(id, size, color))
    }

    return (
        <div className='d-flex justify-content-between w-100 border-bottom py-3'>
            <div className='d-flex'>
                <div className='mr-4'>
                    <Link to={`/shop/${id}`}>
                        <img src={imgSrc} alt='item cart' style={{
                            verticalAlign: 'middle',
                            display: 'block',
                            maxWidth: '120px',
                            maxHeight: '150px',
                            width: 'auto',
                            height: 'auto',
                        }} />
                    </Link>
                </div>
                <div>
                    <p
                        style={{
                            fontWeight: '400',
                            textTransform: 'uppercase'
                        }}
                    >
                        {name}
                    </p>
                    <p>
                        <span style={{
                            width: '10px',
                            height: '10px'
                        }}></span>
                    </p>
                    <p>
                        <span style={{
                            display: 'inline-block',
                            borderRadius: '50%',
                            backgroundColor: color,
                            width: '15px',
                            height: '15px',
                            marginRight: '10px'
                        }}></span>{size}
                    </p>
                    <p
                        style={{
                            color: 'var(--main-color)'
                        }}
                    >
                        ${price}
                    </p>
                    <p>{quantity} items</p>
                </div>
            </div>
            <div>
                <button className='border-0 bg-transparent' onClick={handleRemoveItem}>
                    <img src={removeIcon} height='12px' width='12px' alt='remove icon' />
                </button>
            </div>
        </div>
    )
}

export default CartItem