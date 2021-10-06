import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

import Slider from 'components/slider/slider'

import cartAction from 'redux/reducers/cart/cart.actions'

import axiosInstance from 'api'

import './style.css'
import cartNotificationAction from 'redux/reducers/cartNotification/cartNotification.actions'

const ProductDetail = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    let [size, setSize] = useState()
    const [infortOfItem, setInforOfItem] = useState({
        size: '',
        color: '',
        quantity: '',
    })
    const [height, setHeight] = useState()
    const [category, setCategory] = useState()
    const [quantity, setQuantity] = useState(1)
    const [colorIndex, setColorIndex] = useState(0)
    const [imageIndex, setImageIndex] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)
    const [productData, setProductData] = useState([])
    const [relatedProductList, setRelatedProductList] = useState()

    useEffect(() => {

        // Set height for component
        const header = document.getElementById('header')
        const footer = document.getElementById('footer')

        const headerHeight = header.offsetHeight
        const footerHeight = footer.offsetHeight
        const screenHeight = window.innerHeight

        const cartHeight = screenHeight - headerHeight - footerHeight

        setHeight(cartHeight)

        setData()

    }, [])

    const addToCart = () => {
        // get color having 1st position to pass default color
        const color = productData.color[colorIndex].color

        dispatch(cartAction.addToCart({
            id,
            size,
            color,
            quantity,
        }))
        dispatch(cartNotificationAction.open())
    }

    const getData = async () => {
        try {
            const response = await axiosInstance.get(`/products/${id}`)
            const { product } = response.data

            return product
        } catch (err) {
            console.log('error: ', err)
        }
    }

    const setData = async () => {
        try {
            const data = await getData()
            const { category } = data
            const test = await getRelatedProduct(category)

            setRelatedProductList(test)
            setProductData(data)
        } catch (err) {
            console.log('error: ', err)
        } finally {
            setIsLoaded(true)
        }
    }

    const getRelatedProduct = async (category) => {
        try {
            const response = await axiosInstance.get(`/products?category=${category}`)
            const { productList } = response.data
            return productList
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleSelectQuantity = (e) => {
        const { value } = e.target
        if (value < 1) {
            return
        }
        setQuantity(value)
    }

    const handleSelectColor = (id) => {
        setColorIndex(id)
    }

    const handleSelectSize = (e) => {
        const { value } = e.target
        setSize(value)
    }

    const handleSelectImage = (id) => {
        setImageIndex(id)
    }

    return (
        <div className='main-content' style={{
            minHeight: height,
            backgroundColor: '#fff'
        }}>
            <Container>
                {
                    isLoaded ? (
                        <Row className='py-5 border'>
                            <Col lg='7' className=''>
                                <div className='d-flex'>
                                    <div className='w-25 d-flex flex-column'>
                                        {
                                            productData.length !== 0 && productData.color[colorIndex].imageUrlList.map((item, index) => {
                                                let additionalClassName = ''
                                                if (index !== imageIndex) {
                                                    additionalClassName = 'overlay'
                                                }
                                                return (
                                                    <img
                                                        src={item}
                                                        key={index}
                                                        height='60px'
                                                        width='50px'
                                                        className={`mb-4 mx-auto ${additionalClassName}`}
                                                        onMouseEnter={() => handleSelectImage(index)}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='w-75'>
                                        <img src={productData.color[colorIndex].imageUrlList[imageIndex]}
                                            height='100%'
                                            width='100%'
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg='5'>
                                <div className='border rounded p-5'>
                                    <p className='bolder'>{productData.name}</p>
                                    <p>${productData.price}</p>
                                    <div className='py-3' style={{
                                        borderTop: '3px dotted'
                                    }}>
                                        <span className='d-inline-block mb-2'>Size</span><br></br>
                                        {
                                            productData.size.map((item, index) => {
                                                let active = false
                                                if (item === size) {
                                                    active = true
                                                }
                                                return (
                                                    <button
                                                        key={index}
                                                        value={item}
                                                        className='mr-3 py-2'
                                                        style={{
                                                            width: '50px',
                                                            boxSizing: 'border-box',
                                                            color: active ? '#fff' : null,
                                                            border: active ? '1px solid var(--main-color)' : '1px solid #000',
                                                            backgroundColor: active ? 'var(--main-color)' : 'transparent',
                                                        }}
                                                        onClick={handleSelectSize}
                                                    >
                                                        {item}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                    <div>
                                        <span className='d-inline-block mb-2'>Color</span><br />
                                        {
                                            productData.color.map((item, index) => {
                                                let borderTemp = 'none'
                                                if (index === colorIndex) {
                                                    borderTemp = '2px solid red'
                                                }
                                                return (
                                                    <div key={index} style={{
                                                        display: 'inline',
                                                        margin: '0px 20px 0px 0px',
                                                        borderBottom: borderTemp,
                                                    }}>
                                                        <button
                                                            style={{
                                                                display: 'inline-flex',
                                                                border: 'none',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '20px',
                                                                height: '20px',
                                                                borderRadius: '50%',
                                                                backgroundColor: item.color,
                                                            }}
                                                            onClick={() => handleSelectColor(index)}
                                                        ></button>
                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            <span className='d-inline-block my-2'>Quantity</span><br></br>
                                            <input type='number' className='product__count' value={quantity} onChange={handleSelectQuantity} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        className='border-0 px-3 py-2 w-100 mt-3 text-light font-weight-bold'
                                        style={{
                                            backgroundColor: size ? 'var(--main-color)' : 'var(--main-lighter-color)',
                                        }}
                                        disabled={size ? false : true}
                                    >
                                        Add to cart
                                    </button>
                                    <div className='mt-3'>
                                        <p>{productData.description}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    ) : (
                        <div>
                            <div>
                                <p>loading...</p>
                            </div>
                        </div>
                    )
                }
                {
                    relatedProductList && (
                        <Row className='pb-5'>
                            <p className='text-center display-6 mb-5'>Related Products</p>
                            <Slider data={relatedProductList} />
                        </Row>
                    )
                }
            </Container>
        </div>
    )
}

export default ProductDetail