import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Banner from './Home_Components/Banner/banner'
import Jounal from './Home_Components/Jounal/jounal'
import Product from './Home_Components/Product/product'
// import Introduce from './component/Introduce/introduce'
import Category from './Home_Components/Categories/categories'

import { addToast } from 'redux/reducers/toasts/toast.actions'

import axiosInstance from 'api'
// import FeatureCollection from './Home_Components/FeatureCollection/feature_collection'

const Home = () => {

    const dispatch = useDispatch()

    const [blogList, setBlogList] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const getBlogData = async () => {
        try {
            const response = await axiosInstance.get('/blogs')
            const { result } = response.data
            return result
        } catch (error) {
            const action = {
                type: 'error',
                message: error,
            }

            dispatch(addToast(action))
        }
    }

    const setBlogData = async () => {
        try {
            const data = await getBlogData()
            setBlogList(data)
        } catch (error) {
            console.log('error: ', error)
            const action = {
                type: 'error',
                message: error,
            }

            dispatch(addToast(action))
        } finally {
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        setBlogData()
    }, [])

    return (
        <>
            <div className='main-content'>
                <Banner />
                {/* <Introduce /> */}
                <Category />
                {/* <FeatureCollection /> */}
                <Product />
                {isLoaded ? (
                    <Jounal blogList={blogList} />
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default Home