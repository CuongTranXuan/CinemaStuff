import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/dashboard/Index'
import Dashboard from '@/views/dashboard/Dashboard'
import UserProfile from '@/views/dashboard/pages/UserProfile'
import LoginForm from '@/views/dashboard/pages/LoginForm'
import NewFilm from '@/views/dashboard/pages/NewFilm'
import EditFilm from '@/views/dashboard/pages/EditFilm'
Vue.use(Router)

// function loadView(view) {
//   return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
// }

export default new Router({
  mode: 'hash',
  base: '/dashboard/',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: Dashboard,
          meta: {
            requiresAuth: true,
          },
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: UserProfile,
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Login',
          path: 'login',
          component: LoginForm,
        },
        // Films
        {
          name: 'Add new film',
          path: 'pages/newfilm',
          component: NewFilm,
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Edit film',
          path: 'film/:id',
          component: EditFilm,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    // { path: '*', redirect: '/login' },
  ],
})
