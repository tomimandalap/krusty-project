import axios from 'axios'
const users = {
  namespaced: true,
  state: () => ({
    name: localStorage.getItem('name') || null,
    user_id: localStorage.getItem('user_id') || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    show_alert: false,
    status: '',
    alert_title: '',
    alert_message: '',
  }),
  getters: {
    getToken: (state) => state.token,
  },
  mutations: {
    setName(state, payload) {
      state.name = payload
    },
    setUserID(state, payload) {
      state.user_id = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
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
    register(context, params) {
      return axios
        .post(`${context.rootState.privateURL}/register`, params)
        .then(() => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)

          return true
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
          return false
        })
    },
    login(context, params) {
      return axios
        .post(`${context.rootState.privateURL}/login`, params)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)

          // set data
          let { name, user_id, token } = res.data.data[0]
          context.commit('setName', name)
          context.commit('setUserID', user_id)
          context.commit('setToken', token)
          // set localStorage
          localStorage.setItem('name', name)
          localStorage.setItem('user_id', user_id)
          localStorage.setItem('token', token)
          return true
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
          return false
        })
    },
    logout(context) {
      const user_id = context.state.user_id
      const token = context.state.token
      return axios
        .post(`${context.rootState.privateURL}/logout/${user_id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)

          // set data null
          context.commit('setName', null)
          context.commit('setUserID', null)
          context.commit('setToken', null)
          // remove localStorage
          localStorage.removeItem('name')
          localStorage.removeItem('user_id')
          localStorage.removeItem('token')
          return true
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
          return false
        })
    },
  },
}

export default users
