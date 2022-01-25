import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/router'
import AppBar from './components/AppBar.vue'

Vue.config.productionTip = false

Vue.component('AppBar', AppBar)

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
