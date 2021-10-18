import { createBrowserHistory } from 'history'

import actionTypes from './user.types'
import userService from 'services/user.service'

import { addToast } from 'redux/reducers/toasts/toast.actions'

const history = createBrowserHistory()

const login = (values) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.LOG_IN_REQUEST
        })

        const response = await userService.login(values)
        const { accessToken, refreshToken, name } = response.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        dispatch({
            type: actionTypes.LOG_IN_SUCCESS,
            payload: name
        })

        history.goBack()
    } catch (error) {
        console.log('error login: ', error)
        dispatch({
            type: actionTypes.LOG_IN_FAILURE,
        })

        const action = {
            type: 'error',
            message: error,
        }
        dispatch(addToast(action))
    }
}

const loginByFacebook = (values) => async (dispatch) => {
    try {
        const response = await userService.loginByFacebook(values)
        const { success, accessToken, refreshToken, name } = response.data
        if (success) {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            dispatch({
                type: actionTypes.LOG_IN_SUCCESS,
                payload: name
            })

            history.goBack()
        }
        return
    } catch (error) {
        console.log('error login by facebook: ', error)
        dispatch({
            type: actionTypes.LOG_IN_FAILURE,
            payload: error
        })

        const action = {
            type: 'error',
            message: error,
        }
        dispatch(addToast(action))
    }
}

const loginByGoogle = (tokenId) => async (dispatch) => {
    try {
        const response = await userService.loginByGoogle(tokenId)
        const { success, accessToken, refreshToken, name } = response.data

        if (success) {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            dispatch({
                type: actionTypes.LOG_IN_SUCCESS,
                payload: name
            })

            history.goBack()
        }
        return
    } catch (error) {
        console.log('error from login Google: ', error)
    }
}

const logout = () => (dispatch) => {
    userService.logout()
    dispatch({
        type: actionTypes.LOG_OUT

    })
}

const update = (data) => {

    return {
        type: actionTypes.UPDATE,
        payload: data
    }
}

export { login, logout, loginByFacebook, loginByGoogle, update }