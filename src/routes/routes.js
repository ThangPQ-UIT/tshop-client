import React from 'react'
import {
    Switch,
    Route
} from 'react-router-dom'

import Home from 'pages/Home/home'
import Shop from 'pages/Shop/shop'
import Blog from 'pages/Blog/blog'
import Cart from 'pages/Cart/cart'
import Login from 'pages/Login/login'
import Signup from 'pages/Signup/signup'
import Contact from 'pages/Contact/contact'
import Account from 'pages/Account/account'
import Checkout from 'pages/Checkout/checkout'
import WishList from 'pages/Wishlist/wishlist'
import NotFound from 'pages/Not_Found/not_found'
import BlogDetail from 'pages/Blog_Detail/blog_detail'
import ProductDetail from 'pages/Product_Detail/product_detail'

import ProtectedRoute from 'utilities/protectedRoute'

const Routes = () => {
    return (
        <Switch>
            <ProtectedRoute exact path='/payment' component={Home} />
            <ProtectedRoute exact path='/account' component={Account} />

            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/blog' component={Blog} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/shop' component={Shop} />
            <Route path='/checkout' component={Checkout} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/wishlist' component={WishList} />
            <Route exact path='/blog/:slug' component={BlogDetail} />
            <Route exact path='/shop/:id' component={ProductDetail} />
            <Route exact path='/shop/:category/:id' component={ProductDetail} />

            <Route exact path='*' component={NotFound} />
        </Switch>
    )
}

export default Routes