import axios from 'axios'
import store from '../store/index'
import router from '../router'

const Axios = () => {
  // request
  axios.interceptors.request.use(
    (config) => {
      const token = store.getters['users/getToken']
      // set token to global access
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (err) => {
      console.log('Request', err.response)

      return Promise.reject(err)
    },
  )

  // response
  axios.interceptors.response.use(
    (config) => {
      return config
    },
    (err) => {
      console.error('Response', err.response)
      const code = parseInt(err.response && err.response.status)
      if (code == 401) {
        store.dispatch('users/logout')
        setTimeout(() => {
          router.push('/login')
        }, 300)
      }

      return Promise.reject(err)
    },
  )
}

export default Axios
