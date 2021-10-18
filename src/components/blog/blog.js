import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'

const Blog = ({ data }) => {

    const date = new Date(data.created_at)

    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()

    return (
        <div className=''>
            <div className='home__blog-item' >
                <img
                    src={data.thumbnail_image}
                    className='home__blog-item-img'
                    alt='blog img' width='100%' height='100%'
                />
            </div>
            <div className='d-flex'>
                <div className='mr-3'>
                    <p className='m-0 home__blog-item-day'>{day}</p>
                    <p className='text-uppercase home__blog-item-month'>{month}</p>
                    <p className='text-uppercase home__blog-item-year'>{year}</p>
                </div>
                <div>
                    <Link to={`/blog/${data.slug}`} className='home__blog-item-title'>{data.title}</Link>
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