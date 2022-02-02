import axios from 'axios'
const users = {
  namespaced: true,
  state: () => ({
    access: localStorage.getItem('access') || null,
    name: localStorage.getItem('name') || null,
    user_id: localStorage.getItem('user_id') || null,
    token: localStorage.getItem('token') || null,
    datas: [],
    loading: false,
    show_alert: false,
    status: '',
    alert_title: '',
    alert_message: '',
  }),
  getters: {
    getToken: (state) => state.token,
    getAccess: (state) => state.access,
    getName: (state) => state.name,
    getUserID: (state) => state.user_id,
  },
  mutations: {
    setAccess(state, payload) {
      state.access = payload
    },
    setName(state, payload) {
      state.name = payload
    },
    setUserID(state, payload) {
      state.user_id = payload
    },
    setToken(state, payload) {
      state.token = payload
    },
    setDatas(state, payload) {
      state.datas = payload
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
          let { access, name, user_id, token } = res.data.data[0]
          context.commit('setAccess', access)
          context.commit('setName', name)
          context.commit('setUserID', user_id)
          context.commit('setToken', token)
          // set localStorage
          localStorage.setItem('access', access)
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
          context.commit('setAccess', null)
          context.commit('setName', null)
          context.commit('setUserID', null)
          context.commit('setToken', null)
          // remove localStorage
          localStorage.removeItem('access')
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
    getUsers(context, params) {
      axios
        .get(
          `${context.rootState.privateURL}/users?q=${params.q}&sort_by=${params.sort_by}&page=${params.page}&limit=${params.limit}`,
        )
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', false)
          context.commit('setDatas', res.data.data)
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
        })
    },
    updatedUser(context, params) {
      axios
        .patch(
          `${context.rootState.privateURL}/user/update/${params.user_id}`,
          params.data,
        )
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setTitle', 'Status User')
          context.commit('setStatus', 'Update Succes')
          context.commit('setMessage', res.data.message)
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
        })
    },
    deleteUser(context, user_id) {
      axios
        .delete(`${context.rootState.privateURL}/user/delete/${user_id}`)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'success')
          context.commit('setMessage', res.data.message)
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')
          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', err.response.data.message)
        })
    },
  },
}

export default users
