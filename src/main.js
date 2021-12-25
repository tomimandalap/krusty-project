import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vuebrowser from './plugins/vuebrowser'
import VOffline from './plugins/vueoffline'
import '../src/assets/styles/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VOffline,
  vuebrowser,
  render: (h) => h(App),
}).$mount('#app')
