import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

import emptyCartIcon from 'assets/icons/empty-cart.svg'

import axiosInstance from 'api'
import './style.css'
import CartItem from './Cart_Components/CartItem/cart_item'

const Cart = () => {

    const [total, setTotal] = useState(0)
    const [height, setHeight] = useState()
    const [cartData, setCartData] = useState([])
    const [countItem, setCountItem] = useState(0)

    const cart = useSelector(state => state.cart)
    const idList = cart.map(item => item.id)

    const handleGetData = async () => {
        try {
            const response = await axiosInstance.get(`/products?id_list=${idList}`)
            const { productList } = response.data
            return productList

        } catch (err) {
            console.log('error: ', err)
        }
    }

    const handleSetData = async () => {
        const productList = await handleGetData()

        // get the price and image data from database 
        // then concaternate to the cart array (currently just have id, color, price, and quantity)
        const fullInforItemList = cart.map(cartItem => {
            const product = productList.find(product => {
                return product._id === cartItem.id
            })

            const image = product.color.find(productItem => {
                return productItem.color === cartItem.color
            })

            const newItem = {
                ...cartItem,
                image: image.imageUrlList[0],
                price: product.price,
                name: product.name
            }

            return newItem
        })

        handleSetCoutOfItem(fullInforItemList)
        handleSetSumOfPrice(fullInforItemList)
        setCartData(fullInforItemList)
    }

    useEffect(() => {
        // Set height for component
        window.scrollTo(0, 0)
        const header = document.getElementById('header')
        const footer = document.getElementById('footer')

        const headerHeight = header.offsetHeight
        const footerHeight = footer.offsetHeight
        const screenHeight = window.innerHeight

        const cartHeight = screenHeight - headerHeight - footerHeight
        setHeight(cartHeight)

        handleSetData()
    }, [cart])

    const handleSetSumOfPrice = (data) => {
        // set total of price
        const sumOfPrice = data.reduce((pre, cur) => {
            const sum = pre + cur.price * cur.quantity
            return sum
        }, 0)

        setTotal(sumOfPrice)
    }

    const handleSetCoutOfItem = (data) => {
        // set cout of item
        const countOfItem = data.reduce((pre, cur) => {
            const count = pre + (+cur.quantity)
            return count
        }, 0)

        setCountItem(countOfItem)
    }

    return (
        <div className='py-5 main-content' style={{
            minHeight: `${height}px`
        }}>
            <Container>
                {idList.length ? (
                    <Row>
                        <Col lg='7' className='border-right pr-3'>
                            {cartData.map(item => {
                                return (
                                    <CartItem
                                        key={item.id + item.color + item.size}
                                        id={item.id}
                                        name={item.name}
                                        size={item.size}
                                        color={item.color}
                                        price={item.price}
                                        imgSrc={item.image}
                                        quantity={item.quantity}
                                    />
                                )
                            })}
                        </Col>
                        <Col lg='5'>
                            <div
                                className='p-3'
                                style={{
                                    backgroundColor: '#fff'
                                }}
                            >
                                <p style={{
                                    fontWeight: '400'
                                }}>Moi thong tin cua quy khach se duoc bao mat</p>
                                <p style={{
                                    fontWeight: '400'
                                }}>Delivery expenses: <span>0</span></p>
                                <p style={{
                                    fontWeight: '400'
                                }}>Total: <span>${total}</span></p>
                                <p>{countItem} items</p>
                                <Link
                                    to='/checkout'
                                    className='w-100 d-inline-block text-center border-0 py-2 text-uppercase font-weight-bold text-decoration-none'
                                    style={{
                                        backgroundColor: 'var(--main-color)',
                                        color: '#fff'
                                    }}
                                >
                                    Check out
                                </Link>
                                <div className='text-center mt-4'>
                                    <Link to='/shop'>
                                        Continue shopping
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row>
                        <div className='d-flex align-items-center justify-content-center flex-column cart-no-item-container'>
                            <img src={emptyCartIcon} alt='empty cart' height='180px' width='180px' />
                            <p className='my-4'>You don&apos;t have any item in the cart</p>
                            <Link
                                to='/shop'
                                className='py-2 px-3 text-decoration-none continue-shopping-btn'
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default Cart