import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Container, Row, Col } from 'reactstrap'

import Item from './Item_Component/item'

import { shopData, categoriesOptionList } from './shop.data'

import filterIcon from 'assets/icons/filter.svg'
import searchIcon from 'assets/icons/search_main_color.svg'
import downToUpIcon from 'assets/icons/sort-amount-up-alt-solid.svg'
import upToDownIcon from 'assets/icons/sort-amount-down-alt-solid.svg'

import './style.css'
import axiosInstance from 'api'
import { NavLink } from 'react-router-dom'

const Shop = () => {

    const filterRef = useRef(null)
    const searchRef = useRef(null)

    const [height, setHeight] = useState()
    const [isLoaded, setIsLoaded] = useState(false)
    const [countOfItem, setCountOfItem] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [productList, setProductList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [filterByPrice, setFilterByPrice] = useState('')
    const [isShowFilter, setIsShowFilter] = useState(false)

    useEffect(() => {
        // Set height for component
        const header = document.getElementById('header')
        const footer = document.getElementById('footer')

        const headerHeight = header.offsetHeight
        const footerHeight = footer.offsetHeight
        const screenHeight = window.innerHeight

        const cartHeight = screenHeight - headerHeight - footerHeight
        setHeight(cartHeight)
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', hanldeClickOutSide)
        setData()
        window.scrollTo(0, 0)
        return () => {
            document.removeEventListener('mousedown', handleShowFilter)
        }
    }, [filterByPrice, currentPage])

    const getData = async (searchData) => {
        try {
            if (!searchData) {
                searchData = ''
            }

            const response = await axiosInstance.get(`/products?limit=${8}&&current_page=${currentPage}&&search=${searchData}&price_type=${filterByPrice}`)
            const data = response.data

            return data
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const setData = async (value) => {
        try {
            const { productList, countRow } = await getData(value)
            const count = Math.ceil(countRow / 8)

            setCountOfItem(count)
            setProductList(productList)
        } catch (error) {
            console.log('error: ', error)
        } finally {
            setIsLoaded(true)
        }
    }

    const hanldeClickOutSide = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsShowFilter(false)
        }

    }

    const handleShowFilter = () => {
        setIsShowFilter(!isShowFilter)
    }

    const handleFilterByPrice = (filterType) => {
        setFilterByPrice(filterType)
        handleShowFilter()
    }

    const handleSearchChange = (event) => {
        const { value } = event.target
        setSearchValue(value)
        if (searchRef.current) {
            clearTimeout(searchRef.current)
        }
        searchRef.current = setTimeout(() => {
            console.log('searchValue in setTimeout: ', searchValue)
            setData(value)
        }, 300)
    }

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected + 1)
    }

    console.log('reRender')

    return (
        <div className='main-content' style={{
            minHeight: `${height}px`,
            backgroundColor: '#f9f9f6fa'
        }}>
            <Container>
                <Row className='py-4'>
                    <div className='d-flex justify-content-between'>
                        <div className='h-100 d-flex align-items-center'>
                            {
                                categoriesOptionList.map(category => {
                                    return (
                                        <NavLink
                                            key={category.id}
                                            className='mr-5 border-0 bg-transparent'
                                            to={category.to}
                                            // className='header__nav-link text-decoration-none'
                                            activeStyle={{
                                                fontWeight: 'bold',
                                                color: 'var(--main-color)'
                                            }}
                                        >
                                            {category.name}
                                        </NavLink>
                                    )
                                })
                            }
                        </div>

                        <div className='d-flex justify-content-end'>
                            {/* filter */}
                            <div
                                ref={filterRef}
                                style={{
                                    position: 'relative'
                                }}
                            >
                                <button
                                    className='rounded mr-4 bg-transparent'
                                    style={{
                                        border: '2px solid var(--main-color)'
                                    }}
                                    onClick={handleShowFilter}
                                >
                                    <img src={filterIcon} alt='filter icon' width='20px' height='20px' />
                                    <span className='ml-2'>Filter</span>
                                </button>
                                {
                                    isShowFilter && (
                                        <div className='rounded' style={{
                                            position: 'absolute',
                                            top: '110%',
                                            zIndex: '2',
                                            border: '1px solid var(--main-color)',
                                            backgroundColor: '#fff',
                                            padding: '0px 10px',
                                            cursor: 'pointer'
                                        }}>
                                            <p
                                                className='border-bottom cursor-pointer my-2'
                                                onClick={() => handleFilterByPrice('highToLow')}
                                            >
                                                price
                                                <img src={upToDownIcon} alt='updown icon' height='30px' width='20px' />
                                            </p>
                                            <p
                                                className='border-bottom'
                                                onClick={() => handleFilterByPrice('lowToHigh')}
                                            >
                                                price
                                                <img src={downToUpIcon} alt='downup icon' height='30px' width='20px' />
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                            {/* search */}
                            <div className='h-100 d-flex'>
                                <div style={{
                                    position: 'relative'
                                }}>
                                    <img src={searchIcon} alt='search icon' width='20px' height='20px' style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)'
                                    }} />
                                    <input type='text' onChange={handleSearchChange} value={searchValue} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
                {isLoaded ?
                    (<>
                        <Row className='py-4'>
                            {productList.map(item => {

                                return (
                                    <Col key={item._id} lg='3' md='4' xs='6' className='px-3 mb-5'>
                                        <Item
                                            id={item._id}
                                            name={item.name}
                                            price={item.price}
                                            category={item.category}
                                            discount={item?.discount}
                                            url={item.color[0].imageUrlList[0]}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>
                        <Row className='pb-4'>
                            <Col lg={{ size: '6', offset: '3' }} sm={{ size: '8', offset: '2' }} xs={{ size: '10', offset: '1' }}>
                                <div lg={{ size: '2', offset: '1' }} md='6'>
                                    <ReactPaginate
                                        nextLabel={'next'}
                                        breakLabel={'...'}
                                        pageRangeDisplayed={3}
                                        pageCount={countOfItem}
                                        marginPagesDisplayed={2}
                                        previousLabel={'previous'}
                                        breakClassName={'break-me'}
                                        onPageChange={handlePageClick}
                                        containerClassName={'pagination'}
                                        activeClassName={'pagination-active'}
                                    />
                                </div>
                            </Col>
                        </Row>
                    </>) : (
                        <p>Loading...</p>
                    )}
            </Container>
        </div>
    )
}

export default Shop