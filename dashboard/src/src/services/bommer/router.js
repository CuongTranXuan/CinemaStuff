import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from '../page/LoginPage'
import RegisterPage from '../page/RegisterPage'
import Dashboard from '../page/Dashboard'
import CreateFilm from '../page/CreateFilm'
import Ffmpeg from '../page/Ffmpeg'
import FilmDetail from '../page/FilmDetail'
Vue.use(Router)

export const router = new Router({
  mode: 'hash',
  base: '/admin/',
  routes: [
    { path: '/', component: Dashboard },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/createFilm', component: CreateFilm },
    { path: '/ffmpeg', component: Ffmpeg },
    { path: '/:id', component: FilmDetail },
    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})
