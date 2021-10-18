import axiosInstance from 'api'
import axios from 'axios'
import { loginByGoogle } from 'redux/reducers/user/user.actions'

const UserService = {
    async login(values) {
        try {
            const { email, password } = values
            const bodyPost = {
                email,
                password
            }

            const response = await axiosInstance.post('/user/authenticate/login', bodyPost)

            return response
        } catch (error) {
            const { errorMessage } = error.response.data
            throw errorMessage
        }
    },
    async loginByFacebook(values) {
        try {
            const { userID, name } = values
            const bodyPost = {
                name,
                userID
            }
            const response = await axiosInstance.post('/user/authenticate/facebook-login', bodyPost)

            return response
        } catch (error) {
            const { errorMessage } = error.response.data
            throw errorMessage
        }
    },
    async loginByGoogle(tokenId) {
        try {
            const bodyPost = {
                tokenId
            }
            const response = await axiosInstance.post('/user/authenticate/google-login', bodyPost)

            return response
        } catch (error) {
            console.log('error: ', error)
        }
    },
    async logout() {
        const refreshToken = localStorage.getItem('refreshToken')
        await axiosInstance.post('/user/authenticate/logout', { refreshToken })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
    }
}

export default UserService