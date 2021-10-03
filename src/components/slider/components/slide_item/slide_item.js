import React from 'react'

import './style.css'

const SlideItem = ({ data, style, itemWidth }) => {

    return (
        <div style={style} className='pr-slide-item'>
            <div className='h-75 border'>
                <img src={data.color[0].imageUrlList[0]} alt='fsdf' height='100%' width='100%' />
            </div>
            <div>
                <p>{data.name}</p>
                <p>{data.price}</p>
            </div>
        </div>
    )
}

export default SlideItem