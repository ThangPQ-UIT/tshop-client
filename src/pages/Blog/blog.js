import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Select from 'components/select/select'
import Loading from 'components/loading/loading'
import SearchInput from 'components/search_input/search_input'

import axiosInstance from 'api'

import './style.css'
import { categoryOptionList } from './blog.data'
import setHeightMainContent from 'utilities/setHeightMainContent'

const Blog = () => {

    const searchInputRef = useRef(null)

    const [height, setHeight] = useState()
    const [blogList, setBlogList] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filterValue, setFilterValue] = useState('categories')

    const getData = async (searchValue) => {
        setIsLoaded(false)

        if (!searchValue) {
            searchValue = ''
        }

        const response = await axiosInstance.get(`/blogs?title=${searchValue}&category=${filterValue}`)
        const { result } = response.data
        return result
    }

    const setData = async (searchValue) => {
        try {
            const data = await getData(searchValue)
            setBlogList(data)
        } catch (error) {
            console.log('error: ', error)
        } finally {
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        setHeightMainContent(setHeight)
    }, [])

    useEffect(() => {
        setData()
    }, [filterValue])

    const toggleSearchInput = () => {
        setIsOpen(!isOpen)
    }

    const handleSearchChange = (event) => {
        const { value } = event.target
        setSearchValue(value)

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
        <div className='main-content' style={{
            minHeight: `${height}px`,
            backgroundColor: 'var(--main-bg)'
        }}>
            <Container>
                <h3 className='text-center pt-4 pb-4 pb-lg-5 font-weight-bold' style={{
                    color: 'var(--main-color)'
                }}>
                    <u>Blog</u>
                </h3>
                <Row className='mb-5'>
                    <div className='d-flex'>
                        <div className='blog__search-container mr-3'>
                            <SearchInput
                                isOpen={isOpen}
                                searchValue={searchValue}
                                handleOnChange={handleSearchChange}
                                toggleSearchInput={toggleSearchInput}
                                ref={searchInputRef}

                            />
                        </div>
                        <div className='blog__filter-category-select d-lg-none'>
                            <Select handleOnChange={handleCategoryChange} filterValue={filterValue} optionList={categoryOptionList} />
                        </div>
                    </div>
                </Row>
                <Row className='mb-4'>
                    <Col lg='8' md='12'>
                        {(isLoaded && blogList) ? (
                            <Row>
                                {blogList.map(blog => {

                                    return (
                                        <React.Fragment key={blog._id}>
                                            <Col sm='6' className='mb-4'>
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
                        ) : (<Loading />)}
                    </Col>
                    <Col lg='4'>
                        <div className='blog__filter-category-select d-none d-lg-block'>
                            <Select handleOnChange={handleCategoryChange} filterValue={filterValue} optionList={categoryOptionList} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )

}


export default Blog