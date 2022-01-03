import axios from 'axios'
const products = {
  namespaced: true,
  state: () => ({
    datas: [],
    loading: false,
    show_alert: false,
    status: '',
    alert_title: '',
    alert_message: '',
  }),
  mutations: {
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
    getProducts(context) {
      axios
        .get(`${context.rootState.privateURL}/products`)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setStatus', false)

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
  },
  getters: {},
}

export default products
