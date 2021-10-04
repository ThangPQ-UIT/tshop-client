import axiosInstance from 'api'
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
        } catch (err) {
            const { errorMessage } = err.response.data
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
            console.log('login by facebook')

            return response
        } catch (error) {
            const { errorMessage } = error.reponse.data
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
    logout: () => {
        localStorage.removeItem('accessToken')
    }
}

export default UserService