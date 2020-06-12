// define all action with server
import { authHeader } from '@/services/AuthHeader.js'
import router from '../router.js'
import store from '../store.js'
const API_URL = 'http://125.212.138.107/api'

export default {
    getConcurrent,
}

function getConcurrent() {
    const header = authHeader()
    const requestOptions = {
        method:'GET',
        headers: header
    }
    return fetch(`${API_URL}/statistic/concurrents`,requestOptions)
        .then(handleResponse)
}



function handleResponse (response) {
    return response.text().then(text => {
        console.log(response)
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                store.dispatch('logout')
                alert('Session expired, please login again')
                router.push('/login')
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}
