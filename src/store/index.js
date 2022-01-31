import Vue from 'vue'
import Vuex from 'vuex'
import moduleUsers from './modules/users'
import moduleProducts from './modules/products'
import moduleHistorys from './modules/historys'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    privateURL: process.env.VUE_APP_BASE_URL,
    ImgUser: process.env.VUE_APP_IMG_USER,
    ImgProduct: process.env.VUE_APP_IMG_PRODUCT,
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
    historys: moduleHistorys,
  },
})
