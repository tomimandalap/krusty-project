import axios from 'axios'
const users = {
  namespaced: true,
  state: () => ({
    name: [],
    loading: false,
    show_alert: false,
    status: '',
    alert_title: '',
    alert_message: '',
  }),
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setShow(state, payload) {
      state.show_alert = payload
    },
    setStatus(state, payload) {
      state.status = payload
    },
    setTitle(state, payload) {
      state.alert_title = payload
    },
    setMessage(state, payload) {
      state.alert_message = payload
    },
  },
  actions: {
    login(context, params) {
      return axios
        .post(`${context.rootState.privateURL}/login`, params)
        .then(() => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)
          return true
        })
        .catch((err) => {
          console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
          return false
        })
    },
    register(context, params) {
      return axios
        .post(`${context.rootState.privateURL}/register`, params)
        .then(() => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)
          return true
        })
        .catch((err) => {
          console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
          return false
        })
    },
  },
  getters: {},
}

export default users
