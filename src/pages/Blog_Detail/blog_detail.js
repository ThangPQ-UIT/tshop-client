import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router'

import Loading from 'components/loading/loading'

import axiosInstance from 'api'

import { formatDate } from 'utilities/formatDate'
import setHeightMainContent from 'utilities/setHeightMainContent'

const BlogDetail = () => {
    let { slug } = useParams()

    const [blog, setBlog] = useState([])
    const [height, setHeight] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setHeightMainContent(setHeight)
    }, [])

    const getData = async () => {
        try {
            const response = await axiosInstance.get(`/blogs/${slug}`)
            const { result } = response.data
            return result
        } catch (err) {
            console.log('error: ', err)
        }
    }

    const setData = async () => {
        try {
            const data = await getData()
            setBlog(data)
        } catch (err) {
            console.log('error: ', err)
        } finally {
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        setData()
    }, [])

    return (
        <div className='main-content' style={{
            minHeight: `${height}px`
        }}>
            <Container>
                <Row className='py-5'>
                    {
                        isLoaded ? (
                            <Col lg={{ size: '10', offset: '1' }}>
                                <h3 className='text-center'>{blog.title}</h3>
                                <p>{formatDate(new Date(blog.created_at))}</p>
                                <p dangerouslySetInnerHTML={{ __html: blog.content }} className='ckeditor-content'></p>
                            </Col>
                        ) : (
                            <Loading />
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}

export default BlogDetail