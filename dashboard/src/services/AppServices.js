// define all action with server
import { authHeader } from '@/services/AuthHeader.js'
import router from '../router.js'
import store from '../store.js'
const API_URL = 'http://125.212.203.148/api'
export default {
    getFilmList,
    // getFilm,
    createFilm,
    updateFilm,
    removeFilm,
    uploadSubtitle,
    uploadVideo,
    encodeVideo,
}

function getFilmList () {
    const header = authHeader()
    // header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'GET',
        headers: header,
    }
    return fetch(`${API_URL}/admin`, requestOptions)
            .then(handleResponse)
}

function updateFilm (filmParams) {
    const header = authHeader()
    header['Content-Type'] = 'application/json'
    const requestOptions = {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: header,
        body: JSON.stringify(filmParams),
    }
    return fetch(`${API_URL}/admin/films/${filmParams._id}`, requestOptions).then(handleResponse)
}

function createFilm (filmParams) {
    const header = authHeader()
    header['Content-Type'] = 'application/json'
    const requestOptions = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: header,
        body: JSON.stringify(filmParams),
    }
    return fetch(`${API_URL}/admin/films/create`, requestOptions).then(handleResponse)
}

function removeFilm (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    }

    return fetch(`${API_URL}/admin/films/${id}`, requestOptions).then(handleResponse)
}
function uploadSubtitle (formData) {
    const header = authHeader()
    // header['Content-Type'] = 'multipart/form-data' // let fetch auto add content-type header + boundary for upload file
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: formData,
    }
    return fetch(`${API_URL}/admin/upload_sub`, requestOptions).then(handleResponse)
}
function uploadVideo (formData) {
    const header = authHeader()
    // header['Content-Type'] = 'multipart/form-data' // let fetch auto add content-type header + boundary for upload file
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: formData,
    }
    return fetch(`${API_URL}/admin/upload_video`, requestOptions).then(handleResponse)
}

function encodeVideo (data) {
    const header = authHeader()
    header['Content-Type'] = 'application/json'
    const requestOptions = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: header,
        body: JSON.stringify(data),
    }
    return fetch(`${API_URL}/admin/encode`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
    return response.text().then(text => {
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
