import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dasboard',
    component: () => import('@/views/Index'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products'),
  },
  {
    path: '/menus',
    name: 'Menus',
    component: () => import('@/views/Menus'),
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
  },
  {
    path: '/browsersupport',
    name: 'browserSupport',
    component: () => import('@/components/BowserSupport'),
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => {
      next('/404')
    },
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/NotFound'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

router.afterEach((to) => {
  const DEFAULT_TITLE = process.env.VUE_APP_NAME || 'Krusty POS'
  Vue.nextTick(() => {
    document.title = DEFAULT_TITLE + ' | ' + to.name || DEFAULT_TITLE
  })
})

export default router
