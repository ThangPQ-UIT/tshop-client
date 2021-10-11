import React from 'react'

import './style.css'

const SlideItem = ({ data, style }) => {

    return (
        <div style={style} className='pr-slide-item' >
            <div className='slide-item__img'>
                <img src={data.color[0].imageUrlList[0]} alt='fsdf' height='100%' width='100%' />
            </div>
            <div className='slide-item__text'>
                <div className='slide__item-name'>
                    <p>{data.name}</p>
                </div>
            </div>
        </div>
    )
}

export default SlideItem