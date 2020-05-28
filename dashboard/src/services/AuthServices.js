import axios from 'axios'

const API_URL = 'http://125.212.203.148/api/user'

class AuthService {
    login (user) {
        return axios
        .post(API_URL + '/authenticate', {
            username: user.username,
            password: user.password,
        })
        .then(response => {
            if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data
        })
    }

    logout () {
        localStorage.removeItem('user')
    }

    register (user) {
        return axios.post(API_URL + '/register', {
            username: user.username,
            password: user.password,
            role: user.role,
        })
    }
}
export default new AuthService()
