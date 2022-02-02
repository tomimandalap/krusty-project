import axios from 'axios'
import store from '../store/index'
import router from '../router'

const Axios = () => {
  // request
  axios.interceptors.request.use(
    (res) => {
      const token = store.getters['users/getToken']
      // set token to global access
      if (token) {
        res.headers.Authorization = `Bearer ${token}`
      }

      return res
    },
    (err) => {
      console.log('Request', err.response)

      return Promise.reject(err)
    },
  )

  // response
  axios.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      console.error('Response', err.response)
      const code = parseInt(err.response && err.response.status)
      const user_id = store.getters['users/getUserID']

      if (code == 401 || (code == 423 && user_id)) {
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
