import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
          meta: {
            requiresAuth: true,
          },
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Login',
          path: 'login',
          component: () => import('@/views/dashboard/pages/LoginForm'),
        },
        {
          name: 'qrcode',
          path: 'qrcode',
          component: () => import('@/views/dashboard/pages/QRcode'),
        },
        {
          name: 'Notifications',
          path: 'components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Icons',
          path: 'components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Typography',
          path: 'components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
          meta: {
            requiresAuth: true,
          },
        },
        // Films
        {
          name: 'Add new film',
          path: 'pages/newfilm',
          component: () => import('@/views/dashboard/pages/NewFilm'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          name: 'Edit film',
          path: 'film/:id',
          component: () => import('@/views/dashboard/pages/EditFilm'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    // { path: '*', redirect: '/login' },
  ],
})
