import axios from 'axios'
const historys = {
  namespaced: true,
  state: () => ({
    datas: [],
    data_order: {},
    loading: false,
    show_alert: false,
    status: '',
    alert_title: '',
    alert_message: '',
  }),
  getters: {},
  mutations: {
    setDatas(state, payload) {
      state.datas = payload
    },
    setDataOrder(state, payload) {
      state.data_order = payload
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
    allHistory(context, params) {
      return axios
        .get(
          `${context.rootState.privateURL}/all_history?q=${params.q}&sort_by=${params.sort_by}&page=${params.page}&limit=${params.limit}`,
        )
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', false)
          context.commit('setDatas', res.data.data)
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
    detailHistory(context, order_id) {
      return axios
        .get(`${context.rootState.privateURL}/history/${order_id}`)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', false)
          context.commit('setDataOrder', res.data.data[0])
          return true
        })
        .catch((err) => {
          // console.error(err.response)
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'error')

          context.commit('setTitle', err.response.data.title)
          context.commit('setMessage', customError(err.response.data.message))
          return false
        })
    },
  },
}

export default historys
const customError = (message) => {
  return String(message).replace('Error: ', ' ')
}
