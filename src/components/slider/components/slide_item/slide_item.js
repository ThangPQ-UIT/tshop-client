import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const SlideItem = ({ data, style }) => {

    return (
        <div style={style} className='pr-slide-item'>
            <Link to={`/shop/${data._id}`} className='d-block-inline'>
                <div className='slide-item__img'>
                    <img src={data.color[0].imageUrlList[0]} alt='slide item' height='100%' width='100%' />
                </div>
                <div className='slide-item__text'>
                    <div className='pt-2 slide__item-name'>
                        <p>{data.name}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default SlideItem