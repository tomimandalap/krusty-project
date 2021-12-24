import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
  modules: {},
})
