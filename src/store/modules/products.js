import axios from 'axios'
const products = {
  namespaced: true,
  state: () => ({
    datas: [],
    detail_data: [],
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
    setDetailData(state, payload) {
      state.detail_data = payload
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
    getProducts(context, params) {
      axios
        .get(`${context.rootState.privateURL}/products?q=${params.q}`)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setStatus', 'success')

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
    getDetailProduct(context, id) {
      return axios
        .get(`${context.rootState.privateURL}/product/detail/${id}`)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setStatus', 'success')

          context.commit('setDetailData', res.data.data)
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
    createProduct(context, params) {
      return axios
        .post(`${context.rootState.privateURL}/product/create`, params)
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setShow', true)
          context.commit('setStatus', 'success')
          context.commit('setTitle', 'Success')
          context.commit('setMessage', res.data.message)
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
    updateProduct(context, params) {
      return axios
        .patch(
          `${context.rootState.privateURL}/product/update/${params.id}`,
          params.data,
        )
        .then((res) => {
          context.commit('setLoading', false)
          context.commit('setStatus', 'success')
          console.log(res)
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

export default products
