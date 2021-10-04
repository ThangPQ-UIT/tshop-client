import React, { useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useDispatch } from 'react-redux'

import { hideToast } from 'redux/reducers/toasts/toast.actions'

import checkIcon from 'assets/icons/check-solid.svg'
import exclamationIcon from 'assets/icons/exclamation-solid.svg'

import './style.css'

const Toast = ({ type, message, id, order }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        toastTimer()
        return () => clearTimeout(toastTimer)
    }, [])


    const toastTimer = () => {
        setTimeout(() => {
            dispatch(hideToast(id))
        }, 5000)
    }

    const handleToast = () => {
        dispatch(hideToast(id))
        clearTimeout(toastTimer)
    }

    console.log('type: ', type)
    const icon = type === 'success' ? checkIcon : exclamationIcon
    let clNameToast = type === 'success' ? 'success' : 'error'

    return (
        <>
            <div id='toast' className={`ecm-toast ${clNameToast} p-2 rounded ${order}`} style={{
                width: '330px',
                right: '-3300px',
            }}>
                <Container>
                    <Row>
                        <Col lg='2' className='p-0'>
                            <div className='rounded-circle mr-2 d-flex align-items-center justify-content-center' style={{
                                backgroundColor: '#fff',
                                height: '40px',
                                width: '40px'
                            }}>
                                <img src={icon} alt='icon toast' width='20px' height='20px' />
                            </div>
                        </Col>
                        <Col lg='9' className='p-0'>
                            <div className='mr-2'>
                                <p className='m-0 text-capitalize fw-bolder'>{type}</p>
                                <p className='m-0 small'>{message}</p>

                            </div>
                        </Col>
                        <Col lg='1' className='p-0 d-flex justify-content-end'>
                            <div>
                                <button
                                    className='p-0 fw-bolder bg-transparent border-0 text-light'
                                    onClick={handleToast}
                                >
                                    X
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Toast