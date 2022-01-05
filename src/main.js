import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vuebrowser from './plugins/vuebrowser'
import VOffline from './plugins/vueoffline'
import './plugins/vuemoney'
import './plugins/vuelidate'
import './plugins/vuenotify'
import '../src/assets/styles/global.css'
import Axios from './plugins/axios'

Axios() // running axios instance

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VOffline,
  vuebrowser,
  render: (h) => h(App),
}).$mount('#app')
