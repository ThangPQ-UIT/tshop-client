import axios from 'axios'
// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_URL

const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
})

//request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
//response interceptor to refresh token on receiving token expired error
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    function (error) {
        const originalRequest = error.config
        let refreshToken = localStorage.getItem('refreshToken')
        if (
            refreshToken &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            return axios
                .post(`${baseURL}/user/refresh-token`, { refreshToken: refreshToken })
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem('accessToken', res.data.accessToken)
                        console.log('Access token refreshed!')
                        return axiosInstance(originalRequest)
                    }
                })
                .catch(error => {
                    throw (error)
                })
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
