import axios from 'axios'
import { authHeader } from '@/services/AuthHeader.js'
const API_URL = 'http://125.212.138.107/api/user'

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
        window.console.log("logged out", JSON.parse(localStorage.getItem('user')))
    }

    register (user) {
        return axios.post(API_URL + '/register', {
            username: user.username,
            password: user.password,
            role: user.role,
        })
    }
    getQRcode(username){
        const header = authHeader()
        return axios.post(`${API_URL}/qrcode`, {
            username: username
        },{
            headers: header
        })
    }
}
export default new AuthService()
