import axios from 'axios'
const products = {
  namespaced: true,
  state: () => ({
    datas: [],
  }),
  mutations: {},
  actions: {
    getProducts(context) {
      axios
        .get(`${context.rootState.privateURL}/products`)
        .then((res) => {
          context.commit('datas', res.data)
        })
        .catch((err) => {
          console.error(err.response)
        })
        .finally(() => {})
    },
  },
  getters: {},
}

export default products
