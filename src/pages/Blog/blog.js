import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import axiosInstance from 'api'

import './style.css'

const Blog = () => {

    const searchInputRef = useRef(null)

    const [blogList, setBlogList] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [filterValue, setFilterValue] = useState('all')

    const getData = async (searchValue) => {
        if (!searchValue) {
            searchValue = ''
        }

        const response = await axiosInstance.get(`/blogs?title=${searchValue}&category=${filterValue}`)
        const { result } = response.data
        return result
    }

    const setData = async (searchValue) => {
        console.log('set data')
        const data = await getData(searchValue)
        setBlogList(data)
    }

    useEffect(() => {
        setData()
    }, [filterValue])

    const toggleSearchInput = () => {
        setIsOpen(!isOpen)
    }

    const handleSearchChange = (event) => {
        const { value } = event.target
        setSearchData(value)

        if (searchInputRef.current) {
            clearTimeout(searchInputRef.current)
        }
        searchInputRef.current = setTimeout(() => {
            setData(value)
        }, 300)
    }

    const handleCategoryChange = (event) => {
        const { value } = event.target
        setFilterValue(value)
    }

    return (
        <div className='main-content py-5'>
            <Container>
                <h3 className='text-center mb-5 font-weight-bold' style={{
                    color: 'var(--main-color)'
                }}>Blog</h3>
                <div
                    className={isOpen ? 'blog__search-container rounded open' : 'blog__search-container rounded'}
                    style={{
                        marginBottom: '20px'
                    }}
                >
                    <input
                        type='search'
                        value={searchData}
                        className='blog__search-box bg-white rounded'
                        placeholder='Search'
                        onChange={handleSearchChange}
                        ref={searchInputRef}
                    />
                    <span className='blog__search-button' onClick={toggleSearchInput}>
                        <span className='blog__search-icon'></span>
                    </span>
                </div>
                <Row>
                    <Col lg='8'>
                        {blogList ? (
                            <Row>
                                {blogList.map(blog => {

                                    return (
                                        <React.Fragment key={blog._id}>
                                            <Col lg='6' className='mb-4'>
                                                <div className='d-flex flex-column' style={{
                                                    borderRadius: '25px',
                                                    overflow: 'hidden',
                                                    height: '100%',
                                                    boxShadow: '0 0 3px 3px rgba(153, 160, 155, 0.15)'
                                                }}>
                                                    <div>
                                                        <img
                                                            src={blog.thumbnail_image} alt='blog image'
                                                            width='100%'
                                                            height='100%'
                                                        />
                                                    </div>
                                                    <div style={{
                                                        backgroundColor: 'var(--main-lighter-color)',
                                                        flexGrow: '1',
                                                    }}>
                                                        <div className='d-flexs justify-content-between align-items-center px-3'>
                                                            <Link to={`/blog/${blog.slug}`} className='border-0 bg-transparent fw-bold my-3' style={{
                                                                display: 'inline-block',
                                                                color: 'var(--main-color)'
                                                            }}>{blog.title}</Link>
                                                            <p>
                                                                {blog.meta_description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </React.Fragment>
                                    )
                                })}
                            </Row>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Col>
                    <Col lg='4'>
                        <div>
                            <select className='rounded blog__category-select' onChange={handleCategoryChange} value={filterValue}>
                                <option value='all'>Categories</option>
                                <option className='border-bottom b-2' value='fashion'>Fashion</option>
                                <option className='border-bottom b-2' value='news'>News</option>
                                <option className='border-bottom b-2' value='about'>About</option>
                            </select>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}


export default Blog