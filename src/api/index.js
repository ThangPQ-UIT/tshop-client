import axios from 'axios'
// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL


const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${access_token}`
    }
})

export default axiosInstance
