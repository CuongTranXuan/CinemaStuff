import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    status: '', // for authentication
    token: localStorage.getItem('token') || '',
    user: {},
    filmInfo: {}, // for editing film data
  },
  mutations: { // change the state of a vuex store
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    AUTH_REQUEST (state) {
      state.status = 'loading'
    },
    AUTH_SUCCESS (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    AUTH_ERROR (state) {
      state.status = 'error'
    },
    LOGOUT (state) {
      state.status = ''
      state.token = ''
    },
    SET_FILM_INFO (state, payload) {
      state.filmInfo = payload // get filmInfo from dashboard
    },
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({ url: 'http://125.212.203.148/api/user/authenticate', data: user, method: 'POST' })
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common.Authorization = token
          commit('AUTH_SUCCESS', token, user)
          resolve(res)
        })
        .catch(err => {
          commit('AUTH_ERROR')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({ url: 'http://125.212.203.148/api/user/register', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data.token
          const user = resp.data.user
          localStorage.setItem('token', token)
          axios.defaults.headers.common.Authorization = token
          commit('AUTH_SUCCESS', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('AUTH_ERROR', err)
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    },
  },
  getters: { // get the value of the attributes of vuex state
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    filmInfo: state => state.filmInfo,
  },
})
