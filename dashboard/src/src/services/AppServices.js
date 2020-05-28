// define all action with server
import { API } from '@/services/axios.js'
import { authHeader } from '@/services/AuthHeader.js'
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
    const url = '/films'
    return API.get(url, { header })
}

function updateFilm (filmParams) {
    const header = authHeader()
    header['Content-Type'] = 'application/json'
    const url = `/admin/films/${filmParams._id}`
    return API.put(url, filmParams, { header })
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
    return fetch('http://125.212.203.148/api/admin/films/create', requestOptions)
}

function removeFilm (id) {
    const header = authHeader()
    const url = `/admin/films/${id}`
    return API.delete(url, { header })
}
function uploadSubtitle (formData) {
    const url = '/admin/upload-sub'
    const header = authHeader()
    header['Content-Type'] = 'multipart/form-data'
    return API.post(url, formData, { header })
}
