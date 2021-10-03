import React, { useState, useEffect, useRef } from 'react'
import { Container, Col, Row } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, NavLink, useHistory, Link } from 'react-router-dom'

import bagIcon from 'assets/icons/bag.svg'
import barsIcon from 'assets/icons/bars.svg'
import heartIcon from 'assets/icons/heart.svg'
import userIcon from 'assets/icons/person.svg'
import logoutIcon from 'assets/icons/logout.svg'

import { logout as logOutAction } from 'redux/reducers/user/user.actions'

import './style.css'

const Header = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const userNavBarRef = useRef(null)

    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)

    const [isShowUserInfor, setIsShowUserInfor] = useState(false)
    const [borderBottomHeader, setBorderBottomHeader] = useState(false)

    const name = user?.name
    const isAuthenticated = user?.isAuthenticated

    useEffect(() => {

        const header = document.getElementById('header')
        const headerHeight = header.offsetHeight

        document.addEventListener('scroll', () => {
            handleScroll(headerHeight)
        })

        // add event mousedown when mounted to toggle 
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleScroll = () => {

        if (window.scrollY < 10) {
            setBorderBottomHeader(false)
        } else {
            setBorderBottomHeader(true)
        }
    }

    const handleClickOutside = (event) => {
        if (userNavBarRef.current && !userNavBarRef.current.contains(event.target)) {
            setIsShowUserInfor(false)
        }
    }

    // Hide header on the login page
    // const location = useLocation()
    // if (location.pathname.includes('login') || location.pathname.includes('signup')) {
    //     return (
    //         <div id='header' className='d-none'></div>
    //     )
    // }

    // Show and hide user infor
    const handleToggleUserInfor = () => {
        setIsShowUserInfor(!isShowUserInfor)
    }

    // Logout
    const logOut = () => {
        dispatch(logOutAction())
        handleToggleUserInfor()
        history.push('/login')
    }

    const handleIcon = (e) => {
        console.log('event: ', e.target)
    }

    console.log('header rerender')

    return (
        <div id='header'>
            <Container className='border-bottomss h-100' style={{
                borderBottom: borderBottomHeader ? '1px solid var(--main-lighter-color)' : ''
            }}>
                <Row className='h-100'>
                    <Col xs='2' sm='8' md='2' lg='2'>
                        <div className='header-brand h-100 d-flex align-items-center'>
                            <Link to='/' className='text-decoration-none' style={{
                                color: 'var(--main-color)'
                            }}>
                                <h3 className='m-0'>Durotan</h3>
                            </Link>
                        </div>
                    </Col>
                    <Col xs='5' sm='0' md='8' lg='5' className='d-none d-md-block'>
                        <ul className='h-100 d-flex justify-content-evenly align-items-center p-0 m-0'>
                            <li className='nav-link-list list-unstyled py-3'>
                                <NavLink
                                    exact
                                    to='/'
                                    className='header__nav-link text-decoration-none'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-link-list list-unstyled'>
                                <NavLink
                                    to='/shop'
                                    className='header__nav-link text-decoration-none'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                >
                                    Shop
                                </NavLink>
                            </li>
                            <li className='nav-link-list list-unstyled'>
                                <NavLink
                                    to='/blog'
                                    className='header__nav-link text-decoration-none'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                >
                                    Blog
                                </NavLink>
                            </li>
                            <li className='nav-link-list list-unstyled'>
                                <NavLink
                                    to='/contact'
                                    className='header__nav-link text-decoration-none'
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        color: 'var(--main-color)'
                                    }}
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul></Col>
                    <Col xs='5' sm='4' md='2' lg='5' className='d-md-flex d-none justify-content-end align-items-center '>
                        <div className='d-sm-flex justify-content-md-between justify-content-lg-end w-100'>
                            <Link to='/wishlist' className='mr-lg-4 pr-md-0 p-0 border-0 bg-transparent'>
                                <img src={heartIcon} alt='heart icon' className='p-0'
                                    onMouseEnter={handleIcon}
                                />
                            </Link>
                            <div className='mr-lg-4 pr-md-0 p-0 bg-transparent' style={{
                                position: 'relative',
                            }}>
                                <Link to='/cart'>
                                    <img src={bagIcon} alt='bag icon' />
                                </Link>
                                {
                                    cart.length > 0 && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: '50%',
                                            left: '60%',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '0px 5px',
                                            borderRadius: '50%',
                                            fontSize: '0.8rem'
                                        }}>{cart.length}</span>
                                    )
                                }
                            </div>
                            <div ref={userNavBarRef} className='user-header position-relative'>
                                {isAuthenticated ? (
                                    <button
                                        className='p-0 m-0 border-0 bg-transparent'
                                        onClick={handleToggleUserInfor}
                                    >
                                        {name}
                                    </button>
                                ) : (
                                    <button
                                        className='p-0 m-0 border-0 bg-transparent'
                                        onClick={handleToggleUserInfor}
                                    >
                                        <img src={userIcon} alt='user icon' height='24px' width='24px' />
                                    </button>
                                )}
                                {
                                    isShowUserInfor && (
                                        <div className='position-absolute p-2 pr-0 user-infor'>
                                            {isAuthenticated ? (
                                                <>
                                                    <Link to='/account'
                                                        className='mb-2 text-decoration-none d-flex'
                                                        style={{
                                                            color: '#fff',
                                                            textAlign: 'center'
                                                        }}
                                                        onClick={handleToggleUserInfor}
                                                    >
                                                        <span>
                                                            <img src={userIcon} alt='logout icon' height='18px' width='18px' />
                                                        </span>
                                                        <span className='ml-2 text-left'>My account</span>
                                                    </Link>
                                                    <button onClick={logOut} className='border-0 bg-transparent p-0'>
                                                        <span>
                                                            <img src={logoutIcon} alt='logout icon' height='18px' width='18px' />
                                                        </span>
                                                        <span className='ml-2' style={{ color: '#fff' }}>Logout</span>
                                                    </button>

                                                </>
                                            ) : (
                                                <Link to='/login' className='text-center d-block'>Login</Link>
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Col>
                    {/* only show on the smaller screeen */}
                    <Col className='d-flex justify-content-end align-items-center d-md-none'>
                        <img src={barsIcon} alt='bars icon' height='24px' width='24px' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header