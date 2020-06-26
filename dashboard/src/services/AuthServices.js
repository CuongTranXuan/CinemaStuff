import axios from 'axios'
import { authHeader } from '@/services/AuthHeader.js'
// import store from '../store.js'
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
                localStorage.setItem('authenticated',false)
            }
            return response.data
        })
    }

    logout () {
        localStorage.removeItem('user')
        localStorage.removeItem('authenticated')
        window.console.log('logged out')
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
        return axios.get(`${API_URL}/qrcode/${id}`, { headers: header })
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

    getAll (id) {
        const header = authHeader()
        return axios.get(`${API_URL}`, {
            headers: header,
        }).then(response => {
            return response.data
        })
    }

    _delete (id) {
        const header = authHeader()
        return axios.delete(`${API_URL}/${id}`, { headers: header })
    }

    _update (id, userParams) {
        const header = authHeader()
        return axios.put(`${API_URL}/${id}`, {
            id: userParams.id,
            username: userParams.username,
            password: userParams.password,
            role: userParams.role,
            secret: userParams.secret,
            createdDate: userParams.createdDate,
        }, { headers: header })
    }

    create (userParams) {
        return axios.post(`${API_URL}/register`, {
            username: userParams.username,
            password: userParams.password,
            role: userParams.role,
        })
    }
}
export default new AuthService()
