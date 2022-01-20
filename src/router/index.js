import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dasboard',
    component: () => import('@/views/Index'),
    meta: { access: true },
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('@/views/Employee'),
    meta: { access: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products'),
    meta: { access: true },
  },
  {
    path: '/products/add',
    name: 'addProducts',
    component: () => import('@/views/AddProduct'),
    meta: { access: true },
  },
  {
    path: '/products/detail/:id',
    name: 'detailProduct',
    component: () => import('@/views/DetailProduct'),
    meta: { access: true },
  },
  {
    path: '/menus',
    name: 'Menus',
    component: () => import('@/views/Menus'),
    meta: { access: true },
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History'),
    meta: { access: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: { access: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: { access: false },
  },
  {
    path: '/browsersupport',
    name: 'browserSupport',
    component: () => import('@/components/BowserSupport'),
    meta: { access: false },
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
    meta: { access: false },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  const access = to.meta.access
  let token = store.getters['users/getToken'] || null

  if (access) {
    if (token) next()
    else router.push('/login').catch(() => {})
  } else if (!access) {
    if (token) router.push('/').catch(() => {})
    else next()
  } else next()
})

router.afterEach((to) => {
  const DEFAULT_TITLE = process.env.VUE_APP_NAME || 'Krusty POS'
  Vue.nextTick(() => {
    document.title = DEFAULT_TITLE + ' | ' + to.name || DEFAULT_TITLE
  })
})

export default router
