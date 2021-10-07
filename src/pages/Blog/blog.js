import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import searchIcon from 'assets/icons/search_main_color.svg'
import axiosInstance from 'api'

import './style.css'

const Blog = () => {

    const [blogList, setBlogList] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [placeHolder, setPlaceHolder] = useState('Search')

    const getData = async () => {
        const response = await axiosInstance.get('/blogs')
        const { result } = response.data
        return result
    }

    const setData = async () => {
        const data = await getData()
        setBlogList(data)
    }

    useEffect(() => {
        setData()
    }, [])

    const handleSearch = (e) => {
        const { value } = e.target
        setSearchValue(value)
    }

    const handleInputClick = (e) => {
        setPlaceHolder('')
    }

    const handleInputBlur = () => {
        if (!placeHolder) {
            setPlaceHolder('Search')
        }
    }

    const toggleSearchInput = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className='main-content py-5'>
            <Container>
                <h3 className='text-center mb-5 font-weight-bold' style={{
                    color: 'var(--main-color)'
                }}>Blog</h3>
                <Row>
                    <div className='position-relative mb-3 d-flex rounded' style={{
                        backgroundColor: '#fff'
                    }}>
                        <span className='border-0 pl-2' style={{
                            margin: 'auto 0px'
                        }}>
                            <img src={searchIcon} alt='search icons' width='20px' height='20px' />
                        </span>
                        <input
                            type='search'
                            placeholder={placeHolder}
                            className='p-2 rounded-2 border-left-0 search__blog-input'
                            value={searchValue}
                            onChange={handleSearch}
                            onBlur={handleInputBlur}
                            onClick={handleInputClick}
                        />
                    </div>
                </Row>
                <div className={isOpen ? 'search-container open' : 'search-container'} style={{
                    marginBottom: '20px'
                }}>
                    <input type='search' className='search-box' placeholder='Search' />
                    <span className='search-button' onClick={toggleSearchInput}>
                        <span className='search-icon'></span>
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
                        <div style={{
                            backgroundColor: 'var(--main-lighter-color)'
                        }}>
                            <div>
                                <p>Categories</p>
                                <p className='border-bottom pb-2'>Fashion</p>
                                <p className='border-bottom pb-2'>News</p>
                                <p className='border-bottom pb-2'>About</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}


export default Blog