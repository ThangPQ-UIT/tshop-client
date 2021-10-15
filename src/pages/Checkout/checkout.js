import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

import CartItem from 'pages/Cart/Cart_Components/CartItem/cart_item'

import axiosInstance from 'api'
// eslint-disable-next-line no-undef
const locationAPI = process.env.REACT_APP_LOCATION_API

import './style.css'

const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const idList = cart.map(item => item.id)

    const [height, setHeight] = useState()
    const [total, setTotal] = useState(0)
    const [cartData, setCartData] = useState([])
    const [countItem, setCountItem] = useState(0)
    const [locationData, setLocationData] = useState()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        city: '',
        district: '',
        ward: '',
        street: ''

    })
    const [wardList, setWardList] = useState()
    const [districtList, setDistrictList] = useState()

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
    }, [])

    useEffect(() => {
        setData()
        handleSetCartData()
        handleLocationData()
    }, [cart])

    const handleGetCartData = async () => {
        try {
            const response = await axiosInstance.get(`/products?id_list=${idList}`)
            const { productList } = response.data
            return productList

        } catch (err) {
            console.log('error: ', err)
        }
    }

    const handleSetCartData = async () => {
        const productList = await handleGetCartData()

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

    const getData = async () => {
        try {
            const token = await localStorage.getItem('accessToken')
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axiosInstance.get('/user', config)
            const { data } = response

            return data
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const setData = async () => {
        try {
            // const data = await getData()
            // const locations = await axiosInstance.get(locationAPI)
            const data = await Promise.all([getData(), axiosInstance.get(locationAPI)])
            const userData = data[0]
            const locations = data[1]

            const { name, phoneNumber, email, address } = userData
            const { city, district, ward, street } = address

            // update values to location options, based on data from the server
            if (city) {
                const cityData = locations.data.find(location => location.name === city)
                const { districts } = cityData
                setDistrictList(districts)

                if (district) {
                    const districtData = districts.find(dtr => dtr.name === district)
                    const { wards } = districtData
                    setWardList(wards)
                }
            }

            setFormData({
                ...formData,
                name,
                email,
                phoneNumber,
                city,
                district,
                ward,
                street
            })
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleLocationData = async () => {
        try {
            const response = await axiosInstance.get(locationAPI)
            const { data } = response
            setLocationData(data)

        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleSelectLocation = (event) => {

    }

    return (
        <div className='main-content' style={{
            minHeight: `${height}px`
        }}>
            <Container>
                <h3 className='text-center font-weight-bold py-4' style={{
                    color: 'var(--main-color)'
                }}>Check out</h3>
                <Row className='mb-4'>
                    <Col lg='8' className='py-3 pr-3'>
                        <h3>Nhap cac chi tiet ve viec gui hang</h3>
                        <p className='font-weight-bold mt-4'>Thong tin lien he</p>
                        <div className='d-flex w-100 py-3 checkout__user-infor-container'>
                            <div className='mb-3 user-infor__email-field'>
                                <span className='d-block mb-2'>Email</span>
                                <input className='w-100 pl-2' type='email' value={formData.email} style={{
                                    lineHeight: '1rem',
                                    padding: '8px 0px'
                                }} />
                            </div>
                            <div className='user-infor__phone-field'>
                                <span className='d-block mb-2'>Phone</span>
                                <input className='w-100 pl-2' type='tel' value={formData.phoneNumber} style={{
                                    lineHeight: '1rem',
                                    padding: '8px 0px'
                                }} />
                            </div>
                        </div>
                        <p className='font-weight-bold mt-3'>Thong tin giao hang</p>
                        <div className='user-infor__name-field'>
                            <span className='d-block mb-2'>Name</span>
                            <input className='w-100 pl-2' type='text' value={formData.name} style={{
                                lineHeight: '1rem',
                                padding: '8px 0px'
                            }} />
                        </div>
                        <div className='d-flex my-3'>
                            <div className='w-50 pr-3'>
                                <span className='d-block mb-2'>City</span>
                                <select className='w-100 py-2 pl-2' onChange={handleSelectLocation} value={formData.city}>
                                    <option>Select City</option>
                                    {locationData && locationData.map(location => {
                                        return (
                                            <option key={location.code}>{location.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='w-50 pl-3'>
                                <span className='d-block mb-2'>District</span>
                                <select className='py-2 w-100 pl-2' onChange={handleSelectLocation} value={formData.district}>
                                    <option>Select district</option>
                                    {districtList && districtList.map(district => {
                                        return (
                                            <option key={district.code}>{district.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='w-50 pr-3'>
                                <span className='d-block mb-2'>Ward</span>
                                <select className='py-2 pl-2 w-100' onChange={handleSelectLocation} value={formData.ward}>
                                    <option>Select ward</option>
                                    {wardList && wardList.map(ward => {
                                        return <option key={ward.code}> {ward.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className='w-50 pl-3'>
                                <span className='d-block mb-2'>Street</span>
                                <input className='w-100 pl-2' style={{
                                    lineHeight: '1rem',
                                    padding: '8px 0px'
                                }} type='text' value={formData.street} />
                            </div>
                        </div>
                    </Col>
                    <Col lg='4' className='py-3' style={{
                        backgroundColor: 'var(--main-lighter-color)',
                    }}>
                        <h4>Chi tiet gio hang</h4>
                        <div className='checkout__cart-infor-container mt-4'>
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
                        </div>
                        <div className='mt-3'>
                            <p>{countItem} items</p>
                            <p>Delivery fee: free</p>
                            <p>Total: ${total}</p>
                            <button className='w-100 text-white border-0 my-4 py-2 rounded font-weight-bold' style={{
                                backgroundColor: 'var(--main-color)',
                                fontSize: '1.2rem',
                            }}>CHECK OUT</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Checkout