import axios from 'axios'
import { authHeader } from '@/services/AuthHeader.js'
const API_URL = 'http://125.212.203.148/api/user'

class AuthService {
    login (user) {
        return axios
        .post(API_URL + '/authenticate', {
            username: user.username,
            password: user.password,
        })
        .then(response => {
            if (response.status === 401) return response.data.message
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        })
    }

    logout () {
        localStorage.removeItem('user')
        window.console.log('logged out', JSON.parse(localStorage.getItem('user')))
    }

    register (user) {
        return axios.post(API_URL + '/register', {
            username: user.username,
            password: user.password,
            role: user.role,
        })
    }

    getQRcode (id) {
        const header = authHeader()
        return axios.get(`${API_URL}/${id}`, { headers: header })
    }

    createQRcode (username) {
        const header = authHeader()
        return axios.post(`${API_URL}/qrcode`, {
            username: username,
        }, {
            headers: header,
        })
    }

    verifyOTP (username, code) {
        const header = authHeader()
        return axios.post(`${API_URL}/qrcode/validate`, {
            username: username,
            code: code,
        }, {
            headers: header,
        })
    }
}
export default new AuthService()
