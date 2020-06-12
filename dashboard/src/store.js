import Vue from 'vue'
import Vuex from 'vuex'
import AuthServices from './services/AuthServices.js'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user // check user state from previous login
  ? { status: { loggedIn: true, authenticated: true }, user }
  : { status: { loggedIn: false, authenticated: false }, user: null }

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    status: initialState.status,
    user: initialState.user,
    filmInfo: {}, // for editing film data
  },
  mutations: { // change the state of a vuex store
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_FILM_INFO (state, payload) {
      state.filmInfo = payload // get filmInfo from dashboard
    },
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    authenticateSuccess (state) {
      state.status.authenticated = true
    },
    authenticateFailure (state) {
      state.status.authenticated = false
    },
    logout (state) {
      state.status.loggedIn = false
      state.status.authenticated = false
      state.user = null
    },
    registerSuccess (state) {
      state.status.loggedIn = false
    },
    registerFailure (state) {
      state.status.loggedIn = false
    },
  },
  actions: {
    login ({ commit }, user) {
      return AuthServices.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        },
      )
    },
    register ({ commit }, user) {
      return AuthServices.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        },
      )
    },
    logout ({ commit }) {
      AuthServices.logout()
      commit('logout')
    },
  },
  getters: { // get the value of the attributes of vuex state
    authStatus: state => state.status,
    filmInfo: state => state.filmInfo,
  },
})
