import React, { useEffect, useRef, useState } from 'react'
import Pagination from 'react-js-pagination'
import { useLocation } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Item from './Item_Component/item'
import Select from 'components/select/select'
import Loading from 'components/loading/loading'
import SearchInput from 'components/search_input/search_input'

import { priceOptionList, categoriesOptionList } from './shop.data'

import './style.css'
import axiosInstance from 'api'
import setHeightMainContent from 'utilities/setHeightMainContent'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Shop = () => {

    const searchInputRef = useRef(null)
    const query = useQuery()
    const category = query.get('category')

    const [height, setHeight] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [countOfItem, setCountOfItem] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [productList, setProductList] = useState([])
    const [filterByPrice, setFilterByPrice] = useState('price')
    const [filterByCategory, setFilterByCategory] = useState(category ? category : 'categories')


    useEffect(() => {
        setHeightMainContent(setHeight)
    }, [])

    useEffect(() => {
        setData()
        window.scrollTo(0, 0)
    }, [filterByPrice, currentPage, filterByCategory])

    const getData = async (searchValue) => {
        try {
            setIsLoaded(false)
            if (!searchValue) {
                searchValue = ''
            }

            const response = await axiosInstance.get(`/products?limit=${8}&current_page=${currentPage}&name=${searchValue}&price_type=${filterByPrice}&category=${filterByCategory}`
            )
            const data = response.data

            return data
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const setData = async (value) => {
        try {
            const { productList, countRow } = await getData(value)
            setCountOfItem(countRow)
            setProductList(productList)
        } catch (error) {
            console.log('error: ', error)
        } finally {
            setIsLoaded(true)
        }
    }

    const handlePageClick = (selected) => {
        console.log(selected)
        setCurrentPage(selected)
    }

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

    const handlePriceChange = (event) => {
        const { value } = event.target
        setFilterByPrice(value)
        setCurrentPage(1)
        return
    }

    const handleCategoryChange = (event) => {
        const { value } = event.target
        setSearchValue('')
        setFilterByCategory(value)
        setCurrentPage(1)
        return
    }

    return (
        <div className='main-content' style={{
            minHeight: `${height}px`,
            backgroundColor: 'var(--main-bg)',
        }}>
            <Container>
                <h3 className='text-center font-weight-bold pt-4 pb-4 pb-lg-5' style={{
                    color: 'var(--main-color)'
                }}>
                    <u>Shop</u>
                </h3>
                <Row className='pb-4'>
                    <div className='shop__category-filter-search-container'>
                        {/* search */}
                        <div className='shop__search-container'>
                            <SearchInput
                                isOpen={isOpen}
                                searchValue={searchValue}
                                handleOnChange={handleSearchChange}
                                toggleSearchInput={toggleSearchInput}
                                ref={searchInputRef}

                            />
                        </div>
                        <div className='shop__filter-search-container'>
                            {/* filter by price */}
                            <div className='mr-4'>
                                <Select handleOnChange={handlePriceChange} filterValue={filterByPrice} optionList={priceOptionList} />
                            </div>
                            {/* filter by category */}
                            <div className='shop__filter-category-select'>
                                <Select handleOnChange={handleCategoryChange} filterValue={filterByCategory} optionList={categoriesOptionList} />
                            </div>
                        </div>
                    </div>
                </Row>
                {isLoaded ? (
                    <>
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
                    </>) : (
                    <div style={{
                        height: '200px'
                    }}>
                        <Loading />
                    </div>
                )}
                {countOfItem > 1 && (
                    <Row className='pb-4'>
                        <Col lg={{ size: '6', offset: '3' }} sm={{ size: '8', offset: '2' }} xs={{ size: '10', offset: '1' }}>
                            <div lg={{ size: '2', offset: '1' }} md='6'>
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={8}
                                    totalItemsCount={countOfItem}
                                    pageRangeDisplayed={3}
                                    onChange={handlePageClick}
                                />
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default Shop