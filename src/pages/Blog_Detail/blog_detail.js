import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router'

import axiosInstance from 'api'

import { formatDate } from 'utilities/formatDate'

const BlogDetail = () => {
    let { slug } = useParams()

    const [blog, setBlog] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

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
        <>
            {
                !isLoaded ? (
                    <p>Loading...</p>
                ) : (
                    <div className='main-content'>
                        <Container>
                            <Row className='py-5'>
                                <Col lg={{ size: '10', offset: '1' }}>
                                    <h3 className='text-center'>{blog.title}</h3>
                                    <p>{formatDate(new Date(blog.created_at))}</p>
                                    <p dangerouslySetInnerHTML={{ __html: blog.content }} className='ckeditor-content'></p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        </>
    )
}

export default BlogDetail