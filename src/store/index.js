import Vue from 'vue'
import Vuex from 'vuex'
import moduleUsers from './modules/users'
import moduleProducts from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    privateURL: process.env.VUE_APP_BASE_URL,
    show: true,
  },
  mutations: {
    setShow(state, payload) {
      state.show = payload
    },
  },
  actions: {
    show_side(context, params) {
      context.commit('setShow', params)
    },
  },
  modules: {
    users: moduleUsers,
    products: moduleProducts,
  },
})
