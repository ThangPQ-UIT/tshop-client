import React from 'react'

import './style.css'

const Blog = ({ data }) => {

    const date = new Date(data.created_at)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return (
        <div className=''>
            <div className='home-blog-item-img' >
                <img
                    src={data.thumbnail_image}
                    alt='blog img' width='100%' height='100%'
                    style={{
                        objectFit: 'fill'
                    }}
                />
            </div>
            <div className='d-flex'>
                <div className='mr-3'>
                    <p className='m-0' style={{
                        fontSize: '3rem',
                        fontFamily: 'antic-didon'
                    }}>{day}</p>
                    <p className='text-uppercase' style={{
                        fontSize: '0.9rem',
                    }}>{month}</p>
                    <p style={{
                        fontSize: '0.9rem'
                    }}>{year}</p>
                </div>
                <div>
                    <a href='' style={{
                        fontSize: '1.3rem',
                        fontFamily: 'antic-didon'
                    }}>{data.title}</a>
                    <div className='d-flex'>
                        <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--main-color)'
                        }}>
                            <span>{data.category}</span> / <span>{data.author}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog