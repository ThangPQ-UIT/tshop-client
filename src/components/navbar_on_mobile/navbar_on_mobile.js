import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import userIcon from 'assets/icons/user-regular.svg'
import bagIcon from 'assets/icons/bag-white.svg'
import heartIcon from 'assets/icons/heart-white.svg'

import './style.css'

const NarbarOnMobile = ({ handleShowHideNavbarOnMobile, isAuthenticated, name, cart }) => {
    return (
        <div className='border position-absolute py-3 px-5 navbar-on-mobile'>
            {isAuthenticated ? (
                <p className='text-white d-flex align-items-center'>
                    <span className='mr-2 ' style={{
                        lineHeight: 'initial'
                    }}>
                        <img src={userIcon} alt='user icon' height='20px' width='20px' />
                    </span>
                    {name}
                </p>
            ) : (
                <div className='border-bottom pb-3'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup' className='ml-4'>Sign up</Link>
                </div>
            )}
            <div className='d-flex my-3 border-bottom pb-3'>
                <div>
                    <Link to='/wishlist' onClick={handleShowHideNavbarOnMobile}>
                        <img src={heartIcon} alt='heart icon' className='p-0' />
                    </Link>
                </div>
                <div className='ml-4 bg-transparent position-relative'>
                    <Link to='/cart' onClick={handleShowHideNavbarOnMobile}>
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
            </div>
            <div>
                <ul className='h-100 d-flex flex-column justify-content-evenly p-0 m-0 text-light'>
                    <li className='nav-link-list list-unstyled mb-4'>
                        <NavLink
                            exact
                            to='/'
                            className='text-white font-weight-bold text-decoration-none'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'var(--main-color)'
                            }}
                            onClick={handleShowHideNavbarOnMobile}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className='nav-link-list list-unstyled mb-4'>
                        <NavLink
                            to='/shop'
                            className='text-white font-weight-bold text-decoration-none'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'var(--main-color)'
                            }}
                            onClick={handleShowHideNavbarOnMobile}
                        >
                            Shop
                        </NavLink>
                    </li>
                    <li className='nav-link-list list-unstyled'>
                        <NavLink
                            to='/blog'
                            className='text-white font-weight-bold text-decoration-none mb-4'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'var(--main-color)'
                            }}
                            onClick={handleShowHideNavbarOnMobile}
                        >
                            Blog
                        </NavLink>
                    </li>
                    <li className='nav-link-list list-unstyled'>
                        <NavLink
                            to='/contact'
                            className='text-white font-weight-bold text-decoration-none'
                            activeStyle={{
                                fontWeight: 'bold',
                                color: 'var(--main-color)'
                            }}
                            onClick={handleShowHideNavbarOnMobile}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NarbarOnMobile