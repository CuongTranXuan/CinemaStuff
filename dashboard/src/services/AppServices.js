// define all action with server
import { authHeader } from '@/services/AuthHeader.js'
import router from '../router.js'
import AuthServices from '@/services/AuthServices.js'
export default {
    getFilmList,
    // getFilm,
    createFilm,
    updateFilm,
    removeFilm,
    uploadSubtitle,
}

function getFilmList () {
    const header = authHeader()
    // header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'GET',
        headers: header,
    }
    return fetch('http://125.212.138.107/api/films', requestOptions)
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
    return fetch(`http://125.212.138.107/api/admin/films/${filmParams._id}`, requestOptions).then(handleResponse)
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
    return fetch('http://125.212.138.107/api/admin/films/create', requestOptions).then(handleResponse)
}

function removeFilm (id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    }

    return fetch(`http://125.212.138.107/api/admin/films/${id}`, requestOptions).then(handleResponse)
}
function uploadSubtitle (formData) {
    const header = authHeader()
    header['Content-Type'] = 'multipart/form-data'
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: formData,
    }
    return fetch('http://125.212.138.107/api/admin/upload_sub', requestOptions).then(handleResponse)
}

function handleResponse (response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                AuthServices.logout()
                router.push('/login')
            }

            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        }

        return data
    })
}
