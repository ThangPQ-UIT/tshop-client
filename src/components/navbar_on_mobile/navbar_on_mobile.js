import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import bagIcon from 'assets/icons/bag.svg'
import heartIcon from 'assets/icons/heart.svg'

import './style.css'

const NarbarOnMobile = ({ handleShowHideNavbarOnMobile, isAuthenticated, name }) => {
    return (
        <div className='border position-absolute py-3 px-5 navbar-on-mobile'>
            {isAuthenticated ? (
                <div className='border-bottom pb-3'>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup' className='ml-4'>Sign up</Link>
                </div>
            ) : <p>{name}</p>}
            <div className='my-3 border-bottom pb-3'>
                <Link to='/wishlist' onClick={handleShowHideNavbarOnMobile}>
                    <img src={heartIcon} alt='heart icon' className='p-0' />
                </Link>
                <Link to='/cart' className='ml-4' onClick={handleShowHideNavbarOnMobile}>
                    <img src={bagIcon} alt='bag icon' />
                </Link>
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